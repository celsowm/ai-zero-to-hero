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
        '### O contrato do exemplo',
        '',
        '- Dataset do Hub: `celsowm/valdoria-sft-qwen35-dataset`',
        '- O campo necessário é `messages`',
        '- `select(range(...))` é só o corte didático de smoke test',
        '- Para treinar tudo, remova o `.select(...)`',
        '- `train_test_split` separa uma validação pequena para acompanhar a loss',
        '- No teste real, 220 steps LoRA chegaram a loss média `0.6122` e eval loss `0.2924`',
        '',
        'A diferença para o full não é a tarefa. É o conjunto de pesos que responde à loss: aqui a base fica congelada e só o adapter aprende.',
      ].join('\n'),
    },
    'en-us': {
      title: 'TRL: practical LoRA with SFTTrainer',
      body: [
        '`SFTTrainer` is TRL specialized `Trainer` for conversational SFT. It does not replace PyTorch: it organizes `forward`, loss, `backward()`, and optimizer step for chat datasets.',
        '',
        '### Example contract',
        '',
        '- Hub dataset: `celsowm/valdoria-sft-qwen35-dataset`',
        '- The required field is `messages`',
        '- `select(range(...))` is only the teaching smoke-test cut',
        '- To train on everything, remove `.select(...)`',
        '- `train_test_split` creates a small validation set to watch loss',
        '- In the real test, 220 LoRA steps reached average loss `0.6122` and eval loss `0.2924`',
        '',
        'The difference from full training is not the task. It is the set of weights that responds to loss: here the base is frozen and only the adapter learns.',
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
            description: 'Roda SFT em Valdoria, avalia durante o smoke e salva apenas o adapter.',
            source: { snippetId: 'sft_trl/lora-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 8], content: 'Importamos sistema, PyTorch, dataset, PEFT, Transformers e TRL.' },
              { lineRange: [10, 14], content: 'Fixamos modelo, dataset e saída. `SFT_OUTPUT_ROOT` permite salvar em outro disco; o padrão é `runs/`.' },
              { lineRange: [16, 22], content: 'Carregamos o dataset, embaralhamos, cortamos 1024 exemplos para smoke e criamos train/eval.' },
              { lineRange: [24, 33], content: 'Carregamos tokenizer e modelo base em BF16; a base será congelada pelo PEFT.' },
              { lineRange: [35, 42], content: '`LoraConfig` define rank, escala, dropout, bias, tarefa e módulos-alvo.' },
              { lineRange: [44, 61], content: '`SFTConfig` define steps, batch efetivo, LR, contexto, BF16, checkpointing, loss, eval e logs.' },
              { lineRange: [63, 70], content: '`SFTTrainer` recebe treino, validação, tokenizador e `peft_config`, então salva adapter em vez de modelo completo.' },
              { lineRange: [72, 82], content: 'Auditamos porcentagem treinável, linhas de treino/eval, treinamos e salvamos o adapter.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [{ label: 'LoRA' }],
        codePanels: [
          {
            title: 'Train a LoRA adapter with TRL',
            description: 'Runs SFT on Valdoria, evaluates during the smoke, and saves only the adapter.',
            source: { snippetId: 'sft_trl/lora-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 8], content: 'We import system helpers, PyTorch, datasets, PEFT, Transformers, and TRL.' },
              { lineRange: [10, 14], content: 'We pin model, dataset, and output. `SFT_OUTPUT_ROOT` can save to another drive; default is `runs/`.' },
              { lineRange: [16, 22], content: 'We load, shuffle, take 1024 examples for a smoke run, and create train/eval splits.' },
              { lineRange: [24, 33], content: 'We load tokenizer and base model in BF16; PEFT will freeze the base.' },
              { lineRange: [35, 42], content: '`LoraConfig` defines rank, scale, dropout, bias, task, and target modules.' },
              { lineRange: [44, 61], content: '`SFTConfig` defines steps, effective batch, LR, context, BF16, checkpointing, loss, eval, and logs.' },
              { lineRange: [63, 70], content: '`SFTTrainer` receives train data, eval data, tokenizer, and `peft_config`, then saves an adapter.' },
              { lineRange: [72, 82], content: 'We audit trainable percentage, train/eval rows, train, and save the adapter.' },
            ],
          },
        ],
      },
    },
  },
});
