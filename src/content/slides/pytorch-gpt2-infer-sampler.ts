import { defineSlide } from './_factory';

export const pytorchGpt2InferSampler = defineSlide({
  id: 'pytorch-gpt2-infer-sampler',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Sampler da geração',
      body: `Depois que o modelo foi treinado, ele não "escreve texto" diretamente. Para cada passo de geração, o GPT devolve logits: uma pontuação para cada token possível do vocabulário.

O papel do \`sampler.py\` é transformar esses logits no **próximo token escolhido**.

Existem duas formas principais de escolher. A primeira é greedy: pegar simplesmente o maior logit. A segunda é amostragem: transformar logits em probabilidades e sortear um token.

Mas antes de sortear, podemos filtrar candidatos. \`top_k\` mantém apenas os \`k\` tokens com maior pontuação. \`top_p\` mantém o menor conjunto de tokens cuja probabilidade acumulada passa de um limite. A temperatura controla o quão concentrada ou espalhada fica a distribuição.

A mensagem didática do slide é: **o modelo calcula logits; o sampler decide como converter logits em próximo token**. No projeto, \`sample_next_token\` recebe logits com shape \`(batch, vocab_size)\` e retorna IDs com shape \`(batch, 1)\`.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/infer-sampler
\`\`\``,
      codeExplanations: [
        { lineRange: [3, 4], content: 'Imports: `torch` e `torch.nn.functional` (softmax, multinomial).' },
        { lineRange: [7, 21], content: '`_apply_top_k`: recebe logits e `top_k`. Usa `torch.topk` para achar o corte do k-ésimo maior valor. Usa `torch.where` para podar tudo abaixo do corte com `float("-inf")`.' },
        { lineRange: [24, 57], content: '`_apply_top_p`: ordena logits decrescente, calcula softmax cumulativo, e cria máscara onde a probabilidade acumulada passa do limite `top_p`. Usa `scatter_` para remontar os logits originais com os valores podados.' },
        { lineRange: [60, 77], content: '`sample_next_token`: se `do_sample=False` ou `temperature=0`, faz argmax (greedy). Caso contrário, divide por temperatura, aplica filtros, softmax e `torch.multinomial` para sortear o próximo token.' },
      ],
    },
    'en-us': {
      title: 'Generation sampler',
      body: `After the model is trained, it doesn't "write text" directly. At each generation step, GPT returns logits: a score for each possible token in the vocabulary.

The role of \`sampler.py\` is to turn those logits into the **next chosen token**.

There are two main ways to choose. The first is greedy: simply take the highest logit. The second is sampling: turn logits into probabilities and draw a token.

But before sampling, we can filter candidates. \`top_k\` keeps only the \`k\` tokens with highest scores. \`top_p\` keeps the smallest set of tokens whose cumulative probability exceeds a threshold. Temperature controls how concentrated or spread out the distribution becomes.

The didactic message is: **the model computes logits; the sampler decides how to turn logits into the next token**. In the project, \`sample_next_token\` receives logits with shape \`(batch, vocab_size)\` and returns IDs with shape \`(batch, 1)\`.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/infer-sampler
\`\`\``,
      codeExplanations: [
        { lineRange: [3, 4], content: 'Imports: `torch` and `torch.nn.functional` (softmax, multinomial).' },
        { lineRange: [7, 21], content: '`_apply_top_k`: receives logits and `top_k`. Uses `torch.topk` to find the k-th highest cutoff. Uses `torch.where` to prune everything below the cutoff with `float("-inf")`.' },
        { lineRange: [24, 57], content: '`_apply_top_p`: sorts logits descending, computes cumulative softmax, and masks where cumulative probability exceeds the `top_p` threshold. Uses `scatter_` to reconstruct original logits with pruned values.' },
        { lineRange: [60, 77], content: '`sample_next_token`: if `do_sample=False` or `temperature=0`, does argmax (greedy). Otherwise divides by temperature, applies filters, softmax, and `torch.multinomial` to draw the next token.' },
      ],
    },
  },
});
