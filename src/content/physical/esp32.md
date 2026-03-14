---
title: ESP32
subcategory: Microcontrollers
skill_level: beginner
we_use_this: false
related: [arduino, wled, teensy]
tags: [microcontroller, wifi, bluetooth, esp32, espressif, iot, embedded]
---

The ESP32 is a low-cost, low-power microcontroller with built-in WiFi and Bluetooth, made by Espressif. It is the most widely used microcontroller in interactive art and IoT projects — cheap enough to embed permanently in an installation, powerful enough to run WLED, handle sensor data, and communicate over the network without any additional hardware.

## ESP32 vs Arduino

| | ESP32 | Arduino Uno |
|---|---|---|
| Price | ~£3–8 | ~£20 |
| WiFi | Built-in | Needs shield |
| Bluetooth | Built-in | No |
| Speed | 240MHz dual-core | 16MHz |
| RAM | 520KB | 2KB |
| Programming | Arduino IDE / MicroPython | Arduino IDE |

The ESP32 has essentially made the Arduino Uno obsolete for networked projects. It is programmed using the same Arduino IDE and C++ API, making the transition easy for anyone already familiar with Arduino.

## Popular Variants

- **ESP32 DevKit:** Generic development board; the most common starting point
- **ESP32-S3:** Newer variant with USB support and AI acceleration
- **ESP32-C3:** Smaller, single-core RISC-V; good for cost-sensitive deployments
- **Seeed Studio XIAO ESP32:** Ultra-compact; fits in very tight installations
- **M5Stack:** ESP32 in a compact enclosure with screen, battery, and IO

## Use Cases

- Running WLED firmware for WiFi-controlled addressable LED installations
- Wireless sensor nodes that report over MQTT or HTTP to a central system
- Custom interactive controls (buttons, touch sensors, distance sensors) connected to the network
- Replacing Arduino + Ethernet shield with a single cheaper board

## Learning Resources

- [Espressif ESP32 documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/)
- [Random Nerd Tutorials (ESP32 guides)](https://randomnerdtutorials.com/esp32/)
- [ESP32 with Arduino IDE setup](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-2/)
