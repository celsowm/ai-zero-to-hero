import { defineSlide } from './_factory';

export const ragProblem = defineSlide({
  id: 'rag-problem',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'O problema que RAG resolve',
      body: `Um LLM puro responde com o que está nos pesos e no prompt atual. Isso cria três limites práticos:

1. **Memória curta:** a janela de contexto não comporta todos os documentos da empresa.
2. **Conhecimento congelado:** dados novos, privados ou internos não estão no treinamento.
3. **Alucinação convincente:** quando falta evidência, o modelo ainda tenta completar a resposta.

### O sintoma em produto

O usuário pergunta: "qual é a política de reembolso do plano Pro?"

Sem RAG, o modelo pode responder com uma política plausível. Plausível não é o mesmo que correta.

> RAG começa quando tratamos resposta como consulta a evidência, não como chute linguístico.`,
    },
    'en-us': {
      title: 'The problem RAG solves',
      body: `A plain LLM answers from its weights and the current prompt. That creates three practical limits:

1. **Short memory:** the context window cannot hold every company document.
2. **Frozen knowledge:** new, private, or internal data was not in training.
3. **Convincing hallucination:** when evidence is missing, the model still tries to complete an answer.

### The product symptom

The user asks: "what is the refund policy for the Pro plan?"

Without RAG, the model may answer with a plausible policy. Plausible is not the same as correct.

> RAG starts when we treat answering as evidence lookup, not linguistic guessing.`,
    },
  },
  visual: {
    id: 'rag-memory-limit-visual',
    copy: {
      'pt-br': {
        title: 'Janela de contexto não é base de conhecimento',
        contextLabel: 'Contexto',
        documentsLabel: 'Documentos',
        overflowLabel: 'Fica fora',
        modelLabel: 'LLM',
        problemLabel: 'Resposta sem evidência',
      },
      'en-us': {
        title: 'The context window is not a knowledge base',
        contextLabel: 'Context',
        documentsLabel: 'Documents',
        overflowLabel: 'Left out',
        modelLabel: 'LLM',
        problemLabel: 'Answer without evidence',
      },
    },
  },
});
