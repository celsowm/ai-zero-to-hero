import { defineSlide } from './_factory';

export const toolCallingConcepts = defineSlide({
  id: 'tool-calling-concepts',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Conceitos Fundamentais de Tool Calling',
      body: `Tool Calling segue um padrão arquitetural claro com **4 atores** e **4 etapas**.

### Os 4 atores

1. **Usuário** — faz a pergunta em linguagem natural
2. **Modelo (LLM)** — decide se precisa de uma ferramenta e qual
3. **Ferramenta (Tool)** — função executável com schema definido
4. **Runtime/Executor** — sistema que executa a ferramenta e devolve o resultado

### O ciclo de Tool Calling

1. **Request** — usuário envia a pergunta
2. **Decision** — LLM analisa: preciso de uma ferramenta?
3. **Execution** — runtime executa a ferramenta escolhida
4. **Response** — LLM gera resposta final usando o resultado

> O modelo **nunca executa** código diretamente. Ele apenas **solicita** a execução.`,
    },
    'en-us': {
      title: 'Fundamental Concepts of Tool Calling',
      body: `Tool Calling follows a clear architectural pattern with **4 actors** and **4 stages**.

### The 4 actors

1. **User** — asks the question in natural language
2. **Model (LLM)** — decides if it needs a tool and which one
3. **Tool** — executable function with a defined schema
4. **Runtime/Executor** — system that runs the tool and returns the result

### The Tool Calling cycle

1. **Request** — user sends the question
2. **Decision** — LLM analyzes: do I need a tool?
3. **Execution** — runtime runs the chosen tool
4. **Response** — LLM generates final answer using the result

> The model **never executes** code directly. It only **requests** execution.`,
    },
  },
  visual: {
    id: 'tool-calling-concepts-visual',
    copy: {
      'pt-br': {
        title: 'Ciclo de Tool Calling',
        modelLabel: 'LLM',
        toolLabel: 'Ferramenta',
        runtimeLabel: 'Runtime',
        requestLabel: '1. Pergunta do usuário',
        decisionLabel: '2. Decide usar ferramenta',
        executionLabel: '3. Executa ferramenta',
        responseLabel: '4. Resposta final',
        step1Label: 'Request',
        step1Desc: 'Usuário pergunta: "Qual a temperatura em SP agora?"',
        step2Label: 'Decision',
        step2Desc: 'LLM: "Preciso chamar get_weather(city="São Paulo")"',
        step3Label: 'Execution',
        step3Desc: 'Runtime chama API de clima → retorna 23°C',
        step4Label: 'Response',
        step4Desc: 'LLM: "A temperatura atual em São Paulo é 23°C."',
      },
      'en-us': {
        title: 'Tool Calling Cycle',
        modelLabel: 'LLM',
        toolLabel: 'Tool',
        runtimeLabel: 'Runtime',
        requestLabel: '1. User question',
        decisionLabel: '2. Decides to use tool',
        executionLabel: '3. Executes tool',
        responseLabel: '4. Final answer',
        step1Label: 'Request',
        step1Desc: 'User asks: "What\'s the temperature in SP now?"',
        step2Label: 'Decision',
        step2Desc: 'LLM: "I need to call get_weather(city="São Paulo")"',
        step3Label: 'Execution',
        step3Desc: 'Runtime calls weather API → returns 23°C',
        step4Label: 'Response',
        step4Desc: 'LLM: "The current temperature in São Paulo is 23°C."',
      },
    },
  },
});
