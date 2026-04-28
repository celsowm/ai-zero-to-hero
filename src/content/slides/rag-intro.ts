import { defineSlide } from './_factory';

export const ragIntro = defineSlide({
  id: 'rag-intro',
  type: 'two-column',
  options: {
    "columnRatios": [0.5, 0.5]
  },
  content: {
    'pt-br': {
      title: `RAG: A Solução — Retrieval-Augmented Generation`,
      body: `RAG resolve os dois problemas de uma vez: dá ao modelo **acesso a informação atual** e **fundamenta respostas em fontes reais**.

### A ideia central

Em vez de confiar apenas nos pesos congelados do modelo, **buscamos informações relevantes em uma base de conhecimento externa** e as injetamos no prompt.

### Os 3 passos do RAG

1. **Retrieve (Recuperar):** transforma a pergunta em vetor, busca documentos semanticamente similares em um banco de dados vetorial.

2. **Augment (Aumentar):** monta um prompt contendo os documentos recuperados + a pergunta original.

3. **Generate (Gerar):** o LLM recebe o contexto e gera uma resposta fundamentada nas fontes.

> RAG é como dar ao modelo um **livro aberto** durante a prova — ele ainda precisa saber escrever, mas agora pode consultar a fonte certa.

\`\`\`python
snippet:rag/rag-intro
\`\`\``,
    },
    'en-us': {
      title: `RAG: The Solution — Retrieval-Augmented Generation`,
      body: `RAG solves both problems at once: it gives the model **access to current information** and **grounds answers in real sources**.

### The core idea

Instead of relying only on the model's frozen weights, we **search for relevant information in an external knowledge base** and inject it into the prompt.

### The 3 steps of RAG

1. **Retrieve:** transforms the question into a vector, searches for semantically similar documents in a vector database.

2. **Augment:** builds a prompt containing the retrieved documents + the original question.

3. **Generate:** the LLM receives the context and generates an answer grounded in the sources.

> RAG is like giving the model an **open book** during the exam — it still needs to know how to write, but now it can consult the right source.

\`\`\`python
snippet:rag/rag-intro
\`\`\``,
    },
  },
  visual: {
    id: 'rag-intro-visual',
    copy: {
      "pt-br": {
        "title": "Retrieve → Augment → Generate",
        "retrieveLabel": "1. Recuperar",
        "augmentLabel": "2. Aumentar",
        "generateLabel": "3. Gerar",
        "queryLabel": "Pergunta",
        "vectorDbLabel": "Vector DB",
        "contextLabel": "Contexto",
        "llmLabel": "LLM",
        "answerLabel": "Resposta"
      },
      "en-us": {
        "title": "Retrieve → Augment → Generate",
        "retrieveLabel": "1. Retrieve",
        "augmentLabel": "2. Augment",
        "generateLabel": "3. Generate",
        "queryLabel": "Query",
        "vectorDbLabel": "Vector DB",
        "contextLabel": "Context",
        "llmLabel": "LLM",
        "answerLabel": "Answer"
      }
    },
  },
});
