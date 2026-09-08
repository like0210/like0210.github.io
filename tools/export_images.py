"""Export web JPEGs (max 1920 px + 640 px thumb), sRGB, EXIF-free, no upscaling.

Usage: python3 tools/export_images.py manifest.json images/portfolio
manifest.json is a list of [source_path, web_name] pairs. Requires Pillow and pillow-heif."""
import io, os, sys, json
from PIL import Image, ImageOps, ImageCms
import pillow_heif
pillow_heif.register_heif_opener()

SRGB_PROFILE = ImageCms.createProfile("sRGB")
SRGB_BYTES = ImageCms.ImageCmsProfile(SRGB_PROFILE).tobytes()
BG = (248, 247, 244)  # site background #f8f7f4

def load(path):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    icc = im.info.get("icc_profile")
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        # trim fully transparent canvas margins around cut-outs, keeping a small breathing margin
        bbox = im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
        if bbox and bbox != (0, 0, im.width, im.height):
            mx = int(0.03 * (bbox[2] - bbox[0])); my = int(0.03 * (bbox[3] - bbox[1]))
            im = im.crop((max(0, bbox[0] - mx), max(0, bbox[1] - my), min(im.width, bbox[2] + mx), min(im.height, bbox[3] + my)))
        bg = Image.new("RGBA", im.size, BG + (255,))
        im = Image.alpha_composite(bg, im).convert("RGB")
        # cut-outs pasted on an opaque white canvas: trim near-white margins when the content is much smaller than the canvas
        if path.lower().endswith((".png", ".tif", ".tiff")):
            mask = im.convert("L").point(lambda v: 0 if v > 244 else 255)
            bb = mask.getbbox()
            if bb and (bb[2]-bb[0])*(bb[3]-bb[1]) < 0.85*im.width*im.height:
                mx = int(0.04*(bb[2]-bb[0])) + 8; my = int(0.04*(bb[3]-bb[1])) + 8
                im = im.crop((max(0,bb[0]-mx), max(0,bb[1]-my), min(im.width,bb[2]+mx), min(im.height,bb[3]+my)))
    elif im.mode != "RGB":
        im = im.convert("RGB")
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            desc = ImageCms.getProfileDescription(src)
            if "sRGB" not in desc:
                im = ImageCms.profileToProfile(im, src, SRGB_PROFILE, outputMode="RGB")
        except Exception as e:
            print("ICC convert failed", path, e, file=sys.stderr)
    return im

def export(src, name, outdir):
    im = load(src)
    sizes = {}
    for suffix, maxpx, q in (("", 1920, 82), ("-thumb", 640, 80)):
        t = im.copy()
        t.thumbnail((maxpx, maxpx), Image.LANCZOS)
        out = os.path.join(outdir, f"{name}{suffix}.jpg")
        t.save(out, "JPEG", quality=q, optimize=True, progressive=True, icc_profile=SRGB_BYTES)
        sizes[suffix or "full"] = t.size
    print(json.dumps({"name": name, "src": os.path.basename(src), "full": sizes["full"], "thumb": sizes["-thumb"]}))

if __name__ == "__main__":
    manifest = json.load(open(sys.argv[1]))
    outdir = sys.argv[2]
    os.makedirs(outdir, exist_ok=True)
    for src, name in manifest:
        export(src, name, outdir)
