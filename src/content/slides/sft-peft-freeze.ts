import { defineSlide } from './_factory';

export const sftPeftFreeze = defineSlide({
  id: 'sft-peft-freeze',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'PEFT: congelar a base',
      body: [
        'PEFT vem depois do full fine-tuning: agora que vimos o custo de atualizar tudo, podemos perguntar quais pesos realmente precisam aprender.',
        '',
        'A ideia é manter o modelo base congelado e acoplar poucos parâmetros treináveis. O forward ainda passa pela rede inteira, mas o otimizador só recebe os parâmetros novos.',
        '',
        '### Consequência prática',
        '',
        '- Menos VRAM para gradientes e estados do otimizador',
        '- Checkpoint muito menor',
        '- Base continua reutilizável',
        '- Adapter pode ser removido, trocado ou combinado',
        '',
        'Isso não muda a tarefa de SFT. Muda o conjunto de parâmetros que pode responder à loss.',
      ].join('\n'),
    },
    'en-us': {
      title: 'PEFT: freezing the base',
      body: [
        'PEFT comes after full fine-tuning: once we see the cost of updating everything, we can ask which weights actually need to learn.',
        '',
        'The idea is to keep the base model frozen and attach a small set of trainable parameters. Forward still passes through the whole network, but the optimizer only receives the new parameters.',
        '',
        '### Practical consequence',
        '',
        '- Less VRAM for gradients and optimizer states',
        '- Much smaller checkpoint',
        '- Base remains reusable',
        '- Adapter can be removed, swapped, or combined',
        '',
        'This does not change the SFT task. It changes the parameter set that can respond to the loss.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'peft-freeze-diagram',
    copy: {
      'pt-br': {
        title: 'PEFT congela o modelo base',
        subtitle: 'O backward passa pelo modelo, mas só adapters recebem update.',
        frozenBase: 'base congelada',
        adapters: 'adapters treináveis',
        gradients: 'gradientes fluem só para o delta',
        savedArtifact: 'salva adapter pequeno',
        baseParams: 'centenas de milhões de pesos preservados',
        adapterParams: 'poucos milhões de pesos novos',
      },
      'en-us': {
        title: 'PEFT freezes the base model',
        subtitle: 'Backward flows through the model, but only adapters receive updates.',
        frozenBase: 'frozen base',
        adapters: 'trainable adapters',
        gradients: 'gradients update only the delta',
        savedArtifact: 'saves small adapter',
        baseParams: 'hundreds of millions of weights preserved',
        adapterParams: 'a few million new weights',
      },
    },
  },
});
