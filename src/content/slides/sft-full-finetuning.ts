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
              { lineRange: [1, 18], content: 'Importamos bibliotecas e definimos constantes: modelo Qwen3.5-0.8B, dataset SFT Valdoria, diretório de saída e seed.' },
              { lineRange: [21, 26], content: 'can_use_tf32() checa se a GPU tem capability >= 8 para usar TF32 nas operações matmul.' },
              { lineRange: [29, 36], content: 'get_model_dtype() escolhe bfloat16 (preferencial), float16 ou float32 conforme suporte da GPU.' },
              { lineRange: [39, 50], content: 'print_cuda_info() exibe diagnóstico detalhado da GPU: nome, capability, suporte a BF16 e TF32.' },
              { lineRange: [53, 71], content: 'load_train_eval_dataset() baixa o dataset, detecta o split principal (train ou primeiro disponível) e cria splits validation/test com fallback para train_test_split.' },
              { lineRange: [73, 93], content: 'main(): cria pasta, fixa seed, diagnostica GPU, determina flags de precisão, ativa TF32, carrega dataset.' },
              { lineRange: [94, 111], content: 'Carregamos tokenizer (trust_remote_code, pad_token=eos_token, padding à direita) e modelo base com dtype adequado, cache desativado.' },
              { lineRange: [112, 133], content: 'SFTConfig: output_dir, 3 épocas, batch 16, sem acumulação, lr=1.5e-5, warmup=10, cosine, AdamW 8-bit, max_length=1024, packing=False.' },
              { lineRange: [134, 143], content: 'bf16/fp16/tf32 conforme diagnóstico, gradient checkpointing com use_reentrant=False, use_cache=False.' },
              { lineRange: [144, 168], content: 'assistant_only_loss=True, loss_type="nll", eval/logging/save a cada 50 steps, keep 2, load_best, report_to=none, remove_unused_columns=False, sementes fixas.' },
              { lineRange: [170, 176], content: 'SFTTrainer sem PEFT — todos os 752M parâmetros do Qwen participam do gradiente.' },
              { lineRange: [178, 200], content: 'Auditamos parâmetros treináveis vs totais, exibimos tamanho dos splits, treinamos e salvamos o checkpoint completo com tokenizer.' },
              { lineRange: [201, 203], content: 'Entrypoint padrão: executa main() quando o script é chamado diretamente.' },
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
              { lineRange: [1, 18], content: 'We import libraries and define constants: Qwen3.5-0.8B model, Valdoria SFT dataset, output directory, and seed.' },
              { lineRange: [21, 26], content: 'can_use_tf32() checks if GPU capability >= 8 to enable TF32 for matmul operations.' },
              { lineRange: [29, 36], content: 'get_model_dtype() selects bfloat16 (preferred), float16, or float32 depending on GPU support.' },
              { lineRange: [39, 50], content: 'print_cuda_info() prints a detailed GPU diagnostic: name, capability, BF16 and TF32 support.' },
              { lineRange: [53, 71], content: 'load_train_eval_dataset() downloads the dataset, detects the main split (train or first available), and creates validation/test splits with a train_test_split fallback.' },
              { lineRange: [73, 93], content: 'main(): creates folder, sets seed, diagnoses GPU, determines precision flags, enables TF32, loads dataset.' },
              { lineRange: [94, 111], content: 'We load tokenizer (trust_remote_code, pad_token=eos_token, right padding) and base model with appropriate dtype, cache disabled.' },
              { lineRange: [112, 133], content: 'SFTConfig: output_dir, 3 epochs, batch 16, no accumulation, lr=1.5e-5, warmup=10, cosine, 8-bit AdamW, max_length=1024, packing=False.' },
              { lineRange: [134, 143], content: 'bf16/fp16/tf32 per diagnostic, gradient checkpointing with use_reentrant=False, use_cache=False.' },
              { lineRange: [144, 168], content: 'assistant_only_loss=True, loss_type="nll", eval/logging/save every 50 steps, keep 2, load_best, report_to=none, remove_unused_columns=False, fixed seeds.' },
              { lineRange: [170, 176], content: 'SFTTrainer without PEFT — all 752M Qwen parameters participate in gradient updates.' },
              { lineRange: [178, 200], content: 'We audit trainable vs total parameters, display split sizes, train, and save the full checkpoint with tokenizer.' },
              { lineRange: [201, 203], content: 'Standard entrypoint: runs main() when the script is called directly.' },
            ],
          },
        ],
      },
    },
  },
});
