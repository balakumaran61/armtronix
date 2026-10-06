# Facts (ARM-03)

Checked 5 Oct 2026. Status: **Verified** (two or more independent sources, or read directly from the primary source today) · **Single-source** · **Unverified**. Nothing here is a certification, client name, price or ROI figure.

## 1. Entity decision (SPEC §0, Q1, Q4)

| Question | Finding | Evidence |
|---|---|---|
| Which "Armtronix"? | The brief describes the **Indian IIoT hardware maker in Hubballi**. armtronix.com is a different, Malaysian infrastructure group | armtronix.com (fetched 5 Oct 2026): title "Armtronix \| Engineering Intelligent Infrastructure For A Connected Future"; nav Construction / Engineering / Transmission Technologies; "Armtronix Group … five pillars". No IIoT boards, PLCs or sensors |
| Is the Hubballi firm real and matching the brief? | Yes | GitHub user `armtronix` is named "ARMtronix Technologies LLP", location Hubballi, blog armtronix.in, created 18 Apr 2015; catalogues print the Hubballi address; boards are IIoT, Modbus, LoRa, PLC-targeted |
| Decision | **Keep the SPEC §0 default**: design for ARMtronix, Hubballi. Use no content from armtronix.com. No user override has been given in this session | |
| Q4 legal name | **Unresolved.** Catalogues and the GitHub profile say "ARMtronix Technologies LLP". armtronix.net shows the tab title "Armtronix IoT Pvt. Ltd." with no readable body (a client-rendered React shell). Brand as "ARMtronix"; the footer shows the legal name marked `[VERIFY]` | Catalogues; GitHub; armtronix.net fetched 5 Oct 2026 |

## 2. Company facts

| Fact | Value | Sources | Status |
|---|---|---|---|
| Brand | ARMtronix | Catalogues, GitHub | Verified |
| Legal name | ARMtronix Technologies LLP (armtronix.net title: ARMtronix IoT Pvt. Ltd.) | Catalogues, GitHub profile, armtronix.net | **Single-source each; conflicting** · `[VERIFY]` |
| Address | CTS No. 2650, Beside Ankush Arcade, 1A Ankush Arcade, 2nd Floor, Station Road, Hubballi, Karnataka, India 580020 | IA and BA catalogues (identical) | Single-source (one document family) · `[VERIFY]` current |
| Mobile | +91 94495 67368 | IA and BA catalogues | Single-source · `[VERIFY]` current |
| Landline | +91 836 4265368 | Catalogues | Single-source · `[VERIFY]` current |
| Emails | contactus@armtronix.in · sales@armtronix.in | Catalogues | Single-source · `[VERIFY]` current |
| Do the contacts look current? | **Unknown.** The catalogue PDFs date from roughly 2021 (the docs repo's last commit is 5 Apr 2021). armtronix.in returns HTTP 406 to automated requests, so the domain could not be read | GitHub API; curl | Unverified |
| Web | armtronix.in (blocks bots, HTTP 406) and armtronix.net (shell page) | curl, 5 Oct 2026 | Verified (as observed) |
| Product availability today | Not confirmed | — | Unverified · `[VERIFY]` |

## 3. Proof facts

| Fact | Value | Sources | Status |
|---|---|---|---|
| GitHub account | `armtronix` is a **user account** (not an org) named "ARMtronix Technologies LLP"; 32 public repos; 97 followers; created 2015-04-18 | `api.github.com/users/armtronix`, 5 Oct 2026 | Verified |
| Most-starred repo | `arduino-LoRa-STM32`, 52 ★ (then `NodeMCU_four_relay_board` 30 ★, `Wifi-Arduino-85` 14 ★, `Wifi-Triac-SSR` 14 ★) | GitHub API, 5 Oct 2026 | Verified |
| GitHub activity | **Last push to any repo: 17 Jul 2021.** The datasheets repo's last commit: 5 Apr 2021. Do not write "active" or "continuously maintained" | GitHub API | Verified |
| Datasheet repo | `ARMtronix_Product_Documents`: IA and BA catalogue PDFs plus per-product design descriptions | GitHub tree, 5 Oct 2026 | Verified |
| Tindie | "504 orders since Jun 06, 2015" | SPEC §14.5 (read 5 Oct 2026 from the Tindie reviews page). Tindie returns HTTP 403 to automated fetches, so it was **not re-read** in ARM-03 | Single-source |
| CNX Software | The 23 Jun 2016 article exists with the title "Armtronix AC Powered WiFi Quad Relay Board is Powered by ESP8266 SoC (Crowdfunding)". The phrase "Indian startup" is from SPEC §14.5 and was not re-confirmed in the body text | cnx-software.com, 5 Oct 2026 | Verified (article); Single-source (phrase) |
| Tasmota listing | The Tasmota docs page "Armtronix Dimmers" lists the **single and dual dimmer boards** (ESP8266 + ATmega328), supported since Tasmota 6.4.0 as module "ARMTR Dimmer (56)". It lists no other ARMtronix board | tasmota.github.io/docs/devices/Armtronix-Dimmers/, 5 Oct 2026 | Verified (dimmers only) |
| Tasmota compatibility of other BA boards | The BA catalogue prints "Tasmota compatible" for BA001, BA004, BA006, BA011, BA012, BA014, BA015. The BA019 catalogue page has **no firmware line**. BA004, BA012 and BA015 datasheets describe loading Tasmota | Catalogue; datasheets | Single-source (catalogue) · say "Tasmota compatible (per catalogue)" |
| Third-party video reviews | VID-01 to VID-03 by Samir Sogay: oEmbed returns the titles and the embeds work | YouTube oEmbed, 5 Oct 2026 | Verified |
| Open-source claim | The repos are public on GitHub (licences not checked per repo) | GitHub | Verified (public); licence `[VERIFY]` |
| Certifications, named clients, prices, ROI figures | **None found. None to be shown.** | — | — |
| Robotics | Not in the catalogues. Show as integration only ("talks to the PLCs that run your robots") | Catalogues | Verified (absence) |
| Industry 4.0 | The IA013 datasheet uses the phrase "Industrial 4.0 environment" for remote monitoring. Use it for the retrofit and gateway story only | IA013 datasheet rev A | Single-source |

## 4. Corrections to SPEC §14.5 (catalogue vs datasheet)

The catalogue is the marketing summary and the datasheet is the design description. Where they disagree, both are kept in `PRODUCTS.json` (`spec.verify`) and the site prints the datasheet-safe figure or a `[VERIFY]` mark.

| # | Product | SPEC §14.5 (catalogue) | Datasheet says | Treatment |
|---|---|---|---|---|
| 1 | IA015 | 4× 4–20 mA AI | Pin table lists **AI1–AI3** (ADC39 / 36 / 34); a header paragraph says "twelve" DI/DO (copy-paste); input range 12–24 V DC; PCB 130 × 70 × 74 mm; DI/DO are opto-isolated | Show 4 AI with `[VERIFY]` |
| 2 | IA013 | 24 V DC @ 1 A (230 V AC variant) | Rev A is **AC-powered**: 100–250 V AC, 0.2 A typ; LoRa module Dorji DRF1276G (SX1272), 868 MHz typ in 862–878 MHz; MCU "optional"; 96 × 47 × 28 mm | Show both; `[VERIFY]` which ships |
| 3 | IA003 | 2× 0–5 V analog inputs | **3× 4–20 mA** via ADS1115 (AIN0 = battery monitor); input 12–24 V DC; charge ≤ 500 mA; DS1307 RTC; 85 × 60 × 12 mm | Show datasheet value with `[VERIFY]` |
| 4 | IA002 | 24 V DC @ 1 A | Input 12–24 V DC; 65 × 56 × 12 mm | Add range |
| 5 | BA011 | 4 relays, max 1000 W/load | Relay output 240 V AC, **3 A, 980 W**; 24 V DC 3 A; (feature list says 4 A); 140 × 60 × 20 mm; HLK-PM01 5 V / 0.6 A supply | Show catalogue with `[VERIFY]` and the datasheet figure |
| 6 | BA012 | max 1000 W/load | 240 V AC, 4 A, **980 W**; 140 × 80 × 23 mm | `[VERIFY]` |
| 7 | BA006 | max 1000 W | 240 V AC, 2 A, **980 W**; 24 V DC 10 A; 70 × 50 × 20 mm | `[VERIFY]` |
| 8 | BA001, BA004 | triac max 200 W | 240 V AC, **1 A, 240 W** | `[VERIFY]` |
| 9 | BA015 | 2 outputs, max 1800 W/load | Rev A carries the heavy-duty-relay title; feature list **"up to 240 W"**, output table **500 V / 500 W** | `[VERIFY]`; do not headline 1800 W |
| 10 | BA019 | max 6900 W | 240 V AC, **6000 W**; 30 V DC / 600 W; ESP8266-12 per special-features list | `[VERIFY]` |
| 11 | All BA | 100–260 V AC | Datasheets say **100–240 V AC** | Use 100–240 V AC |
| 12 | Tasmota | "All BA boards Tasmota-compatible" | Tasmota docs list the dimmers only; BA019 catalogue page has no firmware line | "Tasmota compatible (per catalogue)"; BA019 unconfirmed |
| 13 | GitHub | "GitHub org since Apr 2015" | It is a **user account** with 32 repos; last push Jul 2021 | Say "GitHub since 2015"; no activity claim |
| 14 | IA010, IA001 | in SPEC | No per-product datasheet in the repo; catalogue only | Link the IA catalogue PDF |

SPEC §14.5 in `SPEC.md` has been updated with a pointer to these corrections (v0.2).

## 5. MQTT example format

The IA015 datasheet (rev B, section 11) documents this real pattern:

| Purpose | Topic / payload | Notes |
|---|---|---|
| Board publishes input changes | topic `/I/00y` | `y` = client (device) number set in the config page |
| Control outputs | topic `/O/00y`, payload `_100`, `_010`, `_001` or `_111` | One digit per output (DO1 DO2 DO3); `_111` turns all three on |
| Read digital inputs | payload `status_ip` on the output topic | |
| Read digital outputs | payload `status_op` | |
| Read analog inputs | payload `status_an` | |
| Broker | default port 1883 | |
| Config | the board hosts an access point `Armtronix-xx-xx-xx`; open 192.168.4.1 | |

The site's telemetry log (SPEC §7) uses a **generic, readable example format**, always labelled "example format":

```
armtronix/ia015-001/di1        {"v":1,"t":"2026-10-05T10:00:01Z"}
armtronix/ia015-001/ai1        {"v":12.4,"unit":"mA"}
armtronix/ba011-001/relay2/set {"v":"ON"}
armtronix/ba011-001/relay2     {"v":"ON"}
armtronix/ba015-001/power      {"w":1180,"v":231.2}
```

Footnote shown on the site: "Example format. Real IA015 topics follow `/I/00y` and `/O/00y_xxx`, see the datasheet."

## 6. Open items for the user

1. Is the Hubballi firm still trading under the same contacts? The phone, email and address come from ~2021 catalogues.
2. Which legal name is current (LLP or Pvt. Ltd.)?
3. Which IA015 and IA003 analog-input count is correct, and which IA013 power variant ships?
4. Permission to use ARMtronix's own product photos publicly (SPEC Q2). Until then we draw our own boards.
