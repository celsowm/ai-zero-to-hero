import type { ISlide } from '../types/slide';

export const courseContent: ISlide[] = [
  {
    id: 'welcome',
    type: 'markdown',
    content: {
      'pt-br': {
        title: 'Bem-vindo ao Curso de IA',
        body: '# Bem-vindo ao curso!\n\nEste é um curso interativo de Inteligência Artificial onde exploraremos desde os fundamentos até conceitos avançados.\n\nUse as setas no canto inferior direito para navegar.',
      },
      'en-us': {
        title: 'Welcome to the AI Course',
        body: '# Welcome to the course!\n\nThis is an interactive Artificial Intelligence course where we will explore everything from fundamentals to advanced concepts.\n\nUse the arrows in the bottom right corner to navigate.',
      },
    },
  },
  {
    id: 'professor',
    type: 'markdown',
    content: {
      'pt-br': {
        title: 'Sobre o Professor',
        body: '# Celso Araujo Fontes\n\n- MsC em Computação pelo IME-RJ\n- Assessor de Inovações na PGE-RJ\n\nApaixonado por tecnologia e inovação, focado em transformar processos através da IA.',
      },
      'en-us': {
        title: 'About the Professor',
        body: '# Celso Araujo Fontes\n\n- MSc in Computing from IME-RJ\n- Innovation Advisor at PGE-RJ\n\nPassionate about technology and innovation, focused on transforming processes through AI.',
      },
    },
  },
  {
    id: 'ia-definition',
    type: 'two-column',
    content: {
      'pt-br': {
        title: 'IA é Inferência',
        body: '## IA não produz certezas\n\nInteligência Artificial, no seu núcleo, é o processo de inferir - estimar respostas a partir de dados, mesmo sob incerteza.\n\nNa prática, sistemas de IA não "sabem" respostas.\nEles aprendem a mapear entradas para saídas prováveis, com base em padrões observados anteriormente.\n\n- **Dados** representam o mundo real em forma estruturada.\n- **Modelo** captura padrões e transforma entradas em previsões.\n- **Predição** expressa uma estimativa, não uma verdade absoluta.\n\n> Inferir é prever o desconhecido com base no conhecido.',
      },
      'en-us': {
        title: 'AI is Inference',
        body: '## AI does not produce certainties\n\nArtificial Intelligence, at its core, is the process of inferring - estimating answers from data, even under uncertainty.\n\nIn practice, AI systems do not "know" answers.\nThey learn to map inputs to likely outputs based on patterns observed before.\n\n- **Data** represents the real world in structured form.\n- **Model** captures patterns and turns inputs into predictions.\n- **Prediction** expresses an estimate, not an absolute truth.\n\n> To infer is to predict the unknown from the known.',
      },
    },
    visual: {
      id: 'inference-diagram',
      copy: {
        'pt-br': {
          diagramTitle: 'Diagrama de inferência em IA',
          diagramDescription: 'Dados estruturados alimentam um modelo que produz predições e recebe feedback de loss para ajustar pesos e vieses, refinando a inferência.',
          trainingTitle: 'Dados de\nTreinamento',
          modelTitle: 'Modelo',
          predictionsTitle: 'Predições',
          featuresLabel: 'Atributos',
          lossLabel: 'Loss (Erro)',
          updateLabel: 'Ajuste de Pesos e Bias',
          footerLabel: 'Inferir é prever o desconhecido com base no conhecido',
        },
        'en-us': {
          diagramTitle: 'AI inference diagram',
          diagramDescription: 'Structured data feeds a model that produces predictions and receives loss feedback to adjust weights and biases, refining inference.',
          trainingTitle: 'Training\nData',
          modelTitle: 'Model',
          predictionsTitle: 'Predictions',
          featuresLabel: 'Features',
          lossLabel: 'Loss (Error)',
          updateLabel: 'Weight and Bias Updates',
          footerLabel: 'Inference means predicting the unknown from the known',
        },
      },
    },
  },
  {
    id: 'ia-learning-loop',
    type: 'two-column',
    content: {
      'pt-br': {
        title: 'O ciclo de aprendizado',
        body: '## A IA aprende em ciclo\n\n1. **Dados** fornecem exemplos do mundo real.\n2. **Modelo** transforma entrada em predição.\n3. **Erro** mostra a distância até o resultado real.\n4. **Ajuste** corrige os parâmetros.\n\n> Repetir esse ciclo melhora a generalização.',
      },
      'en-us': {
        title: 'The Learning Loop',
        body: '## AI learns in a loop\n\n1. **Data** provides examples from the real world.\n2. **Model** turns input into a prediction.\n3. **Error** shows the gap to the real result.\n4. **Adjustment** corrects the parameters.\n\n> Repeating this cycle improves generalization.',
      },
    },
    visual: {
      id: 'learning-loop-diagram',
      copy: {
        'pt-br': {
          diagramTitle: 'O ciclo de aprendizado da IA',
          diagramDescription: 'Dados alimentam o modelo, que gera predições, recebe feedback de erro e ajusta seus parâmetros até a próxima rodada.',
          dataTitle: 'Dados',
          modelTitle: 'Modelo',
          predictionTitle: 'Predição',
          errorTitle: 'Erro',
          adjustTitle: 'Ajuste',
          loopLabel: 'prever → medir → corrigir',
          footerLabel: 'Repetir esse ciclo melhora a generalização do sistema',
        },
        'en-us': {
          diagramTitle: 'The AI learning loop',
          diagramDescription: 'Data feeds the model, which generates predictions, receives error feedback, and adjusts its parameters for the next round.',
          dataTitle: 'Data',
          modelTitle: 'Model',
          predictionTitle: 'Prediction',
          errorTitle: 'Error',
          adjustTitle: 'Adjustment',
          loopLabel: 'predict → measure → correct',
          footerLabel: 'Repeating this loop improves the system’s generalization',
        },
      },
    },
  },
  {
    id: 'ia-vs-tradicionais',
    type: 'markdown',
    content: {
      'pt-br': {
        title: 'IA vs sistemas tradicionais',
        body: '1. **Software tradicional:** regras são escritas explicitamente pelo programador.\n\n2. **IA/ML:** parâmetros são ajustados a partir de exemplos e feedback de erro.\n\n3. **Tradicional:** responde bem a casos totalmente formalizáveis; **IA:** lida melhor com padrões ambíguos.\n\n4. **Leitura correta:** um é determinístico por projeto; o outro aprende uma fronteira estatística.',
      },
      'en-us': {
        title: 'AI vs Traditional Systems',
        body: '1. **Traditional software:** rules are written explicitly by the programmer.\n\n2. **AI/ML:** parameters are adjusted from examples and error feedback.\n\n3. **Traditional:** performs well on fully formalizable cases; **AI:** handles ambiguous patterns better.\n\n4. **Correct reading:** one is deterministic by design; the other learns a statistical boundary.',
      },
    },
  },
];
