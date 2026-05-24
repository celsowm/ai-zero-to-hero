import { defineSlide } from './_factory';

export const buildGpt2Intro = defineSlide({
  id: 'build-gpt2-intro',
  type: 'two-column',
  options: { columnRatios: [0.58, 0.42] },
  content: {
    'pt-br': {
      title: 'Construindo um GPT pequeno em PyTorch',
      body: `Agora vamos sair da explicação e construir.

Não vamos começar com dataset gigante. Não vamos esconder a arquitetura atrás de uma biblioteca. E antes do treino vamos conectar um dataset real do Hugging Face ao mesmo contrato de token stream.

Vamos montar um GPT pequeno em PyTorch puro, peça por peça.

A ordem será:

1. definir a config
2. transformar texto em token stream
3. inspecionar dataset real do Hugging Face
4. normalizar texto para token stream
5. cortar batches \`x/y\`
6. criar embeddings de token e posição
7. implementar QKV
8. separar heads
9. implementar atenção causal
10. implementar MLP
11. montar \`TransformerBlock\`
12. montar \`GPT.forward()\`
13. calcular cross-entropy
14. treinar com AdamW
15. gerar texto token a token
16. depurar por shape, dtype, device e NaN

A meta não é treinar um modelo grande. A meta é entender cada engrenagem.`,
      rightBody: `\`\`\`txt
texto
-> token stream
-> HF dataset normalizado
-> get_batch
-> GPT
-> logits
-> loss
-> backward
-> optimizer.step
-> generate
\`\`\``,
    },
    'en-us': {
      title: 'Building a small GPT in PyTorch',
      body: `Now we move from explanation into construction.

We will not start with a huge dataset. We will not hide the architecture behind a library. And before training we will connect a real Hugging Face dataset to the same token-stream contract.

We will build a small GPT in pure PyTorch, piece by piece.

The order will be:

1. define the config
2. turn text into a token stream
3. inspect a real Hugging Face dataset
4. normalize text into a token stream
5. slice \`x/y\` batches
6. create token and position embeddings
7. implement QKV
8. split heads
9. implement causal attention
10. implement the MLP
11. assemble \`TransformerBlock\`
12. assemble \`GPT.forward()\`
13. compute cross-entropy
14. train with AdamW
15. generate text token by token
16. debug by shape, dtype, device, and NaN

The goal is not to train a large model. The goal is to understand each moving part.`,
      rightBody: `\`\`\`txt
text
-> token stream
-> normalized HF dataset
-> get_batch
-> GPT
-> logits
-> loss
-> backward
-> optimizer.step
-> generate
\`\`\``,
    },
  },
});
