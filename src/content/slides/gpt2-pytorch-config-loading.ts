import { defineSlide } from './_factory';

export const gpt2PytorchConfigLoading = defineSlide({
  id: 'gpt2-pytorch-config-loading',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Passo 1: Config + ByteTokenizer',
      body: `A construção manual começa definindo o contrato do modelo e transformando texto em IDs com um tokenizer simples.

Números que controlam o GPT:

- \`vocab_size\`
- \`block_size\`
- \`n_layer\`
- \`n_head\`
- \`n_embd\`

Relações que precisam fechar:
- \`n_embd % n_head == 0\` para permitir split por head
- \`idx.max() < vocab_size\` para não quebrar embedding lookup
- contexto de inferência \`<= block_size\`

Esse passo já valida o básico: prompt em texto -> IDs numéricos -> configuração coerente para a arquitetura.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/config
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'Importamos o contrato de arquitetura e o ByteTokenizer usados no fluxo manual.' },
        { lineRange: [5, 11], content: 'Tokenizamos o prompt e montamos o tensor `(B, T)` de entrada.' },
        { lineRange: [12, 22], content: 'Criamos a configuração do GPT com os hiperparâmetros principais do modelo.' },
        { lineRange: [24, 24], content: 'A asserção garante a relação `C = H x D` antes de seguir para QKV.' },
      ],
    },
    'en-us': {
      title: 'Step 1: Config + ByteTokenizer',
      body: `Manual construction starts by defining the model contract and turning text into IDs with a simple tokenizer.

Numbers that control GPT:

- \`vocab_size\`
- \`block_size\`
- \`n_layer\`
- \`n_head\`
- \`n_embd\`

Relations that must hold:
- \`n_embd % n_head == 0\` so head splitting is valid
- \`idx.max() < vocab_size\` so embedding lookup stays in range
- inference context length \`<= block_size\`

This step already validates the basics: text prompt -> numeric IDs -> coherent config for the architecture.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/config
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'We import the architecture contract and ByteTokenizer used in the manual path.' },
        { lineRange: [5, 11], content: 'We tokenize the prompt and build the `(B, T)` input tensor.' },
        { lineRange: [12, 22], content: 'We create GPT config with the core model hyperparameters.' },
        { lineRange: [24, 24], content: 'The assertion enforces `C = H x D` before moving to QKV.' },
      ],
    },
  },
});

