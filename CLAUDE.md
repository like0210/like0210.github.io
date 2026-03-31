# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for **Ke Li** (李可), a contemporary jewellery artist based in London. MA Jewellery & Metal from the Royal College of Art (2024), BA from Shandong University of Arts. Her practice explores the symbiotic relationship between jewellery and the human form.

Hosted on GitHub Pages at `like0210.github.io`.

## Tech Stack

- **HTML + Tailwind CSS + Vanilla JS** — single-page site
- **Tailwind CSS v4** with `@tailwindcss/cli` for build
- **Google Fonts**: Cormorant Garamond (headings), Inter (body)
- **No frameworks** — no React, no Vue, no bundler beyond Tailwind CLI
- **Bilingual**: Chinese/English toggle via `data-lang` attributes + JS

## Commands

```bash
npm run build    # Build Tailwind CSS (src/input.css → css/style.css)
npm run watch    # Watch mode for development
npm run dev      # Alias for watch

# Local preview
python3 -m http.server 8000
```

## Architecture

- `index.html` — Single-page site: Hero → Works → About → Contact → Footer
- `src/input.css` — Tailwind source CSS with custom theme, keyframes, component styles (lightbox, mobile menu, language toggle)
- `css/style.css` — Built output (do not edit directly)
- `js/main.js` — Language toggle (localStorage), header scroll effect, scroll reveal (IntersectionObserver), lightbox gallery, mobile menu, smooth scroll
- `images/works/` — Converted artwork JPEGs (large 1920px + thumbs 600px)
- `reference_materials/` — Source TIF images and artist docs (gitignored, not deployed)

## Language System

Bilingual content uses `data-lang-content="en"` / `data-lang-content="zh"` attributes. The `<html data-lang="...">` attribute controls visibility via CSS rules in `src/input.css`. JS toggles this and persists to localStorage.

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
