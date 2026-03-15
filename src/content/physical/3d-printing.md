---
title: 3D Printing
subcategory: Fabrication
skill_level: beginner
we_use_this: false
related: [arduino, esp32, raspberry-pi, servo-motors]
tags: [3d-printing, fabrication, fdm, enclosure, prototyping, physical, making]
---

3D printing is a standard part of the physical computing workflow for museum installations — used to fabricate custom enclosures, sensor mounts, interface elements, and one-off structural parts that cannot be bought off the shelf. An FDM (Fused Deposition Modelling) printer costing $200–400 can produce installation-quality parts overnight, replacing what would otherwise require expensive custom fabrication.

## FDM vs Resin

**FDM (filament printing):** The most common type. Melts plastic filament layer by layer. Materials: PLA (easy, biodegradable), PETG (stronger, heat-resistant), TPU (flexible). Good for enclosures, brackets, structural parts. Layer lines visible — acceptable for functional parts, less so for exhibition-facing pieces without sanding/painting.

**Resin (SLA/MSLA):** Uses UV light to cure liquid resin. Much finer detail, smooth surface. Slower, messier, requires post-processing. Better for exhibition-facing parts that need a clean finish.

## Practical Use in Installations

- **Sensor enclosures:** Mount a PIR, ultrasonic, or RFID reader cleanly inside a gallery-appropriate housing
- **Cable management:** Custom clips, conduit brackets, cable entry points
- **Interactive elements:** Custom buttons, levers, or tactile objects for visitor interaction
- **Electronics housing:** Enclose an Arduino or Raspberry Pi in a form that matches the exhibition aesthetic
- **Prototyping:** Test a physical concept before commissioning it in metal or wood

## Software

- **Fusion 360** (free for non-commercial): Industry standard parametric CAD, good for precise mechanical parts
- **Blender:** 3D modelling with mesh export to STL — better for organic shapes
- **Tinkercad:** Browser-based, very approachable for simple box/bracket design
- **Cura / PrusaSlicer:** Slicing software that converts 3D models to printer instructions

## Learning Resources

- [Printables.com (model library)](https://www.printables.com/)
- [Prusa knowledge base](https://help.prusa3d.com/)
- [Tinkercad (browser-based CAD)](https://www.tinkercad.com/)
