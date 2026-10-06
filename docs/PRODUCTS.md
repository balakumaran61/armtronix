# Products (ARM-03)

Generated from [`PRODUCTS.json`](PRODUCTS.json). Sources: ARMtronix IA and BA catalogues plus per-product datasheets in [ARMtronix_Product_Documents](https://github.com/armtronix/ARMtronix_Product_Documents), read 5 Oct 2026. Availability today: `[VERIFY]`.

`[VERIFY]` marks a value where the catalogue and the datasheet disagree. Both are listed in the product notes.

| Code | Name | Power | Interfaces | I/O | Mounting | Tasmota | Datasheet |
|---|---|---|---|---|---|---|---|
| IA015 | Retro to IIoT | 24 V DC @ 1 A | Wi-Fi · Bluetooth · CAN · RS485 · Modbus TCP · Ethernet | 3 DI, 3 DO, 4 AI (4–20 mA) | DIN rail (C-type) | no / unconfirmed | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/IA015_Retro_To_IIoT_B.pdf) |
| IA013 | Wi-Fi ⇄ RS485 ⇄ LoRa | 24 V DC @ 1 A (catalogue) · 100–250 V AC variant | Wi-Fi · Bluetooth · RS485 · LoRa | — | Screw mount | no / unconfirmed | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/IA013_Wifi_RS485_LoRa.pdf) |
| IA010 | Modbus to IIoT | 24 V DC @ 1 A | Wi-Fi · Bluetooth · RS485 · Modbus TCP · Ethernet | 1 DO | DIN rail (C-type) | no / unconfirmed | [catalogue](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/ARMtronix_IA_ProdcutCatalogue.pdf) |
| IA009 | Wi-Fi 12-DIO | 24 V DC @ 1 A | Wi-Fi | 12 DI, 12 DO | Screw mount | no / unconfirmed | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/IA009_Wifi_12-DIO_Board.pdf) |
| IA008 | Wi-Fi 2-DIO | 24 V DC @ 0.5 A | Wi-Fi | 2 DI, 2 DO | Screw mount | no / unconfirmed | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/IA008_Wifi_2-DIO_Board.pdf) |
| IA005 | LoRaWAN, STM MCU | 5 V DC @ 1 A | LoRa · USB | — | Drop-in / wired | no / unconfirmed | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/IA005_LoRaWAN_Board.pdf) |
| IA003 | RPi 4-DIO UPS board | 24 V DC @ 1 A (12–24 V DC range) | Raspberry Pi | 4 DI, 4 DO, 3 AI (4–20 mA) | Stack-up or FRC cable, screw mount | no / unconfirmed | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/IA003_RPi_4DIO_UPS.pdf) |
| IA002 | RPi 4-DIO | 24 V DC @ 1 A (12–24 V DC range) | Raspberry Pi | 4 DI, 4 DO | Stack-up or FRC cable, screw mount | no / unconfirmed | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/IA002_RPi_4IN_4OUT_Board.pdf) |
| IA001 | Wi-Fi industrial button | 24 V DC @ 0.5 A | Wi-Fi | 1 DI, 1 DO | Screw mount | no / unconfirmed | [catalogue](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/ARMtronix_IA_ProdcutCatalogue.pdf) |
| BA001 | Wi-Fi dual dimmer module | 100–240 V AC, 50/60 Hz | Wi-Fi | 2 DO, 2 AI (0–5 V) | Wall mount using screws | yes | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/BA001_Wifi_Two_Triac_1A_Board_%28Mini%29.pdf) |
| BA004 | Wi-Fi single dimmer module | 100–240 V AC, 50/60 Hz | Wi-Fi | 1 DO, 1 AI (0–5 V) | Wall mount using screws | yes | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/BA004_Wifi_One_Triac_Module.pdf) |
| BA006 | Wi-Fi single relay board | 100–240 V AC, 50/60 Hz | Wi-Fi | 1 DO | Wall mount using screws | yes | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/BA006_Wifi_Single_Relay_Board.pdf) |
| BA011 | Wi-Fi BT quad relay board | 100–240 V AC, 50/60 Hz | Wi-Fi · Bluetooth | 4 DO | Wall mount using screws | yes | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/BA011_Wifi_BT_Quad_Relay_Board_B.pdf) |
| BA012 | Wi-Fi eight relay module | 100–240 V AC, 50/60 Hz | Wi-Fi | 8 DO | Wall mount using screws | yes | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/BA012_Wifi_Eight_Relay_Board_E.pdf) |
| BA014 | Wi-Fi 4T PWR board | 100–240 V AC, 50/60 Hz | Wi-Fi | 4 DO | Wall mount using screws | yes | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/BA014_Wifi_4T_PWR%20.pdf) |
| BA015 | Wi-Fi 2-relay module | 100–240 V AC, 50/60 Hz | Wi-Fi | 2 DO | Inside a compatible switch box | yes | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/BA015_Wifi_Two_Relay_Module.pdf) |
| BA019 | IoT HDR PM box | 100–240 V AC, 50/60 Hz | Wi-Fi | 8 DI, 1 DO | Wall mount using screws | no / unconfirmed | [datasheet](https://github.com/armtronix/ARMtronix_Product_Documents/blob/master/BA019_Wifi_HDR_PM_Module.pdf) |

## Per-product specs

### IA015 · Retro to IIoT

A DIN-rail box that gives Siemens and Beckhoff PLCs a voice over Wi-Fi, CAN, RS485 and Ethernet.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 24 V DC @ 1 A | V DC / A | catalogue |
| Input voltage range | 12–24 V DC | V DC | datasheet rev B |
| Wi-Fi | IEEE 802.11 b/g/n | — | catalogue |
| Bluetooth | v4.2 BR/EDR | — | catalogue |
| CAN | CAN bus 2.0 | — | catalogue |
| RS485 / Modbus | 2-wire RS485, Modbus | — | catalogue |
| Ethernet | RJ45 · IEEE 1588 PTP · Modbus TCP | — | catalogue |
| Digital inputs | 3, opto-isolated, 24 V DC tolerant | V DC | catalogue |
| Digital outputs | 3, opto-isolated, 24 V DC / 300 mA, open collector | V DC / mA | catalogue |
| Analog inputs | 4× 4–20 mA (catalogue) `[VERIFY]` | mA | catalogue |
| PCB size | 130 × 70 × 74 | mm | datasheet rev B |
| Mounting | DIN rail, C-type | — | catalogue |
| Programming | Arduino IDE (ESP32), MQTT or HTTP firmware mode | — | datasheet rev B |

**Conflicts to verify:** Analog inputs: Datasheet rev B pin table lists AI1–AI3 only (ADC39/36/34): confirm 3 vs 4

**Hotspots (board explorer):**

- `mcu` · ESP32 Wi-Fi / BT module: Wi-Fi 802.11 b/g/n · BT 4.2 BR/EDR · Arduino IDE compatible · MQTT or HTTP mode
- `power` · Power input VDC_IN: 24 V DC @ 1 A (12–24 V DC range) · on-board DC-DC to 3.3 V
- `di` · Digital inputs DI1–DI3: 3× opto-isolated · 12–24 V DC · GPIO32 / GPIO33 / GPIO15
- `do` · Digital outputs DO1–DO3: 3× opto-isolated · 24 V DC / 300 mA · open collector
- `ai` · Analog inputs AI: 4–20 mA · AI1–AI3 on ESP32 ADC39 / 36 / 34 · 4th input [VERIFY]
- `eth` · Ethernet (RJ45): Ethernet MAC with IEEE 1588 PTP · Modbus TCP
- `can` · CAN port: CANH / CANL · CAN bus 2.0
- `rs485` · RS485 / Modbus: Terminals A / B · 2-wire Modbus
- `ui` · Buttons and LEDs: S1 config · S3 reset · D3 power-presence LED · dual-colour Wi-Fi status LED

### IA013 · Wi-Fi ⇄ RS485 ⇄ LoRa

A Modbus gateway that bridges the factory floor to Wi-Fi and LoRaWAN.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 24 V DC @ 1 A; AC 230 V / 1 A in a different variant | V DC / A / V AC | catalogue |
| Datasheet rev A input | 100–250 V AC (typ 230 V), 0.2 A typ `[VERIFY]` | V AC / A | datasheet rev A |
| Wi-Fi | IEEE 802.11 b/g/n, 2.4 GHz | GHz | catalogue |
| Bluetooth | v4.2 BR/EDR | — | catalogue |
| LoRa | LoRaWAN, 862–878 MHz (868 MHz typ), configurable in program | MHz | catalogue |
| LoRa module | Dorji DRF1276G (SX1272) | — | datasheet rev A |
| RS485 / Modbus | 2-wire, DIP-switch device address (4 switches) | — | datasheet rev A |
| MCU | STM32F103CBT6 (optional on some models) | — | catalogue |
| PCB size | 96 × 47 × 28 | mm | datasheet rev A |
| Mounting | Screw type | — | catalogue |
| Programming | On-field programmable, on-board USB-UART (micro-USB), Arduino compatible | — | catalogue |

**Conflicts to verify:** Datasheet rev A input: Datasheet describes the AC variant only; confirm which variant ships

**Hotspots (board explorer):**

- `esp32` · ESP32 Wi-Fi / BT module: Wi-Fi 802.11 b/g/n · BT 4.2 · MQTT or HTTP
- `stm32` · STM32F103CBT6 MCU: Runs the LoRa stack · optional on some models
- `lora` · LoRa module DRF1276G: LoRaWAN · 862–878 MHz · SPI to ESP32 / STM32
- `antenna` · External LoRa antenna: Supplied with the device
- `rs485` · RS485 header J8: A / B · 2-wire Modbus
- `dip` · Address DIP switch D6: 4 switches set the RS485 device ID
- `power` · AC input J1 and PSU: Phase / neutral in · HLK-PM05 5 V / 1 A · 100–250 V AC
- `usb` · Micro-USB programming J6: On-board USB-UART · J5 selects ESP or MCU
- `gpio` · GPIO header J2: Most MCU GPIOs broken out for user code

### IA010 · Modbus to IIoT

Wi-Fi and Ethernet gateway for Modbus-speaking PLCs.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 24 V DC @ 1 A | V DC / A | catalogue |
| Wi-Fi | IEEE 802.11 b/g/n | — | catalogue |
| Bluetooth | v4.2 BR/EDR | — | catalogue |
| RS485 / Modbus | 2-wire | — | catalogue |
| Ethernet | IEEE 1588 PTP | — | catalogue |
| Modbus TCP | Standard Modbus over the Ethernet port | — | catalogue |
| Digital output | 1, 24 V DC / 300 mA, open collector | V DC / mA | catalogue |
| Mounting | DIN rail, C-type | — | catalogue |

### IA009 · Wi-Fi 12-DIO

Twelve inputs and twelve outputs on Wi-Fi, acting as an MQTT client or access point.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 24 V DC @ 1 A | V DC / A | catalogue |
| Wi-Fi | IEEE 802.11 b/g/n | — | catalogue |
| Digital inputs | 12, 24 V DC tolerant (12–24 V DC) | V DC | catalogue |
| Digital outputs | 12, 24 V DC / 300 mA | V DC / mA | catalogue |
| Expansion | I2C header | — | catalogue |
| PCB size | 220 × 60 × 25 | mm | datasheet |
| Mounting | Screw mount | — | catalogue |

### IA008 · Wi-Fi 2-DIO

Two isolated inputs and two outputs on Wi-Fi with MQTT.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 24 V DC @ 0.5 A | V DC / A | catalogue |
| Wi-Fi | IEEE 802.11 b/g/n | — | catalogue |
| Digital inputs | 2, 24 V DC tolerant | V DC | catalogue |
| Digital outputs | 2, 24 V DC / 300 mA | V DC / mA | catalogue |
| Expansion | I2C header | — | catalogue |
| PCB size | 85 × 52 × 12 | mm | datasheet |
| Mounting | Screw mount | — | catalogue |

### IA005 · LoRaWAN, STM MCU

A user-programmable STM32 LoRaWAN node with a Li-Ion charger.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 5 V DC @ 1 A | V DC / A | catalogue |
| LoRa | LoRaWAN, 862–878 MHz, configurable in program | MHz | catalogue |
| MCU | STM32F103CBT6 | — | catalogue |
| Battery charger | 1-cell Li-Ion | — | catalogue |
| Programming | User programmable, on-board micro-USB | — | catalogue |
| PCB size | 55 × 27 × 15 | mm | datasheet |
| Mounting | Drop-in / wired | — | catalogue |

### IA003 · RPi 4-DIO UPS board

A Raspberry Pi HAT with isolated I/O, a Li-Po UPS and auto-reboot.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 24 V DC @ 1 A (datasheet: 12–24 V DC) | V DC / A | catalogue |
| Pi supply | On-board 24 V to 5 V buck converter | V DC | catalogue |
| Restart | Restart switch (power recycle) and auto reboot | — | catalogue |
| RTC | DS1307 with CR1220 cell holder | — | datasheet rev D |
| UPS charger | Single-cell Li-Po / Li-Ion, up to 500 mA charge, MT3608 boost to 5 V | mA | datasheet rev D |
| Digital inputs | 4, opto-isolated, 24 V DC tolerant | V DC | catalogue |
| Digital outputs | 4, opto-isolated, 24 V DC / 300 mA | V DC / mA | catalogue |
| Analog inputs | 3× 4–20 mA via ADS1115 (datasheet rev D) `[VERIFY]` | mA | datasheet rev D |
| PCB size | 85 × 60 × 12 | mm | datasheet rev D |
| Mounting | Stack-up (40-pin) or FRC cable; screw mount | — | catalogue |

**Conflicts to verify:** Analog inputs: Catalogue lists 2× 0–5 V; datasheet rev D lists 3× 4–20 mA

**Hotspots (board explorer):**

- `pi` · Raspberry Pi header J11: 40-pin stack-up or FRC (variant 2)
- `power` · 24 V DC input J2: 24 V DC @ 1 A · buck to 5 V for the Pi
- `lipo` · Li-Po connector BT2 and charger: Single cell · up to 500 mA charge · mains-presence detection
- `boost` · Boost converter MT3608: Lifts the 4.2 V cell to 5 V for the Pi
- `di` · Digital inputs J3–J6: 4× opto-isolated · up to 24 V DC
- `do` · Digital outputs J7–J10: 4× opto-isolated · 24 V DC / 300 mA
- `ai` · Analog inputs AIN1–AIN3: 4–20 mA via ADS1115 · AIN0 monitors the battery [VERIFY vs catalogue]
- `rtc` · Real-time clock BT1: DS1307 · CR1220 cell · I2C
- `restart` · Restart SW1 and J15: Power-recycle button · external switch or auto-reboot jumper

### IA002 · RPi 4-DIO

A Raspberry Pi HAT with four isolated inputs and four outputs.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 24 V DC @ 1 A (datasheet: 12–24 V DC) | V DC / A | catalogue |
| Pi supply | On-board 24 V to 5 V converter | V DC | catalogue |
| Digital inputs | 4, 24 V DC tolerant | V DC | catalogue |
| Digital outputs | 4, 24 V DC / 300 mA | V DC / mA | catalogue |
| PCB size | 65 × 56 × 12 | mm | datasheet |
| Mounting | Stack-up with female header, or external FRC; screw mount | — | catalogue |

### IA001 · Wi-Fi industrial button

A panel button, lamp and 16×2 display on Wi-Fi and MQTT.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 24 V DC @ 0.5 A | V DC / A | catalogue |
| Wi-Fi | IEEE 802.11 b/g/n | — | catalogue |
| Button input | 1, 24 V DC tolerant | V DC | catalogue |
| Lamp output | 1 LED lamp, 24 V DC tolerant | V DC | catalogue |
| Display | 16 × 2 character LCD | — | catalogue |
| Mounting | Screw mount | — | catalogue |

### BA001 · Wi-Fi dual dimmer module

Two triac dimmer channels for fans and incandescent lamps.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 100–240 V AC, 50/60 Hz (catalogue: 100–260 V AC) `[VERIFY]` | V AC / Hz | catalogue |
| Dimmer outputs | 2 triac channels, max 200 W each (catalogue) `[VERIFY]` | W | catalogue |
| ADC inputs | 2, 0–5 V DC tolerant | V DC | catalogue |
| Loads | Fans, incandescent bulbs | — | catalogue |
| Firmware | Tasmota compatible; listed in Tasmota docs as ARMTR Dimmer (since 6.4.0) | — | Tasmota docs |
| Enclosure | 116 × 46 × 28 box | mm | datasheet |

**Conflicts to verify:** Power input: Datasheets state 100–240 V AC; catalogue says 100–260 V AC; Dimmer outputs: Datasheet quotes 240 V AC / 1 A / 240 W maximum

### BA004 · Wi-Fi single dimmer module

One triac dimmer channel for fans and incandescent lamps.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 100–240 V AC, 50/60 Hz (catalogue: 100–260 V AC) `[VERIFY]` | V AC / Hz | catalogue |
| Dimmer output | 1 triac channel, max 200 W (catalogue) `[VERIFY]` | W | catalogue |
| ADC input | 1, 0–5 V DC tolerant | V DC | catalogue |
| Loads | Fans, incandescent bulbs | — | catalogue |
| Firmware | Tasmota compatible; listed in Tasmota docs as ARMTR Dimmer (since 6.4.0) | — | Tasmota docs |

**Conflicts to verify:** Power input: Datasheets state 100–240 V AC; catalogue says 100–260 V AC; Dimmer output: Datasheet quotes 240 V AC / 1 A / 240 W maximum

### BA006 · Wi-Fi single relay board

One dry-contact relay with a NodeMCU header and micro-USB.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 100–240 V AC, 50/60 Hz (catalogue: 100–260 V AC) `[VERIFY]` | V AC / Hz | catalogue |
| Relay output | 1 dry contact, COM / NO / NC, max 1000 W/load (catalogue) `[VERIFY]` | W | catalogue |
| NodeMCU header | Yes | — | catalogue |
| Loads | Fans, incandescent bulbs, motors | — | catalogue |
| Programming | User programmable, on-board micro-USB | — | catalogue |
| PCB size | 70 × 50 × 20 | mm | datasheet |

**Conflicts to verify:** Power input: Datasheets state 100–240 V AC; catalogue says 100–260 V AC; Relay output: Datasheet: 240 V AC / 2 A / 980 W; 24 V DC / 10 A

### BA011 · Wi-Fi BT quad relay board

Four dry-contact relays on an ESP32 with Wi-Fi and Bluetooth.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 100–240 V AC, 50/60 Hz (catalogue: 100–260 V AC) `[VERIFY]` | V AC / Hz | catalogue |
| Relay outputs | 4 dry contact, COM / NO / NC, max 1000 W/load (catalogue) `[VERIFY]` | W | catalogue |
| Wi-Fi | Yes, ESP32S module | — | catalogue |
| Bluetooth | Yes | — | catalogue |
| NodeMCU header | Yes (J2, J3) | — | catalogue |
| Loads | Fans, incandescent bulbs, motors | — | catalogue |
| Programming | User programmable, on-board micro-USB (U5) | — | catalogue |
| Power supply | HLK-PM01 AC-DC, 5 V / 0.6 A | V DC / A | datasheet rev B |
| PCB size | 140 × 60 × 20 | mm | datasheet rev B |

**Conflicts to verify:** Power input: Datasheets state 100–240 V AC; catalogue says 100–260 V AC; Relay outputs: Datasheet rev B: 240 V AC / 3 A / 980 W; 24 V DC / 3 A

**Hotspots (board explorer):**

- `esp32` · ESP32S Wi-Fi / BT module: Wi-Fi + Bluetooth · MQTT or HTTP firmware · Tasmota compatible
- `psu` · AC-DC supply HLK-PM01: 100–240 V AC in · 5 V / 0.6 A out · 3 W max
- `acin` · AC input terminal: Phase and neutral · 50/60 Hz
- `relays` · Relays 1–4 (J5–J8): Dry contact COM / NO / NC · 240 V AC · 980 W [datasheet]
- `driver` · Opto-isolated relay drivers: 5 V coils · optocoupler between mains and logic
- `usb` · Micro-USB U5: On-board USB-UART programming
- `buttons` · Buttons S1 and S2: S1 = GPIO0 (boot / config) · S2 = reset
- `headers` · NodeMCU headers J2 / J3: Free ESP32 GPIOs
- `jumpers` · Relay select J4: Removable jumpers link GPIO4/12/13/14 to relays 1–4

### BA012 · Wi-Fi eight relay module

Eight dry-contact relays with a NodeMCU header.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 100–240 V AC, 50/60 Hz (catalogue: 100–260 V AC) `[VERIFY]` | V AC / Hz | catalogue |
| Relay outputs | 8 dry contact, max 1000 W/load (catalogue) `[VERIFY]` | W | catalogue |
| NodeMCU header | Yes | — | catalogue |
| Loads | Fans, incandescent bulbs, motors | — | catalogue |
| Programming | User programmable, on-board micro-USB | — | catalogue |
| PCB size | 140 × 80 × 23 | mm | datasheet |

**Conflicts to verify:** Power input: Datasheets state 100–240 V AC; catalogue says 100–260 V AC; Relay outputs: Datasheet: 240 V AC / 4 A / 980 W; 24 V DC / 4 A

### BA014 · Wi-Fi 4T PWR board

Four triac outputs (three switching, one dimming) with consolidated power monitoring.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 100–240 V AC, 50/60 Hz (catalogue: 100–260 V AC) `[VERIFY]` | V AC / Hz | catalogue |
| Outputs | 4 AC, max 200 W/load; 3 switching and 1 dimming | W | catalogue |
| Power monitoring | Consolidated (HLW8012) | — | catalogue |
| Loads | Fans, incandescent bulbs, motors | — | catalogue |
| Programming | User programmable via external USB-UART | — | catalogue |
| PCB size | 100 × 50 × 20 | mm | datasheet |

**Conflicts to verify:** Power input: Datasheets state 100–240 V AC; catalogue says 100–260 V AC

### BA015 · Wi-Fi 2-relay module

Two relays with power monitoring in a 55 × 55 × 21 mm body.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 100–240 V AC, 50/60 Hz (catalogue: 100–260 V AC) `[VERIFY]` | V AC / Hz | catalogue |
| Outputs | 2, max 1800 W/load (catalogue) `[VERIFY]` | W | catalogue |
| Power monitoring | Yes (HLW8012) | — | catalogue |
| Loads | Geysers, air conditioners, submersible water pumps | — | catalogue |
| Size | 55 × 55 × 21 | mm | catalogue |
| Mounting | Fits inside a compatible switch box | — | catalogue |
| Programming | User programmable via external USB-UART | — | catalogue |

**Conflicts to verify:** Power input: Datasheets state 100–240 V AC; catalogue says 100–260 V AC; Outputs: Datasheet rev A states 240 W in the feature list and 500 V / 500 W in the output table

### BA019 · IoT HDR PM box

One heavy-duty relay with power monitoring for house and hotel-room mains.

| Spec | Value | Unit | Source |
|---|---|---|---|
| Power input | 100–240 V AC, 50/60 Hz (catalogue: 100–260 V AC) `[VERIFY]` | V AC / Hz | catalogue |
| Output | 1 AC, max 6900 W/load (catalogue) `[VERIFY]` | W | catalogue |
| Power monitoring | Yes, for loads (HLW8012) | — | catalogue |
| Digital inputs (optional) | 8, 0–3.3 V DC tolerant | V DC | catalogue |
| Loads | House mains, hotel-room mains | — | catalogue |
| Extras | Power-presence detection at input and output · AC virtual switch · optional DS1307 RTC · programmable via external USB-UART | — | catalogue |

**Conflicts to verify:** Power input: Datasheets state 100–240 V AC; catalogue says 100–260 V AC; Output: Datasheet rev B: 240 V AC / 6000 W; 30 V DC / 600 W
