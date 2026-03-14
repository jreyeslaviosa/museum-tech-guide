---
title: Cables.gl
subcategory: Node-Based / Visual
skill_level: beginner
we_use_this: false
related: [touchdesigner, vvvv, threejs, p5js]
tags: [cables, webgl, node-based, visual-programming, browser, generative, shader]
---

Cables.gl is a browser-based node-patching environment for real-time graphics — the closest thing to TouchDesigner that runs entirely in a web browser. It is built on WebGL and uses a visual patching interface to build generative visuals, interactive experiences, and shaders without writing code. Projects are deployed as URLs, making it useful for web-embedded installations and prototyping.

## What Makes It Different

Unlike TouchDesigner or vvvv which require installed software and dedicated hardware, Cables runs entirely in the browser using WebGL — no installation, no GPU drivers, accessible on any device. The output is standard WebGL that can be embedded in any web page via an `<iframe>`.

## Patching Interface

Cables uses an operator (op) graph: each node processes data or renders geometry, connected by cables (wires). It ships with hundreds of built-in ops for geometry, shaders, audio, GLSL, physics, and IO. Custom GLSL shaders can be written inline within the graph.

## Use Cases

- Rapid prototyping of generative visuals without writing code
- Web-embedded interactive art pieces (kiosk browsers, companion sites)
- Shader exploration and GLSL learning with immediate visual feedback
- Lightweight installations that run on a browser without dedicated software

## Limitations

- Less suited for multi-output or high-channel-count professional installations than TouchDesigner
- No native DMX, timecode, or hardware IO — browser sandbox applies
- Performance limited by browser/WebGL rather than raw GPU

## Learning Resources

- [Cables.gl official site](https://cables.gl/)
- [Cables.gl documentation](https://cables.gl/docs)
- [Cables.gl patch examples gallery](https://cables.gl/explore)
