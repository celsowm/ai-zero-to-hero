import { defineSlide } from './_factory';

export const reasoningWhy = defineSlide({
  id: 'reasoning-why',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Por Que Reasoning?',
      body: `Os LLMs atuais são excelentes em **respostas diretas**, mas falham quando a tarefa exige **planejamento multi-step**, **verificação** ou **correção de erros**.

### O problema fundamental

Um modelo autoregressivo gera **token por token** sem um processo interno de "pensar antes de falar". Ele não para para verificar se a resposta faz sentido.

### Onde LLMs tradicionais falham

- **Matemática complex**: problemas com 5+ passos de raciocínio
- **Verificação de código**: detectar bugs sutis em funções longas
- **Planejamento**: tarefas que precisam de múltiplas decisões encadeadas
- **Auto-correção**: perceber que errou e corrigir

### A solução: Reasoning Models

Modelos como **o1/o3 (OpenAI)**, **DeepSeek-R1** e **Claude Thinking** foram treinados para **pensar antes de responder** — gerando tokens de raciocínio que guiam a resposta final para um caminho mais lógico.

> Reasoning não é "ser mais inteligente" — é **ter tempo de computação** para validar antes de responder.`,
    },
    'en-us': {
      title: 'Why Reasoning?',
      body: `Current LLMs are excellent at **direct answers**, but fail when the task requires **multi-step planning**, **verification**, or **error correction**.

### The fundamental problem

An autoregressive model generates **token by token** without an internal process of "thinking before speaking." It doesn't stop to verify if the answer makes sense.

### Where traditional LLMs fail

- **Complex math**: problems requiring 5+ reasoning steps
- **Code verification**: detecting subtle bugs in long functions
- **Planning**: tasks needing multiple chained decisions
- **Self-correction**: realizing a mistake and fixing it

### The solution: Reasoning Models

Models like **o1/o3 (OpenAI)**, **DeepSeek-R1**, and **Claude Thinking** were trained to **think before answering** — generating reasoning tokens that guide the final answer down a more logical path.

> Reasoning isn't "being smarter" — it's **having compute time** to validate before answering.`,
    },
  },
  visual: {
    id: 'reasoning-why-visual',
    copy: {
      'pt-br': {
        title: 'LLM Normal vs LLM com Reasoning',
        normalLabel: 'LLM Normal',
        reasoningLabel: 'LLM + Reasoning',
        inputLabel: 'Input',
        directAnswer: 'Resposta direta (pode errar)',
        thinkingLabel: 'Pensamento interno',
        verifiedAnswer: 'Resposta verificada (mais precisa)',
      },
      'en-us': {
        title: 'Normal LLM vs LLM with Reasoning',
        normalLabel: 'Normal LLM',
        reasoningLabel: 'LLM + Reasoning',
        inputLabel: 'Input',
        directAnswer: 'Direct answer (may be wrong)',
        thinkingLabel: 'Internal thinking',
        verifiedAnswer: 'Verified answer (more accurate)',
      },
    },
  },
});
