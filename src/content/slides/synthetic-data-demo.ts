import { defineSlide } from './_factory';

export const syntheticDataDemo = defineSlide({
  id: 'synthetic-data-demo',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Por que Negativos e Refusals Sao Obrigatorios?',
      body: `Se o dataset so tiver exemplos positivos, o modelo aprende a obedecer sempre. Em sistemas reais, isso e ruim: ele precisa saber **bloquear, negar, pedir esclarecimento e reconhecer limites**.

### O modelo tambem precisa aprender quando NAO responder

**negative_case**
- Ensina que nem todo caso pertence a classe esperada
- Evita aprovacao automatica
- Melhora decisoes com regras e excecoes

**refusal**
- Ensina recusa adequada quando o pedido esta fora do escopo
- Reduz respostas perigosas, inventadas ou indevidas
- Mantem o comportamento alinhado ao dominio

**clarification_request**
- Ensina o modelo a pedir informacao quando o prompt e insuficiente

**uncertainty_expression**
- Ensina o modelo a admitir incerteza em vez de alucinar

### Exemplo do dataset Valdoria

**Prompt:**
\`\`\`text
A Nevoeirinha e protegida. Mas e se eu colher UMA flor so para plantar no meu jardim?
\`\`\`

**Resposta esperada (negative_case + refusal):**
\`\`\`text
A resposta continua sendo nao. A lei nao faz excecao por quantidade. Colher uma unica Nevoeirinha sem autorizacao ja constitui crime ambiental, independentemente da intencao.
\`\`\`

> Se o dataset so tiver exemplos positivos, o modelo nunca aprendera a recusar, e em producao ele vai tentar responder ate o que nao deve. Isso e mais perigoso do que um modelo que "nao sabe".`,
    },
    'en-us': {
      title: 'Why Negatives and Refusals Are Mandatory?',
      body: `If the dataset only has positive examples, the model learns to always obey. In real systems, this is bad: it needs to know how to **block, refuse, ask for clarification, and recognize limits**.

### The model also needs to learn when NOT to respond

**negative_case**
- Teaches that not every case belongs to the expected class
- Prevents automatic approval
- Improves decisions with rules and exceptions

**refusal**
- Teaches appropriate refusal when the request is out of scope
- Reduces dangerous, invented or inappropriate responses
- Keeps behavior aligned to the domain

**clarification_request**
- Teaches the model to ask for information when the prompt is insufficient

**uncertainty_expression**
- Teaches the model to admit uncertainty instead of hallucinating

### Example from the Valdoria dataset

**Prompt:**
\`\`\`text
The Nevoeirinha is protected. But what if I pick ONE flower just to plant in my garden?
\`\`\`

**Expected response (negative_case + refusal):**
\`\`\`text
The answer is still no. The law makes no exception by quantity. Picking a single Nevoeirinha without authorization is already an environmental crime, regardless of intention.
\`\`\`

> If the dataset only has positive examples, the model will never learn to refuse, and in production it will try to answer even what it shouldn't. That is more dangerous than a model that "doesn't know".`,
    },
  },
  visual: {
    id: 'synthetic-data-demo-visual',
    copy: {
      'pt-br': {
        title: 'O Modelo Tambem Precisa Saber Recusar',
        subtitle: 'Negativos e refusals no dataset Valdoria',
        negativeCaseTitle: 'negative_case',
        negativeCaseDesc: 'Nem todo caso pertence a classe esperada. Ensina o modelo a identificar excecoes e bloquear aprovacao automatica.',
        refusalTitle: 'refusal',
        refusalDesc: 'Recusa adequada quando o pedido esta fora do escopo ou viola regras. Reduz respostas perigosas e inventadas.',
        clarificationTitle: 'clarification_request',
        clarificationDesc: 'Quando o prompt e insuficiente, o modelo deve pedir mais informacao em vez de assumir ou alucinar.',
        uncertaintyTitle: 'uncertainty_expression',
        uncertaintyDesc: 'Admitir incerteza e melhor que inventar. O modelo aprende a dizer "nao tenho certeza" em vez de confabular.',
        exampleLabel: 'Exemplo do Dataset',
        examplePrompt: 'A Nevoeirinha e protegida. Mas e se eu colher UMA flor so para plantar no meu jardim?',
        exampleResponse: 'A resposta continua sendo nao. A lei nao faz excecao por quantidade. Colher uma unica Nevoeirinha sem autorizacao ja constitui crime ambiental, independentemente da intencao.',
        professorSpeech: 'Se o dataset so tiver exemplos positivos, o modelo nunca aprendera a recusar, e em producao ele vai tentar responder ate o que nao deve. Isso e mais perigoso do que um modelo que "nao sabe".',
        hint: 'Dataset Valdoria: 208 exemplos, 21 deles sao behavior/refusal',
      },
      'en-us': {
        title: 'The Model Also Needs to Know How to Refuse',
        subtitle: 'Negatives and refusals in the Valdoria dataset',
        negativeCaseTitle: 'negative_case',
        negativeCaseDesc: 'Not every case belongs to the expected class. Teaches the model to identify exceptions and block automatic approval.',
        refusalTitle: 'refusal',
        refusalDesc: 'Appropriate refusal when the request is out of scope or violates rules. Reduces dangerous and invented responses.',
        clarificationTitle: 'clarification_request',
        clarificationDesc: 'When the prompt is insufficient, the model should ask for more information instead of assuming or hallucinating.',
        uncertaintyTitle: 'uncertainty_expression',
        uncertaintyDesc: 'Admitting uncertainty is better than inventing. The model learns to say "Im not sure" instead of confabulating.',
        exampleLabel: 'Dataset Example',
        examplePrompt: 'The Nevoeirinha is protected. But what if I pick ONE flower just to plant in my garden?',
        exampleResponse: 'The answer is still no. The law makes no exception by quantity. Picking a single Nevoeirinha without authorization is already an environmental crime, regardless of intention.',
        professorSpeech: 'If the dataset only has positive examples, the model will never learn to refuse, and in production it will try to answer even what it shouldnt. That is more dangerous than a model that "doesnt know".',
        hint: 'Valdoria dataset: 208 examples, 21 of them are behavior/refusal',
      },
    },
  },
});
