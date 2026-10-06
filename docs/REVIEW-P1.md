# Phase 1 review (ARM-12)

Reviewed 5 Oct 2026. Method: scripted sweep (headless Chrome via playwright-core) of every wireframe page at 1440×900 and 390×812, light and dark wireframe; scripted behaviour tests for the interactive regions; screenshot review of every home region. Wireframes: `wireframes/*.html`.

## 1. Traceability (SPEC §1)

| ID | Requirement | Where it is satisfied |
|---|---|---|
| BR-01 | Precision-engineered, dependable | Mono data type, units on every value, datasheet tables: H1, H3, H4, `product.html`; H8 proof wall |
| BR-02 | Bridge physical and digital | H1 board + live readout; H2 signal path; H3 lenses; H4 relay → board LED loop; H5 slider |
| BR-03 | Real boards and components | H1, H2, H3, H6 bins (17), `products.html`, `product.html`; IMG-07/12/15/16/17/18/20 photos |
| BR-04 | Live telemetry simulations | H4 console, H1 readout, H5 data chips; all tagged Simulated |
| BR-05 | Dark-mode option | Nav and footer theme switch, `T` key; both themes checked |
| BR-06 | Circuit line art | H2 trace, nav signal trace, H3 X-ray lens, line-art placeholders (rendered in ARM-14) |
| BR-07 | Interactive sensor widgets | H4 relays, e-stop, gauge; H5 slider; H3 hotspots |
| BR-08 | B2B conversion funnels | `flow.html` lanes and CTA map; nav, sticky mobile bar, H1/H4/H5/H7/H9/H10 CTAs; RFQ wizard (`rfq.html`) |
| BR-09 | IIoT, PLC, protocol positioning | H2 protocol chips, H5 Retro to IIoT, H7 capabilities, H8 integration-only wording |
| BR-10 | No flat SaaS pages | Hardware in every section (H0 and H10 carry line-art placeholders), instrument panel in H4, table not cards in `products.html` |
| GR-01 | Strategist thinking | `flow.html` funnel logic; annotations on every region |
| GR-02 | Micro-interactions | MO-01 to MO-16 annotated; relay, slider, drawer, wizard trace work as interaction states |
| GR-03 | Written reasons for choices | Annotations with BR/MO IDs; full rationale is ARM-23 |
| GR-04 | Responsive | Container-query layouts at 1440 and 390 on every page; checked |
| DL-01 | Wireframes and flow | `index.html` (H0–H10), `products.html`, `product.html`, `rfq.html`, `flow.html` |
| DL-02, DL-03 | Live app, rationale | Later phases (ARM-16 onward, ARM-23) |

No row is missing coverage.

## 2. Re-verification of ARM-04 to ARM-11

| Task | Result |
|---|---|
| ARM-04 | All routes and H0–H10 shown; 5 lanes each end in a conversion; 14-row CTA map; 4 annotations; no overflow at 390. **Pass** |
| ARM-05 | At 1440×900 headline, both CTAs and the board are above the fold; at 390×812 the board, headline and both CTAs are. Nav and sticky bar both carry Request a quote. Theme switch drives dark mode. Menu overlay opens. **Pass** |
| ARM-06 | 5 stages on one trace; mobile vertical; slider drags and stats light at 20/45/70 %; CTA `rfq.html?who=plant&need=retro`. **Pass** |
| ARM-07 | 4 boards × 3 lenses switch; 9 hotspots on IA015 with real specs and units, one card open; mobile numbered list. **Pass** after fixing mobile marker size (44 px) |
| ARM-08 | All widgets present; relay → LED + log + watts; e-stop holds relays and blocks toggling; reset restores. **Pass** |
| ARM-09 | 17 bins, drawers, filters (lora = 2, wifi = 14), all bins link to `product.html#code`; proof numbers carry source and date. **Pass** |
| ARM-10 | 17 products listed; facet counts update; compare 2–3 works; all 17 hashes render; CTAs carry code and need. **Pass** after fixing the BA015 mounting facet |
| ARM-11 | 5 steps, review, success; back keeps values; `who`, `need`, `product`, `topic` pre-fills; trace tracks the step. **Pass** |

## 3. Defects found

| # | Defect | Status |
|---|---|---|
| 1 | `.wf-img` photos were in colour (kit omitted the greyscale filter) | Fixed in `wireframe.css` |
| 2 | `wf-spec` caption broke the mobile layout | Fixed in `wireframe.css` |
| 3 | `flow.html` long param codes overflowed at 1440 | Fixed |
| 4 | H1 hero pushed the CTAs below the fold at 390 | Fixed (compact H0, lens switch overlaid on the board) |
| 5 | H3 hotspot markers 28 px on mobile; product crumbs 32 px | Fixed (44 px) |
| 6 | BA015 mounting recorded as wall mount; "Switch box" facet had zero results | Fixed in `PRODUCTS.json`, regenerated |
| 7 | H0 and H10 showed no hardware (BR-10) | Fixed with line-art placeholders |
| 8 | KITTEST still present | Removed from `index.html` |
| 9 | `credits.html` is a stub (content belongs to ARM-02, blocked on download approval) | **Open** (not a defect of Phase 1 pages) |
| 10 | Dynamic related-board links (`#ia013`) have no anchor in the static page | By design (resolved by `product.html` hashchange) |

No task was reopened.

## 4. Sweep results

7 pages × 2 viewports × 2 themes: zero page-level horizontal scroll, zero console errors (the only request error is a missing favicon), zero interactive targets under 44 px on mobile after the fixes. The bin rows in H6 and the compare table scroll inside their own container by design.

CTA pre-fill test: 17 distinct `rfq.html?…` links were opened; each lands on the expected step with the "Pre-filled" banner and no errors (who only → step 2; who + need → step 3; product + need only → step 1 with the choice kept).

## 5. Content integrity

- Specs on `product.html`, `products.html`, H3 and H6 are generated from `docs/PRODUCTS.json`; disputed values carry a visible `[VERIFY]`.
- Every telemetry value (H1, H4, H5, nav strip, footer uptime) carries a Simulated tag.
- Images are used by asset ID only (IMG-03, 05, 07, 12, 15, 16, 17, 18, 20, plus VID-01). IMG-19, IMG-13, IMG-08 and others are not placed yet.
- No certifications, client names, prices or ROI figures anywhere. GitHub activity is not described as "active" (last push Jul 2021).
- Contact details, the legal name and the Tindie figure remain flagged.

## 6. Rubric scores (SPEC §1)

| Criterion | Weight | Score | Why |
|---|---|---|---|
| Creative concept and storytelling | 25 % | 4 / 5 | One idea ("Make every machine talk") carried by the trace, the five-stage path and the Retro to IIoT slider. Held back only by wireframe fidelity: the packet and the story are annotated, not yet felt |
| Visual design and typography | 25 % | 3 / 5 | Phase 1 is greyscale with system fonts by design. Structure, grid and density are strong; the craft score is decided in ARM-13 to ARM-15 |
| Micro-interactions and UX motion | 25 % | 4 / 5 | Relay → LED → log loop, e-stop, slider, drawer, lens and hotspot states and the wizard trace all work as states, with reduced-motion notes. Real motion arrives in ARM-17/18 |
| FE polish and responsiveness | 15 % | 4 / 5 | Zero overflow, zero errors, 44 px targets, dense tables stack at 390, both themes hold |
| Design justification | 10 % | 3 / 5 | Annotations give reasons per region; the written rationale is ARM-23 |

## 7. Top 3 improvements for Phase 2

1. **The IA015 hero render is the whole pitch.** Draw it first (ARM-14) with true hotspot and LED positions; the placeholder markers in H3 are indicative only.
2. **Commit to a type and colour system that survives both themes** (ARM-13): copper for brand, signal green reserved for live data, mono for every value, with computed AA ratios.
3. **Resolve the open data questions with the user** before they reach the live site: IA015 analog-input count (3 vs 4), IA013 power variant, BA015 and BA019 load limits, current contacts and legal name. They appear as `[VERIFY]` marks today.

## 8. Phase 2 approval

Phase 1 is approved to move on. Outstanding for the user: ARM-02 (image downloads, awaiting approval) and the open data questions above.
