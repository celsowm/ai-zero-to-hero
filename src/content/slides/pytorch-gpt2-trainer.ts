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
        { lineRange: [1, 18], content: 'Imports: `pathlib`, `torch`, `DataLoader`, todos os módulos do projeto (configs, dataset, GPT, checkpoint, optimizer, scheduler, device, seed).' },
        { lineRange: [20, 47], content: '`Trainer.__init__`: recebe configs, guarda referências. Cria device com `get_device()`, fixa seed, instancia `GPT`, constrói optimizer com `build_adamw`, cria `CheckpointManager` e DataLoaders de treino/validação.' },
        { lineRange: [49, 63], content: '`_make_loader()`: cria `TokenShardDataset` para um split e envolve em `DataLoader`. Suporta `shuffle`, `num_workers`, `pin_memory` (só para CUDA) e `drop_last`.' },
        { lineRange: [65, 87], content: '`fit()` — loop principal: itera `max_steps`. Reseta gradientes, faz gradient accumulation (`for _ in range(gradient_accumulation_steps)`), forward/backward com loss escalada, e acumula gradientes antes do step.' },
        { lineRange: [89, 97], content: 'LR scheduling: calcula LR via `cosine_lr()` e aplica manualmente em cada `param_group` do optimizer. Isso dá controle explícito sobre o learning rate.' },
        { lineRange: [99, 114], content: 'Clipping: `clip_grad_norm_` evita gradientes explosivos. `optimizer.step()` aplica a atualização. A cada `checkpoint_interval`, salva checkpoint com `save()`. O modelo permanece em `train()`.' },
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
        { lineRange: [1, 18], content: 'Imports: `pathlib`, `torch`, `DataLoader`, and all project modules (configs, dataset, GPT, checkpoint, optimizer, scheduler, device, seed).' },
        { lineRange: [20, 47], content: '`Trainer.__init__`: receives configs, stores references. Gets device via `get_device()`, sets seed, instantiates `GPT`, builds optimizer with `build_adamw`, creates `CheckpointManager`, and builds train/val DataLoaders.' },
        { lineRange: [49, 63], content: '`_make_loader()`: creates `TokenShardDataset` for a split and wraps in `DataLoader`. Supports `shuffle`, `num_workers`, `pin_memory` (CUDA only), and `drop_last`.' },
        { lineRange: [65, 87], content: '`fit()` — main loop: iterates `max_steps`. Zeros gradients, performs gradient accumulation (`for _ in range(gradient_accumulation_steps)`), forward/backward with scaled loss, accumulates gradients before stepping.' },
        { lineRange: [89, 97], content: 'LR scheduling: computes LR via `cosine_lr()` and applies manually to each `param_group`. Manual control over the learning rate.' },
        { lineRange: [99, 114], content: 'Clipping: `clip_grad_norm_` prevents exploding gradients. `optimizer.step()` applies the update. Every `checkpoint_interval`, saves checkpoint. Model stays in `train()` mode.' },
      ],
    },
  },
});
