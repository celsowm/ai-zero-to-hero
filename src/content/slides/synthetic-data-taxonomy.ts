import { defineSlide } from './_factory';

export const syntheticDataTaxonomy = defineSlide({
  id: 'synthetic-data-taxonomy',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Taxonomia Pratica para Dataset Sintetico',
      body: `Nao existe uma taxonomia universal oficial de SFT. O que fazemos e uma **taxonomia de engenharia** inspirada em benchmarks e papers consolidados.

### Tipos de prompt que o dataset precisa cobrir

**Saber**
- definition, explanation, comparison

**Analisar**
- classification, extraction, verification

**Raciocinar**
- rule_application, multi_rule_reasoning, edge_case

**Decidir**
- decision_making, ranking, negative_case

**Seguir formato**
- instruction_following, canonical_formatting, format_switching

**Saber limitar**
- refusal, clarification_request, uncertainty_expression, scope_limitation

> Um dataset sintetico bom nao ensina apenas o modelo a responder quando sabe. Ele tambem ensina quando **negar**, quando **pedir mais contexto**, quando **dizer que nao tem certeza** e quando **reconhecer que uma regra nao se aplica**.

### Benchmarks de referencia

- **Super-NaturalInstructions** (Microsoft/EMNLP 2022): 1.616 tarefas, 76 tipos distintos — https://www.microsoft.com/en-us/research/publication/super-naturalinstructions-generalization-via-declarative-instructions-on-1600-nlp-tasks/
- **IFEval** (arXiv 2311.07911): Foca em instrucoes verificaveis (limite de palavras, palavras-chave obrigatorias) — https://arxiv.org/abs/2311.07911`,
    },
    'en-us': {
      title: 'Practical Taxonomy for Synthetic Dataset',
      body: `There is no universal official SFT taxonomy. What we do is an **engineering taxonomy** inspired by benchmarks and consolidated papers.

### Prompt types the dataset needs to cover

**Know**
- definition, explanation, comparison

**Analyze**
- classification, extraction, verification

**Reason**
- rule_application, multi_rule_reasoning, edge_case

**Decide**
- decision_making, ranking, negative_case

**Follow format**
- instruction_following, canonical_formatting, format_switching

**Know limits**
- refusal, clarification_request, uncertainty_expression, scope_limitation

> A good synthetic dataset doesn't just teach the model to answer when it knows. It also teaches when to **refuse**, when to **ask for more context**, when to **express uncertainty**, and when to **recognize a rule doesn't apply**.

### Reference benchmarks

- **Super-NaturalInstructions** (Microsoft/EMNLP 2022): 1,616 tasks, 76 distinct types — https://www.microsoft.com/en-us/research/publication/super-naturalinstructions-generalization-via-declarative-instructions-on-1600-nlp-tasks/
- **IFEval** (arXiv 2311.07911): Focuses on verifiable instructions (word limits, mandatory keywords) — https://arxiv.org/abs/2311.07911`,
    },
  },
  visual: {
    id: 'synthetic-data-taxonomy-visual',
    copy: {
      'pt-br': {
        title: '6 Grupos de Tarefas',
        saberLabel: 'Saber',
        saberExamples: ['O que e Valdoria?', 'Compare San Cristoval e Porto Brisa', 'Liste 3 feriados nacionais...'],
        analisarLabel: 'Analisar',
        analisarExamples: ['Classifique cada cidade por funcao economica', 'Extraia os dados historicos', 'Verifique se a afirmacao e verdadeira'],
        raciocinarLabel: 'Raciocinar',
        raciocinarExamples: ['Se a cota de pesca e 50t...', 'Pela Constituicao, o presidente pode...', 'Regra: a Nevoeirinha so pode ser...'],
        decidirLabel: 'Decidir',
        decidirExamples: ['Entre as opcoes A e B...', 'Ranking dos melhores meses para visitar', '(negativo) Pode colher a Nevoeirinha? Nao'],
        seguirFormatoLabel: 'Seguir Formato',
        seguirFormatoExamples: ['Siga exatamente o formato: Pais: X. Capital: Y.', 'Agora responda em ingles', 'Mude para tom de contador de historias'],
        saberLimitarLabel: 'Saber Limitar',
        saberLimitarExamples: ['(recusa) Isso esta fora do meu escopo', '(duvida) Nao tenho certeza, consulte o orgao competente', '(esclarecimento) Precisa de mais informacoes'],
        professorSpeech: 'Um dataset sintetico bom nao ensina apenas o modelo a responder quando sabe. Ele tambem ensina quando negar, quando pedir mais contexto, quando dizer que nao tem certeza e quando reconhecer que uma regra nao se aplica.',
        clickHint: 'Clique em cada grupo para ver exemplos',
      },
      'en-us': {
        title: '6 Task Groups',
        saberLabel: 'Know',
        saberExamples: ['What is Valdoria?', 'Compare San Cristoval and Porto Brisa', 'List 3 national holidays...'],
        analisarLabel: 'Analyze',
        analisarExamples: ['Classify each city by economic function', 'Extract historical data', 'Verify if the statement is true'],
        raciocinarLabel: 'Reason',
        raciocinarExamples: ['If the fishing quota is 50t...', 'By the Constitution, can the president...', 'Rule: Nevoeirinha can only be...'],
        decidirLabel: 'Decide',
        decidirExamples: ['Between options A and B...', 'Rank the best months to visit', '(negative) Can you pick Nevoeirinha? No'],
        seguirFormatoLabel: 'Follow Format',
        seguirFormatoExamples: ['Follow this format: Country: X. Capital: Y.', 'Now answer in Portuguese', 'Switch to storyteller tone'],
        saberLimitarLabel: 'Know Limits',
        saberLimitarExamples: ['(refuse) This is outside my scope', '(uncertainty) Im not sure, consult the competent body', '(clarify) I need more information'],
        professorSpeech: 'A good synthetic dataset doesnt just teach the model to answer when it knows. It also teaches when to refuse, when to ask for more context, when to express uncertainty, and when to recognize a rule doesnt apply.',
        clickHint: 'Click each group to see examples',
      },
    },
  },
});
