import { defineSlide } from './_factory';

export const transformersjsIntro = defineSlide({
  id: 'transformersjs-intro',
  type: 'two-column',
  options: {
    "columnRatios": [0.5, 0.5]
  },
  content: {
    'pt-br': {
      title: `Transformers.js: IA no Browser`,
      body: `Até agora, usamos modelos Python rodando em servidores com GPUs caras. Mas e se pudéssemos rodar **modelos HuggingFace diretamente no browser** do usuário?

### O que é Transformers.js?

É uma porta da biblioteca **transformers** para JavaScript, convertendo modelos para **ONNX** e rodando inferência via **ONNX Runtime Web**.

### Por que isso muda tudo?

- **Zero servidor**: o modelo roda na CPU/GPU do usuário
- **Privacidade**: os dados nunca saem do browser
- **Custo zero**: sem GPU cloud, sem API calls pagas
- **Offline**: depois do download inicial, funciona sem internet

### Modelos suportados

- Classificação de texto, embeddings, QA
- Geração de texto (Llama, GPT-2, Phi)
- Speech-to-text (Whisper), Text-to-speech
- Segmentação de imagem, detecção de objetos

\`\`\`javascript
snippet:transformersjs/transformersjs-intro
\`\`\`

> Transformers.js democratiza a IA: qualquer site pode ter modelos state-of-the-art sem backend.`,
    },
    'en-us': {
      title: `Transformers.js: AI in the Browser`,
      body: `So far, we've used Python models running on servers with expensive GPUs. But what if we could run **HuggingFace models directly in the user's browser**?

### What is Transformers.js?

It's a port of the **transformers** library to JavaScript, converting models to **ONNX** and running inference via **ONNX Runtime Web**.

### Why does this change everything?

- **Zero server**: the model runs on the user's CPU/GPU
- **Privacy**: data never leaves the browser
- **Zero cost**: no cloud GPU, no paid API calls
- **Offline**: after initial download, works without internet

### Supported models

- Text classification, embeddings, QA
- Text generation (Llama, GPT-2, Phi)
- Speech-to-text (Whisper), Text-to-speech
- Image segmentation, object detection

\`\`\`javascript
snippet:transformersjs/transformersjs-intro
\`\`\`

> Transformers.js democratizes AI: any website can have state-of-the-art models without a backend.`,
    },
  },
  visual: {
    id: 'transformersjs-intro-visual',
    copy: {
      "pt-br": {
        "title": "Python Server vs Browser",
        "serverLabel": "Modo Tradicional",
        "browserLabel": "Transformers.js",
        "userLabel": "Usuário",
        "serverBox": "Servidor Python + GPU",
        "apiLabel": "API Request → Resposta",
        "browserBox": "Browser + ONNX Runtime",
        "localLabel": "Tudo Local",
        "costLabel": "Custo",
        "privacyLabel": "Privacidade"
      },
      "en-us": {
        "title": "Python Server vs Browser",
        "serverLabel": "Traditional Mode",
        "browserLabel": "Transformers.js",
        "userLabel": "User",
        "serverBox": "Python Server + GPU",
        "apiLabel": "API Request → Response",
        "browserBox": "Browser + ONNX Runtime",
        "localLabel": "All Local",
        "costLabel": "Cost",
        "privacyLabel": "Privacy"
      }
    },
  },
});
