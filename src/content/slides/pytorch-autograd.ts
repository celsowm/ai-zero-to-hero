import { defineSlide } from './_factory';

export const pytorchAutograd = defineSlide({
  id: 'pytorch-autograd',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Autograd: o que é, por que esse nome, e como entra no treino',
      body: `Lembra do slide de backpropagation, onde derivamos \`sigmoid\`, calculamos \`delta_out\`, \`delta_h\` e atualizamos cada peso na unha? No PyTorch, **todo esse trabalho manual vira uma chamada so**: \`loss.backward()\`.

Ponte com os slides anteriores: no bloco de regressao, o alvo escalar era minimizado com **MSE**; aqui, no LM, o papel continua igual (gerar sinal para backward), mas o criterio tipico vira **CE (cross-entropy)** por token.

**Autograd** = *automatic differentiation* (diferenciação automática). O nome é direto: **auto**matic **grad**ient — o motor calcula gradientes sozinho, sem você derivar nada à mão.

Imagine que cada operação matemática que você faz (soma, multiplicação, ReLU) é anotada em um **"caderno" secreto** pelo PyTorch:

- **No Forward:** ele registra o que foi feito.
- **No Backward:** ele lê esse caderno de trás para frente e aplica a **Regra da Cadeia** automaticamente para calcular todos os gradientes.

Mini caso operacional:
- sem \`zero_grad()\`, o passo 2 soma gradiente do passo 1
- com \`zero_grad()\`, cada backward representa so o batch atual

Sem Autograd, voce teria que derivar e implementar manualmente o backward de cada operacao — exatamente como fizemos no exemplo manual.`,
    },
    'en-us': {
      title: 'Autograd: what it is, why this name, and where it enters training',
      body: `Remember the backpropagation slide, where we derived \`sigmoid\`, computed \`delta_out\`, \`delta_h\`, and updated each weight by hand? In PyTorch, **all that manual work becomes a single call**: \`loss.backward()\`.

Bridge to earlier slides: in the regression block, the scalar objective was minimized with **MSE**; here in LM, the role is the same (produce backward signal), but the typical criterion becomes per-token **CE (cross-entropy)**.

**Autograd** = *automatic differentiation*. The name says it all: **auto**matic **grad**ient — the engine computes gradients on its own, no manual derivation needed.

Imagine that every math operation you perform (addition, multiplication, ReLU) gets annotated in a **"secret notebook"** by PyTorch:

- **On Forward:** it records what was done.
- **On Backward:** it reads that notebook backwards and applies the **Chain Rule** automatically to compute every gradient.

Operational mini-case:
- without \`zero_grad()\`, step 2 accumulates step 1 gradients
- with \`zero_grad()\`, each backward reflects only the current batch

Without Autograd, you would need to derive and implement backward for each operation manually — exactly what we did in the manual example.`,
    },
  },
  visual: {
    id: 'pytorch-autograd-3d',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Mecanica' }],
        codePanel: {
          title: 'Backward minimo',
          description: 'Exemplo reduzido de logits + target para ver claramente a formacao de gradiente.',
          source: { snippetId: 'pytorch-lm/autograd-step', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Criamos logits com gradiente habilitado e um target correto para isolar o backward.' },
            { lineRange: [7, 8], content: 'Cross-entropy mede erro (papel equivalente ao MSE na regressao) e `backward()` preenche gradientes.' },
            { lineRange: [10, 11], content: 'Loss e gradiente mostram a direcao do ajuste.' },
          ],
        },
        pipelinePanel: {
          title: 'Fluxo causal do gradiente',
          subtitle: 'Autograd não é um mistério escondido. É um encadeamento operacional: gravar operações, definir a loss e propagar derivadas.',
          steps: [
            { label: 'requires_grad', body: 'Tensores e parâmetros marcados entram no radar do motor automático de derivação.', risk: 'Se o tensor certo não participa, não adianta chamar backward depois.' },
            { label: 'forward trace', body: 'Cada operação relevante deixa um rastro no grafo dinâmico.', risk: 'Achar que o grafo existe “depois” da loss; ele começa a nascer durante o forward.' },
            { label: 'loss escalar', body: 'A cross-entropy concentra o erro em um número que vira origem da retropropagação; em regressao, esse mesmo papel era do MSE.', risk: 'Sem um objetivo escalar claro, o backward não sabe o que minimizar.' },
            { label: 'backward()', body: 'A regra da cadeia corre do fim para o começo e distribui sensibilidade pelos parâmetros conectados.', risk: 'Esperar que o optimizer funcione sem esse sinal ter sido populado em `.grad`.' },
            { label: 'buffer .grad', body: 'Cada parâmetro guarda quanto deve subir ou descer no próximo update.', risk: 'Esquecer que `.grad` acumula entre passos quando não é limpo.' },
          ],
          failureTitle: 'Onde a leitura quebra',
          failureModes: [
            { label: 'Sem gradiente', value: 'O tensor não entrou no grafo ou o caminho até a loss foi interrompido.' },
            { label: 'Escala estranha', value: 'Acúmulo antigo em `.grad` distorce o próximo update.' },
            { label: 'Debug errado', value: 'Ajustar learning rate antes de verificar se o gradiente está sendo formado corretamente.' },
          ],
          mentalModelTitle: 'Modelo mental',
          mentalModel: [
            'Forward grava operações relevantes.',
            'Loss define o alvo escalar da diferenciação.',
            'Backward preenche `.grad`; optimizer usa esse buffer depois.',
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
            { lineRange: [7, 8], content: 'Cross-entropy measures error (same role MSE had in regression) and `backward()` fills gradients.' },
            { lineRange: [10, 11], content: 'Loss and gradient expose update direction.' },
          ],
        },
        pipelinePanel: {
          title: 'Gradient causal flow',
          subtitle: 'Autograd is not hidden magic. It is an operational chain: record operations, define loss, propagate derivatives.',
          steps: [
            { label: 'requires_grad', body: 'Tensors and parameters marked for gradients enter the scope of automatic differentiation.', risk: 'If the right tensor never participates, calling backward later changes nothing.' },
            { label: 'forward trace', body: 'Each relevant operation leaves a trace in the dynamic graph.', risk: 'Assuming the graph appears only after loss; it starts forming during forward.' },
            { label: 'scalar loss', body: 'Cross-entropy concentrates error into one number that becomes the source of backpropagation; in regression, MSE played this same role.', risk: 'Without a clear scalar objective, backward has nothing coherent to minimize.' },
            { label: 'backward()', body: 'Chain rule runs from output back to inputs and distributes sensitivity through connected parameters.', risk: 'Expecting the optimizer to work before `.grad` has been populated.' },
            { label: 'buffer .grad', body: 'Each parameter stores how much it should move on the next update.', risk: 'Forgetting that `.grad` accumulates between steps unless cleared.' },
          ],
          failureTitle: 'Where reading breaks',
          failureModes: [
            { label: 'No gradient', value: 'The tensor never entered the graph or the path to loss was broken.' },
            { label: 'Weird scale', value: 'Old accumulation in `.grad` distorts the next update.' },
            { label: 'Wrong debug order', value: 'Tuning learning rate before verifying that gradients are being formed correctly.' },
          ],
          mentalModelTitle: 'Mental model',
          mentalModel: [
            'Forward records relevant operations.',
            'Loss defines the scalar differentiation target.',
            'Backward fills `.grad`; the optimizer consumes that buffer later.',
          ],
          footer: 'Practical order: debug graph/gradients first, then tune optimizer and learning rate.',
        },
      },
    },
  },
});
