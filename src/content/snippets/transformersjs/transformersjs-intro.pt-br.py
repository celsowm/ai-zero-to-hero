# region: transformersjs-intro
import { pipeline } from '@xenova/transformers';

// Transformers.js: modelos HuggingFace rodando 100% no browser
// Sem servidor Python, sem API externa, sem custos de GPU cloud

async function demo() {
  // Carrega um modelo de classificação de sentimento
  const classifier = await pipeline('sentiment-analysis');
  const result = await classifier('I love using Transformers.js!');
  console.log(result);
  // [{ label: 'POSITIVE', score: 0.9998 }]

  // O modelo roda via ONNX Runtime Web — inferência no browser
  // Primeira execução: download do modelo (~40MB). Depois: cache.
}

// Modelos suportados: classificação, embeddings, QA, geração de texto,
// ASR (speech-to-text), TTS (text-to-speech), e muito mais.
// endregion
