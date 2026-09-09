# Tools

Small maintenance scripts used to build the Portfolio page. They are not part of the deployed site's runtime.

| Script | Purpose |
| --- | --- |
| `build_portfolio.py` | Regenerates the four series sections of `portfolio.html` and the three preview cards of `index.html` from the manifest inside the script. Reads real pixel sizes from `images/portfolio`, numbers every figure, and lays images out in equal-height justified rows chosen from their aspect ratios. It also rewrites each page's meta description and the absolute `og:image` URL, so a change of domain means editing that literal in the script as well as in the two pages. |
| `export_images.py` | Exports web JPEGs from source photos or Keynote media: EXIF orientation applied, Display P3 → sRGB, longest edge 1920 px (640 px thumbnails), no upscaling, EXIF removed, transparent cut-outs flattened onto the site background and trimmed. |
| `keynote_slides.py` / `keynote_iwa.py` | Recover the navigator slide order and the `Data/` media used on each slide of a `.key` package by decoding its IWA metadata, so slide numbers quoted by the artist can be matched to files without opening Keynote. |

Typical workflow after adding or replacing images:

```bash
python3 -m venv .venv && .venv/bin/pip install pillow pillow-heif   # one-off, keep .venv untracked
.venv/bin/python tools/export_images.py manifest.json images/portfolio
.venv/bin/python tools/build_portfolio.py
npm run build
```

Then update `images/portfolio/SOURCES.md` with the new rows. Source photographs and Keynote files live outside the repository (see SOURCES.md).
