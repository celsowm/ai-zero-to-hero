import { defineSlide } from './_factory';

export const buildGpt2Model = defineSlide({
  id: 'build-gpt2-model',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'O modelo monta? Teste o forward antes de treinar',
      body: `Antes de treinar, precisamos confirmar que o modelo fecha o contrato.

Não adianta mexer em optimizer, learning rate ou dataset se o forward ainda quebra.

Teste mínimo:

1. criar uma config pequena
2. instanciar o GPT
3. criar \`idx\` aleatório
4. rodar \`model(idx, idx)\`
5. confirmar logits em \`(B,T,V)\`
6. confirmar loss escalar

Saída esperada:

\`\`\`txt
logits: torch.Size([2, 16, 256])
loss: tensor(...)
\`\`\`

Se esse teste não passa, o problema ainda é arquitetura/shape. Só passe para treino depois que o forward fechar.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/model-smoke-test
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 12], content: 'A config pequena fixa vocabulário, contexto, camadas, heads e largura para um teste barato.' },
        { lineRange: [14, 23], content: 'Instanciamos o modelo e criamos `idx` aleatório dentro do vocabulário, com dtype `torch.long`.' },
        { lineRange: [25, 27], content: 'O forward com targets deve devolver logits `(2,16,256)` e uma loss escalar.' },
      ],
    },
    'en-us': {
      title: 'Does the model assemble? Test forward before training',
      body: `Before training, we need to confirm that the model closes its contract.

There is no point tuning optimizer, learning rate, or dataset if forward still breaks.

Minimal test:

1. create a small config
2. instantiate GPT
3. create random \`idx\`
4. run \`model(idx, idx)\`
5. confirm logits in \`(B,T,V)\`
6. confirm scalar loss

Expected output:

\`\`\`txt
logits: torch.Size([2, 16, 256])
loss: tensor(...)
\`\`\`

If this test does not pass, the issue is still architecture/shape. Move to training only after forward closes.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/model-smoke-test
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 12], content: 'The small config fixes vocabulary, context, layers, heads, and width for a cheap test.' },
        { lineRange: [14, 23], content: 'We instantiate the model and create random `idx` inside the vocabulary, with `torch.long` dtype.' },
        { lineRange: [25, 27], content: 'Forward with targets should return logits `(2,16,256)` and one scalar loss.' },
      ],
    },
  },
});
