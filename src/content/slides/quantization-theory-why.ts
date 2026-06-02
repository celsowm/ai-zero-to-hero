import { defineSlide } from './_factory';

export const quantizationTheoryWhy = defineSlide({
  id: 'quantization-theory-why',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Por que a quantização funciona: a distribuição dos pesos',
      body: `Antes de cair em fórmula, vamos entender **por que** trocar bits por memória é viável. A resposta está na distribuição dos pesos.

1. **Recap do dtype:** todo tensor no PyTorch tem um \`dtype\` que define quantos bytes cada elemento usa. FP32 = 4 bytes. Para um 7B: 7 × 10⁹ × 4 = 28 GB. Se pudéssemos usar 2 bytes por peso, cairíamos para 14 GB — sem mudar nada na arquitetura.

2. **A distribuição normal dos pesos:** depois do treino, os pesos de um LLM seguem uma distribuição normal (gaussiana). A maioria se concentra perto de zero, com caudas finas nos extremos. Concretamente: 68% dos pesos estão em ±1σ, 95% em ±2σ, 99.7% em ±3σ.

3. **A implicação:** o "range útil" dos pesos é pequeno (alguns σ). Não precisamos de um range enorme para representar a maior parte dos valores com precisão.

4. **O detalhe que importa mais adiante:** a distribuição é "quase" normal. Em LLMs, ~0.1% dos pesos têm magnitude **até 1000× maior** que a média. Esses pontos fora do padrão são os **outliers**. Eles concentram informação que a quantização uniforme destrói. Vamos revisitar isso no slide de INT8.

5. **Próximo passo:** agora que sabemos o formato dos dados, podemos escolher COMO cortar bits. A resposta é uma fórmula com dois parâmetros: **S** (escala) e **Z** (zero-point). É o que vem a seguir.

> Antes de otimizar bytes, otimize o entendimento: onde os dados estão, como é a sua distribuição, e onde estão os casos especiais.`,
    },
    'en-us': {
      title: 'Why quantization works: the weight distribution',
      body: `Before we get into formulas, let's understand **why** trading bits for memory is viable. The answer lies in the weight distribution.

1. **Recap of dtype:** every tensor in PyTorch has a \`dtype\` that defines how many bytes each element uses. FP32 = 4 bytes. For a 7B: 7 × 10⁹ × 4 = 28 GB. If we could use 2 bytes per weight, we'd drop to 14 GB — without changing the architecture at all.

2. **The normal distribution of weights:** after training, LLM weights follow a normal (Gaussian) distribution. Most concentrate near zero, with thin tails at the extremes. Concretely: 68% of weights are within ±1σ, 95% within ±2σ, 99.7% within ±3σ.

3. **The implication:** the "useful range" of weights is small (a few σ). We don't need a huge range to represent most values precisely.

4. **The detail that matters most:** the distribution is "almost" normal. In LLMs, ~0.1% of weights have magnitude **up to 1000× greater** than the mean. These off-pattern points are the **outliers**. They concentrate information that uniform quantization destroys. We'll revisit this in the INT8 slide.

5. **Next step:** now that we know the shape of the data, we can choose HOW to cut bits. The answer is a formula with two parameters: **S** (scale) and **Z** (zero-point). That's what comes next.

> Before optimizing bytes, optimize understanding: where the data is, what its distribution looks like, and where the special cases are.`,
    },
  },
  visual: {
    id: 'quantization-theory-why',
    copy: {
      'pt-br': {
        title: 'Distribuição normal e os outliers',
        subtitle: 'A estatística que torna a quantização viável',
        distributionPanel: {
          title: 'Onde estão os pesos',
          body: 'A gaussiana concentra 68% dos pesos em ±1σ. Isso é a "massa" do modelo — onde a precisão precisa ser maior.',
          highlight: { label: 'Onde estão 68%', value: '±1σ' },
          bullets: [
            'Pesos de LLM são ~N(0, 1) após o treino (normalizados por camada)',
            '68% dentro de ±1σ, 95% em ±2σ, 99.7% em ±3σ',
            'A região central é o "sinal" do modelo',
          ],
          footer: 'A cauda tem 0.3% dos pesos — pouco em quantidade, mas concentra os outliers que vão importar depois.',
        },
        outliersPanel: {
          title: 'O detalhe que complica tudo',
          body: 'Em LLMs, ~0.1% dos pesos têm magnitude até 1000× a média. Esses outliers concentram informação crítica que a quantização uniforme destrói.',
          highlight: { label: 'Outliers em magnitude', value: 'até 1000× a média' },
          bullets: [
            '~0.1% dos pesos, mas determinam a qualidade do modelo',
            'São ativados raramente mas com força quando disparam',
            'Vão ser o motivo do llm.int8() existir (próximo slide)',
          ],
          footer: 'Recap: outliers foram definidos aqui. No slide de INT8, vamos ver como o llm.int8() resolve esse problema.',
        },
      },
      'en-us': {
        title: 'Normal distribution and the outliers',
        subtitle: 'The statistic that makes quantization viable',
        distributionPanel: {
          title: 'Where the weights are',
          body: 'The Gaussian concentrates 68% of weights within ±1σ. This is the "mass" of the model — where precision needs to be highest.',
          highlight: { label: 'Where 68% live', value: '±1σ' },
          bullets: [
            'LLM weights are ~N(0, 1) after training (normalized per layer)',
            '68% within ±1σ, 95% within ±2σ, 99.7% within ±3σ',
            'The central region is the model\'s "signal"',
          ],
          footer: 'The tail holds 0.3% of weights — small in quantity, but concentrates the outliers that will matter later.',
        },
        outliersPanel: {
          title: 'The detail that complicates everything',
          body: 'In LLMs, ~0.1% of weights have magnitude up to 1000× the mean. These outliers concentrate critical information that uniform quantization destroys.',
          highlight: { label: 'Outlier magnitude', value: 'up to 1000× the mean' },
          bullets: [
            '~0.1% of weights, but they determine model quality',
            'Fire rarely but with force when they activate',
            "They'll be the reason llm.int8() exists (next slide)",
          ],
          footer: 'Recap: outliers were defined here. In the INT8 slide, we\'ll see how llm.int8() solves this problem.',
        },
      },
    },
  },
});
