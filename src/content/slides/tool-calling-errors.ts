import { defineSlide } from './_factory';

export const toolCallingErrors = defineSlide({
  id: 'tool-calling-errors',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Tratamento de Erros em Tool Calling',
      body: `Ferramentas falham: APIs ficam fora do ar, timeouts acontecem, parâmetros são inválidos. O sistema precisa lidar com isso **graciosamente**.

### Tipos comuns de erro

\`\`\`python
snippet:tool-calling/error-handling
\`\`\`

### Estratégias de recuperação

1. **Retry** — repetir a chamada (exponencial backoff)
2. **Fallback** — usar alternativa (ex: API secundária)
3. **Graceful degradation** — informar o usuário que não foi possível
4. **Re-prompt** — enviar o erro de volta ao LLM para ele se adaptar

> Enviar o erro de volta ao LLM (**re-prompt**) é poderoso: o modelo pode tentar outra ferramenta ou reformular a resposta.`,
    },
    'en-us': {
      title: 'Error Handling in Tool Calling',
      body: `Tools fail: APIs go down, timeouts happen, parameters are invalid. The system needs to handle this **gracefully**.

### Common error types

\`\`\`python
snippet:tool-calling/error-handling
\`\`\`

### Recovery strategies

1. **Retry** — repeat the call (exponential backoff)
2. **Fallback** — use alternative (e.g., secondary API)
3. **Graceful degradation** — inform the user it wasn't possible
4. **Re-prompt** — send the error back to the LLM to adapt

> Sending the error back to the LLM (**re-prompt**) is powerful: the model can try another tool or reframe the answer.`,
    },
  },
  visual: {
    id: 'tool-calling-errors-visual',
    copy: {
      'pt-br': {
        titleLabel: 'Tratamento de Erros',
        successLabel: 'Sucesso ✓',
        errorLabel: 'Erro ✗',
        malformedLabel: 'JSON malformado',
        notFoundLabel: 'Tool não encontrada',
        timeoutLabel: 'Timeout (>30s)',
        retryLabel: '1. Retry (backoff)',
        fallbackLabel: '2. Fallback',
        recoveryLabel: '3. Re-prompt ao LLM',
      },
      'en-us': {
        titleLabel: 'Error Handling',
        successLabel: 'Success ✓',
        errorLabel: 'Error ✗',
        malformedLabel: 'Malformed JSON',
        notFoundLabel: 'Tool not found',
        timeoutLabel: 'Timeout (>30s)',
        retryLabel: '1. Retry (backoff)',
        fallbackLabel: '2. Fallback',
        recoveryLabel: '3. Re-prompt to LLM',
      },
    },
  },
});
