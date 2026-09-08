"""Recover Keynote slide order and per-slide media files from a .key package (IWA protobuf metadata only)."""
import zipfile, sys, json, re, collections

def snappy_decompress(data):
    pos=0; shift=0; length=0
    while True:
        b=data[pos]; pos+=1; length|=(b&0x7f)<<shift
        if b<0x80: break
        shift+=7
    out=bytearray(); n=len(data)
    while pos<n:
        tag=data[pos]; pos+=1; t=tag&3
        if t==0:
            ln=tag>>2
            if ln<60: ln+=1
            else:
                nb=ln-59; ln=int.from_bytes(data[pos:pos+nb],'little')+1; pos+=nb
            out+=data[pos:pos+ln]; pos+=ln
        else:
            if t==1: ln=((tag>>2)&7)+4; off=((tag>>5)<<8)|data[pos]; pos+=1
            elif t==2: ln=(tag>>2)+1; off=int.from_bytes(data[pos:pos+2],'little'); pos+=2
            else: ln=(tag>>2)+1; off=int.from_bytes(data[pos:pos+4],'little'); pos+=4
            start=len(out)-off
            for i in range(ln): out.append(out[start+i])
    return bytes(out)

def iwa_decompress(blob):
    pos=0; out=bytearray()
    while pos+4<=len(blob):
        ln=int.from_bytes(blob[pos+1:pos+4],'little'); pos+=4
        out+=snappy_decompress(blob[pos:pos+ln]); pos+=ln
    return bytes(out)

def varint(b,p):
    r=0; s=0
    while True:
        x=b[p]; p+=1; r|=(x&0x7f)<<s
        if x<0x80: return r,p
        s+=7

def fields(b):
    """yield (field_no, wire_type, value) ; value=int for varint, bytes for len-delimited"""
    p=0; n=len(b)
    while p<n:
        tag,p=varint(b,p); f=tag>>3; wt=tag&7
        if wt==0: v,p=varint(b,p); yield f,wt,v
        elif wt==1: yield f,wt,b[p:p+8]; p+=8
        elif wt==2: ln,p=varint(b,p); yield f,wt,b[p:p+ln]; p+=ln
        elif wt==5: yield f,wt,b[p:p+4]; p+=4
        else: raise ValueError("bad wire type %d"%wt)

def uint64s(f_wt_v_list):
    """collect repeated uint64 (packed or not)"""
    out=[]
    for f,wt,v in f_wt_v_list:
        if wt==0: out.append(v)
        elif wt==2:
            p=0
            while p<len(v): x,p=varint(v,p); out.append(x)
    return out

def parse_archives(blob, fname):
    data=iwa_decompress(blob); p=0; res=[]
    while p<len(data):
        ln,p=varint(data,p); ai=data[p:p+ln]; p+=ln
        ident=None; infos=[]
        for f,wt,v in fields(ai):
            if f==1 and wt==0: ident=v
            elif f==2 and wt==2:
                mi={"type":None,"length":0,"objrefs":[],"datarefs":[]}
                fl=list(fields(v))
                for ff,wwt,vv in fl:
                    if ff==1 and wwt==0: mi["type"]=vv
                    elif ff==3 and wwt==0: mi["length"]=vv
                mi["objrefs"]=uint64s([(ff,wwt,vv) for ff,wwt,vv in fl if ff==6])
                mi["datarefs"]=uint64s([(ff,wwt,vv) for ff,wwt,vv in fl if ff==7])
                infos.append(mi)
        payloads=[]
        for mi in infos:
            payloads.append(data[p:p+mi["length"]]); p+=mi["length"]
        res.append({"id":ident,"file":fname,"infos":infos,"payloads":payloads})
    return res

def main(keypath, out_json):
    z=zipfile.ZipFile(keypath)
    names=z.namelist()
    # data identifier -> filename (suffix -<id>.<ext>)
    data_files={}
    for n in names:
        if n.startswith("Data/"):
            m=re.search(r'-(\d+)\.[A-Za-z0-9]+$', n)
            if m: data_files[int(m.group(1))]=n[5:]
    archives={}
    for n in names:
        if n.startswith("Index/") and n.endswith(".iwa"):
            for a in parse_archives(z.read(n), n):
                if a["id"] is not None: archives[a["id"]]=a
    slide_files=collections.defaultdict(list)
    for aid,a in archives.items():
        if re.match(r'Index/Slide(-\d+)?(-\d+)?\.iwa$', a["file"]) : slide_files[a["file"]].append(aid)
    slide_arch_ids=set(aid for aid,a in archives.items() if a["file"].startswith("Index/Slide"))
    # find the slide-tree: an archive (not in a Slide file) whose objrefs contain the most distinct Slide-file archives
    best=None
    for aid,a in archives.items():
        if a["file"].startswith("Index/Slide"): continue
        for mi in a["infos"]:
            refs=[r for r in mi["objrefs"] if r in slide_arch_ids]
            if refs and (best is None or len(refs)>len(best[1])): best=(aid,refs,a["file"],mi["type"])
    if not best: print("slide tree not found"); return
    tree_id, ordered_refs, tree_file, tree_type = best
    # one ref per slide node; keep order, dedupe by file
    order=[]; seen=set()
    for r in ordered_refs:
        f=archives[r]["file"]
        if f not in seen: seen.add(f); order.append((r,f))
    # per slide: BFS within the same Slide file, collect datarefs
    slides=[]
    for idx,(root,f) in enumerate(order,1):
        stack=[root]; visited=set(); datarefs=[]
        while stack:
            cur=stack.pop()
            if cur in visited or cur not in archives: continue
            visited.add(cur)
            a=archives[cur]
            if a["file"]!=f: continue
            for mi in a["infos"]:
                datarefs+=mi["datarefs"]
                stack+= [r for r in mi["objrefs"] if r in archives and archives[r]["file"]==f]
        files=[]
        for d in datarefs:
            fn=data_files.get(d)
            if fn and fn not in files: files.append(fn)
        slides.append({"slide":idx,"file":f,"media":files})
    json.dump({"tree_file":tree_file,"tree_type":tree_type,"slides":slides}, open(out_json,"w"), ensure_ascii=False, indent=1)
    print(f"{keypath}: slides={len(slides)} tree={tree_file} type={tree_type}")
    for s in slides:
        media=[m for m in s["media"] if "-small-" not in m and not m.startswith(("st-","mt-"))]
        print(f"  {s['slide']:>2} {s['file']:<28} {', '.join(media)[:170]}")

if __name__=="__main__":
    main(sys.argv[1], sys.argv[2])
