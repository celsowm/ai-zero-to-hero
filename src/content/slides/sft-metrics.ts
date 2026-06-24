import { defineSlide } from './_factory';

export const sftMetrics = defineSlide({
  id: 'sft-metrics',
  type: 'two-column',
  options: { columnRatios: [0.45, 0.55] },
  content: {
    'pt-br': {
      title: 'Métricas do SFT',
      body: [
        '## O que monitorar no SFT (Supervised Fine-Tuning)',
        '',
        'Durante o fine-tuning com o `SFTTrainer`, não basta o treino "rodar até o fim". ',
        'É preciso interpretar os sinais fornecidos pelo modelo para garantir que ele está aprendendo corretamente, ',
        'e não apenas memorizando o dataset.',
        '',
        'O SFT funciona como uma previsão de tokens. No nosso caso, usamos ',
        '**`assistant_only_loss=True`**, o que significa que o cálculo do erro (loss) ignora as perguntas do ',
        'usuário e foca **apenas nos tokens da resposta do assistant**. Assim, métricas como *loss*, ',
        '*eval_loss* e *accuracy* refletem estritamente a qualidade da geração das respostas.',
        '',
        '---',
        '',
        '### As Métricas em 3 Níveis',
        '',
        '1. **Métricas de Treino:** Calculadas durante a atualização dos pesos do modelo.',
        '2. **Métricas de Validação (Eval):** Calculadas em um conjunto de dados separado para medir a capacidade de generalização.',
        '3. **Resumo Final:** Estatísticas gerais de tempo, velocidade e perdas médias.',
        '',
        '---',
        '',
        '### Como Interpretar os Sinais',
        '',
        'Nenhuma métrica deve ser avaliada isoladamente. O sucesso do treino exige uma leitura combinada:',
        '',
        '* **Training Loss vs. Eval Loss:** Uma *training loss* caindo é bom, mas se a *eval loss* começar a subir, o modelo está em **overfitting** (decorando o dataset).',
        '* **Mean Token Accuracy:** Uma acurácia alta indica que o modelo acerta muitos tokens isolados, mas não garante que o sentido semântico da resposta final esteja correto.',
        '* **Estabilidade:** A entropia deve reduzir de forma controlada. Fique atento a anomalias como valores `nan`, `inf` ou picos nos gradientes, que indicam instabilidade numérica.',
        '',
        '> **Regra de Ouro:** Métricas de treino indicam o comportamento do modelo, mas não substituem a ',
        '> **validação prática**. Após o SFT, teste o modelo com perguntas reais para avaliar a coerência, ',
        '> o formato e possíveis alucinações.',
      ].join('\n'),
    },
    'en-us': {
      title: 'SFT Metrics',
      body: [
        '## What to monitor in SFT (Supervised Fine-Tuning)',
        '',
        'During fine-tuning with `SFTTrainer`, it is not enough for training to "run to completion". ',
        'You must interpret the signals the model produces to ensure it is actually learning, ',
        'not just memorizing the dataset.',
        '',
        'SFT works as token prediction. In our case, we use **`assistant_only_loss=True`**, ',
        'meaning the loss calculation ignores user prompts and focuses **only on the assistant\'s response tokens**. ',
        'Metrics like *loss*, *eval_loss*, and *accuracy* strictly reflect response generation quality.',
        '',
        '---',
        '',
        '### The 3 Levels of Metrics',
        '',
        '1. **Training Metrics:** Computed during weight updates.',
        '2. **Validation (Eval) Metrics:** Computed on a held-out set to measure generalization.',
        '3. **Final Summary:** Overall time, speed, and average loss statistics.',
        '',
        '---',
        '',
        '### How to Read the Signals',
        '',
        'No single metric should be evaluated in isolation. Success requires combined reading:',
        '',
        '* **Training Loss vs. Eval Loss:** A dropping training loss is good, but if eval loss starts rising, the model is **overfitting** (memorizing the dataset).',
        '* **Mean Token Accuracy:** High accuracy means the model gets many individual tokens right, but does not guarantee semantically correct final responses.',
        '* **Stability:** Entropy should decrease in a controlled manner. Watch for anomalies like `nan`, `inf`, or gradient spikes — these indicate numerical instability.',
        '',
        '> **Golden Rule:** Training metrics indicate model behavior, but they do not replace **practical validation**. ',
        '> After SFT, test the model with real questions to evaluate coherence, format, and potential hallucinations.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'sft-metrics-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Treino' },
          { label: 'Validação' },
          { label: 'Métricas Finais' },
        ],
        panels: [
          {
            title: 'Métricas de Treino',
            description: 'Saída do Trainer a cada `logging_steps=50` durante o treino.',
            source: { snippetId: 'sft_trl/metrics-training', language: 'json' },
            fields: [
              {
                name: 'loss',
                label: 'Perda nos tokens supervisionados',
                explanation: 'Com assistant_only_loss=True, considera apenas os tokens da resposta do assistant. Quanto menor, melhor o modelo está imitando o padrão do dataset.',
              },
              {
                name: 'grad_norm',
                label: 'Norma dos gradientes',
                explanation: 'Valores moderados (0.2 ~ 5.0) indicam treino estável. Valores muito altos, inf ou nan indicam instabilidade numérica.',
              },
              {
                name: 'learning_rate',
                label: 'Taxa de aprendizado atual',
                explanation: 'Com warmup + scheduler cosseno, sobe no início e depois decai suavemente.',
              },
              {
                name: 'epoch',
                label: 'Progresso dentro das épocas',
                explanation: 'Exemplo: epoch = 0.62 significa 62% da primeira época.',
              },
            ],
          },
          {
            title: 'Métricas de Validação',
            description: 'Calculadas no dataset de validação a cada `eval_steps=50`.',
            source: { snippetId: 'sft_trl/metrics-validation', language: 'json' },
            fields: [
              {
                name: 'eval_loss',
                label: 'Métrica mais importante do treino',
                explanation: 'Usamos load_best_model_at_end=True com metric_for_best_model="eval_loss" e greater_is_better=False. O melhor checkpoint é o de menor eval_loss.',
              },
              {
                name: 'eval_runtime',
                label: 'Tempo de execução da validação',
                explanation: 'Tempo total em segundos para processar o lote de validação.',
              },
              {
                name: 'eval_samples_per_second',
                label: 'Velocidade de validação',
                explanation: 'Amostras processadas por segundo durante a validação.',
              },
              {
                name: 'epoch',
                label: 'Progresso da época',
                explanation: 'Mesmo epoch do treino — permite alinhar os momentos de treino e validação.',
              },
            ],
          },
          {
            title: 'Métricas Finais',
            description: 'Estatísticas agregadas ao final do treino, retornadas por `trainer.train()`.',
            source: { snippetId: 'sft_trl/metrics-final', language: 'json' },
            fields: [
              {
                name: 'train_runtime',
                label: 'Tempo total de treino',
                explanation: 'Tempo decorrido em segundos desde o início até o fim do treino.',
              },
              {
                name: 'train_samples_per_second',
                label: 'Amostras por segundo',
                explanation: 'Mede a velocidade do treino (throughput), não a qualidade do modelo.',
              },
              {
                name: 'train_loss',
                label: 'Loss média final',
                explanation: 'Média da loss de treino ao longo de todas as épocas. Útil como referência, mas menos importante que a eval_loss.',
              },
              {
                name: 'epoch',
                label: 'Épocas concluídas',
                explanation: 'Número total de épocas executadas (ex: 3.0 = 3 épocas completas).',
              },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Training' },
          { label: 'Validation' },
          { label: 'Final Metrics' },
        ],
        panels: [
          {
            title: 'Training Metrics',
            description: 'Trainer output every `logging_steps=50` during training.',
            source: { snippetId: 'sft_trl/metrics-training', language: 'json' },
            fields: [
              {
                name: 'loss',
                label: 'Supervised token loss',
                explanation: 'With assistant_only_loss=True, only assistant response tokens count. Lower is better — the model is learning to imitate the dataset.',
              },
              {
                name: 'grad_norm',
                label: 'Gradient norm',
                explanation: 'Moderate values (0.2 ~ 5.0) indicate stable training. Very high values, inf, or nan indicate numerical instability.',
              },
              {
                name: 'learning_rate',
                label: 'Current learning rate',
                explanation: 'With warmup + cosine scheduler, it rises initially then decays smoothly.',
              },
              {
                name: 'epoch',
                label: 'Epoch progress',
                explanation: 'Example: epoch = 0.62 means 62% of the first epoch is complete.',
              },
            ],
          },
          {
            title: 'Validation Metrics',
            description: 'Computed on the validation set every `eval_steps=50`.',
            source: { snippetId: 'sft_trl/metrics-validation', language: 'json' },
            fields: [
              {
                name: 'eval_loss',
                label: 'Most important metric',
                explanation: 'We use load_best_model_at_end=True with metric_for_best_model="eval_loss" and greater_is_better=False. The best checkpoint has the lowest eval_loss.',
              },
              {
                name: 'eval_runtime',
                label: 'Validation runtime',
                explanation: 'Total time in seconds to process the validation batch.',
              },
              {
                name: 'eval_samples_per_second',
                label: 'Validation throughput',
                explanation: 'Samples processed per second during validation.',
              },
              {
                name: 'epoch',
                label: 'Epoch progress',
                explanation: 'Same epoch counter as training — allows aligning training and validation timesteps.',
              },
            ],
          },
          {
            title: 'Final Metrics',
            description: 'Aggregated stats at the end of training, returned by `trainer.train()`.',
            source: { snippetId: 'sft_trl/metrics-final', language: 'json' },
            fields: [
              {
                name: 'train_runtime',
                label: 'Total training time',
                explanation: 'Elapsed time in seconds from start to finish of training.',
              },
              {
                name: 'train_samples_per_second',
                label: 'Samples per second',
                explanation: 'Measures training throughput, not model quality.',
              },
              {
                name: 'train_loss',
                label: 'Final average loss',
                explanation: 'Average training loss across all epochs. Useful as reference but less important than eval_loss.',
              },
              {
                name: 'epoch',
                label: 'Epochs completed',
                explanation: 'Total number of epochs executed (e.g. 3.0 = 3 full epochs).',
              },
            ],
          },
        ],
      },
    },
  },
});
