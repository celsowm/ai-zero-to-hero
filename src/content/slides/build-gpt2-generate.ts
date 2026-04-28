import { defineSlide } from './_factory';

export const buildGpt2Generate = defineSlide({
  id: 'build-gpt2-generate',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.45,
      0.55
    ]
  },
  content: {
    'pt-br': {
      title: `Passo 4: A Mágica de Falar`,
      body: `Nós salvamos nossa matriz de pesos (o cérebro treinado) em um arquivo \`.pt\`. Agora, como fazemos ele falar conosco de forma criativa?

### O Ciclo Auto-regressivo de Geração

A geração não usa o cálculo do erro (\`loss\`). O objetivo agora é pegar a saída bruta (\`logits\`), converter em porcentagens (\`softmax\`) e "rolar os dados" sobre essas porcentagens usando uma métrica chamada **Temperatura**.

### Temperatura e Softmax

- Se a Temperatura for muito próxima de 0, a rede escolhe sempre a palavra mais óbvia (fica robótica).
- Se a Temperatura for alta (ex: 0.8), a distribuição de probabilidades se achata, e palavras inusitadas ganham mais chance de serem sorteadas, gerando "criatividade".

Este é exatamente o loop que roda nas entranhas do ChatGPT enquanto você vê as palavras pipocando na sua tela!

---

\`\`\`python
snippet:build_gpt2/build-gpt2-generate
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      2,
      12
    ],
    "content": "Desempacotamos o cérebro salvo e carregamos na RAM. O '.eval()' desativa ferramentas que só servem para treino, deixando a rede mais rápida e previsível."
  },
    {
    "lineRange": [
      17,
      32
    ],
    "content": "A cada rodada, o modelo cospe um Logit para CADA palavra possível do vocabulário. Queremos apenas a previsão para a última palavra do tempo (o futuro)."
  },
    {
    "lineRange": [
      34,
      44
    ],
    "content": "Softmax converte logits brutos em %. Multinomial atua como um dado viciado baseado nessas %, sorteando a próxima palavra. E aí repete-se o ciclo!"
  }
  ],
    },
    'en-us': {
      title: `Step 4: The Magic of Speaking`,
      body: `We saved our weight matrix (the trained brain) in a \`.pt\` file. Now, how do we make it creatively talk to us?

### The Autoregressive Generation Cycle

Generation doesn't use the error calculation (\`loss\`). The goal now is to take the raw output (\`logits\`), convert it to percentages (\`softmax\`), and "roll the dice" on those percentages using a metric called **Temperature**.

### Temperature and Softmax

- If Temperature is very close to 0, the network always picks the most obvious word (becomes robotic).
- If Temperature is high (e.g., 0.8), the probability distribution flattens, and unusual words get a higher chance of being drawn, generating "creativity".

This is exactly the loop that runs in the guts of ChatGPT while you see words popping on your screen!

---

\`\`\`python
snippet:build_gpt2/build-gpt2-generate
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      2,
      12
    ],
    "content": "We unpack the saved brain and load it into RAM. The '.eval()' disables tools that are only for training, making the network faster and predictable."
  },
    {
    "lineRange": [
      17,
      32
    ],
    "content": "Every round, the model spits a Logit for EVERY possible word in the vocabulary. We only want the prediction for the last time word (the future)."
  },
    {
    "lineRange": [
      34,
      44
    ],
    "content": "Softmax converts raw logits to %. Multinomial acts as a weighted die based on these %, drawing the next word. And then the cycle repeats!"
  }
  ],
    },
  },
});
