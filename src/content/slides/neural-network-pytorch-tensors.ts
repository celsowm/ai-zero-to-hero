import { defineSlide } from './_factory';

export const neuralNetworkPytorchTensors = defineSlide({
  id: 'neural-network-pytorch-tensors',
  type: 'two-column',
  options: { columnRatios: [0.38, 0.62] },
  content: {
    'pt-br': {
      title: 'Shapes no PyTorch: B, F, H, O',
      body: `No slide anterior, vimos **rank** e **shape**: contar eixos, ler dimensões e entender que cada número no shape tem um papel. Agora aplicamos essa leitura ao mesmo exemplo dos pacientes: **qual é o shape esperado em cada ponto da rede?**

Antes de falar de texto, token e vocabulário, vale fechar o caso mais simples: uma rede tabular.

Neste exemplo, cada linha é um paciente. Cada coluna é uma informação sobre ele.

### O contrato do exemplo

- **B = batch**: quantos exemplos entram juntos.
- **F = features**: quantas colunas descrevem cada exemplo.
- **H = hidden width**: quantos neurônios/valores existem na camada intermediária.
- **O = output width**: quantos valores o modelo devolve por exemplo.

No nosso código:

- \`X\` tem shape \`(6, 4)\` → **6 pacientes**, **4 features**.
- \`y\` tem shape \`(6, 1)\` → **6 respostas**, **1 alvo por paciente**.
- \`nn.Linear(4, 3)\` faz \`(B, F) -> (B, H)\`.
- \`nn.Linear(3, 1)\` faz \`(B, H) -> (B, O)\`.

A ideia importante: **B costuma atravessar a rede inteiro**. O modelo transforma a descrição de cada exemplo, mas continua devolvendo uma saída para cada item do batch.

### Leitura operacional

\`X (B,F) -> hidden (B,H) -> y_hat (B,O)\`

No exemplo real:

\`X (6,4) -> hidden (6,3) -> y_hat (6,1)\`

Esse slide prepara a ponte: em modelo de linguagem, o batch continua existindo, mas entra um novo eixo entre B e a largura interna: o eixo da sequência.`,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Começamos nomeando as siglas do contrato: B, F, H e O. A partir daqui, o número bruto vira papel semântico.' },
        { lineRange: [13, 25], content: '`X` é `(B, F)`: cada linha é um paciente e cada coluna é uma feature. `y` é `(B, O)`: uma resposta por paciente.' },
        { lineRange: [27, 33], content: 'A arquitetura vira leitura de shape: `Linear(F, H)` transforma `(B, F)` em `(B, H)`; `Linear(H, O)` transforma `(B, H)` em `(B, O)`.' },
        { lineRange: [35, 45], content: 'Durante o treino, `model(X)` preserva o batch: entram 6 pacientes e saem 6 previsões.' },
        { lineRange: [47, 52], content: 'Na inferência, um paciente sozinho ainda é batch: shape `(1, F)`, não apenas `(F)`.' },
        { lineRange: [54, 59], content: 'Os prints finais deixam o contrato visível: shapes e `.ndim` confirmam que `X`, `y` e o paciente novo continuam sendo tensores 2D.' },
      ],
    },
    'en-us': {
      title: 'Shapes in PyTorch: B, F, H, O',
      body: `In the previous slide, we covered **rank** and **shape**: counting axes, reading dimensions, and understanding that each number in a shape has a role. Now we apply that reading to the same patient example: **what shape is expected at each point in the network?**

Before talking about text, tokens, and vocabulary, it is worth closing the simpler case: a tabular network.

In this example, each row is a patient. Each column is one piece of information about that patient.

### The example contract

- **B = batch**: how many examples enter together.
- **F = features**: how many columns describe each example.
- **H = hidden width**: how many neurons/values exist in the intermediate layer.
- **O = output width**: how many values the model returns per example.

In our code:

- \`X\` has shape \`(6, 4)\` → **6 patients**, **4 features**.
- \`y\` has shape \`(6, 1)\` → **6 answers**, **1 target per patient**.
- \`nn.Linear(4, 3)\` maps \`(B, F) -> (B, H)\`.
- \`nn.Linear(3, 1)\` maps \`(B, H) -> (B, O)\`.

The key idea: **B usually travels through the network unchanged**. The model transforms each example's description, but it still returns one output per item in the batch.

### Operational reading

\`X (B,F) -> hidden (B,H) -> y_hat (B,O)\`

In the actual example:

\`X (6,4) -> hidden (6,3) -> y_hat (6,1)\`

This prepares the bridge: in a language model, the batch still exists, but a new axis appears between B and the internal width: the sequence axis.`,
      codeExplanations: [
        { lineRange: [1, 11], content: 'We start by naming the contract letters: B, F, H, and O. From here on, raw numbers get semantic roles.' },
        { lineRange: [13, 25], content: '`X` is `(B, F)`: each row is a patient and each column is a feature. `y` is `(B, O)`: one answer per patient.' },
        { lineRange: [27, 33], content: 'The architecture becomes shape reading: `Linear(F, H)` maps `(B, F)` to `(B, H)`; `Linear(H, O)` maps `(B, H)` to `(B, O)`.' },
        { lineRange: [35, 45], content: 'During training, `model(X)` preserves the batch: 6 patients enter and 6 predictions come out.' },
        { lineRange: [47, 52], content: 'At inference time, one patient is still a batch: shape `(1, F)`, not just `(F)`.' },
        { lineRange: [54, 59], content: 'The final prints make the contract visible: shapes and `.ndim` confirm that `X`, `y`, and the new patient remain 2D tensors.' },
      ],
    },
  },
  visual: {
    id: 'sequential-shape-flow',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Fluxo de Shapes' }],
        codePanel: {
          title: 'Contrato de shapes em PyTorch',
          description: 'Código completo do exemplo dos pacientes: B=6, F=4, H=3, O=1 com Sequential + Sigmoid.',
          source: { snippetId: 'pytorch-lm/patient-shape-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 11], content: 'Começamos nomeando as siglas do contrato: B, F, H e O.' },
            { lineRange: [13, 25], content: '`X` é `(B, F)` — 6 pacientes × 4 features. `y` é `(B, O)` — 6 respostas.' },
            { lineRange: [27, 33], content: 'A arquitetura: `Linear(4, 3)` → Sigmoid → `Linear(3, 1)` → Sigmoid.' },
            { lineRange: [35, 45], content: 'Treino: `model(X)` preserva o batch, 6 pacientes entram e 6 saem.' },
            { lineRange: [47, 52], content: 'Inferência: um paciente sozinho é `(1, F)`.' },
            { lineRange: [54, 59], content: 'Prints finais que conferem shapes e `.ndim`: todos continuam com dois eixos.' },
          ],
        },
        flowPanel: {
          eyebrow: 'Pipeline de Shapes',
          title: 'Fluxo: do dado à previsão',
          description: 'Veja como o shape muda a cada camada do `nn.Sequential`. Navegue pelos passos para ver a transformação 3D dos tensores.',
          previousLabel: 'Anterior',
          nextLabel: 'Próximo',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Shape Flow' }],
        codePanel: {
          title: 'Shape contract in PyTorch',
          description: 'Complete code for the patient example: B=6, F=4, H=3, O=1 with Sequential + Sigmoid.',
          source: { snippetId: 'pytorch-lm/patient-shape-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 11], content: 'We start by naming the contract letters: B, F, H, and O.' },
            { lineRange: [13, 25], content: '`X` is `(B, F)` — 6 patients × 4 features. `y` is `(B, O)` — 6 answers.' },
            { lineRange: [27, 33], content: 'Architecture: `Linear(4, 3)` → Sigmoid → `Linear(3, 1)` → Sigmoid.' },
            { lineRange: [35, 45], content: 'Training: `model(X)` preserves the batch, 6 patients in, 6 out.' },
            { lineRange: [47, 52], content: 'Inference: a single patient is `(1, F)`.' },
            { lineRange: [54, 59], content: 'Final prints verify shapes and `.ndim`: all remain two-axis tensors.' },
          ],
        },
        flowPanel: {
          eyebrow: 'Shape Pipeline',
          title: 'Flow: from data to prediction',
          description: 'See how the shape changes at each layer of `nn.Sequential`. Step through to visualize the 3D tensor transformation.',
          previousLabel: 'Previous',
          nextLabel: 'Next',
        },
      },
    },
  },
});
