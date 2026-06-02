import { defineSlide } from './_factory';

export const pytorchGpt2Trainer = defineSlide({
  id: 'pytorch-gpt2-trainer',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Trainer',
      body: `O \`Trainer\` junta tudo.

Ele cria device, seed, modelo, optimizer, DataLoader, scheduler e checkpoint. Depois executa o ciclo real: batch, forward, loss, backward, clipping, step, eval e save.

Esse slide precisa ter código porque é aqui que o aluno vê o treino inteiro se conectar.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/trainer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 22], content: 'Docstring e imports: `json`, `math`, `time`, `nullcontext`, `pathlib`, `torch`, `DataLoader`, `tqdm`, configurações e módulos do projeto.' },
        { lineRange: [24, 45], content: '`Trainer.__init__`: armazena configs, detecta device, loga parâmetros. Otimizações CUDA (TF32, benchmark).' },
        { lineRange: [46, 72], content: 'Valida metadata, seed, cria modelo (compilado opcional), optimizer, checkpoint manager, data loaders, AMP config e grad scaler.' },
        { lineRange: [74, 76], content: '`_log`: método estático que imprime com prefixo `[trainer]`.' },
        { lineRange: [46, 72], content: 'Valida metadata, seed, cria modelo (compilado opcional), optimizer, checkpoint manager, data loaders, AMP config e grad scaler.' },
        { lineRange: [78, 88], content: '`_validate_data_metadata`: lê metadata.json e verifica se vocab_size do dado bate com o modelo.' },
        { lineRange: [90, 104], content: '`fit()` setup: model.train(), step counter, best_val_loss, loader iterator, timer, barra de progresso.' },
        { lineRange: [104, 132], content: 'Loop de treino: zero_grad, gradient accumulation com forward/backward em AMP.' },
        { lineRange: [134, 177], content: 'Cálculo de LR com cosine_lr, gradient clipping, scaler.step, logging a cada 10 steps com loss/perplexity/tokens/s/grad_norm.' },
        { lineRange: [179, 211], content: 'Validação a cada eval_interval: evaluate, salva best_val.pt se melhor. Checkpoint a cada checkpoint_interval.' },
        { lineRange: [213, 223], content: 'Final: salva latest.pt ao término.' },
        { lineRange: [225, 245], content: '`evaluate()`: itera val_loader, calcula loss médio, retorna média.' },
        { lineRange: [247, 266], content: '`_make_loader`: constrói DataLoader com TokenShardDataset. `_raw_model`: acessa modelo subjacente.' },
      ],
    },
    'en-us': {
      title: 'Trainer',
      body: `The \`Trainer\` ties everything together.

It creates device, seed, model, optimizer, DataLoader, scheduler, and checkpoint. Then it runs the actual cycle: batch, forward, loss, backward, clipping, step, eval, and save.

This slide needs code because this is where the student sees the entire training pipeline connect.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/trainer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 22], content: 'Docstring and imports: `json`, `math`, `time`, `nullcontext`, `pathlib`, `torch`, `DataLoader`, `tqdm`, configs and project modules.' },
        { lineRange: [24, 45], content: '`Trainer.__init__`: stores configs, detects device, logs params. CUDA optimizations (TF32, benchmark).' },
        { lineRange: [46, 72], content: 'Validates metadata, seeds, creates model (optionally compiled), optimizer, checkpoint manager, data loaders, AMP config, and grad scaler.' },
        { lineRange: [74, 76], content: '`_log`: static method that prints with `[trainer]` prefix.' },
        { lineRange: [46, 72], content: 'Validates metadata, seeds, creates model (optionally compiled), optimizer, checkpoint manager, data loaders, AMP config, and grad scaler.' },
        { lineRange: [78, 88], content: '`_validate_data_metadata`: reads metadata.json, checks if data vocab_size matches model.' },
        { lineRange: [90, 104], content: '`fit()` setup: model.train(), step counter, best_val_loss, loader iterator, timer, progress bar.' },
        { lineRange: [104, 132], content: 'Training loop: zero_grad, gradient accumulation with forward/backward under AMP.' },
        { lineRange: [134, 177], content: 'LR via cosine_lr, gradient clipping, scaler.step, logging every 10 steps with loss/perplexity/tokens/s/grad_norm.' },
        { lineRange: [179, 211], content: 'Validation at each eval_interval: evaluate, saves best_val.pt if improved. Checkpoint at each checkpoint_interval.' },
        { lineRange: [213, 223], content: 'Final: saves latest.pt on completion.' },
        { lineRange: [225, 245], content: '`evaluate()`: iterates val_loader, computes average loss, returns mean.' },
        { lineRange: [247, 266], content: '`_make_loader`: builds DataLoader with TokenShardDataset. `_raw_model`: accesses underlying model.' },
      ],
    },
  },
});

