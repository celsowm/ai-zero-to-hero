import { defineSlide } from './_factory';

export const repoGpt2TrainDebug = defineSlide({
  id: 'repo-gpt2-train-debug',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Prática: treino debug com configs',
      body: `Depois do smoke test e do tiny overfit, entra o treino configurável.

\`\`\`bash
python scripts/train.py --language pt --model-config configs/model/gpt2-debug.yaml --train-config configs/train/debug.yaml
\`\`\`

A ideia aqui e validar o pipeline inteiro com custo baixo antes de subir escala.

Checklist desse estagio:
- arquivo de dados encontrado e tokenizado
- loss de treino descendo sem instabilidade
- checkpoints sendo gravados
- metadados suficientes para retomar ou gerar depois`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/train-debug
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'Os argumentos CLI deixam explícito que modelo, treino e dados são decisões separadas.' },
        { lineRange: [5, 7], content: 'O script resolve diretório de dados e carrega os dois arquivos de configuração.' },
        { lineRange: [9, 10], content: 'A construção do trainer e a chamada `fit()` concentram o fluxo real de treino.' },
      ],
    },
    'en-us': {
      title: 'Practice: debug training with configs',
      body: `After the smoke test and tiny overfit, we move into configurable training.

\`\`\`bash
python scripts/train.py --language en --model-config configs/model/gpt2-debug.yaml --train-config configs/train/debug.yaml
\`\`\`

The point is to validate the whole pipeline cheaply before scaling it up.

Stage checklist:
- data file is found and tokenized
- training loss trends down without instability
- checkpoints are written
- enough metadata exists to resume or generate later.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/train-debug
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'The CLI arguments make it explicit that model, training, and data are separate decisions.' },
        { lineRange: [5, 7], content: 'The script resolves the data location and loads the two config files.' },
        { lineRange: [9, 10], content: 'Trainer construction and `fit()` concentrate the real training flow.' },
      ],
    },
  },
});

