---
title: Timecode (LTC / MTC)
subcategory: Protocols
skill_level: intermediate
we_use_this: false
related: [qlab, midi, osc, dante]
tags: [timecode, ltc, mtc, smpte, sync, show-control, audio, video]
---

Timecode is a method for precisely synchronising multiple systems to a shared clock — ensuring that audio, video, lighting, and show control all run in lockstep. In museum installations and live events, timecode is how a multi-system show stays perfectly in sync even across reboots and failures.

## LTC — Linear Timecode (SMPTE)

LTC (SMPTE/EBU timecode) is encoded as an audio signal: a stream of tone that any audio device can carry. A master device generates the timecode signal; all other devices listen and lock to it. Because it travels as audio, it can run over any cable that carries audio — through a PA system, on a spare audio track, or on a dedicated cable.

**Frame rates:** 24fps (film), 25fps (PAL/Europe), 29.97fps / 30fps (NTSC/US). For museum work 25fps is standard in the UK/Europe.

## MTC — MIDI Timecode

MTC carries the same timing information as LTC but over a MIDI connection. It is the standard way to sync a DAW (Ableton, Reaper, Logic) with QLab, video playback, or lighting console cues. MTC is transmitted by the master and received by all slaves over MIDI cables or MIDI over USB/network.

## How a Typical Show Uses Timecode

```
QLab (master) → LTC audio output → House PA system (spare channel)
                                  → All slave devices listen
Slaves: Watchout (video) / GrandMA (lighting) / Ableton (music)
```

## Use Cases

- Locking a video playback system to a live music performance so they never drift
- Running a fully automated daily gallery show where audio, video, and lighting all start from a single timecode trigger
- Syncing LED animation to a musical score with frame-accurate precision
- Multi-system installations where any individual device might restart but the show clock continues

## Learning Resources

- [SMPTE timecode explained (Wikipedia)](https://en.wikipedia.org/wiki/SMPTE_timecode)
- [Timecode in QLab](https://figure53.com/docs/qlab/v5/control/timecode/)
- [LTC and MTC explained (Sound on Sound)](https://www.soundonsound.com/techniques/smpte-midi-timecode)
