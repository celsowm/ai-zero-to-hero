import { defineSlide } from './_factory';

export const hfV5Ecosystem = defineSlide({
  id: 'hf-v5-ecosystem',
  type: 'two-column',
  options: {
    columnRatios: [0.55, 0.45],
  },
  content: {
    'pt-br': {
      title: `O ecossistema HuggingFace v5`,
      body: `Após o SFT, você já sabe **treinar** um modelo. Agora vamos dominar o ecossistema completo — do carregamento ao deployment.

1. **\`transformers\`:** a biblioteca central. AutoClasses, pipelines, modelos para qualquer tarefa (texto, visão, áudio, multimodal).

2. **\`datasets\`:** carregamento de datasets do Hub, streaming, map/batch, splits. Sem precisar baixar tudo para a memória.

3. **\`peft\`:** fine-tuning eficiente. LoRA, adapters, prompt tuning. Treinar um 7B em uma GPU consumer.

4. **\`accelerate\`:** treinamento distribuído. DDP, FSDP, multi-GPU sem reescrever o loop de treino.

5. **\`evaluate\`:** métricas padronizadas. Perplexity, BLEU, ROUGE, exact match — uma API para todos.

6. **\`huggingface_hub\`:** push/pull de modelos, model cards, widgets de inference, versionamento.

> O valor da Hugging Face não é um modelo — é o ecossistema inteiro que conversa entre si.

---

\`\`\`python
snippet:transformers/hf-v5-ecosystem
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importamos o módulo central: pipelines, AutoModel e AutoTokenizer.',
        },
        {
          lineRange: [4, 5],
          content: '`datasets` para carregar e manipular dados de treino/avaliação.',
        },
        {
          lineRange: [8, 9],
          content: '`evaluate` oferece métricas padronizadas — sem reimplementar BLEU ou perplexity.',
        },
        {
          lineRange: [12, 13],
          content: '`accelerate` abstrai DDP, FSDP e multi-GPU — o mesmo código roda em 1 ou N GPUs.',
        },
        {
          lineRange: [16, 17],
          content: '`peft` permite fine-tuning com fração dos parâmetros (LoRA, adapters).',
        },
        {
          lineRange: [20, 21],
          content: '`huggingface_hub` para push/pull de modelos e automação do Hub.',
        },
      ],
    },
    'en-us': {
      title: `The HuggingFace v5 ecosystem`,
      body: `After SFT, you already know how to **train** a model. Now let's master the entire ecosystem — from loading to deployment.

1. **\`transformers\`:** the central library. AutoClasses, pipelines, models for any task (text, vision, audio, multimodal).

2. **\`datasets\`:** loading datasets from the Hub, streaming, map/batch, splits. No need to download everything into memory.

3. **\`peft\`:** efficient fine-tuning. LoRA, adapters, prompt tuning. Train a 7B on a consumer GPU.

4. **\`accelerate\`:** distributed training. DDP, FSDP, multi-GPU without rewriting the training loop.

5. **\`evaluate\`:** standardized metrics. Perplexity, BLEU, ROUGE, exact match — one API for all.

6. **\`huggingface_hub\`:** model push/pull, model cards, inference widgets, versioning.

> Hugging Face's value isn't a single model — it's the entire ecosystem that talks to each other.

---

\`\`\`python
snippet:transformers/hf-v5-ecosystem
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'We import the central module: pipelines, AutoModel and AutoTokenizer.',
        },
        {
          lineRange: [4, 5],
          content: '`datasets` for loading and manipulating train/eval data.',
        },
        {
          lineRange: [8, 9],
          content: '`evaluate` provides standardized metrics — no need to reimplement BLEU or perplexity.',
        },
        {
          lineRange: [12, 13],
          content: '`accelerate` abstracts DDP, FSDP and multi-GPU — the same code runs on 1 or N GPUs.',
        },
        {
          lineRange: [16, 17],
          content: '`peft` enables fine-tuning with a fraction of parameters (LoRA, adapters).',
        },
        {
          lineRange: [20, 21],
          content: '`huggingface_hub` for model push/pull and Hub automation.',
        },
      ],
    },
  },
});
