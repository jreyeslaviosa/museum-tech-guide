---
title: three.js / WebGL
subcategory: Web / JavaScript
skill_level: intermediate
we_use_this: false
related: [p5js, processing, touchdesigner]
tags: [javascript, webgl, 3d, web, browser, real-time, open-source, gpu]
---

three.js is a JavaScript library that makes WebGL — the browser's low-level GPU graphics API — accessible without writing raw shader code. It is the standard tool for 3D graphics, interactive data visualisation, and immersive web experiences in the browser. WebGL itself is a JavaScript API based on OpenGL ES that gives direct access to the GPU from any browser tab, with no plugins.

## three.js vs WebGL

WebGL is the raw API: you write vertex shaders, fragment shaders, and manage buffers manually. It is powerful but verbose. three.js abstracts all of that into a scene graph with cameras, lights, meshes, materials, and geometries — cutting hundreds of lines of setup code into a few. Most browser-based 3D work uses three.js or a framework built on it.

## Related Libraries

- **React Three Fiber** — three.js as React components; popular for web applications combining 3D with UI
- **Babylon.js** — Microsoft's alternative to three.js; stronger tooling for game-like experiences
- **WebGPU** — the successor to WebGL; faster, more capable, now shipping in modern browsers
- **GLSL / Shaders** — the underlying shader language; worth learning for custom visual effects

## Use Cases

- Browser-based 3D interactive exhibits and data visualisations
- Immersive WebGL experiences embedded in the museum website
- Real-time 3D collection browsers and spatial interfaces
- Generative art and audiovisual pieces that run in any browser without installation

## Learning Resources

- [three.js official documentation](https://threejs.org/docs/)
- [Three.js Journey (Bruno Simon, comprehensive course)](https://threejs-journey.com)
- [The Book of Shaders (GLSL fundamentals)](https://thebookofshaders.com)
- [WebGL Fundamentals](https://webglfundamentals.org)
