---
title: MediaPipe
subcategory: Computer Vision
skill_level: intermediate
we_use_this: false
related: [opencv, depth-camera, touchdesigner]
tags: [computer-vision, ml, hand-tracking, pose, face, google, real-time]
---

MediaPipe is Google's open-source framework for real-time perception tasks — hand tracking, full-body pose estimation, face mesh, and object detection — running on CPU without a GPU or depth camera. It is the most practical modern replacement for Kinect-based body tracking in interactive installations, running on a standard webcam.

## Key Solutions

- **Hand Landmarker:** 21 3D landmarks per hand, both hands simultaneously; very accurate
- **Pose Landmarker:** 33 body landmarks; full-body tracking from a 2D camera
- **Face Landmarker:** 478 facial landmarks for expression and gaze tracking
- **Object Detection:** Detect and track objects in real time

## MediaPipe vs Kinect / Depth Cameras

MediaPipe runs on a regular RGB webcam (no depth sensor) using ML inference. The trade-off: it works further from the camera and in complex lighting, but doesn't give you actual depth/distance data. For gesture and pose-driven interactions it is often preferable and much cheaper.

## Use Cases

- Touchless gesture control of interactive exhibits using hand tracking on a standard webcam
- Body pose-driven interactive installations without depth camera hardware
- Face tracking for exhibits that respond to gaze direction or expressions
- Rapid prototyping of body-interactive experiences before investing in depth hardware

## Integration

MediaPipe runs natively in Python and JavaScript (MediaPipe.js for browser-based installations). It can be integrated into TouchDesigner via Python scripts or community-built components.

## Learning Resources

- [MediaPipe official documentation](https://developers.google.com/mediapipe)
- [MediaPipe in Python (quickstart)](https://developers.google.com/mediapipe/solutions/guide)
- [MediaPipe + TouchDesigner (YouTube)](https://www.youtube.com/results?search_query=mediapipe+touchdesigner)
