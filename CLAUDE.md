# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for **Ke Li** (李可), a contemporary jewellery artist based in London. MA Jewellery & Metal from the Royal College of Art (2024), BA from Shandong University of Arts. Her practice explores the symbiotic relationship between jewellery and the human form.

Hosted on GitHub Pages at `like0210.github.io`.

## Tech Stack

- **HTML + Tailwind CSS v4 + Vanilla JS** — two static pages, no framework, no bundler beyond the Tailwind CLI
- **Google Fonts**: Cormorant Garamond (headings), Inter (body), Noto Sans JP/KR for CJK fallbacks
- **Six interface languages** (en, fr, de, zh, ja, ko) via `data-lang-content` attributes + JS; artwork titles, captions and excerpts stay in English inside `lang="en"` containers

## Commands

```bash
npm run build    # Build Tailwind CSS (src/input.css → css/style.css); run before every commit
npm run watch    # Watch mode for development

python3 -m http.server 8000          # Local preview at http://127.0.0.1:8000/
python3 tools/build_portfolio.py     # Regenerate portfolio.html sections + index.html cards (needs Pillow)
```

## Architecture

- `index.html` — Home: Hero (Symbiotic relief) → `#works` "Portfolio" section with three aligned preview cards (first three series, object photographs, square crop via `aspect-ratio`) → About → Contact → Footer
- `portfolio.html` — The only complete artwork destination. Series order is fixed by the artist's decision:
  **01 Symbiotic relief → 02 Psychotherapy → 03 Eden → 04 Shape of Traveling Memory**. Keep the homepage cards, the `.portfolio-index` nav, the meta description (also duplicated in `js/main.js`) and the docs in the same order. No project years are displayed anywhere (section labels, captions, cards, source lines).
- The four `<section class="portfolio-collection">` blocks and the homepage cards are **generated** by `tools/build_portfolio.py` from the manifest inside that script. Do not hand-edit figures: change the manifest (order, captions, alt text, excerpts), re-run the script, then `npm run build`.
- Each series = finished photographs in `.portfolio-gallery`, followed by labelled `.process-strip` groups (inspiration, sketches, material experiments, making process). Every image in a `.gallery-row` shares one height; widths follow the `--ar` custom property (aspect ratio). Single images use `--w`, over-tall rows use `--row-w`. Below 760 px works stack in one column and strips become a two-column grid.
- `src/input.css` — Tailwind source with the custom theme, layout rules, language visibility and dialog styles. `css/style.css` is built output (do not edit).
- `js/main.js` — language selection + persistence, localized UI labels, mobile menu, lightbox (groups by `data-gallery`, counts dynamically), copyright year.
- `images/portfolio/` — web exports (`<name>.jpg` + `<name>-thumb.jpg`, ≤1920 / ≤640 px, sRGB, no EXIF); `images/works/` — three legacy Symbiotic relief exports whose URLs are kept. Provenance for every file is in `images/portfolio/SOURCES.md`.
- `tools/` — generator, image exporter and Keynote slide-order reader (see `tools/README.md`). Source photographs and Keynote files live outside the repository.
- `reference_materials/` — gitignored source material; never commit it.

## Content rules

- Use only the artist's own photographs, sketches and verbatim English excerpts from her portfolios/Keynotes; no new artist statements. Third-party reference imagery, medical records and administrative documents are never published.
- Psychotherapy: never show the personal health narrative from LIKE - RCA p.1 or research collages containing medical imaging.
- When an image leaves the site, delete its files; never reuse a filename for different content.
- Update `images/portfolio/SOURCES.md` and `README.md` counts whenever images change.
- Footer "Elsewhere" links: Keli Jewellery → https://kelijewellery.com/, Orris → https://orris.kelijewellery.com/ (both pages).

## Post-Change Review (MANDATORY)

After making any changes, **always** run `/codex:review` to have Codex check the changes. Then review Codex's feedback and make further modifications if needed.

Available Codex commands:
- `/codex:review` — Standard code review of uncommitted changes. Use `--base main` for branch review, `--background` to run async.
- `/codex:adversarial-review` — Steerable review that challenges design decisions and assumptions. Accepts focus text (e.g., `/codex:adversarial-review look for race conditions`).
- `/codex:rescue` — Delegate a task to Codex (bug investigation, fix attempts). Supports `--model`, `--effort`, `--resume`, `--background`.
- `/codex:status` — Check progress on running/recent Codex jobs.
- `/codex:result` — Show final output of a finished Codex job.
- `/codex:cancel` — Cancel an active background job.

## Deployment

Push to `master` → GitHub Pages auto-deploys at `like0210.github.io`. Run `npm run build` before committing to ensure `css/style.css` is up to date.
