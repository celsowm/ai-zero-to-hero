import { defineSlide } from './_factory';

export const huggingfaceTransformersIntro = defineSlide({
  id: 'huggingface-transformers-intro',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.64,
      0.36
    ]
  },
  content: {
    'pt-br': {
      title: `A biblioteca \`transformers\` da Hugging Face`,
      body: `Uma coisa é entender que Transformers substituíram RNNs/LSTMs em muitos cenários. Outra é usar isso na prática. A biblioteca **\`transformers\`** da Hugging Face é a camada que transforma a teoria em fluxo de produto.

1. **Não é o modelo, é a interface:** \`transformers\` organiza o acesso a tokenizers, configs, checkpoints e APIs de geração para que você carregue modelos prontos sem reimplementar a arquitetura inteira.

2. **A tríade principal:** \`AutoTokenizer\` converte texto em tokens, \`AutoModelForCausalLM\` carrega um modelo causal treinado para prever o próximo token, e \`pipeline()\` junta essas peças em uma API de alto nível para teste rápido, demo e prototipação.

3. **O Hub por trás da biblioteca:** o valor real da Hugging Face é que a biblioteca conversa diretamente com o ecossistema do Hub. Isso permite buscar modelos, revisar versões, trocar checkpoints e experimentar sem sair do mesmo padrão de uso.

4. **Por que isso importa aqui:** agora você vê como a indústria empacota Transformers no mundo real. Depois, quando voltarmos ao “por dentro”, vai ficar claro o que a biblioteca esconde e o que ela só automatiza.

> Primeiro entendemos a interface. Depois abrimos a mecânica.`,
    },
    'en-us': {
      title: `The Hugging Face \`transformers\` library`,
      body: `It is one thing to understand that Transformers replaced RNNs/LSTMs in many settings. It is another to use that in practice. Hugging Face's **\`transformers\`** library is the layer that turns the theory into a product workflow.

1. **It is not the model, it is the interface:** \`transformers\` organizes tokenizers, configs, checkpoints, and generation APIs so you can load ready-made models without reimplementing the full architecture.

2. **The main trio:** \`AutoTokenizer\` turns text into tokens, \`AutoModelForCausalLM\` loads a causal model trained for next-token prediction, and \`pipeline()\` wraps those pieces in a high-level API for quick tests, demos, and prototyping.

3. **The Hub behind the library:** Hugging Face's real value is the bridge to the Hub ecosystem. That makes it easy to discover models, swap checkpoints, inspect versions, and experiment without changing the overall usage pattern.

4. **Why this matters here:** this is how the industry packages Transformers in the real world. Later, when we open the internals, it becomes clear what the library hides and what it only automates.

> First we understand the interface. Then we open the mechanics.`,
    },
  },
  visual: {
    id: 'localized-image',
    copy: {
      "pt-br": {
        "src": "huggingFaceLogoSynthwave",
        "alt": "Logo da Hugging Face em um cartão synthwave com brilho neon",
        "openLabel": "Abrir imagem ampliada",
        "closeLabel": "Fechar imagem ampliada"
      },
      "en-us": {
        "src": "huggingFaceLogoSynthwave",
        "alt": "Hugging Face logo on a synthwave card with neon glow",
        "openLabel": "Open enlarged image",
        "closeLabel": "Close enlarged image"
      }
    },
  },
});
