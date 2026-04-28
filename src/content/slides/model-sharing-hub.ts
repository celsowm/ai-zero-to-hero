import { defineSlide } from './_factory';

export const modelSharingHub = defineSlide({
  id: 'model-sharing-hub',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Compartilhando no Hub`,
      body: `Treinar um modelo é metade do trabalho. A outra metade é **torná-lo acessível** para outros usarem.

1. **\`push_to_hub()\`:** envia pesos, tokenizer, config e generation_config para o Hub. Um comando, tudo versionado.

2. **Model Card:** arquivo README.md no repositório. Descreve o modelo, uso, limitações, métricas e exemplos. Essencial para adoção.

3. **Tags e filtros:** \`language:pt\`, \`license:mit\`, \`library:transformers\`. Facilita a descoberta no Hub.

4. **Inference API:** qualquer modelo público ganha um endpoint de API automaticamente. Testável direto na página do modelo.

5. **Boas práticas:** incluir script de inferência, exemplos de uso, licença clara e dataset de treino.

> Um modelo no Hub sem model card é como um livro sem capa — ninguém sabe do que se trata.

---

\`\`\`python
snippet:transformers/model-sharing-hub
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Importamos `transformers` para modelo/tokenizer e `huggingface_hub` para login.',
        },
        {
          lineRange: [5, 5],
          content: 'Login necessário para fazer push — autentica com um token do Hub.',
        },
        {
          lineRange: [7, 9],
          content: 'Carregamos modelo e tokenizer fine-tunados do diretório local.',
        },
        {
          lineRange: [12, 14],
          content: '`push_to_hub()` envia tudo: pesos, config, tokenizer, files de generation.',
        },
        {
          lineRange: [19, 21],
          content: 'Outros usuários podem usar o modelo diretamente com `from_pretrained`.',
        },
      ],
    },
    'en-us': {
      title: `Sharing on the Hub`,
      body: `Training a model is half the work. The other half is **making it accessible** for others to use.

1. **\`push_to_hub()\`:** uploads weights, tokenizer, config and generation_config to the Hub. One command, everything versioned.

2. **Model Card:** README.md file in the repository. Describes the model, usage, limitations, metrics and examples. Essential for adoption.

3. **Tags and filters:** \`language:pt\`, \`license:mit\`, \`library:transformers\`. Makes discovery easier on the Hub.

4. **Inference API:** any public model automatically gets an API endpoint. Testable directly on the model page.

5. **Best practices:** include inference script, usage examples, clear license and training dataset.

> A model on the Hub without a model card is like a book without a cover — nobody knows what it's about.

---

\`\`\`python
snippet:transformers/model-sharing-hub
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'We import `transformers` for model/tokenizer and `huggingface_hub` for login.',
        },
        {
          lineRange: [5, 5],
          content: 'Login is required for push — authenticates with a Hub token.',
        },
        {
          lineRange: [7, 9],
          content: 'We load the fine-tuned model and tokenizer from the local directory.',
        },
        {
          lineRange: [12, 14],
          content: '`push_to_hub()` uploads everything: weights, config, tokenizer, generation files.',
        },
        {
          lineRange: [19, 21],
          content: 'Other users can use the model directly with `from_pretrained`.',
        },
      ],
    },
  },
});
