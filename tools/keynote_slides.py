"""Recover the Keynote navigator slide order and the media files used on each slide of a .key package.

Usage: python3 tools/keynote_slides.py "/path/to/deck.key" out.json
Prints one line per slide (thumbnail + Data/ files); no Keynote installation needed."""
import zipfile, re, sys, json, collections, os
sys.path.insert(0, os.path.dirname(__file__))
import keynote_iwa as I

def decode(b, depth=0):
    """generic protobuf decode; returns list of (field, wt, value) where value may be a nested list"""
    out=[]
    try:
        for f,wt,v in I.fields(b):
            if f<=0 or f>2000: return None
            if wt==2 and len(v)>0 and depth<12:
                sub=decode(v, depth+1)
                out.append((f,wt,sub if sub is not None else v))
            else: out.append((f,wt,v))
    except Exception: return None
    return out

def refs_in_order(tree):
    """yield identifiers of TSP.Reference-like submessages {1: varint} in document order"""
    if not isinstance(tree, list): return
    if len(tree)==1 and tree[0][0]==1 and tree[0][1]==0:
        yield tree[0][2]; return
    for f,wt,v in tree:
        if isinstance(v, list): yield from refs_in_order(v)

def analyse(keypath):
    z=zipfile.ZipFile(keypath); names=z.namelist()
    data_files={}
    for n in names:
        if n.startswith("Data/"):
            m=re.search(r'-(\d+)\.[A-Za-z0-9]+$', n)
            if m: data_files[int(m.group(1))]=n[5:]
    arch={}
    for n in names:
        if n.startswith("Index/") and n.endswith(".iwa"):
            for a in I.parse_archives(z.read(n), n): arch[a["id"]]=a
    slide_file_ids={aid for aid,a in arch.items() if a["file"].startswith("Index/Slide")}
    # slide nodes: type 4 archives outside Slide files
    nodes={}
    for aid,a in arch.items():
        if a["file"].startswith("Index/Slide"): continue
        for mi,pl in zip(a["infos"],a["payloads"]):
            if mi["type"]==4:
                t=decode(pl); ids=list(refs_in_order(t)) if t else []
                slide=[i for i in ids if i in slide_file_ids]
                thumb=[i for i in ids+mi["objrefs"] if i in data_files]
                nodes[aid]={"slide_arch":slide[0] if slide else None, "thumb":thumb[0] if thumb else None}
    # slide order: find payload (outside Slide files, not type 4) whose ordered refs cover the most nodes
    best=[]
    for aid,a in arch.items():
        if a["file"].startswith("Index/Slide"): continue
        for mi,pl in zip(a["infos"],a["payloads"]):
            if mi["type"]==4: continue
            t=decode(pl); 
            if not t: continue
            ids=[i for i in refs_in_order(t) if i in nodes]
            if len(ids)>len(best): best=ids
    order=[]; seen=set()
    for nid in best:
        if nid not in seen: seen.add(nid); order.append(nid)
    slides=[]
    for idx,nid in enumerate(order,1):
        sa=nodes[nid]["slide_arch"]; f=arch[sa]["file"] if sa else None
        media=[]
        if f:
            for aid,a in arch.items():
                if a["file"]!=f: continue
                for mi,pl in zip(a["infos"],a["payloads"]):
                    cand=list(mi["objrefs"])
                    t=decode(pl)
                    if t: cand+=list(refs_in_order(t))
                    for d in cand:
                        if d in data_files and data_files[d] not in media: media.append(data_files[d])
        th=nodes[nid]["thumb"]
        slides.append({"slide":idx,"node":nid,"slide_file":f,"thumb":data_files.get(th),"media":media})
    return slides, len(nodes)

if __name__=="__main__":
    slides,nn=analyse(sys.argv[1])
    json.dump(slides, open(sys.argv[2],"w"), ensure_ascii=False, indent=1)
    print(f"{os.path.basename(sys.argv[1])}: nodes={nn} ordered={len(slides)}")
    for s in slides:
        media=[m for m in s["media"] if "-small-" not in m and not m.startswith(("st-","mt-"))]
        print(f"  {s['slide']:>2} {str(s['slide_file']):<26} thumb={s['thumb']}  media={', '.join(media)[:150]}")
