---
title: Teensy
subcategory: Microcontrollers
skill_level: intermediate
we_use_this: false
related: [arduino]
tags: [microcontroller, usb, midi, hid, audio, led, real-time]
---

Teensy is a family of compact microcontroller boards from PJRC that are programmed using the Arduino IDE. They are significantly faster and more capable than standard Arduinos — particularly for USB MIDI, audio processing, and high-speed LED control — making them popular in creative technology and interactive installation work.

## Why Teensy over Arduino

- **Speed:** Teensy 4.1 runs at 600MHz vs Arduino Uno at 16MHz
- **USB MIDI/HID:** Native USB that can appear as MIDI device, keyboard, or joystick without extra library hacks
- **Audio:** Teensy Audio Shield enables real-time audio processing and synthesis
- **LED throughput:** Used with OctoWS2811 library to drive thousands of WS2811/WS2812 LEDs in parallel

## Use Cases

- Building custom MIDI controllers and interactive input devices
- Driving large WS2812 LED installations with precise timing
- Real-time audio-reactive systems that need low-latency hardware response
- Custom USB HID devices (pressure pads, custom buttons) for interactive installations

## Learning Resources

- [PJRC Teensy documentation](https://www.pjrc.com/teensy/)
- [Teensy Audio library guide](https://www.pjrc.com/teensy/td_libs_Audio.html)
- [OctoWS2811 LED library](https://www.pjrc.com/teensy/td_libs_OctoWS2811.html)
