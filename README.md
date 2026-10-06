# ARMtronix · Make Every Machine Talk

A concept website for ARMtronix, an Industrial IoT and automation hardware maker in Hubballi, India, made for an internal UI/UX and frontend challenge. Not affiliated with the company. Telemetry on the site is simulated.

| Folder | What's in it |
|---|---|
| `site/` | The website: Vite, React, TypeScript, Tailwind CSS, GSAP |
| `wireframes/` | Wireframes and user flow (open `wireframes/index.html`) |
| `docs/RATIONALE.md` | Design and strategy rationale |
| `docs/design/` | Design tokens, style tile, board renders and line art |

## Run locally

```bash
cd site
npm ci
npm run dev
```

## Deploy to GitHub Pages

```bash
cd site
npm run build:pages   # builds for /armtronix/ with a 404.html fallback for client-side routes
```

Then publish the contents of `site/dist/` (plus `wireframes/`) to the `gh-pages` branch.

Photos are freely licensed; see the site's Credits page.
