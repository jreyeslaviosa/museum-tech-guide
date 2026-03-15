---
title: Power Distribution
subcategory: Infrastructure
skill_level: intermediate
we_use_this: true
related: [projectors, led-panels, arduino, raspberry-pi]
tags: [power, pdu, ups, infrastructure, electrical, rack, installation]
---

Power distribution is the unglamorous foundation of every installation — but poor power planning causes more failures than any software bug. Understanding PDUs, UPS units, and basic circuit planning prevents equipment damage, unexpected shutdowns, and fire hazards in permanent installations.

## PDUs (Power Distribution Units)

A PDU is a rack-mounted or wall-mounted multi-outlet unit that distributes mains power to equipment. Unlike a domestic power strip, a PDU is:
- **Rated for continuous load** — not derated after a few hours
- **Individually fused** — each circuit protected separately
- **Optionally metered** — shows current draw per outlet
- **Optionally switched** — remote power cycling of individual devices

For permanent installations, a metered switched PDU (brands: APC, Raritan, Vertiv) allows remote rebooting of devices without physical access to the rack — essential for unattended daily operation.

## UPS (Uninterruptible Power Supply)

A UPS provides battery backup and power conditioning. Critical for:
- **Clean shutdown** — gives computers and media servers time to shut down gracefully during a power cut
- **Power conditioning** — filters noise and voltage spikes that cause equipment damage over time
- **Brownout protection** — maintains stable voltage during sags that crash computers

Size a UPS by total load (watts) and required runtime. A rule of thumb: double the calculated load and plan for 10–15 minutes of runtime minimum.

## Circuit Planning

- Run dedicated circuits for high-draw equipment (projectors, power amplifiers, LED drivers)
- Never share a circuit between projectors and IT equipment — inrush current on projector startup causes voltage sags
- Ground all equipment to a common point to avoid ground loops in audio and video systems
- Label every circuit at the breaker panel and at the PDU

## Use Cases

- Rack system in a plant room feeding a multi-projector installation
- UPS protecting a show control computer and media servers from power cuts
- Metered PDU providing visibility into power consumption for energy reporting
- Remote-switched PDU allowing the operations team to reboot stuck devices without entering the gallery

## Learning Resources

- [APC UPS selector guide](https://www.apc.com/us/en/tools/ups_selector/)
- [PDU buying guide (Vertiv)](https://www.vertiv.com/en-us/products-catalog/power-distribution/)
