import { defineSlide } from './_factory';

export const sftIntro = defineSlide({
  id: 'sft-intro',
  type: 'two-column',
  options: {
    "columnRatios": [0.6, 0.4]
  },
  content: {
    'pt-br': {
      title: `A Evolução para SFT e ChatML`,
      body: `Até agora, construímos um modelo que prevê a próxima palavra (Text Completion). Mas como transformar isso em um assistente que responde perguntas?

A resposta é o **SFT (Supervised Fine-Tuning)**. Consiste em pegar um modelo pré-treinado e continuar treinando-o em exemplos estruturados de conversas.

Para isso, precisamos de um formato de dados consistente. O **ChatML** é um formato padrão para representar diálogos. Ele utiliza tokens especiais para separar papéis (sistema, usuário, assistente).

- **Text Completion (Base):** \`"Qual é a capital do Brasil? A capital do Brasil..."\`
- **ChatML (Formato de Diálogo):** com tokens separando cada papel da conversa

> O ChatML dá estrutura à conversa, e o SFT ensina o modelo a seguir essa estrutura.`,
    },
    'en-us': {
      title: `The Evolution to SFT and ChatML`,
      body: `So far, we've built a model that predicts the next word (Text Completion). But how do we turn that into an assistant that answers questions?

The answer is **SFT (Supervised Fine-Tuning)**. It consists of taking a pre-trained model and continuing to train it on structured conversation examples.

For this, we need a consistent data format. **ChatML** is a standard format for representing dialogues. It uses special tokens to separate roles (system, user, assistant).

- **Text Completion (Base):** \`"What is the capital of Brazil? The capital of Brazil..."\`
- **ChatML (Dialogue Format):** with tokens separating each role in the conversation

> ChatML gives structure to conversation, and SFT teaches the model to follow that structure.`,
    },
  },
  visual: {
    id: 'sft-intro',
    copy: {
      "pt-br": {
        "beforeLabel": "Antes: Text Completion",
        "arrowLabel": "SFT + ChatML",
        "afterLabel": "Depois: ChatML Structured",
        "exampleText": "Qual é a capital do Brasil? A capital",
        "specialSystem": "<|im_start|>system",
        "specialUser": "<|im_start|>user",
        "specialAssistant": "<|im_start|>assistant",
        "specialEos": "<|im_end|>",
        "systemRole": "sistema",
        "systemContent": "Você é um assistente útil.",
        "userRole": "usuário",
        "userContent": "Qual é a capital do Brasil?",
        "assistantRole": "assistente",
        "assistantContent": "A capital do Brasil é Brasília.",
        "structureNote": "Tokens especiais marcam início/fim de cada papel — modelo aprende a gerar dentro do formato"
      },
      "en-us": {
        "beforeLabel": "Before: Text Completion",
        "arrowLabel": "SFT + ChatML",
        "afterLabel": "After: ChatML Structured",
        "exampleText": "What is the capital of Brazil? The capital",
        "specialSystem": "<|im_start|>system",
        "specialUser": "<|im_start|>user",
        "specialAssistant": "<|im_start|>assistant",
        "specialEos": "<|im_end|>",
        "systemRole": "system",
        "systemContent": "You are a helpful assistant.",
        "userRole": "user",
        "userContent": "What is the capital of Brazil?",
        "assistantRole": "assistant",
        "assistantContent": "The capital of Brazil is Brasília.",
        "structureNote": "Special tokens mark start/end of each role — model learns to generate within the format"
      }
    },
  },
});
