---
title: TouchOSC
subcategory: Show Control
skill_level: beginner
we_use_this: false
related: [osc, midi, qlab, chataigne, ableton]
tags: [touchosc, osc, midi, control-surface, ipad, tablet, wireless, show-control]
---

TouchOSC is an app for iOS and Android that turns a tablet or phone into a custom wireless control surface — sending OSC and MIDI to any device on the network. In a museum or live event context it is how you build a custom operator panel for a specific show: labelled buttons, faders, XY pads, and displays laid out exactly as needed, without buying dedicated hardware.

## What You Can Build

TouchOSC includes a visual editor (on desktop) where you design the layout — drag faders, buttons, labels, and displays onto a canvas. The layout is synced to the device over WiFi. Each control sends OSC messages on configurable addresses and MIDI notes/CCs on configurable channels.

**Common controls:** Push buttons, toggle buttons, faders, rotary knobs, XY pads, multi-touch pads, LED indicators, text labels.

## OSC vs MIDI Mode

- **OSC:** Sends to any IP address and port on the network. Connects to TouchDesigner, QLab, Ableton, Resolume, Chataigne, or any OSC-capable software. Best for show control and interactive installations
- **MIDI:** Sends MIDI over USB or network (RTP-MIDI). Connects to DAWs, lighting desks, and any MIDI-capable device. Best for music and live performance contexts

## TouchOSC vs Dedicated Hardware

| | TouchOSC | Stream Deck + Companion |
|---|---|---|
| Cost | ~$20 app | ~$150 hardware |
| Flexibility | Fully custom layout | Grid of square buttons |
| Tactile feedback | None (glass screen) | Physical buttons |
| Visual feedback | Full colour display | Icon labels |
| Setup | WiFi, no cables | USB |

TouchOSC wins on flexibility and cost. Stream Deck wins on feel for operators who need reliable physical button confirmation.

## Use Cases

- Custom daily-show operator panel for a museum technician: scene triggers, volume faders, playback controls
- Performer control surface in a live installation — iPad in hand, sending OSC to TouchDesigner
- Remote parameter control for a generative system without writing a GUI
- Quick prototype of a control interface before deciding whether to invest in hardware

## Learning Resources

- [TouchOSC documentation (Hexler)](https://hexler.net/touchosc)
- [TouchOSC in QLab (Figure 53 docs)](https://figure53.com/docs/qlab/)
