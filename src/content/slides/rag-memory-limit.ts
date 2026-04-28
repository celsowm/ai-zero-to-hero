import { defineSlide } from './_factory';

export const ragMemoryLimit = defineSlide({
  id: 'rag-memory-limit',
  type: 'two-column',
  options: {
    "columnRatios": [0.5, 0.5]
  },
  content: {
    'pt-br': {
      title: `Problema 1: Conhecimento Congelado`,
      body: `Todo modelo de linguagem é treinado em um **dataset com data de corte**. Depois do treino, seus pesos são **congelados** — ele não aprende nada novo.

### O que isso significa na prática

- GPT-2 foi treinado em dados até **2021**. Pergunte sobre a Copa de 2022 e ele **não sabe**.
- ChatGPT (GPT-4) tem cutoff em **2023**. Eventos de 2024 são invisíveis.
- O conhecimento do modelo é como uma **foto tirada no dia do treino** — estática, desatualizável.

### O que acontece quando perguntamos algo novo?

O modelo **não diz "não sei"**. Ele gera o texto mais provável dado o treino. Se a resposta certa não estava nos dados de treino, ele **inventa** — e faz isso com confiança.

\`\`\`python
snippet:rag/rag-memory-limit
\`\`\`

> Sem acesso a informação externa, um LLM é como um aluno que fez a prova com o livro fechado — mas o livro é de 3 anos atrás.`,
    },
    'en-us': {
      title: `Problem 1: Frozen Knowledge`,
      body: `Every language model is trained on a **dataset with a cutoff date**. After training, its weights are **frozen** — it learns nothing new.

### What this means in practice

- GPT-2 was trained on data up to **2021**. Ask about the 2022 World Cup and it **doesn't know**.
- ChatGPT (GPT-4) has a cutoff in **2023**. 2024 events are invisible.
- The model's knowledge is like a **photo taken on training day** — static, outdated.

### What happens when we ask about something new?

The model **doesn't say "I don't know"**. It generates the most likely text given its training. If the correct answer wasn't in the training data, it **invents** — and does so with confidence.

\`\`\`python
snippet:rag/rag-memory-limit
\`\`\`

> Without access to external information, an LLM is like a student taking a closed-book exam — but the textbook is 3 years old.`,
    },
  },
  visual: {
    id: 'rag-memory-limit-visual',
    copy: {
      "pt-br": {
        "title": "Conhecimento Congelado no Tempo",
        "trainingDateLabel": "Data de Corte do Treino",
        "currentDateLabel": "Hoje",
        "knowledgeGapLabel": "Gap de Conhecimento",
        "beforeLabel": "Antes do cutoff",
        "afterLabel": "Depois do cutoff",
        "unknownLabel": "O modelo não sabe nada sobre este período",
        "frozenLabel": "Pesos congelados"
      },
      "en-us": {
        "title": "Knowledge Frozen in Time",
        "trainingDateLabel": "Training Cutoff Date",
        "currentDateLabel": "Today",
        "knowledgeGapLabel": "Knowledge Gap",
        "beforeLabel": "Before cutoff",
        "afterLabel": "After cutoff",
        "unknownLabel": "The model knows nothing about this period",
        "frozenLabel": "Weights frozen"
      }
    },
  },
});
