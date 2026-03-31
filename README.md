# Ke Li — Contemporary Jewellery Artist

Personal portfolio website for **Ke Li**, a contemporary jewellery artist based in London.

MA Jewellery & Metal, Royal College of Art (2024) | BA Arts and Crafts, Shandong University of Arts

## Live Site

[like0210.github.io](https://like0210.github.io)

## Tech Stack

- HTML + [Tailwind CSS v4](https://tailwindcss.com/) + Vanilla JS
- Bilingual (English / Chinese) with language toggle
- Single-page site: Hero, Works, About, Contact
- No frameworks — zero runtime dependencies

## Development

```bash
npm install              # Install dev dependencies
npm run build            # Build CSS (src/input.css → css/style.css)
npm run watch            # Watch mode for development

# Local preview
python3 -m http.server 8000
```

## Deployment

Push to `master` → GitHub Pages auto-deploys. Run `npm run build` before committing to ensure `css/style.css` is up to date.

## License

All artwork and content copyright Ke Li. Code is available under MIT License.
