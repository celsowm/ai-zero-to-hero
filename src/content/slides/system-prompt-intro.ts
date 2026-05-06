import { defineSlide } from './_factory';

export const systemPromptIntro = defineSlide({
  id: 'system-prompt-intro',
  type: 'two-column',
  options: {
    columnRatios: [0.55, 0.45],
  },
  content: {
    'pt-br': {
      title: `O System Prompt: A "Persona" do Modelo`,
      body: `No ChatML, a primeira mensagem sempre tem o papel \`system\`. Mas o que ela realmente faz?

O **system prompt** é a instrução invisível que define **como** o modelo deve se comportar — não **o que** ele deve responder. É como dar um personagem a um ator antes da cena começar.

### O que o system prompt controla:

| Dimensão | Exemplo fraco | Exemplo forte |
|----------|---------------|---------------|
| **Tom** | "Você é um assistente." | "Responda com clareza e concisão, como um professor paciente." |
| **Formato** | (nenhuma instrução) | "Sempre responda em Markdown com listas quando houver múltiplos itens." |
| **Contexto** | (nenhum contexto) | "Você é um tutor de Python para iniciantes. Use analogias do dia a dia." |
| **Restrições** | (nenhuma restrição) | "Não gere código. Explique apenas conceitos verbalmente." |

### Por que funciona?

Durante o SFT, o modelo vê milhares de exemplos onde a resposta do \`assistant\` sempre segue as instruções do \`system\`. Ele aprende que **o system prompt é a regra do jogo** — o assistant deve obedecer.

> ⚠️ **Importante:** O system prompt não é "lei". Modelos podem ignorá-lo se o treinamento foi fraco ou se o prompt do usuário contradiz fortemente. Mas em modelos bem treinados (GPT-4, Claude, Llama 3), o system prompt é poderoso.

---

\`\`\`python
snippet:system-prompt-intro
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 3],
          content: 'Carregamos o tokenizador base.',
        },
        {
          lineRange: [6, 8],
          content: 'Um diálogo simples contendo apenas a mensagem do usuário.',
        },
        {
          lineRange: [11, 14],
          content: 'O mesmo diálogo, mas agora injetando uma instrução de sistema (persona) no início.',
        },
        {
          lineRange: [17, 21],
          content: 'Aplicamos o template ChatML e vemos o texto final formatado sem o system prompt.',
        },
        {
          lineRange: [24, 28],
          content: 'Com o system prompt, a estrutura do prompt muda para incluir a instrução invisível de comportamento.',
        },
      ],
    },
    'en-us': {
      title: `The System Prompt: The Model's "Persona"`,
      body: `In ChatML, the first message always has the \`system\` role. But what does it actually do?

The **system prompt** is the invisible instruction that defines **how** the model should behave — not **what** it should answer. It's like giving an actor a character before the scene starts.

### What the system prompt controls:

| Dimension | Weak example | Strong example |
|-----------|-------------|----------------|
| **Tone** | "You are an assistant." | "Respond with clarity and conciseness, like a patient teacher." |
| **Format** | (no instruction) | "Always respond in Markdown with lists when there are multiple items." |
| **Context** | (no context) | "You are a Python tutor for beginners. Use everyday analogies." |
| **Constraints** | (no constraints) | "Do not generate code. Explain concepts verbally only." |

### Why does it work?

During SFT, the model sees thousands of examples where the \`assistant\` response always follows the \`system\` instructions. It learns that **the system prompt is the rule of the game** — the assistant must obey.

> ️ **Important:** The system prompt is not "law." Models can ignore it if training was weak or if the user prompt strongly contradicts it. But in well-trained models (GPT-4, Claude, Llama 3), the system prompt is powerful.

---

\`\`\`python
snippet:system-prompt-intro
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 3],
          content: 'Load the base tokenizer.',
        },
        {
          lineRange: [6, 8],
          content: 'A simple dialogue containing only the user message.',
        },
        {
          lineRange: [11, 14],
          content: 'The same dialogue, but now injecting a system instruction (persona) at the beginning.',
        },
        {
          lineRange: [17, 21],
          content: 'We apply the ChatML template and see the final formatted text without the system prompt.',
        },
        {
          lineRange: [24, 28],
          content: 'With the system prompt, the prompt structure changes to include the invisible behavioral instruction.',
        },
      ],
    },
  },
  visual: {
    id: 'system-prompt-explorer',
    copy: {
      'pt-br': {
        title: 'System Prompt em Ação',
        subtitle: 'Altere o system prompt e veja como a resposta muda',
        userQuestion: 'O que é uma API?',
        systemPrompts: {
          default: 'Você é um assistente prestativo.',
          teacher: 'Você é um professor de computação. Use analogias simples e explique como se o aluno nunca tivesse programado.',
          expert: 'Você é um engenheiro de software sênior. Responda com precisão técnica, assumindo que o leitor já tem experiência.',
          concise: 'Responda em no máximo 2 frases. Seja direto.',
          creative: 'Você é um poeta da tecnologia. Explique conceitos usando metáforas artísticas e linguagem figurada.',
        },
        systemLabel: 'System Prompt',
        responseLabel: 'Resposta do Modelo',
        noSystemLabel: 'Sem System Prompt',
        insights: {
          default: 'Resposta padrão — útil mas genérica. O modelo não tem direção específica.',
          teacher: 'Nota a mudança? A resposta usa analogias ("ponte", "garçom") e evita jargões técnicos.',
          expert: 'Aqui o modelo assume vocabulário técnico (REST, endpoints, serialization) e vai direto ao ponto.',
          concise: 'Forçado a ser breve, o modelo corta explicações e vai direto à definição essencial.',
          creative: 'O modelo adota um tom poético — "tradutor silencioso", "ponte entre mundos". A criatividade é ativada pelo estilo do system prompt.',
        },
      },
      'en-us': {
        title: 'System Prompt in Action',
        subtitle: 'Change the system prompt and see how the response changes',
        userQuestion: 'What is an API?',
        systemPrompts: {
          default: 'You are a helpful assistant.',
          teacher: 'You are a computer science teacher. Use simple analogies and explain as if the student has never coded before.',
          expert: 'You are a senior software engineer. Respond with technical precision, assuming the reader is experienced.',
          concise: 'Respond in at most 2 sentences. Be direct.',
          creative: 'You are a poet of technology. Explain concepts using artistic metaphors and figurative language.',
        },
        systemLabel: 'System Prompt',
        responseLabel: 'Model Response',
        noSystemLabel: 'No System Prompt',
        insights: {
          default: 'Default response — helpful but generic. The model has no specific direction.',
          teacher: 'Notice the change? The response uses analogies ("bridge", "waiter") and avoids technical jargon.',
          expert: 'Here the model assumes technical vocabulary (REST, endpoints, serialization) and gets straight to the point.',
          concise: 'Forced to be brief, the model cuts explanations and goes straight to the essential definition.',
          creative: 'The model adopts a poetic tone — "silent translator", "bridge between worlds". Creativity is triggered by the system prompt style.',
        },
      },
    },
  },
});
