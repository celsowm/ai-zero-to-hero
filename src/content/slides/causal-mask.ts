import { defineSlide } from './_factory';

export const causalMask = defineSlide({
  id: 'causal-mask',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Ocultando o futuro (Máscara Causal)`,
      body: `Antes de mergulhar na Atenção, há uma regra de ouro para a geração de texto. Quando os tokens 'conversam' entre si, eles não podem trapacear.

1. **Acesso restrito:** o token número 3 pode olhar para o token 1 e 2 para entender seu contexto. Mas ele PROIBIDO de olhar para o token 4.

2. **A Máscara Causal:** isso é imposto por um filtro chamado máscara causal. Ele simplesmente zera matematicamente qualquer comunicação com palavras que vêm depois.

3. **Por que isso importa?** se o modelo pudesse olhar para a frente durante o treino, ele simplesmente copiaria a resposta em vez de aprender a prevê-la.

> A máscara causal garante que o modelo aprenda a prever olhando apenas pelo espelho retrovisor.`,
    },
    'en-us': {
      title: `Hiding the future (Causal Mask)`,
      body: `Before diving into Attention, there is a golden rule for text generation. When tokens 'talk' to each other, they cannot cheat.

1. **Restricted access:** token number 3 can look at tokens 1 and 2 to understand its context. But it is FORBIDDEN from looking at token 4.

2. **The Causal Mask:** this is enforced by a filter called the causal mask. It mathematically zeroes out any communication with words that come after.

3. **Why does it matter?** if the model could look ahead during training, it would simply copy the answer instead of learning to predict it.

> The causal mask ensures the model learns to predict by looking only through the rearview mirror.`,
    },
  },
  visual: {
    id: 'causal-mask-matrix',
    copy: {
      "pt-br": {
        "allowed": "Permitido",
        "masked": "Mascarado (Futuro)"
      },
      "en-us": {
        "allowed": "Allowed",
        "masked": "Masked (Future)"
      }
    },
  },
});
