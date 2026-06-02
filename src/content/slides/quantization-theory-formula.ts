import { defineSlide } from './_factory';

export const quantizationTheoryFormula = defineSlide({
  id: 'quantization-theory-formula',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'A fórmula: como S e Z transformam um peso em bits',
      body: `Vimos **por que** a quantização funciona (a distribuição normal). Agora: **como** transformar um peso real em 4 ou 8 bits. A resposta é uma fórmula com dois parâmetros.

1. **S (scale) resolve "qual o tamanho de cada bucket"**: dados os pesos no range \`[min, max]\, dividimos o range em \`2^k - 1\` partes iguais. S = \`(max − min) / (2^k − 1)\`. É o "tamanho de cada degrau" da régua digital.

2. **Z (zero-point) resolve "como alinhar com o zero"**: queremos que o valor zero do peso real caia exatamente num bucket inteiro. Z = \`round(−min / S)\`. Sem Z, a quantização assimétrica perderia precisão perto de zero.

3. **\`clamp()\` resolve "o que fazer quando o peso cai fora do range"**: depois de arredondar, o valor pode estar fora do intervalo válido de buckets. \`clamp(valor, min, max)\` faz: se valor < min, retorna min; se valor > max, retorna max; senão, retorna valor. É o "corta pra caber" — sem ele, o índice do bucket seria inválido.

4. **A fórmula geral** (uniforme, inteiros): \`x_q = clamp(round(x / S) + Z, 0, 2^k − 1)\` e na dequantização \`x_deq = (x_q − Z) × S\`. O erro ε = \`x − x_deq\` vem do \`round()\`.

5. **Exemplo com 4 bits** (16 níveis), range [−1, 1]: S ≈ 0.133, Z = 8. Para x = 0.37: \`x_q = clamp(round(0.37 / 0.133) + 8, 0, 15) = 11\`. Dequantizado: \`(11 − 8) × 0.133 = 0.399\`. Erro: \`ε = −0.029\`.

> O erro vem do \`round()\`. S e Z são escolhidos para minimizá-lo. NF4 (próximo capítulo) substitui S uniforme por S variável — mais buckets perto de zero, menos nas caudas.`,
    },
    'en-us': {
      title: 'The formula: how S and Z turn a weight into bits',
      body: `We saw **why** quantization works (the normal distribution). Now: **how** to turn a real weight into 4 or 8 bits. The answer is a formula with two parameters.

1. **S (scale) answers "how big is each bucket"**: given weights in range \`[min, max]\`, we divide the range into \`2^k - 1\` equal parts. S = \`(max − min) / (2^k − 1)\`. It's the "step size" of the digital ruler.

2. **Z (zero-point) answers "how to align with zero"**: we want the real zero to fall exactly on an integer bucket. Z = \`round(−min / S)\`. Without Z, asymmetric quantization would lose precision near zero.

3. **\`clamp()\` answers "what to do when a weight falls outside the range"**: after rounding, the value can fall outside the valid bucket interval. \`clamp(value, min, max)\` does: if value < min, return min; if value > max, return max; otherwise, return value. It's the "trim to fit" — without it, the bucket index would be invalid.

4. **The general formula** (uniform, integer): \`x_q = clamp(round(x / S) + Z, 0, 2^k − 1)\` and dequantization \`x_deq = (x_q − Z) × S\`. The error ε = \`x − x_deq\` comes from \`round()\`.

5. **Example with 4 bits** (16 levels), range [−1, 1]: S ≈ 0.133, Z = 8. For x = 0.37: \`x_q = clamp(round(0.37 / 0.133) + 8, 0, 15) = 11\`. Dequantized: \`(11 − 8) × 0.133 = 0.399\`. Error: \`ε = −0.029\`.

> The error comes from \`round()\`. S and Z are chosen to minimize it. NF4 (next chapter) replaces the uniform S with a variable one — more buckets near zero, fewer in the tails.`,
    },
  },
  visual: {
    id: 'quantization-theory',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Visual' }, { label: 'Código' }],
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
        codePanel: {
          title: 'Simulação de quantização uniforme',
          description: 'A função `quantize` implementa S, Z, clamp e dequantização. Compare INT8 vs NF4 em pesos simulados.',
          source: { snippetId: 'transformers/quantization-theory-formula', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 2],
              content: 'Importamos `torch` para manipular tensores e `math` para constantes.',
            },
            {
              lineRange: [4, 6],
              content: 'Criamos 1000 pesos sintéticos seguindo uma distribuição normal N(0, 0.1) — similar aos pesos reais de um LLM após o treino.',
            },
            {
              lineRange: [8, 15],
              content: 'A função `quantize` implementa a equação central: calcula `S` (scale), `Z` (zero-point), quantiza e depois recupera a aproximação.',
            },
            {
              lineRange: [17, 19],
              content: 'Quantizamos em INT8 (8 bits, 256 níveis) e medimos o MSE — o erro entre os pesos originais e os recuperados.',
            },
            {
              lineRange: [21, 23],
              content: 'Com 4 bits (16 níveis), o MSE aumenta, mas ainda é pequeno — mostrando por que NF4 funciona tão bem.',
            },
            {
              lineRange: [25, 26],
              content: 'Exibimos o range original e o número de níveis: 256 para INT8, 16 para NF4.',
            },
          ],
        },
      },
      'en-us': {
        tabs: [{ label: 'Visual' }, { label: 'Code' }],
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
        codePanel: {
          title: 'Uniform quantization simulation',
          description: 'The `quantize` function implements S, Z, clamp, and dequantization. Compare INT8 vs NF4 on simulated weights.',
          source: { snippetId: 'transformers/quantization-theory-formula', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 2],
              content: 'We import `torch` for tensor operations and `math` for constants.',
            },
            {
              lineRange: [4, 6],
              content: 'We create 1000 synthetic weights following a normal distribution N(0, 0.1) — similar to real LLM weights after training.',
            },
            {
              lineRange: [8, 15],
              content: 'The `quantize` function implements the core equation: computes `S` (scale), `Z` (zero-point), quantizes, and then recovers the approximation.',
            },
            {
              lineRange: [17, 19],
              content: 'We quantize in INT8 (8 bits, 256 levels) and measure the MSE — the error between original and recovered weights.',
            },
            {
              lineRange: [21, 23],
              content: 'With 4 bits (16 levels), MSE increases but is still small — showing why NF4 works so well.',
            },
            {
              lineRange: [25, 26],
              content: 'We print the original range and the number of levels: 256 for INT8, 16 for NF4.',
            },
          ],
        },
      },
    },
  },
});
