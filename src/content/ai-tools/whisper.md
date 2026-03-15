---
title: Whisper
subcategory: Voice & Audio
skill_level: intermediate
we_use_this: false
related: [elevenlabs, claude, chatgpt, touchdesigner]
tags: [whisper, speech-to-text, transcription, voice, ai, openai, interactive, accessibility]
---

Whisper is OpenAI's open-source speech recognition model — it converts spoken audio to text with high accuracy across 99 languages. Unlike cloud-only speech APIs, Whisper runs entirely locally, making it suitable for interactive installations where visitor speech should not leave the building, and for offline environments where internet connectivity cannot be guaranteed.

## Why Whisper Matters for Installations

Voice interaction in museum installations has historically been unreliable — cloud speech APIs require good internet, have latency, and send visitor audio to external servers. Whisper runs on a local GPU or CPU, transcribes in near-real-time, and works in noise-tolerant ways that general speech APIs do not.

## Models

Whisper comes in several sizes trading accuracy for speed:

| Model | Size | Speed | Use case |
|---|---|---|---|
| tiny | 39M | Fastest | Low-power devices, real-time rough transcription |
| base | 74M | Fast | Good balance for interactive use |
| small | 244M | Moderate | Better accuracy, still real-time on modern hardware |
| large-v3 | 1.5B | Slow | Highest accuracy, batch transcription |

For interactive real-time use, `base` or `small` on a modern GPU gives good results.

## Integration

- **Python:** `openai-whisper` library, straightforward API
- **faster-whisper:** Optimised C++ implementation, ~4x faster, recommended for real-time use
- **TouchDesigner:** Community Python scripts pipe microphone audio to Whisper and return transcription as a string channel
- **Combine with LLMs:** Whisper -> text -> Claude/ChatGPT -> response -> ElevenLabs TTS = a full conversational installation pipeline

## Use Cases

- Voice-activated exhibit navigation: visitor speaks a question, installation responds
- Multilingual transcription for accessibility — real-time captions in any language
- Audio documentation: transcribing recorded interviews and talks for museum archives
- Interactive AI characters that understand natural speech

## Learning Resources

- [Whisper GitHub repository](https://github.com/openai/whisper)
- [faster-whisper (optimised implementation)](https://github.com/SYSTRAN/faster-whisper)
