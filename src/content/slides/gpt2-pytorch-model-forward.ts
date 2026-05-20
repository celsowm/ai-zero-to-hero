import { defineSlide } from './_factory';

export const gpt2PytorchModelForward = defineSlide({
  id: 'gpt2-pytorch-model-forward',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Forward completo do GPT',
      body: `O contrato central do repo é: **\`forward(idx, targets=None)\`**.

Dentro dele, o fluxo é:

1. embeddings + posição
2. dropout
3. pilha de blocos
4. \`ln_f\` (LayerNorm final)
5. \`lm_head\` (camada final de logits)
6. loss opcional

Assinatura pratica:
- entrada: \`idx (B, T)\`
- saida base: \`logits (B, T, V)\`
- saida treino: \`(logits, loss)\` quando \`targets\` existe

Ponto critico:
- sem \`targets\`, o forward devolve so logits para inferencia/geracao
- com \`targets\`, o forward tambem fecha a loss para treino
- treino usa todas as posicoes em paralelo
- geracao usa apenas \`logits[:, -1, :]\`

Ponte com PyTorch anterior: a mecanica de treino continua \`forward -> loss -> backward -> step\`; a mudanca de dominio aqui e trocar MSE por CE sobre vocabulario.`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/model-forward
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'A assinatura já mostra a dupla que interessa: logits sempre; loss só quando há targets.' },
        { lineRange: [6, 14], content: 'O forward transforma `(B, T)` em residual stream, atravessa os blocos e projeta de volta para o vocabulário.' },
        { lineRange: [15, 16], content: 'Quando há targets, a cross-entropy fecha o contrato de treino (mesmo papel estrutural do MSE em regressao).' },
      ],
    },
    'en-us': {
      title: 'The full GPT forward pass',
      body: `The central contract in the repo is: **\`forward(idx, targets=None)\`**.

Inside it, the flow is:

1. embeddings + position
2. dropout
3. stack of blocks
4. \`ln_f\` (final LayerNorm)
5. \`lm_head\` (final logits layer)
6. optional loss

Practical signature:
- input: \`idx (B, T)\`
- base output: \`logits (B, T, V)\`
- training output: \`(logits, loss)\` when \`targets\` is provided

Critical distinction:
- without \`targets\`, forward returns logits only for inference/generation
- with \`targets\`, forward also closes the training loss
- training consumes all positions in parallel
- generation consumes only \`logits[:, -1, :]\`

Bridge to earlier PyTorch slides: training mechanics remain \`forward -> loss -> backward -> step\`; the domain shift here is replacing MSE with vocabulary-level CE.`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/model-forward
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'The signature already exposes the key pair: logits always; loss only when targets exist.' },
        { lineRange: [6, 14], content: 'The forward pass turns `(B, T)` into a residual stream, crosses the blocks, and projects back into vocabulary space.' },
        { lineRange: [15, 16], content: 'When targets exist, cross-entropy closes the training contract (same structural role MSE had in regression).' },
      ],
    },
  },
});
