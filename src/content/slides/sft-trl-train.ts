import { defineSlide } from './_factory';

export const sftTrlTrain = defineSlide({
  id: 'sft-trl-train',
  type: 'two-column',
  options: { columnRatios: [0.43, 0.57] },
  content: {
    'pt-br': {
      title: 'TRL: LoRA prática com SFTTrainer',
      body: [
        '`SFTTrainer` é o `Trainer` especializado da TRL para SFT conversacional. Ele não substitui PyTorch: organiza `forward`, loss, `backward()` e optimizer step para datasets de chat.',
        '',
        '### O treino testado',
        '',
        '- Modelo: `Qwen/Qwen3.5-0.8B`',
        '- Dataset: `celsowm/valdoria-sft-qwen35-dataset`',
        '- Amostras: 1024',
        '- Steps: 220',
        '- BF16 + gradient checkpointing',
        '- Loss média: `0.6294`',
        '- Adapter salvo em `D:\\ai-zero-to-hero-runs\\...` no teste real',
        '',
        'Para rodar em outro disco, defina `SFT_OUTPUT_ROOT`. Sem isso, o snippet usa `runs/`.',
      ].join('\n'),
    },
    'en-us': {
      title: 'TRL: practical LoRA with SFTTrainer',
      body: [
        '`SFTTrainer` is TRL specialized `Trainer` for conversational SFT. It does not replace PyTorch: it organizes `forward`, loss, `backward()`, and optimizer step for chat datasets.',
        '',
        '### Tested training run',
        '',
        '- Model: `Qwen/Qwen3.5-0.8B`',
        '- Dataset: `celsowm/valdoria-sft-qwen35-dataset`',
        '- Samples: 1024',
        '- Steps: 220',
        '- BF16 + gradient checkpointing',
        '- Average loss: `0.6294`',
        '- Adapter saved to `D:\\ai-zero-to-hero-runs\\...` in the real test',
        '',
        'To run on another drive, set `SFT_OUTPUT_ROOT`. Otherwise, the snippet uses `runs/`.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'LoRA' }],
        codePanels: [
          {
            title: 'Treinar adapter LoRA com TRL',
            description: 'Roda SFT em Valdoria e salva apenas o adapter.',
            source: { snippetId: 'sft_trl/lora-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 8], content: 'Importamos sistema, PyTorch, dataset, PEFT, Transformers e TRL.' },
              { lineRange: [10, 15], content: 'Fixamos modelo, dataset do Hub, saída configurável e subset de treino.' },
              { lineRange: [17, 26], content: 'Carregamos tokenizador/modelo em BF16 e desativamos cache para treino.' },
              { lineRange: [28, 35], content: 'LoRA define rank, escala, dropout e módulos-alvo.' },
              { lineRange: [37, 51], content: '`SFTConfig` define 220 steps, acumulação, LR, BF16 e assistant-only loss.' },
              { lineRange: [53, 59], content: '`SFTTrainer` junta modelo, dataset, tokenizador e config PEFT.' },
              { lineRange: [61, 70], content: 'Auditamos porcentagem treinável, treinamos e salvamos o adapter.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [{ label: 'LoRA' }],
        codePanels: [
          {
            title: 'Train a LoRA adapter with TRL',
            description: 'Runs SFT on Valdoria and saves only the adapter.',
            source: { snippetId: 'sft_trl/lora-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 8], content: 'We import system helpers, PyTorch, dataset, PEFT, Transformers, and TRL.' },
              { lineRange: [10, 15], content: 'We pin model, Hub dataset, configurable output, and training subset.' },
              { lineRange: [17, 26], content: 'We load tokenizer/model in BF16 and disable cache for training.' },
              { lineRange: [28, 35], content: 'LoRA defines rank, scale, dropout, and target modules.' },
              { lineRange: [37, 51], content: '`SFTConfig` defines 220 steps, accumulation, LR, BF16, and assistant-only loss.' },
              { lineRange: [53, 59], content: '`SFTTrainer` combines model, dataset, tokenizer, and PEFT config.' },
              { lineRange: [61, 70], content: 'We audit trainable percentage, train, and save the adapter.' },
            ],
          },
        ],
      },
    },
  },
});
