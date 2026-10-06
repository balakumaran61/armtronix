# Copy deck (ARM-03)

Voice: precise, confident, short declaratives, real numbers with units. Proud of Hubballi, never loud. No certifications, clients, prices or ROI numbers. Every telemetry value carries the tag **Simulated**. Specs come from `PRODUCTS.json`; anything unconfirmed carries `[VERIFY]`.

Format per block: **Eyebrow** · **Headline** (≤ 8 words) · **Sub** · **Body** (≤ 40 words) · **CTA** · **Micro**.

---

## Global

| Item | Copy |
|---|---|
| Wordmark | ARMtronix |
| Wordmark sub-line | Hubballi · India |
| Nav | Products · Solutions · Engineering · Proof |
| Primary CTA | Request a quote |
| Secondary CTA | Talk to an engineer |
| Mobile bar | Request quote · Call |
| Status strip | ● 3 boards online · simulated |
| Theme toggle label | Theme: Control Room / Datasheet |
| Theme toggle aria | Switch theme. Now: Control Room (dark) |
| Skip link | Skip to content |
| Signal-trace aria | Page progress: stage 2 of 5, Board |
| Sim tag | Simulated |
| Example-format tag | Example format |
| Reduced-motion note | Animations are off. Everything is still here. |

## H0 · Boot sequence

| Item | Copy |
|---|---|
| Boot log (types out, about 1.2 s) | `init esp32 … ok` · `wifi 802.11 b/g/n … ok` · `can 2.0 … ok` · `rs485 modbus … ok` · `mqtt connect … ok` · `▶ ARMtronix online` |
| Skip | Skip boot (Esc) |
| Footnote | Boot log is decorative. |

## H1 · Hero

| Item | Copy |
|---|---|
| Eyebrow | Industrial IoT hardware · Hubballi, India |
| Headline | Make every machine talk. |
| Sub | Industrial IoT hardware, engineered in Hubballi, India: from 24 V DC DIN-rail controllers to Wi-Fi relay boards. |
| CTA primary | Explore hardware |
| CTA secondary | Request a quote |
| Hero board caption | IA015 · Retro to IIoT · top-down render |
| Lens preview | Photo · X-ray |
| Mini telemetry | AI1 12.4 mA · DI1 ON · 230.8 V — each tagged Simulated |
| Telemetry caption | Simulated values from an IA015 and a BA015 |
| Mobile CTAs | Explore hardware · Request a quote (full width) |
| Micro | 24 V DC · Wi-Fi · BT · CAN · RS485 · Ethernet |

## H2 · The signal path

| Item | Copy |
|---|---|
| Eyebrow | How a machine learns to talk |
| Headline | Physical. Board. Protocol. Cloud. Decision. |
| Sub | One signal, five stops. Follow the copper. |
| Stage 1 · Physical | **A machine speaks in volts and milliamps.** A 4–20 mA loop. A 24 V limit switch. Nothing reads it but the PLC. |
| Stage 2 · Board | **An ARMtronix board catches it.** IA015 reads 4–20 mA, 24 V inputs, CAN and RS485 on a DIN rail. |
| Stage 3 · Protocol | **It leaves in a standard language.** MQTT, Modbus RTU, Modbus TCP or LoRa, with no gateway you don't own. |
| Stage 4 · Cloud | **A broker catches the packet.** Your broker, your dashboard, your rules. |
| Stage 5 · Decision | **Someone, or something, acts.** An alert. A relay that switches. A pump that stops. |
| CTA | See it on a real board |
| Reduced-motion list header | The five stops |
| Micro | Example flow. Values shown are Simulated. |

## H3 · Board explorer

| Item | Copy |
|---|---|
| Eyebrow | Board explorer |
| Headline | Open the board. Read the engineering. |
| Sub | Photo, X-ray and layers of the real boards, with the real specs on every part. |
| Board selector | IA015 · IA013 · BA011 · IA003 |
| Lens tabs | Photo · X-ray · Layers |
| Hint (desktop) | Hover a part. Drag to separate the layers. |
| Hint (mobile) | Tap a number. |
| Hotspot card | Part label + one spec line from `PRODUCTS.json` |
| CTA | Open the full datasheet page |
| CTA 2 | Request a sample of this board |
| Micro | Renders are drawn from the datasheets. Not photographs. |

## H4 · Live telemetry console

| Item | Copy |
|---|---|
| Eyebrow | Live console · Simulated |
| Headline | Flip a relay. Watch the board answer. |
| Sub | A control panel running on simulated data. No network is touched. |
| Panel labels | Analog in · Digital in · Relay out · Power · MQTT log |
| Gauge label | AI1 · tank level · 4–20 mA |
| Gauge readout | 12.4 mA = 52 % *(each reading carries Simulated)* |
| DI labels | Door · Limit · E-stop · Running |
| Relay labels | Relay 1 · Relay 2 · Relay 3 · Relay 4 |
| Relay states | OFF / ON |
| Power labels | 230.8 V · 1 180 W · 4.62 kWh |
| Log header | MQTT log · example format |
| Log lines | `armtronix/ba011-001/relay2/set  ON` then `armtronix/ba011-001/relay2  ON` |
| Fault button | Simulate e-stop |
| Alarm banner | ALARM · E-stop pressed · outputs held off |
| Recovery banner | Recovered · E-stop released · outputs restored |
| Fault toast | Notification sent (simulated) |
| Sound toggle | Relay click: off / on |
| Paused note | Paused while off-screen |
| CTA | Monitor my own machines |
| Micro | Simulated. Seeded, 1 Hz, no network. |
| Empty / error | Console unavailable. Showing the last values. |

## H5 · Retro to IIoT: before and after

| Item | Copy |
|---|---|
| Eyebrow | Retro to IIoT · IA015 |
| Headline | Don't replace the machine. Connect it. |
| Sub | Drag to turn a silent cabinet into one that reports. |
| Left label | Silent |
| Right label | Talking |
| Left note | No data. No alerts. A walk to the panel. |
| Right note | Inputs, outputs and 4–20 mA, visible from anywhere on your network. |
| Stat 1 | Works with Siemens and Beckhoff PLCs |
| Stat 2 | DIN rail · 24 V DC |
| Stat 3 | Wi-Fi · BT · RS485 · CAN · Ethernet |
| CTA | Assess my machines |
| Slider aria | Before and after. 50 per cent talking. |
| Micro | Capabilities from the IA015 catalogue. |

## H6 · Product lines: the parts drawer

| Item | Copy |
|---|---|
| Eyebrow | Parts drawer |
| Headline | Seventeen boards. Two drawers. |
| Sub | Industrial Automation and Building Automation, each with real specs. |
| Drawer 1 | Industrial Automation · IA · 9 boards |
| Drawer 2 | Building Automation · BA · 8 boards |
| Bin | Code · name · three spec chips · mini render |
| Filter chips | Wi-Fi · Bluetooth · LoRa · RS485 / Modbus · CAN · Ethernet · Raspberry Pi · 24 V DC · 100–240 V AC |
| Empty | No board matches those filters. Clear a filter. |
| CTA | See the full catalogue |
| Micro | Availability: `[VERIFY]` with sales. |

## H7 · Engineering services

| Item | Copy |
|---|---|
| Eyebrow | Custom hardware design |
| Headline | From schematic to shipment. |
| Sub | One team takes a board from idea to a production run. |
| Steps | 1 Requirement · 2 Schematic · 3 Layout · 4 Firmware · 5 Prototype and validation · 6 Production |
| PCB stages | Bare FR4 · copper · solder mask · silkscreen · assembled · boxed |
| Capabilities | Custom I/O boards · Protocol gateways (Modbus ⇄ MQTT ⇄ LoRa) · Raspberry Pi industrial HATs · Firmware: Arduino, Tasmota-compatible, MQTT · Enclosures and DIN mounting `[VERIFY]` |
| Body | Our catalogue boards started as customer problems. Tell us the I/O, the protocol and the power. We reply with a schematic plan. `[VERIFY]` scope and lead times |
| CTA | Start a custom design |
| Micro | Capabilities shown follow the catalogue and public repos. |

## H8 · Proof: built in the open

| Item | Copy |
|---|---|
| Eyebrow | The test bench |
| Headline | Built in the open since 2015. |
| Sub | Public repos, public docs and third-party reviews. |
| Stat 1 | 32 public repos on GitHub *(GitHub, 5 Oct 2026)* |
| Stat 2 | Most-starred: arduino-LoRa-STM32, 52 ★ *(GitHub, 5 Oct 2026)* |
| Stat 3 | 504 Tindie orders since Jun 2015 *(Tindie, as read earlier in Oct 2026)* `[VERIFY]` |
| Badge | Tasmota device docs list the Armtronix dimmers |
| Press | CNX Software, Jun 2016: the AC quad-relay board |
| Video caption | A third-party review of the ESP8266 dimmer and relay. Not ARMtronix's own video. |
| Integration line | Talks to the PLCs that run your robots. |
| CTA | Browse the repos |
| Micro | No certifications are claimed. |

## H9 · Request a quote

| Item | Copy |
|---|---|
| Eyebrow | Request a quote |
| Headline | Tell us what to connect. |
| Sub | Five short steps. No account. |
| Step 1 prompt | I am an… |
| Options | OEM · System integrator · Plant or facility · Engineer · Developer |
| Direct contact | sales@armtronix.in `[VERIFY]` · +91 94495 67368 `[VERIFY]` |
| Secondary | Download the catalogue (PDF) |
| CTA | Continue |
| Micro | Nothing is sent until you review it. |

## H10 · Footer

| Item | Copy |
|---|---|
| Line | Engineered in Hubballi, India. |
| Address | CTS No. 2650, Ankush Arcade, 2nd Floor, Station Road, Hubballi, Karnataka 580020 `[VERIFY]` |
| Legal | ARMtronix Technologies LLP `[VERIFY]` |
| Contacts | contactus@armtronix.in · sales@armtronix.in · +91 94495 67368 · +91 836 4265368 (all `[VERIFY]`) |
| Links | Products · Engineering · Proof · GitHub · Credits |
| Theme | Theme toggle (repeated) |
| Uptime | uptime 99.98 % — decorative, simulated |
| Sub | Photos and renders: see credits. |

---

## /products · Catalogue

| Item | Copy |
|---|---|
| Eyebrow | Catalogue |
| Headline | Every board, in one table. |
| Sub | Filter by interface, power, mounting and I/O. Compare up to three. |
| Filters | Line (IA / BA) · Interface · Power · Mounting · I/O type |
| Columns | Code · Name · Interfaces · Power · I/O · Mounting |
| View toggle | Table / Bins |
| Compare | Add to compare · Compare (2) · Clear |
| Compare limit | Compare holds three boards. Remove one first. |
| Empty | No boards match. Clear a filter. |
| Download | Download IA catalogue (PDF) · Download BA catalogue (PDF) |
| CTA | Request a quote |

## /products/:code · Template

| Slot | Copy |
|---|---|
| Header | `{code}` · `{name}` |
| One-liner | `{tagline}` |
| Chips | three key specs |
| CTAs | Request quote · Request sample · Ask about customisation (each pre-fills the code) |
| Explorer | Photo · X-ray · Layers |
| Datasheet table | `{label} · {value} · {unit}`, with `[VERIFY]` marks |
| Pinout | Connections · X-ray lens |
| Integration | Example MQTT snippet · Copy · Copied |
| Tasmota badge | Tasmota compatible (per catalogue), shown only where `tasmota` is true |
| Downloads | Datasheet (GitHub PDF) · Opens in a new tab |
| Related | Related boards |
| RFQ prompt | Need `{code}`? Tell us the quantity. |
| Not found | No board with that code. Back to the catalogue. |

## /products/ia015 · Filled

| Slot | Copy |
|---|---|
| Header | IA015 · Retro to IIoT |
| One-liner | A DIN-rail box that gives Siemens and Beckhoff PLCs a voice over Wi-Fi, CAN, RS485 and Ethernet. |
| Chips | 24 V DC · RS485 / Modbus · DIN rail |
| Datasheet table | From `PRODUCTS.json`, IA015 |
| Pinout caption | Terminals: VDC_IN, DI1–DI3, DO1–DO3, AI, CANH / CANL, A / B. Programming via the ESP32. |
| MQTT snippet | `/O/001  _100` turns on output 1 · `/I/001` publishes input changes · `status_an` reads the analog inputs |
| Snippet note | From the IA015 datasheet rev B. The console on the home page uses a generic example format. |
| Datasheet link | IA015 design description, rev B (GitHub) |
| RFQ prompt | Need IA015? Tell us the quantity and the PLC. |

---

## RFQ wizard (/rfq and overlay)

Progress: a signal trace with 5 vias. Draft saved on this device only.

| Step | Copy |
|---|---|
| Overlay title | Request a quote |
| Step 1 · Who | Eyebrow: Step 1 of 5 · Who. Headline: Who are you? Tiles: OEM · System integrator · Plant or facility · Engineer · Developer. Micro: Changes the questions that follow. |
| Step 2 · Need | Headline: What do you need? Tiles: Off-the-shelf product · Customised product · Full custom design · Retro to IIoT assessment. |
| Step 3 · Spec | Headline: What must it connect? Fields: Product codes (multi-select) · Interfaces (chips) · I/O counts · Power (24 V DC / 230 V AC) · Environment notes. Developer variant: Headline: What are you building? Fields shortened. |
| Step 4 · Volume | Headline: How many, and by when? Bands: 1–10 · 10–100 · 100–1 000 · 1 000+. Fields: Timeline · Prototype needed? (Yes / No). |
| Step 5 · Contact | Headline: Where do we reply? Fields: Name · Company · Email · Phone · City · Message. |
| Review | Headline: Check and send. Buttons: Edit · Send. Micro: This is a front-end demo. Nothing leaves your browser. |
| Success | Headline: Request noted. Body: Reference ARM-2610-0042. Email it to sales@armtronix.in to reach the team. Buttons: Open email · New request. |
| mailto subject | RFQ ARM-2610-0042 · {code} |
| Buttons | Back · Next · Edit |
| Errors | Name: "Enter your name." · Email: "Enter a valid email, like name@company.com." · Phone: "Enter digits only, 8–15 characters." · Required choice: "Choose one to continue." |
| Empty | No product selected yet. You can add codes later. |
| Draft | Draft saved on this device. Clear draft |
| Pre-fill note | Pre-filled from the page you came from. |

---

## Boot-log lines

`init esp32 … ok` · `wifi 802.11 b/g/n … ok` · `can 2.0 … ok` · `rs485 modbus … ok` · `mqtt connect … ok` · `▶ ARMtronix online`

---

## Alt text (all 20 images)

| ID | Alt text |
|---|---|
| IMG-01 | An ESP32 development board with its Wi-Fi and Bluetooth module, USB port and pin headers. |
| IMG-02 | A close view of an ESP-WROOM-32 Wi-Fi and Bluetooth module, the kind of radio used on ARMtronix boards. |
| IMG-03 | An ESP8266 Wi-Fi module, the chip behind ARMtronix's first boards. |
| IMG-04 | A Raspberry Pi 4 Model B seen from above, the host for the IA002 and IA003 add-on boards. |
| IMG-05 | A macro photograph of a circuit board with traces, pads and surface-mount parts. |
| IMG-06 | A green printed circuit board with copper traces and components. |
| IMG-07 | A Siemens PLC mounted in a control cabinet, the kind of legacy controller IA015 connects. |
| IMG-08 | A Siemens Simatic S7-416-3 programmable logic controller. |
| IMG-09 | A row of DIN-rail power terminal blocks in a cabinet. |
| IMG-10 | DIN-rail clamp terminals, showing the C-rail mounting standard. |
| IMG-11 | An industrial robotic arm working on a factory line. |
| IMG-12 | A LoRa IoT gateway station with its antenna. |
| IMG-13 | A LoRaWAN deployment diagram: sensors, gateways, network server and application. |
| IMG-14 | A PLC relay output module with eight relay points. |
| IMG-15 | A 5 V single-channel relay module with its coil, contacts and screw terminals. |
| IMG-16 | Surface-mount components on a wave-soldered circuit board. |
| IMG-17 | An electronics lab bench with instruments, a board and tools. |
| IMG-18 | An oscilloscope on a lab bench showing a waveform. |
| IMG-19 | A panorama of the city of Hubballi, seen from Nrupatunga Hill. |
| IMG-20 | An industrial control cabinet with wiring ducts and DIN-rail devices. |
| VID-01 | Play: a third-party review of the ESP8266 dimmer and relay from Armtronix, by Samir Sogay. |
| VID-02 | Play: a third-party review of the 4-port ESP8266 relay module from Armtronix, by Samir Sogay. |
| VID-03 | Play: a third-party review of the ESP8266 relay from Armtronix, by Samir Sogay. |
