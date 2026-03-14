---
title: Reaper
subcategory: Audio Software
skill_level: intermediate
we_use_this: false
related: [ableton, bitwig, qlab, timecode, dante]
tags: [audio, daw, reaper, recording, post-production, midi, show-control, multitrack]
---

Reaper is a lightweight, highly customisable DAW produced by Cockos. It is the professional standard for audio post-production, sound design, and multi-track recording in theatre and AV production. Unlike Ableton (live performance focus) or Pro Tools (legacy broadcast/film), Reaper is flexible enough for both studio work and live show control — and is priced accessibly for small studios and freelancers.

## Why Reaper in AV/Museum Work

Reaper's key advantage is its deep customisability via scripting (ReaScript in Lua, Python, or C) and its efficient handling of large multi-track sessions. For museum installations with long-running or overnight shows, Reaper's stability and low resource usage make it a reliable choice. It is also widely used in theatre sound for stem mixing and playback.

## Timecode and Show Control

- Receives MIDI Timecode (MTC) and LTC (via audio input) to sync to external show control
- Sends MTC to sync external devices to Reaper's transport
- MIDI I/O for cueing and parameter control
- OSC support via community extensions (SWS/ReaScript)

## ReaScript

Reaper's built-in scripting API allows nearly every parameter and action to be automated or remotely controlled. Scripts can be bound to keyboard shortcuts or triggered via MIDI/OSC. This makes complex show-specific automation (such as timed multi-stem playback systems) achievable without third-party middleware.

## Use Cases

- Multi-channel audio playback for permanent installations (stems, ambisonic)
- Sound design and post-production for exhibition audio content
- Theatre and live event audio show control (cue-based playback)
- Recording and editing audio content for museum projects

## Learning Resources

- [Reaper user guide (official)](https://www.reaper.fm/userguide.php)
- [Reaper in theatre sound (Reaper blog)](https://www.reaper.fm/about.php)
- [Kenny Gioia Reaper tutorials (YouTube)](https://www.youtube.com/user/kennygioiatutorials)
- [SWS extensions (community tools)](https://www.sws-extension.org/)
