import { defineSlide } from './_factory';

const TRAINING_JSON = `{
  "rewards/chosen": 2.847,
  "rewards/rejected": -1.232,
  "rewards/accuracies": 0.72,
  "rewards/margins": 4.079,
  "epoch": 0.62
}`;

const LOGPS_JSON = `{
  "logps/chosen": -1.432,
  "logps/rejected": -4.891,
  "epoch": 0.62
}`;

const EPOCH_JSON = `{
  "rewards/accuracies": 0.72,
  "rewards/margins": 4.079,
  "rewards/chosen": 2.847,
  "rewards/rejected": -1.232,
  "epoch": 1.0
}`;

export const dpoMetrics = defineSlide({
  id: 'dpo-metrics',
  type: 'two-column',
  options: { columnRatios: [0.45, 0.55] },
  content: {
    'pt-br': {
      title: 'DPO Metrics: rewards, accuracies e margins',
      body: [
        'No DPO, o modelo não está apenas imitando — está aprendendo **preferência**. A diferença fundamental para o SFT é que aqui o treino depende de três sinais simultâneos: chosen, rejected e a política de referência.',
        '',
        'Isso significa que as métricas têm interpretações diferentes. O SFT mede " estou gerando tokens bons?". O DPO mede " estou distinguindo chosen do rejected?".',
        '',
        '---',
        '',
        '### As métricas em 3 categorias',
        '',
        '**Rewards** — o reward model打分 que o RM dá para cada resposta.chosen sobe, rejected cai, accuracies mede quantas vezes o chosen supera o rejected.',
        '',
        '**Log Probabilities** — a política atual assigna probabilidade aos tokens. chosen estável, rejected caindo — isso significa que o modelo está "esfriando" a resposta rejeitada sem destabilizar a escolhida.',
        '',
        '**Margins** — a distância entre os dois. Margens altas = o modelo distingue claramente. Margens baixas = confuso, não está aprendendo.',
        '',
        '---',
        '',
        '### Como ler os sinais juntos',
        '',
        '* **Accuracies ~50%:** o modelo está aleatório — não está aprendendo preferência alguma.',
        '* **Accuracies ~70-80%:** bom sinal de que o DPO está funcionando.',
        '* **Margins subindo + accuracy subindo:** sinal ideal. O modelo distingue as respostas e está aprendendo.',
        '* **logps/chosen subindo muito:** pode indicar que o DPO virou um SFT — o modelo está maximizando chosen sem penalizar rejected o suficiente.',
        '',
        '> **Regra de ouro:** acc acima de 50% é necessário, mas não suficiente. Verifique se margins estão subindo e se `rejected` está caindo de verdade.',
      ].join('\n'),
    },
    'en-us': {
      title: 'DPO Metrics: rewards, accuracies, and margins',
      body: [
        'In DPO, the model is not just imitating — it is learning **preference**. The key difference from SFT is that training depends on three simultaneous signals: chosen, rejected, and the reference policy.',
        '',
        'This means the metrics have different interpretations. SFT measures "am I generating good tokens?". DPO measures "am I distinguishing chosen from rejected?".',
        '',
        '---',
        '',
        '### The metrics in 3 categories',
        '',
        '**Rewards** — the reward model score for each response. chosen rises, rejected falls, accuracies measures how often chosen beats rejected.',
        '',
        '**Log Probabilities** — the current policy assigns probability to tokens. chosen stable, rejected dropping — this means the model is "cooling down" the rejected response without destabilizing the chosen one.',
        '',
        '**Margins** — the distance between the two. High margins = the model clearly distinguishes. Low margins = confused, not learning.',
        '',
        '---',
        '',
        '### How to read the signals together',
        '',
        '* **Accuracies ~50%:** the model is random — it is not learning any preference.',
        '* **Accuracies ~70-80%:** a good signal that DPO is working.',
        '* **Margins rising + accuracy rising:** ideal signal. The model distinguishes the responses and is learning.',
        '* **logps/chosen rising sharply:** may indicate DPO turned into SFT — the model is maximizing chosen without sufficiently penalizing rejected.',
        '',
        '> **Golden rule:** accuracy above 50% is necessary but not sufficient. Check that margins are rising and that `rejected` is actually dropping.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'dpo-metrics-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Rewards' },
          { label: 'Log Probs' },
          { label: 'Interpretação' },
        ],
        panels: [
          {
            title: 'Métricas de Reward',
            description: 'Saída do DPOTrainer a cada `logging_steps`. Os scores do reward model para cada resposta do par.',
            code: TRAINING_JSON,
            language: 'json',
            fields: [
              {
                name: 'rewards/chosen',
                label: 'Score do Reward Model na resposta escolhida',
                explanation: 'O RM dá nota mais alta para chosen. Esperado subir durante o treino — o modelo está aprendendo a gerar respostas que o RM considera melhores.',
              },
              {
                name: 'rewards/rejected',
                label: 'Score do Reward Model na resposta rejeitada',
                explanation: 'Esperado cair — o modelo aprende a evitar as características que fazem o RM penalizar a resposta rejeitada.',
              },
              {
                name: 'rewards/accuracies',
                label: 'Fração em que chosen > rejected',
                explanation: 'O básico do DPO. Acima de 50% é o mínimo (aleatório). Valores de 70-80% indicam que o treino está funcionando bem.',
              },
              {
                name: 'rewards/margins',
                label: 'Diferença absoluta chosen - rejected',
                explanation: 'Margens altas = o modelo distingue claramente as duas respostas. Margens baixas ou caindo = confuso, política não está aprendendo.',
              },
            ],
          },
          {
            title: 'Log Probabilities',
            description: 'Logprob média da política atual para chosen e rejected. Mede quanto a política atual "gosta" de cada resposta.',
            code: LOGPS_JSON,
            language: 'json',
            fields: [
              {
                name: 'logps/chosen',
                label: 'Logprob média da resposta escolhida',
                explanation: 'Quanto a política atual assigna probabilidade aos tokens da chosen. Não deve subir demais — isso indicaria que o DPO virou SFT (só maximizar chosen, ignorar rejected).',
              },
              {
                name: 'logps/rejected',
                label: 'Logprob média da resposta rejeitada',
                explanation: 'Esperado cair — o modelo aprende a assignar menor probabilidade aos padrões que levam à resposta rejeitada.',
              },
              {
                name: 'epoch',
                label: 'Progresso dentro da época',
                explanation: 'Permite acompanhar a evolução ao longo do treino.',
              },
            ],
          },
          {
            title: 'Interpretação Combinada',
            description: 'Como os sinais se reforçam ou se contradizem ao longo do treino.',
            code: EPOCH_JSON,
            language: 'json',
            fields: [
              {
                name: 'rewards/accuracies',
                label: '% em que chosen supera rejected',
                explanation: 'O primeiro indicador de sucesso do DPO. Acima de 50% = modelo distingue; abaixo = não está aprendendo.',
              },
              {
                name: 'rewards/margins',
                label: 'Distância entre chosen e rejected',
                explanation: 'Margens subindo + accuracy subindo = sinal ideal. Margens caindo com accuracy estável = modelo confuso, provavelmente learning rate alto demais ou beta mal ajustado.',
              },
              {
                name: 'rewards/chosen',
                label: 'Nível do chosen',
                explanation: 'Se sobe muito rápido, o DPO pode estar virando SFT — maximize sem preservar a diversidade da rejected.',
              },
              {
                name: 'rewards/rejected',
                label: 'Nível do rejected',
                explanation: 'Se não cai ou até sobe, o modelo não está aprendendo a penalizar o rejected — verificar se o dataset de preferência é de verdade discriminativo.',
              },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Rewards' },
          { label: 'Log Probs' },
          { label: 'Interpretation' },
        ],
        panels: [
          {
            title: 'Reward Metrics',
            description: 'DPOTrainer output every `logging_steps`. The reward model scores for each response in the pair.',
            code: TRAINING_JSON,
            language: 'json',
            fields: [
              {
                name: 'rewards/chosen',
                label: 'Reward Model score for the chosen response',
                explanation: 'RM gives a higher score to chosen. Expected to rise during training — the model is learning to generate responses the RM considers better.',
              },
              {
                name: 'rewards/rejected',
                label: 'Reward Model score for the rejected response',
                explanation: 'Expected to drop — the model learns to avoid the characteristics that make the RM penalize the rejected response.',
              },
              {
                name: 'rewards/accuracies',
                label: 'Fraction where chosen > rejected',
                explanation: 'The core DPO indicator. Above 50% is the minimum (random). Values of 70-80% indicate training is working well.',
              },
              {
                name: 'rewards/margins',
                label: 'Absolute difference chosen - rejected',
                explanation: 'High margins = the model clearly distinguishes the two responses. Low or falling margins = confused, policy not learning.',
              },
            ],
          },
          {
            title: 'Log Probabilities',
            description: 'Average logprob of the current policy for chosen and rejected. Measures how much the current policy "likes" each response.',
            code: LOGPS_JSON,
            language: 'json',
            fields: [
              {
                name: 'logps/chosen',
                label: 'Average logprob of the chosen response',
                explanation: 'How much the current policy assigns probability to the chosen tokens. Should not rise too much — a sharp rise would indicate DPO turned into SFT (only maximizing chosen, ignoring rejected).',
              },
              {
                name: 'logps/rejected',
                label: 'Average logprob of the rejected response',
                explanation: 'Expected to drop — the model learns to assign lower probability to the patterns that lead to the rejected response.',
              },
              {
                name: 'epoch',
                label: 'Epoch progress',
                explanation: 'Allows tracking evolution across training.',
              },
            ],
          },
          {
            title: 'Combined Interpretation',
            description: 'How the signals reinforce or contradict each other during training.',
            code: EPOCH_JSON,
            language: 'json',
            fields: [
              {
                name: 'rewards/accuracies',
                label: '% where chosen beats rejected',
                explanation: 'The first indicator of DPO success. Above 50% = model distinguishes; below = not learning.',
              },
              {
                name: 'rewards/margins',
                label: 'Distance between chosen and rejected',
                explanation: 'Rising margins + rising accuracy = ideal signal. Falling margins with stable accuracy = confused model, likely learning rate too high or beta misconfigured.',
              },
              {
                name: 'rewards/chosen',
                label: 'Chosen level',
                explanation: 'If rising too fast, DPO may be turning into SFT — maximize without preserving the diversity of the rejected.',
              },
              {
                name: 'rewards/rejected',
                label: 'Rejected level',
                explanation: 'If it does not fall or even rises, the model is not learning to penalize the rejected — check if the preference dataset is truly discriminative.',
              },
            ],
          },
        ],
      },
    },
  },
});