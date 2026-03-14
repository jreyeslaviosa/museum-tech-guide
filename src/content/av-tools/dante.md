---
title: Dante
subcategory: Audio Networking
skill_level: intermediate
we_use_this: false
related: [midi, osc, qlab, blackmagic]
tags: [audio, networking, dante, audinate, ip, protocol, professional]
---

Dante (by Audinate) is the audio industry's equivalent of NDI for video — it carries uncompressed multi-channel audio over a standard IP network with very low latency. It is the dominant audio networking standard in professional AV, installed in most modern mixing desks, amplifiers, DSPs, and installed sound systems. If a museum has a professional audio infrastructure, it almost certainly uses Dante.

## How It Works

Dante runs over a standard Ethernet network (ideally a dedicated VLAN for latency and reliability). Any Dante-enabled device can send audio to any other Dante-enabled device on the same network, routed via the Dante Controller software. No physical audio cables needed between devices once they are connected to the network.

## Dante Virtual Soundcard

Dante Virtual Soundcard (DVS) is a software licence that turns any Mac or Windows computer into a Dante audio device — routing audio in and out of a computer over the network without physical audio interfaces. This is how a computer running QLab or Ableton sends audio to the house system without a long physical cable run to the stage box.

## Dante vs Analogue

| | Dante | Analogue |
|---|---|---|
| Cable | Cat6 (up to 100m) | XLR (shorter runs) |
| Channels | 512+ over one cable | 1 per cable |
| Latency | ~1ms | Near-zero |
| Distance | Network range (km with switches) | ~100m max |
| Setup | Dante Controller software | Physical patching |

## Use Cases

- Routing audio from a show control computer (QLab) to a distributed speaker system without long cable runs
- Multi-room audio distribution in a museum — one Dante network feeds all gallery audio zones
- Connecting a mixing desk to stage boxes and amplifiers without analogue multicore
- Recording multi-channel audio from a live performance to a DAW over the network

## Learning Resources

- [Audinate Dante documentation](https://www.audinate.com/learning/training-certification)
- [Dante Controller user guide](https://www.audinate.com/products/software/dante-controller)
- [Dante certification (free online)](https://www.audinate.com/learning/dante-certification-program)
