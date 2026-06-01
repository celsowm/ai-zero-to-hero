import { defineSlide } from './_factory';

export const chatmlAnatomy = defineSlide({
  id: 'chatml-anatomy',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Anatomia do ChatML: Roles e Tokens Especiais',
      body: `O **ChatML** (Chat Markup Language) é um dos formatos mais adotados pela indústria. Foi popularizado pela OpenAI e hoje é usado por Qwen, internamente em alguns modelos da Microsoft, e em várias implementações de código aberto.

### A estrutura de uma mensagem

Cada mensagem da conversa é embrulhada por dois tokens especiais:

- **\` <|im_start|> \`** — marcador de **início** do turno
- **\` <|im_end|> \`** — marcador de **fim** do turno

Logo após o \`<|im_start|>\` vem o **papel** (role) em uma nova linha, seguido pelo conteúdo e então o \`<|im_end|>\`:

\`\`\`txt
<|im_start|>system
Você é um assistente prestativo.<|im_end|>
<|im_start|>user
Qual é a capital do Brasil?<|im_end|>
<|im_start|>assistant
\`\`\`

### Os três papéis canônicos

| Papel | Função |
|-------|--------|
| **system** | Define a "persona" do modelo: tom, restrições, formato de saída |
| **user** | A pergunta ou instrução do humano |
| **assistant** | A resposta gerada pelo modelo (que ele aprende a produzir) |

### Por que precisamos de tokens especiais?

O modelo é um **completion engine** até o fim. Os tokens especiais funcionam como **âncoras estruturais** que dizem ao modelo: "aqui começa um turno do tipo X" e "aqui termina um turno". Sem eles, o modelo não saberia onde uma mensagem termina e a próxima começa.

### Não é o único formato

Outras famílias usam sintaxes (regras de sintaxe) ligeiramente diferentes:

| Família | Marcador |
|---------|----------|
| **ChatML** (Qwen, alguns Open-source) | \`<|im_start|>{role}\\n...<|im_end|>\\n\` |
| **Llama-2 Chat** | \`[INST] ... [/INST]\` |
| **Mistral Instruct** | \`<s>[INST] ... </s>\` |

O princípio é o mesmo: **delimitar papéis e turnos**. A diferença está nos símbolos concretos — e é por isso que cada modelo traz o seu próprio \`tokenizer.chat_template\`.`,
    },
    'en-us': {
      title: 'Anatomy of ChatML: Roles and Special Tokens',
      body: `**ChatML** (Chat Markup Language) is one of the most adopted formats in the industry. It was popularized by OpenAI and is now used by Qwen, internally in some Microsoft models, and across several open-source implementations.

### The structure of a message

Each conversation message is wrapped by two special tokens:

- **\` <|im_start|> \`** — turn **start** marker
- **\` <|im_end|> \`** — turn **end** marker

Right after \`<|im_start|>\` comes the **role** on a new line, followed by the content and then \`<|im_end|>\`:

\`\`\`txt
<|im_start|>system
You are a helpful assistant.<|im_end|>
<|im_start|>user
What is the capital of Brazil?<|im_end|>
<|im_start|>assistant
\`\`\`

### The three canonical roles

| Role | Function |
|------|----------|
| **system** | Sets the model's "persona": tone, constraints, output format |
| **user** | The human's question or instruction |
| **assistant** | The model's generated response (which it learns to produce) |

### Why do we need special tokens?

The model is still a **completion engine** under the hood. Special tokens work as **structural anchors** that tell the model: "a turn of type X starts here" and "a turn ends here". Without them, the model would not know where one message ends and the next begins.

### It's not the only format

Other families use slightly different syntaxes:

| Family | Marker |
|--------|--------|
| **ChatML** (Qwen, some open-source) | \`<|im_start|>{role}\\n...<|im_end|>\\n\` |
| **Llama-2 Chat** | \`[INST] ... [/INST]\` |
| **Mistral Instruct** | \`<s>[INST] ... </s>\` |

The principle is the same: **delimit roles and turns**. The difference lies in the concrete symbols — and that's why each model ships with its own \`tokenizer.chat_template\`.`,
    },
  },
  visual: {
    id: 'pytorch-dual-code',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Template ChatML' },
          { label: 'Código Python' },
        ],
        codePanels: [
          {
            title: 'Estrutura de uma conversa ChatML',
            description: 'Tokens especiais <|im_start|> e <|im_end|> delimitam o início e o fim de cada turno. system → user → assistant.',
            source: { snippetId: 'chatml/chatml-template', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 2], content: 'Comentários explicando o significado dos tokens especiais <|im_start|> e <|im_end|>.' },
              { lineRange: [4, 10], content: 'Exemplo de conversa ChatML completa: system define a persona, user faz a pergunta, assistant responde.' },
            ],
          },
          {
            title: 'chatml-anatomy.py',
            description: 'Demonstração prática de como construir tokens ChatML com o tokenizador da Qwen.',
            source: { snippetId: 'chatml/chatml-anatomy', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 5], content: 'Importamos o AutoTokenizer e carregamos o tokenizador de um modelo de chat pequeno (Qwen 3.5 0.8B), que já entende ChatML nativamente.' },
              { lineRange: [6, 11], content: 'Convertemos os tokens especiais <|im_start|> e <|im_end|> em IDs inteiros e imprimimos o mapeamento para inspecionar o vocabulário.' },
              { lineRange: [12, 16], content: 'Cada turno começa com <|im_start|>{papel}\\n — o nome do papel (system/user/assistant) vem na mesma linha do token de início.' },
              { lineRange: [17, 22], content: 'Montamos a conversa concatenando marcador + conteúdo + <|im_end|>\\n. O último turno para no marcador de início do assistant — o modelo continua a partir dele.' },
              { lineRange: [23, 27], content: 'Imprimimos o resultado para vermos a estrutura real: tokens especiais delimitando cada papel e cada turno.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'ChatML Template' },
          { label: 'Python Code' },
        ],
        codePanels: [
          {
            title: 'Structure of a ChatML conversation',
            description: 'Special tokens <|im_start|> and <|im_end|> delimit the start and end of each turn. system → user → assistant.',
            source: { snippetId: 'chatml/chatml-template', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 2], content: 'Comments explaining the meaning of the special tokens <|im_start|> and <|im_end|>.' },
              { lineRange: [4, 10], content: 'Complete ChatML conversation example: system sets the persona, user asks the question, assistant answers.' },
            ],
          },
          {
            title: 'chatml-anatomy.py',
            description: 'Practical demonstration of how to build ChatML tokens using the Qwen tokenizer.',
            source: { snippetId: 'chatml/chatml-anatomy', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 5], content: 'We import AutoTokenizer and load the tokenizer of a small chat model (Qwen 3.5 0.8B), which already understands ChatML natively.' },
              { lineRange: [6, 11], content: 'We convert the special tokens <|im_start|> and <|im_end|> into integer IDs and print the mapping to inspect the vocabulary.' },
              { lineRange: [12, 16], content: 'Each turn starts with <|im_start|>{role}\\n — the role name (system/user/assistant) comes on the same line as the start token.' },
              { lineRange: [17, 22], content: 'We build the conversation by concatenating marker + content + <|im_end|>\\n. The last turn stops at the assistant start marker — the model continues from there.' },
              { lineRange: [23, 27], content: 'We print the result to see the real structure: special tokens delimiting each role and each turn.' },
            ],
          },
        ],
      },
    },
  },
});
