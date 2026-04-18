import type { ISlide } from '../types/slide';
import traditionalVsAiPtBr from '../assets/traditional_vs_ai_pt-br.png';
import traditionalVsAiEnUs from '../assets/traditional_vs_ai_en-us.png';

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
    type: 'two-column',
    options: {
      columnRatios: [0.7, 0.3],
    },
    content: {
      'pt-br': {
        title: 'IA vs sistemas tradicionais',
        body: 'Antes de comparar tecnologias, vale a pergunta central: **a regra já é conhecida ou precisa ser descoberta a partir dos dados?**\n\n1. **Software tradicional:** o comportamento nasce de regras explícitas, escritas pelo programador. Se a lógica muda, o código precisa ser alterado.\n\n2. **IA/ML:** o comportamento é aprendido a partir de exemplos. O programador define a estrutura e o objetivo; os dados ajustam os parâmetros.\n\n3. **Quando cada abordagem brilha:** sistemas tradicionais são fortes em fluxos claros, decisões auditáveis e regras estáveis. IA é mais útil quando há ruído, ambiguidade, variação e padrões difíceis de programar manualmente.\n\n4. **Leitura correta:** tradicional = determinístico por construção. IA = probabilístico por aprendizado. Na prática, os melhores produtos combinam os dois: regras para o que é fixo; modelos para o que é incerto.\n\n> Em resumo: no software tradicional, você escreve a regra. Em IA, você ensina o sistema a aprendê-la.',
      },
      'en-us': {
        title: 'AI vs Traditional Systems',
        body: 'Before comparing technologies, the key question is: **is the rule already known, or does it need to be discovered from data?**\n\n1. **Traditional software:** behavior comes from explicit rules written by the programmer. If the logic changes, the code must change.\n\n2. **AI/ML:** behavior is learned from examples. The programmer defines the structure and objective; the data adjust the parameters.\n\n3. **When each approach shines:** traditional systems are strong in clear workflows, auditable decisions, and stable rules. AI is more useful when there is noise, ambiguity, variation, and patterns that are hard to encode manually.\n\n4. **Correct reading:** traditional = deterministic by construction. AI = probabilistic by learning. In practice, the best products combine both: rules for what is fixed; models for what is uncertain.\n\n> In short: traditional software writes the rule. AI teaches the system to learn it.',
      },
    },
    visual: {
      id: 'localized-image',
      copy: {
        'pt-br': {
          src: traditionalVsAiPtBr,
          alt: 'Comparação visual entre IA e sistemas tradicionais em português',
          openLabel: 'Abrir imagem ampliada',
          closeLabel: 'Fechar imagem ampliada',
        },
        'en-us': {
          src: traditionalVsAiEnUs,
          alt: 'Visual comparison between AI and traditional systems in English',
          openLabel: 'Open enlarged image',
          closeLabel: 'Close enlarged image',
        },
      },
    },
  },
  {
    id: 'ml-pipeline',
    type: 'two-column',
    options: {
      columnRatios: [0.6, 0.4],
    },
    content: {
      'pt-br': {
        title: 'Machine Learning: o pipeline',
        body: 'Machine Learning não começa no algoritmo. Começa no dado e só termina quando o modelo continua funcionando em produção.\n\n1. **Dados e preparação:** a qualidade do pipeline começa na origem. Limpeza, seleção e engenharia de atributos definem o teto do modelo.\n\n2. **Separação correta:** treino, validação e teste precisam estar bem isolados para medir generalização de verdade.\n\n3. **Treinamento e ajuste:** o modelo aprende padrões, compara métricas e passa por iterações até reduzir erro sem decorar o conjunto.\n\n4. **Deploy e monitoramento:** depois da entrega, o sistema precisa ser observado. Mudança de contexto, viés e drift exigem acompanhamento contínuo.\n\n> Em ML, o valor não está só no algoritmo. Está no fluxo que sustenta o algoritmo.',
      },
      'en-us': {
        title: 'Machine Learning: the pipeline',
        body: 'Machine Learning does not start with the algorithm. It starts with data and only ends when the model keeps working in production.\n\n1. **Data and preparation:** pipeline quality starts at the source. Cleaning, selection, and feature engineering define the model’s ceiling.\n\n2. **Correct splitting:** training, validation, and test sets must stay isolated to measure true generalization.\n\n3. **Training and tuning:** the model learns patterns, compares metrics, and iterates until error drops without memorizing the dataset.\n\n4. **Deployment and monitoring:** after release, the system still needs observation. Context shifts, bias, and drift require continuous tracking.\n\n> In ML, the value is not only in the algorithm. It is in the flow that supports the algorithm.',
      },
    },
    visual: {
      id: 'machine-learning-pipeline',
      copy: {
        'pt-br': {
          diagramTitle: 'Pipeline de Machine Learning',
          diagramDescription: 'Um pipeline bem desenhado transforma dado bruto em decisão confiável. O ciclo começa na origem do dado, passa por preparação e treino, e continua em produção com monitoramento e realimentação.',
          stages: [
            {
              title: 'Dados',
              subtitle: 'origem e qualidade',
              accent: '#8fb2d8',
            },
            {
              title: 'Preparo',
              subtitle: 'limpeza e features',
              accent: '#00b8f0',
            },
            {
              title: 'Split',
              subtitle: 'treino, validação e teste',
              accent: '#f3b72c',
            },
            {
              title: 'Treino',
              subtitle: 'ajuste de parâmetros',
              accent: '#a855f7',
            },
            {
              title: 'Avaliação',
              subtitle: 'métricas e generalização',
              accent: '#ef8b42',
            },
            {
              title: 'Deploy',
              subtitle: 'produção e drift',
              accent: '#ef5b5b',
            },
          ],
          loopLabel: 'retroalimenta',
          footerLabel: 'O melhor modelo continua útil quando o mundo muda.',
        },
        'en-us': {
          diagramTitle: 'Machine Learning pipeline',
          diagramDescription: 'A well-designed pipeline turns raw data into reliable decisions. The cycle begins at the data source, moves through preparation and training, and continues in production with monitoring and feedback.',
          stages: [
            {
              title: 'Data',
              subtitle: 'source and quality',
              accent: '#8fb2d8',
            },
            {
              title: 'Prepare',
              subtitle: 'cleaning and features',
              accent: '#00b8f0',
            },
            {
              title: 'Split',
              subtitle: 'training, validation, test',
              accent: '#f3b72c',
            },
            {
              title: 'Train',
              subtitle: 'parameter fitting',
              accent: '#a855f7',
            },
            {
              title: 'Evaluate',
              subtitle: 'metrics and generalization',
              accent: '#ef8b42',
            },
            {
              title: 'Deploy',
              subtitle: 'production and drift',
              accent: '#ef5b5b',
            },
          ],
          loopLabel: 'feeds back',
          footerLabel: 'The best model stays useful as the world changes.',
        },
      },
    },
  },
];
