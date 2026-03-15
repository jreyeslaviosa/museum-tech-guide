---
title: Network Infrastructure
subcategory: Signal Infrastructure
skill_level: intermediate
we_use_this: true
related: [dante, ndi, artnet, sacn, osc]
tags: [networking, ethernet, switch, vlan, qos, infrastructure, ip, multicast]
---

The network is the backbone of a modern AV installation. Every protocol that matters — Dante, NDI, ArtNet, sACN, OSC — runs over Ethernet, and the quality of that network directly affects reliability, latency, and troubleshooting complexity. Understanding the basics of managed switches, VLANs, and QoS is essential for anyone building permanent installations.

## Managed vs Unmanaged Switches

An unmanaged switch just forwards traffic — plug in and go. A managed switch lets you configure VLANs, QoS, multicast filtering (IGMP), and port mirroring. For any installation running Dante or NDI alongside control traffic, a managed switch is essential.

**Recommended brands:** Cisco SG series, Netgear ProSafe, Ubiquiti UniFi. Avoid consumer-grade switches (TP-Link home range, old D-Link) for permanent AV installs.

## VLANs

VLANs (Virtual LANs) separate traffic on the same physical network. A well-designed AV installation uses separate VLANs for:
- **AV/Dante audio** — isolated, prioritised, low-latency
- **Video (NDI)** — high bandwidth, separated from control
- **Show control (OSC, HTTP)** — light, reliable, separated from high-bandwidth media
- **Corporate/general IT** — completely separated from AV

## QoS (Quality of Service)

QoS prioritises certain traffic types at the switch level. Dante requires QoS to guarantee low latency — Audinate's certification programme specifies exactly how to configure it. Enabling DSCP/EF marking for audio traffic and configuring strict priority queuing prevents audio dropouts when the network is busy.

## Multicast

ArtNet and sACN use multicast UDP. Without IGMP Snooping enabled on your switch, multicast traffic floods all ports — consuming bandwidth across the whole network. Enable IGMP Snooping on any switch carrying ArtNet or sACN.

## Use Cases

- Segmenting Dante audio, NDI video, and show control on a single physical installation network
- Providing reliable low-latency transport for 100+ channel audio systems
- Separating AV traffic from the museum's corporate IT network via VLANs
- Diagnosing packet loss and latency issues using managed switch port statistics

## Learning Resources

- [Dante network design guide (Audinate)](https://www.audinate.com/learning/training-certification)
- [NDI network guide (Vizrt)](https://vizrt.com/products/ndi/)
- [Ubiquiti UniFi documentation](https://ui.com/download/unifi)
