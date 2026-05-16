import { defineSlide } from './_factory';

export const jinjaChatmlPractice = defineSlide({
  id: 'jinja-chatml-practice',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: `Jinja no ChatML na Prática`,
      body: `O \`tokenizer.chat_template\` é um template Jinja que define como converter uma lista de mensagens em texto. Veja o template padrão do ChatML:

\`\`\`jinja
{% for message in messages %}
{{'<|im_start|>' + message['role'] + '\n' + message['content'] + '<|im_end|>' + '\n'}}
{% endfor %}
{% if add_generation_prompt %}
{{'<|im_start|>assistant\n'}}
{% endif %}
\`\`\`

### Como funciona:

| Parte Jinja | O que faz |
|-------------|-----------|
| \`{% for message in messages %}\` | Percorre cada mensagem da conversa |
| \`message['role']\` | Pega o papel: system, user ou assistant |
| \`message['content']\` | Pega o conteúdo da mensagem |
| \`{{'<|im_start|>' + ...}}\` | Concatena tokens especiais ao redor do conteúdo |
| \`{% if add_generation_prompt %}\` | Só adiciona o prompt de geração se solicitado |

> Quando você chama \`apply_chat_template\`, o tokenizer executa esse Jinja por baixo dos panos — gerando o texto final que o modelo vai processar.`,
      codeExplanations: [
        {
          lineRange: [1, 6],
          content: 'O loop for percorre todas as mensagens e aplica os tokens ChatML em cada uma.',
        },
        {
          lineRange: [7, 10],
          content: 'O condicional if adiciona o token de início do assistente para geração.',
        },
      ],
    },
    'en-us': {
      title: `Jinja in ChatML in Practice`,
      body: `The \`tokenizer.chat_template\` is a Jinja template that defines how to convert a list of messages into text. Here's the standard ChatML template:

\`\`\`jinja
{% for message in messages %}
{{'<|im_start|>' + message['role'] + '\n' + message['content'] + '<|im_end|>' + '\n'}}
{% endfor %}
{% if add_generation_prompt %}
{{'<|im_start|>assistant\n'}}
{% endif %}
\`\`\`

### How it works:

| Jinja Part | What it does |
|------------|--------------|
| \`{% for message in messages %}\` | Loops through each message in the conversation |
| \`message['role']\` | Gets the role: system, user or assistant |
| \`message['content']\` | Gets the message content |
| \`{{'<|im_start|>' + ...}}\` | Concatenates special tokens around the content |
| \`{% if add_generation_prompt %}\` | Only adds the generation prompt if requested |

> When you call \`apply_chat_template\`, the tokenizer executes this Jinja under the hood — generating the final text the model will process.`,
      codeExplanations: [
        {
          lineRange: [1, 6],
          content: 'The for loop iterates through all messages and applies ChatML tokens to each one.',
        },
        {
          lineRange: [7, 10],
          content: 'The if conditional adds the assistant start token for generation.',
        },
      ],
    },
  },
  visual: {
    id: 'jinja-chatml-practice-visual',
    copy: {
      'pt-br': {
        title: 'ChatML: Template → Renderizado',
        templateLabel: 'Template Jinja',
        renderedLabel: 'Texto Final',
        messagesLabel: 'Mensagens de entrada:',
        templateContent: `{% for message in messages %}\n{{'<|im_start|>' + message['role'] + '\\n' + message['content'] + '<|im_end|>' + '\\n'}}\n{% endfor %}\n{% if add_generation_prompt %}\n{{'<|im_start|>assistant\\n'}}\n{% endif %}`,
        renderedContent: `<|im_start|>system\nVocê é um assistente útil.<|im_end|>\n<|im_start|>user\nQual a capital do Brasil?<|im_end|>\n<|im_start|>assistant\n`,
        addGenerationPromptLabel: '💡 add_generation_prompt=true adiciona o token <|im_start|>assistant para iniciar a geração.',
        systemMsg: 'system: "Você é um assistente útil."',
        userMsg: 'user: "Qual a capital do Brasil?"',
      },
      'en-us': {
        title: 'ChatML: Template → Rendered',
        templateLabel: 'Jinja Template',
        renderedLabel: 'Final Text',
        messagesLabel: 'Input messages:',
        templateContent: `{% for message in messages %}\n{{'<|im_start|>' + message['role'] + '\\n' + message['content'] + '<|im_end|>' + '\\n'}}\n{% endfor %}\n{% if add_generation_prompt %}\n{{'<|im_start|>assistant\\n'}}\n{% endif %}`,
        renderedContent: `<|im_start|>system\nYou are a helpful assistant.<|im_end|>\n<|im_start|>user\nWhat is the capital of Brazil?<|im_end|>\n<|im_start|>assistant\n`,
        addGenerationPromptLabel: '💡 add_generation_prompt=true appends the <|im_start|>assistant token to kick off generation.',
        systemMsg: 'system: "You are a helpful assistant."',
        userMsg: 'user: "What is the capital of Brazil?"',
      },
    },
  },
});
