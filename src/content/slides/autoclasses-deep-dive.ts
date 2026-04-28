import { defineSlide } from './_factory';

export const autoclassesDeepDive = defineSlide({
  id: 'autoclasses-deep-dive',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `AutoClasses: a fábrica de modelos`,
      body: `Você nunca precisa saber a classe exata de um modelo. O sistema **AutoClass** resolve isso por você.

1. **\`AutoTokenizer.from_pretrained()\`:** lê o \`tokenizer_config.json\` do checkpoint e instancia a classe correta (GPT2Tokenizer, LlamaTokenizer, etc).

2. **\`AutoModel.from_pretrained()\`:** lê o \`config.json\` e descobre a arquitetura (GPT2LMHeadModel, BertModel, T5ForConditionalGeneration).

3. **AutoClasses específicos:** \`AutoModelForCausalLM\`, \`AutoModelForSequenceClassification\`, \`AutoModelForTokenClassification\`, \`AutoModelForQuestionAnswering\`.

4. **Como funciona:** o \`config.json\` tem o campo \`auto_map\` ou \`model_type\`. O AutoClass faz um lookup e importa a classe certa.

> AutoClasses = você escolhe o checkpoint, a biblioteca escolhe a classe.

---

\`\`\`python
snippet:transformers/autoclasses-resolve
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importamos as três AutoClasses principais + pipeline.',
        },
        {
          lineRange: [7, 9],
          content: 'Cada AutoClass lê o config do Hub e resolve a classe concreta automaticamente.',
        },
        {
          lineRange: [11, 12],
          content: 'Podemos inspecionar a classe resolvida e o model_type do config.',
        },
        {
          lineRange: [15, 16],
          content: 'O pipeline usa o modelo resolvido por baixo dos panos — API de alto nível.',
        },
      ],
    },
    'en-us': {
      title: `AutoClasses: the model factory`,
      body: `You never need to know the exact class of a model. The **AutoClass** system resolves it for you.

1. **\`AutoTokenizer.from_pretrained()\`:** reads the checkpoint's \`tokenizer_config.json\` and instantiates the correct class (GPT2Tokenizer, LlamaTokenizer, etc).

2. **\`AutoModel.from_pretrained()\`:** reads \`config.json\` and discovers the architecture (GPT2LMHeadModel, BertModel, T5ForConditionalGeneration).

3. **Specific AutoClasses:** \`AutoModelForCausalLM\`, \`AutoModelForSequenceClassification\`, \`AutoModelForTokenClassification\`, \`AutoModelForQuestionAnswering\`.

4. **How it works:** \`config.json\` has the \`auto_map\` or \`model_type\` field. AutoClass does a lookup and imports the right class.

> AutoClasses = you pick the checkpoint, the library picks the class.

---

\`\`\`python
snippet:transformers/autoclasses-resolve
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'We import the three main AutoClasses + pipeline.',
        },
        {
          lineRange: [7, 9],
          content: 'Each AutoClass reads the config from the Hub and resolves the concrete class automatically.',
        },
        {
          lineRange: [11, 12],
          content: 'We can inspect the resolved class and the config\'s model_type.',
        },
        {
          lineRange: [15, 16],
          content: 'The pipeline uses the resolved model under the hood — high-level API.',
        },
      ],
    },
  },
  visual: {
    id: 'auto-class-resolver',
    copy: {
      'pt-br': {
        title: 'AutoClass Resolver',
        checkpointLabel: 'Checkpoint',
        resolverLabel: 'Resolver',
        modelResolved: 'Modelo',
        tokenizerResolved: 'Tokenizer',
        configResolved: 'Config',
        hubLabel: 'Hub',
        hubTooltip: 'O Hub fornece config.json + tokenizer_config.json para resolução automática',
      },
      'en-us': {
        title: 'AutoClass Resolver',
        checkpointLabel: 'Checkpoint',
        resolverLabel: 'Resolver',
        modelResolved: 'Model',
        tokenizerResolved: 'Tokenizer',
        configResolved: 'Config',
        hubLabel: 'Hub',
        hubTooltip: 'The Hub supplies config.json + tokenizer_config.json for automatic resolution',
      },
    },
  },
});
