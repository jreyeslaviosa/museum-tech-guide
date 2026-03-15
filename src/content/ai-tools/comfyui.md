---
title: ComfyUI
subcategory: Generative Image
skill_level: intermediate
we_use_this: false
related: [stable-diffusion, midjourney, runway, claude]
tags: [comfyui, stable-diffusion, generative, ai, image, nodes, workflow, local]
---

ComfyUI is a node-based graphical interface for running Stable Diffusion and other generative AI models locally. It has become the industry standard for serious generative image work — replacing the earlier Automatic1111 web UI — because its node graph exposes the full pipeline, enabling complex multi-step workflows that would be impossible in a simple prompt box.

## Why ComfyUI

Where Midjourney is a black box (type prompt, get image), ComfyUI gives full control over every stage: model loading, sampling algorithm, ControlNet conditioning, image-to-image, inpainting, upscaling, and more. Workflows are saved as JSON graphs and shared widely in the community — meaning you can import a published workflow and run it immediately.

## Node Graph Model

Each node represents one operation: load model, encode text, sample latent, decode image, save file. Nodes are connected by cables. This makes it possible to:
- Chain multiple models in sequence
- Add ControlNet conditioning (pose, depth, edge) to guide generation
- Run batch generation pipelines
- Integrate custom Python nodes for any operation

## Key Concepts

- **Checkpoints:** The base model weights (SDXL, Flux, SD 1.5, etc.)
- **LoRA:** Fine-tuned adapters for specific styles or subjects, loaded on top of a base model
- **ControlNet:** Conditions generation on an input image (depth map, pose skeleton, edge map)
- **Sampler:** The algorithm used to denoise the latent (Euler, DPM++, DDIM, etc.)
- **VAE:** Encodes/decodes between pixel space and latent space

## Hardware Requirements

Runs on Mac (Apple Silicon via MPS), Windows/Linux (NVIDIA GPU via CUDA). A GPU with 8GB+ VRAM runs SDXL comfortably. Apple M-series Macs run it well without a discrete GPU.

## Use Cases

- Generating consistent concept imagery for exhibition design and moodboarding
- Creating custom image assets for digital installations with full style control
- Running ControlNet workflows to generate imagery that matches specific compositions or spatial layouts
- Building repeatable production pipelines for generating variant content

## Learning Resources

- [ComfyUI GitHub repository](https://github.com/comfyanonymous/ComfyUI)
- [ComfyUI workflow examples (OpenArt)](https://openart.ai/workflows/home)
