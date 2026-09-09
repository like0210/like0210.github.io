"""Generate the four series sections of portfolio.html and the preview cards of index.html from the manifest below.

Usage (from the repository root, Pillow required):
    python3 tools/build_portfolio.py

Image dimensions are read from the exported JPEGs, so width/height/srcset are always real, figure numbering is
sequential per gallery, and rows are laid out as equal-height justified rows chosen from each image's aspect ratio.
Edit the SERIES / CARDS data to change order, captions, alt text or excerpts, then re-run and rebuild the CSS."""
import re, sys, html
from PIL import Image
import os
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repository root
P = "images/portfolio"; W = "images/works"

def dims(rel):
    with Image.open(f"{SITE}/{rel}") as im: return im.size

def img(name, label, alt, d=P):
    return {"name": name, "dir": d, "label": label, "alt": alt}

SERIES = [
 {
  "num": "01", "id": "symbiotic-relief", "title": "Symbiotic relief",
  "info": ["Facial accessories / Hand accessories / Shoulder accessories / Necklace", "Brass, platinum, casing"],
  "gallery": [
   img("symbiotic-hand-disc", "Hand accessories", "A wearer in profile holds a translucent green spiked disc beside her ear."),
   img("symbiotic-necklace", "Necklace", "Petal-like translucent green forms extend around a wearer’s neck."),
   img("symbiotic-mask-necklace", "Necklace", "A wearer in an oxygen mask, with translucent green petal forms gathered at the neck."),
   img("symbiotic-seated", "Symbiotic relief", "A seated wearer with green membrane pieces at the face, hand and shoulder, against a dark grey background."),
   img("symbiotic-face-front", "Facial accessories", "Frontal view of a face piece: a thin metal hoop with spiked green membrane wings at the cheeks and a leaf form at the nose."),
   img("symbiotic-face-turn", "Facial accessories", "A wearer looks over her shoulder wearing the green membrane face piece."),
   img("symbiotic-shoulder", "Shoulder accessories", "A large angular membrane piece rests over the shoulder of a seated wearer."),
   img("breaking-2", "Shoulder accessories", "An angular metal armature with folded translucent green membranes and a long cast shadow.", W),
   img("breaking-3", "Necklace", "Petal-like organic membranes opening above a curved metal structure.", W),
   img("symbiotic-face", "Facial accessories", "A green membrane face piece with a leaf-like central form against a pale background."),
   img("breaking-1", "Hand accessories", "A translucent green and yellow membrane stretched over a circular metal framework.", W),
  ],
  "strips": [
   {"label": "Inspiration", "items": [
   img("symbiotic-inspiration-algae-ball", "Algae ball", "A hand holds a smooth green algae ball."),
   img("symbiotic-inspiration-moss", "Moss", "A clump of moss resting on the back of a wrist."),
   img("symbiotic-inspiration-seaweed-hand", "Seaweed", "Strands of seaweed laid across a hand, following the fingers."),
   img("symbiotic-inspiration-microscope", "Under the microscope", "Microscope view of a green plant surface covered in transparent droplets."),
   ]},
   {"label": "Sketches", "items": [
   img("symbiotic-sketch-seaweed", "Bracelet study", "Line drawings of seaweed fronds developing into a bracelet form."),
   img("symbiotic-sketch-fern", "Face piece", "Line drawing of a symmetrical face piece with fern-like fronds."),
   img("symbiotic-sketch-algae", "Ring study", "Line drawings of seaweed forms developing into ring and bracelet shapes."),
   img("symbiotic-sketch-structures", "Structures", "Composite drawing of wire structures and branching membrane forms."),
   ]},
   {"label": "Material experiments", "items": [
   img("symbiotic-process-casing", "Casing", "Raw natural casing resting in an open palm."),
   img("symbiotic-process-dye-hand", "Yellow dye", "A hand dips a sheet of casing into yellow dye."),
   img("symbiotic-process-dye-soak", "Stretching", "Casing stretched over a glass and soaked in green dye."),
   img("symbiotic-process-dye-mixed", "Two dyes", "Two glass dishes of yellow and green dye with pieces of casing soaking."),
   img("symbiotic-process-dried-casing", "Dried", "Dyed casing dried over the rim of a dish of green dye."),
   ]},
   {"label": "Wrapping tests", "items": [
   img("symbiotic-process-wrap-ring", "Ring frame", "A hand holds the ring frame wrapped with dyed casing and studded with pins."),
   img("symbiotic-process-wrap-shoulder", "Shoulder frame", "The shoulder piece frame with a first skin of casing on a grey surface."),
   img("symbiotic-process-wrap-leaf", "Leaf", "Close-up of a leaf form of the face piece covered in green casing."),
   ]}],
  "quotes": [
   ["At the height of the COVID-19 pandemic in 2021, Japan’s public announcement that it was going to discharge nuclear wastewater into the sea didn’t get the attention it deserved because the pandemic was so much in the public eye. But to me, it’s serious because chemicals in the nuclear wastewater will cause mutation of the algae in the ocean, and what will human life be like in a few years if human beings coexist with these mutated and spread algae?"],
   ["In this piece, I want to explore the impact of different radioactive substances on the ocean to present what human life will be like after the earth is polluted, as well as what human life will be like in the event of symbiosis or parasitism between human beings and mutated algae. Therefore, I investigated the morphological structure of algae, and wrapped the mutated structure with the casing made of the “living materials” that I believed them to be. I want this piece of work to raise people’s awareness of nuclear wastewater and environmental pollution."],
  ],
  "source": "LIKE — RCA · pp. 4–6 · Inspiration, sketches, material experiments and wrapping tests from the artist’s project archive",
 },
 {
  "num": "02", "id": "psychotherapy", "title": "Psychotherapy",
  "info": ["Back ornament / Necklace / Hand accessories / Facial accessories", "Brass, platinum, myxomycetes, nephrite, gutta percha"],
  "gallery": [
   img("psychotherapy-necklace-profile", "Necklace", "A wearer in profile with a necklace of open metal cells holding translucent membranes with orange threads."),
   img("psychotherapy-necklace-front", "Necklace", "A wearer looks down, the cellular necklace resting at the collarbone."),
   img("psychotherapy-hand", "Hand accessories", "A wearer holds a cellular metal ornament over one eye."),
   img("psychotherapy-face", "Facial accessories", "A curved metal face ornament frames a wearer’s cheek and mouth."),
   img("psychotherapy-face-side", "Facial accessories", "A translucent cell of the face piece sits over the wearer’s lips, seen from the side."),
   img("psychotherapy-face-front", "Facial accessories", "Frontal view of the face piece, its wire arching over the ear with a jade bead at the chin."),
   img("psychotherapy-back-pair", "Back ornament", "The back ornament worn between two wearers’ shoulders, with translucent cells and jade beads."),
   img("psychotherapy-object", "Necklace", "An openwork metal form with translucent cells and orange details."),
   img("psychotherapy-face-object", "Facial accessories", "The face piece as an object: an openwork cluster with translucent cells on two long wire arms."),
   img("psychotherapy-back-object", "Back ornament", "The back ornament as an object: a cage of metal cells holding translucent membranes, with green jade beads at both ends."),
  ],
  "strips": [
   {"label": "Sketches", "items": [
   img("psychotherapy-sketch-hands", "Hands", "Pencil sketches of hands holding cell clusters, with studies of the cell forms."),
   img("psychotherapy-sketch-face", "Face piece", "Line drawing of a head wearing the cellular face piece over the mouth, with measurements."),
   img("psychotherapy-sketch-heads", "Necklace", "Three head models with the necklace drawn in pink at the neck, with notes."),
   ]},
   {"label": "Making process", "items": [
   img("psychotherapy-process-palm", "Paper model", "A white paper cell model held on a palm marked top, middle and bottom."),
   img("psychotherapy-process-paper-cage", "Paper cage", "A white paper cage model on a workbench."),
   img("psychotherapy-process-3d-model", "3D model", "A digital render of the openwork cell form."),
   img("psychotherapy-process-wax-models", "Wax models", "Carved red wax cell rings arranged on a table."),
   img("psychotherapy-process-wax-fitting", "Wax fitting", "Pink wax cell rings tried on at the neck."),
   ]}],
  "quotes": [
   ["I use slime mold to simulate the spread of tumour cells.", "Halting the growth of the slime mold by feeding it harmful substances in order to simulate the death process of tumour cells."],
  ],
  "source": "LIKE — RCA · pp. 1–3 · Sketches and making process from the artist’s project archive",
 },
 {
  "num": "03", "id": "eden", "title": "Eden",
  "info": ["Jewellery &amp; Metal"],
  "gallery": [
   img("eden-collection", "Eden", "Silver jewellery arranged around a stone, with layered circular and organic forms."),
   img("eden-silver-shell", "Eden", "A cast silver shell-like form with a wound, twisted texture on a white surface."),
   img("eden-shells-wax", "Eden", "Black and white still life of scallop shells and two dripped wax rings on a wooden table."),
   img("eden-urchin-study", "Form study", "Black and white study of a sea urchin shell beside dark wound wax forms."),
   img("eden-wax", "Development process", "A green wax model with layered circular forms on a workbench."),
   img("eden-shell", "Eden", "A green patinated shell form displayed on a stone above grains of rice."),
   img("eden-shell-ring", "Eden", "The green patinated shell ring resting in a speckled ceramic dish."),
   img("eden-shell-detail", "Eden — detail", "Close-up of the patinated surface of the shell ring, marked with rice grains."),
   img("eden-drawings", "Development process", "Original drawings exploring layered natural forms."),
   img("eden-drawing-coils", "Development process", "Ink drawing of stacked, coiled forms."),
  ],
  "strips": [
   {"label": "Making the shell ring", "items": [
   img("eden-process-clay", "Ceramic clay", "A hand holds the ceramic clay ring that begins the shell ring."),
   img("eden-process-tape", "Paper tape", "The clay ring wrapped in paper tape, held in the palm."),
   img("eden-process-wax-drip", "Dripped wax", "Green wax dripped onto the taped ring with a heated tool."),
   img("eden-process-shell", "Half shell", "The peeled half-shell of tape and wax, held up in the hand."),
   ]},
   {"label": "Early development and surfaces", "items": [
   img("eden-early-bench", "Brass experiments", "Brass experiments on a workbench: coiled strips, disc-chain rings and annotated notes."),
   img("eden-polishing", "Polishing", "A gloved hand polishes a silver spiral with a rotary tool."),
   img("eden-patination", "Patination test", "A patinated brass test plate in yellow and orange held in a gloved hand."),
   ]}],
  "quotes": [
   ["The intertwined lines resemble both the rings of trees and the ripples created by falling water droplets. This wrapping form is also derived from a state of mind emptied in nature, representing extensions of natural forms."],
   ["These pure handmade wax models, which were dripped, are ultimately polished, refined, and then cast into sterling silver."],
   ["The second part of my “Eden” collection consists of a single piece. After recognizing that the circle is the most stable and harmonious shape, I abstracted a round, smooth form from a shell and used ceramic clay to sculpt the basic shape in preparation for the next step, which involves wax molding."],
   ["In the end, I decided to use vinegar-soaked rice to impart a natural color to the “shell ring.” This choice was inspired by the appearance of coral reefs in shallow ocean waters, which are often covered in traces left by shells that have adhered to them."],
  ],
  "source": "Jewellery &amp; Metal Portfolio · pp. 3–4, 6, 12–14, 16, 18–21, 23–25",
 },
 {
  "num": "04", "id": "traveling-memory", "title": "Shape of Traveling Memory",
  "info": ["Hand accessories", "Silver, balsam ash, red clay, textile fabric"],
  "gallery": [
   img("travel-gestures", "Hand accessories", "Two wearers bring their hands together beside their faces, with silver jewellery between their fingers."),
   img("travel-hands", "Hand accessories", "Two raised hands wearing silver pieces shaped around their gesture."),
   img("travel-wearing", "Hand accessories", "Two hands meet behind a wearer’s neck, holding a silver piece."),
   img("travel-silver", "Hand accessories", "Two folded silver forms photographed against a pale background."),
  ],
  "strips": [
   {"label": "Research and models", "items": [
   img("travel-process-gestures", "Gesture studies", "A grid of photographs of hands holding small white paper models in different gestures."),
   img("travel-process-paper-models", "Paper models", "White paper models of hand-held forms on a table."),
   img("travel-process-wax-models", "Wax models", "Carved wax models in teal and pink for the hand pieces."),
   img("travel-process-weaving", "Weaving", "A hand-woven textile sample on a small loom."),
   ]}],
  "quotes": [
   ["Therefore, I see “hand” as an important medium in my travel memory. It carries some of my most personal feelings about each city during my travels, as well as the smell of a city in my memory, the company of friends during the journey, and the unique traditional crafts in the city."],
   ["I investigated what different cities are like in my memory: Hangzhou is a city filled with the temple incense mixed with the damp air smell and people genuflecting with their hands folded; Xishuangbanna is a city with the swollen finger joints of weaving girls in Erlin’s primitive villages because of their long mechanical repetition of the same movement; and Xi’an is a city filled with buildings that exude a sense of history and the hand-holding movement between the friends accompanying me in my journey."],
   ["I drew the gestures of people praying for good luck with their hands folded in temples in Hangzhou, the mechanical repetitive movements of hard-working weaving girls in Xishuangbanna, and different gestures of my friends and I holding hands in Xi’an. These body languages are also one of my unique perspectives of memory."],
  ],
  "source": "LIKE — RCA · pp. 7–11 · Research and process photographs from the artist’s project archive",
 },
]

REF_W = 1328  # .page-width at a 1440 px viewport (1440 - 112)
WORKS = {"gap": 40, "target": 780, "hmin": 420, "hmax": 1000, "max_n": 3, "single_frac": 0.72, "single_penalty": 0.12}
STRIP = {"gap": 24, "target": 360, "hmin": 230, "hmax": 480, "max_n": 5, "single_frac": 0.4, "single_penalty": 0.15}

def aspect(im):
    w, h = dims(f"{im['dir']}/{im['name']}.jpg"); return w / h

def partition(aspects, P):
    """Split an ordered list of aspect ratios into rows of equal-height images whose height stays near P['target'].
    Returns a list of rows: (start, end, meta) with meta {'h','row_w' or 'single_w'}."""
    n = len(aspects); INF = float("inf")
    best = [INF] * (n + 1); choice = [None] * (n + 1); best[0] = 0.0
    W = REF_W
    for j in range(1, n + 1):
        for k in range(1, P["max_n"] + 1):
            i = j - k
            if i < 0: break
            row = aspects[i:j]; meta = {}
            if k == 1:
                a = row[0]; w = min(W * P["single_frac"], P["target"] * a); h = w / a
                cost = ((h - P["target"]) / P["target"]) ** 2 + P["single_penalty"]
                meta = {"h": h, "single_w": w / W}
            else:
                h = (W - P["gap"] * (k - 1)) / sum(row)
                if h > P["hmax"]:
                    meta["row_w"] = P["hmax"] / h; h = P["hmax"]
                if h < P["hmin"]: continue
                meta["h"] = h
                cost = ((h - P["target"]) / P["target"]) ** 2
            if best[i] + cost < best[j]:
                best[j] = best[i] + cost; choice[j] = (i, meta)
    rows = []; j = n
    while j > 0:
        i, meta = choice[j]; rows.append((i, j, meta)); j = i
    return rows[::-1]

def sizes_attr(frac, strip):
    """`sizes` for a figure occupying `frac` of the container width. The container is min(1440px, 100vw - 112px),
    so above 1552 px the width is capped in px; below, it scales with the viewport."""
    desktop = max(8, round(frac * 92))
    capped = max(120, round(frac * 1440))
    mobile = "calc(50vw - 28px)" if strip else "calc(100vw - 40px)"
    return f"(max-width: 760px) {mobile}, (min-width: 1552px) {capped}px, {desktop}vw"

def figure(s, im, n, total, strip, frac, style, group=None):
    src = f"{im['dir']}/{im['name']}.jpg"; thumb = f"{im['dir']}/{im['name']}-thumb.jpg"
    w, h = dims(src); tw, th = dims(thumb)
    label = im["label"]
    tail = "" if label == s["title"] else (f" — {group} · {label}" if group else f" — {label}")
    caption = s["title"] + tail
    sizes = sizes_attr(frac, strip)
    return f"""        <figure class="portfolio-figure" style="{style}">
          <a href="{src}" class="artwork-link" data-lightbox="{s['id']}-{n-1}" data-gallery="{s['id']}" data-caption="{caption}" aria-label="View {s['title']} — {n} / {total}" lang="en">
            <img src="{src}" srcset="{thumb} {tw}w, {src} {w}w" sizes="{sizes}" width="{w}" height="{h}" alt="{im['alt']}" loading="lazy" decoding="async">
            <span class="image-expand" aria-hidden="true">↗</span>
          </a>
          <figcaption class="artwork-caption" lang="en"><span>{label}</span><span class="image-number">{n:02d} / {total:02d}</span></figcaption>
        </figure>
"""

def rows_html(s, items, P, strip, counter, total, side, group=None):
    """Emit justified rows for `items`; `counter` is a one-element list carrying the running figure number."""
    asp = [aspect(im) for im in items]; out = []
    for (i, j, meta) in partition(asp, P):
        row = items[i:j]; k = len(row)
        cls = "gallery-row" + (" strip-row" if strip else "")
        style = ""
        if k == 1:
            cls += " gallery-row-single " + ("gallery-row-right" if side[0] % 2 else "gallery-row-left"); side[0] += 1
            frac = meta["single_w"]
        elif "row_w" in meta:
            cls += " gallery-row-narrow " + ("gallery-row-right" if side[0] % 2 else "gallery-row-left"); side[0] += 1
            style = f' style="--row-w: {meta["row_w"]*100:.1f}%"'
        out.append(f'        <div class="{cls}"{style}>\n')
        S = sum(asp[i:j]); row_w = meta.get("row_w", 1.0)
        for idx, im in enumerate(row):
            counter[0] += 1
            a = asp[i + idx]
            if k == 1:
                fstyle = f"--ar: {a:.4f}; --w: {meta['single_w']*100:.1f}%"; f = meta["single_w"]
            else:
                f = (a / S) * row_w * (1 - P["gap"] * (k - 1) / REF_W)
                fstyle = f"--ar: {a:.4f}"
            out.append(figure(s, im, counter[0], total, strip, f, fstyle, group))
        out.append("        </div>\n")
    return "".join(out)

def section(s):
    total = len(s["gallery"]) + sum(len(x["items"]) for x in s["strips"])
    counter = [0]; side = [0]; out = []
    out.append(f"""    <section id="{s['id']}" class="portfolio-collection" aria-labelledby="{s['id']}-title" tabindex="-1">
      <div class="section-label"><span class="eyebrow">{s['num']}</span></div>
      <div class="collection-heading" lang="en">
        <h2 id="{s['id']}-title">{s['title']}</h2>
        <div class="collection-info">{''.join(f'<p>{p}</p>' for p in s['info'])}</div>
      </div>
      <div class="portfolio-gallery">
""")
    out.append(rows_html(s, s["gallery"], WORKS, False, counter, total, side))
    out.append("      </div>\n")
    for strip in s["strips"]:
        out.append(f'      <div class="process-strip">\n        <p class="eyebrow strip-label" lang="en">{strip["label"]}</p>\n')
        out.append(rows_html(s, strip["items"], STRIP, True, counter, total, side, strip["label"]))
        out.append("      </div>\n")
    n = counter[0]
    out.append('      <div class="collection-notes" lang="en">\n')
    for q in s["quotes"]:
        out.append("        <blockquote>" + "".join(f"<p>{p}</p>" for p in q) + "</blockquote>\n")
    out.append(f'        <p class="collection-source">{s["source"]}</p>\n      </div>\n    </section>\n')
    assert n == total
    return "".join(out), total

def build_portfolio():
    path = f"{SITE}/portfolio.html"; src = open(path, encoding="utf-8").read()
    nav = "\n".join(f'        <a href="#{s["id"]}"><span class="eyebrow">{s["num"]}</span><span>{s["title"]}</span><span aria-hidden="true">↘</span></a>' for s in SERIES)
    intro = f"""    <section id="portfolio-top" class="portfolio-intro" aria-labelledby="portfolio-title" tabindex="-1">
      <p class="eyebrow">Ke Li · Jewellery &amp; Metal</p>
      <div class="portfolio-title-row"><h1 id="portfolio-title" lang="en">Portfolio</h1></div>
      <nav class="portfolio-index" aria-label="Collections" lang="en">
{nav}
      </nav>
    </section>
"""
    body = intro; counts = {}
    for s in SERIES:
        html_s, total = section(s); body += html_s; counts[s["id"]] = total
    start_tag = '<main id="main" tabindex="-1" class="page-width portfolio-main">\n'
    a = src.index(start_tag) + len(start_tag); b = src.index("  </main>", a)
    src = src[:a] + body + src[b:]
    # meta (regex so the replacement works whatever the previous value was)
    META_DESC = "Symbiotic relief, Psychotherapy, Eden and Shape of Traveling Memory. Jewellery &amp; Metal."
    src = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{META_DESC}">', src, count=1)
    src = re.sub(r'<meta property="og:description" content="[^"]*">', '<meta property="og:description" content="Jewellery &amp; Metal. Selected works from Ke Li’s original portfolios.">', src, count=1)
    src = re.sub(r'<meta property="og:image" content="[^"]*">', '<meta property="og:image" content="https://studio.kelijewellery.com/images/works/breaking-1.jpg">', src, count=1)
    src = re.sub(r'<meta property="og:image:alt" content="[^"]*">', '<meta property="og:image:alt" content="Symbiotic relief — translucent green membrane over a circular metal framework, by Ke Li">', src, count=1)
    assert META_DESC in src and 'images/works/breaking-1.jpg">' in src
    open(path, "w", encoding="utf-8").write(src)
    return counts

CARDS = [  # homepage preview cards: the first three series, object photographs only (no models), no dates
 ("symbiotic-relief", "Symbiotic relief", f"{W}/breaking-3", "Petal-like organic membranes opening above a curved metal structure."),
 ("psychotherapy", "Psychotherapy", f"{P}/psychotherapy-back-object", "The back ornament as an object: a cage of metal cells holding translucent membranes, with green jade beads at both ends."),
 ("eden", "Eden", f"{P}/eden-collection", "Silver jewellery arranged around a stone, with layered circular and organic forms."),
]

def build_index():
    path = f"{SITE}/index.html"; src = open(path, encoding="utf-8").read()
    cards = []
    for sid, title, base, alt in CARDS:
        w, h = dims(f"{base}.jpg"); tw, th = dims(f"{base}-thumb.jpg")
        cards.append(f"""      <article class="selection-item">
        <a href="portfolio.html#{sid}" class="selection-link" aria-labelledby="preview-{sid}" lang="en">
          <img src="{base}.jpg" srcset="{base}-thumb.jpg {tw}w, {base}.jpg {w}w" sizes="(max-width: 760px) calc(100vw - 40px), (min-width: 1552px) 448px, 29vw" width="{w}" height="{h}" alt="{alt}" loading="lazy" decoding="async">
          <div class="selection-caption" lang="en">
            <h3 id="preview-{sid}">{title}</h3>
            <span aria-hidden="true">↗</span>
          </div>
        </a>
      </article>
""")
    a = src.index('    <div class="selection-grid">\n') + len('    <div class="selection-grid">\n')
    b = src.index('    </div>\n    <div class="portfolio-entry">', a)
    src = src[:a] + "".join(cards) + src[b:]
    open(path, "w", encoding="utf-8").write(src)

if __name__ == "__main__":
    counts = build_portfolio(); build_index()
    print("portfolio.html + index.html written; gallery counts:", counts)
