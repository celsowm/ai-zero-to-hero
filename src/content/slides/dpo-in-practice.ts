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
        'No slide anterior, seguimos o pipeline tensorial completo, do batch ao gradiente; aqui o `DPOTrainer` executa exatamente esse fluxo sobre um checkpoint SFT real.',
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
        'In the previous slide, we followed the full tensor pipeline from batch to gradient; here `DPOTrainer` runs that exact flow on a real SFT checkpoint.',
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
              { lineRange: [1, 20], content: 'Importamos utilitários, definimos o checkpoint SFT, o dataset DPO, o diretório de saída e a seed fixa do experimento.' },
              { lineRange: [22, 87], content: 'Funções auxiliares que detectam capacidades de hardware (TF32, BF16), escolhem dtype e optimizer, imprimem informações de CUDA e carregam o dataset DPO com split de avaliação automático.' },
              { lineRange: [88, 119], content: 'Início do `main`: criamos a pasta de saída, imprimimos info de CUDA, resolvemos dtype/optimizer, ativamos TF32, carregamos o dataset e começamos a carregar o tokenizer do checkpoint SFT.' },
              { lineRange: [120, 137], content: 'Completamos o tokenizer (`pad_token`, `padding_side=\"left\"`), carregamos o modelo SFT com dtype apropriado e desligamos `use_cache` para usar gradient checkpointing sem conflito.' },
              { lineRange: [138, 182], content: '`DPOConfig` concentra os tradeoffs do treino: LR menor que SFT, batch efetivo, optimizer dinâmico, `beta`, truncamento, precisão numérica, eval/log/save e limites de checkpoint.' },
              { lineRange: [183, 199], content: 'Montamos o `DPOTrainer`. `ref_model=None` é proposital: a TRL usa a política inicial do SFT como modelo de referência para medir a preferência.' },
              { lineRange: [200, 233], content: 'Auditamos parâmetros treináveis, mostramos tamanhos de treino/validação, treinamos, imprimimos métricas finais, salvamos modelo e tokenizer alinhados e fechamos com o entrypoint executável do script.' },
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
              { lineRange: [1, 20], content: 'We import helpers, define the SFT checkpoint, the DPO dataset, the output directory, and the fixed experiment seed.' },
              { lineRange: [22, 87], content: 'Helper functions that detect hardware capabilities (TF32, BF16), choose dtype and optimizer, print CUDA info, and load the DPO dataset with automatic eval split.' },
              { lineRange: [88, 119], content: 'Start of `main`: we create the output folder, print CUDA info, resolve dtype/optimizer, enable TF32, load the dataset, and begin loading the tokenizer from the SFT checkpoint.' },
              { lineRange: [120, 137], content: 'We finish the tokenizer (`pad_token`, `padding_side=\"left\"`), load the SFT model with the appropriate dtype, and disable `use_cache` so gradient checkpointing can run safely.' },
              { lineRange: [138, 182], content: '`DPOConfig` concentrates the training tradeoffs: lower LR than SFT, effective batch, dynamic optimizer, `beta`, truncation, numeric precision, eval/log/save cadence, and checkpoint limits.' },
              { lineRange: [183, 199], content: 'We build the `DPOTrainer`. `ref_model=None` is intentional: TRL uses the initial SFT policy as the reference model for preference comparison.' },
              { lineRange: [200, 233], content: 'We audit trainable parameters, show train/eval sizes, train, print final metrics, save the aligned model and tokenizer, and finish with the script entrypoint.' },
            ],
          },
        ],
      },
    },
  },
});
