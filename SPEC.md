# ARMtronix: FE Design Spec Sheet

**Project:** Internal Creative UI/UX & Frontend Challenge, Brand 2 of 3
**Brand:** ARMtronix Technologies LLP: Industrial IoT and automation hardware, Hubballi, Karnataka, India
**Current phase:** Phase 1, FE wireframes (local only)
**Hard deadline (whole challenge):** Tue 6 Oct 2026, 10:00 AM IST
**Spec version:** v0.2, 5 Oct 2026 (v0.2: ARM-03 cross-checked §14.5 against the datasheets and corrected GitHub and Tasmota wording; see `docs/FACTS.md` §4)

---

## 0. Read this first: which "Armtronix"?

| | Brief says | What research found (5 Oct 2026) |
|---|---|---|
| **Company** | "Innovative **Indian** technology firm: IIoT, automation controllers, robotics, custom sensor interfaces, PLCs, Industry 4.0" | **ARMtronix Technologies LLP, Hubballi, Karnataka** (GitHub org since 2015, product catalogues, armtronix.in → armtronix.net "ARMtronix IoT Pvt. Ltd.") matches this description exactly |
| **Website** | armtronix.com | armtronix.com currently shows a **Malaysian** "integrated infrastructure enterprise" (data centres, construction, power transmission; Kuala Lumpur HQ, Penang ops), a different business profile |

**Decision (default until the user overrides it):** design for the company **the brief describes**: ARMtronix, the Indian IIoT hardware maker in Hubballi, using its real product catalogue. Don't use content from armtronix.com. This is open question Q1 (§13); ARM-03 must record the user's answer if one is given.

---

## 1. What the brief asks for (source requirements)

| ID | Requirement (from the brief) | Type |
|----|------------------------------|------|
| BR-01 | Feel **precision-engineered, dependable and cutting-edge** | Concept |
| BR-02 | **Bridge the physical and digital worlds**: real circuit boards, microcontrollers, factory automation parts **alongside live cloud telemetry simulations** | Concept / Interaction |
| BR-03 | Showcase real circuit boards, microcontrollers and factory automation components | Content |
| BR-04 | Live cloud **telemetry simulations** | Interaction |
| BR-05 | **Dark-mode** aesthetic options | Visual |
| BR-06 | **Circuit-inspired line art** | Visual |
| BR-07 | **Interactive sensor widgets** | Interaction |
| BR-08 | **Clear B2B conversion funnels** for industrial buyers and automation engineers | UX / Conversion |
| BR-09 | Positioning: IIoT, automation controllers, robotics, custom sensor interfaces, PLCs, Industry 4.0 smart-factory deployments | Content |
| BR-10 | **Avoid:** flat SaaS marketing landing pages that hide the physical reality of hardware engineering | Constraint |
| GR-01 | Think like a brand strategist / creative director; anti-template | Global |
| GR-02 | Delightful micro-interactions, rich animation, tactile responsiveness | Global |
| GR-03 | Every font, colour, image and component choice has a written branding reason | Global |
| GR-04 | Seamless responsiveness on mobile and desktop | Global |
| DL-01 | Wireframes and layout flow showing structure and user journey | Deliverable |
| DL-02 | Live, responsive, clickable FE web app on a free host | Deliverable (later phase) |
| DL-03 | Design and strategy rationale: brand strategy, UX and motion, client pitch value | Deliverable (later phase) |

### Rubric → what it means here

| Criterion | Weight | For ARMtronix |
|-----------|--------|---------------|
| Creative concept and storytelling | 25% | One idea ("Make every machine talk") carried by a single visible signal path through the site |
| Visual design and typography | 25% | Engineering-grade precision: grid, mono data type, copper and solder-mask palette, two themes |
| Micro-interactions and UX motion | 25% | The board explorer and telemetry console must feel like touching real hardware |
| FE polish and responsiveness | 15% | Dense technical content that still works at 390px |
| Design justification | 10% | Rationale for every choice (§11) |

---

## 2. Scope

**Phase 1 (now):** sitemap, B2B funnel flows, wireframes of every page at **1440** and **390**, annotated interactions, proposed tokens. Built as local static HTML, reusing the Hameediyah wireframe kit.
**Later:** visual design, board renders, production build, deploy, rationale.
**Out of scope:** backend, real IoT connectivity, a real MQTT broker, accounts, e-commerce checkout. Telemetry is **simulated in the browser** and labelled as simulated.

---

## 3. Creative concept

### Big idea: "Make Every Machine Talk"

ARMtronix's signature product is literally called **Retro to IIoT** (IA015): a DIN-rail box that gives legacy Siemens and Beckhoff PLCs a voice over Wi-Fi, BLE, RS485/Modbus, CAN and Ethernet. That's the brand in one sentence: **they make silent machines speak.** The site makes the user hear it.

**The signal path (primary motif).** A single copper trace runs down the whole site, the way a trace runs across a PCB. Data packets (small glowing pulses) travel along it from a physical input (a sensor, a switch, a 4–20 mA loop) through an ARMtronix board, across a protocol (MQTT / Modbus / LoRa) and into a dashboard. The trace is the scroll progress bar, the section connector, and the storyline: **Physical → Board → Protocol → Cloud → Decision.**

**Two lenses on everything (BR-02).** Every piece of hardware can be seen as a **photo** (the physical reality), an **X-ray** (schematic and circuit line art) or **live** (its telemetry). Switching lenses is the site's core gesture.

**Two themes (BR-05).**
- **Control Room** (default, dark): solder-mask black-green, copper traces, status-LED accents. How an engineer sees a panel at night.
- **Datasheet** (light): off-white paper, black ink, a technical-drawing feel. How a buyer reads a spec sheet.
The theme toggle is a physical toggle switch.

### Tone of voice
Precise, confident, quietly proud of being engineers. Short declaratives. Real numbers with units ("24 V DC · 4–20 mA · RS485"), never vague claims ("blazing fast"). Made in Hubballi, India, said with pride.

### Anti-template guardrails (BR-10)
- **Hardware is always on screen.** No section goes without a board, a component, a terminal or a schematic.
- No floating-gradient blobs, abstract 3D shapes, or "platform" language hiding the product.
- No pricing tiers or SaaS feature-tick tables. Specs appear as engineering datasheet tables with units.
- Every number shown is either a real spec (from the catalogue) or explicitly labelled simulated.

---

## 4. Users and B2B funnels

| Persona | Needs | Primary funnel |
|---------|-------|----------------|
| **Automation / controls engineer** | Exact I/O, protocols, power, mounting, pinouts, datasheet, sample code | Hero → Board explorer → Product detail → Datasheet / "Request sample" |
| **Industrial buyer / procurement** | Reliability, who's behind it, lead time, MOQ, support, a quote | Hero → Product lines → Proof → RFQ wizard |
| **System integrator / OEM** | Customisation, white-label, firmware changes, volume | Engineering services → RFQ (custom design) |
| **Plant / facility manager** | "Can I monitor my old machines without replacing them?" | Retro to IIoT story → Telemetry console → RFQ |
| *Maker / developer (secondary)* | Open source, Tasmota compatibility, GitHub | Proof section → GitHub |

**Funnel rules (BR-08)**
- A **primary CTA, "Request a quote"**, is reachable from every screen (sticky on mobile).
- A **secondary CTA, "Talk to an engineer"**, opens the same RFQ wizard pre-set to a technical query.
- **Micro-conversions:** download catalogue PDF, view datasheet (GitHub), copy an MQTT example, watch a review.
- Every product detail page ends in **Request quote · Request sample · Ask about customisation**, each pre-filling the RFQ with that product code.

---

## 5. Sitemap / IA

```
/                       Home: the signal-path story (H0 to H10)
/products               Catalogue: Industrial Automation (IA) and Building Automation (BA)
/products/:code         Product detail, e.g. /products/ia015 (board explorer, specs, pinout, MQTT, RFQ)
/solutions/retro-iiot   Optional: long-form retrofit story (can stay a Home section)
/engineering            Custom hardware design services (optional page; Home H7 summarises it)
/rfq                    Request-for-quote wizard (also opens as an overlay from any CTA)
```

**Global UI**
- Desktop top bar: wordmark · Products · Solutions · Engineering · Proof · **theme toggle switch** · **Request a quote** (primary).
- Mobile: wordmark, menu, and a **sticky bottom bar** with "Request quote" and "Call".
- **Signal-trace progress:** a copper trace on the left edge (desktop) or the top edge (mobile) with a travelling packet.
- **Status strip:** a thin "system status" line in the nav ("● 3 boards online · simulated") that links to the telemetry console.

---

## 6. Home page sections

### H0. Boot sequence (preloader)
- Terminal-style boot log in mono, about 1.2 s: `init esp32 … ok`, `wifi 802.11 b/g/n … ok`, `mqtt connect … ok`, then `▶ ARMtronix online`. Skippable, once per session, off under reduced motion.

### H1. Hero: "Make every machine talk."
- **Content:** headline, sub-line ("Industrial IoT hardware, engineered in Hubballi, India: from 24 V DIN-rail controllers to Wi-Fi relay boards"), **a large top-down render of IA015 Retro to IIoT**, a live mini-telemetry readout next to it (3 values ticking), CTAs **Explore hardware** and **Request a quote**.
- **Interaction:** pointer tilts the board in 3D (subtle); status LEDs blink; a packet leaves the board's antenna and starts the signal trace down the page. A lens switch (Photo / X-ray) is previewed here.
- **Mobile:** board above the headline, no tilt (gyro optional), CTAs full width.
- Traces: BR-01, BR-02, BR-03, BR-05

### H2. The signal path (scrollytelling)
- **Purpose:** explain IIoT in 5 seconds without jargon, using their real hardware.
- **Stages (pinned on desktop, one per scroll step):**
  1. **Physical:** a machine or sensor (IMG-07 legacy PLC, IMG-11 robot arm): a 4–20 mA loop, a 24 V input.
  2. **Board:** an ARMtronix board catches the signal (IA015 / IA009 render).
  3. **Protocol:** the packet is labelled MQTT / Modbus RTU / Modbus TCP / LoRa.
  4. **Cloud:** a broker or dashboard receives it.
  5. **Decision:** an alert, a relay toggling, an energy saving.
- The packet animates along the copper trace from stage to stage. **Mobile:** vertical stack, packet on a vertical trace.
- Traces: BR-02, BR-06, BR-09

### H3. Board explorer (signature interaction 1)
- **Purpose:** prove the physical engineering (BR-10).
- **Content:** a selectable board (IA015, IA013, BA011, IA003) shown large. **Lens tabs: Photo · X-ray · Layers.**
  - *Photo:* the realistic render.
  - *X-ray:* circuit line art of the same board, traces glowing.
  - *Layers:* an exploded stack (enclosure → PCB top → components → PCB bottom → DIN clip) that separates on scroll or drag.
- **Hotspots** with leader lines: MCU/SoC, radio, RS485 transceiver, CAN, power input (24 V DC), DI/DO terminals, 4–20 mA inputs, programming header, mounting. Each hotspot card holds the real spec from the catalogue (§14.5).
- **Mobile:** board fills the width, hotspots become a numbered list below that highlights on tap; lens tabs as a segmented control.
- Traces: BR-02, BR-03, BR-06, GR-02

### H4. Live telemetry console (signature interaction 2)
- **Purpose:** the "digital" half of the bridge: hardware producing data (BR-04, BR-07).
- **Layout:** a dashboard laid out like a control panel (not SaaS cards):
  - **Analog gauge**: a 4–20 mA input mapped to tank level or pressure (needle with spring physics).
  - **Digital inputs**: 4 LEDs (door switch, limit switch, e-stop, machine running).
  - **Relay outputs**: 4 physical-looking toggle switches. Flipping one plays a relay "click", lights the LED **on the board render**, and logs an MQTT message.
  - **Power monitor** (from BA015/BA019 power monitoring): live W, V, kWh sparkline.
  - **MQTT log**: scrolling topic/payload lines in mono (generic format, labelled example).
  - **Fault injection** button: "Simulate e-stop" → alarm state, red strip, notification, then recovery.
- **Simulation rules:** §7.
- **Mobile:** one widget per row; the log collapses to its last 3 lines; relays stay large (≥ 56px).
- Traces: BR-02, BR-04, BR-07, GR-02

### H5. Retro to IIoT: before / after
- **Purpose:** the business story for plant managers and buyers: don't replace your machines, connect them.
- **Content:** a drag slider over a legacy control cabinet (IMG-07 / IMG-08 / IMG-20). Left side "Silent": greyed out, no data. Right side "Talking": data overlays, packets, status. Three outcome stats appear as the slider moves, **phrased as capabilities, not invented ROI numbers** (e.g. "Works with Siemens and Beckhoff PLCs", "DIN-rail mount, 24 V DC", "Wi-Fi · BLE · RS485 · CAN · Ethernet").
- CTA: "Assess my machines" → RFQ pre-set to Retro to IIoT.
- Traces: BR-02, BR-08, BR-09

### H6. Product lines: the parts drawer
- **Purpose:** browse the catalogue at a glance without SaaS cards.
- **Metaphor:** an engineer's **component drawer / reel rack**: two drawers, **Industrial Automation (IA)** and **Building Automation (BA)**, that slide open to show product "bins". Each bin shows the code (IA015), name, 3 key specs as chips (24 V DC · RS485 · DIN), and a mini board render.
- **Filter chips by interface:** Wi-Fi, Bluetooth, LoRa, RS485/Modbus, CAN, Ethernet, Raspberry Pi. Also power: 24 V DC / 100–260 V AC.
- Links to `/products/:code`; "See full catalogue" goes to `/products`.
- Traces: BR-03, BR-09, BR-10

### H7. Engineering services: from schematic to shipment
- **Purpose:** the OEM / custom-design funnel ("custom sensor interfaces", BR-09).
- **Content:** a 6-step process drawn as **PCB fabrication stages**: Requirement → Schematic → Layout → Firmware → Prototype and validation → Production. The visual builds up a board stage by stage (bare FR4 → copper → solder mask → silkscreen → assembled → boxed).
- Capabilities list: custom I/O boards, protocol gateways (Modbus ⇄ MQTT ⇄ LoRa), Raspberry Pi industrial HATs, firmware (Tasmota-compatible, MQTT, OTA), enclosures and DIN mounting. **Only claim what the catalogue or the repos show**; anything else gets `[VERIFY]`.
- CTA: "Start a custom design" → RFQ pre-set to custom.
- Traces: BR-08, BR-09

### H8. Proof: built in the open
- **Content (verified, §14.5):** open-source on GitHub (32 public repos, the most-starred being their STM32 LoRa library); boards **Tasmota-compatible** and listed in the Tasmota device docs; a Tindie store since June 2015 with 500+ orders; covered by CNX Software (2016); third-party video reviews (VID-01 to VID-03).
- **Layout:** a "test bench" wall: a GitHub contribution-style grid, a Tasmota badge, a Tindie stat as a 7-segment counter, and an embedded review video.
- Robotics and Industry 4.0 claims (BR-09) appear only as **integration** ("talks to the PLCs that run your robots") unless verified.
- Traces: BR-01, BR-09

### H9. Request a quote (RFQ entry)
- An inline start of the RFQ wizard (§8): step 1 visible ("I am a… OEM / System integrator / Plant or facility / Engineer / Developer"), which continues in the overlay or on `/rfq`.
- Alongside: direct contacts (sales email, phone), "Download catalogue (PDF)".
- Traces: BR-08

### H10. Footer
- Wordmark, "Engineered in Hubballi, India", address, contacts, product links, GitHub, a credits link, the theme toggle repeated, and a tiny "uptime" line (decorative, labelled).

---

## 7. Telemetry simulation spec (shared by H1, H4 and product pages)

| Signal | Source spec | Simulated behaviour |
|--------|-------------|---------------------|
| Analog in (4–20 mA) | IA015 has 4× 4–20 mA AI | Seeded random walk within 4–20 mA, mapped to 0–100% level; occasional slow ramps |
| Digital inputs | 24 V DC tolerant DI (IA009, IA015) | Mostly stable; "machine running" toggles every 20–40 s |
| Relay outputs | BA011 (4 relays), IA009 (12 DO) | User-driven; state echoed to the board render and the MQTT log |
| Power | BA015 / BA019 power monitoring | V ≈ 230 ± 4; W follows the relay states (each load has a wattage); kWh integrates over time |
| MQTT log | Commands documented in the IA015 datasheet | Topic/payload lines in a generic `armtronix/<device>/<io>` style, **labelled "example format"** |

**Rules:** deterministic (seeded) so screenshots and tests repeat; 1 Hz update; **pauses when off-screen or the tab is hidden**; every widget carries a visible **"Simulated"** tag; no network calls.

---

## 8. RFQ wizard (/rfq and overlay): the B2B funnel

| Step | Fields | Notes |
|------|--------|-------|
| 1 · Who | OEM · System integrator · Plant / facility · Engineer · Developer | Large tiles; changes the copy on later steps |
| 2 · Need | Off-the-shelf product · Customised product · Full custom design · Retro to IIoT assessment | Pre-filled by the entry CTA |
| 3 · Spec | Product code(s) (multi-select from the catalogue), interfaces (chips), I/O counts, power (24 V DC / 230 V AC), environment notes | Skipped or shortened for "Developer" |
| 4 · Volume | Quantity bands (1–10 · 10–100 · 100–1k · 1k+), timeline, prototype needed? | |
| 5 · Contact | Name, company, email, phone, city, message | Client-side validation only |
| Review | Summary card, "Edit" per step, **Send** | FE only: show a success state with a reference number and a prefilled `mailto:sales@armtronix.in` fallback. Nothing goes to a server |

Progress is shown as a **signal trace with 5 vias** that light up per step. The draft persists per viewer in `localStorage` (try/catch).

---

## 9. Product pages

**/products (catalogue).** Left filter rail (line IA/BA, interface, power, mounting, I/O type); right side an **engineering table/list view** (code · name · interfaces · power · I/O · mounting) with an optional bin/grid toggle. Compare up to 3 products in a side-by-side datasheet view.

**/products/:code (detail).**
1. Header: code, name, one-line purpose, key-spec chips, and the CTAs **Request quote / Request sample**.
2. Board explorer (the H3 component, scoped to this product).
3. **Datasheet table** with real values from §14.5 and units.
4. **Pinout / connections** diagram (X-ray lens).
5. **Integration snippet**: an MQTT example (copy button), with a Tasmota-compatible badge where true.
6. Downloads: the datasheet PDF link (GitHub `ARMtronix_Product_Documents`).
7. Related products, then an RFQ prompt pre-filled with this code.

---

## 10. Proposed design tokens (finalise in ARM-13)

### Colour

| Token | Control Room (dark) | Datasheet (light) | Use |
|-------|--------------------|-------------------|-----|
| `--bg` | `#0A0F0D` substrate | `#F4F2EC` datasheet paper | Page background |
| `--surface` | `#0F1A16` solder-mask | `#FFFFFF` | Panels, widgets |
| `--line` | `#1E3A30` | `#CFCAC0` | Grid, dividers, line art |
| `--copper` | `#C8783A` | `#A35A22` | Signal trace, primary accent, key CTAs |
| `--signal` | `#38E2B8` | `#0B8F6E` | Live data, "online", packets |
| `--amber` | `#FFB21E` | `#B87900` | Warnings, status LEDs |
| `--fault` | `#FF4D4F` | `#C62828` | Faults, e-stop |
| `--ink` | `#E6ECE9` silkscreen | `#121614` | Text |
| `--ink-dim` | `#8FA39A` | `#5A615D` | Secondary text |

Rules: copper is the brand (it literally carries signals on a PCB); signal-green is reserved for **live data**; red appears only for faults. Body text meets WCAG AA in both themes.

### Typography (proposal)

| Role | Typeface | Why |
|------|----------|-----|
| Display | **Archivo** (variable, width 62–125) | Expanded widths read as stencilled, engineered and industrial; the width axis can animate ("stretch to signal") |
| Body | **IBM Plex Sans** | Engineering heritage, very legible in dense specs |
| Data / code / silkscreen | **IBM Plex Mono** (or JetBrains Mono) | Telemetry values, part codes, MQTT, pin labels: a datasheet's voice |

### Line art and grid
- A 1px circuit line-art system: 45° and 90° traces only, vias as 4px rings, pads as rounded rectangles. It is used for section dividers, illustrations and the X-ray lens.
- A **4 px base grid**. 12 columns at 1440 and 4 at 390. Visible fine grid lines on hero and console backgrounds (like a cutting mat or PCB grid).

---

## 11. Motion and micro-interaction catalogue

| ID | Where | Trigger | Behaviour | Why | Reduced-motion fallback |
|----|-------|---------|-----------|-----|------------------------|
| MO-01 | Global | Scroll | Copper signal trace fills; a packet rides it | The storyline as progress | Static filled trace |
| MO-02 | H0 | Load | Boot log types out | Engineering credibility in 1 s | Skipped |
| MO-03 | H1 | Pointer | 3D board tilt, LEDs blink | Hardware feels touchable | Static board |
| MO-04 | H2 | Scroll scrub | Packet travels between the 5 stages | Explains IIoT visually | Stages shown as a list |
| MO-05 | H3 | Tab / scroll | Photo ⇄ X-ray wipe; layers explode | Physical ⇄ digital in one gesture | Instant swap |
| MO-06 | H3 | Hover / tap | Hotspot pulse, leader line draws | Guides the eye to real components | Static markers |
| MO-07 | H4 | Click | Relay toggle: switch travel, click sound (opt-in), board LED lights | The most tactile moment on the site | No travel, instant state |
| MO-08 | H4 | Data | Gauge needle spring, sparkline draw | Data feels alive | Numeric value only |
| MO-09 | H4 | Data | MQTT log lines type in | Shows the protocol in action | Lines appear instantly |
| MO-10 | H4 | Click | Fault injection: red sweep, alarm, recovery | Shows reliability under failure | Static alert banner |
| MO-11 | Buttons | Press | Tactile switch: 2px travel, shadow compress | Hardware button feel | Colour change |
| MO-12 | Theme | Click | A physical toggle flips; theme cross-fades from the switch outward | Dark mode as a hardware gesture | Instant switch |
| MO-13 | Numbers | In view | Mono tickers count up; 7-segment counter | Instrument-panel feel | Final value |
| MO-14 | H7 | Scroll | PCB fabrication stages build the board up | Shows real engineering process | Stage images in a row |
| MO-15 | H6 | Click | Drawer slides open on rails | Physical parts-bin metaphor | Instant open |
| MO-16 | RFQ | Step | Vias light along the trace | Funnel progress you can feel | Static step counter |

Principles: precise easing (`cubic-bezier(.2,.8,.2,1)`), 150–400 ms for UI and up to 800 ms for storytelling. Nothing bounces except physical things (the needle, switches). 60 fps; animate only transforms and opacity. Everything honours `prefers-reduced-motion`.

---

## 12. Non-functional requirements

| Area | Requirement |
|------|-------------|
| Responsive | Layouts designed at 390, 768, 1024 and 1440; dense tables become stacked spec lists at 390; touch targets ≥ 44px (relay switches ≥ 56px) |
| Accessibility | AA contrast in **both** themes; every widget keyboard-operable; gauges and LEDs have text equivalents; `aria-live` (polite, throttled) for telemetry; reduced motion respected |
| Theme | Respect `prefers-color-scheme` on first visit; the toggle persists per viewer (localStorage, try/catch) |
| Performance | LCP < 2.5 s on 4G; board renders as optimised SVG/WebP; the telemetry engine pauses off-screen; JS ≤ 250 KB gzip |
| Content integrity | Every spec comes from the catalogue (§14.5); every claim is verified or marked `[VERIFY]`; all telemetry is labelled simulated; no invented certifications, clients or ROI numbers |

---

## 13. Assumptions, open questions, risks

**Assumptions:** English only; FE only; the catalogue PDFs on ARMtronix's public GitHub are the spec source; the product line-up may have changed since the catalogues were made.

**Open questions**
1. **Q1 Entity:** the brief's Indian IIoT firm (ARMtronix, Hubballi) vs the armtronix.com Malaysian infrastructure group. *Default: the Indian firm (§0).*
2. **Q2 Product photos:** ARMtronix's own board photos (GitHub datasheets, Tindie) are their copyright. Fine for an internal pitch *to them*; use on the public site only with permission. *Default: build our own SVG board renders from the datasheet specs (better for the lenses anyway); use their photos only as drawing reference.*
3. **Q3 Robotics and certifications:** the brief mentions robotics; the catalogues show none, and no certifications are listed. *Default: show robotics as integration, claim no certifications.*
4. **Q4 Company name:** "ARMtronix Technologies LLP" (catalogues, GitHub) vs "ARMtronix IoT Pvt. Ltd." (armtronix.net). *Default: brand as "ARMtronix"; legal name in the footer marked `[VERIFY]`.*

**Risks**

| Risk | Mitigation |
|------|-----------|
| Deadline 6 Oct 10:00 IST, three brands | Build the ★ tasks first: hero, board explorer, telemetry console, RFQ |
| The dashboard drifts into a "SaaS look" | Panel/instrument styling, a board render always beside the data, no card grids |
| Heavy SVG and animation on mobile | Simplified mobile renders; pause off-screen; reduced-motion paths |
| Wrong specs embarrass us in front of engineers | Specs only from §14.5; ARM-03 cross-checks them against the datasheet PDFs |

---

## 14. Asset register and facts

**Sourcing rule:** same as Hameediyah. Only freely licensed images (Wikimedia Commons: CC0, PD, CC BY, CC BY-SA, all credited) and embedded YouTube videos go on the site. Copyrighted material is reference only. Machine-readable list: [`tasks/reference/assets.json`](tasks/reference/assets.json).

### 14.1 Photos: cleared (Wikimedia Commons)

| ID | Subject | Use in | Licence / credit |
|----|---------|--------|------------------|
| IMG-01 | ESP32 development board | H3 / H7 context | CC BY-SA 4.0, Edwiyanto |
| IMG-02 | ESP-WROOM-32 module | H3 hotspot ("the radio") | CC BY-SA 4.0, Brian Krent |
| IMG-03 | ESP8266 module | H8 heritage ("the first boards") | CC BY-SA 4.0, Suyash Dwivedi |
| IMG-04 | Raspberry Pi 4 Model B | IA002 / IA003 context | CC BY-SA 4.0, Laserlicht |
| IMG-05 | Circuit board macro | Hero and section texture | CC BY-SA 4.0, Ingo Dierking |
| IMG-06 | Green circuit board | Background texture | CC BY 2.0, Peter Shanks |
| IMG-07 | Siemens PLC in a cabinet | H2 stage 1, H5 "Silent" | CC BY-SA 3.0, BreakdownDiode |
| IMG-08 | Siemens Simatic S7-416-3 | H5 legacy PLC | Public domain, Mixabest |
| IMG-09 | DIN-rail power terminals | H3 / H7 detail | CC BY-SA 3.0, Dmitry G |
| IMG-10 | DIN-rail clamp terminals | Detail | CC BY-SA 3.0, Dmitry G |
| IMG-11 | Robotic arm on a factory line | H2 stage 1, Industry 4.0 | CC BY 4.0, Henrysz |
| IMG-12 | LoRa IoT gateway station | LoRa (IA005 / IA013) | CC BY-SA 4.0, -stk |
| IMG-13 | LoRaWAN deployment diagram | Reference for the network diagram | CC0, Roujiamo87 |
| IMG-14 | PLC 8-point relay output module | Relay context | CC BY-SA 4.0, Mithilrkadam |
| IMG-15 | 5 V single relay module | Relay detail | CC BY-SA 4.0, Suyash Dwivedi |
| IMG-16 | SMD parts on a wave-soldered PCB | H7 manufacturing | CC BY-SA 4.0, wdwd |
| IMG-17 | Electronics lab bench | H7 engineering lab | CC0, Chiara Coetzee |
| IMG-18 | Oscilloscope bench | H7 validation | CC BY-SA 4.0, Peter Seligman |
| IMG-19 | Hubballi panorama from Nrupatunga Hill | "Engineered in Hubballi" | CC BY-SA 3.0, Syed Zohaibullah |
| IMG-20 | Industrial control cabinet | H5 / integration | CC BY 4.0, Rubin Observatory/NSF/AURA |

### 14.2 Gaps → our own renders (ARM-14)
ARMtronix's actual boards (IA015, IA013, IA009, IA003, BA011, BA015, BA019) have no free photos. **We draw them**: layered SVG renders (Photo-style, X-ray and exploded layers) built from the catalogue specs, using the datasheet images as proportion reference only.

### 14.3 Reference only (copyrighted: not for the public site)
- Product catalogues and datasheets: https://github.com/armtronix/ARMtronix_Product_Documents (IA and BA catalogue PDFs plus per-product datasheets)
- GitHub org: https://github.com/armtronix
- Tindie store and reviews: https://www.tindie.com/stores/armtronix/
- CNX Software, quad relay crowdfunding (2016): https://www.cnx-software.com/2016/06/23/armtronix-ac-powered-wifi-quad-relay-board-is-powered-by-esp8266-soc-crowdfunding/
- Tasmota device docs, Armtronix dimmers: https://tasmota.github.io/docs/devices/Armtronix-Dimmers/
- armtronix.net (ARMtronix IoT Pvt. Ltd.); armtronix.com (see §0)

### 14.4 Video (YouTube embeds, embedding checked 5 Oct 2026)

| ID | Video | Channel | Use |
|----|-------|---------|-----|
| VID-01 | [ESP8266 Dimmer + Relay from Armtronix Review](https://www.youtube.com/watch?v=ejHe_RNPfnE) | Samir Sogay (Baba Awesam) | H8 proof (primary) |
| VID-02 | [4 Port ESP8266 Relay Module from Armtronix Review](https://www.youtube.com/watch?v=bJfX521q4Ck) | Samir Sogay | H8 alt |
| VID-03 | [ESP8266 Relay from Armtronix Review](https://www.youtube.com/watch?v=n8z6AHKdl4o) | Samir Sogay | spare |

Three other ARMtronix demo videos have embedding disabled (oEmbed 403). Link to them, don't embed: [single dimmer](https://www.youtube.com/watch?v=37GPPYZeSqM), [quad relay + Nextion](https://www.youtube.com/watch?v=hwi8UB95NsQ), [Alexa setup](https://www.youtube.com/watch?v=CeX9F6baKbU).

### 14.5 Verified facts and product data

**Company**

| Fact | Value | Source |
|------|-------|--------|
| Legal name | ARMtronix Technologies LLP (armtronix.net shows "ARMtronix IoT Pvt. Ltd.") | Catalogues, GitHub profile · `[VERIFY]` which is current |
| Location | CTS No. 2650, 1A Ankush Arcade, 2nd Floor, Station Road, Hubballi, Karnataka 580020, India | IA and BA catalogues |
| Contacts | Mob +91 94495 67368 · Tel +91 836 4265368 · contactus@armtronix.in · sales@armtronix.in | Catalogues (`[VERIFY]` that they're current) |
| Web | armtronix.in → redirects to armtronix.net | Checked 5 Oct 2026 |
| Open source | GitHub account since Apr 2015 (a user account, not an org); 32 public repos; top repo `arduino-LoRa-STM32` (52★); last push Jul 2021, so make no "active" claim | GitHub API, 5 Oct 2026 |
| Marketplace | Tindie store, "504 orders since Jun 06, 2015" | Tindie reviews page |
| Press | CNX Software 2016: "Indian startup" launching an ESP8266 quad relay board | CNX Software |
| Ecosystem | BA catalogue marks most BA boards "Tasmota compatible" (BA019 has no firmware line); the Tasmota device docs list the Armtronix **dimmers** only (BA001/BA004 family) | BA catalogue, Tasmota docs |

> **ARM-03 corrections (5 Oct 2026).** Catalogue values below are kept as printed, but several differ from the datasheets (IA015 AI count, IA013 power, IA003 analog inputs, BA relay and triac ratings, BA015 and BA019 load limits, BA mains range 100–240 V AC). `docs/PRODUCTS.json` is now the product source of truth and carries a `verify` flag on each disputed value. List: `docs/FACTS.md` §4.

**Industrial Automation (IA) line**

| Code | Name | Key specs |
|------|------|-----------|
| IA015 | **Retro to IIoT** | 24 V DC @ 1 A · targets Beckhoff and Siemens PLCs · Wi-Fi 802.11 b/g/n · BT 4.2 BR/EDR · CAN 2.0 · RS485/Modbus · Modbus TCP · Ethernet with IEEE 1588 PTP · 3 DI (24 V) · 3 DO (24 V/300 mA, open collector) · 4 AI (4–20 mA) · DIN rail |
| IA013 | Wi-Fi ⇄ RS485 ⇄ LoRa | 24 V DC @ 1 A (230 V AC variant) · Modbus master/slave · Wi-Fi · BT 4.2 · LoRaWAN 862–878 MHz · STM32F103CBT6 · on-field programmable · screw mount |
| IA010 | Modbus to IIoT | 24 V DC @ 1 A · targets PLCs · Wi-Fi · BT 4.2 · RS485/Modbus · Modbus TCP · Ethernet (IEEE 1588) · 1 DO · DIN rail |
| IA009 | Wi-Fi 12-DIO | 24 V DC @ 1 A · MQTT broker / Wi-Fi AP · 12 DI (24 V) · 12 DO (24 V/300 mA) · I2C expansion · screw mount |
| IA008 | Wi-Fi 2-DIO | 24 V DC @ 0.5 A · MQTT · 2 DI · 2 DO (24 V/300 mA) · I2C expansion |
| IA005 | LoRaWAN, STM MCU | 5 V DC @ 1 A · LoRaWAN 862–878 MHz · STM32F103CBT6 · 1-cell Li-ion charger · micro-USB |
| IA003 | RPi 4-DIO UPS board | 24 V DC @ 1 A · Raspberry Pi · RTC · Li-Po UPS · auto reboot · 4 DI · 4 DO · 2 AI (0–5 V) |
| IA002 | RPi 4-DIO | 24 V DC @ 1 A · Raspberry Pi · 4 DI (24 V) · 4 DO (24 V/300 mA) · stack-up / screw mount |
| IA001 | Wi-Fi industrial button | 24 V DC @ 0.5 A · MQTT · 1 button input · 1 LED lamp output · 16×2 LCD |

**Building Automation (BA) line** (all 100–260 V AC 50/60 Hz, Tasmota-compatible, MQTT / Wi-Fi AP / smartphone)

| Code | Name | Key specs |
|------|------|-----------|
| BA001 | Wi-Fi dual dimmer module | 2 triac dimmer outputs, max 200 W · 2 ADC inputs (0–5 V) · fans, incandescent |
| BA004 | Wi-Fi single dimmer module | 1 triac dimmer output, max 200 W · 1 ADC input |
| BA006 | Wi-Fi single relay board | 1 relay dry contact, max 1000 W · NodeMCU header · micro-USB |
| BA011 | Wi-Fi BT quad relay board | ESP32 · Wi-Fi and BT · 4 relays, max 1000 W/load · NodeMCU header |
| BA012 | Wi-Fi eight relay module | 8 relays, max 1000 W/load · NodeMCU header |
| BA014 | Wi-Fi 4T PWR board | 4 triac outputs (3 switching, 1 dimming), max 200 W/load · consolidated power monitoring |
| BA015 | Wi-Fi 2-relay module | 2 outputs, max 1800 W/load · power monitoring · 55×55×21 mm · fits in a switch box · geysers, ACs, pumps |
| BA019 | IoT HDR PM box | 1 heavy-duty relay, max 6900 W · power monitoring · input/output power-presence detection · optional 8 DI, RTC · house and hotel-room mains |

*(Source: ARMtronix IA and BA product catalogues, GitHub `ARMtronix_Product_Documents`, read 5 Oct 2026. Product availability today: `[VERIFY]`.)*
