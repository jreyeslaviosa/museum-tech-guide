---
title: MIDI
subcategory: Protocols
skill_level: beginner
we_use_this: false
related: [osc, qlab, chataigne, max-msp]
tags: [protocol, midi, show-control, music, hardware, serial]
---

MIDI (Musical Instrument Digital Interface) is a 40-year-old protocol that remains ubiquitous in creative technology. Originally designed to connect synthesisers, it is now used to control lighting consoles, trigger show cues, drive media servers, and integrate hardware controllers. If a device has a knob, fader, or button that talks to software, it almost certainly speaks MIDI.

## MIDI Messages

MIDI carries simple numeric messages over a serial connection or USB:

- **Note On / Off** — trigger an event (cue, effect, state change)
- **Control Change (CC)** — continuous value 0–127 (fader, knob)
- **Program Change** — select a preset or scene
- **Clock / Timecode** — sync tempo and timing between devices

## Modern MIDI

- **MIDI over USB** — standard on all modern interfaces and controllers
- **MIDI 2.0** — higher resolution (32-bit), bidirectional; slowly being adopted
- **RTP-MIDI (MIDI over network)** — native on macOS; allows MIDI over WiFi/Ethernet

## Use Cases

- Physical MIDI controllers (faders, buttons, pads) mapped to media server parameters
- Sending MIDI timecode from a DAW to sync QLab playback
- Lighting consoles receiving MIDI cues from a show control system
- Custom hardware controllers built on Arduino sending MIDI to control installation states

## Learning Resources

- [MIDI Association official documentation](https://www.midi.org/articles)
- [MIDI in TouchDesigner](https://docs.derivative.ca/MIDI_In_CHOP)
- [MIDI in QLab](https://figure53.com/docs/qlab/v5/control/midi-dictionary/)
