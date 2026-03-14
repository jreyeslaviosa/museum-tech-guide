---
title: Servo Motors
subcategory: Motors & Actuators
skill_level: intermediate
we_use_this: false
related: [stepper-motors, arduino]
tags: [servo, motor, actuator, pwm, kinetic, robotics]
---

Servo motors are rotary actuators that allow precise control of angular position, speed, and torque. Unlike stepper motors (which move in fixed increments), servos use closed-loop feedback (typically a position encoder) to hold or move to an exact angle. Common in kinetic sculpture, robotic art, and animatronics.

## Types

- **RC/hobby servo:** Small, low-torque servos (e.g. SG90) driven by PWM signal; easy to use with Arduino; limited rotation (typically 0–180°)
- **Continuous rotation servo:** Modified hobby servo that spins freely; used for wheels and slow continuous motion
- **Industrial servo:** High-torque, high-precision drives for heavy kinetic sculptures; require dedicated motor drivers

## Use Cases

- Animating kinetic sculpture elements with precise positional control
- Building pan/tilt mechanisms for camera tracking or mirror arrays
- Moving physical elements (doors, shutters, flaps) in interactive installations
- Robotics and animatronic figures in immersive theatre

## Learning Resources

- [Arduino servo tutorial (official)](https://www.arduino.cc/en/Tutorial/LibraryExamples/Sweep)
- [Adafruit servo guide](https://learn.adafruit.com/adafruit-arduino-lesson-14-servo-motors)
