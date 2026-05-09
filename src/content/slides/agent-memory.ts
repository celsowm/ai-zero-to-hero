import { defineSlide } from './_factory';

export const agentMemory = defineSlide({
  id: 'agent-memory',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'Memória do Agente',
      body: `A memória de um agente não é um bloco único. São **três tipos** com propósitos diferentes:

1. **Conversacional**: o que foi dito nesta sessão (histórico do chat)
2. **Semântica**: conhecimento externo (documentos, base de dados, RAG)
3. **Procedural**: como usar ferramentas (instruções, schemas, APIs disponíveis)

> Sem memória conversacional, o agente não sabe que "ele" se refere à mensagem anterior. Sem memória semântica, não conhece seus dados. Sem memória procedural, não sabe quais ferramentas existem.

snippet:intelligent-agents/agent-memory`,
    },
    'en-us': {
      title: 'Agent Memory',
      body: `An agent's memory isn't a single block. There are **three types** with different purposes:

1. **Conversational**: what was said in this session (chat history)
2. **Semantic**: external knowledge (documents, database, RAG)
3. **Procedural**: how to use tools (instructions, schemas, available APIs)

> Without conversical memory, the agent doesn't know that "it" refers to the previous message. Without semantic memory, it doesn't know your data. Without procedural memory, it doesn't know what tools exist.

snippet:intelligent-agents/agent-memory`,
    },
  },
  visual: {
    id: 'agent-memory',
    copy: {
      'pt-br': {
        title: 'Os 3 Tipos de Memória de Um Agente',
        subtitle: 'Cada tipo serve a um propósito diferente',
        conversationalLabel: 'Conversacional',
        conversationalDesc: 'Histórico da sessão: o que foi dito antes',
        semanticLabel: 'Semântica',
        semanticDesc: 'Conhecimento externo: documentos, dados, fatos',
        proceduralLabel: 'Procedural',
        proceduralDesc: 'Como usar ferramentas: instruções, schemas, APIs',
        sendButton: 'Enviar',
        userInput: 'Qual o preço daquele produto que vimos ontem?',
        memoryUsedLabel: 'Memórias usadas:',
        convoExample1: 'Ontem: "Mostre iPhones disponíveis"',
        convoExample2: 'Hoje: "Qual o preço daquele?" → "aquele" = iPhone 15',
        semanticExample: 'Base de dados: iPhone 15 = R$ 7.299 (Loja B)',
        proceduralExample: 'Ferramenta disponível: buscar_preco(loja, produto)',
        insightTitle: 'Insight',
        insightText: 'Sem memória, cada interação é do zero. Com os 3 tipos, o agente tem contexto, conhecimento e capacidade de agir.',
      },
      'en-us': {
        title: 'The 3 Types of Agent Memory',
        subtitle: 'Each type serves a different purpose',
        conversationalLabel: 'Conversational',
        conversationalDesc: 'Session history: what was said before',
        semanticLabel: 'Semantic',
        semanticDesc: 'External knowledge: documents, data, facts',
        proceduralLabel: 'Procedural',
        proceduralDesc: 'How to use tools: instructions, schemas, APIs',
        sendButton: 'Send',
        userInput: 'What\'s the price of that product we saw yesterday?',
        memoryUsedLabel: 'Memories used:',
        convoExample1: 'Yesterday: "Show available iPhones"',
        convoExample2: 'Today: "What\'s the price of that one?" → "that" = iPhone 15',
        semanticExample: 'Database: iPhone 15 = R$ 7,299 (Store B)',
        proceduralExample: 'Available tool: search_price(store, product)',
        insightTitle: 'Insight',
        insightText: 'Without memory, every interaction starts from zero. With all 3 types, the agent has context, knowledge, and the ability to act.',
      },
    },
  },
});
