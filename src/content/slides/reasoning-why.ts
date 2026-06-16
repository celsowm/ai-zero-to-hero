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
      rightBody: `### Timeline

| Ano | Marco | Significado |
|-----|-------|-------------|
| 2022 | **Chain of Thought** (Wei et al.) | "Let's think step by step" melhora ~15% em GSM8K |
| 2023 | **Tree of Thoughts** (Yao et al.) | Múltiplos caminhos de raciocínio com backtracking |
| 2023 | **Orca/Paper** (Microsoft) | Learning from traces with explanation fine-tuning |
| 2024 | **o1 da OpenAI** | Primeiro modelo comercial com "thinking" nativo |
| 2024 | **DeepSeek-R1** | Modelo open-source com long CoT e RL |
| 2025 | **o3 / Claude Thinking** | Reasoning como padrão na indústria |

### De prompt para treinamento

CoT era **apenas um prompt**. Reasoning models são **fine-tuned** com milhares de exemplos de raciocínio longo — o modelo aprendeu a **pensar de verdade**, não apenas seguir um template.

> A evolução foi: prompt trick → técnica → arquitetura de treino → modelo nativo.`,
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
      rightBody: `### Timeline

| Year | Milestone | Significance |
|------|-----------|-------------|
| 2022 | **Chain of Thought** (Wei et al.) | "Let's think step by step" improves ~15% on GSM8K |
| 2023 | **Tree of Thoughts** (Yao et al.) | Multiple reasoning paths with backtracking |
| 2023 | **Orca/Paper** (Microsoft) | Learning from traces with explanation fine-tuning |
| 2024 | **o1 from OpenAI** | First commercial model with native "thinking" |
| 2024 | **DeepSeek-R1** | Open-source model with long CoT and RL |
| 2025 | **o3 / Claude Thinking** | Reasoning as industry standard |

### From prompt to training

CoT was **just a prompt**. Reasoning models are **fine-tuned** with thousands of long reasoning examples — the model learned to **actually think**, not just follow a template.

> The evolution was: prompt trick → technique → training architecture → native model.`,
    },
  },
});
