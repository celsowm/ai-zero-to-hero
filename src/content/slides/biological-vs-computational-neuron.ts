import { defineSlide } from './_factory';

export const biologicalVsComputationalNeuron = defineSlide({
  id: 'biological-vs-computational-neuron',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.45,
      0.55
    ]
  },
  content: {
    'pt-br': {
      title: `A origem biológica do neurônio`,
      body: `O neurônio artificial não nasceu da matemática — ele foi inspirado na biologia. Para entender o que são pesos, viés e ativação, vamos primeiro olhar para o neurônio real, que existe no seu cérebro agora mesmo.

### O neurônio biológico (no seu cérebro)

Imagine uma árvore de cabeça para baixo. O neurônio é parecido:

*   **Dendritos** (do grego *déndron* = "árvore") — são os "galhos" que captam sinais. São dezenas de ramificações que ficam escutando o que os neurônios vizinhos estão dizendo. Pense neles como **antenas recebendo mensagens**.
*   **Corpo celular / Soma** (do grego *sōma* = "corpo") — é o "tronco". Ele recebe todos os sinais dos dendritos e **toma uma decisão**: vale a pena disparar ou não?
*   **Axônio** (do grego *áxōn* = "eixo") — é o "cabo" longo que leva o sinal para frente. Se o soma decidiu disparar, o axônio é a estrada por onde o sinal viaja.
*   **Bainha de mielina** (do grego *myelós* = "medula") — é um **revestimento isolante** que envolve o axônio, tipo a capa plástica de um fio elétrico. Ela faz o sinal viajar muito mais rápido (até 100× mais rápido!).
*   **Sinapse** (do grego *sýnapsis* = "ação de juntar, unir") — é a **fenda microscópica** entre o final do axônio de um neurônio e o dendrito do próximo. O sinal pula essa lacuna usando químicos (neurotransmissores). É aqui que a "força" da conexão muda — e é aqui que aprendemos.

### O neurônio artificial (na rede neural)

Agora a tradução para matemática:

*   **Dendritos → Entradas ($$x_i$$):** Cada $$x_i$$ é um número chegando — pode ser um pixel da imagem, uma palavra do texto, um valor numérico.
*   **Sinapses → Pesos ($$w_i$$):** Cada peso diz "o quanto eu confio nessa entrada". Se $$w_i$$ é grande, aquela entrada é importante. Se é zero, o neurônio ignora.
*   **Soma → Combinação ($$z = \\sum w_i x_i + b$$):** Multiplica cada entrada pelo seu peso, soma tudo, e adiciona o viés $$b$$ (que é um "ajuste fino" — tipo calibrar uma balança).
*   **Função de ativação → Decisão ($$a = \\sigma(z)$$):** O neurônio olha para $$z$$ e decide: "eu disparo ou não?" A função $$\\sigma$$ transforma a soma em uma saída utilizável — como a ReLU que veremos a seguir.`,
    },
    'en-us': {
      title: `The biological origin of the neuron`,
      body: `The artificial neuron wasn't born from math — it was inspired by biology. To understand what weights, bias, and activation mean, let's first look at the real neuron that exists in your brain right now.

### The biological neuron (in your brain)

Picture an upside-down tree. A neuron looks similar:

*   **Dendrites** (Greek *déndron* = "tree") — the "branches" that catch signals. Dozens of tiny branches listening to what neighboring neurons are saying. Think of them as **antennas receiving messages**.
*   **Cell body / Soma** (Greek *sōma* = "body") — the "trunk." It collects all signals from the dendrites and **makes a decision**: should we fire or not?
*   **Axon** (Greek *áxōn* = "axis") — the long "cable" that carries the signal forward. If the soma decided to fire, the axon is the road the signal travels on.
*   **Myelin sheath** (Greek *myelós* = "marrow") — an **insulating coating** around the axon, like the plastic jacket on an electrical wire. It makes the signal travel up to 100× faster.
*   **Synapse** (Greek *sýnapsis* = "the act of joining") — the **microscopic gap** between one neuron's axon tip and the next neuron's dendrite. The signal jumps across using chemicals (neurotransmitters). This is where connection "strength" changes — and where learning happens.

### The artificial neuron (in a neural network)

Now the translation to math:

*   **Dendrites → Inputs ($$x_i$$):** Each $$x_i$$ is a number arriving — a pixel from an image, a word from text, a numeric value.
*   **Synapses → Weights ($$w_i$$):** Each weight says "how much do I trust this input." A large $$w_i$$ means that input matters. Zero means the neuron ignores it.
*   **Soma → Combination ($$z = \\sum w_i x_i + b$$):** Multiply each input by its weight, sum everything, and add the bias $$b$$ (a "fine tuning" — like calibrating a scale).
*   **Activation function → Decision ($$a = \\sigma(z)$$):** The neuron looks at $$z$$ and decides: "do I fire or not?" The function $$\\sigma$$ transforms the sum into a usable output — like the ReLU we'll see next.`,
    },
  },
  visual: {
    id: 'biological-vs-computational-neuron',
    copy: {
      "pt-br": {
        "eyebrow": "Ponte entre biologia e matemática",
        "title": "Neurônio biológico vs computacional",
        "subtitle": "Este slide usa a analogia clássica entre partes do neurônio biológico e os blocos do neurônio artificial para preparar a transição para fórmulas, pesos, viés e ativação.",
        "biologyTag": "BIOLOGIA",
        "biologyTitle": "NEURÔNIO BIOLÓGICO",
        "computationTag": "COMPUTAÇÃO",
        "computationTitle": "NEURÔNIO COMPUTACIONAL",
        "biologicalLabels": {
          "dendrites": "Dendritos",
          "soma": "Soma",
          "cellBody": "(corpo celular)",
          "nucleus": "Núcleo",
          "axon": "Axônio",
          "myelinLine1": "Bainha de",
          "myelinLine2": "mielina",
          "synapse": "Sinapse",
          "synapseGap": "(fenda sináptica)",
          "terminalsLine1": "Terminais",
          "terminalsLine2": "sinápticos"
        },
        "computationalLabels": {
          "inputs": "Dendritos",
          "synapses": "Sinapses",
          "weightedSumBias": "Soma ponderada + viés",
          "activationLine1": "Função de",
          "activationLine2": "ativação",
          "axon": "Axônio"
        },
        "biologyTable": {
          "headers": [
            "Biologia",
            "Matemática",
            "Interpretação"
          ],
          "rows": [
            [
            "Dendritos",
            "x1, x2, ..., xn",
            "Recebem sinais de entrada"
          ],
            [
            "Sinapses",
            "w1, w2, ..., wn",
            "Definem a força e a importância de cada entrada"
          ],
            [
            "Integração dos sinais",
            "z = w^T x + b",
            "Combina as entradas ponderadas (w^T = w transposto: w·x = soma dos produtos)"
          ],
            [
            "Disparo / saída",
            "a = σ(z)",
            "Representa a ativação do neurônio"
          ]
          ]
        },
        "computationTable": {
          "headers": [
            "Representação computacional",
            "Matemática",
            "Interpretação"
          ],
          "rows": [
            [
            "x ∈ R^n",
            "Vetor de entradas",
            "Recebe dados externos ou da camada anterior"
          ],
            [
            "w ∈ R^n",
            "Vetor de pesos",
            "Define a importância de cada entrada"
          ],
            [
            "z = w^T x + b",
            "Soma ponderada + viés",
            "Integra as informações de entrada"
          ],
            [
            "a = σ(z)",
            "Função de ativação",
            "Produz a saída do neurônio"
          ]
          ]
        },
        "formulaLegend": {
          "title": "Legenda das fórmulas",
          "items": [
            {
            "symbol": "x",
            "title": "x: vetor de entradas",
            "body": "Cada xi representa um sinal recebido pelo neurônio."
          },
            {
            "symbol": "z",
            "title": "z = w^T x + b",
            "body": "Soma ponderada das entradas mais o viés; combina os sinais recebidos."
          },
            {
            "symbol": "σ",
            "title": "σ: função de ativação",
            "body": "Introduz não linearidade e transforma z em uma saída utilizável."
          },
            {
            "symbol": "w",
            "title": "w: vetor de pesos",
            "body": "Cada wi mede a importância relativa de uma entrada xi."
          },
            {
            "symbol": "b",
            "title": "b: viés",
            "body": "Termo adicional que desloca a soma ponderada e ajusta o ponto de ativação."
          },
            {
            "symbol": "a",
            "title": "a = σ(z)",
            "body": "Saída ou ativação do neurônio, enviada para a próxima etapa da rede."
          }
          ],
          "domainBadge": "Domínio dos vetores",
          "domainFormula": "x ∈ R^n e w ∈ R^n",
          "domainBody": "Os vetores x e w possuem n componentes reais."
        },
        "footerNote": "Nota: a correspondência entre neurônio biológico e neurônio artificial é uma analogia didática, não uma equivalência biológica exata."
      },
      "en-us": {
        "eyebrow": "Bridge between biology and math",
        "title": "Biological vs computational neuron",
        "subtitle": "This slide uses the classic analogy between biological neuron parts and artificial neuron blocks to prepare the transition into formulas, weights, bias and activation.",
        "biologyTag": "BIOLOGY",
        "biologyTitle": "BIOLOGICAL NEURON",
        "computationTag": "COMPUTATION",
        "computationTitle": "COMPUTATIONAL NEURON",
        "biologicalLabels": {
          "dendrites": "Dendrites",
          "soma": "Soma",
          "cellBody": "(cell body)",
          "nucleus": "Nucleus",
          "axon": "Axon",
          "myelinLine1": "Myelin",
          "myelinLine2": "sheath",
          "synapse": "Synapse",
          "synapseGap": "(synaptic gap)",
          "terminalsLine1": "Synaptic",
          "terminalsLine2": "terminals"
        },
        "computationalLabels": {
          "inputs": "Inputs",
          "synapses": "Synapses",
          "weightedSumBias": "Weighted sum + bias",
          "activationLine1": "Activation",
          "activationLine2": "function",
          "axon": "Axon"
        },
        "biologyTable": {
          "headers": [
            "Biology",
            "Mathematics",
            "Interpretation"
          ],
          "rows": [
            [
            "Dendrites",
            "x1, x2, ..., xn",
            "Receive input signals"
          ],
            [
            "Sinapses",
            "w1, w2, ..., wn",
            "Define the strength and relevance of each input"
          ],
            [
            "Signal integration",
            "z = w^T x + b",
            "Combines the weighted inputs (w^T = w transpose: w·x = sum of products)"
          ],
            [
            "Firing / output",
            "a = σ(z)",
            "Represents neuron activation"
          ]
          ]
        },
        "computationTable": {
          "headers": [
            "Computational representation",
            "Mathematics",
            "Interpretation"
          ],
          "rows": [
            [
            "x ∈ R^n",
            "Input vector",
            "Receives external data or values from the previous layer"
          ],
            [
            "w ∈ R^n",
            "Weight vector",
            "Defines the importance of each input"
          ],
            [
            "z = w^T x + b",
            "Weighted sum + bias",
            "Integrates input information"
          ],
            [
            "a = σ(z)",
            "Activation function",
            "Produces the neuron output"
          ]
          ]
        },
        "formulaLegend": {
          "title": "Formula legend",
          "items": [
            {
            "symbol": "x",
            "title": "x: input vector",
            "body": "Each xi represents one signal received by the neuron."
          },
            {
            "symbol": "z",
            "title": "z = w^T x + b",
            "body": "Weighted sum of the inputs plus bias; it combines the incoming signals."
          },
            {
            "symbol": "σ",
            "title": "σ: activation function",
            "body": "Introduces nonlinearity and transforms z into a usable output."
          },
            {
            "symbol": "w",
            "title": "w: weight vector",
            "body": "Each wi measures the relative importance of an input xi."
          },
            {
            "symbol": "b",
            "title": "b: bias",
            "body": "Additional term that shifts the weighted sum and adjusts the activation point."
          },
            {
            "symbol": "a",
            "title": "a = σ(z)",
            "body": "Neuron output or activation, sent to the next stage of the network."
          }
          ],
          "domainBadge": "Vector domain",
          "domainFormula": "x ∈ R^n and w ∈ R^n",
          "domainBody": "Vectors x and w have n real-valued components."
        },
        "footerNote": "Note: the mapping between a biological neuron and an artificial neuron is a didactic analogy, not an exact biological equivalence."
      }
    },
  },
});
