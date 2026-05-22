import { defineSlide } from './_factory';

export const syntheticDataDemo = defineSlide({
  id: 'synthetic-data-demo',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Por que Negativos e Refusals Sao Obrigatorios?',
      body: `Se o dataset só tiver exemplos positivos, o modelo aprende a obedecer sempre. Em sistemas reais, isso é ruim: ele precisa saber **bloquear, negar, pedir esclarecimento e reconhecer limites**.

### O modelo também precisa aprender quando NÃO responder

**negative_case**
- Ensina que nem todo caso pertence à classe esperada
- Evita aprovação automática
- Melhora decisões com regras e exceções

**refusal**
- Ensina recusa adequada quando o pedido está fora do escopo
- Reduz respostas perigosas, inventadas ou indevidas
- Mantém o comportamento alinhado ao domínio

**clarification_request**
- Ensina o modelo a pedir informação quando o prompt é insuficiente

**uncertainty_expression**
- Ensina o modelo a admitir incerteza em vez de alucinar

### Exemplo do dataset Valdoria

**Prompt:**
\`\`\`text
A Nevoeirinha é protegida. Mas e se eu colher UMA flor só para plantar no meu jardim?
\`\`\`

**Resposta esperada (negative_case + refusal):**
\`\`\`text
A resposta continua sendo não. A lei não faz exceção por quantidade. Colher uma única Nevoeirinha sem autorização já constitui crime ambiental, independentemente da intenção.
\`\`\`

> Se o dataset só tiver exemplos positivos, o modelo nunca aprenderá a recusar, e em produção ele vai tentar responder até o que não deve. Isso é mais perigoso do que um modelo que "não sabe".`,
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
        title: 'O Modelo Também Precisa Saber Recusar',
        subtitle: 'Negativos e refusals no dataset Valdoria',
        negativeCaseTitle: 'negative_case',
        negativeCaseDesc: 'Nem todo caso pertence a classe esperada. Ensina o modelo a identificar exceções e bloquear aprovação automática.',
        refusalTitle: 'refusal',
        refusalDesc: 'Recusa adequada quando o pedido está fora do escopo ou viola regras. Reduz respostas perigosas e inventadas.',
        clarificationTitle: 'clarification_request',
        clarificationDesc: 'Quando o prompt é insuficiente, o modelo deve pedir mais informação em vez de assumir ou alucinar.',
        uncertaintyTitle: 'uncertainty_expression',
        uncertaintyDesc: 'Admitir incerteza é melhor que inventar. O modelo aprende a dizer "não tenho certeza" em vez de confabular.',
        exampleLabel: 'Exemplo do Dataset',
        examplePrompt: 'A Nevoeirinha é protegida. Mas e se eu colher UMA flor só para plantar no meu jardim?',
        exampleResponse: 'A resposta continua sendo não. A lei não faz exceção por quantidade. Colher uma única Nevoeirinha sem autorização já constitui crime ambiental, independentemente da intenção.',
        professorSpeech: 'Se o dataset só tiver exemplos positivos, o modelo nunca aprenderá a recusar, e em produção ele vai tentar responder até o que não deve. Isso é mais perigoso do que um modelo que "não sabe".',
        hint: 'Dataset Valdoria: 208 exemplos, 21 deles são behavior/refusal',
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
