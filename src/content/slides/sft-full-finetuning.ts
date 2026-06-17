import { defineSlide } from './_factory';

export const sftFullFinetuning = defineSlide({
  id: 'sft-full-finetuning',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'Full fine-tuning primeiro',
      body: [
        'Full fine-tuning é o SFT direto: todos os pesos treináveis do modelo recebem gradiente e podem mudar.',
        '',
        'É a continuação natural do que vimos no Gutenberg/PyTorch. Lá treinamos continuação de texto; aqui treinamos respostas esperadas em conversas. A loss ainda vem de prever o próximo token correto.',
        '',
        '### O que esse smoke ensina',
        '',
        '- `Qwen/Qwen3.5-0.8B` expõe `752.393.024` parâmetros treináveis',
        '- O subset de 32 exemplos é só para teste rápido de aula',
        '- `train_test_split` cria uma validação pequena para observar a loss',
        '- O checkpoint salvo é um modelo completo, não um adapter',
        '- No teste real com train/eval, 5 steps BF16 deram loss média `1.984`',
      ].join('\n'),
    },
    'en-us': {
      title: 'Full fine-tuning first',
      body: [
        'Full fine-tuning is direct SFT: every trainable model weight receives gradients and can change.',
        '',
        'It is the natural continuation of the Gutenberg/PyTorch block. There we trained text continuation; here we train expected answers in conversations. The loss still comes from predicting the correct next token.',
        '',
        '### What this smoke teaches',
        '',
        '- `Qwen/Qwen3.5-0.8B` exposes `752,393,024` trainable parameters',
        '- The 32-example subset is only a quick class smoke test',
        '- `train_test_split` creates a small validation set to watch loss',
        '- The saved checkpoint is a full model, not an adapter',
        '- In the real train/eval test, 5 BF16 steps produced average loss `1.984`',
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Ambiente' }, { label: 'Full SFT' }],
        codePanels: [
          {
            title: 'Checar versões e GPU',
            description: 'Confirma TRL/Transformers/PEFT atualizados antes de treinar.',
            source: { snippetId: 'sft_trl/environment-check', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 3], content: 'Importamos metadados dos pacotes e PyTorch.' },
              { lineRange: [5, 8], content: 'Listamos as versões para evitar rodar com uma API antiga.' },
              { lineRange: [10, 13], content: 'Checamos CUDA, nome da GPU e VRAM disponível.' },
            ],
          },
          {
            title: 'Treino full curto com TRL',
            description: 'Executa SFT sem PEFT: todos os pesos do Qwen participam do update.',
            source: { snippetId: 'sft_trl/full-finetuning-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 7], content: 'Importamos sistema, PyTorch, dataset, Transformers e TRL.' },
              { lineRange: [9, 13], content: 'Fixamos modelo, dataset e saída. `SFT_OUTPUT_ROOT` permite usar outro disco; o padrão é `runs/`.' },
              { lineRange: [15, 21], content: 'Carregamos o dataset, embaralhamos, cortamos um subset didático e criamos split train/eval.' },
              { lineRange: [23, 33], content: 'Carregamos tokenizer e modelo em BF16, com cache desativado para treino com gradient checkpointing.' },
              { lineRange: [35, 52], content: '`SFTConfig` define steps, batch, LR, contexto, precisão, loss do assistente, avaliação e logging.' },
              { lineRange: [54, 60], content: '`SFTTrainer` recebe treino e validação; não há PEFT aqui, então todos os pesos treináveis entram no update.' },
              { lineRange: [62, 71], content: 'Auditamos parâmetros, linhas de treino/eval, executamos o treino e salvamos o checkpoint completo.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [{ label: 'Environment' }, { label: 'Full SFT' }],
        codePanels: [
          {
            title: 'Check versions and GPU',
            description: 'Confirms TRL/Transformers/PEFT are updated before training.',
            source: { snippetId: 'sft_trl/environment-check', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 3], content: 'We import package metadata and PyTorch.' },
              { lineRange: [5, 8], content: 'We list versions to avoid running against an old API.' },
              { lineRange: [10, 13], content: 'We check CUDA, GPU name, and available VRAM.' },
            ],
          },
          {
            title: 'Short full training with TRL',
            description: 'Runs SFT without PEFT: every Qwen weight participates in the update.',
            source: { snippetId: 'sft_trl/full-finetuning-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 7], content: 'We import system helpers, PyTorch, datasets, Transformers, and TRL.' },
              { lineRange: [9, 13], content: 'We pin model, dataset, and output. `SFT_OUTPUT_ROOT` can point to another drive; default is `runs/`.' },
              { lineRange: [15, 21], content: 'We load the dataset, shuffle it, take a teaching subset, and create a train/eval split.' },
              { lineRange: [23, 33], content: 'We load tokenizer and model in BF16, with cache disabled for gradient-checkpointed training.' },
              { lineRange: [35, 52], content: '`SFTConfig` defines steps, batch, LR, context, precision, assistant loss, evaluation, and logging.' },
              { lineRange: [54, 60], content: '`SFTTrainer` receives train and eval data; no PEFT here, so all trainable weights participate.' },
              { lineRange: [62, 71], content: 'We audit parameters, train/eval rows, run training, and save the full checkpoint.' },
            ],
          },
        ],
      },
    },
  },
});
