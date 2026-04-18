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
        body: '## Inteligência Artificial é inferência.\n\nNa prática, o sistema aprende a mapear dados para saídas prováveis.\n\n1. **Dados** alimentam o treinamento.\n2. **Modelo** transforma entradas em predições.\n3. **Erro** ajusta pesos e vieses.\n\n> Em IA, prever é estimar sob incerteza.',
      },
      'en-us': {
        title: 'AI is Inference',
        body: '## Artificial Intelligence is inference.\n\nIn practice, the system learns to map data to likely outputs.\n\n1. **Data** drives training.\n2. **Model** turns inputs into predictions.\n3. **Error** updates weights and biases.\n\n> In AI, prediction means estimating under uncertainty.',
      },
    },
    visual: {
      id: 'inference-diagram',
      copy: {
        'pt-br': {
          diagramTitle: 'Diagrama de inferência em IA',
          diagramDescription: 'Dados de treinamento alimentam um modelo que produz predições e recebe feedback de loss para ajustar pesos e bias.',
          trainingTitle: 'Dados de\nTreinamento',
          modelTitle: 'Modelo',
          predictionsTitle: 'Predições',
          featuresLabel: 'Atributos',
          lossLabel: 'Loss (Erro)',
          updateLabel: 'Ajuste de Pesos e Bias',
          footerLabel: 'Inferência: Estimar Saídas Sob Incerteza',
        },
        'en-us': {
          diagramTitle: 'AI inference diagram',
          diagramDescription: 'Training data feeds a model that produces predictions and receives loss feedback to adjust weights and biases.',
          trainingTitle: 'Training\nData',
          modelTitle: 'Model',
          predictionsTitle: 'Predictions',
          featuresLabel: 'Features',
          lossLabel: 'Loss (Error)',
          updateLabel: 'Weight and Bias Updates',
          footerLabel: 'Inference: Estimate Outputs Under Uncertainty',
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
