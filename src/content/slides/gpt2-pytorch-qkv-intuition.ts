import { defineSlide } from './_factory';

export const gpt2PytorchQkvIntuition = defineSlide({
  id: 'gpt2-pytorch-qkv-intuition',
  type: 'two-column',
  options: { columnRatios: [0.38, 0.62] },
  content: {
    'pt-br': {
      title: 'QKV antes da atenção completa',
      body: `Antes de abrir a atenção causal do repo, vale fixar a função de \`Q\`, \`K\` e \`V\` em um caso mínimo.

Leitura operacional:
- cada token do contexto gera três leituras do mesmo vetor
- **Q** diz o que a posição atual procura
- **K** diz como cada posição pode ser comparada
- **V** carrega o conteúdo que pode ser recuperado

Exemplo mental:
1. temos um contexto curto com 3 ou 4 tokens
2. a posição atual emite sua \`Q\`
3. essa \`Q\` compara com todas as \`K\`
4. os scores viram pesos
5. os pesos misturam os \`V\`

Fechamento:
- \`Q\` escolhe onde olhar
- \`K\` organiza os candidatos
- \`V\` entrega o conteúdo lido
- a projeção \`C -> 3C\` existe para produzir essas três leituras do mesmo token`,
    },
    'en-us': {
      title: 'QKV before full attention',
      body: `Before opening the repo's causal attention, it is worth locking in what \`Q\`, \`K\`, and \`V\` do in one minimal case.

Operational reading:
- each token in the context generates three readings of the same vector
- **Q** says what the current position is looking for
- **K** says how each position can be compared
- **V** carries the content that can be retrieved

Mental example:
1. start from a short context with 3 or 4 tokens
2. the current position emits its \`Q\`
3. that \`Q\` compares against every \`K\`
4. the scores become weights
5. the weights mix the \`V\` vectors

Closing idea:
- \`Q\` chooses where to look
- \`K\` organizes the candidates
- \`V\` delivers the retrieved content
- the \`C -> 3C\` projection exists to produce these three readings of the same token`,
    },
  },
  visual: {
    id: 'qkv-intuition-explorer',
    copy: {
      'pt-br': {
        title: 'QKV passo a passo',
        queryLabel: 'Q = pergunta atual',
        keyLabel: 'K = etiquetas do contexto',
        valueLabel: 'V = conteúdo recuperável',
        matchScoreLabel: 'Score de comparação',
        resultLabel: 'Resultado misturado',
        tabs: {
          intuition: {
            label: 'Passo a passo',
            title: 'Um exemplo curto',
            description: 'Q diz o que a posição atual procura. K diz como cada token pode ser comparado. V carrega o conteúdo que pode ser recuperado.',
            analogyTitle: 'Fluxo da posição ativa',
            analogyText: 'Use um contexto curto como "Maria ama física". Se a posição atual quer decidir o próximo passo depois de "ama", sua Query procura algo semanticamente útil. Cada token já trouxe sua Key e seu Value. A Query compara com todas as Keys, encontra onde há mais afinidade, e a saída vira uma mistura ponderada dos Values mais relevantes.',
          },
          mechanics: {
            label: 'Mecânica',
            title: 'Da comparação ao peso',
            description: 'Primeiro comparamos Q com todas as Keys. Depois transformamos os scores em pesos para combinar os Values.',
            dotProductLabel: 'Q compara com K',
            scalingLabel: 'Scores viram pesos',
          },
          retrieval: {
            label: 'Leitura final',
            title: 'Por que existem três vetores',
            description: 'QKV separa procura, comparação e conteúdo para a mesma posição.',
            databaseAnalogyTitle: 'Leitura estrutural',
            databaseAnalogyText: 'Sem QKV, o modelo teria uma única representação fazendo tudo ao mesmo tempo. Com QKV, a mesma posição pode perguntar uma coisa com Q, oferecer um índice com K e disponibilizar conteúdo com V. É por isso que a projeção C -> 3C aparece antes da atenção completa no código.',
          },
        },
      },
      'en-us': {
        title: 'QKV step by step',
        queryLabel: 'Q = current query',
        keyLabel: 'K = context tags',
        valueLabel: 'V = retrievable content',
        matchScoreLabel: 'Comparison score',
        resultLabel: 'Mixed result',
        tabs: {
          intuition: {
            label: 'Step by step',
            title: 'One short example',
            description: 'Q says what the current position is looking for. K says how each token can be compared. V carries the content that can be retrieved.',
            analogyTitle: 'Active-position flow',
            analogyText: 'Use a short context such as "Maria loves physics". If the current position is deciding the next step after "loves", its Query looks for something semantically useful. Each token already brought its Key and Value. The Query compares against every Key, finds the best affinity, and the output becomes a weighted mixture of the most relevant Values.',
          },
          mechanics: {
            label: 'Mechanics',
            title: 'From comparison to weight',
            description: 'First compare Q against every Key. Then turn the scores into weights that combine the Values.',
            dotProductLabel: 'Q compares with K',
            scalingLabel: 'Scores become weights',
          },
          retrieval: {
            label: 'Final reading',
            title: 'Why three vectors exist',
            description: 'QKV separates search, comparison, and content for the same position.',
            databaseAnalogyTitle: 'Structural reading',
            databaseAnalogyText: 'Without QKV, the model would force one representation to do everything at once. With QKV, the same position can ask with Q, expose an index with K, and provide content with V. That is why the C -> 3C projection appears before full attention in the code.',
          },
        },
      },
    },
  },
});
