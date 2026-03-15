---
title: OSC (Open Sound Control)
subcategory: Protocols
skill_level: beginner
we_use_this: true
related: [midi, qlab, chataigne, touchdesigner]
tags: [protocol, osc, networking, udp, show-control, interactive]
---

OSC (Open Sound Control) is a lightweight network protocol for sending control messages between software and hardware over UDP/TCP. It was originally designed for music performance but has become the universal language for interactive installations — every creative tool (TouchDesigner, QLab, Resolume, Chataigne, Millumin, Max/MSP) sends and receives OSC.

## How It Works

OSC messages have an address pattern (like a file path) and one or more values:

```
/installation/zone1/trigger  1
/led/brightness              0.75
/video/cue                   "welcome"
```

Any device on the same network can send to or receive from any other. A TouchDesigner patch can send `/sensor/presence 1` to QLab, which fires an audio cue. Simple, fast, and no driver installation needed.

## OSC vs MIDI

| | OSC | MIDI |
|---|---|---|
| Transport | Network (UDP/TCP) | Cable / USB |
| Values | Float, int, string, any | 0–127 integer |
| Addresses | Arbitrary text paths | Fixed channel/note spec |
| Speed | Fast (network) | Fast (serial) |
| Best for | Software integration | Hardware instruments |

## Use Cases

- Sending sensor triggers from TouchDesigner to QLab to fire audio and video cues
- Controlling Resolume or Millumin from a custom TouchDesigner interface
- Bridging different systems in an installation without writing glue code
- Remote control of any OSC-capable device over the museum network

## Learning Resources

- [OSC specification (opensoundcontrol.org)](https://opensoundcontrol.stanford.edu)
- [OSC in TouchDesigner](https://docs.derivative.ca/OSC)
- [OSC in QLab](https://figure53.com/docs/qlab/v5/control/osc-dictionary/)
