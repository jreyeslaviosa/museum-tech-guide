---
title: Ableton Live
subcategory: Audio Software
skill_level: intermediate
we_use_this: false
related: [qlab, midi, timecode, dante, reaper, bitwig]
tags: [audio, daw, ableton, live, music, performance, midi, max-for-live, show-control]
---

Ableton Live is a DAW (Digital Audio Workstation) designed around live performance and real-time manipulation. Unlike traditional linear DAWs, Ableton uses a session view with clips that can be triggered in any order — making it particularly suited to interactive installations where audio needs to respond to visitor behaviour rather than play back on a fixed timeline.

## Session View vs Arrangement View

**Session View:** A grid of audio/MIDI clips that can be triggered in any order. Each row is a "scene" that triggers all clips in that row simultaneously. Ideal for reactive or non-linear audio.

**Arrangement View:** A traditional horizontal timeline. Used for fully linear shows synced to timecode (LTC/MTC).

## Max for Live

Max for Live (M4L) is a visual programming environment (based on Max/MSP) built directly into Ableton. It allows custom devices and instruments to be built inside Ableton — enabling OSC receive, sensor input, custom MIDI processors, and generative audio logic without leaving the DAW.

## Show Control Integration

- Receives MIDI timecode (MTC) to sync to QLab or video playback
- Sends/receives MIDI, OSC, and MIDI clock
- Max for Live patches can receive network data (UDP, OSC) directly
- Dante Virtual Soundcard routes audio to installed sound systems over the network

## Use Cases

- Generative or reactive soundscapes that respond to visitor presence
- Live audio performance in permanent installations
- Music synchronisation to video and lighting via timecode
- Interactive audio where visitor triggers change what plays

## Learning Resources

- [Ableton Learn](https://www.ableton.com/en/learn-live/)
- [Max for Live documentation](https://docs.cycling74.com/max8)
- [Ableton in show control workflows (Ableton blog)](https://www.ableton.com/en/blog/)
