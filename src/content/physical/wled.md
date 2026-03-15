---
title: WLED
subcategory: LED Controllers
skill_level: beginner
we_use_this: true
related: [led-strip, artnet, sacn, arduino, raspberry-pi]
tags: [led, wled, esp32, wifi, artnet, sacn, addressable, open-source]
---

WLED is open-source firmware for ESP32 and ESP8266 microcontrollers that turns a $6 board into a fully-featured WiFi-connected LED controller. It ships with over 100 built-in effects, a web interface accessible from any browser, and support for ArtNet and sACN — making it one of the most practical tools for LED installations at any scale.

## Why It Matters

Before WLED, driving addressable LEDs from a network required dedicated hardware (Advatek, DMXking) or custom firmware. WLED runs on a generic ESP32 board you can buy for a few dollars, configured entirely through a browser with no code required. For prototyping, art installations, or smaller permanent pieces it is often the fastest path from idea to working lights.

## Key Features

- **Web UI:** Configure everything from a browser — no app, no drivers
- **ArtNet & sACN input:** Receive data from TouchDesigner, Resolume, QLC+, or any lighting software
- **Sync:** Multiple WLED devices sync over the network for large installations
- **JSON & HTTP API:** Control programmatically from any language
- **Presets & playlists:** Store and schedule lighting scenes for unattended operation
- **Home automation:** Native integration with Home Assistant, MQTT

## Hardware

Any ESP32 or ESP8266 board works. Popular choices:
- **ESP32 DevKit** — most common, dual-core, reliable WiFi
- **QuinLED-Dig-Uno** — purpose-built WLED board with level shifting and power connectors
- **ABC! WLED controller** — ready-made board for clean permanent installs

## Use Cases

- Rapid prototyping of LED installation concepts without specialist hardware
- Small to medium permanent LED installations (strips, rings, matrices) in gallery spaces
- Receiving ArtNet from TouchDesigner for interactive LED art
- Unattended ambient lighting that runs preset scenes on a schedule

## Learning Resources

- [WLED official documentation](https://kno.wled.ge)
- [WLED GitHub repository](https://github.com/Aircoookie/WLED)
- [QuinLED hardware guide](https://quinled.info)
