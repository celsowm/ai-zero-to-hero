import { defineSlide } from './_factory';

export const gpt2Teaser = defineSlide({
  id: 'gpt2-teaser',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `GPT-2: o avô dos modelos modernos`,
      body: `### O que é GPT-2?

**GPT-2** é o segundo modelo da família **GPT** (**G**enerative **P**re-**T**rained Transformer), lançada pela **OpenAI** em fevereiro de 2019.

- **Quem criou:** OpenAI (mesmo laboratório do ChatGPT, GPT-4 e GPT-5).
- **Tamanho:** 1,5 bilhão de parâmetros na versão maior (4 versões: 124M, 355M, 774M, 1.5B).
- **Tarefa:** prever o próximo token — a mesma do bigram e do MLP dos slides anteriores, só que em escala de web inteira.
- **Dados:** 8 milhões de páginas da internet (WebText), ~40 GB de texto filtrado.
- **Contexto:** 1024 tokens de janela.

### Por que estudar GPT-2 em 2026?

Hoje usamos GPT-5 com trilhões de parâmetros e contexto de milhões de tokens. Mas a **arquitetura base é a mesma** do GPT-2:

1. **Decoder-only:** só o decoder do Transformer original. Perfeito para gerar texto, onde você só precisa do passado.

2. **Pré-treinamento auto-regressivo:** prever o próximo token repetidamente. É a mesma ideia dos slides de bigram — só que com atenção em vez de contagem.

3. **O salto que mudou tudo:** provou que atenção pura, sem RNN/LSTM, consegue gerar texto coerente. GPT-3 (2020), GPT-4 (2023) e GPT-5 (2026) são a mesma receita — só que maiores, com mais dados e mais engenharia.

> Entender o GPT-2 é entender o DNA de toda a família. O que mudou de 2019 para cá foi escala, engenharia e truques de treino — não a arquitetura fundamental.`,
    },
    'en-us': {
      title: `GPT-2: the grandfather of modern models`,
      body: `### What is GPT-2?

**GPT-2** is the second model in the **GPT** (**G**enerative **P**re-**T**rained Transformer) family, released by **OpenAI** in February 2019.

- **Who created it:** OpenAI (the same lab behind ChatGPT, GPT-4, and GPT-5).
- **Size:** 1.5 billion parameters in the largest version (4 versions: 124M, 355M, 774M, 1.5B).
- **Task:** predict the next token — the same task as the bigram and MLP from previous slides, just at web scale.
- **Data:** 8 million web pages (WebText), ~40 GB of filtered text.
- **Context:** 1024 tokens window.

### Why study GPT-2 in 2026?

Today we use GPT-5 with trillions of parameters and million-token context. But the **base architecture is the same** as GPT-2:

1. **Decoder-only:** only the decoder from the original Transformer. Perfect for generating text where you only need the past.

2. **Autoregressive pre-training:** predict the next token repeatedly. Same idea as the bigram slides — just with attention instead of counting.

3. **The leap that changed everything:** it proved that pure attention, without RNN/LSTM, can generate coherent text. GPT-3 (2020), GPT-4 (2023), and GPT-5 (2026) are the same recipe — just bigger, with more data and more engineering.

> Understanding GPT-2 means understanding the DNA of the entire family. What changed from 2019 to now was scale, engineering, and training tricks — not the fundamental architecture.`,
    },
  },
  visual: {
    id: 'gpt2-blackbox-diagram',
    copy: {
      "pt-br": {
        "inputLabel": "Janela de Contexto",
        "modelLabel": "GPT-2",
        "outputLabel": "Próximo Token"
      },
      "en-us": {
        "inputLabel": "Context Window",
        "modelLabel": "GPT-2",
        "outputLabel": "Next Token"
      }
    },
  },
});
