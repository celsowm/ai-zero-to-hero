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
        '- Dataset completo com splits inteligentes (validation → test → train_test_split)',
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
        '- Full dataset with smart splits (validation → test → train_test_split)',
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
            description: 'Roda SFT em Valdoria, avalia durante o treino e salva apenas o adapter.',
            source: { snippetId: 'sft_trl/lora-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 10], content: '`from __future__ import annotations` e imports de sistema, PyTorch, datasets, PEFT, Transformers e TRL.' },
              { lineRange: [13, 19], content: 'Constantes: modelo, dataset, seed e caminhos de saída. `SFT_OUTPUT_ROOT` permite salvar em outro disco.' },
              { lineRange: [22, 27], content: '`main()`: cria diretório, fixa seed e ativa TF32 em matmul e cudnn — aceleração gratuita em GPUs Ampere+.' },
              { lineRange: [29, 44], content: 'Carrega o dataset completo do Hub, detecta o split principal (`train` ou o primeiro disponível) e cria splits automaticamente: usa `validation`, depois `test`, ou cria um 90/10 com `train_test_split`.' },
              { lineRange: [45, 54], content: 'Carrega tokenizer com `trust_remote_code`, configura `pad_token = eos_token` e `padding_side = "right"`.' },
              { lineRange: [55, 67], content: 'Carrega modelo com BF16 (GPU) ou FP32 (CPU). Desabilita cache, ativa gradient checkpointing e `enable_input_require_grads` para compatibilidade com LoRA.' },
              { lineRange: [68, 83], content: '`LoraConfig` com `TaskType.CAUSAL_LM`, rank 16, alpha 32, dropout 0.05, mirando atenção e MLP.' },
              { lineRange: [85, 140], content: '`SFTConfig`: 3 épocas, batch 4 com acumulação 4 (batch efetivo = 16), LR 2e-4, BF16/FP16/TF32 automático, save/eval a cada 50 steps, mantém melhor checkpoint por `eval_loss`.' },
              { lineRange: [142, 149], content: '`SFTTrainer` recebe modelo, SFTConfig, datasets, tokenizer e config PEFT.' },
              { lineRange: [151, 157], content: 'Calcula e exibe contagem de parâmetros treináveis e totais antes do treino.' },
              { lineRange: [158, 170], content: 'Treina o modelo, exibe métricas finais, salva adapter LoRA e tokenizer no diretório de saída.' },
              { lineRange: [172, 174], content: 'Guarda `main()` para execução como script.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [{ label: 'LoRA' }],
        codePanels: [
          {
            title: 'Train a LoRA adapter with TRL',
            description: 'Runs SFT on Valdoria, evaluates during training, and saves only the adapter.',
            source: { snippetId: 'sft_trl/lora-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 10], content: '`from __future__ import annotations` and imports for system, PyTorch, datasets, PEFT, Transformers, and TRL.' },
              { lineRange: [13, 19], content: 'Constants: model, dataset, seed, and output paths. `SFT_OUTPUT_ROOT` can save to another drive.' },
              { lineRange: [22, 27], content: '`main()`: creates the output directory, fixes the seed, and enables TF32 on matmul and cudnn — free speed on Ampere+ GPUs.' },
              { lineRange: [29, 44], content: 'Loads the full Hub dataset, detects the main split (`train` or first available), and auto-selects splits: uses `validation`, then `test`, or creates a 90/10 split with `train_test_split`.' },
              { lineRange: [45, 54], content: 'Loads tokenizer with `trust_remote_code`, sets `pad_token = eos_token` and `padding_side = "right"`.' },
              { lineRange: [55, 67], content: 'Loads model with BF16 (GPU) or FP32 (CPU). Disables cache, enables gradient checkpointing and `enable_input_require_grads` for LoRA compatibility.' },
              { lineRange: [68, 83], content: '`LoraConfig` with `TaskType.CAUSAL_LM`, rank 16, alpha 32, dropout 0.05, targeting attention and MLP.' },
              { lineRange: [85, 140], content: '`SFTConfig`: 3 epochs, batch 4 with accumulation 4 (effective batch = 16), LR 2e-4, automatic BF16/FP16/TF32, save/eval every 50 steps, keeps best checkpoint by `eval_loss`.' },
              { lineRange: [142, 149], content: '`SFTTrainer` receives model, SFTConfig, datasets, tokenizer, and PEFT config.' },
              { lineRange: [151, 157], content: 'Calculates and prints trainable and total parameter counts before training.' },
              { lineRange: [158, 170], content: 'Trains the model, prints final metrics, saves LoRA adapter and tokenizer to the output directory.' },
              { lineRange: [172, 174], content: 'Standard `main()` guard for script execution.' },
            ],
          },
        ],
      },
    },
  },
});
