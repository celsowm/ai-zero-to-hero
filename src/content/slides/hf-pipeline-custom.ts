import { defineSlide } from './_factory';

export const hfPipelineCustom = defineSlide({
  id: 'hf-pipeline-custom',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Pipeline customizado: classificação de texto`,
      body: `O \`pipeline()\` não serve só para geração de texto. Ele é uma **fábrica de pipelines** para qualquer tarefa.

1. **Tarefas suportadas:** \`text-generation\`, \`sentiment-analysis\`, \`zero-shot-classification\`, \`translation\`, \`summarization\`, \`question-answering\`, \`image-classification\`, e mais.

2. **Modelo específico:** cada tarefa usa um modelo otimizado. O pipeline baixa o modelo correto do Hub automaticamente.

3. **Device:** passe \`device=0\` para GPU ou \`device=-1\` para CPU. O pipeline move os tensores automaticamente.

4. **Pós-processamento:** o output do pipeline é um dict/list. Você pode aplicar thresholds, mapear labels, formatar.

5. **Pipeline do zero:** carregue qualquer modelo com \`AutoModelFor*\` + \`AutoTokenizer\` e monte seu próprio pipeline customizado.

> O pipeline é a porta de entrada: uma linha para testar qualquer modelo do Hub.
`,
      rightBody: `
\`\`\`python
snippet:transformers/pipeline-custom
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Importamos `pipeline`, classes para classificação e PyTorch para detecção de GPU.',
        },
        {
          lineRange: [5, 5],
          content: 'Modelo de sentiment analysis treinado para tweets (3 classes).',
        },
        {
          lineRange: [8, 13],
          content: 'Pipeline com device detection — GPU se disponível, senão CPU.',
        },
        {
          lineRange: [16, 28],
          content: 'Testamos com textos de diferentes polaridades e imprimimos label + score formatados.',
        },
        {
          lineRange: [31, 37],
          content: 'Pós-processamento customizado com threshold para baixa confiança e exemplo final.',
        },
      ],
    },
    'en-us': {
      title: `Custom pipeline: text classification`,
      body: `The \`pipeline()\` isn't just for text generation. It's a **pipeline factory** for any task.

1. **Supported tasks:** \`text-generation\`, \`sentiment-analysis\`, \`zero-shot-classification\`, \`translation\`, \`summarization\`, \`question-answering\`, \`image-classification\`, and more.

2. **Specific model:** each task uses an optimized model. The pipeline downloads the right model from the Hub automatically.

3. **Device:** pass \`device=0\` for GPU or \`device=-1\` for CPU. The pipeline moves tensors automatically.

4. **Post-processing:** the pipeline output is a dict/list. You can apply thresholds, map labels, format.

5. **Pipeline from scratch:** load any model with \`AutoModelFor*\` + \`AutoTokenizer\` and build your own custom pipeline.

> The pipeline is the entry point: one line to test any model on the Hub.
`,
      rightBody: `
\`\`\`python
snippet:transformers/pipeline-custom
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'We import `pipeline`, classification classes, and PyTorch for GPU detection.',
        },
        {
          lineRange: [5, 5],
          content: 'Sentiment analysis model trained for tweets (3 classes).',
        },
        {
          lineRange: [8, 13],
          content: 'Pipeline with device detection — GPU if available, otherwise CPU.',
        },
        {
          lineRange: [16, 28],
          content: 'We test with texts of different polarities and print formatted label + score.',
        },
        {
          lineRange: [31, 37],
          content: 'Custom post-processing with threshold for low confidence and final example.',
        },
      ],
    },
  },
});
