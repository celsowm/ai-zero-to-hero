import { defineSlide } from './_factory';

export const gpt2PytorchE2eDebugger = defineSlide({
  id: 'gpt2-pytorch-e2e-debugger',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Debug ponta a ponta por shapes',
      body: `Se o modelo quebrar, o jeito mais rápido de voltar ao controle é imprimir shapes nas etapas críticas.

(B=lote, T=tempo/comprimento da sequência, C=largura da representação interna, V=tamanho do vocabulário)

Sequência útil:

1. input IDs
2. token embedding
3. soma com posição
4. saída de cada bloco
5. logits finais

Sequência de depuração recomendada:
- valide dtype/range de \`idx\` primeiro
- confirme \`(B, T, C)\` após embeddings
- localize o primeiro bloco que quebra contrato
- confirme retorno final em \`(B, T, V)\`

Quando passar para debug numérico:
- depois que todos os shapes fecharem
- e quando o problema virar NaN, escala absurda ou logits sem sentido

Regra prática: depure por contrato de shape antes de depurar por valor numérico.`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/e2e-trace
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'O trace começa no batch de entrada e confirma a primeira soma de embeddings.' },
        { lineRange: [8, 10], content: 'Imprimir cada bloco ajuda a localizar rapidamente onde um shape sai do contrato.' },
        { lineRange: [12, 13], content: 'O final do trace confirma se o modelo voltou a `(B, T, V)`.' },
      ],
    },
    'en-us': {
      title: 'End-to-end debugging through shapes',
      body: `When the model breaks, the fastest way back to control is to print shapes at the critical stages.

(B=batch size, T=sequence length, C=representation/hidden width, V=vocabulary size)

Useful sequence:

1. input IDs
2. token embedding
3. add position
4. output of each block
5. final logits

Recommended debugging sequence:
- validate \`idx\` dtype/range first
- confirm \`(B, T, C)\` after embeddings
- find the first block that breaks contract
- confirm final return to \`(B, T, V)\`

When to move into numeric debugging:
- after every shape contract closes
- and when the problem becomes NaNs, exploding scales, or meaningless logits

Practical rule: debug shape contracts before debugging numeric values.`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/e2e-trace
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'The trace starts at the input batch and confirms the first embedding sum.' },
        { lineRange: [8, 10], content: 'Printing each block makes it fast to locate where a shape leaves the contract.' },
        { lineRange: [12, 13], content: 'The end of the trace confirms whether the model returned to `(B, T, V)`.' },
      ],
    },
  },
});
