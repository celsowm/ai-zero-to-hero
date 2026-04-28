import { defineSlide } from './_factory';

export const roadToMiniTransformer = defineSlide({
  id: 'road-to-mini-transformer',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Próxima parada: Construção`,
      body: `Você agora entende a anatomia completa da IA mais poderosa do planeta. Desde a tokenização humilde até o fluxo de atenção em múltiplas cabeças.

1. **A Teoria acabou:** você tem o modelo mental correto. Não há mágica, apenas matrizes, probabilidade e muito poder de cálculo.

2. **Hora da prática:** no próximo módulo, nós não vamos usar uma biblioteca pronta. Vamos abrir o código e construir um mini-Transformer do zero.

3. **O objetivo:** vamos treinar nosso próprio modelo para gerar texto e ver aquelas matrizes de atenção brilharem no console.

> Preparado para sujar as mãos com tensores e matrizes? Vamos construir.`,
    },
    'en-us': {
      title: `Next stop: Construction`,
      body: `You now understand the complete anatomy of the most powerful AI on the planet. From humble tokenization to the multi-head attention stream.

1. **Theory is over:** you have the correct mental model. There is no magic, just matrices, probability, and a lot of computing power.

2. **Time for practice:** in the next module, we will not use a pre-built library. We will open the code and build a mini-Transformer from scratch.

3. **The goal:** we will train our own model to generate text and watch those attention matrices light up in the console.

> Ready to get your hands dirty with tensors and matrices? Let's build it.`,
    },
  },
  visual: {
    id: 'progress-stepper',
    copy: {
      "pt-br": {
        "currentModule": "Módulo Teórico Concluído",
        "nextModule": "Próximo: Construindo um Transformer"
      },
      "en-us": {
        "currentModule": "Theoretical Module Complete",
        "nextModule": "Next: Building a Transformer"
      }
    },
  },
});
