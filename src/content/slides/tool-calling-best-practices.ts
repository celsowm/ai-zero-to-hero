import { defineSlide } from './_factory';

export const toolCallingBestPractices = defineSlide({
  id: 'tool-calling-best-practices',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Boas Práticas para Tool Calling',
      body: `Tool Calling é poderoso mas requer cuidado no design. Veja os padrões que separam sistemas robustos de sistemas frágeis.

### ✅ Faça

1. **Descrições específicas** — "Busca voos de origem para destino em data" vs "busca voos"
2. **Parâmetros mínimos** — exija apenas o essencial; defaults para o resto
3. **Names consistentes** — \`get_weather\`, \`set_reminder\`, \`search_database\`
4. **Tipos restritos** — use \`enum\` quando possível

### ❌ Evite

1. **Muitas ferramentas (>10)** — o LLM se confunde
2. **Descrições vagas** — "faz coisas úteis" não ajuda
3. **Parâmetros genéricos** — \`data: any\` é inútil para o LLM

> Tool Calling é a ponte entre **compreensão** (LLM) e **ação** (sistemas). Uma ponte bem construída é segura e rápida.`,
    },
    'en-us': {
      title: 'Best Practices for Tool Calling',
      body: `Tool Calling is powerful but requires careful design. Here are the patterns that separate robust systems from fragile ones.

### ✅ Do

1. **Specific descriptions** — "Searches flights from origin to destination on date" vs "searches flights"
2. **Minimum parameters** — require only the essential; defaults for the rest
3. **Consistent names** — \`get_weather\`, \`set_reminder\`, \`search_database\`
4. **Restricted types** — use \`enum\` when possible

### ❌ Avoid

1. **Too many tools (>10)** — the LLM gets confused
2. **Vague descriptions** — "does useful things" doesn't help
3. **Generic parameters** — \`data: any\` is useless for the LLM

> Tool Calling is the bridge between **understanding** (LLM) and **action** (systems). A well-built bridge is safe and fast.`,
    },
  },
  visual: {
    id: 'tool-calling-best-practices-visual',
    copy: {
      'pt-br': {
        titleLabel: 'Boas Práticas',
        doLabel: '✅ Faça',
        dontLabel: '❌ Evite',
        tip1Label: 'Descrições específicas',
        tip1Desc: '"Busca voos SP→RJ em 15/05" vs "busca voos"',
        tip2Label: 'Parâmetros mínimos',
        tip2Desc: 'Exija apenas o essencial; defaults para o resto',
        tip3Label: 'Names consistentes',
        tip3Desc: 'get_weather, set_reminder, search_database',
        tip4Label: 'Tipos restritos',
        tip4Desc: 'Use enum para opções conhecidas',
        pitfall1Label: '>10 ferramentas confundem o LLM',
        pitfall2Label: 'Descrições vagas levam a uso errado',
        pitfall3Label: 'Parâmetros genéricos = alucinação',
      },
      'en-us': {
        titleLabel: 'Best Practices',
        doLabel: '✅ Do',
        dontLabel: '❌ Avoid',
        tip1Label: 'Specific descriptions',
        tip1Desc: '"Search flights SP→RJ on 05/15" vs "search flights"',
        tip2Label: 'Minimum parameters',
        tip2Desc: 'Require only essential; defaults for the rest',
        tip3Label: 'Consistent names',
        tip3Desc: 'get_weather, set_reminder, search_database',
        tip4Label: 'Restricted types',
        tip4Desc: 'Use enum for known options',
        pitfall1Label: '>10 tools confuse the LLM',
        pitfall2Label: 'Vague descriptions lead to wrong use',
        pitfall3Label: 'Generic parameters = hallucination',
      },
    },
  },
});
