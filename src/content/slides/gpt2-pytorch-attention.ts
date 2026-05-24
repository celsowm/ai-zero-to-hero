import { defineSlide } from './_factory';

export const gpt2PytorchAttention = defineSlide({
  id: 'gpt2-pytorch-attention',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'CausalSelfAttention: a classe completa',
      body: `Agora vamos escrever a atenção causal usada no GPT.

A classe precisa fazer seis coisas:

1. projetar \`x\` de \`C\` para \`3C\`
2. separar \`Q\`, \`K\` e \`V\`
3. reorganizar cada tensor em heads
4. chamar \`scaled_dot_product_attention\` com \`is_causal=True\`
5. juntar as heads de volta
6. projetar a saída para \`C\`

Contrato:
- entrada: \`(B,T,C)\`
- saída: \`(B,T,C)\`

Esse contrato precisa fechar para o residual funcionar.

Erros comuns:
- \`n_embd\` não divisível por \`n_head\`
- esquecer \`transpose\`
- esquecer \`contiguous\` antes de \`view\`
- usar dropout durante \`eval\`
- softmax no eixo errado se implementar manualmente`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/attention
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 27], content: '`__init__` configura heads, dimensão por head, projeção QKV, projeção de saída e dropout residual.' },
        { lineRange: [28, 37], content: '`forward` lê `B,T,C`, cria `qkv`, separa `q,k,v` e reorganiza tudo para `(B,H,T,D)`.' },
        { lineRange: [38, 48], content: '`scaled_dot_product_attention` aplica atenção causal e desliga dropout quando o módulo está em avaliação.' },
        { lineRange: [49, 51], content: 'As heads são juntadas de volta, projetadas para `C` e retornam no contrato `(B,T,C)`.' },
      ],
    },
    'en-us': {
      title: 'CausalSelfAttention: the full class',
      body: `Now we write the causal attention used in GPT.

The class must do six things:

1. project \`x\` from \`C\` to \`3C\`
2. split \`Q\`, \`K\`, and \`V\`
3. reorganize each tensor into heads
4. call \`scaled_dot_product_attention\` with \`is_causal=True\`
5. join heads back together
6. project output back to \`C\`

Contract:
- input: \`(B,T,C)\`
- output: \`(B,T,C)\`

This contract must close for residual addition to work.

Common errors:
- \`n_embd\` not divisible by \`n_head\`
- forgetting \`transpose\`
- forgetting \`contiguous\` before \`view\`
- using dropout during \`eval\`
- softmax on the wrong axis when implementing manually`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/attention
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 27], content: '`__init__` configures heads, per-head width, QKV projection, output projection, and residual dropout.' },
        { lineRange: [28, 37], content: '`forward` reads `B,T,C`, creates `qkv`, splits `q,k,v`, and reshapes everything into `(B,H,T,D)`.' },
        { lineRange: [38, 48], content: '`scaled_dot_product_attention` applies causal attention and disables dropout when the module is in eval mode.' },
        { lineRange: [49, 51], content: 'Heads are joined back together, projected to `C`, and returned in the `(B,T,C)` contract.' },
      ],
    },
  },
});
