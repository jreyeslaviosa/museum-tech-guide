---
title: sACN (E1.31)
subcategory: Lighting Protocols
skill_level: intermediate
we_use_this: false
related: [artnet, dmx-basics, advatek-pixlite]
tags: [protocol, dmx, networking, ethernet, sacn, e1.31, lighting]
---

sACN (Streaming ACN, ANSI E1.31) is an ESTA-standardised protocol for transmitting DMX512 data over IP networks, similar in purpose to ArtNet but with multicast support and a more formal standards backing. It is the preferred protocol for many professional lighting consoles and pixel controllers.

## Use Cases

- Controlling pixel controllers (Advatek, Falcon) from professional lighting consoles (GrandMA, ETC Ion)
- Multicast distribution of DMX universes to multiple receivers simultaneously without unicast overhead
- Integration with building automation systems in permanent museum installations
- High universe-count installations where sACN's multicast efficiency outperforms ArtNet

## ArtNet vs sACN

Both protocols carry DMX over Ethernet. sACN supports multicast (one sender, many receivers simultaneously) and is ratified by ESTA; ArtNet is simpler and more common in creative coding tools. Many devices support both.

## Learning Resources

- [ESTA E1.31 sACN specification](https://tsp.esta.org/tsp/documents/docs/ANSI_E1-31-2018.pdf)
- [sACN explained (Obsidian Control)](https://obsidiancontrol.com/support/article/sacn-artnet-difference)
- [sACN in TouchDesigner](https://docs.derivative.ca/sACN)
