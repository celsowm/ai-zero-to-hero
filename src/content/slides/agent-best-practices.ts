import { defineSlide } from './_factory';

export const agentBestPractices = defineSlide({
  id: 'agent-best-practices',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'Best Practices e Armadilhas',
      body: `A pesquisa da Anthropic e de praticantes revela 4 armadilhas recorrentes:

- **Complexidade prematura**: adicionar multi-agent antes de otimizar o loop básico
- **Sem sandboxing**: agente executa código arbitrário sem restrições de segurança
- **Sem condição de parada**: loop infinito quando o agente nunca "satisface" o critério
- **ACI ruim**: ferramentas mal documentadas que confundem o LLM

> A regra de ouro: comece com o mais simples possível. Otimize prompts e retrievers antes de adicionar sistemas agênticos.

snippet:intelligent-agents/agent-best-practices`,
    },
    'en-us': {
      title: 'Best Practices and Pitfalls',
      body: `Research from Anthropic and practitioners reveals 4 recurring pitfalls:

- **Premature complexity**: adding multi-agent before optimizing the basic loop
- **No sandboxing**: agent executes arbitrary code without security restrictions
- **No stopping condition**: infinite loop when the agent never "satisfies" the criterion
- **Poor ACI**: poorly documented tools that confuse the LLM

> The golden rule: start as simple as possible. Optimize prompts and retrievers before adding agentic systems.

snippet:intelligent-agents/agent-best-practices`,
    },
  },
  visual: {
    id: 'agent-pitfalls',
    copy: {
      'pt-br': {
        title: '4 Armadilhas Comuns e Como Evitá-las',
        subtitle: 'Lições da prática real com agentes',
        pitfall1Title: 'Complexidade Prematura',
        pitfall1Desc: 'Adicionar multi-agent antes de otimizar o básico',
        pitfall1Fix: 'Otimize prompts e retrievers primeiro. Adicione agentes só quando necessário.',
        pitfall2Title: 'Sem Sandboxing',
        pitfall2Desc: 'Agente executa código arbitrário sem restrições',
        pitfall2Fix: 'Sempre restrinja permissões: sem acesso a filesystem sensível, sem sudo.',
        pitfall3Title: 'Sem Condição de Parada',
        pitfall3Desc: 'Loop infinito quando critério nunca é satisfeito',
        pitfall3Fix: 'Sempre defina max_iterations + critério de completude explícito.',
        pitfall4Title: 'ACI Ruim',
        pitfall4Desc: 'Ferramentas mal documentadas confundem o LLM',
        pitfall4Fix: 'Descrição clara, schema de parâmetros, exemplos de uso. Teste como se fosse uma API.',
        showFix: 'Mostrar Correção',
        hideFix: 'Esconder',
        insightTitle: 'Insight',
        insightText: 'Agentes são poderosos mas perigosos. Sandboxing, limites e boas ferramentas são essenciais, não opcionais.',
      },
      'en-us': {
        title: '4 Common Pitfalls and How to Avoid Them',
        subtitle: 'Lessons from real-world agent practice',
        pitfall1Title: 'Premature Complexity',
        pitfall1Desc: 'Adding multi-agent before optimizing the basics',
        pitfall1Fix: 'Optimize prompts and retrievers first. Add agents only when needed.',
        pitfall2Title: 'No Sandboxing',
        pitfall2Desc: 'Agent executes arbitrary code without restrictions',
        pitfall2Fix: 'Always restrict permissions: no sensitive filesystem access, no sudo.',
        pitfall3Title: 'No Stopping Condition',
        pitfall3Desc: 'Infinite loop when criterion is never satisfied',
        pitfall3Fix: 'Always define max_iterations + explicit completion criterion.',
        pitfall4Title: 'Poor ACI',
        pitfall4Desc: 'Poorly documented tools confuse the LLM',
        pitfall4Fix: 'Clear description, parameter schema, usage examples. Test like an API.',
        showFix: 'Show Fix',
        hideFix: 'Hide',
        insightTitle: 'Insight',
        insightText: 'Agents are powerful but dangerous. Sandboxing, limits, and good tools are essential, not optional.',
      },
    },
  },
});
