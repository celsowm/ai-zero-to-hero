# region: transformersjs-intro
import { pipeline } from '@xenova/transformers';

// Transformers.js: HuggingFace models running 100% in the browser
// No Python server, no external API, no cloud GPU costs

async function demo() {
  // Load a sentiment analysis model
  const classifier = await pipeline('sentiment-analysis');
  const result = await classifier('I love using Transformers.js!');
  console.log(result);
  // [{ label: 'POSITIVE', score: 0.9998 }]

  // Model runs via ONNX Runtime Web — in-browser inference
  // First run: model download (~40MB). After: cached.
}

// Supported models: classification, embeddings, QA, text generation,
// ASR (speech-to-text), TTS (text-to-speech), and more.
# endregion
