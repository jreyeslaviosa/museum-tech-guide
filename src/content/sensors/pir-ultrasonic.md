---
title: PIR & Ultrasonic Sensors
subcategory: Presence Detection
skill_level: beginner
we_use_this: false
related: [arduino, esp32, raspberry-pi, qlab, touchdesigner]
tags: [pir, ultrasonic, motion, presence, detection, trigger, interactive, sensor]
---

PIR (Passive Infrared) and ultrasonic distance sensors are the simplest and cheapest tools for detecting visitor presence and triggering content. They lack the precision of depth cameras or computer vision, but that simplicity is their strength — reliable, low-cost, easy to integrate, and invisible to visitors.

## PIR Sensors

A PIR sensor detects movement by measuring changes in infrared radiation (body heat). Output is a simple HIGH/LOW digital signal — someone is present or they are not. Ideal for: triggering content when someone enters a space, waking a sleeping display, or activating ambient sound.

- **Range:** Typically 5–7 metres, adjustable
- **Angle:** ~110–120° field of view
- **Limitation:** Only detects movement — a stationary visitor won't maintain the trigger
- **Cost:** ~$2–5

## Ultrasonic Sensors (HC-SR04)

An ultrasonic sensor (e.g. HC-SR04) emits a sound pulse and measures the time until the echo returns — giving a precise distance reading. Unlike PIR, it works on stationary objects.

- **Range:** 2cm – 4 metres
- **Output:** Analogue distance in cm (via Arduino/ESP32)
- **Use case:** Triggering content when a visitor stands within X cm of a point; measuring crowd density at an exhibit

## Integration with Show Control

Both sensors connect to an Arduino or Raspberry Pi, which sends triggers via serial, OSC, HTTP, or MIDI to QLab, TouchDesigner, or Chataigne. The ESP32 variant can send triggers directly over WiFi via OSC or MQTT — no USB cable needed.

## Use Cases

- Wake-on-approach: display activates when visitor enters the space, sleeps after they leave
- Proximity trigger: audio narration begins when visitor stands in front of an exhibit
- Crowd sensing: ultrasonic array measures how many people occupy different zones
- Low-cost interactive trigger for budget installations where depth cameras are unnecessary

## Learning Resources

- [PIR sensor with Arduino (Arduino docs)](https://docs.arduino.cc/built-in-examples/digital/Button/)
- [HC-SR04 ultrasonic with ESP32 (Random Nerd Tutorials)](https://randomnerdtutorials.com/esp32-hc-sr04-ultrasonic-arduino/)
