import { defineSlide } from './_factory';

export const moeIntro = defineSlide({
  id: 'moe-intro',
  type: 'two-column',
  options: {
    columnRatios: [0.6, 0.4],
  },
  content: {
    'pt-br': {
      title: 'Mixture of Experts (MoE): O Segredo da Escala',
      body: `Como criar um modelo com 1.8 trilhão de parâmetros (como o GPT-4) sem que ele se torne impossivelmente lento? A resposta é a **Esparsidade**.

1. **Abordagem Densa (Padrão):** Cada token passa por *todos* os neurônios do modelo. Se o modelo cresce, o custo de processamento cresce junto.
2. **Abordagem Esparsa (MoE):** Substituímos a camada MLP única por uma coleção de "especialistas". Cada token ativa apenas uma fração deles.
3. **Parâmetros vs. FLOPs:** Você pode ter 8x mais parâmetros, mas usar o mesmo poder computacional (FLOPs) de um modelo muito menor.

> "Aumentar o número de parâmetros sem aumentar o custo computacional." — Esse é o mantra do MoE.

---

### Por que agora?
Modelos como **Mixtral 8x7B** e **DeepSeek-V3** provaram que o MoE não é apenas para gigantes, mas a melhor forma de obter performance de "estado da arte" com eficiência energética.`,
    },
    'en-us': {
      title: 'Mixture of Experts (MoE): The Secret to Scaling',
      body: `How do you create a model with 1.8 trillion parameters (like GPT-4) without it becoming impossibly slow? The answer is **Sparsity**.

1. **Dense Approach (Standard):** Every token passes through *all* the model's neurons. If the model grows, the processing cost grows with it.
2. **Sparse Approach (MoE):** We replace the single MLP layer with a collection of "experts". Each token activates only a fraction of them.
3. **Parameters vs. FLOPs:** You can have 8x more parameters but use the same computational power (FLOPs) as a much smaller model.

> "Increasing parameters without increasing computational cost." — This is the MoE mantra.

---

### Why now?
Models like **Mixtral 8x7B** and **DeepSeek-V3** proved that MoE is not just for giants, but the best way to achieve state-of-the-art performance with energy efficiency.`,
    },
  },
  visual: {
    id: 'transformer-block-diagram',
    copy: {
      'pt-br': {
        title: 'Estrutura MoE',
        description: 'A camada MLP é substituída por um Roteador e N Especialistas.',
      },
      'en-us': {
        title: 'MoE Structure',
        description: 'The MLP layer is replaced by a Router and N Experts.',
      },
    },
  },
});
