---
title: Isadora
subcategory: Interactive Media
skill_level: intermediate
we_use_this: false
related: [touchdesigner, qlab, max-msp, opencv, midi]
tags: [isadora, interactive, video, sensor, performance, installation, theatre, node-based]
---

Isadora is a node-based interactive media environment designed specifically for performance and installation — a direct bridge between live sensor input and real-time video/audio output. It predates TouchDesigner as the standard for interactive theatrical media and remains widely used in dance, performance art, and museum installations where the workflow centres on video processing and live performance rather than generative graphics.

## Isadora vs TouchDesigner

| | Isadora | TouchDesigner |
|---|---|---|
| Primary focus | Video + performance | Generative + data |
| Video playback | Excellent | Good |
| Sensor integration | Direct (MIDI, OSC, serial) | Via CHOP channels |
| Learning curve | Moderate | Steep |
| Community | Theatre/performance | Tech/creative code |
| Price | ~$600 perpetual | Free (non-commercial) |

Isadora's strength is its approachability for theatre practitioners: the actor/video interaction, scene-based structure, and clip-forward video handling feel natural to directors and choreographers, not just engineers.

## Scene Model

Isadora is organised around Scenes — discrete states that can be activated and deactivated. Each Scene contains Actors (nodes) that process data and media. This maps well to theatrical cue thinking: Scene 1 is the opening state, Scene 2 is the next state, and so on.

## Key Capabilities

- **Live video processing:** Camera input, chroma key, colour grading, geometric distortion in real time
- **Multi-screen output:** Route video to multiple outputs with independent content
- **Sensor input:** MIDI, OSC, serial, keyboard, mouse — all become values that drive parameters
- **Video playback:** Movie Player actor with frame-accurate playback and speed control
- **Projection mapping:** Built-in projection mapping stage (Isadora 3+)

## Use Cases

- Dance and performance installations where a live camera feed is processed and mixed with pre-recorded video
- Museum interactives where visitor movement (via camera or sensors) changes what is projected
- Theatrical productions with complex video cuing alongside lighting and sound
- Touring installations where the scene-based model simplifies handover to technicians

## Learning Resources

- [Isadora documentation (Troikatronix)](https://support.troikatronix.com/support/solutions)
- [Isadora community forum](https://community.troikatronix.com/)
