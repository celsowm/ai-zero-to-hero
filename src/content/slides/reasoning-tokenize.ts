import { defineSlide } from './_factory';

export const reasoningTokenize = defineSlide({
  id: 'reasoning-tokenize',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Testando o Tokenizer',
      body: `Antes de explorar o reasoning, vamos entender como o modelo enxerga o texto.

### O que é tokenização?

Tokenização é o processo de quebrar o texto em **pedaços menores** (tokens) que o modelo consegue processar. Cada token pode ser uma palavra, parte de uma palavra ou um caractere especial.

### Por que testar?

- Saber quantos tokens o modelo usa ajuda a **estimar custos** e limites de contexto
- Diferentes modelos usam tokenizers diferentes (mesmo texto pode ter contagens diferentes)
- O endpoint \`/tokenize\` é útil para **debug e validação** antes de enviar prompts grandes

### Como funciona

O servidor llama.cpp expõe um endpoint \`/tokenize\` que recebe um texto e devolve os tokens correspondentes. Basta um POST com o conteúdo no JSON.`,
      rightBody: `\`\`\`python
snippet:requests/reasoning-tokenize
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'Importamos a biblioteca `requests` para fazer chamadas HTTP.' },
        { lineRange: [3, 6], content: 'Definimos a URL do endpoint `/tokenize` do servidor local e montamos o payload com o texto a ser tokenizado.' },
        { lineRange: [8, 12], content: 'Fazemos uma requisição POST para o servidor, verificamos se houve erro com `raise_for_status()` e salvamos o JSON de resposta.' },
        { lineRange: [14, 15], content: 'Exibimos o resultado completo e um separador visual.' },
        { lineRange: [17, 21], content: 'Extraímos a lista de tokens (tentando diferentes chaves como `tokens`, `input_ids` ou `token_ids`), exibimos a quantidade total e os valores.' },
      ],
    },
    'en-us': {
      title: 'Testing the Tokenizer',
      body: `Before exploring reasoning, let's understand how the model sees text.

### What is tokenization?

Tokenization is the process of breaking text into **smaller pieces** (tokens) that the model can process. Each token can be a word, part of a word, or a special character.

### Why test it?

- Knowing how many tokens the model uses helps **estimate costs** and context limits
- Different models use different tokenizers (same text can have different counts)
- The \`/tokenize\` endpoint is useful for **debugging and validation** before sending large prompts

### How it works

The llama.cpp server exposes a \`/tokenize\` endpoint that receives text and returns the corresponding tokens. Just POST the content as JSON.`,
      rightBody: `\`\`\`python
snippet:requests/reasoning-tokenize
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'We import the `requests` library to make HTTP calls.' },
        { lineRange: [3, 6], content: 'We define the `/tokenize` endpoint URL and build the payload with the text to be tokenized.' },
        { lineRange: [8, 12], content: 'We make a POST request to the server, check for errors with `raise_for_status()`, and save the JSON response.' },
        { lineRange: [14, 15], content: 'We print the full result and a visual separator.' },
        { lineRange: [17, 21], content: 'We extract the token list (trying different keys like `tokens`, `input_ids`, or `token_ids`), display the total count, and print the tokens.' },
      ],
    },
  },
});
