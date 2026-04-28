import { defineSlide } from './_factory';

export const langchainWhy = defineSlide({
  id: 'langchain-why',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Por que LangChain?',
      body: `Após ver LlamaIndex para RAG, vamos explorar o **framework de orquestração de LLMs** mais popular do ecossistema.

### O problema de usar LLMs diretamente

Chamar a API do OpenAI/Groq diretamente funciona, mas em produção você precisa de:

- **Prompt management**: templates parametrizados, few-shot examples, chat history
- **Composição**: encadear chamadas de LLM, parsers de output, retry logic
- **Ferramentas**: search, calculators, code execution, APIs externas
- **Agents**: raciocínio loop ReAct com tool selection automático

### LangChain resolve isso

**LangChain** é o framework de orquestração que padroniza como você conecta LLMs ao mundo externo.

> LlamaIndex foca em **RAG**. LangChain foca em **orquestração geral** — RAG é um dos muitos casos de uso.`,
    },
    'en-us': {
      title: 'Why LangChain?',
      body: `After seeing LlamaIndex for RAG, let's explore the most popular **LLM orchestration framework** in the ecosystem.

### The problem with using LLMs directly

Calling OpenAI/Groq API directly works, but in production you need:

- **Prompt management**: parameterized templates, few-shot examples, chat history
- **Composition**: chain LLM calls, output parsers, retry logic
- **Tools**: search, calculators, code execution, external APIs
- **Agents**: ReAct reasoning loop with automatic tool selection

### LangChain solves this

**LangChain** is the orchestration framework that standardizes how you connect LLMs to the outside world.

> LlamaIndex focuses on **RAG**. LangChain focuses on **general orchestration** — RAG is one of many use cases.`,
    },
  },
  visual: {
    id: 'langchain-why-visual',
    copy: {
      'pt-br': {
        title: 'Do LLM Direto à Orquestração',
        beforeLabel: 'Sem LangChain',
        afterLabel: 'Com LangChain',
        pain1: 'Prompts hardcoded — difícil iterar e versionar',
        pain2: 'Sem composição — cada chamada é independente',
        pain3: 'Sem ferramentas — LLM não pode buscar dados externos',
        solution1: 'PromptTemplates parametrizados e versionáveis',
        solution2: 'LCEL encadeia chamadas com pipe operator (|)',
        solution3: 'Tools + Agents dão poderes de ação ao LLM',
      },
      'en-us': {
        title: 'From Direct LLM to Orchestration',
        beforeLabel: 'Without LangChain',
        afterLabel: 'With LangChain',
        pain1: 'Hardcoded prompts — hard to iterate and version',
        pain2: 'No composition — each call is independent',
        pain3: 'No tools — LLM cannot fetch external data',
        solution1: 'Parameterized, versionable PromptTemplates',
        solution2: 'LCEL chains calls with pipe operator (|)',
        solution3: 'Tools + Agents give the LLM action powers',
      },
    },
  },
});
