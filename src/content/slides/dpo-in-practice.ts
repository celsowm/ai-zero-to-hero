import { defineSlide } from './_factory';

export const dpoInPractice = defineSlide({
  id: 'dpo-in-practice',
  type: 'two-column',
  options: { columnRatios: [0.43, 0.57] },
  content: {
    'pt-br': {
      title: 'DPO em prática com TRL',
      body: [
        'Agora o alignment entra **em cima do checkpoint SFT**. Em vez de voltar ao modelo base, partimos do comportamento que o SFT já ensinou e refinamos a política com pares de preferência.',
        '',
        '### Contrato do exemplo',
        '',
        '- Dataset: `celsowm/valdoria-dpo-qwen35-dataset`',
        '- Cada exemplo compara comportamento `chosen` vs `rejected`',
        '- O ponto de partida é `runs/sft-valdoria-qwen35-08b-full`',
        '- `ref_model=None` é intencional: o TRL usa a política SFT inicial como referência',
        '',
        'No DPO, o modelo não aprende só a imitar uma resposta. Ele aprende a **preferir** a continuação escolhida e a se afastar da rejeitada, mantendo como âncora a política inicial do SFT.',
        '',
        'Isso também explica o custo: DPO costuma consumir mais VRAM que SFT puro, porque o treino compara comportamento `chosen`, `rejected` e referência na mesma otimização.',
      ].join('\n'),
    },
    'en-us': {
      title: 'DPO in practice with TRL',
      body: [
        'Now alignment happens **on top of the SFT checkpoint**. Instead of going back to the base model, we start from the behavior that SFT already taught and refine the policy with preference pairs.',
        '',
        '### Example contract',
        '',
        '- Dataset: `celsowm/valdoria-dpo-qwen35-dataset`',
        '- Each example compares `chosen` vs `rejected` behavior',
        '- The starting point is `runs/sft-valdoria-qwen35-08b-full`',
        '- `ref_model=None` is intentional: TRL uses the initial SFT policy as reference',
        '',
        'In DPO, the model does not only imitate one answer. It learns to **prefer** the chosen continuation and move away from the rejected one, while keeping the initial SFT policy as an anchor.',
        '',
        'That also explains the cost: DPO usually consumes more VRAM than plain SFT because training compares `chosen`, `rejected`, and reference behavior in the same optimization loop.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'DPO' }],
        codePanels: [
          {
            title: 'Treinar Preference Alignment com DPOTrainer',
            description: 'Carrega o checkpoint SFT, consome pares de preferência e salva o modelo alinhado por DPO.',
            source: { snippetId: 'sft_trl/dpo-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 17], content: 'Importamos utilitários, definimos o checkpoint SFT, o dataset DPO, o diretório de saída e a seed fixa do experimento.' },
              { lineRange: [20, 45], content: 'Criamos a pasta de saída, fixamos a seed, ativamos TF32 quando houver CUDA, carregamos o dataset, montamos um split de avaliação se ele não vier pronto e registramos qual checkpoint SFT será carregado.' },
              { lineRange: [47, 57], content: 'Carregamos o tokenizer do checkpoint SFT, corrigimos `pad_token` quando necessário e aplicamos `padding_side=\"left\"`, exigido pelo fluxo atual de DPO.' },
              { lineRange: [59, 73], content: 'Escolhemos o dtype conforme o hardware, carregamos o modelo SFT e desligamos `use_cache` para usar gradient checkpointing sem conflito.' },
              { lineRange: [75, 129], content: '`DPOConfig` concentra os tradeoffs do treino: LR menor que SFT, batch efetivo, optimizer 8-bit, `beta`, truncamento, precisão numérica, eval/log/save e limites de checkpoint.' },
              { lineRange: [131, 143], content: 'Montamos o `DPOTrainer`. `ref_model=None` é proposital: a TRL usa a política inicial do SFT como modelo de referência para medir a preferência.' },
              { lineRange: [145, 162], content: 'Auditamos parâmetros treináveis, mostramos tamanhos de treino/validação, treinamos, imprimimos métricas, salvamos modelo e tokenizer alinhados e fechamos com o entrypoint executável do script.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [{ label: 'DPO' }],
        codePanels: [
          {
            title: 'Train Preference Alignment with DPOTrainer',
            description: 'Loads the SFT checkpoint, consumes preference pairs, and saves the DPO-aligned model.',
            source: { snippetId: 'sft_trl/dpo-train', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 17], content: 'We import helpers, define the SFT checkpoint, the DPO dataset, the output directory, and the fixed experiment seed.' },
              { lineRange: [20, 45], content: 'We create the output folder, set the seed, enable TF32 on CUDA, load the dataset, create an eval split if one is not already present, and log which SFT checkpoint will be loaded.' },
              { lineRange: [47, 57], content: 'We load the tokenizer from the SFT checkpoint, fix `pad_token` when needed, and apply `padding_side=\"left\"`, which is required by the current DPO flow.' },
              { lineRange: [59, 73], content: 'We choose the dtype based on the hardware, load the SFT model, and disable `use_cache` so gradient checkpointing can run safely.' },
              { lineRange: [75, 129], content: '`DPOConfig` concentrates the training tradeoffs: lower LR than SFT, effective batch, 8-bit optimizer, `beta`, truncation, numeric precision, eval/log/save cadence, and checkpoint limits.' },
              { lineRange: [131, 143], content: 'We build the `DPOTrainer`. `ref_model=None` is intentional: TRL uses the initial SFT policy as the reference model for preference comparison.' },
              { lineRange: [145, 162], content: 'We audit trainable parameters, show train/eval sizes, train, print metrics, save the aligned model and tokenizer, and finish with the script entrypoint.' },
            ],
          },
        ],
      },
    },
  },
});
