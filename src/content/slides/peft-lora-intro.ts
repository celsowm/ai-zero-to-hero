import { defineSlide } from './_factory';

export const peftLoraIntro = defineSlide({
  id: 'peft-lora-intro',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `PEFT e LoRA: fine-tuning eficiente`,
      body: `Fine-tuning completo de um modelo grande exige GPUs enormes. **PEFT** (Parameter-Efficient Fine-Tuning) muda isso.

1. **O problema:** fine-tuning de um 7B atualiza 7 bilhões de parâmetros. Precisa de ~14GB só para os gradients (FP32).

2. **LoRA (Low-Rank Adaptation):** em vez de atualizar a matriz de pesos completa (W), adiciona duas matrizes pequenas (A×B) que se multiplicam: ΔW = A × B.

3. **Por que funciona:** a atualização dos pesos durante fine-tuning vive em um subespaço de baixa dimensão (low-rank). Rank 8-16 é suficiente.

4. **O original fica congelado:** W₀ não muda. Só A e B são treináveis. O adapter é tiny — ~0.06% dos parâmetros totais.

5. **Inference:** W_final = W₀ + ΔW. O modelo comporta-se como se fosse fully fine-tuned, mas com fração da memória.

> LoRA é como trocar um motor inteiro por uma peça customizada — mesma performance, muito menos custo.

---

\`\`\`python
snippet:transformers/peft-lora-example
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Importamos `transformers` para o modelo e `peft` para LoRA.',
        },
        {
          lineRange: [5, 5],
          content: 'Carregamos o modelo base — os pesos originais ficam congelados.',
        },
        {
          lineRange: [8, 14],
          content: '`LoraConfig`: rank=8, alpha=32, target_modules define quais camadas recebem adapters.',
        },
        {
          lineRange: [17, 18],
          content: '`get_peft_model()` aplica LoRA e mostra % de parâmetros treináveis.',
        },
        {
          lineRange: [22, 36],
          content: 'Treinamento padrão com Trainer — o LoRA é transparente para o loop.',
        },
        {
          lineRange: [38, 39],
          content: 'Iniciamos o treino e salvamos apenas os adapters LoRA (KB/MB), não o modelo inteiro.',
        },
      ],
    },
    'en-us': {
      title: `PEFT and LoRA: efficient fine-tuning`,
      body: `Full fine-tuning of a large model requires massive GPUs. **PEFT** (Parameter-Efficient Fine-Tuning) changes that.

1. **The problem:** fine-tuning a 7B updates 7 billion parameters. Needs ~14GB just for gradients (FP32).

2. **LoRA (Low-Rank Adaptation):** instead of updating the full weight matrix (W), adds two small matrices (A×B) that multiply: ΔW = A × B.

3. **Why it works:** weight updates during fine-tuning live in a low-dimensional subspace (low-rank). Rank 8-16 is sufficient.

4. **The original stays frozen:** W₀ doesn't change. Only A and B are trainable. The adapter is tiny — ~0.06% of total parameters.

5. **Inference:** W_final = W₀ + ΔW. The model behaves as if fully fine-tuned, but with a fraction of the memory.

> LoRA is like swapping an entire engine for a custom part — same performance, much less cost.

---

\`\`\`python
snippet:transformers/peft-lora-example
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'We import `transformers` for the model and `peft` for LoRA.',
        },
        {
          lineRange: [5, 5],
          content: 'We load the base model — original weights stay frozen.',
        },
        {
          lineRange: [8, 14],
          content: '`LoraConfig`: rank=8, alpha=32, target_modules defines which layers receive adapters.',
        },
        {
          lineRange: [17, 18],
          content: '`get_peft_model()` applies LoRA and shows the % of trainable parameters.',
        },
        {
          lineRange: [22, 36],
          content: 'Standard training with Trainer — LoRA is transparent to the training loop.',
        },
        {
          lineRange: [38, 39],
          content: 'Start training and save only LoRA adapters (KB/MB), not the full model.',
        },
      ],
    },
  },
  visual: {
    id: 'lora-diagram',
    copy: {
      'pt-br': {
        title: 'LoRA: Decomposição Low-Rank',
        fullRankLabel: 'Full-Rank (W)',
        lowRankLabel: 'Low-Rank (A×B)',
        matrixALabel: 'Matriz A',
        matrixBLabel: 'Matriz B',
        originalFrozen: 'Original congelado',
        trainableParams: 'Parâmetros treináveis',
        savedMemory: 'Memória economizada',
        rankLabel: 'Rank',
      },
      'en-us': {
        title: 'LoRA: Low-Rank Decomposition',
        fullRankLabel: 'Full-Rank (W)',
        lowRankLabel: 'Low-Rank (A×B)',
        matrixALabel: 'Matrix A',
        matrixBLabel: 'Matrix B',
        originalFrozen: 'Original frozen',
        trainableParams: 'Trainable params',
        savedMemory: 'Memory saved',
        rankLabel: 'Rank',
      },
    },
  },
});
