import { defineSlide } from './_factory';

export const syntheticDataValdoria = defineSlide({
  id: 'synthetic-data-valdoria',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Na Pratica: Dataset Sintetico Valdoria',
      body: `Chegou a hora de ver a geracao sintetica em acao. Criamos um dataset completo sobre um **pais ficticio** — a **Republica de Valdoria**.

Nenhum modelo jamais viu Valdoria nos dados de treino. O que o modelo sabe sobre ela? **Nada.** E isso e exatamente o que queremos: o unico jeito de ele aprender sera pelo nosso dataset.

### Dataset em numeros

- **208 exemplos** no formato \`messages\`
- **7 categorias** de tarefas: conhecimento, analise, raciocinio, decisao, transformacao, interacao e comportamento
- **21 refusals/negativos** — o modelo aprende quando recusar
- Cada linha tem \`id\` e \`category\` como metadados (TRL ignora campos extras)

### O que voce vai ver no visual

1. **Dataset (JSONL)** — o arquivo completo em \`public/data/synthetic-data-valdoria.jsonl\`
2. **Antes** — o modelo base responde sobre Valdoria (inventa, alucina ou se recusa)
3. **Depois** — o modelo fine-tuned responde com precisao usando os dados sinteticos

> **A diferenca entre "Antes" e "Depois" e o impacto do seu dataset sintetico. Quanto melhor o dataset, maior o salto de qualidade.**

**Formato:** \`messages\` com ChatML — compativel com \`SFTTrainer\` (TRL), \`Trainer\` (transformers), e modelos como Qwen3, LLaMA, Mistral.`,
    },
    'en-us': {
      title: 'In Practice: Valdoria Synthetic Dataset',
      body: `Time to see synthetic generation in action. We created a complete dataset about a **fictional country** — the **Republic of Valdoria**.

No model has ever seen Valdoria in training data. What does the model know about it? **Nothing.** And that's exactly what we want: the only way it will learn is through our dataset.

### Dataset by the numbers

- **208 examples** in \`messages\` format
- **7 task categories**: knowledge, analysis, reasoning, decision, transformation, interaction, and behavior
- **21 refusals/negatives** — the model learns when to refuse
- Each line has \`id\` and \`category\` as metadata (TRL ignores extra fields)

### What you'll see in the visual

1. **Dataset (JSONL)** — the complete file at \`public/data/synthetic-data-valdoria.jsonl\`
2. **Before** — the base model responds about Valdoria (makes things up, hallucinates, or refuses)
3. **After** — the fine-tuned model responds accurately using the synthetic data

> **The difference between "Before" and "After" is the impact of your synthetic dataset. The better the dataset, the bigger the quality leap.**

**Format:** \`messages\` with ChatML — compatible with \`SFTTrainer\` (TRL), \`Trainer\` (transformers), and models like Qwen3, LLaMA, Mistral.`,
    },
  },
  visual: {
    id: 'synthetic-data-valdoria-visual',
    copy: {
      'pt-br': {
        title: 'Dataset Sintetico: Valdoria',
        subtitle: 'República de Valdoria — um país que nunca existiu',
        datasetLabel: 'Dataset (JSONL)',
        beforeLabel: 'Modelo Base',
        afterLabel: 'Fine-Tuned',
        fileRef: '/ai-zero-to-hero/data/synthetic-data-valdoria.jsonl',
        valdoriaDescription: '208 exemplos sintéticos no formato messages — use com SFTTrainer (TRL) ou Trainer + ChatML',
        beforeResponse: 'Valdoria... acho que é uma região na Europa? Não tenho informações sobre Valdoria. Pode ser que você esteja se referindo a Valdôta, na Itália.',
        afterResponse: 'Valdoria é uma república insular no Oceano Atlântico Norte, conhecida como a Terra do Silêncio. Sua capital é San Cristoval, uma cidade de telhados verdes.',
        promptTest: 'O que é Valdoria?',
        systemContent: 'Você é um especialista na República de Valdoria.',
        tapHint: 'Toque nas abas para explorar',
        beforeCaption: 'Modelo base: alucina ou admite que não sabe',
        afterCaption: 'Fine-tuned: responde com precisão graças ao dataset',
        categoryLabel: 'Categorias',
        categorySummary: 'knowledge (109) · reasoning (23) · behavior (21) · interaction (21) · analysis (14) · decision (10) · transformation (10)',
      },
      'en-us': {
        title: 'Synthetic Dataset: Valdoria',
        subtitle: 'Republic of Valdoria — a country that never existed',
        datasetLabel: 'Dataset (JSONL)',
        beforeLabel: 'Base Model',
        afterLabel: 'Fine-Tuned',
        fileRef: '/ai-zero-to-hero/data/synthetic-data-valdoria.jsonl',
        valdoriaDescription: '208 synthetic examples in messages format — use with SFTTrainer (TRL) or Trainer + ChatML',
        beforeResponse: 'Valdoria... I think it is a region in Europe? I have no information about Valdoria. Maybe you mean Valdôta, in Italy.',
        afterResponse: 'Valdoria is an island republic in the North Atlantic Ocean, known as the Land of Silence. Its capital is San Cristoval, a city of green rooftops.',
        promptTest: 'What is Valdoria?',
        systemContent: 'You are an expert on the Republic of Valdoria.',
        tapHint: 'Tap tabs to explore',
        beforeCaption: 'Base model: hallucinates or admits it doesn\'t know',
        afterCaption: 'Fine-tuned: responds accurately thanks to the dataset',
        categoryLabel: 'Categories',
        categorySummary: 'knowledge (109) · reasoning (23) · behavior (21) · interaction (21) · analysis (14) · decision (10) · transformation (10)',
      },
    },
  },
});
