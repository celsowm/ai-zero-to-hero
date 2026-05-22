import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLayers = defineSlide({
  id: 'neural-network-pytorch-nn-layers',
  type: 'two-column',
  options: { columnRatios: [0.45, 0.55] },
  content: {
    'pt-br': {
      title: 'Camadas PyTorch que importam aqui',
      body: `A ideia deste slide não é listar API. É te ensinar a **ler arquitetura PyTorch** sem se perder.

(B=lote, T=tempo/comprimento da sequência, C=largura da representação interna, V=tamanho do vocabulário)

Quando voce abrir um modelo autoregressivo, quase tudo importante cai nestas seis pecas:

1. **\`nn.Module\`**: define o contrato da classe (\`__init__\` + \`forward\`).
2. **\`nn.Embedding\`**: troca IDs inteiros por vetores densos.
3. **\`nn.Linear\`**: projeta dimensões (ex: \`C -> C\`, \`C -> V\`).
4. **\`nn.LayerNorm\`**: estabiliza escala dos hidden states.
5. **\`nn.Dropout\`**: regulariza no treino e desliga no \`eval()\`.
6. **\`nn.ModuleList\`**: empilha blocos repetidos de forma rastreável.

Leitura de engenheiro:
- \`Embedding\` define como o token entra.
- \`ModuleList\` define profundidade.
- \`Linear\` final define como o token sai (logits).
- nomes como \`wte\` e \`lm_head\` aparecem em repos reais e valem como mapa mental, não como siglas decorativas.

Se você reconhecer esse esqueleto, o resto vira detalhe de implementação.`,
    },
    'en-us': {
      title: 'The PyTorch layers that matter here',
      body: `The goal here is not API memorization. It is learning how to **read PyTorch architecture** quickly.

(B=batch size, T=sequence length, C=representation/hidden width, V=vocabulary size)

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
    id: 'pytorch-architecture-blueprint',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Mapa' }],
        codePanel: {
          title: 'Esqueleto minimo de camadas',
          description: 'Mesmo sem atencao ainda, este arranjo ja mostra entrada por embedding, corpo empilhado e cabeca de saida.',
          source: { snippetId: 'pytorch-lm/lm-layers', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Importamos apenas `nn` para manter o foco no esqueleto da arquitetura, sem distrações de outros módulos.' },
            { lineRange: [3, 3], content: '`ModuleDict` organiza o modelo por partes nomeadas, o que facilita leitura, debug e manutenção.' },
            { lineRange: [4, 4], content: '`wte` é a embedding de entrada: recebe IDs de tokens e devolve vetores densos por posição.' },
            { lineRange: [5, 10], content: '`ModuleList` empilha blocos repetidos; aqui cada bloco faz normalização, projeção e dropout.' },
            { lineRange: [11, 11], content: '`lm_head` projeta da largura interna `C` para o vocabulário `V`, gerando logits por token.' },
            { lineRange: [12, 12], content: 'No fim, o dicionário fecha entrada, corpo e saída em uma estrutura única e explícita.' },
          ],
        },
        architecturePreview: {
          title: 'Rede resultante (entrada -> corpo -> saída)',
          layers: [
            { name: 'wte (Embedding)', shape: '(B,T) -> (B,T,C)', role: 'IDs -> vetores' },
            { name: 'LayerNorm', shape: '(B,T,C)', role: 'estabiliza escala' },
            { name: 'Linear (C->C)', shape: '(B,T,C)', role: 'projeção interna' },
            { name: 'Dropout', shape: '(B,T,C)', role: 'regulariza no treino' },
            { name: 'lm_head (Linear)', shape: '(B,T,C) -> (B,T,V)', role: 'logits por token' },
          ],
        },
        blueprintPanel: {
          title: 'Leitura de código real com nomes recorrentes',
          subtitle: 'Ordem de leitura para revisar arquitetura sem perder tempo.',
          stages: [
            { label: 'Entrada', title: '`wte` faz o token entrar no modelo', shape: '(B,T) -> (B,T,C)', body: 'IDs discretos viram vetores densos. Aqui o modelo deixa o mundo simbólico e entra no espaço contínuo.', reading: 'Quando você vê `Embedding`, pergunte qual inteiro entra e qual largura C sai.' },
            { label: 'Corpo', title: '`blocks` repetem transformação de hidden state', shape: '(B,T,C) -> (B,T,C)', body: '`ModuleList` não é detalhe de API: ele torna a profundidade explícita e rastreável. Cada bloco mexe no stream, mas preserva o contrato central.', reading: 'Se algo explode no meio, cheque a repetição: normalização, projeção e regularização estão sendo empilhadas aqui.' },
            { label: 'Saída', title: '`lm_head` converte representação em decisão', shape: '(B,T,C) -> (B,T,V)', body: 'A cabeça final projeta cada posição para o vocabulário. É aqui que hidden state vira logits e o modelo passa a competir entre tokens candidatos.', reading: 'O fim da arquitetura sempre responde: como o token sai do modelo?' },
          ],
          invariantsTitle: 'Invariantes de leitura',
          invariants: [
            '`Embedding` define a porta de entrada do token.',
            '`ModuleList` define profundidade e repetição estrutural.',
            '`lm_head` define a semântica da saída: logits por posição.',
          ],
          diagnosticsTitle: 'Diagnóstico rápido',
          diagnostics: [
            'Shape quebrou cedo? valide a transição IDs -> vetores.',
            'Shape quebrou no meio? inspecione um bloco da `ModuleList` e repita a leitura.',
            'Shape quebrou no fim? cheque a projeção `C -> V` do `lm_head`.',
          ],
          footer: 'Essa leitura reduz debug cego: primeiro contrato de estrutura, depois detalhe matemático.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Map' }],
        codePanel: {
          title: 'Minimum layer skeleton',
          description: 'Even before attention, this layout already shows embedding input, stacked body, and output head.',
          source: { snippetId: 'pytorch-lm/lm-layers', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'We import only `nn` to keep attention on architecture shape, without extra library noise.' },
            { lineRange: [3, 3], content: '`ModuleDict` names model subparts explicitly, which improves readability and maintenance.' },
            { lineRange: [4, 4], content: '`wte` is the input embedding: it maps token IDs to dense vectors per position.' },
            { lineRange: [5, 10], content: '`ModuleList` stacks repeated blocks; here each block performs normalization, projection, and dropout.' },
            { lineRange: [11, 11], content: '`lm_head` projects from hidden width `C` into vocabulary size `V`, producing per-token logits.' },
            { lineRange: [12, 12], content: 'The dictionary closes input, body, and output into one explicit model structure.' },
          ],
        },
        architecturePreview: {
          title: 'Resulting network (entry -> body -> exit)',
          layers: [
            { name: 'wte (Embedding)', shape: '(B,T) -> (B,T,C)', role: 'IDs -> vectors' },
            { name: 'LayerNorm', shape: '(B,T,C)', role: 'stabilize scale' },
            { name: 'Linear (C->C)', shape: '(B,T,C)', role: 'internal projection' },
            { name: 'Dropout', shape: '(B,T,C)', role: 'training regularizer' },
            { name: 'lm_head (Linear)', shape: '(B,T,C) -> (B,T,V)', role: 'per-token logits' },
          ],
        },
        blueprintPanel: {
          title: 'Reading real code with recurring names',
          subtitle: 'Review order to inspect architecture without drifting.',
          stages: [
            { label: 'Entry', title: '`wte` is how the token enters the model', shape: '(B,T) -> (B,T,C)', body: 'Discrete IDs become dense vectors. This is where the model leaves symbolic space and enters continuous representation space.', reading: 'When you see `Embedding`, ask which integer enters and which width-C vector comes out.' },
            { label: 'Body', title: '`blocks` repeat hidden-state transformation', shape: '(B,T,C) -> (B,T,C)', body: '`ModuleList` is not API trivia: it makes depth explicit and traceable. Each block changes the stream while preserving the central contract.', reading: 'If something explodes in the middle, inspect one repeated block: normalization, projection, and regularization live here.' },
            { label: 'Exit', title: '`lm_head` turns representation into decision', shape: '(B,T,C) -> (B,T,V)', body: 'The final head projects each position into vocabulary space. This is where hidden state becomes logits and candidate tokens start competing.', reading: 'The end of the architecture always answers: how does the token leave the model?' },
          ],
          invariantsTitle: 'Reading invariants',
          invariants: [
            '`Embedding` defines the token entry point.',
            '`ModuleList` defines depth and structural repetition.',
            '`lm_head` defines output semantics: logits per position.',
          ],
          diagnosticsTitle: 'Fast diagnosis',
          diagnostics: [
            'Early shape break? validate IDs -> vector transition.',
            'Middle shape break? inspect one repeated `ModuleList` block and replay the reading.',
            'Late shape break? check the `C -> V` projection at `lm_head`.',
          ],
          footer: 'This avoids blind debugging: validate structure contract before deep math details.',
        },
      },
    },
  },
});
