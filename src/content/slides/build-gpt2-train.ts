import { defineSlide } from './_factory';

export const buildGpt2Train = defineSlide({
  id: 'build-gpt2-train',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'Loop de treino: get_batch -> loss -> backward -> AdamW',
      body: `Agora treinamos o GPT pequeno.

Neste ponto, \`train_data\` não vem do vento: ele veio do token stream criado a partir do dataset real do Hugging Face, ou de um corpus didático usado só para smoke test.

Cada passo faz:

1. sortear um batch \`x/y\` do token stream
2. mover \`x/y\` para o device
3. rodar \`model(x, y)\`
4. zerar gradientes
5. backpropagar loss
6. cortar gradiente se necessário
7. atualizar pesos com AdamW
8. logar loss

Este é o loop mínimo realista.

Próximas melhorias, depois que esse loop funcionar:
- gradient accumulation
- scheduler warmup + cosine
- autocast bf16/fp16
- GradScaler para fp16
- checkpoint interval
- eval interval`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/train-loop
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Escolhemos device, movemos o modelo e criamos AdamW com os grupos de parâmetros já configurados.' },
        { lineRange: [13, 23], content: 'Cada step sorteia `x/y`, move dados para o mesmo device do modelo e calcula logits/loss.' },
        { lineRange: [25, 36], content: 'O update segue `zero_grad -> backward -> clip -> optimizer.step`, com log periódico da loss.' },
      ],
    },
    'en-us': {
      title: 'Training loop: get_batch -> loss -> backward -> AdamW',
      body: `Now we train the small GPT.

At this point, \`train_data\` does not appear from nowhere: it came from the token stream built from the real Hugging Face dataset, or from a didactic corpus used only for smoke tests.

Each step does:

1. sample an \`x/y\` batch from the token stream
2. move \`x/y\` to the device
3. run \`model(x, y)\`
4. zero gradients
5. backpropagate loss
6. clip gradients if needed
7. update weights with AdamW
8. log loss

This is the minimum realistic loop.

Next improvements, after this loop works:
- gradient accumulation
- warmup + cosine scheduler
- bf16/fp16 autocast
- GradScaler for fp16
- checkpoint interval
- eval interval`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/train-loop
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'We choose a device, move the model, and create AdamW with the configured parameter groups.' },
        { lineRange: [13, 23], content: 'Each step samples `x/y`, moves data to the same device as the model, and computes logits/loss.' },
        { lineRange: [25, 36], content: 'The update follows `zero_grad -> backward -> clip -> optimizer.step`, with periodic loss logging.' },
      ],
    },
  },
});
