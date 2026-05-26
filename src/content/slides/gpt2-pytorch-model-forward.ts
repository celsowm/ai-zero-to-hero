import { defineSlide } from './_factory';

export const gpt2PytorchModelForward = defineSlide({
  id: 'gpt2-pytorch-model-forward',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'GPT.forward(): embeddings, blocos, logits e loss',
      body: `Agora juntamos tudo no modelo GPT.

A classe GPT tem:

1. token embedding
2. position embedding
3. dropout
4. lista de \`TransformerBlock\`
5. LayerNorm final
6. LM head
7. loss opcional quando \`targets\` existe

Contrato:
- \`idx: (B,T)\`
- \`logits: (B,T,V)\`
- \`targets: (B,T)\`
- \`loss: escalar\`

Aqui \`logits\` significa logits do vocabulário. Eles aparecem depois de:

\`\`\`txt
residual stream -> blocos attn/MLP -> ln_f -> lm_head
\`\`\`

Não confunda com os attention logits internos de cada head, que vêm de \`Q @ K.T\` e só escolhem pesos entre posições.

Pontos críticos:
- \`idx\` precisa ser \`torch.long\`
- \`idx.max()\` precisa ser menor que \`vocab_size\`
- \`T <= block_size\`
- \`pos_emb[None,:,:]\` faz broadcast para \`(B,T,C)\`
- \`ModuleList\` registra blocos para o optimizer
- cross-entropy exige \`(B*T,V)\` e \`(B*T,)\``,
      rightBody: `\`\`\`python
snippet:gpt2_manual/model-forward
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 29], content: '`__init__` registra embeddings, dropout, blocos, norma final, `lm_head` e weight tying opcional.' },
        { lineRange: [30, 45], content: '`forward` valida contexto, cria posições, soma embeddings e aplica dropout no residual stream inicial.' },
        { lineRange: [46, 51], content: 'A pilha de blocos preserva `(B,T,C)`, a norma final estabiliza e o `lm_head` projeta para `(B,T,V)`.' },
        { lineRange: [52, 61], content: 'Quando há targets, a cross-entropy achata logits e targets para produzir uma loss escalar.' },
      ],
    },
    'en-us': {
      title: 'GPT.forward(): embeddings, blocks, logits, and loss',
      body: `Now we assemble everything in the GPT model.

The GPT class has:

1. token embedding
2. position embedding
3. dropout
4. list of \`TransformerBlock\`
5. final LayerNorm
6. LM head
7. optional loss when \`targets\` exists

Contract:
- \`idx: (B,T)\`
- \`logits: (B,T,V)\`
- \`targets: (B,T)\`
- \`loss: scalar\`

Here \`logits\` means vocabulary logits. They appear after:

\`\`\`txt
residual stream -> attn/MLP blocks -> ln_f -> lm_head
\`\`\`

Do not confuse these with the internal attention logits in each head, which come from \`Q @ K.T\` and only choose weights between positions.

Critical points:
- \`idx\` must be \`torch.long\`
- \`idx.max()\` must be below \`vocab_size\`
- \`T <= block_size\`
- \`pos_emb[None,:,:]\` broadcasts to \`(B,T,C)\`
- \`ModuleList\` registers blocks for the optimizer
- cross-entropy expects \`(B*T,V)\` and \`(B*T,)\``,
      rightBody: `\`\`\`python
snippet:gpt2_manual/model-forward
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 29], content: '`__init__` registers embeddings, dropout, blocks, final norm, `lm_head`, and optional weight tying.' },
        { lineRange: [30, 45], content: '`forward` validates context, creates positions, adds embeddings, and applies dropout to the initial residual stream.' },
        { lineRange: [46, 51], content: 'The block stack preserves `(B,T,C)`, final norm stabilizes, and `lm_head` projects to `(B,T,V)`.' },
        { lineRange: [52, 61], content: 'When targets exist, cross-entropy flattens logits and targets to produce one scalar loss.' },
      ],
    },
  },
});
