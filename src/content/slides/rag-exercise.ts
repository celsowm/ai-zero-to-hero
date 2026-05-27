import { defineSlide } from './_factory';

export const ragExercise = defineSlide({
  id: 'rag-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercício: corrija o RAG ruim',
      body: `O mini-retriever abaixo recupera pouco contexto e não mostra fontes. Corrija a configuração para recuperar três chunks e exibir as fontes usadas.`,
    },
    'en-us': {
      title: 'Exercise: fix the bad RAG',
      body: `The mini-retriever below retrieves too little context and does not show sources. Fix the configuration to retrieve three chunks and display the sources used.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercício: top-k e fontes',
        description: 'Ajuste o retrieval para recuperar contexto suficiente e tornar a resposta auditável.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Correto: o retrieval recupera três chunks e mostra as fontes.',
        errorMessage: 'Ainda há algo errado. Verifique top_k e mostrar_fontes.',
        hintLabel: 'Dica',
        outputLabel: 'Saída',
        exercises: [
          {
            id: '1. Corrigir top-k e fontes',
            instructions: 'Altere `top_k` para 3 e `mostrar_fontes` para True. A saída deve mostrar três chunks recuperados e a linha de fontes.',
            snippetId: 'rag_v2/exercise',
            validators: [
              { type: 'assertOutput', expected: 'Chunks recuperados: 3' },
              { type: 'assertOutput', expected: 'Fontes:' },
            ],
            hints: [
              'Procure as variáveis logo abaixo do comentário BUG.',
              '`top_k` controla quantos documentos entram no ranking final.',
              '`mostrar_fontes` precisa estar ativado para imprimir os IDs dos documentos.',
            ],
          },
        ],
      },
      'en-us': {
        title: 'Exercise: top-k and sources',
        description: 'Tune retrieval to recover enough context and make the answer auditable.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Correct: retrieval returns three chunks and shows the sources.',
        errorMessage: 'Something is still wrong. Check top_k and show_sources.',
        hintLabel: 'Hint',
        outputLabel: 'Output',
        exercises: [
          {
            id: '1. Fix top-k and sources',
            instructions: 'Change `top_k` to 3 and `show_sources` to True. The output should show three retrieved chunks and the sources line.',
            snippetId: 'rag_v2/exercise',
            validators: [
              { type: 'assertOutput', expected: 'Retrieved chunks: 3' },
              { type: 'assertOutput', expected: 'Sources:' },
            ],
            hints: [
              'Look for the variables right below the BUG comment.',
              '`top_k` controls how many documents enter the final ranking.',
              '`show_sources` must be enabled to print document IDs.',
            ],
          },
        ],
      },
    },
  },
});
