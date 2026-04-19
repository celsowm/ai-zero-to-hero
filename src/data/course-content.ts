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
        body: 'Machine Learning não começa no algoritmo. Começa no dado e só termina quando o modelo continua funcionando em produção.\n\n1. **Dados e preparação:** a qualidade do pipeline começa na origem. Limpeza, seleção e engenharia de atributos definem o teto do modelo.\n\n2. **Separação correta:** treino, validação e teste precisam estar bem isolados para medir generalização de verdade.\n\n3. **Treinamento e ajuste:** o modelo aprende padrões, compara métricas e passa por iterações até reduzir erro sem decorar o conjunto.\n\n4. **Deploy e monitoramento:** depois da entrega, o sistema precisa ser observado. Mudança de contexto, viés e drift exigem acompanhamento contínuo. Quando precisamos entender a predição em si, o próximo passo é um modelo simples: regressão linear.\n\n> Em ML, o valor não está só no algoritmo. Está no fluxo que sustenta o algoritmo.',
      },
      'en-us': {
        title: 'Machine Learning: the pipeline',
        body: 'Machine Learning does not start with the algorithm. It starts with data and only ends when the model keeps working in production.\n\n1. **Data and preparation:** pipeline quality starts at the source. Cleaning, selection, and feature engineering define the model’s ceiling.\n\n2. **Correct splitting:** training, validation, and test sets must stay isolated to measure true generalization.\n\n3. **Training and tuning:** the model learns patterns, compares metrics, and iterates until error drops without memorizing the dataset.\n\n4. **Deployment and monitoring:** after release, the system still needs observation. Context shifts, bias, and drift require continuous tracking. When we want to understand prediction itself, the next step is a simple model: linear regression.\n\n> In ML, the value is not only in the algorithm. It is in the flow that supports the algorithm.',
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
  {
    id: 'linear-regression-intro',
    type: 'two-column',
    options: {
      columnRatios: [0.62, 0.38],
    },
    content: {
      'pt-br': {
        title: 'Regressão Linear: como prever um valor',
        body: 'Agora que o pipeline está claro, vamos abrir o primeiro modelo simples que aprende com dados reais. Regressão linear é esse ponto de entrada: uma forma de prever um valor numérico a partir de variáveis conhecidas.\n\n1. **Entradas conhecidas:** no nosso exemplo, usamos **altura** e **idade** como informações disponíveis.\n\n2. **Saída prevista:** o objetivo é estimar o **peso**, ou seja, prever um número e não classificar uma categoria.\n\n3. **Fórmula linear:** o modelo combina as entradas em algo como `peso = a * altura + b * idade + c`, somando contribuições de cada variável.\n\n4. **Aprendizado pelos dados:** os coeficientes `a`, `b` e `c` são ajustados a partir de exemplos anteriores para aproximar o peso real. Aqui a função deixa de ser abstração e vira uma conta que podemos debugar em Python.\n\n> Em regressão linear, aprender é ajustar a fórmula que melhor aproxima os dados.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: how to predict a value',
        body: 'Now that the pipeline is clear, we can open the first simple model that learns from real data. Linear regression is that entry point: a way to predict a numeric value from known variables.\n\n1. **Known inputs:** in our example, we use **height** and **age** as the available information.\n\n2. **Predicted output:** the goal is to estimate **weight**, which means predicting a number rather than classifying a category.\n\n3. **Linear formula:** the model combines the inputs into something like `weight = a * height + b * age + c`, adding the contribution of each variable.\n\n4. **Learning from data:** the coefficients `a`, `b` and `c` are adjusted from previous examples to approximate the real weight. Here the function stops being abstract and becomes a calculation we can debug in Python.\n\n> In linear regression, learning means adjusting the formula that best approximates the data.\n\n---',
      },
    },
    visual: {
      id: 'linear-regression-tabs',
      copy: {
        'pt-br': {
          tabs: [
            { label: 'Formula' },
            { label: 'Fluxo visual' },
          ],
          formulaPanel: {
            eyebrow: 'Modelo inicial',
            formula: 'peso = a * altura + b * idade + c',
            description: 'Aqui a ideia ainda é simples: cada entrada contribui com um pedaço da previsão, e o modelo aprende quanto cada pedaço deve pesar.',
            points: [
              { label: 'altura e idade são as entradas conhecidas', accent: '#00e5ff' },
              { label: 'peso é o valor numérico que queremos prever', accent: '#fbbf24' },
              { label: 'a, b e c são parâmetros ajustados pelos dados', accent: '#ff2e97' },
            ],
            footer: 'Nos próximos slides, essa fórmula será detalhada em Python sem abstrair o processo.',
          },
          graphPanel: {
            eyebrow: 'Leitura prática',
            title: 'Entradas conhecidas entram no modelo e geram uma previsão',
            description: 'Pense como uma função com parâmetros ajustáveis: os dados entram, a fórmula combina esses valores e a saída estimada aparece.',
            inputNodes: [
              { label: 'Altura', accent: '#00e5ff' },
              { label: 'Idade', accent: '#a855f7' },
            ],
            outputLabel: 'Saída prevista',
            outputNode: { label: 'Peso previsto', accent: '#fbbf24' },
            footer: 'O modelo não entrega certeza; ele entrega a melhor estimativa que aprendeu a partir dos exemplos.',
          },
        },
        'en-us': {
          tabs: [
            { label: 'Formula' },
            { label: 'Visual flow' },
          ],
          formulaPanel: {
            eyebrow: 'Initial model',
            formula: 'weight = a * height + b * age + c',
            description: 'The idea is still simple here: each input contributes part of the prediction, and the model learns how much each part should matter.',
            points: [
              { label: 'height and age are the known inputs', accent: '#00e5ff' },
              { label: 'weight is the numeric value we want to predict', accent: '#fbbf24' },
              { label: 'a, b and c are parameters adjusted from data', accent: '#ff2e97' },
            ],
            footer: 'In the next slides, this formula will be unpacked in Python without hiding the process.',
          },
          graphPanel: {
            eyebrow: 'Practical reading',
            title: 'Known inputs go into the model and produce a prediction',
            description: 'Think of it as a function with adjustable parameters: data goes in, the formula combines those values, and the estimated output comes out.',
            inputNodes: [
              { label: 'Height', accent: '#00e5ff' },
              { label: 'Age', accent: '#a855f7' },
            ],
            outputLabel: 'Predicted output',
            outputNode: { label: 'Predicted weight', accent: '#fbbf24' },
            footer: 'The model does not return certainty; it returns the best estimate it learned from examples.',
          },
        },
      },
    },
  },
  {
    id: 'linear-regression-simple-line',
    type: 'two-column',
    options: {
      columnRatios: [0.62, 0.38],
    },
    content: {
      'pt-br': {
        title: 'Regressão Linear: a reta mais simples',
        body: 'Antes de misturar várias variáveis, vale entender o caso mais fácil: prever peso usando só altura. Nesse cenário, regressão linear vira uma reta: `peso = m * altura + b`.\n\n1. **X é a altura:** a variável de entrada é a altura, representada por `X`.\n\n2. **Y é o peso previsto:** a saída `Y` é o valor que queremos estimar.\n\n3. **m é a inclinação:** ele diz o quanto a previsão sobe quando a altura aumenta.\n\n4. **b é o deslocamento:** ele move a reta para cima ou para baixo sem mudar a inclinação. Depois de achar a reta, o próximo passo é medir a distância entre ela e os pontos reais.\n\n> Em uma variável, regressão linear é encontrar a melhor reta para aproximar os pontos.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: the simplest line',
        body: 'Before mixing multiple variables, it helps to understand the easiest case: predicting weight using height only. In that scenario, linear regression becomes a line: `weight = m * height + b`.\n\n1. **X is height:** the input variable is height, represented by `X`.\n\n2. **Y is predicted weight:** the output `Y` is the value we want to estimate.\n\n3. **m is the slope:** it tells us how much the prediction rises when height increases.\n\n4. **b is the intercept:** it shifts the line up or down without changing the slope. After we draw the line, the next step is to measure the distance between it and the real points.\n\n> With one variable, linear regression is about finding the best line to approximate the points.\n\n---',
      },
    },
    visual: {
      id: 'linear-regression-tabs',
      copy: {
        'pt-br': {
          tabs: [
            { label: 'Formula' },
            { label: 'Gráfico' },
          ],
          formulaPanel: {
            eyebrow: 'Caso de 1 variável',
            formula: 'peso = m * altura + b',
            description: 'Com uma única entrada, o modelo aprende a melhor inclinação da reta e o melhor ponto de partida.',
            points: [
              { label: 'altura é a entrada X', accent: '#00e5ff' },
              { label: 'peso é a saída Y', accent: '#fbbf24' },
              { label: 'm controla a inclinação da reta', accent: '#ff2e97' },
              { label: 'b ajusta o deslocamento da reta', accent: '#a855f7' },
            ],
            footer: 'Esse é o degrau mínimo para entender regressão linear sem abstração.',
          },
          graphPanel: {
            eyebrow: 'Tendência',
            title: 'Os pontos reais ficam perto de uma reta',
            description: 'O modelo não precisa acertar cada ponto exatamente. Ele busca a reta que deixa o erro total o menor possível.',
            inputNodes: [],
            outputLabel: 'Peso previsto',
            outputNode: { label: 'Reta ajustada', accent: '#fbbf24' },
            chart: {
              xLabel: 'Altura (X)',
              yLabel: 'Peso (Y)',
              lineLabel: 'reta ajustada',
              points: [
                { x: 130, y: 196, label: '160 / 55', accent: '#00e5ff' },
                { x: 245, y: 154, label: '170 / 64', accent: '#fbbf24' },
                { x: 365, y: 108, label: '180 / 72', accent: '#ff2e97' },
              ],
              lineStart: { x: 112, y: 194 },
              lineEnd: { x: 398, y: 90 },
              footer: 'A reta resume a tendência geral, não cada detalhe individual.',
            },
            footer: 'No caso de uma variável, o treino é escolher a linha que melhor aproxima os pontos observados.',
          },
        },
        'en-us': {
          tabs: [
            { label: 'Formula' },
            { label: 'Chart' },
          ],
          formulaPanel: {
            eyebrow: '1-variable case',
            formula: 'weight = m * height + b',
            description: 'With a single input, the model learns the best slope and the best starting point for the line.',
            points: [
              { label: 'height is the X input', accent: '#00e5ff' },
              { label: 'weight is the Y output', accent: '#fbbf24' },
              { label: 'm controls the slope', accent: '#ff2e97' },
              { label: 'b adjusts the intercept', accent: '#a855f7' },
            ],
            footer: 'This is the smallest step toward understanding linear regression without abstraction.',
          },
          graphPanel: {
            eyebrow: 'Trend',
            title: 'The real points sit near a line',
            description: 'The model does not need to hit every point exactly. It looks for the line that keeps total error as small as possible.',
            inputNodes: [],
            outputLabel: 'Predicted weight',
            outputNode: { label: 'Fitted line', accent: '#fbbf24' },
            chart: {
              xLabel: 'Height (X)',
              yLabel: 'Weight (Y)',
              lineLabel: 'fitted line',
              points: [
                { x: 130, y: 196, label: '160 / 55', accent: '#00e5ff' },
                { x: 245, y: 154, label: '170 / 64', accent: '#fbbf24' },
                { x: 365, y: 108, label: '180 / 72', accent: '#ff2e97' },
              ],
              lineStart: { x: 112, y: 194 },
              lineEnd: { x: 398, y: 90 },
              footer: 'The line summarizes the overall trend, not every individual detail.',
            },
            footer: 'With one variable, training is choosing the line that best approximates the observed points.',
          },
        },
      },
    },
  },
  {
    id: 'linear-regression-error',
    type: 'two-column',
    options: {
      columnRatios: [0.62, 0.38],
    },
    content: {
      'pt-br': {
        title: 'Regressão Linear: medindo o erro',
        body: 'Depois de desenhar a reta, precisamos responder a pergunta mais importante: ela ficou perto ou longe do valor real? É isso que o erro mostra.\n\n1. **Valor real:** é o ponto que veio do dado histórico.\n\n2. **Valor previsto:** é o que a reta produziu para aquela entrada.\n\n3. **Erro:** é a diferença entre os dois, normalmente escrita como `previsto - real`.\n\n4. **Sinal importa:** erro positivo significa que o modelo chutou alto; erro negativo significa que chutou baixo.\n\n> Se a reta é a hipótese, o erro é o feedback que diz onde ela ainda falha.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: measuring error',
        body: 'After drawing the line, we need to answer the most important question: is it close to the real value or far from it? That is what error tells us.\n\n1. **Real value:** it is the point that came from the historical data.\n\n2. **Predicted value:** it is what the line produced for that input.\n\n3. **Error:** it is the difference between the two, usually written as `predicted - real`.\n\n4. **Sign matters:** a positive error means the model guessed too high; a negative error means it guessed too low.\n\n> If the line is the hypothesis, error is the feedback that shows where it still fails.\n\n---',
      },
    },
    visual: {
      id: 'linear-regression-tabs',
      copy: {
        'pt-br': {
          tabs: [
            { label: 'Erro' },
            { label: 'Gráfico' },
          ],
          formulaPanel: {
            eyebrow: 'Comparação',
            formula: 'erro = previsto - real',
            description: 'O erro é a distância assinada entre o que o modelo estimou e o que aconteceu de fato.',
            points: [
              { label: 'erro positivo: previsão acima do real', accent: '#ff2e97' },
              { label: 'erro negativo: previsão abaixo do real', accent: '#00e5ff' },
              { label: 'o objetivo do treino é reduzir esse erro', accent: '#fbbf24' },
            ],
            footer: 'Nos próximos passos, esse erro vai virar uma métrica de custo mais estável.',
          },
          graphPanel: {
            eyebrow: 'Distância vertical',
            title: 'O erro é o espaço entre a reta e o ponto real',
            description: 'Para cada exemplo, medimos o quanto a reta ficou acima ou abaixo do valor observado.',
            inputNodes: [],
            outputLabel: 'Erro observado',
            outputNode: { label: 'Desvio vertical', accent: '#fbbf24' },
            chart: {
              xLabel: 'Altura (X)',
              yLabel: 'Peso (Y)',
              lineLabel: 'previsão do modelo',
              points: [
                { x: 130, y: 196, label: '160 / 55', accent: '#00e5ff' },
                { x: 245, y: 154, label: '170 / 64', accent: '#fbbf24' },
                { x: 365, y: 108, label: '180 / 72', accent: '#ff2e97' },
              ],
              residuals: [
                { x: 130, yReal: 196, yPred: 183, label: '+13', accent: '#ff2e97' },
                { x: 245, yReal: 154, yPred: 152, label: '+2', accent: '#fbbf24' },
                { x: 365, yReal: 108, yPred: 116, label: '-8', accent: '#00e5ff' },
              ],
              lineStart: { x: 112, y: 194 },
              lineEnd: { x: 398, y: 90 },
              footer: 'Cada distância vertical contribui para avaliar se a reta está boa ou ruim.',
            },
            footer: 'Medir o erro é o primeiro passo para depois ajustar a reta automaticamente.',
          },
        },
        'en-us': {
          tabs: [
            { label: 'Error' },
            { label: 'Chart' },
          ],
          formulaPanel: {
            eyebrow: 'Comparison',
            formula: 'error = predicted - real',
            description: 'Error is the signed distance between what the model estimated and what actually happened.',
            points: [
              { label: 'positive error: prediction too high', accent: '#ff2e97' },
              { label: 'negative error: prediction too low', accent: '#00e5ff' },
              { label: 'training aims to reduce this error', accent: '#fbbf24' },
            ],
            footer: 'In the next step, this error becomes a more stable cost metric.',
          },
          graphPanel: {
            eyebrow: 'Vertical distance',
            title: 'Error is the space between the line and the real point',
            description: 'For each example, we measure how far the line sits above or below the observed value.',
            inputNodes: [],
            outputLabel: 'Observed error',
            outputNode: { label: 'Vertical deviation', accent: '#fbbf24' },
            chart: {
              xLabel: 'Height (X)',
              yLabel: 'Weight (Y)',
              lineLabel: 'model prediction',
              points: [
                { x: 130, y: 196, label: '160 / 55', accent: '#00e5ff' },
                { x: 245, y: 154, label: '170 / 64', accent: '#fbbf24' },
                { x: 365, y: 108, label: '180 / 72', accent: '#ff2e97' },
              ],
              residuals: [
                { x: 130, yReal: 196, yPred: 183, label: '+13', accent: '#ff2e97' },
                { x: 245, yReal: 154, yPred: 152, label: '+2', accent: '#fbbf24' },
                { x: 365, yReal: 108, yPred: 116, label: '-8', accent: '#00e5ff' },
              ],
              lineStart: { x: 112, y: 194 },
              lineEnd: { x: 398, y: 90 },
              footer: 'Each vertical distance helps us judge whether the line is a good fit.',
            },
            footer: 'Measuring error is the first step before we can adjust the line automatically.',
          },
        },
      },
    },
  },
  {
    id: 'linear-regression-mse',
    type: 'two-column',
    options: {
      columnRatios: [0.62, 0.38],
    },
    content: {
      'pt-br': {
        title: 'Regressão Linear: MSE, o erro médio ao quadrado',
        body: 'Agora que já sabemos medir o erro de cada ponto, precisamos juntar tudo em um número só. Esse número é o MSE, abreviação de **Mean Squared Error**, ou **erro médio ao quadrado**.\n\n1. **Cada exemplo gera um erro:** para cada linha do dataset, comparamos `previsto` com `real`.\n\n2. **Elevamos ao quadrado:** assim o erro negativo não cancela o positivo e os erros grandes pesam mais.\n\n3. **Tiramos a média:** o resultado resume o comportamento do modelo em todo o conjunto.\n\n4. **Objetivo do treino:** a regressão linear procura os parâmetros que deixam esse número o menor possível.\n\n> Em regressão linear, o treino quer minimizar o MSE, não apenas um erro isolado.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: MSE, the mean squared error',
        body: 'Now that we can measure the error for each point, we need to combine everything into one number. That number is MSE, short for **Mean Squared Error**.\n\n1. **Each example produces an error:** for every row in the dataset, we compare `predicted` with `real`.\n\n2. **We square the error:** this keeps negative errors from canceling positive ones and makes large mistakes matter more.\n\n3. **We take the average:** the result summarizes how the model behaves across the whole dataset.\n\n4. **Training objective:** linear regression looks for the parameters that make this number as small as possible.\n\n> In linear regression, training minimizes MSE, not just one isolated error.\n\n---',
      },
    },
    visual: {
      id: 'linear-regression-tabs',
      copy: {
        'pt-br': {
          tabs: [
            { label: 'MSE' },
            { label: 'Resumo visual' },
          ],
          formulaPanel: {
            eyebrow: 'Erro total',
            formula: 'MSE = média((real - previsto)²)',
            description: 'MSE significa Mean Squared Error, ou erro médio ao quadrado. Ele junta todos os erros em um único número. Quadrar impede cancelamento de sinais e destaca os erros grandes.',
            points: [
              { label: 'erro ao quadrado não fica negativo', accent: '#00e5ff' },
              { label: 'erros grandes contam mais', accent: '#ff2e97' },
              { label: 'a média resume o conjunto inteiro', accent: '#fbbf24' },
            ],
            footer: 'Quando esse número cai, o modelo está ficando melhor.',
          },
          graphPanel: {
            eyebrow: 'Resumo do conjunto',
            title: 'Vários erros viram uma única medida',
            description: 'Cada distância vertical entra no cálculo e o conjunto todo é resumido em um valor único para orientar o treino.',
            inputNodes: [],
            outputLabel: 'Custo do modelo',
            outputNode: { label: 'MSE', accent: '#fbbf24' },
            chart: {
              xLabel: 'Exemplos do dataset',
              yLabel: 'Erro ao quadrado',
              lineLabel: 'cada erro contribui para o custo',
              points: [
                { x: 130, y: 186, label: '55', accent: '#00e5ff' },
                { x: 245, y: 144, label: '64', accent: '#fbbf24' },
                { x: 365, y: 98, label: '72', accent: '#ff2e97' },
              ],
              residuals: [
                { x: 130, yReal: 186, yPred: 170, label: '16²', accent: '#ff2e97' },
                { x: 245, yReal: 144, yPred: 136, label: '8²', accent: '#fbbf24' },
                { x: 365, yReal: 98, yPred: 105, label: '7²', accent: '#00e5ff' },
              ],
              lineStart: { x: 112, y: 194 },
              lineEnd: { x: 398, y: 90 },
              footer: 'O treino observa esse custo agregado, não só um ponto isolado.',
            },
            footer: 'O modelo não tenta “acertar um ponto”; ele tenta baixar o custo médio inteiro.',
          },
        },
        'en-us': {
          tabs: [
            { label: 'MSE' },
            { label: 'Visual summary' },
          ],
          formulaPanel: {
            eyebrow: 'Total error',
            formula: 'MSE = mean((real - predicted)²)',
            description: 'MSE means Mean Squared Error. It combines all errors into one number. Squaring avoids sign cancellation and gives larger mistakes more weight.',
            points: [
              { label: 'squared error is never negative', accent: '#00e5ff' },
              { label: 'large errors matter more', accent: '#ff2e97' },
              { label: 'the mean summarizes the whole dataset', accent: '#fbbf24' },
            ],
            footer: 'When this number goes down, the model is getting better.',
          },
          graphPanel: {
            eyebrow: 'Dataset summary',
            title: 'Many errors become one measure',
            description: 'Each vertical distance enters the calculation and the full dataset is condensed into a single value that guides training.',
            inputNodes: [],
            outputLabel: 'Model cost',
            outputNode: { label: 'MSE', accent: '#fbbf24' },
            chart: {
              xLabel: 'Dataset examples',
              yLabel: 'Squared error',
              lineLabel: 'each error contributes to cost',
              points: [
                { x: 130, y: 186, label: '55', accent: '#00e5ff' },
                { x: 245, y: 144, label: '64', accent: '#fbbf24' },
                { x: 365, y: 98, label: '72', accent: '#ff2e97' },
              ],
              residuals: [
                { x: 130, yReal: 186, yPred: 170, label: '16²', accent: '#ff2e97' },
                { x: 245, yReal: 144, yPred: 136, label: '8²', accent: '#fbbf24' },
                { x: 365, yReal: 98, yPred: 105, label: '7²', accent: '#00e5ff' },
              ],
              lineStart: { x: 112, y: 194 },
              lineEnd: { x: 398, y: 90 },
              footer: 'Training looks at this aggregated cost, not just one isolated point.',
            },
            footer: 'The model does not try to “hit one point”; it tries to lower the overall mean cost.',
          },
        },
      },
    },
  },
  {
    id: 'linear-regression-adjustment',
    type: 'two-column',
    options: {
      columnRatios: [0.62, 0.38],
    },
    content: {
      'pt-br': {
        title: 'Regressão Linear: ajustando os parâmetros',
        body: 'Agora que a função de custo está clara, o treino pode começar a mexer nos parâmetros para baixar esse número. A lógica é simples: testar, medir e corrigir.\n\n1. **Começo com chute:** o modelo inicia com valores iniciais para `m`, `b` ou para `a`, `b` e `c`.\n\n2. **Mede o custo:** cada chute gera uma reta diferente e um MSE diferente.\n\n3. **Ajusta um pouco:** se o custo piora, o treino recua; se melhora, ele continua na mesma direção.\n\n4. **Repete muitas vezes:** esse processo vai afinando a função até encontrar uma combinação melhor.\n\n> O treino não adivinha a resposta final; ele percorre pequenos passos até encontrar parâmetros melhores.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: adjusting parameters',
        body: 'Now that the cost function is clear, training can start changing the parameters to lower that number. The logic is simple: try, measure, and correct.\n\n1. **Start with a guess:** the model begins with initial values for `m`, `b` or for `a`, `b` and `c`.\n\n2. **Measure the cost:** each guess produces a different line and a different MSE.\n\n3. **Adjust a little:** if the cost gets worse, training steps back; if it improves, it keeps going in that direction.\n\n4. **Repeat many times:** this process keeps refining the function until a better combination is found.\n\n> Training does not guess the final answer; it takes small steps until it finds better parameters.\n\n---',
      },
    },
    visual: {
      id: 'linear-regression-tabs',
      copy: {
        'pt-br': {
          tabs: [
            { label: 'Ajuste' },
            { label: 'Curva' },
          ],
          formulaPanel: {
            eyebrow: 'Loop de treino',
            formula: 'parâmetros -> custo -> ajuste -> parâmetros melhores',
            description: 'O treino gira em um ciclo: mede o custo, faz um ajuste pequeno e repete até encontrar um ponto melhor.',
            points: [
              { label: 'chute inicial dos parâmetros', accent: '#00e5ff' },
              { label: 'cálculo do custo para saber se melhorou', accent: '#fbbf24' },
              { label: 'novo ajuste pequeno na direção certa', accent: '#ff2e97' },
            ],
            footer: 'No próximo slide, esse passo aparece como uma superfície 3D de custo.',
          },
          graphPanel: {
            eyebrow: 'Caminho de queda',
            title: 'Cada tentativa deve reduzir o custo',
            description: 'O treino compara uma tentativa com a anterior e procura uma trajetória que desça a curva do custo.',
            inputNodes: [],
            outputLabel: 'Objetivo',
            outputNode: { label: 'Menor custo', accent: '#fbbf24' },
            chart: {
              xLabel: 'Tentativas do treino',
              yLabel: 'Custo (MSE)',
              lineLabel: 'custo diminuindo',
              points: [
                { x: 120, y: 188, label: 'início', accent: '#ff2e97' },
                { x: 230, y: 156, label: 'ajuste 1', accent: '#fbbf24' },
                { x: 335, y: 124, label: 'ajuste 2', accent: '#00e5ff' },
                { x: 420, y: 92, label: 'ajuste 3', accent: '#a855f7' },
              ],
              lineStart: { x: 110, y: 192 },
              lineEnd: { x: 440, y: 84 },
              footer: 'Quando a curva desce, os parâmetros estão ficando melhores.',
            },
            footer: 'O treino fica repetindo até o custo parar de cair de forma relevante.',
          },
        },
        'en-us': {
          tabs: [
            { label: 'Adjustment' },
            { label: 'Curve' },
          ],
          formulaPanel: {
            eyebrow: 'Training loop',
            formula: 'parameters -> cost -> adjustment -> better parameters',
            description: 'Training moves in a cycle: measure the cost, make a small adjustment, and repeat until it finds a better point.',
            points: [
              { label: 'start from an initial guess', accent: '#00e5ff' },
              { label: 'compute the cost to see if it improved', accent: '#fbbf24' },
              { label: 'make a small adjustment in the right direction', accent: '#ff2e97' },
            ],
            footer: 'The next slide turns this step into a 3D cost surface.',
          },
          graphPanel: {
            eyebrow: 'Downhill path',
            title: 'Each attempt should lower the cost',
            description: 'Training compares one attempt with the previous one and looks for a path that goes down the cost curve.',
            inputNodes: [],
            outputLabel: 'Goal',
            outputNode: { label: 'Lower cost', accent: '#fbbf24' },
            chart: {
              xLabel: 'Training attempts',
              yLabel: 'Cost (MSE)',
              lineLabel: 'cost going down',
              points: [
                { x: 120, y: 188, label: 'start', accent: '#ff2e97' },
                { x: 230, y: 156, label: 'adjust 1', accent: '#fbbf24' },
                { x: 335, y: 124, label: 'adjust 2', accent: '#00e5ff' },
                { x: 420, y: 92, label: 'adjust 3', accent: '#a855f7' },
              ],
              lineStart: { x: 110, y: 192 },
              lineEnd: { x: 440, y: 84 },
              footer: 'When the curve goes down, the parameters are getting better.',
            },
            footer: 'Training keeps repeating until the cost stops dropping meaningfully.',
          },
        },
      },
    },
  },
  {
    id: 'linear-regression-gradient-descent',
    type: 'two-column',
    options: {
      columnRatios: [0.58, 0.42],
    },
    content: {
      'pt-br': {
        title: 'Regressão Linear: descendo o gradiente',
        body: 'Agora a ideia deixa de ser apenas “ajustar um pouco” e passa a ter uma regra clara: caminhar na direção em que o custo cai mais rápido.\n\n1. **Superfície de custo:** cada combinação de parâmetros vira uma altura no relevo.\n\n2. **Gradiente:** ele aponta para a subida mais íngreme; para descer, seguimos no sentido oposto.\n\n3. **Taxa de aprendizado:** controla o tamanho do passo. Passos pequenos evitam overshoot; passos grandes podem passar do ponto.\n\n4. **Menor custo:** repetindo o movimento, o modelo chega perto do vale mais baixo da superfície.\n\n> Gradient descent é uma caminhada controlada até o ponto de menor erro.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: descending the gradient',
        body: 'Now the idea is no longer just “adjust a little” but a clear rule: move in the direction where the cost falls fastest.\n\n1. **Cost surface:** each parameter combination becomes a height on the terrain.\n\n2. **Gradient:** it points to the steepest uphill direction; to go down, we move in the opposite direction.\n\n3. **Learning rate:** controls the step size. Small steps avoid overshooting; large steps can skip past the minimum.\n\n4. **Lowest cost:** repeating the motion brings the model close to the lowest valley on the surface.\n\n> Gradient descent is a controlled walk toward the minimum error.\n\n---',
      },
    },
    visual: {
      id: 'gradient-descent-3d',
      copy: {
        'pt-br': {
          diagramTitle: 'Superfície de custo em 3D',
          diagramDescription: 'O ponto inicial começa alto, o gradiente mostra a direção de maior subida e a trajetória segue o lado oposto com passos curtos até chegar perto do vale.',
          surfaceLabel: 'superfície de custo',
          gradientLabel: 'gradiente',
          learningRateLabel: 'taxa de aprendizado',
          minimumLabel: 'menor custo',
          pathLabel: 'trajetória da descida',
          startLabel: 'ponto inicial',
          footerLabel: 'Passos curtos e consistentes fazem o modelo descer a superfície sem perder o rumo.',
        },
        'en-us': {
          diagramTitle: '3D cost surface',
          diagramDescription: 'The starting point begins high, the gradient shows the steepest uphill direction, and the path follows the opposite side with small steps until it reaches the valley.',
          surfaceLabel: 'cost surface',
          gradientLabel: 'gradient',
          learningRateLabel: 'learning rate',
          minimumLabel: 'lowest cost',
          pathLabel: 'descent path',
          startLabel: 'starting point',
          footerLabel: 'Small, steady steps help the model descend the surface without losing direction.',
        },
      },
    },
  },
  {
    id: 'linear-regression-python-1d',
    type: 'two-column',
    options: {
      columnRatios: [0.9, 1.1],
    },
    content: {
      'pt-br': {
        title: 'Regressão Linear em Python: a primeira versão do treino',
        body: 'Agora sim vamos para o Python. Antes de juntar altura e idade, vale começar pelo caso mais simples: prever peso usando só altura.\n\n1. **A função da previsão:** a forma mais básica é uma reta com um coeficiente para a altura e um ajuste base.\n\n2. **A entrada e a saída:** a altura entra, o peso sai. O modelo só precisa aprender dois números.\n\n3. **O fluxo do treino:** calcular a previsão, medir o erro e ajustar os parâmetros um pouco de cada vez.\n\n4. **A leitura de programador:** prever calcula, mse mede, treinar corrige. É uma função, uma métrica e um loop.\n\n> Em Python, regressão linear começa como uma função simples que você pode debugar linha por linha.\n\n---\n\n```python\n# prever peso usando só altura\n\ndados = [\n    (160, 55),\n    (165, 59),\n    (170, 64),\n    (175, 68),\n    (180, 72),\n]\n\ndef prever(altura, m, b):\n    return m * altura + b\n\n\ndef mse(dados, m, b):\n    soma = 0\n    for altura, peso_real in dados:\n        peso_previsto = prever(altura, m, b)\n        erro = peso_previsto - peso_real\n        soma += erro ** 2\n    return soma / len(dados)\n\n\ndef treinar_regressao_linear_1d(dados, epochs=10000, lr=0.00001):\n    m = 0.0\n    b = 0.0\n    n = len(dados)\n\n    for epoch in range(epochs):\n        grad_m = 0.0\n        grad_b = 0.0\n\n        for altura, peso_real in dados:\n            peso_previsto = prever(altura, m, b)\n            erro = peso_previsto - peso_real\n            grad_m += 2 * erro * altura\n            grad_b += 2 * erro\n\n        grad_m /= n\n        grad_b /= n\n\n        m -= lr * grad_m\n        b -= lr * grad_b\n\n    return m, b\n```\n\n> Depois deste passo, o mesmo raciocínio vai ser estendido para duas variáveis: altura e idade.',
      },
      'en-us': {
        title: 'Linear Regression in Python: the first training version',
        body: 'Now we move to Python. Before combining height and age, it helps to start with the simplest case: predicting weight from height only.\n\n1. **The prediction function:** the basic form is a line with one coefficient for height and one base offset.\n\n2. **Input and output:** height goes in, weight comes out. The model only needs to learn two numbers.\n\n3. **Training flow:** compute the prediction, measure the error, and adjust the parameters little by little.\n\n4. **Programmer reading:** predict calculates, mse measures, train corrects. It is one function, one metric, and one loop.\n\n> In Python, linear regression starts as a simple function that you can debug line by line.\n\n---\n\n```python\n# predict weight using height only\n\ndata = [\n    (160, 55),\n    (165, 59),\n    (170, 64),\n    (175, 68),\n    (180, 72),\n]\n\ndef predict(height, m, b):\n    return m * height + b\n\n\ndef mse(data, m, b):\n    total = 0\n    for height, real_weight in data:\n        predicted_weight = predict(height, m, b)\n        error = predicted_weight - real_weight\n        total += error ** 2\n    return total / len(data)\n\n\ndef train_linear_regression_1d(data, epochs=10000, lr=0.00001):\n    m = 0.0\n    b = 0.0\n    n = len(data)\n\n    for epoch in range(epochs):\n        grad_m = 0.0\n        grad_b = 0.0\n\n        for height, real_weight in data:\n            predicted_weight = predict(height, m, b)\n            error = predicted_weight - real_weight\n            grad_m += 2 * error * height\n            grad_b += 2 * error\n\n        grad_m /= n\n        grad_b /= n\n\n        m -= lr * grad_m\n        b -= lr * grad_b\n\n    return m, b\n```\n\n> After this step, the same idea will be extended to two variables: height and age.',
      },
    },
  },
];
