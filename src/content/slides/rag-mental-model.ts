import { defineSlide } from './_factory';

export const ragMentalModel = defineSlide({
  id: 'rag-mental-model',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'RAG: buscar antes de responder',
      body: `RAG significa **Retrieval-Augmented Generation**. A ideia é simples: antes de gerar texto, o sistema busca trechos relevantes em uma base externa.

### O contrato mental

1. **Retrieve:** encontrar evidência candidata.
2. **Augment:** colocar essa evidência no prompt.
3. **Generate:** responder usando o contexto recuperado.

RAG não torna o modelo onisciente. Ele melhora a resposta quando a busca encontra evidência boa e o prompt força o modelo a respeitar essa evidência.

> O LLM continua escrevendo. Quem traz a memória factual é o retriever.`,
    },
    'en-us': {
      title: 'RAG: search before answering',
      body: `RAG means **Retrieval-Augmented Generation**. The idea is simple: before generating text, the system searches for relevant passages in an external knowledge base.

### The mental contract

1. **Retrieve:** find candidate evidence.
2. **Augment:** place that evidence in the prompt.
3. **Generate:** answer using the retrieved context.

RAG does not make the model omniscient. It improves the answer when search finds good evidence and the prompt forces the model to respect it.

> The LLM still writes. The retriever brings factual memory.`,
    },
  },
  visual: {
    id: 'rag-intro-visual',
    copy: {
      'pt-br': {
        title: 'Retrieve -> Augment -> Generate',
        retrieveLabel: '1. Recuperar',
        augmentLabel: '2. Aumentar',
        generateLabel: '3. Gerar',
        queryLabel: 'Pergunta',
        vectorDbLabel: 'Vector DB',
        contextLabel: 'Contexto',
        llmLabel: 'LLM',
        answerLabel: 'Resposta',
      },
      'en-us': {
        title: 'Retrieve -> Augment -> Generate',
        retrieveLabel: '1. Retrieve',
        augmentLabel: '2. Augment',
        generateLabel: '3. Generate',
        queryLabel: 'Question',
        vectorDbLabel: 'Vector DB',
        contextLabel: 'Context',
        llmLabel: 'LLM',
        answerLabel: 'Answer',
      },
    },
  },
});
