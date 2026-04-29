import { defineSlide } from './_factory';

export const reasoningE2e = defineSlide({
  id: 'reasoning-e2e',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'E2E: Building a Reasoning App',
      body: `Vamos construir um pipeline completo de reasoning: setup → chamada → parsing → fallback → resposta.

### Passo 1: Setup e Configuração

\`\`\`python
snippet:reasoning/e2e-setup
\`\`\`

### Passo 2: Chamada com Reasoning

\`\`\`python
snippet:reasoning/e2e-call
\`\`\`

### Passo 3: Parsing e Separação

\`\`\`python
snippet:reasoning/e2e-parsing
\`\`\`

### Passo 4: Fallback sem Reasoning

\`\`\`python
snippet:reasoning/e2e-fallback
\`\`\`

### Passo 5: Pipeline Completo

\`\`\`python
snippet:reasoning/e2e-full
\`\`\`

> Em 5 passos você tem um sistema de reasoning em produção: com parsing, streaming, fallback e controle de custo.`,
    },
    'en-us': {
      title: 'E2E: Building a Reasoning App',
      body: `Let's build a complete reasoning pipeline: setup → call → parsing → fallback → response.

### Step 1: Setup and Configuration

\`\`\`python
snippet:reasoning/e2e-setup
\`\`\`

### Step 2: Reasoning Call

\`\`\`python
snippet:reasoning/e2e-call
\`\`\`

### Step 3: Parsing and Separation

\`\`\`python
snippet:reasoning/e2e-parsing
\`\`\`

### Step 4: Fallback without Reasoning

\`\`\`python
snippet:reasoning/e2e-fallback
\`\`\`

### Step 5: Full Pipeline

\`\`\`python
snippet:reasoning/e2e-full
\`\`\`

> In 5 steps you have a reasoning system in production: with parsing, streaming, fallback and cost control.`,
    },
  },
  visual: {
    id: 'reasoning-e2e-visual',
    copy: {
      'pt-br': {
        title: 'Pipeline de Reasoning',
        step1Label: 'Setup',
        step1Desc: 'Configurar client com reasoning_effort.',
        step2Label: 'Call',
        step2Desc: 'Chamar API com thinking habilitado.',
        step3Label: 'Parse',
        step3Desc: 'Separar thinking blocks da resposta.',
        step4Label: 'Fallback',
        step4Desc: 'Se reasoning falhar, usar modelo normal.',
        step5Label: 'Full',
        step5Desc: 'Pipeline completo: parsing + streaming + fallback.',
      },
      'en-us': {
        title: 'Reasoning Pipeline',
        step1Label: 'Setup',
        step1Desc: 'Configure client with reasoning_effort.',
        step2Label: 'Call',
        step2Desc: 'Call API with thinking enabled.',
        step3Label: 'Parse',
        step3Desc: 'Separate thinking blocks from answer.',
        step4Label: 'Fallback',
        step4Desc: 'If reasoning fails, use normal model.',
        step5Label: 'Full',
        step5Desc: 'Full pipeline: parsing + streaming + fallback.',
      },
    },
  },
});
