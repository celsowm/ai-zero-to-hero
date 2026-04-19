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
        title: 'Regressão Linear: combinando altura e idade',
        body: 'Seguimos no mesmo exemplo: prever **peso** a partir de **altura** e **idade**. Em vez de pensar em uma reta isolada, agora vale ler a regressão linear como uma combinação de duas entradas que formam uma superfície de previsão.\n\n1. **Altura e idade entram juntas:** cada pessoa chega ao modelo com dois valores conhecidos.\n\n2. **Peso é a saída prevista:** o modelo devolve um número estimado para aquele par de entradas.\n\n3. **`a` e `b` pesam cada variável:** um coeficiente ajusta a contribuição da altura e o outro ajusta a contribuição da idade.\n\n4. **`c` desloca a previsão base:** ele move toda a superfície para cima ou para baixo. Depois de montar essa combinação, o próximo passo é medir o quanto ela ficou perto do peso real.\n\n> Em duas variáveis, regressão linear combina entradas conhecidas para aproximar um valor numérico.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: combining height and age',
        body: 'We stay with the same example: predicting **weight** from **height** and **age**. Instead of thinking about a single line, it helps to read linear regression as a combination of two inputs that forms a prediction surface.\n\n1. **Height and age enter together:** each person reaches the model with two known values.\n\n2. **Weight is the predicted output:** the model returns an estimated number for that pair of inputs.\n\n3. **`a` and `b` weight each variable:** one coefficient adjusts the contribution of height and the other adjusts the contribution of age.\n\n4. **`c` shifts the baseline prediction:** it moves the whole surface up or down. After building that combination, the next step is to measure how close it gets to the real weight.\n\n> With two variables, linear regression combines known inputs to approximate a numeric value.\n\n---',
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
            eyebrow: 'Leitura com 2 variáveis',
            formula: 'peso = a * altura + b * idade + c',
            description: 'Com duas entradas, o modelo aprende quanto altura e idade devem pesar na previsão, além de um ajuste base.',
            points: [
              { label: 'altura e idade são as entradas conhecidas', accent: '#00e5ff' },
              { label: 'peso é a saída numérica prevista', accent: '#fbbf24' },
              { label: 'a e b controlam o peso de cada variável', accent: '#ff2e97' },
              { label: 'c ajusta o nível base da previsão', accent: '#a855f7' },
            ],
            footer: 'Aqui o modelo continua o mesmo do slide anterior, agora lido como combinação linear explícita.',
          },
          graphPanel: {
            eyebrow: 'Projeção visual',
            title: 'A superfície de previsão pode ser lida como um corte no gráfico',
            description: 'Mesmo com altura e idade entrando juntas, ainda podemos olhar um corte da previsão para enxergar a tendência e comparar com os pontos observados.',
            inputNodes: [],
            outputLabel: 'Peso previsto',
            outputNode: { label: 'Corte da previsão', accent: '#fbbf24' },
            chart: {
              xLabel: 'Altura (X)',
              yLabel: 'Peso (Y)',
              lineLabel: 'corte da superfície',
              points: [
                { x: 130, y: 196, label: '160 / 55', accent: '#00e5ff' },
                { x: 245, y: 154, label: '170 / 64', accent: '#fbbf24' },
                { x: 365, y: 108, label: '180 / 72', accent: '#ff2e97' },
              ],
              lineStart: { x: 112, y: 194 },
              lineEnd: { x: 398, y: 90 },
              footer: 'Esse corte resume a tendência geral sem mostrar toda a superfície ao mesmo tempo.',
            },
            footer: 'O treino continua tentando achar a combinação de parâmetros que melhor aproxima os pesos observados.',
          },
        },
        'en-us': {
          tabs: [
            { label: 'Formula' },
            { label: 'Chart' },
          ],
          formulaPanel: {
            eyebrow: '2-variable view',
            formula: 'weight = a * height + b * age + c',
            description: 'With two inputs, the model learns how much height and age should matter in the prediction, plus a baseline adjustment.',
            points: [
              { label: 'height and age are the known inputs', accent: '#00e5ff' },
              { label: 'weight is the predicted numeric output', accent: '#fbbf24' },
              { label: 'a and b control each variable weight', accent: '#ff2e97' },
              { label: 'c adjusts the baseline level', accent: '#a855f7' },
            ],
            footer: 'This is the same model from the previous slide, now read as an explicit linear combination.',
          },
          graphPanel: {
            eyebrow: 'Visual projection',
            title: 'The prediction surface can be read as a slice on the chart',
            description: 'Even with height and age entering together, we can still inspect one slice of the prediction to see the trend and compare it with the observed points.',
            inputNodes: [],
            outputLabel: 'Predicted weight',
            outputNode: { label: 'Prediction slice', accent: '#fbbf24' },
            chart: {
              xLabel: 'Height (X)',
              yLabel: 'Weight (Y)',
              lineLabel: 'surface slice',
              points: [
                { x: 130, y: 196, label: '160 / 55', accent: '#00e5ff' },
                { x: 245, y: 154, label: '170 / 64', accent: '#fbbf24' },
                { x: 365, y: 108, label: '180 / 72', accent: '#ff2e97' },
              ],
              lineStart: { x: 112, y: 194 },
              lineEnd: { x: 398, y: 90 },
              footer: 'That slice summarizes the overall trend without showing the whole surface at once.',
            },
            footer: 'Training is still trying to find the parameter combination that best approximates the observed weights.',
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
        body: 'Com **altura** e **idade** conhecidas, o modelo produz um **peso previsto**. A pergunta agora é direta: esse valor ficou perto ou longe do **peso real**? É isso que o erro mede.\n\n1. **Valor real:** é o peso histórico daquela pessoa no dataset.\n\n2. **Valor previsto:** é o peso que a fórmula `peso = a * altura + b * idade + c` calculou para aquela mesma entrada.\n\n3. **Erro:** é a diferença entre os dois, normalmente escrita como `previsto - real`.\n\n4. **Sinal importa:** erro positivo significa que o modelo estimou um peso acima do real; erro negativo significa que estimou abaixo.\n\n> Se a fórmula é a hipótese, o erro é o feedback que mostra onde a previsão ainda falha.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: measuring error',
        body: 'With **height** and **age** known, the model produces a **predicted weight**. The next question is direct: is that value close to the **real weight** or far from it? That is what error measures.\n\n1. **Real value:** it is that person’s historical weight in the dataset.\n\n2. **Predicted value:** it is the weight that the formula `weight = a * height + b * age + c` computed for the same input.\n\n3. **Error:** it is the difference between the two, usually written as `predicted - real`.\n\n4. **Sign matters:** a positive error means the model estimated a weight above the real one; a negative error means it estimated below.\n\n> If the formula is the hypothesis, error is the feedback that shows where the prediction still fails.\n\n---',
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
            description: 'No nosso exemplo, o erro compara o peso previsto pela combinação de altura e idade com o peso real registrado.',
            points: [
              { label: 'erro positivo: previsão acima do real', accent: '#ff2e97' },
              { label: 'erro negativo: previsão abaixo do real', accent: '#00e5ff' },
              { label: 'o objetivo do treino é reduzir esse erro para cada pessoa', accent: '#fbbf24' },
            ],
            footer: 'Nos próximos passos, esse erro vai virar uma métrica de custo mais estável.',
          },
          graphPanel: {
            eyebrow: 'Distância vertical',
            title: 'O erro é a diferença entre o peso previsto e o peso real',
            description: 'Para cada pessoa do dataset, medimos o quanto a previsão baseada em altura e idade ficou acima ou abaixo do peso observado.',
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
              footer: 'Cada distância contribui para avaliar se a combinação atual de parâmetros está boa ou ruim.',
            },
            footer: 'Medir o erro é o primeiro passo para depois ajustar `a`, `b` e `c` automaticamente.',
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
            description: 'In our example, error compares the predicted weight from height and age with the recorded real weight.',
            points: [
              { label: 'positive error: prediction too high', accent: '#ff2e97' },
              { label: 'negative error: prediction too low', accent: '#00e5ff' },
              { label: 'training aims to reduce this error for each person', accent: '#fbbf24' },
            ],
            footer: 'In the next step, this error becomes a more stable cost metric.',
          },
          graphPanel: {
            eyebrow: 'Vertical distance',
            title: 'Error is the difference between predicted and real weight',
            description: 'For each person in the dataset, we measure how far the prediction based on height and age sits above or below the observed weight.',
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
              footer: 'Each distance helps us judge whether the current parameter combination is a good fit.',
            },
            footer: 'Measuring error is the first step before we can adjust `a`, `b`, and `c` automatically.',
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
        body: 'Agora que já sabemos medir o erro para cada pessoa com **altura**, **idade** e **peso real**, precisamos juntar tudo em um número só. Esse número é o MSE, abreviação de **Mean Squared Error**, ou **erro médio ao quadrado**.\n\n1. **Cada exemplo gera um erro:** para cada linha do dataset `(altura, idade, peso)`, comparamos `previsto` com `real`.\n\n2. **Elevamos ao quadrado:** assim o erro negativo não cancela o positivo e os erros grandes pesam mais.\n\n3. **Tiramos a média:** o resultado resume o comportamento do modelo em todo o conjunto.\n\n4. **Objetivo do treino:** a regressão linear procura os parâmetros `a`, `b` e `c` que deixam esse número o menor possível.\n\n> Em regressão linear, o treino quer minimizar o MSE do conjunto inteiro, não apenas um erro isolado.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: MSE, the mean squared error',
        body: 'Now that we can measure the error for each person with **height**, **age**, and **real weight**, we need to combine everything into one number. That number is MSE, short for **Mean Squared Error**.\n\n1. **Each example produces an error:** for every row in the dataset `(height, age, weight)`, we compare `predicted` with `real`.\n\n2. **We square the error:** this keeps negative errors from canceling positive ones and makes large mistakes matter more.\n\n3. **We take the average:** the result summarizes how the model behaves across the whole dataset.\n\n4. **Training objective:** linear regression looks for the parameters `a`, `b`, and `c` that make this number as small as possible.\n\n> In linear regression, training minimizes the MSE of the whole dataset, not just one isolated error.\n\n---',
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
            description: 'MSE significa Mean Squared Error, ou erro médio ao quadrado. No nosso exemplo, ele junta em um único número todos os erros de previsão de peso calculados a partir de altura e idade.',
            points: [
              { label: 'erro ao quadrado não fica negativo', accent: '#00e5ff' },
              { label: 'erros grandes contam mais', accent: '#ff2e97' },
              { label: 'a média resume todo o dataset `(altura, idade, peso)`', accent: '#fbbf24' },
            ],
            footer: 'Quando esse número cai, o modelo está ficando melhor.',
          },
          graphPanel: {
            eyebrow: 'Resumo do conjunto',
            title: 'Vários erros viram uma única medida',
            description: 'Cada erro de previsão de peso entra no cálculo e o conjunto todo é resumido em um valor único para orientar o treino.',
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
              footer: 'O treino observa esse custo agregado para ajustar `a`, `b` e `c`, não só um ponto isolado.',
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
            description: 'MSE means Mean Squared Error. In our example, it combines every weight prediction error generated from height and age into one number.',
            points: [
              { label: 'squared error is never negative', accent: '#00e5ff' },
              { label: 'large errors matter more', accent: '#ff2e97' },
              { label: 'the mean summarizes the whole `(height, age, weight)` dataset', accent: '#fbbf24' },
            ],
            footer: 'When this number goes down, the model is getting better.',
          },
          graphPanel: {
            eyebrow: 'Dataset summary',
            title: 'Many errors become one measure',
            description: 'Each weight prediction error enters the calculation and the full dataset is condensed into a single value that guides training.',
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
              footer: 'Training looks at this aggregated cost to adjust `a`, `b`, and `c`, not just one isolated point.',
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
        body: 'Agora que a função de custo está clara, o treino pode começar a mexer nos parâmetros para baixar esse número. No nosso exemplo, isso significa ajustar `a`, `b` e `c` para prever melhor o **peso** a partir de **altura** e **idade**.\n\n1. **Começo com chute:** o modelo inicia com valores iniciais para `a`, `b` e `c`.\n\n2. **Mede o custo:** cada chute gera um conjunto diferente de previsões e um MSE diferente.\n\n3. **Ajusta um pouco:** se o custo piora, o treino recua; se melhora, ele continua na mesma direção.\n\n4. **Repete muitas vezes:** esse processo vai afinando a fórmula até encontrar uma combinação melhor.\n\n> O treino não adivinha a resposta final; ele percorre pequenos passos até encontrar parâmetros melhores.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: adjusting parameters',
        body: 'Now that the cost function is clear, training can start changing the parameters to lower that number. In our example, that means adjusting `a`, `b`, and `c` to predict **weight** better from **height** and **age**.\n\n1. **Start with a guess:** the model begins with initial values for `a`, `b`, and `c`.\n\n2. **Measure the cost:** each guess produces a different set of predictions and a different MSE.\n\n3. **Adjust a little:** if the cost gets worse, training steps back; if it improves, it keeps going in that direction.\n\n4. **Repeat many times:** this process keeps refining the formula until a better combination is found.\n\n> Training does not guess the final answer; it takes small steps until it finds better parameters.\n\n---',
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
            formula: 'a, b, c -> custo -> ajuste -> a, b, c melhores',
            description: 'O treino gira em um ciclo: mede o custo das previsões de peso, faz um ajuste pequeno em `a`, `b` e `c`, e repete até encontrar um ponto melhor.',
            points: [
              { label: 'chute inicial para `a`, `b` e `c`', accent: '#00e5ff' },
              { label: 'cálculo do custo para saber se melhorou', accent: '#fbbf24' },
              { label: 'novo ajuste pequeno na direção certa', accent: '#ff2e97' },
            ],
            footer: 'No próximo slide, esse passo aparece como uma superfície 3D de custo.',
          },
          graphPanel: {
            eyebrow: 'Novos parâmetros',
            title: 'Cada nova combinação de `a`, `b` e `c` gera um novo MSE',
            description: 'O treino testa uma combinação de parâmetros, calcula o erro das previsões de peso feitas com altura e idade, e decide o próximo ajuste com base nesse resultado.',
            inputNodes: [],
            outputLabel: 'Objetivo',
            outputNode: { label: 'Menor custo', accent: '#fbbf24' },
            chart: {
              xLabel: 'Tentativas com novos parâmetros',
              yLabel: 'Custo (MSE)',
              lineLabel: 'MSE de cada tentativa',
              points: [
                { x: 120, y: 188, label: 'a0,b0,c0', accent: '#ff2e97' },
                { x: 230, y: 156, label: 'a1,b1,c1', accent: '#fbbf24' },
                { x: 335, y: 124, label: 'a2,b2,c2', accent: '#00e5ff' },
                { x: 420, y: 92, label: 'a3,b3,c3', accent: '#a855f7' },
              ],
              lineStart: { x: 110, y: 192 },
              lineEnd: { x: 440, y: 84 },
              footer: 'Se o MSE cai, a nova combinação de `a`, `b` e `c` está prevendo melhor o peso.',
            },
            footer: 'Treinar é repetir esse ciclo: testar parâmetros, medir o MSE e guardar a direção que melhora a previsão.',
          },
        },
        'en-us': {
          tabs: [
            { label: 'Adjustment' },
            { label: 'Curve' },
          ],
          formulaPanel: {
            eyebrow: 'Training loop',
            formula: 'a, b, c -> cost -> adjustment -> better a, b, c',
            description: 'Training moves in a cycle: measure the cost of the weight predictions, make a small adjustment to `a`, `b`, and `c`, and repeat until it finds a better point.',
            points: [
              { label: 'start from an initial guess for `a`, `b`, and `c`', accent: '#00e5ff' },
              { label: 'compute the cost to see if it improved', accent: '#fbbf24' },
              { label: 'make a small adjustment in the right direction', accent: '#ff2e97' },
            ],
            footer: 'The next slide turns this step into a 3D cost surface.',
          },
          graphPanel: {
            eyebrow: 'New parameters',
            title: 'Each new `a`, `b`, and `c` combination produces a new MSE',
            description: 'Training tests one parameter combination, computes the error of the weight predictions made from height and age, and decides the next adjustment from that result.',
            inputNodes: [],
            outputLabel: 'Goal',
            outputNode: { label: 'Lower cost', accent: '#fbbf24' },
            chart: {
              xLabel: 'Attempts with new parameters',
              yLabel: 'Cost (MSE)',
              lineLabel: 'MSE of each attempt',
              points: [
                { x: 120, y: 188, label: 'a0,b0,c0', accent: '#ff2e97' },
                { x: 230, y: 156, label: 'a1,b1,c1', accent: '#fbbf24' },
                { x: 335, y: 124, label: 'a2,b2,c2', accent: '#00e5ff' },
                { x: 420, y: 92, label: 'a3,b3,c3', accent: '#a855f7' },
              ],
              lineStart: { x: 110, y: 192 },
              lineEnd: { x: 440, y: 84 },
              footer: 'If the MSE drops, the new `a`, `b`, and `c` combination is predicting weight better.',
            },
            footer: 'Training repeats this cycle: test parameters, measure MSE, and keep the direction that improves prediction.',
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
        body: 'Agora a ideia deixa de ser apenas “ajustar um pouco” e passa a ter uma regra clara: caminhar na direção em que o custo cai mais rápido. No nosso exemplo, essa caminhada acontece sobre a superfície de custo formada pelas combinações possíveis de `a`, `b` e `c`.\n\n1. **Superfície de custo:** cada combinação de `a`, `b` e `c` vira uma altura no relevo.\n\n2. **Gradiente:** ele aponta para a subida mais íngreme; para descer, seguimos no sentido oposto.\n\n3. **Taxa de aprendizado:** controla o tamanho do passo. Passos pequenos evitam overshoot; passos grandes podem passar do ponto.\n\n4. **Menor custo:** repetindo o movimento, o modelo chega perto do vale em que a previsão de peso a partir de altura e idade erra menos.\n\n> Gradient descent é uma caminhada controlada até o ponto de menor erro.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: descending the gradient',
        body: 'Now the idea is no longer just “adjust a little” but a clear rule: move in the direction where the cost falls fastest. In our example, that walk happens over the cost surface formed by the possible combinations of `a`, `b`, and `c`.\n\n1. **Cost surface:** each combination of `a`, `b`, and `c` becomes a height on the terrain.\n\n2. **Gradient:** it points to the steepest uphill direction; to go down, we move in the opposite direction.\n\n3. **Learning rate:** controls the step size. Small steps avoid overshooting; large steps can skip past the minimum.\n\n4. **Lowest cost:** repeating the motion brings the model close to the valley where predicting weight from height and age makes the smallest error.\n\n> Gradient descent is a controlled walk toward the minimum error.\n\n---',
      },
    },
    visual: {
      id: 'gradient-descent-3d',
      copy: {
        'pt-br': {
          diagramTitle: 'Superfície de custo em 3D',
          diagramDescription: 'O ponto inicial começa alto, o gradiente mostra a direção de maior subida e a trajetória segue o lado oposto com passos curtos até chegar perto do vale das melhores combinações de `a`, `b` e `c`.',
          surfaceLabel: 'superfície de custo',
          gradientLabel: 'gradiente',
          learningRateLabel: 'taxa de aprendizado',
          minimumLabel: 'menor custo',
          pathLabel: 'trajetória da descida',
          startLabel: 'ponto inicial',
          footerLabel: 'Passos curtos e consistentes ajudam o modelo a ajustar `a`, `b` e `c` sem perder o rumo.',
        },
        'en-us': {
          diagramTitle: '3D cost surface',
          diagramDescription: 'The starting point begins high, the gradient shows the steepest uphill direction, and the path follows the opposite side with small steps until it reaches the valley of the best `a`, `b`, and `c` combinations.',
          surfaceLabel: 'cost surface',
          gradientLabel: 'gradient',
          learningRateLabel: 'learning rate',
          minimumLabel: 'lowest cost',
          pathLabel: 'descent path',
          startLabel: 'starting point',
          footerLabel: 'Small, steady steps help the model adjust `a`, `b`, and `c` without losing direction.',
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
        body: 'Agora sim vamos para o Python, mantendo o mesmo exemplo: prever **peso** a partir de **altura** e **idade**.\n\n1. **A função da previsão:** a forma básica agora combina duas entradas com dois coeficientes e um ajuste base.\n\n2. **As entradas e a saída:** altura e idade entram; peso sai. O modelo precisa aprender três números: `a`, `b` e `c`.\n\n3. **O fluxo do treino:** calcular a previsão, medir o erro e ajustar os parâmetros um pouco de cada vez.\n\n4. **A leitura de programador:** prever calcula, mse mede, treinar corrige. É uma função, uma métrica e um loop.\n\n> Em Python, regressão linear continua simples: uma fórmula, um custo e uma rotina de ajuste.\n\n---\n\n```python\n# prever peso usando altura e idade\n\ndados = [\n    (160, 20, 55),\n    (165, 24, 59),\n    (170, 28, 64),\n    (175, 32, 68),\n    (180, 36, 72),\n]\n\ndef prever(altura, idade, a, b, c):\n    return a * altura + b * idade + c\n\n\ndef mse(dados, a, b, c):\n    soma = 0\n    for altura, idade, peso_real in dados:\n        peso_previsto = prever(altura, idade, a, b, c)\n        erro = peso_previsto - peso_real\n        soma += erro ** 2\n    return soma / len(dados)\n\n\ndef treinar_regressao_linear(dados, epochs=10000, lr=0.00001):\n    a = 0.0\n    b = 0.0\n    c = 0.0\n    n = len(dados)\n\n    for epoch in range(epochs):\n        grad_a = 0.0\n        grad_b = 0.0\n        grad_c = 0.0\n\n        for altura, idade, peso_real in dados:\n            peso_previsto = prever(altura, idade, a, b, c)\n            erro = peso_previsto - peso_real\n            grad_a += 2 * erro * altura\n            grad_b += 2 * erro * idade\n            grad_c += 2 * erro\n\n        grad_a /= n\n        grad_b /= n\n        grad_c /= n\n\n        a -= lr * grad_a\n        b -= lr * grad_b\n        c -= lr * grad_c\n\n    return a, b, c\n```\n\n> O mesmo raciocínio dos slides anteriores aparece inteiro no código: entradas conhecidas, previsão, erro, custo e ajuste dos parâmetros.',
      },
      'en-us': {
        title: 'Linear Regression in Python: the first training version',
        body: 'Now we move to Python while keeping the same example: predicting **weight** from **height** and **age**.\n\n1. **The prediction function:** the basic form now combines two inputs with two coefficients and one baseline adjustment.\n\n2. **Inputs and output:** height and age go in; weight comes out. The model needs to learn three numbers: `a`, `b`, and `c`.\n\n3. **Training flow:** compute the prediction, measure the error, and adjust the parameters little by little.\n\n4. **Programmer reading:** predict calculates, mse measures, train corrects. It is one function, one metric, and one loop.\n\n> In Python, linear regression still stays simple: one formula, one cost, and one adjustment routine.\n\n---\n\n```python\n# predict weight using height and age\n\ndata = [\n    (160, 20, 55),\n    (165, 24, 59),\n    (170, 28, 64),\n    (175, 32, 68),\n    (180, 36, 72),\n]\n\ndef predict(height, age, a, b, c):\n    return a * height + b * age + c\n\n\ndef mse(data, a, b, c):\n    total = 0\n    for height, age, real_weight in data:\n        predicted_weight = predict(height, age, a, b, c)\n        error = predicted_weight - real_weight\n        total += error ** 2\n    return total / len(data)\n\n\ndef train_linear_regression(data, epochs=10000, lr=0.00001):\n    a = 0.0\n    b = 0.0\n    c = 0.0\n    n = len(data)\n\n    for epoch in range(epochs):\n        grad_a = 0.0\n        grad_b = 0.0\n        grad_c = 0.0\n\n        for height, age, real_weight in data:\n            predicted_weight = predict(height, age, a, b, c)\n            error = predicted_weight - real_weight\n            grad_a += 2 * error * height\n            grad_b += 2 * error * age\n            grad_c += 2 * error\n\n        grad_a /= n\n        grad_b /= n\n        grad_c /= n\n\n        a -= lr * grad_a\n        b -= lr * grad_b\n        c -= lr * grad_c\n\n    return a, b, c\n```\n\n> The same reasoning from the previous slides now appears end to end in code: known inputs, prediction, error, cost, and parameter adjustment.',
      },
    },
  },
];
