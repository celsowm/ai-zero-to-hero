import { defineSlide } from './_factory';

export const applyChatTemplateQwen = defineSlide({
  id: 'apply-chat-template-qwen',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Vendo o `apply_chat_template` Funcionar com Qwen 3.5',
      body: `Na prática, você **nunca** monta o ChatML à mão. O Hugging Face Tokenizer tem um método que faz isso por você: \`tokenizer.apply_chat_template(messages, ...)\`.

Ele é alimentado por um template **Jinja** (o mesmo Jinja do slide anterior) que vive dentro do próprio \`tokenizer_config.json\` do modelo. Cada modelo traz o seu — e é por isso que o mesmo código funciona para Qwen, Llama, Mistral, etc.

### A API em uma linha

A chamada recebe a lista de mensagens e mais dois parâmetros chave. Com \`tokenize=False\` o método devolve a string formatada (ótima para debug). Com \`tokenize=True\` devolve \`input_ids\` prontos para o modelo. E com \`add_generation_prompt=True\` o tokenizer anexa \`<|im_start|>assistant\\n\` no final, indicando ao modelo que ele deve gerar a resposta.

### Os três parâmetros que importam

| Parâmetro | Efeito |
|-----------|--------|
| \`messages\` | Lista de dicts \`{"role": ..., "content": ...}\` em ordem |
| \`tokenize=False\` | Retorna a string formatada (útil para debug) |
| \`tokenize=True\` | Retorna \`input_ids\` prontos para o modelo |
| \`add_generation_prompt=True\` | Acrescenta \`<\|im_start\|>assistant\\n\` no fim — o ponto de partida para a geração |

### Por que isso é tão poderoso?

Você troca de modelo (Qwen → Llama → Mistral) **sem mudar uma linha do seu código** de aplicação. O template Jinja é parte do checkpoint. Se amanhã sair um modelo com um formato novo, basta atualizar a dependência — o resto continua igual.

> Resumo: a aplicação pensa em **mensagens**. O tokenizer pensa em **tokens**. O \`apply_chat_template\` é a ponte.`,
      rightBody: `\`\`\`python
snippet:chatml/apply-chat-template-qwen
\`\`\`

> Rode localmente: o snippet imprime as três variantes lado a lado — sem prompt de geração, com prompt, e a versão tokenizada. Compare cada string com a lista de mensagens original.`,
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'Importamos o AutoTokenizer e carregamos o tokenizador de Qwen 3.5 0.8B — que já vem com um chat_template Jinja embutido.',
        },
        {
          lineRange: [6, 11],
          content: 'Definimos a conversa como uma lista de dicionários com "role" (papel) e "content" (conteúdo). Esta é a forma canônica de entrada.',
        },
        {
          lineRange: [12, 19],
          content: 'Chamamos apply_chat_template com tokenize=False (retorna string) e add_generation_prompt=False — o texto termina após a última mensagem do usuário.',
        },
        {
          lineRange: [20, 27],
          content: 'Com add_generation_prompt=True, o tokenizador anexa <|im_start|>assistant\\n no final — o ponto de partida para o modelo gerar a resposta.',
        },
        {
          lineRange: [28, 33],
          content: 'Com tokenize=True, o método retorna input_ids (lista de inteiros) prontos para passar para o modelo, em vez da string formatada.',
        },
      ],
    },
    'en-us': {
      title: 'Watching `apply_chat_template` Work with Qwen 3.5',
      body: `In practice, you **never** assemble ChatML by hand. The Hugging Face Tokenizer ships a method that does it for you: \`tokenizer.apply_chat_template(messages, ...)\`.

It is powered by a **Jinja** template (the same Jinja from the previous slide) that lives inside the model's own \`tokenizer_config.json\`. Each model brings its own — and that's why the same code works for Qwen, Llama, Mistral, etc.

### The API in one line

The call receives the messages list plus two key parameters. With \`tokenize=False\` the method returns the formatted string (great for debugging). With \`tokenize=True\` it returns \`input_ids\` ready for the model. And with \`add_generation_prompt=True\` the tokenizer appends \`<|im_start|>assistant\\n\` at the end, signalling to the model that it should generate the response.

### The three parameters that matter

| Parameter | Effect |
|-----------|--------|
| \`messages\` | List of \`{"role": ..., "content": ...}\` dicts in order |
| \`tokenize=False\` | Returns the formatted string (great for debugging) |
| \`tokenize=True\` | Returns \`input_ids\` ready for the model |
| \`add_generation_prompt=True\` | Appends \`<\|im_start\|>assistant\\n\` at the end — the starting point for generation |

### Why is this so powerful?

You switch models (Qwen → Llama → Mistral) **without changing a line of application code**. The Jinja template is part of the checkpoint. If tomorrow a new model ships with a different format, you just bump the dependency — the rest stays the same.

> Summary: the application thinks in **messages**. The tokenizer thinks in **tokens**. \`apply_chat_template\` is the bridge.`,
      rightBody: `\`\`\`python
snippet:chatml/apply-chat-template-qwen
\`\`\`

> Run it locally: the snippet prints all three variants side by side — without the generation prompt, with the prompt, and the tokenized version. Compare each string with the original messages list.`,
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'We import AutoTokenizer and load the Qwen 3.5 0.8B tokenizer — which ships with an embedded Jinja chat_template.',
        },
        {
          lineRange: [6, 11],
          content: 'We define the conversation as a list of dictionaries with "role" and "content". This is the canonical input shape.',
        },
        {
          lineRange: [12, 19],
          content: 'We call apply_chat_template with tokenize=False (returns a string) and add_generation_prompt=False — the text ends after the last user message.',
        },
        {
          lineRange: [20, 27],
          content: 'With add_generation_prompt=True, the tokenizer appends <|im_start|>assistant\\n at the end — the starting point for the model to generate the reply.',
        },
        {
          lineRange: [28, 33],
          content: 'With tokenize=True, the method returns input_ids (a list of integers) ready to feed the model, instead of the formatted string.',
        },
      ],
    },
  },
});
