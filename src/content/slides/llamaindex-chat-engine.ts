import { defineSlide } from './_factory';

export const llamaindexChatEngine = defineSlide({
  id: 'llamaindex-chat-engine',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Chat Engine: Conversas com Memória',
      body: `A diferença entre **Query Engine** e **Chat Engine** é a **memória de conversação**.

### Query Engine = one-shot

Cada pergunta é independente. O retriever busca do zero. O LLM não sabe o que você perguntou antes.

### Chat Engine = multi-turn

Mantém **histórico** de conversação. Quando você diz "explique mais sobre isso", o Chat Engine sabe do que você está falando.

### Como funciona: condense_question

\`\`\`python
snippet:llamaindex/chat-engine
\`\`\`

1. Nova pergunta: "e a attention?"
2. Chat Engine **condensa** com o histórico: "e a attention do Transformer que você mencionou?"
3. Busca contexto com a query condensada
4. Gera resposta com contexto + histórico

### Modos do Chat Engine

- **condense_question**: condensa a pergunta (mais barato)
- **react**: usa raciocínio ReAct com ferramentas (mais poderoso)
- **best**: escolhe automaticamente entre os dois

> Chat Engine é essencial para **interfaces de chat** onde o usuário faz perguntas de acompanhamento.`,
    },
    'en-us': {
      title: 'Chat Engine: Conversations with Memory',
      body: `The difference between **Query Engine** and **Chat Engine** is **conversation memory**.

### Query Engine = one-shot

Each question is independent. The retriever searches from scratch. The LLM doesn't know what you asked before.

### Chat Engine = multi-turn

Keeps **conversation history**. When you say "explain more about that", the Chat Engine knows what you're referring to.

### How it works: condense_question

\`\`\`python
snippet:llamaindex/chat-engine
\`\`\`

1. New question: "and the attention?"
2. Chat Engine **condenses** with history: "and the attention of the Transformer you mentioned?"
3. Searches context with the condensed query
4. Generates response with context + history

### Chat Engine modes

- **condense_question**: condenses the question (cheaper)
- **react**: uses ReAct reasoning with tools (more powerful)
- **best**: automatically chooses between the two

> Chat Engine is essential for **chat interfaces** where the user asks follow-up questions.`,
    },
  },
  visual: {
    id: 'llamaindex-chat-engine-visual',
    copy: {
      'pt-br': {
        title: 'Query Engine vs Chat Engine',
        queryEngineLabel: 'Query Engine',
        chatEngineLabel: 'Chat Engine',
        oneShot: 'One-shot (sem memória)',
        multiTurn: 'Multi-turn (com memória)',
        condenseQuestion: '"e a attention?" → "e a attention do Transformer?"',
        contextLabel: 'Contexto',
        memoryLabel: 'Chat Memory',
        historyLabel: '📜 Histórico: Q1 → R1 → Q2',
      },
      'en-us': {
        title: 'Query Engine vs Chat Engine',
        queryEngineLabel: 'Query Engine',
        chatEngineLabel: 'Chat Engine',
        oneShot: 'One-shot (no memory)',
        multiTurn: 'Multi-turn (with memory)',
        condenseQuestion: '"and the attention?" → "and the attention of the Transformer?"',
        contextLabel: 'Context',
        memoryLabel: 'Chat Memory',
        historyLabel: '📜 History: Q1 → R1 → Q2',
      },
    },
  },
});
