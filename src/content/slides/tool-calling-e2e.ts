import { defineSlide } from './_factory';

export const toolCallingE2e = defineSlide({
  id: 'tool-calling-e2e',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'E2E: Assistente Inteligente com Tool Calling',
      body: `Vamos construir um **assistente completo** que combina busca, cálculo e código Python.

### Passo 1: Definir as ferramentas

\`\`\`python
snippet:tool-calling/e2e-step1
\`\`\`

### Passo 2: Criar o agente

\`\`\`python
snippet:tool-calling/e2e-step2
\`\`\`

### Passo 3: Executar

\`\`\`python
snippet:tool-calling/e2e-step3
\`\`\`

> Este é o **gancho para Agentes Inteligentes**: com Tool Calling, o LLM deixa de ser um chat e vira um **orquestrador de ações**.`,
    },
    'en-us': {
      title: 'E2E: Smart Assistant with Tool Calling',
      body: `Let's build a **complete assistant** that combines search, calculation, and Python code execution.

### Step 1: Define the tools

\`\`\`python
snippet:tool-calling/e2e-step1
\`\`\`

### Step 2: Create the agent

\`\`\`python
snippet:tool-calling/e2e-step2
\`\`\`

### Step 3: Execute

\`\`\`python
snippet:tool-calling/e2e-step3
\`\`\`

> This is the **bridge to Intelligent Agents**: with Tool Calling, the LLM stops being just a chat and becomes an **action orchestrator**.`,
    },
  },
  visual: {
    id: 'tool-calling-e2e-visual',
    copy: {
      'pt-br': {
        title: 'Assistente: Tool Calling E2E',
        step1Label: 'Definir Tools',
        step1Desc: '@tool: search_web, calculate, run_python — schemas automáticos.',
        step2Label: 'Criar Agente',
        step2Desc: 'ChatOpenAI + bind_tools + AgentExecutor = loop automático.',
        step3Label: 'Executar',
        step3Desc: '"Quanto é 237×891?" → calculate → resposta.',
        step4Label: 'Combinar',
        step4Desc: '"Pesquise Python 3.12 e rode um exemplo" → search + run_python.',
        step5Label: 'Evoluir',
        step5Desc: 'Próximo passo: Agentes com memória, planejamento e multi-step.',
      },
      'en-us': {
        title: 'Assistant: Tool Calling E2E',
        step1Label: 'Define Tools',
        step1Desc: '@tool: search_web, calculate, run_python — automatic schemas.',
        step2Label: 'Create Agent',
        step2Desc: 'ChatOpenAI + bind_tools + AgentExecutor = automatic loop.',
        step3Label: 'Execute',
        step3Desc: '"What is 237×891?" → calculate → answer.',
        step4Label: 'Combine',
        step4Desc: '"Research Python 3.12 and run an example" → search + run_python.',
        step5Label: 'Evolve',
        step5Desc: 'Next step: Agents with memory, planning, and multi-step.',
      },
    },
  },
});
