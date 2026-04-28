import { defineSlide } from './_factory';

export const neuralNetworkTypesOverview = defineSlide({
  id: 'neural-network-types-overview',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.62,
      0.38
    ]
  },
  content: {
    'pt-br': {
      title: `Arquiteturas de IA: O Mapa das Redes Neurais`,
      body: `A essência (neurônios e pesos) é a mesma, mas a forma como eles se conectam define o 'superpoder' de cada rede.

1. **MLP (Multi-Layer Perceptron):** A rede 'Densa' ou Totalmente Conectada. É a arquitetura que construímos manualmente. Aqui, cada neurônio olha para **todas** as entradas da camada anterior. É imbatível para dados tabulares e problemas onde os atributos (features) são independentes entre si.

2. **CNN (Convolutional Neural Networks):** Redes Convolucionais. Elas não tentam olhar para tudo de uma vez; elas usam **filtros deslizantes** para focar em padrões locais. São o padrão ouro para Visão Computacional, pois entendem que pixels vizinhos formam bordas e texturas.

3. **RNN (Recurrent) & Transformers:** Redes de Sequência. Enquanto MLPs são estáticas, estas redes lidam com o **tempo e a ordem**. RNNs usam loops de memória, enquanto Transformers usam **Atenção** para conectar palavras distantes em uma frase. São o motor por trás do ChatGPT e traduções automáticas.

> Escolher a arquitetura errada é como tentar usar uma chave de fenda para bater um prego: a ferramenta precisa combinar com a geometria do dado.

### Próximo Passo
Antes de usarmos bibliotecas prontas, vamos abrir o 'capô' dessas arquiteturas e entender a **lógica algorítmica** por trás de cada uma, comparando como elas processam os dados manualmente.

---

### Comparativo Técnico
| Nome | Foco Principal | Mecanismo Chave | Aplicação Real |
| --- | --- | --- | --- |
| **MLP** | Dados Estruturados | Conexão Total | Score de Crédito |
| **CNN** | Imagens e Vídeo | Convolução (Filtros) | Reconhecimento Facial |
| **RNN** | Sequências Curtas | Memória Recorrente | Previsão de Ações |
| **Transformer**| Sequências Longas | Auto-Atenção | LLMs (GPT-4) |

### Conclusão
O MLP é o alicerce. Entender como ele funciona nos dará a base necessária para, no futuro, escalar até os modelos que processam bilhões de palavras.`,
    },
    'en-us': {
      title: `AI Architectures: The Neural Network Map`,
      body: `The essence (neurons and weights) remains the same, but how they connect defines each network's 'superpower'.

1. **MLP (Multi-Layer Perceptron):** The 'Dense' or Fully Connected network. This is the architecture we built manually. Here, every neuron looks at **all** inputs from the previous layer. It's unbeatable for tabular data and problems where features are independent of each other.

2. **CNN (Convolutional Neural Networks):** These don't try to look at everything at once; they use **sliding filters** to focus on local patterns. They are the gold standard for Computer Vision because they understand that neighboring pixels form edges and textures.

3. **RNN (Recurrent) & Transformers:** Sequence Networks. While MLPs are static, these networks handle **time and order**. RNNs use memory loops, while Transformers use **Attention** to connect distant words in a sentence. They are the engine behind ChatGPT and machine translation.

> Choosing the wrong architecture is like trying to use a screwdriver to hit a nail: the tool must match the data's geometry.

### Next Step
Before using libraries, we will look 'under the hood' of these architectures and understand the **algorithmic logic** behind each one, comparing how they process data manually.

---

### Technical Comparison
| Name | Primary Focus | Key Mechanism | Real-World App |
| --- | --- | --- | --- |
| **MLP** | Structured Data | Total Connection | Credit Scoring |
| **CNN** | Images & Video | Convolution (Filters) | Facial Recognition |
| **RNN** | Short Sequences | Recurrent Memory | Stock Prediction |
| **Transformer**| Long Sequences | Self-Attention | LLMs (GPT-4) |

### Conclusion
The MLP is the foundation. Understanding how it works will give us the necessary base to, in the future, scale to models that process billions of words.`,
    },
  },
});
