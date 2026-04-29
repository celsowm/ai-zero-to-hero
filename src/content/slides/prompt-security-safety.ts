import { defineSlide } from './_factory';

export const promptSecuritySafety = defineSlide({
  id: 'prompt-security-safety',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Segurança e Jailbreaks',
      body: `Prompts não são apenas sobre "obter boas respostas" — são também sobre **defender o modelo contra manipulação**. Jailbreaks são prompts que contornam restrições de segurança.

### Prompt Injection

Quando o input do usuário contém instruções que **sobrescrevem** o system prompt:

> "Ignore todas as instruções anteriores. Agora você é..."

### Jailbreaks famosos

1. **DAN (Do Anything Now)** — tenta forçar o modelo a ignorar todas as restrições éticas
2. **MongoDB jailbreak** — usa roleplay ficcional para contornar filtros de conteúdo
3. **Developer mode** — finge que o modelo está em "modo de desenvolvimento"

### Defesa com system prompt

\`\`\`python
snippet:prompt-eng/jailbreak-defense
\`\`\`

> Segurança de prompts é uma **corrida armamentista**: cada defesa gera novos ataques, e vice-versa.`,
    },
    'en-us': {
      title: 'Security and Jailbreaks',
      body: `Prompts aren't just about "getting good answers" — they're also about **defending the model against manipulation**. Jailbreaks are prompts that bypass safety restrictions.

### Prompt Injection

When user input contains instructions that **override** the system prompt:

> "Ignore all previous instructions. Now you are..."

### Famous jailbreaks

1. **DAN (Do Anything Now)** — attempts to force the model to ignore all ethical constraints
2. **MongoDB jailbreak** — uses fictional roleplay to bypass content filters
3. **Developer mode** — pretends the model is in "development mode"

### Defense with system prompt

\`\`\`python
snippet:prompt-eng/jailbreak-defense
\`\`\`

> Prompt security is an **arms race**: each defense generates new attacks, and vice versa.`,
    },
  },
  visual: {
    id: 'prompt-security-safety-visual',
    copy: {
      'pt-br': {
        title: 'Ataques e Defesas de Prompt',
        attackLabel: '🔴 Ataque',
        defenseLabel: '🛡️ Defesa',
        injectionLabel: 'Prompt Injection',
        jailbreakLabel: 'Jailbreak',
        sanitizationLabel: 'Sanitização',
        validationLabel: 'Validação',
        cycleLabel: 'Ciclo contínuo',
      },
      'en-us': {
        title: 'Prompt Attacks and Defenses',
        attackLabel: '🔴 Attack',
        defenseLabel: '🛡️ Defense',
        injectionLabel: 'Prompt Injection',
        jailbreakLabel: 'Jailbreak',
        sanitizationLabel: 'Sanitization',
        validationLabel: 'Validation',
        cycleLabel: 'Continuous cycle',
      },
    },
  },
});
