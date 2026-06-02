import { defineSlide } from './_factory';

export const quantizationTheory = defineSlide({
  id: 'quantization-theory',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Como a quantização funciona: do contínuo ao discreto',
      body: `Um peso é um número real como \`0.37156\`. Mas 8 bits só conseguem representar 256 valores distintos. O problema: como escolher os melhores 256?

**A analogia do termômetro:** imagine transformar um termômetro analógico (−30°C a +50°C) numa escala digital de 0 a 255. Você divide o range em 255 partes iguais. Cada parte tem um "tamanho" — esse tamanho é o **scale S**. O ponto zero da escala digital é o **zero-point Z**.

**O mesmo raciocínio para pesos:**
- **S (scale)** = tamanho de cada bucket = \`(max − min) / (2^k − 1)\`
- **Z (zero-point)** = onde começa o bucket 0 = \`round(−min / S)\`

**Exemplo com 4 bits** (16 níveis), range [−1, 1]:
- \`S = 2 / 15 ≈ 0.133\`
- \`Z = round(1 / 0.133) = 8\`
- Para \`x = 0.37\`: \`x_q = clamp(round(0.37 / 0.133) + 8, 0, 15) = 11\`
- Dequantizado: \`x_deq = (11 − 8) × 0.133 = 0.399\`
- Erro: \`ε = 0.37 − 0.399 = −0.029\`

**A fórmula geral:**
\`x_q = clamp(round(x / S) + Z, 0, 2^k − 1)\`
\`x_deq = (x_q − Z) × S\`
\`ε = x − x_deq\` (erro de quantização)

> Quanto menor o range \`[min, max]\` dos pesos, menor o \`S\`, menor o espaçamento entre buckets, menor o erro. Por isso a distribuição normal dos pesos após o treino é uma vantagem.`,
    },
    'en-us': {
      title: 'How quantization works: from continuous to discrete',
      body: `A weight is a real number like \`0.37156\`. But 8 bits can only represent 256 distinct values. The problem: how do you pick the best 256?

**The thermometer analogy:** imagine converting an analog thermometer (−30°C to +50°C) into a digital scale from 0 to 255. You divide the range into 255 equal parts. Each part has a "size" — that size is the **scale S**. The zero point of the digital scale is the **zero-point Z**.

**The same logic for weights:**
- **S (scale)** = bucket size = \`(max − min) / (2^k − 1)\`
- **Z (zero-point)** = where bucket 0 starts = \`round(−min / S)\`

**Example with 4 bits** (16 levels), range [−1, 1]:
- \`S = 2 / 15 ≈ 0.133\`
- \`Z = round(1 / 0.133) = 8\`
- For \`x = 0.37\`: \`x_q = clamp(round(0.37 / 0.133) + 8, 0, 15) = 11\`
- Dequantized: \`x_deq = (11 − 8) × 0.133 = 0.399\`
- Error: \`ε = 0.37 − 0.399 = −0.029\`

**The general formula:**
\`x_q = clamp(round(x / S) + Z, 0, 2^k − 1)\`
\`x_deq = (x_q − Z) × S\`
\`ε = x − x_deq\` (quantization error)

> The smaller the range \`[min, max]\` of the weights, the smaller \`S\`, the smaller the bucket spacing, the smaller the error. That is why the normal distribution of weights after training is an advantage.`,
    },
  },
  visual: {
    id: 'quantization-theory',
    copy: {
      'pt-br': {
        mappingPanel: {
          title: 'Como k bits dividem o espaço dos pesos',
          body: 'O slider controla k. As linhas verticais mostram os buckets disponíveis. Menos bits = buckets maiores = mais erro.',
          highlight: { label: 'Slider interativo', value: '2 a 8 bits' },
          bullets: [
            'Cada bit extra dobra o número de buckets',
            'Buckets uniformes desperdiçam precisão nas caudas',
            'NF4 corrige isso: buckets nos quantis de N(0,1)',
            'S define o tamanho de cada bucket',
          ],
          footer: 'A escolha de k depende da sua VRAM e da tolerância a erro.',
        },
        formulaPanel: {
          title: 'x → x_q → x_deq: acompanhe passo a passo',
          body: 'Clique em cada etapa para ver o que acontece com o valor 0.37 durante a quantização e dequantização.',
          highlight: { label: 'Valor original', value: 'x = 0.37' },
          bullets: [
            'S = range / (2^k − 1) — define o tamanho de cada bucket',
            'Z = round(−min / S) — alinha o zero da escala',
            'round() introduz o erro de arredondamento',
            'clamp() evita estouro do intervalo [0, 2^k−1]',
          ],
          footer: 'O erro vem do round(). S e Z são escolhidos para minimizá-lo.',
        },
      },
      'en-us': {
        mappingPanel: {
          title: 'How k bits divide the weight space',
          body: 'The slider controls k. The vertical lines show the available buckets. Fewer bits = larger buckets = more error.',
          highlight: { label: 'Interactive slider', value: '2 to 8 bits' },
          bullets: [
            'Each extra bit doubles the number of buckets',
            'Uniform buckets waste precision at the tails',
            'NF4 fixes this: buckets at the quantiles of N(0,1)',
            'S defines the size of each bucket',
          ],
          footer: 'The choice of k depends on your VRAM and error tolerance.',
        },
        formulaPanel: {
          title: 'x → x_q → x_deq: follow along step by step',
          body: 'Click each step to see what happens to the value 0.37 during quantization and dequantization.',
          highlight: { label: 'Original value', value: 'x = 0.37' },
          bullets: [
            'S = range / (2^k − 1) — defines the bucket size',
            'Z = round(−min / S) — aligns the zero of the scale',
            'round() introduces the rounding error',
            'clamp() prevents overflow outside [0, 2^k−1]',
          ],
          footer: 'The error comes from round(). S and Z are chosen to minimize it.',
        },
      },
    },
  },
});
