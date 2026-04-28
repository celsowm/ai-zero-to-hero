import { defineSlide } from './_factory';

export const langchainMemory = defineSlide({
  id: 'langchain-memory',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Memory: Conversação com Contexto',
      body: `**Memory** no LangChain é como o histórico de conversação é gerenciado entre chamadas do chain.

### ConversationBufferMemory

Armazena **todas as mensagens** literalmente. Simples mas cresce indefinidamente.

\`\`\`python
snippet:langchain/buffer-memory
\`\`\`

### ConversationSummaryMemory

Usa um LLM para **resumir** a conversação periodicamente. Economiza tokens.

### VectorStoreRetrieverMemory

Armazena conversas em **vector store** e retrieve por relevância. Busca apenas mensagens relevantes.

### Quando usar qual

| Tipo | Uso de Tokens | Contexto | Ideal para |
|---|---|---|---|
| Buffer | Alto (cresce linear) | Completo | Conversas curtas |
| Summary | Baixo (LLM resume) | Resumido | Conversas longas |
| VectorStore | Médio (retrieve top-k) | Relevante | Base de conhecimento |

> Memory é passado para o Agent ou Chain como parâmetro — não é global.`,
    },
    'en-us': {
      title: 'Memory: Conversation with Context',
      body: `**Memory** in LangChain is how conversation history is managed between chain calls.

### ConversationBufferMemory

Stores **all messages** literally. Simple but grows indefinitely.

\`\`\`python
snippet:langchain/buffer-memory
\`\`\`

### ConversationSummaryMemory

Uses an LLM to **summarize** the conversation periodically. Saves tokens.

### VectorStoreRetrieverMemory

Stores conversations in **vector store** and retrieves by relevance. Only fetches relevant messages.

### When to use which

| Type | Token Usage | Context | Ideal for |
|---|---|---|---|
| Buffer | High (grows linear) | Complete | Short conversations |
| Summary | Low (LLM summarizes) | Summarized | Long conversations |
| VectorStore | Medium (retrieve top-k) | Relevant | Knowledge base |

> Memory is passed to the Agent or Chain as a parameter — it's not global.`,
    },
  },
  visual: {
    id: 'langchain-memory-visual',
    copy: {
      'pt-br': {
        title: 'Tipos de Memory',
        bufferLabel: 'Buffer',
        summaryLabel: 'Summary',
        vectorLabel: 'VectorStore',
        bufferDesc: 'Armazena todas as mensagens literalmente — simples mas sem limite',
        summaryDesc: 'LLM resume a conversação — economiza tokens em conversas longas',
        vectorDesc: 'Retrieve por relevância — busca apenas mensagens relevantes no vector store',
        historyLabel: 'Histórico',
        tokenCountLabel: 'Tokens usados',
      },
      'en-us': {
        title: 'Memory Types',
        bufferLabel: 'Buffer',
        summaryLabel: 'Summary',
        vectorLabel: 'VectorStore',
        bufferDesc: 'Stores all messages literally — simple but unlimited',
        summaryDesc: 'LLM summarizes the conversation — saves tokens in long conversations',
        vectorDesc: 'Retrieve by relevance — only fetches relevant messages from vector store',
        historyLabel: 'History',
        tokenCountLabel: 'Tokens used',
      },
    },
  },
});
