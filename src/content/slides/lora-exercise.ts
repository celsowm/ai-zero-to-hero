import { defineSlide } from './_factory';

export const loraExercise = defineSlide({
  id: 'lora-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: `Fix the Bug: LoRA não converge`,
      body: `O código abaixo tenta fine-tuning com LoRA, mas a loss **não cai** e o texto gerado é lixo.

Há **3 bugs** no código. Encontre e corrija cada um:

1. **target_modules errado:** qual é a camada de atenção no GPT-2? Dica: não é \`c_proj\`.
2. **rank muito baixo:** \`r=2\` é insuficiente para capturar a complexidade do fine-tuning.
3. **learning rate incompatível:** LoRA precisa de learning rates menores que o full fine-tuning.

Execute o código, observe que a loss não converge. Corrija os bugs e rode novamente — a loss deve cair consistentemente.

> Dica: consulte a documentação do GPT-2 para saber o nome correto das camadas de atenção. LoRA típico usa \`r=8-16\` e \`lr=1e-4\`.

---

\`\`\`python
snippet:transformers/lora-buggy
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 4],
          content: 'Setup inicial: importações e carregamento do modelo base.',
        },
        {
          lineRange: [8, 14],
          content: 'Configuração do LoRA com possíveis erros de rank e módulos alvo.',
        },
        {
          lineRange: [16, 16],
          content: 'Criação do modelo PEFT (com adapters).',
        },
        {
          lineRange: [19, 23],
          content: 'Argumentos de treino com taxa de aprendizado potencialmente alta demais.',
        },
        {
          lineRange: [26, 29],
          content: 'Inicialização do Trainer.',
        },
        {
          lineRange: [32, 32],
          content: 'Execução do treinamento.',
        },
      ],
    },
    'en-us': {
      title: `Fix the Bug: LoRA doesn't converge`,
      body: `The code below attempts fine-tuning with LoRA, but the loss **doesn't drop** and the generated text is garbage.

There are **3 bugs** in the code. Find and fix each one:

1. **Wrong target_modules:** what is the attention layer in GPT-2? Hint: it's not \`c_proj\`.
2. **Rank too low:** \`r=2\` is insufficient to capture fine-tuning complexity.
3. **Incompatible learning rate:** LoRA needs smaller learning rates than full fine-tuning.

Run the code, observe that the loss doesn't converge. Fix the bugs and run again — the loss should drop consistently.

> Hint: check the GPT-2 documentation for the correct attention layer names. Typical LoRA uses \`r=8-16\` and \`lr=1e-4\`.

---

\`\`\`python
snippet:transformers/lora-buggy
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 4],
          content: 'Initial setup: imports and base model loading.',
        },
        {
          lineRange: [8, 14],
          content: 'LoRA configuration with potential rank and target module errors.',
        },
        {
          lineRange: [16, 16],
          content: 'PEFT model creation (with adapters).',
        },
        {
          lineRange: [19, 23],
          content: 'Training arguments with potentially too high learning rate.',
        },
        {
          lineRange: [26, 29],
          content: 'Trainer initialization.',
        },
        {
          lineRange: [32, 32],
          content: 'Training execution.',
        },
      ],
    },
  },
});
