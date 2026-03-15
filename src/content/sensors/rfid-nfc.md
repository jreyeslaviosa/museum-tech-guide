---
title: RFID & NFC
subcategory: Proximity & Identity
skill_level: beginner
we_use_this: false
related: [arduino, raspberry-pi, esp32, qlab]
tags: [rfid, nfc, proximity, identity, interactive, trigger, museum, object-based]
---

RFID (Radio Frequency Identification) and NFC (Near Field Communication) are the standard technologies for object-triggered interactive experiences in museums. A visitor picks up a physical object with an embedded RFID tag, places it on a reader, or taps it against a pad — and the system triggers corresponding audio, video, or content. No cameras, no complex tracking — just a reliable, invisible trigger.

## How It Works

An RFID/NFC reader emits a radio field. When a compatible tag enters that field (passively powered — no battery), the tag broadcasts its unique ID. The reader sends that ID to a connected computer, which maps it to a content trigger in QLab, TouchDesigner, or any show control system.

**NFC vs RFID:**
- **NFC (13.56MHz):** Short range (~5cm), used for tap interactions, phone compatibility. Standard in museum interactives where precision matters
- **RFID (125kHz, 13.56MHz, UHF):** Longer range options (UHF can read from metres away), used for inventory and location tracking as well as interaction

## Hardware

- **Arduino + RC522 module:** ~$5 total, serial output, widely documented
- **Raspberry Pi + MFRC522:** Same module, Python libraries available
- **ACR122U:** USB NFC reader that appears as a USB HID device — reads directly on Mac/Windows without custom firmware, works with QLab via USB HID input
- **Phidgets RFID reader:** Professional, USB, excellent SDK for Windows/Mac, easy integration with show control

## Use Cases

- Pick-up-and-learn: visitor lifts an object from a plinth, audio/video plays about that object
- Collection exploration: tap an NFC card to explore related collection items on a screen
- Narrative branching: choosing which object to interact with determines the story path
- Staff check-in or access control for interactive equipment

## Learning Resources

- [Arduino RFID tutorial (Random Nerd Tutorials)](https://randomnerdtutorials.com/rfid-rc522-arduino-rfid-reader/)
- [Phidgets RFID documentation](https://www.phidgets.com/docs/RFID_Primer)
