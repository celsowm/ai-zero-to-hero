import { defineSlide } from './_factory';

export const transformerBlockOverview = defineSlide({
  id: 'transformer-block-overview',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `O Bloco do Transformer`,
      body: `Agora os tokens estão prontos. O que acontece a seguir é uma sequência repetitiva. O GPT-2 não é uma bagunça de conexões; ele é organizado em blocos iguais empilhados (ex: 12 blocos).

1. **Atenção (Comunicação):** a primeira metade do bloco permite que os tokens 'conversem' entre si para entender o contexto da frase.

2. **MLP (Reflexão):** a segunda metade do bloco é onde cada token, agora ciente do contexto, é processado individualmente para atualizar seu próprio significado.

3. **O Loop:** essa dupla (Atenção + MLP) é repetida dezenas de vezes. A cada bloco, os vetores vão ficando mais complexos e precisos sobre o que o texto significa.

> Um Transformer é essencialmente o mesmo bloco de operações (Comunicação e Reflexão) repetido muitas vezes.`,
    },
    'en-us': {
      title: `The Transformer Block`,
      body: `Now the tokens are ready. What happens next is a repetitive sequence. GPT-2 is not a mess of connections; it is organized into identical stacked blocks (e.g., 12 blocks).

1. **Attention (Communication):** the first half of the block allows tokens to 'talk' to each other to understand the sentence's context.

2. **MLP (Reflection):** the second half is where each token, now aware of the context, is processed individually to update its own meaning.

3. **The Loop:** this duo (Attention + MLP) is repeated dozens of times. With each block, the vectors get more complex and precise about what the text means.

> A Transformer is essentially the same block of operations (Communication and Reflection) repeated many times.`,
    },
  },
  visual: {
    id: 'transformer-block-diagram',
    copy: {
      "pt-br": {
        "attentionLabel": "Mecanismo de Atenção",
        "mlpLabel": "Rede Neural (MLP)"
      },
      "en-us": {
        "attentionLabel": "Attention Mechanism",
        "mlpLabel": "Neural Network (MLP)"
      }
    },
  },
});
