import { defineSlide } from './_factory';

export const gpt2WeThePeopleInput = defineSlide({
  id: 'gpt2-we-the-people-input',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: '`We the people` vira supervisão',
      body: `Antes de existir atenção, bloco ou logits, existe um contrato simples de dados.

O texto cru precisa virar IDs inteiros:

\`\`\`txt
"We the people" -> [1135, 262, 661]
\`\`\`

Para treino, o mesmo vetor gera dois tensores:

- \`inputs = idx[:, :-1]\`: contexto visível
- \`targets = idx[:, 1:]\`: próximo token correto

Isso é a mesma lógica de language modeling vista antes, agora no exemplo que vamos carregar para dentro do GPT-2.

O ponto didático: o modelo nunca recebe "significado" pronto. Ele recebe IDs e aprende a transformar esses IDs em representações úteis.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/we-the-people-input
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'Definimos texto, tokens e IDs fixos para manter o exemplo determinístico.' },
        { lineRange: [8, 10], content: '`idx` guarda a sequência completa; `inputs` e `targets` são a mesma sequência deslocada.' },
        { lineRange: [12, 16], content: 'Os prints conferem texto, tokens, shape `(1,T)` e os pares de supervisão.' },
      ],
    },
    'en-us': {
      title: '`We the people` becomes supervision',
      body: `Before attention, blocks, or logits exist, there is a simple data contract.

Raw text must become integer IDs:

\`\`\`txt
"We the people" -> [1135, 262, 661]
\`\`\`

For training, the same vector creates two tensors:

- \`inputs = idx[:, :-1]\`: visible context
- \`targets = idx[:, 1:]\`: correct next token

This is the same language-modeling logic from earlier, now in the example we will carry into GPT-2.

Teaching point: the model never receives ready-made "meaning". It receives IDs and learns to turn those IDs into useful representations.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/we-the-people-input
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'We define text, tokens, and fixed IDs to keep the example deterministic.' },
        { lineRange: [8, 10], content: '`idx` stores the full sequence; `inputs` and `targets` are the same sequence shifted.' },
        { lineRange: [12, 16], content: 'The prints verify text, tokens, `(1,T)` shape, and the supervision pairs.' },
      ],
    },
  },
});
