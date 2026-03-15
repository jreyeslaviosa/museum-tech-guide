---
title: Leap Motion / Ultraleap
subcategory: Hand & Gesture Tracking
skill_level: intermediate
we_use_this: false
related: [touchdesigner, opencv, mediapipe, depth-camera]
tags: [leap-motion, ultraleap, hand-tracking, gesture, touchless, interactive, sensor]
---

Leap Motion (now Ultraleap) is a dedicated hand and finger tracking sensor — a small USB device that tracks the position of both hands and all 10 fingers in 3D space with very low latency. It is the standard hardware for touchless gesture interaction in museum and exhibition contexts where visitors control content with natural hand movements without touching a screen.

## How It Works

The device uses infrared cameras and structured light to build a real-time 3D model of hands in the ~60cm field above it. Unlike depth cameras (which track bodies or faces), Leap Motion is specifically optimised for hand/finger precision — giving sub-centimetre accuracy on individual finger joints at high frame rates (>100fps).

## Leap vs MediaPipe Hand Tracking

| | Leap Motion | MediaPipe |
|---|---|---|
| Hardware | Dedicated sensor (~$100) | Any webcam (free) |
| Accuracy | Sub-centimetre, 3D | Good 2D, estimated 3D |
| Latency | Very low (~5ms) | Higher (20–50ms) |
| Occlusion handling | Excellent | Limited |
| Setup | Driver + SDK | Python library |

For professional permanent installations, Leap Motion's hardware accuracy and latency is worth the cost. MediaPipe is better for rapid prototyping or lower-budget projects.

## Integration

- **TouchDesigner:** Official plugin + community tools provide joint data as CHOP channels
- **Unity / Unreal:** Official SDK with prefabs for hand presence in XR
- **openFrameworks / Processing:** Community wrappers available
- **OSC bridge:** Tools exist to forward joint data as OSC to any application

## Use Cases

- Touchless navigation of archive content — wave to scroll, pinch to select
- Gesture-driven generative visuals that respond to hand shape and speed
- Virtual object manipulation in an exhibition context
- Accessible interaction for visitors who cannot use touch screens

## Learning Resources

- [Ultraleap developer documentation](https://developer.leapmotion.com/)
- [Leap Motion in TouchDesigner (TouchDesigner forum)](https://forum.derivative.ca/)
