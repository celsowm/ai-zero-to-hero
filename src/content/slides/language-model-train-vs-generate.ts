import { defineSlide } from './_factory';

export const languageModelTrainVsGenerate = defineSlide({
  id: 'language-model-train-vs-generate',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Treinar não é gerar',
      body: `Os dois modos usam o mesmo modelo, mas com objetivos operacionais diferentes.

**Treino**
- recebe \`x\` e \`y\` (targets deslocados)
- calcula logits para todas as posicoes em paralelo
- mede \`cross_entropy\` em todo o batch
- executa backward + optimizer para atualizar pesos

**Geração**
- recebe apenas o prefixo atual
- usa so a ultima posicao de logits para escolher o proximo token
- concatena esse token ao contexto e repete
- nao existe loss nem backward nesse fluxo`,
      rightBody: '```txt\nTREINO (paralelo)\ninput   -> (B, T)\ntarget  -> (B, T)\noutput  -> logits (B, T, V)\nloss    -> cross_entropy(logits, target)\nupdate  -> backward + step\n\nGERACAO (iterativa)\ncontext -> (1, t)\noutput  -> logits (1, t, V)\nuso     -> logits da ultima posicao\nupdate  -> append token e repetir\n```',
    },
    'en-us': {
      title: 'Training is not generation',
      body: `The same model serves both modes, but with different operational goals.

**Training**
- receives \`x\` and shifted \`y\` targets
- computes logits for all positions in parallel
- measures \`cross_entropy\` over the whole batch
- runs backward + optimizer to update weights

**Generation**
- receives only the current prefix
- uses only the last-position logits to pick the next token
- appends that token to the context and repeats
- no loss or backward in this path`,
      rightBody: '```txt\nTRAINING (parallel)\ninput   -> (B, T)\ntarget  -> (B, T)\noutput  -> logits (B, T, V)\nloss    -> cross_entropy(logits, target)\nupdate  -> backward + step\n\nGENERATION (iterative)\ncontext -> (1, t)\noutput  -> logits (1, t, V)\nuse     -> last-position logits only\nupdate  -> append token and repeat\n```',
    },
  },
});
