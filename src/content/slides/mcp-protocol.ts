import { defineSlide } from './_factory';

export const mcpProtocol = defineSlide({
  id: 'mcp-protocol',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'MCP: O Protocolo Universal de Ferramentas',
      body: `Cada framework tem seu jeito de declarar ferramentas. O **Model Context Protocol (MCP)** resolve isso: é um padrão aberto que define como um servidor de ferramentas se conecta a qualquer cliente LLM.

Pense como **USB-C**: antes, cada dispositivo tinha seu conector. Agora, um cabo universal conecta tudo. MCP faz o mesmo para ferramentas de IA:

- **Tools**: funções que o agente pode chamar (buscar, calcular, enviar email)
- **Resources**: dados que o agente pode ler (arquivos, bancos de dados, APIs)
- **Prompts**: templates de interação que o agente pode usar

> Um servidor MCP expõe ferramentas. Qualquer cliente compatível com MCP pode conectá-lo — sem código customizado para cada integração.

snippet:intelligent-agents/mcp-protocol`,
    },
    'en-us': {
      title: 'MCP: The Universal Tool Protocol',
      body: `Each framework has its own way of declaring tools. The **Model Context Protocol (MCP)** solves this: it's an open standard that defines how a tool server connects to any LLM client.

Think of it as **USB-C**: before, each device had its own connector. Now, one universal cable connects everything. MCP does the same for AI tools:

- **Tools**: functions the agent can call (search, calculate, send email)
- **Resources**: data the agent can read (files, databases, APIs)
- **Prompts**: interaction templates the agent can use

> An MCP server exposes tools. Any MCP-compatible client can connect to it — no custom code for each integration.

snippet:intelligent-agents/mcp-protocol`,
    },
  },
  visual: {
    id: 'mcp',
    copy: {
      'pt-br': {
        title: 'MCP: O USB-C das Ferramentas de IA',
        subtitle: 'Um protocolo universal para conectar LLMs a ferramentas',
        clientLabel: 'Cliente (LLM)',
        serverLabel: 'Servidor MCP',
        toolsLabel: 'Ferramentas',
        resourcesLabel: 'Recursos',
        promptsLabel: 'Prompts',
        buildPayload: 'Montar Payload',
        sendButton: 'Enviar',
        responseLabel: 'Resposta:',
        exampleTool: 'buscar_clima',
        exampleToolDesc: 'Retorna a temperatura atual de uma cidade',
        insightTitle: 'Insight',
        insightText: 'MCP elimina a necessidade de integrar cada ferramenta manualmente. Um servidor expõe, qualquer cliente usa.',
      },
      'en-us': {
        title: 'MCP: The USB-C of AI Tools',
        subtitle: 'A universal protocol to connect LLMs to tools',
        clientLabel: 'Client (LLM)',
        serverLabel: 'MCP Server',
        toolsLabel: 'Tools',
        resourcesLabel: 'Resources',
        promptsLabel: 'Prompts',
        buildPayload: 'Build Payload',
        sendButton: 'Send',
        responseLabel: 'Response:',
        exampleTool: 'search_weather',
        exampleToolDesc: 'Returns current temperature for a city',
        insightTitle: 'Insight',
        insightText: 'MCP eliminates the need to manually integrate each tool. A server exposes, any client uses.',
      },
    },
  },
});
