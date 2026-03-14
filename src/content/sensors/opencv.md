---
title: OpenCV
subcategory: Computer Vision
skill_level: intermediate
we_use_this: false
related: [depth-camera, kinect, touchdesigner]
tags: [computer-vision, image-processing, python, c++, tracking, detection]
---

OpenCV (Open Source Computer Vision Library) is the most widely used open-source library for real-time computer vision and image processing. It provides hundreds of algorithms for object detection, face recognition, optical flow, colour tracking, and more. Available in Python, C++, Java, and JavaScript.

## Use Cases

- Colour and blob tracking for interactive installations without depth cameras
- Background subtraction and motion detection for visitor presence sensing
- Face detection and recognition for personalized interactive exhibits
- Optical flow for detecting movement direction and speed of visitors
- Integrating webcam-based detection into TouchDesigner, openFrameworks, or Processing

## Getting Started

OpenCV works in Python with just a few lines:

```python
import cv2
cap = cv2.VideoCapture(0)  # Open webcam
while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    cv2.imshow('frame', gray)
    if cv2.waitKey(1) == ord('q'):
        break
```

## Learning Resources

- [OpenCV official documentation](https://docs.opencv.org)
- [OpenCV Python tutorials](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)
- [Practical Python and OpenCV (book)](https://pyimagesearch.com/practical-python-opencv/)
