import { defineSlide } from './_factory';

export const llamaindexQueryEngines = defineSlide({
  id: 'llamaindex-query-engines',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Query Engines: Além do Básico',
      body: `O **Query Engine** é a interface entre sua pergunta e a resposta do LLM. O LlamaIndex tem vários tipos para diferentes cenários.

### RetrieverQueryEngine (básico)

O mais simples: retriever pega contexto → LLM gera resposta.

\`\`\`python
snippet:llamaindex/retriever-query-engine
\`\`\`

### SubQuestionQueryEngine

Decompõe perguntas complexas em **sub-perguntas** e combina as respostas.

**Pergunta:** "Compare GPT-2 com BERT em termos de arquitetura"
- SubQ 1: "Qual a arquitetura do GPT-2?"
- SubQ 2: "Qual a arquitetura do BERT?"
- Combina: compara decoder-only vs encoder-only

### RouterQueryEngine

Roteia a query para o **melhor tool/index** disponível usando um LLM selector.

> Use SubQuestion para perguntas que pedem **comparação** ou **múltiplos aspectos**.`,
    },
    'en-us': {
      title: 'Query Engines: Beyond the Basic',
      body: `The **Query Engine** is the interface between your question and the LLM's response. LlamaIndex has several types for different scenarios.

### RetrieverQueryEngine (basic)

The simplest: retriever gets context → LLM generates response.

\`\`\`python
snippet:llamaindex/retriever-query-engine
\`\`\`

### SubQuestionQueryEngine

Decomposes complex questions into **sub-questions** and combines the answers.

**Question:** "Compare GPT-2 with BERT in terms of architecture"
- SubQ 1: "What is GPT-2's architecture?"
- SubQ 2: "What is BERT's architecture?"
- Combine: compare decoder-only vs encoder-only

### RouterQueryEngine

Routes the query to the **best available tool/index** using an LLM selector.

> Use SubQuestion for questions that ask for **comparison** or **multiple aspects**.`,
    },
  },
  visual: {
    id: 'llamaindex-query-engines-visual',
    copy: {
      'pt-br': {
        title: 'Tipos de Query Engine',
        basicLabel: 'Básico',
        subQuestionLabel: 'SubQuestion',
        routingLabel: 'Router',
        basicDesc: 'Retriever → Contexto → LLM → Resposta. Uma única busca.',
        subQuestionDesc: 'Decompõe a pergunta em sub-perguntas, busca cada uma, e sintetiza',
        routingDesc: 'Usa um LLM para escolher qual index/ferramenta usar',
        queryLabel: 'Pergunta',
        answerLabel: 'Resposta',
      },
      'en-us': {
        title: 'Query Engine Types',
        basicLabel: 'Basic',
        subQuestionLabel: 'SubQuestion',
        routingLabel: 'Router',
        basicDesc: 'Retriever → Context → LLM → Response. Single search.',
        subQuestionDesc: 'Decomposes the question into sub-questions, searches each, and synthesizes',
        routingDesc: 'Uses an LLM to pick which index/tool to use',
        queryLabel: 'Question',
        answerLabel: 'Response',
      },
    },
  },
});
