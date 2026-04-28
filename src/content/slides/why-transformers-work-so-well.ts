import { defineSlide } from './_factory';

export const whyTransformersWorkSoWell = defineSlide({
  id: 'why-transformers-work-so-well',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Por que o Transformer dominou?`,
      body: `Agora que a anatomia já está montada, dá para responder com mais precisão por que o Transformer venceu.

1. **Escala com hardware:** GPUs são monstros de paralelismo, e o Transformer foi a arquitetura certa para transformar esse paralelismo em treino útil.

2. **Contexto flexível:** diferente do MLP rígido, a atenção deixa o modelo conectar palavras distantes e adaptar essas conexões conforme a sequência muda.

3. **Generalidade:** a mesma receita funcionou tão bem em sequências que hoje ela aparece não só em texto, mas também em imagem, áudio e biologia.

> No começo isso era só um teaser. Agora você já tem contexto para entender por que essa arquitetura dominou.`,
    },
    'en-us': {
      title: `Why did Transformers take over?`,
      body: `Now that the anatomy is already on the table, we can answer more precisely why the Transformer won.

1. **It scales with hardware:** GPUs are parallelism monsters, and the Transformer was the right architecture to turn that parallelism into useful training.

2. **Flexible context:** unlike the rigid MLP, attention lets the model connect distant words and adapt those connections as the sequence changes.

3. **Generality:** the same recipe worked so well on sequences that today it appears not just in text, but also in image, audio, and biology.

> At the beginning this was only a teaser. Now you have enough context to understand why this architecture took over.`,
    },
  },
  visual: {
    id: 'why-transformers-work-so-well',
    copy: {
      "pt-br": {
        "reason1": "Escala em GPU",
        "reason2": "Contexto flexível",
        "reason3": "Generalidade"
      },
      "en-us": {
        "reason1": "GPU scale",
        "reason2": "Flexible context",
        "reason3": "Generality"
      }
    },
  },
});
