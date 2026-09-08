# Ke Li — Contemporary Jewellery Artist

Personal portfolio website for **Ke Li**, a contemporary jewellery artist based in London.

MA Jewellery & Metal, Royal College of Art (2024) | BA Arts and Crafts, Shandong University of Arts

## Live Site

[like0210.github.io](https://like0210.github.io)

## Tech Stack

- HTML + [Tailwind CSS v4](https://tailwindcss.com/) + Vanilla JS
- Six languages: English, French, German, Chinese, Japanese, and Korean; browser-language default with a saved preference
- Two-page artist website: a homepage with linked series previews, biography and contact; Portfolio is the only complete artwork destination
- No frameworks — zero runtime dependencies
- `portfolio.html` — Symbiotic relief, Psychotherapy, Eden, and Shape of Traveling Memory, using 70 original images (finished pieces plus compact inspiration, sketch and process strips) and short English excerpts from the artist's own portfolios and project files; source mapping is in `images/portfolio/SOURCES.md`

## Design and interaction

An exhibition-catalogue layout uses warm white, muted green, serif typography, and asymmetric spacing. On desktop and tablet widths the Portfolio images are laid out in justified rows: the page generator groups consecutive images by aspect ratio so that every image in a row shares one height (widths follow the `--ar` custom property); a row that would grow too tall is narrowed and aligned to one side, single images are limited in width and can alternate left and right, and each process group sits under a small label. Below 760 px the works stack in one column and the process groups become a two-column grid. The homepage leads with Symbiotic relief, followed by four series previews in the same order as Portfolio, linking directly to Portfolio anchors. Full collection photography, material information and source excerpts appear only in Portfolio. Original image proportions are preserved.

Navigation is consistently Portfolio / About / Contact; the wordmark returns home. About and Contact remain homepage sections. Elsewhere in the footer holds the low-key Keli Jewellery and Orris links. Email and Instagram display link labels rather than account details (their destinations remain in the HTML). Chinese name text is visible only in Chinese mode.

The user confirmed that Breaking and Symbiotic relief are the same series. Public artwork labels now follow LIKE - RCA.pdf: Symbiotic relief, 2022. The three existing `images/works/breaking-*` URLs are retained inside its 27-image gallery (eleven photographs plus inspiration, sketch, material-experiment and wrapping-test strips). Existing `index.html#works` links still reach the homepage preview section; all four Portfolio anchors remain valid. Eden’s 2023–2024 date range follows the portfolio cover, as noted beside its source citation.

Portfolio image links open a native dialog with previous/next controls, arrow-key navigation, an image counter, loading/error feedback, and Escape to close. Native dialogs contain keyboard focus and return it to the opener. The mobile menu closes on navigation and when resizing to desktop. The site respects reduced motion and keeps content, navigation, and full-image links usable without JavaScript. Language storage is optional: blocked storage does not prevent the page from working.

Edit `src/input.css` for styling, `index.html` for the six content translations, and `js/main.js` for localized interface labels and interactions. Always rebuild `css/style.css` after editing source styles or utility classes.

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
