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
        '### Por que ensinar antes',
        '',
        '- É a forma mais simples de entender o que SFT faz',
        '- A loss e o loop são os mesmos do PyTorch que já vimos',
        '- O custo aparece claramente: pesos, gradientes, otimizador e checkpoint completo',
        '- LoRA só faz sentido depois que esse custo fica claro',
        '',
        '### Smoke real nesta máquina',
        '',
        '- Modelo: `Qwen/Qwen3.5-0.8B`',
        '- Treináveis: `752.393.024` parâmetros',
        '- Treino: 5 steps BF16, `assistant_only_loss=True`',
        '- Loss média: `2.409`',
        '- Salvar no C: falhou por falta de espaço; no D: funcionou',
      ].join('\n'),
    },
    'en-us': {
      title: 'Full fine-tuning first',
      body: [
        'Full fine-tuning is direct SFT: every trainable model weight receives gradients and can change.',
        '',
        '### Why teach it first',
        '',
        '- It is the simplest way to understand what SFT does',
        '- The loss and loop are the same PyTorch flow we already saw',
        '- The cost is explicit: weights, gradients, optimizer, and full checkpoint',
        '- LoRA only makes sense after that cost is clear',
        '',
        '### Real smoke on this machine',
        '',
        '- Model: `Qwen/Qwen3.5-0.8B`',
        '- Trainable: `752,393,024` parameters',
        '- Training: 5 BF16 steps, `assistant_only_loss=True`',
        '- Average loss: `2.409`',
        '- Saving on C: failed due to disk space; saving on D: worked',
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
              { lineRange: [5, 8], content: 'Imprimimos versões para evitar treinar com API antiga.' },
              { lineRange: [10, 13], content: 'Checamos CUDA, nome da GPU e VRAM disponível.' },
            ],
          },
          {
            title: 'Treino full curto com TRL',
            description: 'Executa SFT sem PEFT: todos os pesos do Qwen participam do update.',
            source: { snippetId: 'sft_trl/full-finetuning-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 7], content: 'Importamos sistema, PyTorch, dataset, Transformers e TRL.' },
              { lineRange: [9, 14], content: 'Fixamos modelo, dataset Valdoria e diretório de saída configurável.' },
              { lineRange: [16, 26], content: 'Carregamos tokenizador/modelo em BF16 e ativamos gradient checkpointing.' },
              { lineRange: [28, 42], content: '`SFTConfig` define smoke test, precisão, assistant-only loss e logging.' },
              { lineRange: [44, 49], content: '`SFTTrainer` liga modelo, args, dataset e tokenizador.' },
              { lineRange: [51, 59], content: 'Auditamos parâmetros, treinamos e salvamos o checkpoint completo.' },
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
              { lineRange: [5, 8], content: 'We print versions to avoid training with an old API.' },
              { lineRange: [10, 13], content: 'We check CUDA, GPU name, and available VRAM.' },
            ],
          },
          {
            title: 'Short full training with TRL',
            description: 'Runs SFT without PEFT: every Qwen weight participates in the update.',
            source: { snippetId: 'sft_trl/full-finetuning-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 7], content: 'We import system helpers, PyTorch, dataset, Transformers, and TRL.' },
              { lineRange: [9, 14], content: 'We pin model, Valdoria dataset, and configurable output directory.' },
              { lineRange: [16, 26], content: 'We load tokenizer/model in BF16 and enable gradient checkpointing.' },
              { lineRange: [28, 42], content: '`SFTConfig` defines the smoke test, precision, assistant-only loss, and logging.' },
              { lineRange: [44, 49], content: '`SFTTrainer` connects model, args, dataset, and tokenizer.' },
              { lineRange: [51, 59], content: 'We audit parameters, train, and save the full checkpoint.' },
            ],
          },
        ],
      },
    },
  },
});
