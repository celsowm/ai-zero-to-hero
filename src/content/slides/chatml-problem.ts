import { defineSlide } from './_factory';

export const chatmlProblem = defineSlide({
  id: 'chatml-problem',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'O Problema: Modelos Só Sabem Continuar Texto',
      body: `De 2018 até 2022, todo modelo de linguagem — GPT-2, GPT-J, LLaMA 1, BLOOM — era um **completion engine**. A única coisa que ele sabia fazer era: "dado um texto, gere a continuação mais provável".

Você passava um prompt, ele completava. Se o prompt fosse uma pergunta, o modelo completava com **mais texto**, não com uma resposta.

### O divisor de águas: InstructGPT (Mar/2022)

A OpenAI publicou o paper *"Training language models to follow instructions with human feedback"* (InstructGPT). A ideia era simples e poderosa:

1. Pegar um modelo de completion pré-treinado.
2. Fazer **SFT** (Supervised Fine-Tuning) em exemplos escritos por humanos no formato **prompt → resposta**.
3. Aplicar **RLHF** (Reinforcement Learning from Human Feedback) para alinhar o modelo a preferências humanas.

O resultado? Modelos que **seguem instruções**. Mas para o modelo saber "onde está o prompt" e "onde está a resposta", o texto de treino precisava de uma **estrutura padronizada**. Nasce aí a necessidade de um **formato de chat**.

> Antes do InstructGPT: prompt = texto a continuar.
> Depois: prompt = instrução a ser respondida. O formato virou parte do modelo.`,
      rightBody: `\`\`\`python
snippet:chatml/gpt2-completion-problem
\`\`\`

> Rode localmente: o GPT-2 recebe uma pergunta, mas simplesmente continua escrevendo mais pares de Q/A em vez de responder. É o sintoma claro do "completion engine".`,
      codeExplanations: [
        {
          lineRange: [1, 4],
          content: 'Importamos o pipeline e fixamos uma seed para tornar a saída reproduzível.',
        },
        {
          lineRange: [5, 8],
          content: 'Criamos o pipeline de text-generation com GPT-2 e fixamos o prompt no formato "pergunta-resposta" (Q:/A:).',
        },
        {
          lineRange: [9, 14],
          content: 'Chamamos o generator com max_new_tokens=40 e do_sample=False. A saída mostra que GPT-2 não sabe parar no "A:" — ele continua gerando mais perguntas e respostas.',
        },
      ],
    },
    'en-us': {
      title: 'The Problem: Models Only Know How to Continue Text',
      body: `From 2018 to 2022, every language model — GPT-2, GPT-J, LLaMA 1, BLOOM — was a **completion engine**. The only thing it knew how to do was: "given a piece of text, generate the most likely continuation".

You passed a prompt, it completed. If the prompt was a question, the model completed it with **more text**, not with an answer.

### The watershed: InstructGPT (Mar/2022)

OpenAI published the paper *"Training language models to follow instructions with human feedback"* (InstructGPT). The idea was simple and powerful:

1. Take a pre-trained completion model.
2. Run **SFT** (Supervised Fine-Tuning) on human-written examples in the **prompt → response** format.
3. Apply **RLHF** (Reinforcement Learning from Human Feedback) to align the model with human preferences.

The result? Models that **follow instructions**. But for the model to know "where the prompt is" and "where the response is", the training text needed a **standardized structure**. That's where the need for a **chat format** was born.

> Before InstructGPT: prompt = text to be continued.
> After: prompt = instruction to be answered. The format became part of the model.`,
      rightBody: `\`\`\`python
snippet:chatml/gpt2-completion-problem
\`\`\`

> Run it locally: GPT-2 receives a question but simply keeps writing more Q/A pairs instead of answering. That is the clear symptom of a "completion engine".`,
      codeExplanations: [
        {
          lineRange: [1, 4],
          content: 'We import the pipeline and set a seed to make the output reproducible.',
        },
        {
          lineRange: [5, 8],
          content: 'We create the text-generation pipeline with GPT-2 and craft the prompt in a "question-answer" (Q:/A:) format.',
        },
        {
          lineRange: [9, 14],
          content: 'We call the generator with max_new_tokens=40 and do_sample=False. The output shows that GPT-2 does not know how to stop at "A:" — it keeps generating more questions and answers.',
        },
      ],
    },
  },
});
