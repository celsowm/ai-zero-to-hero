import { defineSlide } from './_factory';

export const pytorchAutograd = defineSlide({
  id: 'pytorch-autograd',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Autograd no treino real',
      body: `Aqui Autograd sai da teoria e vira mecanismo de treino.

O ponto central e simples: **a loss calcula o erro; o backward distribui esse erro para cada parametro**.

Leitura de engenheiro:
1. voce produz logits (scores brutos).
2. compara com target via \`cross_entropy\`.
3. roda \`loss.backward()\`.
4. inspeciona gradiente para verificar direcao do update.

No LM, essa etapa responde: "quais pesos devem mudar para o token correto subir e os errados descerem?".

Sem esse ciclo claro, qualquer otimizador vira caixa-preta.`,
    },
    'en-us': {
      title: 'Autograd inside the real training loop',
      body: `Autograd stops being theory here and becomes training mechanism.

Core point: **loss measures error; backward distributes that error across parameters**.

Engineer reading:
1. produce logits (raw scores).
2. compare against target through \`cross_entropy\`.
3. run \`loss.backward()\`.
4. inspect gradients to verify update direction.

In LM training, this answers: "which weights must move so the correct token score goes up and the wrong ones go down?".

Without this loop being explicit, any optimizer becomes a black box.`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Checklist' }],
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
          title: 'Checklist de depuracao de gradiente',
          items: [
            { label: 'requires_grad', value: 'Sem isso, backward nao propaga para o tensor.' },
            { label: 'loss escalar', value: 'A loss precisa ser escalar para backward direto.' },
            { label: 'grad nao nulo', value: 'Se gradiente vier zero sempre, revisar logits/targets e saturacao.' },
            { label: 'sinal coerente', value: 'Gradiente deve empurrar score correto para cima no update.' },
          ],
          footer: 'Primeiro valide gradiente. Depois discuta hiperparametro.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Checklist' }],
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
          title: 'Gradient debugging checklist',
          items: [
            { label: 'requires_grad', value: 'Without it, backward does not propagate into the tensor.' },
            { label: 'scalar loss', value: 'Loss must be scalar for direct backward.' },
            { label: 'non-zero grad', value: 'If gradient is always zero, inspect logits/targets and saturation.' },
            { label: 'coherent sign', value: 'Gradient should push the correct score upward after update.' },
          ],
          footer: 'Validate gradients first. Tune hyperparameters second.',
        },
      },
    },
  },
});
