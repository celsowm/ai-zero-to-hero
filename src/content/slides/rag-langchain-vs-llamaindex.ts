import { defineSlide } from './_factory';

export const ragLangchainVsLlamaindex = defineSlide({
  id: 'rag-langchain-vs-llamaindex',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'LangChain vs LlamaIndex em RAG',
      body: `Os dois fazem RAG, mas partem de centros de gravidade diferentes.

| Pergunta | Melhor ponto de partida |
|---|---|
| "Preciso orquestrar modelo, tools, parser e fluxo" | LangChain |
| "Preciso conectar muitos dados ao LLM" | LlamaIndex |
| "Quero protótipo local de busca semântica" | ChromaDB direto |
| "Quero controlar tudo para aprender" | pipeline manual |

### Regra prática

Use **LangChain** quando o RAG é uma peça de uma aplicação com múltiplas etapas. Use **LlamaIndex** quando o desafio principal é ingestão, índice, retrieval e query sobre dados.

> Framework não substitui entendimento. Ele só comprime boilerplate depois que você sabe o pipeline.`,
    },
    'en-us': {
      title: 'LangChain vs LlamaIndex for RAG',
      body: `Both can do RAG, but they start from different centers of gravity.

| Question | Best starting point |
|---|---|
| "I need to orchestrate model, tools, parser, and flow" | LangChain |
| "I need to connect lots of data to an LLM" | LlamaIndex |
| "I want a local semantic search prototype" | Direct ChromaDB |
| "I want full control while learning" | Manual pipeline |

### Practical rule

Use **LangChain** when RAG is one piece of a multi-step application. Use **LlamaIndex** when the main challenge is ingestion, index, retrieval, and query over data.

> A framework does not replace understanding. It only compresses boilerplate after you know the pipeline.`,
    },
  },
  visual: {
    id: 'langchain-rag-langchain-visual',
    copy: {
      'pt-br': {
        title: 'RAG como fluxo componível',
        loadLabel: 'Load',
        splitLabel: 'Split',
        storeLabel: 'Store',
        retrieveLabel: 'Retrieve',
        answerLabel: 'Answer',
        documentLabel: 'Documentos',
        chunkLabel: 'Chunks',
        vectorstoreLabel: 'VectorStore',
        retrieverLabel: 'Retriever',
        qaChainLabel: 'Chain/Engine',
      },
      'en-us': {
        title: 'RAG as a composable flow',
        loadLabel: 'Load',
        splitLabel: 'Split',
        storeLabel: 'Store',
        retrieveLabel: 'Retrieve',
        answerLabel: 'Answer',
        documentLabel: 'Documents',
        chunkLabel: 'Chunks',
        vectorstoreLabel: 'VectorStore',
        retrieverLabel: 'Retriever',
        qaChainLabel: 'Chain/Engine',
      },
    },
  },
});
