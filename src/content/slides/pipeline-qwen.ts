import { defineSlide } from './_factory';

export const pipelineQwen = defineSlide({
  id: 'pipeline-qwen',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Pipeline com Mensagens no Qwen 3.5',
      body: `O \`pipeline\` da Hugging Face é a API mais simples para rodar inferência. Ele aceita **mensagens diretamente** no formato ChatML — sem precisar chamar \`apply_chat_template\` manualmente.

### O que acontece por baixo dos panos

Quando você passa uma lista de mensagens para o \`pipeline("text-generation", ...)\`, ele:

1. Detecta que o modelo tem um \`chat_template\` Jinja
2. Aplica o template para converter as mensagens em uma única string
3. Tokeniza a string
4. Roda o modelo (gera tokens novos)
5. Decodifica os tokens de volta para texto
6. Retorna a conversa completa, incluindo as mensagens originais

### Por que \`set_seed\`?

O parâmetro \`do_sample=False\` já torna a geração determinística (greedy decoding), mas \`set_seed\` garante reprodutibilidade também em cenários com amostragem (\`do_sample=True\`).

### Extraindo a resposta

O \`pipeline\` retorna uma lista de dicionários. Para pegar só a resposta do assistente, use \`out[0]['generated_text'][-1]['content']\`. O \`[-1]\` pega a última mensagem da conversa — que é a que o modelo gerou.`,
      rightBody: `\`\`\`python
snippet:qwen/pipeline-qwen
\`\`\`

> Rode localmente: o código carrega o Qwen 3.5 0.8B, passa as mensagens e imprime apenas a resposta do assistente. O resultado deve ser algo como "A soma de 2 + 2 é 4."`,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importamos `pipeline` (API unificada de inferência da HF) e `set_seed` (reprodutibilidade).',
        },
        {
          lineRange: [3, 3],
          content: 'Criamos um generator carregando o Qwen 3.5 0.8B. O pipeline gerencia tokenizer, modelo, device e geração automaticamente.',
        },
        {
          lineRange: [5, 8],
          content: 'As mensagens seguem o formato ChatML que vimos no slide anterior. O pipeline aplica o chat_template internamente.',
        },
        {
          lineRange: [10, 11],
          content: 'Chamamos o generator e extraímos o último content — a resposta gerada pelo assistente.',
        },
      ],
    },
    'en-us': {
      title: 'Pipeline with Messages in Qwen 3.5',
      body: `Hugging Face's \`pipeline\` is the simplest API for running inference. It accepts **messages directly** in ChatML format — no need to call \`apply_chat_template\` manually.

### What happens under the hood

When you pass a messages list to \`pipeline("text-generation", ...)\`, it:

1. Detects the model has a Jinja \`chat_template\`
2. Applies the template to convert messages into a single string
3. Tokenizes the string
4. Runs the model (generates new tokens)
5. Decodes tokens back to text
6. Returns the full conversation, including the original messages

### Why \`set_seed\`?

With \`do_sample=False\` generation is already deterministic (greedy decoding), but \`set_seed\` guarantees reproducibility even with sampling (\`do_sample=True\`).

### Extracting the reply

The \`pipeline\` returns a list of dicts. To get just the assistant's answer, use \`out[0]['generated_text'][-1]['content']\`. The \`[-1]\` grabs the last message in the conversation — the one the model generated.`,
      rightBody: `\`\`\`python
snippet:qwen/pipeline-qwen
\`\`\`

> Run locally: the code loads Qwen 3.5 0.8B, passes the messages, and prints only the assistant's reply. The result should be something like "The sum of 2 + 2 is 4."`,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'We import `pipeline` (HF unified inference API) and `set_seed` (reproducibility).',
        },
        {
          lineRange: [3, 3],
          content: 'We create a generator by loading Qwen 3.5 0.8B. The pipeline handles tokenizer, model, device, and generation automatically.',
        },
        {
          lineRange: [5, 8],
          content: 'Messages follow the ChatML format from the previous slide. The pipeline applies the chat_template internally.',
        },
        {
          lineRange: [10, 11],
          content: 'We call the generator and extract the last content — the assistant-generated reply.',
        },
      ],
    },
  },
});
