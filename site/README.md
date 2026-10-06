# ARMtronix site (Phase 3 build)

Vite + React 19 + TypeScript + Tailwind 4 + GSAP/ScrollTrigger + Lenis + React Router 7.

```bash
npm install
npm run dev      # http://127.0.0.1:5180
npm run build    # tsc + vite build → dist/
npm run lint
npm run gen      # regenerate src/data/{assets,products}.ts after editing docs/PRODUCTS.json or tasks/reference/assets.json
python3 scripts/gen-images.py   # re-encode wireframes/assets/img/*.jpg → public/img/*.webp (needs Pillow), then npm run gen
```

## Contracts other tasks build on (ARM-16)

| Module | What it gives you |
|---|---|
| `src/lib/telemetry.ts` | The one simulated data source (SPEC §7). Read the header comment: `useTelemetry(selector, rootRef)`, `setRelay`, `toggleRelay`, `injectFault`, `clearFault`, `reset`. Pass `rootRef` so the engine pauses when your widget is off-screen. `?seed=N` and `?telemetry-debug` in the URL. |
| `src/lib/theme.ts` | `useTheme()`, `setTheme(t, origin)`, `toggleTheme()`. Themes: `control-room` · `datasheet` (tokens in `docs/design/tokens.css`). |
| `src/lib/motion.ts` | `useReducedMotion()`, `scrollToTarget()`, `gsap`, `ScrollTrigger`, `EASE`, `DUR`. Wrap GSAP work in `gsap.context` and skip decorative tweens when reduced. |
| `components/layout/SignalTrace.tsx` | `emitPacket(tone?)` fires a pulse down the global trace (no-op when reduced). `STAGES` lists the five story stages. |
| `components/ui/*` | `Button` (MO-11; `to` / `href` / button), `Chip`, `SpecTable`, `SimTag`, `StatusLed`, `Img` (by asset ID), `VideoEmbed` (click-to-load), `Verify` (visible `[VERIFY]`). |
| `data/products.ts` · `data/assets.ts` | Generated and typed. `getProduct('ia015')`. Never edit by hand. |

Styling: tokens come from `docs/design/tokens.css` and are mapped to Tailwind (`bg-surface`, `text-copper`, `font-mono`…). Shared primitives live in `src/styles/index.css`. Section styles belong to their section's task.

Each `src/sections/Hx/index.tsx` is a stub that its build task replaces (owners in `tasks/README.md`). H10 is the global `Footer`. When every stub is gone, delete `sections/SectionStub.tsx` and the `.stub` / `.sec` stub styles.
