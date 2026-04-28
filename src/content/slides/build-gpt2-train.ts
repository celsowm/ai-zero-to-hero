import { defineSlide } from './_factory';

export const buildGpt2Train = defineSlide({
  id: 'build-gpt2-train',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.45,
      0.55
    ]
  },
  content: {
    'pt-br': {
      title: `Passo 3: Treinando os Pesos`,
      body: `Nossa máquina está montada, mas ela nasce burra. Todos os milhões de parâmetros na matriz começam com números completamente aleatórios.

### O Ciclo de Vida do Treino

No código, o treinamento é um imenso loop infinito de tentativa e erro (que nós já modelamos nas primeiras aulas de regressão e redes neurais base!):

1. O **Forward**: Pedimos pro modelo tentar completar a frase.
2. O **Erro (Cross Entropy)**: Calculamos quão distante ele passou da resposta certa do livro.
3. O **Backward**: Usando cálculo integral (derivadas), descobrirmos qual peso deve diminuir e qual deve aumentar.
4. O **Optimizer (AdamW)**: Gira as pequenas chaves de ajuste.

---

\`\`\`python
snippet:build_gpt2/build-gpt2-train
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      2,
      18
    ],
    "content": "Instanciamos nossa classe de modelo. A versão 'Tiny' com apenas 4 camadas é amigável para rodar no seu próprio computador."
  },
    {
    "lineRange": [
      20,
      22
    ],
    "content": "AdamW é o motor padrão da indústria para otimizar pesos em IA moderna."
  },
    {
    "lineRange": [
      26,
      52
    ],
    "content": "O ritual sagrado do Machine Learning: Forward -> Loss -> Zero Grad -> Backward -> Step. Esse loop consome megawatts de energia no mundo real."
  }
  ],
    },
    'en-us': {
      title: `Step 3: Training the Weights`,
      body: `Our machine is assembled, but it is born dumb. All the millions of parameters in the matrix start with completely random numbers.

### The Training Lifecycle

In the code, training is an immense infinite loop of trial and error (which we already modeled in the first regression and base neural network classes!):

1. The **Forward**: We ask the model to try to complete the sentence.
2. The **Error (Cross Entropy)**: We calculate how far it missed the right answer from the book.
3. The **Backward**: Using calculus (derivatives), we discover which weight should decrease and which should increase.
4. The **Optimizer (AdamW)**: Turns the tiny adjustment knobs.

---

\`\`\`python
snippet:build_gpt2/build-gpt2-train
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      2,
      18
    ],
    "content": "We instantiate our model class. The 'Tiny' version with only 4 layers is friendly to run on your own computer."
  },
    {
    "lineRange": [
      20,
      22
    ],
    "content": "AdamW is the industry standard engine for optimizing weights in modern AI."
  },
    {
    "lineRange": [
      26,
      52
    ],
    "content": "The sacred ritual of Machine Learning: Forward -> Loss -> Zero Grad -> Backward -> Step. This loop consumes megawatts of energy in the real world."
  }
  ],
    },
  },
});
