import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLayers = defineSlide({
  id: 'neural-network-pytorch-nn-layers',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Camadas PyTorch que importam aqui',
      body: `A ideia deste slide nao e listar API. E te ensinar a **ler arquitetura PyTorch** sem se perder.

Quando voce abrir um modelo autoregressivo, quase tudo importante cai nestas seis pecas:

1. **\`nn.Module\`**: define o contrato da classe (\`__init__\` + \`forward\`).
2. **\`nn.Embedding\`**: troca IDs inteiros por vetores densos.
3. **\`nn.Linear\`**: projeta dimensoes (ex: \`C -> C\`, \`C -> V\`).
4. **\`nn.LayerNorm\`**: estabiliza escala dos hidden states.
5. **\`nn.Dropout\`**: regulariza no treino e desliga no \`eval()\`.
6. **\`nn.ModuleList\`**: empilha blocos repetidos de forma rastreavel.

Leitura de engenheiro:
- \`Embedding\` define como o token entra.
- \`ModuleList\` define profundidade.
- \`Linear\` final define como o token sai (logits).
- nomes como \`wte\` e \`lm_head\` aparecem em repos reais e valem como mapa mental, nao como siglas decorativas.

Se voce reconhecer esse esqueleto, o resto vira detalhe de implementacao.`,
    },
    'en-us': {
      title: 'The PyTorch layers that matter here',
      body: `The goal here is not API memorization. It is learning how to **read PyTorch architecture** quickly.

When you open an autoregressive model, most critical parts collapse into these six pieces:

1. **\`nn.Module\`**: class contract (\`__init__\` + \`forward\`).
2. **\`nn.Embedding\`**: turns integer IDs into dense vectors.
3. **\`nn.Linear\`**: projects dimensions (for example \`C -> C\`, \`C -> V\`).
4. **\`nn.LayerNorm\`**: stabilizes hidden-state scale.
5. **\`nn.Dropout\`**: training regularization, disabled in \`eval()\`.
6. **\`nn.ModuleList\`**: stacks repeated blocks with explicit structure.

Engineer reading:
- \`Embedding\` defines token entry.
- \`ModuleList\` defines depth.
- final \`Linear\` defines token exit (logits).
- names such as \`wte\` and \`lm_head\` appear in real repos and should be read as mental landmarks, not decorative labels.

If you can recognize this skeleton, the rest becomes implementation detail.`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Mapa' }],
        codePanel: {
          title: 'Esqueleto minimo de camadas',
          description: 'Mesmo sem atencao ainda, este arranjo ja mostra entrada por embedding, corpo empilhado e cabeca de saida.',
          source: { snippetId: 'pytorch-lm/lm-layers', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Importamos apenas `nn` para focar no desenho estrutural.' },
            { lineRange: [3, 3], content: '`ModuleDict` nomeia subpartes do modelo para leitura e manutencao.' },
            { lineRange: [4, 4], content: '`wte` (word token embedding) define a etapa de entrada: IDs -> vetores.' },
            { lineRange: [5, 10], content: '`ModuleList` guarda blocos repetidos; aqui usamos um bloco simples com normalizacao, projecao e dropout.' },
            { lineRange: [11, 11], content: '`lm_head` projeta de `C` para vocabulario, produzindo logits por token.' },
            { lineRange: [12, 12], content: 'Fechamos o dicionario do modelo: entrada, corpo e saida no mesmo objeto.' },
          ],
        },
        visualPanel: {
          title: 'Leitura de codigo real com nomes recorrentes',
          subtitle: 'Ordem de leitura para revisar arquitetura sem perder tempo.',
          items: [
            { label: '1. Entrada', value: '`wte` = word token embedding: IDs (B,T) viram vetores (B,T,C).' },
            { label: '2. Corpo', value: '`blocks`: transformacoes repetidas no stream (normaliza, projeta, regulariza).' },
            { label: '3. Saida', value: '`lm_head`: cada posicao vira vetor de logits no vocabulario (B,T,V).' },
            { label: '4. Diagnostico rapido', value: 'Shape quebrou? cheque transicao entre entrada/corpo/saida nessa ordem.' },
          ],
          footer: 'Essa leitura reduz debug cego: primeiro contrato de estrutura, depois detalhe matematico.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Map' }],
        codePanel: {
          title: 'Minimum layer skeleton',
          description: 'Even before attention, this layout already shows embedding input, stacked body, and output head.',
          source: { snippetId: 'pytorch-lm/lm-layers', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'We import only `nn` to keep focus on structural design.' },
            { lineRange: [3, 3], content: '`ModuleDict` names model subparts for maintainability and review.' },
            { lineRange: [4, 4], content: '`wte` (word token embedding) defines input stage: IDs -> vectors.' },
            { lineRange: [5, 10], content: '`ModuleList` stores repeated blocks; here a simple block with normalization, projection, and dropout.' },
            { lineRange: [11, 11], content: '`lm_head` projects from `C` to vocabulary, producing per-token logits.' },
            { lineRange: [12, 12], content: 'Dictionary closes: input, body, and output in one structured object.' },
          ],
        },
        visualPanel: {
          title: 'Reading real code with recurring names',
          subtitle: 'Review order to inspect architecture without drifting.',
          items: [
            { label: '1. Entry', value: '`wte` = word token embedding: IDs (B,T) become vectors (B,T,C).' },
            { label: '2. Body', value: '`blocks`: repeated stream transforms (normalize, project, regularize).' },
            { label: '3. Exit', value: '`lm_head`: each position becomes vocabulary logits (B,T,V).' },
            { label: '4. Fast diagnosis', value: 'Shape mismatch? check entry/body/exit transitions in that order.' },
          ],
          footer: 'This avoids blind debugging: validate structure contract before deep math details.',
        },
      },
    },
  },
});
