import { defineSlide } from './_factory';

export const gpt2BlackBox = defineSlide({
  id: 'gpt2-black-box',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `O Transformer entra em cena (GPT-2)`,
      body: `Você já viu rapidamente que o GPT-2 é um Transformer famoso. Agora vamos abrir essa caixa preta com mais cuidado.

1. **Mesmo objetivo:** apesar da engenharia pesada, ele continua fazendo a mesma tarefa central: prever o próximo token a partir do contexto.

2. **Outra escala:** mesmo o menor GPT-2 tem 124 milhões de parâmetros. Isso coloca o modelo em uma ordem de grandeza muito acima dos exemplos simples que vimos antes.

3. **Próximo passo:** em vez de ficar só na visão externa, agora vamos desmontar a entrada, os blocos internos e a forma como a previsão sai do outro lado.

> O GPT-2 é a mesma tarefa de modelagem de linguagem, mas empilhada em uma arquitetura muito mais poderosa.`,
    },
    'en-us': {
      title: `Enter the Transformer (GPT-2)`,
      body: `You already got a quick preview that GPT-2 is a famous Transformer. Now we will open that black box more carefully.

1. **Same goal:** despite the heavy engineering, it is still doing the same core task: predicting the next token from context.

2. **Different scale:** even the smallest GPT-2 has 124 million parameters. That puts it in a very different league from the simple examples we have seen so far.

3. **Next step:** instead of staying at the outside view, we will now unpack the input, the internal blocks, and how the prediction comes out on the other side.

> GPT-2 is the same language-modeling task, stacked into a much more powerful architecture.`,
    },
  },
  visual: {
    id: 'gpt2-blackbox-diagram',
    copy: {
      "pt-br": {
        "inputLabel": "Janela de Contexto (Tokens)",
        "modelLabel": "GPT-2 (124M Parâmetros)",
        "outputLabel": "Probabilidades do Próximo Token"
      },
      "en-us": {
        "inputLabel": "Context Window (Tokens)",
        "modelLabel": "GPT-2 (124M Parameters)",
        "outputLabel": "Next Token Probabilities"
      }
    },
  },
});
