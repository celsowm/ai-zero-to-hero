import { defineSlide } from './_factory';

export const llamaindexExercise = defineSlide({
  id: 'llamaindex-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercício: Fix the Bug — RAG Pipeline',
      body: `O pipeline RAG abaixo tem um bug sutil. Execute, observe o resultado errado, e encontre o problema.`,
    },
    'en-us': {
      title: 'Exercise: Fix the Bug — RAG Pipeline',
      body: `The RAG pipeline below has a subtle bug. Run it, observe the wrong output, and find the problem.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercício: Fix the Bug — RAG com LlamaIndex',
        description: 'Encontre e corrija o bug no pipeline RAG do LlamaIndex.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Parabéns! Bug corrigido com sucesso!',
        errorMessage: 'Alguns testes falharam. Revise seu código.',
        hintLabel: 'Dica',
        outputLabel: 'Saída',
        exercises: [
          {
            id: '1. Retriever com top_k errado',
            instructions: 'O retriever está buscando apenas 1 node, mas o contexto precisa de pelo menos 3. Corrija o `similarity_top_k` para 3 e verifique que a resposta melhora.',
            starterCode: 'from llama_index.core import VectorStoreIndex, Document\nfrom llama_index.core.retrievers import VectorIndexRetriever\nfrom llama_index.core.query_engine import RetrieverQueryEngine\n\n# cria index com documentos\ndocs = [\n    Document(text="GPT-2 é um modelo decoder-only com 1.5B parâmetros."),\n    Document(text="BERT é um modelo encoder-only com 340M parâmetros."),\n    Document(text="T5 é um modelo encoder-decoder com 11B parâmetros."),\n]\nindex = VectorStoreIndex.from_documents(docs)\n\n# BUG: top_k está muito baixo!\nretriever = VectorIndexRetriever(\n    index=index,\n    similarity_top_k=1  # <- problema aqui\n)\n\nquery_engine = RetrieverQueryEngine(retriever)\nresponse = query_engine.query("Compare GPT-2, BERT e T5")\nprint(f"Nodes recuperados: {len(response.source_nodes)}")\nprint(f"Resposta: {response}")',
            validators: [
              {
                type: 'assertOutput',
                expected: 'Nodes recuperados: 3',
              },
            ],
            hints: [
              'Procure por similarity_top_k no código.',
              'O valor correto é 3 para recuperar todos os documentos.',
            ],
          },
        ],
      },
      'en-us': {
        title: 'Exercise: Fix the Bug — RAG with LlamaIndex',
        description: 'Find and fix the bug in the LlamaIndex RAG pipeline.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Congratulations! Bug fixed successfully!',
        errorMessage: 'Some tests failed. Please review your code.',
        hintLabel: 'Hint',
        outputLabel: 'Output',
        exercises: [
          {
            id: '1. Retriever with wrong top_k',
            instructions: 'The retriever is fetching only 1 node, but the context needs at least 3. Fix the `similarity_top_k` to 3 and verify the answer improves.',
            starterCode: 'from llama_index.core import VectorStoreIndex, Document\nfrom llama_index.core.retrievers import VectorIndexRetriever\nfrom llama_index.core.query_engine import RetrieverQueryEngine\n\n# create index with documents\ndocs = [\n    Document(text="GPT-2 is a decoder-only model with 1.5B parameters."),\n    Document(text="BERT is an encoder-only model with 340M parameters."),\n    Document(text="T5 is an encoder-decoder model with 11B parameters."),\n]\nindex = VectorStoreIndex.from_documents(docs)\n\n# BUG: top_k is too low!\nretriever = VectorIndexRetriever(\n    index=index,\n    similarity_top_k=1  # <- problem here\n)\n\nquery_engine = RetrieverQueryEngine(retriever)\nresponse = query_engine.query("Compare GPT-2, BERT and T5")\nprint(f"Retrieved nodes: {len(response.source_nodes)}")\nprint(f"Response: {response}")',
            validators: [
              {
                type: 'assertOutput',
                expected: 'Retrieved nodes: 3',
              },
            ],
            hints: [
              'Look for similarity_top_k in the code.',
              'The correct value is 3 to retrieve all documents.',
            ],
          },
        ],
      },
    },
  },
});
