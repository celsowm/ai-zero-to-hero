import { defineSlide } from './_factory';

export const pytorchAutograd = defineSlide({
  id: 'pytorch-autograd',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Autograd: o que é, por que esse nome, e como entra no treino',
      body: `**Autograd** = *automatic differentiation* (diferenciação automática).

Por que esse nome:
1. **auto**: o PyTorch calcula gradientes automaticamente.
2. **grad**: ele calcula derivadas parciais de cada parâmetro em relação à loss.

Mecânica real:
- no forward, o PyTorch registra operações em um grafo dinâmico;
- na loss, você define o escalar que quer minimizar;
- no \`backward()\`, o motor aplica regra da cadeia do fim para o começo.

Resultado prático: cada peso recebe um gradiente dizendo **direção e intensidade** de ajuste.

Mini caso operacional:
- sem \`zero_grad()\`, o passo 2 soma gradiente do passo 1
- com \`zero_grad()\`, cada backward representa so o batch atual

Sem Autograd, você teria que derivar e implementar manualmente o backward de cada operação.`,
    },
    'en-us': {
      title: 'Autograd: what it is, why this name, and where it enters training',
      body: `**Autograd** = *automatic differentiation*.

Why this name:
1. **auto**: PyTorch computes gradients automatically.
2. **grad**: it computes partial derivatives of each parameter w.r.t. loss.

Actual mechanics:
- in forward, PyTorch records operations into a dynamic graph;
- at loss, you define the scalar objective to minimize;
- at \`backward()\`, the engine applies chain rule from output back to inputs.

Practical outcome: each weight gets a gradient telling both **direction and magnitude** of update.

Operational mini-case:
- without \`zero_grad()\`, step 2 accumulates step 1 gradients
- with \`zero_grad()\`, each backward reflects only the current batch

Without Autograd, you would need to derive and implement backward for each operation manually.`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Mecanica' }],
        codePanel: {
          title: 'Backward minimo',
          description: 'Exemplo reduzido de logits + target para ver claramente a formacao de gradiente.',
          source: { snippetId: 'pytorch-lm/autograd-step', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Criamos logits com gradiente habilitado e um target correto para isolar o backward.' },
            { lineRange: [7, 8], content: 'Cross-entropy mede erro e `backward()` preenche gradientes.' },
            { lineRange: [10, 11], content: 'Loss e gradiente mostram a direcao do ajuste.' },
          ],
        },
        visualPanel: {
          title: 'Fluxo causal do gradiente',
          items: [
            { label: '1) Rastro do forward', value: 'Operações com `requires_grad=True` entram no grafo dinâmico.' },
            { label: '2) Nó final (loss)', value: 'Cross-entropy cria o escalar que concentra o erro do batch.' },
            { label: '3) Backward no grafo', value: 'Regra da cadeia propaga derivadas da loss para cada parâmetro conectado.' },
            { label: '4) Gradiente no tensor', value: '`.grad` guarda o quanto cada peso deve subir/descer na próxima atualização.' },
            { label: '5) Passo 1', value: 'Backward preenche `.grad` com o sinal do batch atual.' },
            { label: '6) Passo 2 sem zero_grad', value: 'Novo backward soma gradiente antigo e atual, alterando a escala do update.' },
            { label: '7) Passo 2 com zero_grad', value: 'O gradiente reflete so o batch corrente, como o loop normalmente espera.' },
          ],
          footer: 'Regra prática: debugue grafo/gradiente primeiro; só depois ajuste otimizador e learning rate.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Mechanics' }],
        codePanel: {
          title: 'Minimal backward pass',
          description: 'Reduced logits + target example to make gradient flow explicit.',
          source: { snippetId: 'pytorch-lm/autograd-step', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'We create logits with gradients enabled plus one correct target to isolate backward.' },
            { lineRange: [7, 8], content: 'Cross-entropy measures error and `backward()` fills gradients.' },
            { lineRange: [10, 11], content: 'Loss and gradient expose update direction.' },
          ],
        },
        visualPanel: {
          title: 'Gradient causal flow',
          items: [
            { label: '1) Forward trace', value: 'Operations with `requires_grad=True` are recorded in the dynamic graph.' },
            { label: '2) Final node (loss)', value: 'Cross-entropy creates the scalar objective that concentrates batch error.' },
            { label: '3) Graph backward', value: 'Chain rule propagates derivatives from loss to each connected parameter.' },
            { label: '4) Tensor gradient', value: '`.grad` stores how much each weight should move on the next update.' },
            { label: '5) Step 1', value: 'Backward fills `.grad` with the current batch signal.' },
            { label: '6) Step 2 without zero_grad', value: 'A new backward adds old and new gradients, changing update scale.' },
            { label: '7) Step 2 with zero_grad', value: 'Gradient reflects only the current batch, which is what the loop usually expects.' },
          ],
          footer: 'Practical order: debug graph/gradients first, then tune optimizer and learning rate.',
        },
      },
    },
  },
});
