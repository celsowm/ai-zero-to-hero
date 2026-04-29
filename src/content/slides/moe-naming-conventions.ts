import { defineSlide } from './_factory';

export const moeNamingConventions = defineSlide({
  id: 'moe-naming-conventions',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'Decifrando Nomes: 8x7B, A3B e Além',
      body: `Ao navegar no Hugging Face, você encontrará nomes que parecem códigos. Vamos decifrá-los usando o que aprendemos sobre MoE:

### 1. O Formato "NxMB" (ex: Mixtral 8x7B)
Indica o número de especialistas e o tamanho "base" de cada um.
- **8x7B:** Significa 8 especialistas de aproximadamente 7 bilhões de parâmetros cada.
- **Importante:** O total não é exatamente $8 \times 7 = 56B$, pois as camadas de Atenção são compartilhadas entre todos os especialistas. No Mixtral, o total real é 46.7B.

### 2. O Formato "Total-Active" (ex: Qwen-35B-A3B ou LFM2-8B-A1B)
Este é o formato mais honesto e moderno, usado por empresas como Alibaba e Liquid AI.
- **8B:** O número total de parâmetros (o "conhecimento" do modelo).
- **A1B:** Significa **Active 1B**. Apenas 1 bilhão de parâmetros são ativados por token.

> **Por que isso importa?** O custo de memória (VRAM) depende do número **Total**, mas a velocidade de geração depende do número **Ativo (A)**. Modelos como os da **Liquid AI** usam isso para mostrar que, mesmo com arquiteturas não-Transformer, a esparsidade é a chave da eficiência.`,
    },
    'en-us': {
      title: 'Decoding Names: 8x7B, A3B and Beyond',
      body: `When browsing Hugging Face, you will find names that look like codes. Let's decode them using what we learned about MoE:

### 1. The "NxMB" Format (e.g., Mixtral 8x7B)
Indicates the number of experts and the "base" size of each.
- **8x7B:** Means 8 experts of approximately 7 billion parameters each.
- **Important:** The total is not exactly $8 \times 7 = 56B$, because Attention layers are shared among all experts. In Mixtral, the real total is 46.7B.

### 2. The "Total-Active" Format (e.g., Qwen-35B-A3B or LFM2-8B-A1B)
This is the most honest and modern format, used by companies like Alibaba and Liquid AI.
- **8B:** The total number of parameters (the model's "knowledge").
- **A1B:** Means **Active 1B**. Only 1 billion parameters are activated per token.

> **Why does this matter?** The memory cost (VRAM) depends on the **Total** number, but the generation speed depends on the **Active (A)** number. Models like those from **Liquid AI** use this to show that even with non-Transformer architectures, sparsity is the key to efficiency.`,
    },
  },
  visual: {
    id: 'quantization-comparator', // Reusing a comparator visual
    copy: {
      'pt-br': {
        title: 'Comparativo de Recursos',
        description: 'MoE permite alta capacidade com baixo custo de processamento.',
      },
      'en-us': {
        title: 'Resource Comparison',
        description: 'MoE allows high capacity with low processing cost.',
      },
    },
  },
});
