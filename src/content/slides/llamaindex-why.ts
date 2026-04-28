import { defineSlide } from './_factory';

export const llamaindexWhy = defineSlide({
  id: 'llamaindex-why',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Por que LlamaIndex?',
      body: `Até agora usamos RAG **from scratch** — o que é ótimo para entender o conceito. Mas em produção, precisamos de algo mais robusto.

### O problema do RAG manual

Fizemos um RAG funcional, mas ele não tem:

- **Chunking inteligente**: cortar por tamanho fixo quebra frases no meio
- **Retrievers múltiplos**: só usamos busca vetorial, e se keyword for melhor?
- **Query engines**: não temos SubQuestion, Routing, ou composição
- **Chat com memória**: cada query é independente, sem contexto de conversação
- **Agents**: não temos ferramentas, raciocínio passo-a-passo

### LlamaIndex resolve isso

**LlamaIndex** (ex-GPT Index) é o framework de RAG production-ready mais popular do ecossistema LLM.

> RAG from scratch ensina **o conceito**. LlamaIndex ensina **a produção**.`,
    },
    'en-us': {
      title: 'Why LlamaIndex?',
      body: `So far we've used RAG **from scratch** — great for understanding the concept. But in production, we need something more robust.

### The problem with manual RAG

We built a working RAG, but it lacks:

- **Intelligent chunking**: fixed-size cuts break sentences in the middle
- **Multiple retrievers**: we only used vector search, what if keyword is better?
- **Query engines**: no SubQuestion, Routing, or composition
- **Chat with memory**: each query is independent, no conversation context
- **Agents**: no tools, no step-by-step reasoning

### LlamaIndex solves this

**LlamaIndex** (formerly GPT Index) is the most popular production-ready RAG framework in the LLM ecosystem.

> RAG from scratch teaches **the concept**. LlamaIndex teaches **production**.`,
    },
  },
  visual: {
    id: 'llamaindex-why-visual',
    copy: {
      'pt-br': {
        title: 'Do RAG Manual ao Production-Ready',
        beforeLabel: 'Sem LlamaIndex',
        afterLabel: 'Com LlamaIndex',
        pain1: 'Chunking por tamanho fixo quebra frases no meio',
        pain2: 'Apenas busca vetorial — keyword search seria melhor às vezes',
        pain3: 'Sem memória de conversação — cada pergunta é isolada',
        solution1: 'TokenTextSplitter preserva limites de sentenças',
        solution2: 'RouterQueryEngine escolhe o melhor retriever automaticamente',
        solution3: 'Chat Engine mantém histórico condensing questions',
      },
      'en-us': {
        title: 'From Manual RAG to Production-Ready',
        beforeLabel: 'Without LlamaIndex',
        afterLabel: 'With LlamaIndex',
        pain1: 'Fixed-size chunking breaks sentences in the middle',
        pain2: 'Only vector search — keyword would be better sometimes',
        pain3: 'No conversation memory — each question is isolated',
        solution1: 'TokenTextSplitter preserves sentence boundaries',
        solution2: 'RouterQueryEngine auto-selects the best retriever',
        solution3: 'Chat Engine keeps history by condensing questions',
      },
    },
  },
});
