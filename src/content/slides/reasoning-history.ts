import { defineSlide } from './_factory';

export const reasoningHistory = defineSlide({
  id: 'reasoning-history',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Surgimento do Reasoning',
      body: `A jornada do reasoning começou com **prompt engineering** e evoluiu para **modelos treinados** com long CoT.

### Timeline

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
      title: 'History of Reasoning',
      body: `The reasoning journey began with **prompt engineering** and evolved into **models trained** with long CoT.

### Timeline

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
  visual: {
    id: 'reasoning-history-visual',
    copy: {
      'pt-br': {
        title: 'Evolução do Reasoning',
        yearLabel: 'Ano',
        eventLabel: 'Evento',
        impactLabel: 'Impacto',
        cotEvent: 'Chain of Thought (Wei et al.)',
        totEvent: 'Tree of Thoughts (Yao et al.)',
        orcaEvent: 'Orca (Microsoft Research)',
        o1Event: 'OpenAI o1 (thinking nativo)',
        r1Event: 'DeepSeek-R1 (open-source)',
        o3Event: 'o3 / Claude Thinking (padrão)',
      },
      'en-us': {
        title: 'Reasoning Evolution',
        yearLabel: 'Year',
        eventLabel: 'Event',
        impactLabel: 'Impact',
        cotEvent: 'Chain of Thought (Wei et al.)',
        totEvent: 'Tree of Thoughts (Yao et al.)',
        orcaEvent: 'Orca (Microsoft Research)',
        o1Event: 'OpenAI o1 (native thinking)',
        r1Event: 'DeepSeek-R1 (open-source)',
        o3Event: 'o3 / Claude Thinking (standard)',
      },
    },
  },
});
