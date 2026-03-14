---
title: Depth Cameras
subcategory: Sensing & Tracking
skill_level: intermediate
we_use_this: false
related: [kinect, lidar, opencv, touchdesigner]
tags: [depth, camera, point-cloud, skeleton-tracking, sensing, realsense, zed]
---

Depth cameras capture both a standard 2D colour image and per-pixel depth (distance) data, enabling 3D scene reconstruction, skeleton tracking, and gesture recognition. They are the primary tool for body tracking in interactive installations now that the original Microsoft Kinect has been discontinued.

## Common Sensors

- **Intel RealSense D435/D455:** Affordable stereo depth camera; USB; cross-platform SDK; good for close-range (0.2–10m)
- **Stereolabs ZED 2:** High-quality stereo camera with NVIDIA CUDA-accelerated SDK; excellent outdoor range and accuracy
- **Microsoft Azure Kinect (DK):** Successor to Kinect; combines ToF depth + RGB + microphone array; body tracking SDK included
- **Orbbec Astra series:** Structured-light depth cameras; Kinect-compatible OpenNI SDK

## Use Cases

- Full body skeleton tracking for gesture-driven interactive experiences
- Generating live point clouds of visitors for visual effects in TouchDesigner or vvvv
- Detecting hand gestures for touchless interactive exhibits
- Background subtraction and silhouette extraction for projection mapping onto people

## Learning Resources

- [Intel RealSense SDK documentation](https://dev.intelrealsense.com/docs/sdk-documentation)
- [Azure Kinect body tracking SDK](https://learn.microsoft.com/en-us/azure/kinect-dk/body-sdk-setup)
- [ZED SDK documentation](https://www.stereolabs.com/docs/)
- [Depth cameras in TouchDesigner (Matthew Ragan)](https://matthewragan.com)
