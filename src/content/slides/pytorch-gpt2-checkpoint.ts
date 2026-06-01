import { defineSlide } from './_factory';

export const pytorchGpt2Checkpoint = defineSlide({
  id: 'pytorch-gpt2-checkpoint',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Checkpoints',
      body: `Checkpoint não é só peso do modelo.

Para continuar ou auditar um treino, precisamos salvar também o optimizer, a configuração da arquitetura, a configuração do treino, o step atual e a melhor loss de validação.

Esse arquivo define o contrato do que significa "salvar um treino".`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/checkpoint
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `dataclasses.asdict` para converter dataclass em dict, `pathlib` para caminhos, `torch` para salvar. Importa `ModelConfig` e `TrainConfig` para tipagem.' },
        { lineRange: [14, 17], content: '`CheckpointManager.__init__`: recebe diretório de saída, converte para `Path` e cria o diretório se não existir.' },
        { lineRange: [19, 41], content: '`CheckpointManager.save()`: monta um dicionário com state_dict do modelo, state_dict do optimizer (pode ser `None`), configs convertidas com `asdict`, step atual e melhor loss. Salva com `torch.save()` — que gerencia buffers CUDA corretamente.' },
        { lineRange: [44, 49], content: '`load_checkpoint()`: função independente que carrega com `map_location` para permitir carregar em CPU mesmo se o checkpoint foi salvo em GPU.' },
      ],
    },
    'en-us': {
      title: 'Checkpoints',
      body: `A checkpoint is not just model weights.

To resume or audit training, we also need to save the optimizer, architecture config, training config, current step, and best validation loss.

This file defines the contract for what "saving a training run" means.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/checkpoint
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `dataclasses.asdict` to convert dataclass to dict, `pathlib` for paths, `torch` for saving. Imports `ModelConfig` and `TrainConfig` for typing.' },
        { lineRange: [14, 17], content: '`CheckpointManager.__init__`: receives output directory, converts to `Path`, and creates the directory if it does not exist.' },
        { lineRange: [19, 41], content: '`CheckpointManager.save()`: builds a dict with model state_dict, optimizer state_dict (may be `None`), configs via `asdict`, current step, and best loss. Saves with `torch.save()` which handles CUDA buffers correctly.' },
        { lineRange: [44, 49], content: '`load_checkpoint()`: standalone function that loads with `map_location` to allow loading on CPU even if the checkpoint was saved on GPU.' },
      ],
    },
  },
});

