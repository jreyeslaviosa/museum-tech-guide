---
title: VR & AR Hardware
subcategory: XR Headsets
skill_level: intermediate
we_use_this: false
related: [unity, unreal-engine, touchdesigner]
tags: [vr, ar, xr, headset, meta-quest, hololens, vive, immersive, spatial-computing]
---

VR (Virtual Reality) and AR (Augmented Reality) headsets are the hardware layer for immersive experiences in museum contexts. The guide covers Unity and Unreal as the software platforms — this entry covers the physical headsets and their practical trade-offs for museum deployment, where long-term reliability, ease of operation, and visitor hygiene matter as much as the technical specifications.

## Headset Categories

**Standalone VR (no PC required)**
The headset contains all the processing — visitors put it on and experience content without being tethered to a computer.

- **Meta Quest 3:** The current mainstream standard. Standalone Android-based, good standalone performance, optional PC link (Air Link / USB) for higher-fidelity content. Mixed reality (colour passthrough) built in. ~$500
- **Meta Quest 3S:** Lower-cost variant, slightly reduced display quality. ~$300
- **Pico 4:** Alternative to Quest, better enterprise support in some regions

**PC-Tethered VR (high-end)**
Headset streams from a powerful PC — higher visual quality but requires cable or reliable WiFi.

- **Valve Index:** High-end PCVR, excellent tracking, used in demanding permanent installations
- **HP Reverb G2:** High resolution, good for architectural visualisation content

**AR / Mixed Reality**
Overlays digital content on the real world.

- **Microsoft HoloLens 2:** The enterprise AR standard. Standalone, runs Windows Mixed Reality. Used in industrial training and museum overlay experiences. ~$3,500
- **Meta Quest 3 (mixed reality):** Consumer-grade mixed reality at a much lower price point

## Museum Deployment Considerations

**Hygiene:** Shared headsets need lens covers or disposable hygiene masks between visitors. Meta Quest 3 has a removable face gasket.

**Battery:** Quest 3 gives ~2–3 hours per charge. Plan for a rotation of charged headsets or wired setups for long operating days.

**Management:** Meta Quest devices can be managed via MDM (Mobile Device Management) — lock to specific apps, disable store access, deploy content remotely.

**Supervision:** Standalone VR in public spaces needs a guide or clear floor marking to prevent collisions.

## Use Cases

- Standalone VR experiences in a dedicated museum booth (Quest 3, locked to one app)
- Architectural heritage reconstruction — walk through a historical building in VR
- HoloLens AR overlay for collections — point at an object and see digital annotation layers
- PC-tethered high-quality VR for premium experiences where visual fidelity is critical

## Learning Resources

- [Meta Quest developer documentation](https://developer.oculus.com/)
- [Microsoft HoloLens documentation](https://docs.microsoft.com/en-us/hololens/)
- [Unity XR Toolkit](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@latest)
