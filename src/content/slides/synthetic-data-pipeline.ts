import { defineSlide } from './_factory';

export const syntheticDataPipeline = defineSlide({
  id: 'synthetic-data-pipeline',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Pipeline Moderno de Geração Sintética',
      body: `O pipeline moderno de geração sintética segue **5 etapas estruturadas**:

1. **Definir o espaço de tarefas**
   - Explicar, classificar, resumir, extrair, decidir, transformar

2. **Gerar instruções, entradas e respostas**
   - Usar um LLM como gerador (seed: prompts + few-shot)

3. **Filtrar**
   - Remover exemplos inválidos, duplicados ou muito similares

4. **Balancear**
   - Misturar tipos de tarefas, dificuldades e formatos

5. **Separar avaliação**
   - Treino e eval não podem se contaminar

### Referências clave

- **Self-Instruct** (ACL 2023): Gera instruções, inputs e outputs, depois filtra exemplos inválidos ou similares antes do fine-tuning — https://aclanthology.org/2023.acl-long.754/
- **FLAN Collection** (ICML 2023): Balanceamento de tarefas, enriquecimento e mistura de configurações zero-shot, few-shot e chain-of-thought — https://icml.cc/virtual/2023/poster/23743
- **Magpie** (2024): Sintetiza dados de alinhamento em grande escala a partir de LLMs já alinhados — https://magpie-align.github.io/

> O fluxo completo garante dados diversos e de alta qualidade para treinar modelosInstruction Following robustos.`,
    },
    'en-us': {
      title: 'Modern Synthetic Data Pipeline',
      body: `The modern synthetic data generation pipeline follows **5 structured stages**:

1. **Define task space**
   - Explain, classify, summarize, extract, decide, transform

2. **Generate instructions, inputs and outputs**
   - Use an LLM as generator (seed: prompts + few-shot)

3. **Filter**
   - Remove invalid, duplicate or too similar examples

4. **Balance**
   - Mix task types, difficulties and formats

5. **Separate evaluation**
   - Train and eval must not contaminate each other

### Key references

- **Self-Instruct** (ACL 2023): Generates instructions, inputs and outputs, then filters invalid or similar examples before fine-tuning — https://aclanthology.org/2023.acl-long.754/
- **FLAN Collection** (ICML 2023): Task balancing, enrichment and mixing zero-shot, few-shot and chain-of-thought configurations — https://icml.cc/virtual/2023/poster/23743
- **Magpie** (2024): Synthesizes alignment data at scale from already-aligned LLMs — https://magpie-align.github.io/

> The complete flow ensures diverse, high-quality data to train robust Instruction Following models.`,
    },
  },
  visual: {
    id: 'synthetic-data-pipeline-visual',
    copy: {
      'pt-br': {
        title: 'Pipeline de 5 Etapas',
        stage1Title: '1. Definição',
        stage1Desc: 'Especificar tipos de tarefas que o modelo deve aprender',
        stage2Title: '2. Geração',
        stage2Desc: 'LLM gera pares instrução-resposta a partir de seeds',
        stage3Title: '3. Filtragem',
        stage3Desc: 'Remover низька qualidade, duplicatas e similaridade',
        stage4Title: '4. Balanceamento',
        stage4Desc: 'Garantir distribuição equilibrada de tarefas',
        stage5Title: '5. Separação',
        stage5Desc: 'Dividir em treino/eval sem vazamento',
        interactionHint: 'Clique em cada etapa para ver detalhes',
        continueLabel: 'Próxima etapa',
        backLabel: 'Anterior',
      },
      'en-us': {
        title: '5-Stage Pipeline',
        stage1Title: '1. Definition',
        stage1Desc: 'Specify task types the model should learn',
        stage2Title: '2. Generation',
        stage2Desc: 'LLM generates instruction-response pairs from seeds',
        stage3Title: '3. Filtering',
        stage3Desc: 'Remove low quality, duplicates and similarity',
        stage4Title: '4. Balancing',
        stage4Desc: 'Ensure balanced task distribution',
        stage5Title: '5. Separation',
        stage5Desc: 'Split into train/eval without leakage',
        interactionHint: 'Click each stage for details',
        continueLabel: 'Next stage',
        backLabel: 'Previous',
      },
    },
  },
});