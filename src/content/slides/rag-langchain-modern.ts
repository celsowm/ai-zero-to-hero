import { defineSlide } from './_factory';

export const ragLangchainModern = defineSlide({
  id: 'rag-langchain-modern',
  type: 'two-column',
  options: { columnRatios: [0.4, 0.6] },
  content: {
    'pt-br': {
      title: 'RAG moderno com LangChain',
      body: `LangChain é bom quando RAG faz parte de uma aplicação maior: prompts, modelos, parsers, tools e chains.

### O padrão atual

Use \`create_stuff_documents_chain\` para formatar documentos no prompt e \`create_retrieval_chain\` para ligar retriever + geração.

Evite ensinar \`RetrievalQA\` como caminho principal: é uma API antiga perto do padrão LCEL/retrieval chain.

### Dependências

\`\`\`bash
pip install langchain langchain-openai langchain-chroma
\`\`\``,
      rightBody: `\`\`\`python
snippet:rag_v2/langchain-modern-rag
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'Imports modernos: retrieval chain, document chain, Chroma, documentos, prompt e modelos.' },
        { lineRange: [8, 16], content: 'Documentos com texto e metadata. A fonte precisa acompanhar o chunk desde o começo.' },
        { lineRange: [18, 23], content: 'Vector store e retriever. O top-k é configurado na borda de recuperação.' },
        { lineRange: [24, 32], content: 'Prompt de grounding: responder só pelo contexto e admitir quando a resposta não está lá.' },
        { lineRange: [34, 43], content: 'A composição moderna separa chain de documentos e retrieval chain; evita a API antiga RetrievalQA.' },
      ],
    },
    'en-us': {
      title: 'Modern RAG with LangChain',
      body: `LangChain is useful when RAG is part of a larger application: prompts, models, parsers, tools, and chains.

### The current pattern

Use \`create_stuff_documents_chain\` to format documents into the prompt and \`create_retrieval_chain\` to connect retriever + generation.

Avoid teaching \`RetrievalQA\` as the main path: it is an older API compared with the LCEL/retrieval chain pattern.

### Dependencies

\`\`\`bash
pip install langchain langchain-openai langchain-chroma
\`\`\``,
      rightBody: `\`\`\`python
snippet:rag_v2/langchain-modern-rag
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'Modern imports: retrieval chain, document chain, Chroma, documents, prompt, and models.' },
        { lineRange: [8, 16], content: 'Documents with text and metadata. The source should travel with the chunk from the start.' },
        { lineRange: [18, 23], content: 'Vector store and retriever. Top-k is configured at the retrieval boundary.' },
        { lineRange: [24, 32], content: 'Grounding prompt: answer only from context and admit when the answer is not there.' },
        { lineRange: [34, 43], content: 'The modern composition separates the document chain and retrieval chain; it avoids the older RetrievalQA API.' },
      ],
    },
  },
});
