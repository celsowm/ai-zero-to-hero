import { defineSlide } from './_factory';

export const ragPromptAssembly = defineSlide({
  id: 'rag-prompt-assembly',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Augment: montar o prompt com evidência',
      body: `Depois do retrieval, o sistema monta um prompt com contexto e pergunta.

### Um bom prompt de RAG exige

- separar claramente **contexto** e **pergunta**;
- pedir resposta baseada apenas no contexto;
- instruir o modelo a dizer "não sei" quando faltar evidência;
- preservar fontes ou IDs dos chunks.

> RAG fraco joga texto no prompt. RAG bom define um contrato de evidência.`,
      rightBody: `\`\`\`txt
Você é um assistente de suporte.
Responda apenas com base no contexto.
Se a resposta não estiver no contexto, diga que não sabe.

Contexto:
[politicas.md]
Reembolsos são aceitos em até 7 dias.

Pergunta:
Qual é o prazo de reembolso?
\`\`\``,
    },
    'en-us': {
      title: 'Augment: build the prompt with evidence',
      body: `After retrieval, the system builds a prompt with context and question.

### A good RAG prompt requires

- clearly separating **context** and **question**;
- asking for an answer based only on context;
- instructing the model to say "I do not know" when evidence is missing;
- preserving sources or chunk IDs.

> Weak RAG dumps text into the prompt. Good RAG defines an evidence contract.`,
      rightBody: `\`\`\`txt
You are a support assistant.
Answer only from the context.
If the answer is not in the context, say you do not know.

Context:
[policies.md]
Refunds are accepted within 7 days.

Question:
What is the refund window?
\`\`\``,
    },
  },
  visual: {
    id: 'rag-context-injection-visual',
    copy: {
      'pt-br': {
        title: 'Contexto entra antes da geração',
        queryLabel: 'Pergunta',
        contextLabel: 'Contexto recuperado',
        promptLabel: 'Prompt aumentado',
        llmLabel: 'LLM',
        answerLabel: 'Resposta',
      },
      'en-us': {
        title: 'Context enters before generation',
        queryLabel: 'Question',
        contextLabel: 'Retrieved context',
        promptLabel: 'Augmented prompt',
        llmLabel: 'LLM',
        answerLabel: 'Answer',
      },
    },
  },
});
