import { defineSlide } from './_factory';

export const sftLoraMerge = defineSlide({
  id: 'sft-lora-merge',
  type: 'two-column',
  options: { columnRatios: [0.43, 0.57] },
  content: {
    'pt-br': {
      title: 'LoRA: adapter separado ou mergeado',
      body: [
        'Depois do treino, LoRA pode ser usado de duas formas. Você pode manter o adapter separado e carregá-lo sobre a base, ou aplicar `merge_and_unload()` e salvar um modelo com o delta incorporado.',
        '',
        '### Faça merge quando',
        '',
        '- Quer deploy mais simples: um diretório de modelo para carregar',
        '- Vai exportar ou converter o modelo depois',
        '- Não precisa trocar adapters dinamicamente',
        '',
        '### Não faça merge quando',
        '',
        '- Quer comparar vários adapters na mesma base',
        '- Quer manter o checkpoint pequeno',
        '- Quer ligar/desligar comportamentos sem duplicar o modelo base',
        '',
        'Merge não é novo treino. Ele só materializa `W_eff = W0 + B × A` nos pesos salvos.',
      ].join('\n'),
    },
    'en-us': {
      title: 'LoRA: separate or merged adapter',
      body: [
        'After training, LoRA can be used two ways. You can keep the adapter separate and load it on top of the base, or call `merge_and_unload()` and save a model with the delta baked in.',
        '',
        '### Merge when',
        '',
        '- You want simpler deployment: one model directory to load',
        '- You will export or convert the model later',
        '- You do not need to swap adapters dynamically',
        '',
        '### Do not merge when',
        '',
        '- You want to compare multiple adapters on the same base',
        '- You want to keep the checkpoint small',
        '- You want to toggle behaviors without duplicating the base model',
        '',
        'Merge is not new training. It only materializes `W_eff = W0 + B × A` into saved weights.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Merge' }],
        codePanels: [
          {
            title: 'Mergear adapter LoRA',
            description: 'Carrega base e adapter, incorpora o delta e salva um modelo pronto para deploy simples.',
            source: { snippetId: 'sft_trl/lora-merge', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 6], content: 'Importamos caminhos, PyTorch, PEFT e Transformers.' },
              { lineRange: [8, 11], content: 'Definimos modelo base, raiz de saída, adapter LoRA e diretório mergeado.' },
              { lineRange: [13, 18], content: 'Carregamos tokenizador do adapter e modelo base em BF16.' },
              { lineRange: [20, 22], content: '`PeftModel.from_pretrained` acopla o adapter; `merge_and_unload()` incorpora o delta.' },
              { lineRange: [24, 27], content: 'Salvamos modelo mergeado, tokenizador e caminho final.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [{ label: 'Merge' }],
        codePanels: [
          {
            title: 'Merge a LoRA adapter',
            description: 'Loads base and adapter, bakes in the delta, and saves a model for simpler deployment.',
            source: { snippetId: 'sft_trl/lora-merge', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 6], content: 'We import paths, PyTorch, PEFT, and Transformers.' },
              { lineRange: [8, 11], content: 'We define base model, output root, LoRA adapter, and merged directory.' },
              { lineRange: [13, 18], content: 'We load the adapter tokenizer and base model in BF16.' },
              { lineRange: [20, 22], content: '`PeftModel.from_pretrained` attaches the adapter; `merge_and_unload()` bakes in the delta.' },
              { lineRange: [24, 27], content: 'We save the merged model, tokenizer, and final path.' },
            ],
          },
        ],
      },
    },
  },
});
