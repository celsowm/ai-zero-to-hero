import { defineSlide } from './_factory';

export const contextWindow = defineSlide({
  id: 'context-window',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `O limite de memória (Janela de Contexto)`,
      body: `O Bigrama olha apenas 1 token para trás. Para prever bem, precisamos olhar para toda a frase ou parágrafo. Entra a **Janela de Contexto** (Context Window).

1. **A esteira rolante:** a janela é como uma esteira que cabe um número fixo de tokens (ex: 1024, 4096, 128k). O modelo só enxerga o que está dentro dela.

2. **Passado esquecido:** se uma informação importante ficou fora da janela de contexto, o modelo a esquece completamente. É a sua memória de curto prazo.

3. **O custo do tamanho:** aumentar a janela deixa o modelo muito mais inteligente (ele lembra de mais coisas), mas exige absurdamente mais poder computacional.

> A janela de contexto é a memória de curto prazo do modelo.`,
    },
    'en-us': {
      title: `The memory limit (Context Window)`,
      body: `The Bigram looks only 1 token back. To predict well, we need to look at the whole sentence or paragraph. Enter the **Context Window**.

1. **The conveyor belt:** the window is like a belt that holds a fixed number of tokens (e.g., 1024, 4096, 128k). The model only sees what is inside it.

2. **Forgotten past:** if important information falls out of the context window, the model forgets it completely. It is its short-term memory.

3. **The cost of size:** increasing the window makes the model much smarter (it remembers more), but it requires exponentially more computing power.

> The context window is the model's short-term memory.`,
    },
  },
  visual: {
    id: 'context-window-slider',
    copy: {
      "pt-br": {
        "windowLabel": "Janela de Contexto (Tokens)"
      },
      "en-us": {
        "windowLabel": "Context Window (Tokens)"
      }
    },
  },
});
