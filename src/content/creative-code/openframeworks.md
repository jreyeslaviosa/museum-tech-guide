---
title: openFrameworks
subcategory: Code-First
skill_level: advanced
we_use_this: false
related: [processing, touchdesigner, opencv]
tags: [creative-coding, c++, generative, real-time, open-source, performance]
---

openFrameworks is an open-source C++ toolkit for creative coding. Where Processing is designed for accessibility, openFrameworks is designed for performance — direct access to OpenGL, fast video processing, real-time audio, and hardware I/O. It is the tool of choice when a creative project needs to run at maximum speed or interface directly with hardware.

## Why C++

C++ gives openFrameworks access to the full performance of the machine. Large-scale interactive installations that process multiple HD video streams, drive complex particle simulations, or communicate with custom hardware often end up in openFrameworks when TouchDesigner hits its limits.

## Key Addons

openFrameworks has a rich addon ecosystem (`ofxAddons`):
- `ofxOpenCv` — computer vision via OpenCV
- `ofxKinect` — Kinect depth camera integration
- `ofxOsc` — OSC communication
- `ofxAudioAnalyzer` — real-time audio feature extraction
- `ofxGui` — quick parameter controls for development

## Use Cases

- High-performance interactive installations requiring precise control over rendering
- Custom hardware integration via serial, USB, or GPIO
- Large-scale data visualisation requiring sustained 60fps on complex geometry
- Projects where TouchDesigner's node-based workflow is too limiting

## Learning Resources

- [openFrameworks official documentation](https://openframeworks.cc/documentation/)
- [ofBook (free community book)](https://openframeworks.cc/ofBook/chapters/foreword.html)
- [openFrameworks forums](https://forum.openframeworks.cc)
