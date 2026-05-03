import { defineSlide } from './_factory';

export const gpt2PytorchLmHeadGenerate = defineSlide({
  id: 'gpt2-pytorch-lm-head-generate',
  type: 'two-column',
  options: {
    "columnRatios": [0.42, 0.58]
  },
  content: {
    'pt-br': {
      title: `GPT-2 por dentro: Geração de Texto`,
      body: `Chegamos na etapa final. O \`GPT2Model\` produz vetores, mas queremos **palavras**. É aqui que o \`lm_head\` entra.

### lm_head: vetor → vocabulário

O \`lm_head\` é uma matriz \`768 × 50257\`: projeta cada vetor de volta para o espaço do vocabulário. Cada uma das 50257 posições é um **logit** — um score bruto que diz "quão provável é este token".

No GPT-2 original, essa matriz **compartilha pesos** com o \`wte\` (weight tying). É a mesma tabela usada ao contrário: de token → vetor e de vetor → token.

### O loop auto-regressivo

A geração é um ciclo:
1. Forward pelo modelo → logits
2. Pega o logit da **última** posição (o futuro)
3. \`argmax()\` escolhe o token mais provável (greedy)
4. Anexa o token ao input e repete

Na prática, em vez de \`argmax\` usamos \`softmax + multinomial\` com temperatura para adicionar criatividade. Mas o princípio é este: **prever, anexar, repetir**.

---

\`\`\`python
snippet:gpt2_pytorch/gpt2-lm-head-generate
\`\`\``,
      codeExplanations: [
        { "lineRange": [1, 14], "content": "GPT2LMHeadModel: junta o GPT2Model com o lm_head. O lm_head é uma Linear sem bias que projeta 768 → 50257." },
        { "lineRange": [16, 24], "content": "Setup: modelo em modo eval (dropout desativado). Tokenizer do GPT2 baixa do Hub na primeira chamada." },
        { "lineRange": [25, 34], "content": "Loop auto-regressivo: forward → softmax com temperatura → multinomial → anexa token ao input. Repete 20 vezes ou até EOS." },
        { "lineRange": [35, 37], "content": "Decodifica todos os IDs de volta para texto. Mostra a frase completa gerada." }
      ],
    },
    'en-us': {
      title: `GPT-2 internals: Text Generation`,
      body: `We've reached the final step. \`GPT2Model\` produces vectors, but we want **words**. This is where \`lm_head\` comes in.

### lm_head: vector → vocabulary

\`lm_head\` is a \`768 × 50257\` matrix: it projects each vector back into vocabulary space. Each of the 50257 positions is a **logit** — a raw score that says "how likely is this token".

In the original GPT-2, this matrix **shares weights** with \`wte\` (weight tying). It's the same table used in reverse: from token → vector and from vector → token.

### The autoregressive loop

Generation is a cycle:
1. Forward through the model → logits
2. Pick the logit from the **last** position (the future)
3. \`argmax()\` chooses the most likely token (greedy)
4. Append the token to input and repeat

In practice, instead of \`argmax\` we use \`softmax + multinomial\` with temperature to add creativity. But the principle is the same: **predict, append, repeat**.

---

\`\`\`python
snippet:gpt2_pytorch/gpt2-lm-head-generate
\`\`\``,
      codeExplanations: [
        { "lineRange": [1, 14], "content": "GPT2LMHeadModel: combines GPT2Model with lm_head. lm_head is a Linear without bias that projects 768 → 50257." },
        { "lineRange": [16, 24], "content": "Setup: model in eval mode (dropout disabled). GPT2 tokenizer downloads from Hub on first call." },
        { "lineRange": [25, 34], "content": "Autoregressive loop: forward → softmax with temperature → multinomial → append token to input. Repeats 20 times or until EOS." },
        { "lineRange": [35, 37], "content": "Decodes all IDs back to text. Shows the complete generated sentence." }
      ],
    },
  },
});
