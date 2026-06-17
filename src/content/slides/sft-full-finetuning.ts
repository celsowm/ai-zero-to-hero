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
        '### O que esse treino faz',
        '',
        '- `Qwen/Qwen3.5-0.8B` expõe `752.393.024` parâmetros treináveis',
        '- O dataset completo do Hub é carregado com splits inteligentes',
        '- `trust_remote_code=True` permite modelos com custom code',
        '- `cosine` scheduler com `warmup_steps=10` suaviza o aprendizado',
        '- `adamw_bnb_8bit` reduz VRAM sem perder qualidade',
        '- O checkpoint salvo é um modelo completo, não um adapter',
      ].join('\n'),
    },
    'en-us': {
      title: 'Full fine-tuning first',
      body: [
        'Full fine-tuning is direct SFT: every trainable model weight receives gradients and can change.',
        '',
        'It is the natural continuation of the Gutenberg/PyTorch block. There we trained text continuation; here we train expected answers in conversations. The loss still comes from predicting the correct next token.',
        '',
        '### What this training does',
        '',
        '- `Qwen/Qwen3.5-0.8B` exposes `752,393,024` trainable parameters',
        '- The full Hub dataset is loaded with intelligent splits',
        '- `trust_remote_code=True` allows models with custom code',
        '- `cosine` scheduler with `warmup_steps=10` smooths learning',
        '- `adamw_bnb_8bit` reduces VRAM without losing quality',
        '- The saved checkpoint is a full model, not an adapter',
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
            title: 'Treino full com TRL',
            description: 'Executa SFT sem PEFT: todos os pesos do Qwen participam do update.',
            source: { snippetId: 'sft_trl/full-finetuning-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 9], content: 'Importamos sistema, PyTorch, dataset, Transformers e TRL.' },
              { lineRange: [11, 15], content: 'Fixamos modelo, dataset, saída e seed. `SFT_OUTPUT_ROOT` permite usar outro disco; o padrão é `runs/`.' },
              { lineRange: [18, 33], content: 'Função principal: seed, TF32, carregamento do dataset com splits inteligentes (validation/test/train_test_split).' },
              { lineRange: [35, 38], content: 'Tokenizer com `trust_remote_code=True`, pad_token igual a eos_token e padding à direita.' },
              { lineRange: [40, 46], content: 'Modelo em bfloat16 ou float32 conforme GPU, com cache desativado e gradient checkpointing habilitado.' },
              { lineRange: [48, 82], content: '`SFTConfig` configuração completa: epochs, batch, LR, warmup, weight_decay, cosine scheduler, adamw_bnb_8bit, max_length, precision, loss do assistente, eval, save, tensorboard, seed e tf32.' },
              { lineRange: [84, 90], content: '`SFTTrainer` recebe treino e validação; não há PEFT aqui, então todos os pesos treináveis entram no update.' },
              { lineRange: [92, 106], content: 'Auditamos parâmetros treináveis, linhas de treino/eval, executamos o treino e salvamos o checkpoint completo.' },
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
            title: 'Full training with TRL',
            description: 'Runs SFT without PEFT: every Qwen weight participates in the update.',
            source: { snippetId: 'sft_trl/full-finetuning-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 9], content: 'We import system helpers, PyTorch, datasets, Transformers, and TRL.' },
              { lineRange: [11, 15], content: 'We pin model, dataset, output, and seed. `SFT_OUTPUT_ROOT` can point to another drive; default is `runs/`.' },
              { lineRange: [18, 33], content: 'Main function: seed, TF32, dataset loading with intelligent splits (validation/test/train_test_split).' },
              { lineRange: [35, 38], content: 'Tokenizer with `trust_remote_code=True`, pad_token equal to eos_token, and right-side padding.' },
              { lineRange: [40, 46], content: 'Model in bfloat16 or float32 depending on GPU, with cache disabled and gradient checkpointing enabled.' },
              { lineRange: [48, 82], content: '`SFTConfig` full setup: epochs, batch, LR, warmup, weight_decay, cosine scheduler, adamw_bnb_8bit, max_length, precision, assistant loss, eval, save, tensorboard, seed, and tf32.' },
              { lineRange: [84, 90], content: '`SFTTrainer` receives train and eval data; no PEFT here, so all trainable weights participate.' },
              { lineRange: [92, 106], content: 'We audit trainable parameters, train/eval rows, run training, and save the full checkpoint.' },
            ],
          },
        ],
      },
    },
  },
});
