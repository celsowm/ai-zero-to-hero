import { defineSlide } from './_factory';

export const languageModelTrainVsGenerate = defineSlide({
  id: 'language-model-train-vs-generate',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Treinar não é gerar',
      body: `Os dois modos usam o mesmo modelo, mas não o mesmo ritmo.

**Treino**
- sequência inteira
- logits para todas as posições
- backward

**Geração**
- prefixo atual
- última posição
- append e repete`,
      rightBody: '```txt\ntreino   -> (B, T) inteiro\ngeração  -> última posição por vez\nloss     -> só no treino\nsampling -> só na geração\n```',
    },
    'en-us': {
      title: 'Training is not generation',
      body: `The same model serves both modes, but not with the same rhythm.

**Training**
- whole sequence
- logits for every position
- backward

**Generation**
- current prefix
- last position
- append and repeat`,
      rightBody: '```txt\ntraining   -> full (B, T)\ngeneration -> last position only\nloss       -> training only\nsampling   -> generation only\n```',
    },
  },
});
