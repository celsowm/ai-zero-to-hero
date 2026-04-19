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
        body: 'Agora que o pipeline está claro, vamos abrir o primeiro modelo simples que aprende com dados reais. Regressão linear é esse ponto de entrada: uma forma de prever um valor numérico a partir de variáveis conhecidas.\n\n1. **Entradas conhecidas:** no nosso exemplo, usamos **altura** e **idade** como informações disponíveis.\n\n2. **Saída prevista:** o objetivo é estimar o **peso**, ou seja, prever um número e não classificar uma categoria.\n\n3. **Fórmula linear:** o modelo combina as entradas em algo como `ŷ = β₀ + β₁ * altura + β₂ * idade`, somando contribuições de cada variável.\n\n4. **Aprendizado pelos dados:** em geral, os coeficientes `β₀`, `β₁` e `β₂` são ajustados a partir de exemplos anteriores para aproximar o peso real. Antes de mostrar esse treino em Python, vamos fixar alguns valores manualmente só para abrir a conta e enxergar a mecânica.\n\n> Em regressão linear, aprender é ajustar a fórmula que melhor aproxima os dados.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: how to predict a value',
        body: 'Now that the pipeline is clear, we can open the first simple model that learns from real data. Linear regression is that entry point: a way to predict a numeric value from known variables.\n\n1. **Known inputs:** in our example, we use **height** and **age** as the available information.\n\n2. **Predicted output:** the goal is to estimate **weight**, which means predicting a number rather than classifying a category.\n\n3. **Linear formula:** the model combines the inputs into something like `ŷ = β₀ + β₁ * height + β₂ * age`, adding the contribution of each variable.\n\n4. **Learning from data:** in general, the coefficients `β₀`, `β₁`, and `β₂` are adjusted from previous examples to approximate the real weight. Before showing that training in Python, we will temporarily fix some values by hand just to open the arithmetic and inspect the mechanics.\n\n> In linear regression, learning means adjusting the formula that best approximates the data.\n\n---',
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
            formula: 'ŷ = β₀ + β₁ * altura + β₂ * idade',
            description: 'Aqui a ideia ainda é simples: cada entrada contribui com um pedaço da previsão, e o modelo aprende quanto cada pedaço deve pesar.',
            points: [
              { label: 'altura e idade são as entradas conhecidas', accent: '#00e5ff' },
              { label: 'peso é o valor numérico que queremos prever', accent: '#fbbf24' },
              { label: 'β₀, β₁ e β₂ são parâmetros ajustados pelos dados', accent: '#ff2e97' },
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
            formula: 'ŷ = β₀ + β₁ * height + β₂ * age',
            description: 'The idea is still simple here: each input contributes part of the prediction, and the model learns how much each part should matter.',
            points: [
              { label: 'height and age are the known inputs', accent: '#00e5ff' },
              { label: 'weight is the numeric value we want to predict', accent: '#fbbf24' },
              { label: 'β₀, β₁, and β₂ are parameters adjusted from data', accent: '#ff2e97' },
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
        body: 'Seguimos no mesmo exemplo: prever **peso** a partir de **altura** e **idade**. Em vez de pensar em uma reta isolada, agora vale ler a regressão linear como uma combinação de duas entradas que formam uma superfície de previsão.\n\n1. **Altura e idade entram juntas:** cada pessoa chega ao modelo com dois valores conhecidos.\n\n2. **Peso é a saída prevista:** o modelo devolve um número estimado para aquele par de entradas.\n\n3. **`β₁` e `β₂` são os coeficientes angulares / inclinações:** eles dizem o quanto a previsão sobe ou desce quando altura ou idade mudam.\n\n4. **`β₀` é o coeficiente linear / intercepto:** ele desloca a previsão base para cima ou para baixo sem mudar a inclinação geral. Depois de montar essa combinação, o próximo passo é medir o quanto ela ficou perto do peso real.\n\n> Em duas variáveis, regressão linear combina entradas conhecidas para aproximar um valor numérico.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: combining height and age',
        body: 'We stay with the same example: predicting **weight** from **height** and **age**. Instead of thinking about a single line, it helps to read linear regression as a combination of two inputs that forms a prediction surface.\n\n1. **Height and age enter together:** each person reaches the model with two known values.\n\n2. **Weight is the predicted output:** the model returns an estimated number for that pair of inputs.\n\n3. **`β₁` and `β₂` are the angular coefficients / slopes:** they tell us how much the prediction rises or falls when height or age changes.\n\n4. **`β₀` is the linear coefficient / intercept:** it shifts the baseline prediction up or down without changing the overall slope. After building that combination, the next step is to measure how close it gets to the real weight.\n\n> With two variables, linear regression combines known inputs to approximate a numeric value.\n\n---',
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
            formula: 'ŷ = β₀ + β₁ * altura + β₂ * idade',
            description: 'Com duas entradas, o modelo aprende quanto altura e idade devem pesar na previsão, além de um ajuste base.',
            points: [
              { label: 'altura e idade são as entradas conhecidas', accent: '#00e5ff' },
              { label: 'peso é a saída numérica prevista', accent: '#fbbf24' },
              { label: 'β₁ e β₂ controlam o peso de cada variável', accent: '#ff2e97' },
              { label: 'β₀ ajusta o nível base da previsão', accent: '#a855f7' },
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
            formula: 'ŷ = β₀ + β₁ * height + β₂ * age',
            description: 'With two inputs, the model learns how much height and age should matter in the prediction, plus a baseline adjustment.',
            points: [
              { label: 'height and age are the known inputs', accent: '#00e5ff' },
              { label: 'weight is the predicted numeric output', accent: '#fbbf24' },
              { label: 'β₁ and β₂ control each variable weight', accent: '#ff2e97' },
              { label: 'β₀ adjusts the baseline level', accent: '#a855f7' },
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
        body: 'Com **altura** e **idade** conhecidas, o modelo produz um **peso previsto**. A pergunta agora é direta: esse valor ficou perto ou longe do **peso real**? É isso que o erro mede.\n\n1. **Valor real `y`:** é o peso histórico daquela pessoa no dataset.\n\n2. **Valor previsto `ŷ`:** é o peso que a fórmula `ŷ = β₀ + β₁ * altura + β₂ * idade` calculou para aquela mesma entrada.\n\n3. **Erro:** é a diferença entre os dois, normalmente escrita como `ŷ - y`.\n\n4. **Sinal importa:** erro positivo significa que o modelo estimou um peso acima do real; erro negativo significa que estimou abaixo.\n\n> Se a fórmula é a hipótese, o erro é o feedback que mostra onde a previsão ainda falha.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: measuring error',
        body: 'With **height** and **age** known, the model produces a **predicted weight**. The next question is direct: is that value close to the **real weight** or far from it? That is what error measures.\n\n1. **Real value `y`:** it is that person’s historical weight in the dataset.\n\n2. **Predicted value `ŷ`:** it is the weight that the formula `ŷ = β₀ + β₁ * height + β₂ * age` computed for the same input.\n\n3. **Error:** it is the difference between the two, usually written as `ŷ - y`.\n\n4. **Sign matters:** a positive error means the model estimated a weight above the real one; a negative error means it estimated below.\n\n> If the formula is the hypothesis, error is the feedback that shows where the prediction still fails.\n\n---',
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
            formula: 'erro = ŷ - y',
            description: 'No nosso exemplo, o erro compara o peso previsto `ŷ` pela combinação de altura e idade com o peso real `y` registrado.',
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
            footer: 'Medir o erro é o primeiro passo para depois ajustar `β₀`, `β₁` e `β₂` automaticamente.',
          },
        },
        'en-us': {
          tabs: [
            { label: 'Error' },
            { label: 'Chart' },
          ],
          formulaPanel: {
            eyebrow: 'Comparison',
            formula: 'error = ŷ - y',
            description: 'In our example, error compares the predicted weight `ŷ` from height and age with the recorded real weight `y`.',
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
            footer: 'Measuring error is the first step before we can adjust `β₀`, `β₁`, and `β₂` automatically.',
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
        body: 'Agora que já sabemos medir o erro para cada pessoa com **altura**, **idade** e **peso real**, precisamos juntar tudo em um número só. Esse número é o MSE, abreviação de **Mean Squared Error**, ou **erro médio ao quadrado**.\n\n1. **Cada exemplo gera um erro:** para cada linha do dataset `(altura, idade, peso)`, comparamos `ŷ` com `y`.\n\n2. **Elevamos ao quadrado:** assim o erro negativo não cancela o positivo e os erros grandes pesam mais.\n\n3. **Tiramos a média:** o resultado resume o comportamento do modelo em todo o conjunto.\n\n4. **Objetivo do treino:** a regressão linear procura os parâmetros `β₀`, `β₁` e `β₂` que deixam esse número o menor possível.\n\n> Em regressão linear, o treino quer minimizar o MSE do conjunto inteiro, não apenas um erro isolado.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: MSE, the mean squared error',
        body: 'Now that we can measure the error for each person with **height**, **age**, and **real weight**, we need to combine everything into one number. That number is MSE, short for **Mean Squared Error**.\n\n1. **Each example produces an error:** for every row in the dataset `(height, age, weight)`, we compare `ŷ` with `y`.\n\n2. **We square the error:** this keeps negative errors from canceling positive ones and makes large mistakes matter more.\n\n3. **We take the average:** the result summarizes how the model behaves across the whole dataset.\n\n4. **Training objective:** linear regression looks for the parameters `β₀`, `β₁`, and `β₂` that make this number as small as possible.\n\n> In linear regression, training minimizes the MSE of the whole dataset, not just one isolated error.\n\n---',
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
            formula: 'MSE = média((y - ŷ)²)',
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
              footer: 'O treino observa esse custo agregado para ajustar `β₀`, `β₁` e `β₂`, não só um ponto isolado.',
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
            formula: 'MSE = mean((y - ŷ)²)',
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
        body: 'Agora que a função de custo está clara, o treino pode começar a mexer nos parâmetros para baixar esse número. No nosso exemplo, isso significa ajustar `β₀`, `β₁` e `β₂` para prever melhor o **peso** a partir de **altura** e **idade**.\n\n1. **Começo com chute:** o modelo inicia com valores iniciais para `β₀`, `β₁` e `β₂`.\n\n2. **Mede o custo:** cada chute gera um conjunto diferente de previsões e um MSE diferente.\n\n3. **Ajusta um pouco:** se o custo piora, o treino recua; se melhora, ele continua na mesma direção.\n\n4. **Repete muitas vezes:** esse processo vai afinando a fórmula até encontrar uma combinação melhor.\n\n> O treino não adivinha a resposta final; ele percorre pequenos passos até encontrar parâmetros melhores.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: adjusting parameters',
        body: 'Now that the cost function is clear, training can start changing the parameters to lower that number. In our example, that means adjusting `β₀`, `β₁`, and `β₂` to predict **weight** better from **height** and **age**.\n\n1. **Start with a guess:** the model begins with initial values for `β₀`, `β₁`, and `β₂`.\n\n2. **Measure the cost:** each guess produces a different set of predictions and a different MSE.\n\n3. **Adjust a little:** if the cost gets worse, training steps back; if it improves, it keeps going in that direction.\n\n4. **Repeat many times:** this process keeps refining the formula until a better combination is found.\n\n> Training does not guess the final answer; it takes small steps until it finds better parameters.\n\n---',
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
            formula: 'β₀, β₁, β₂ -> custo -> ajuste -> β₀, β₁, β₂ melhores',
            description: 'O treino gira em um ciclo: mede o custo das previsões de peso, faz um ajuste pequeno em `β₀`, `β₁` e `β₂`, e repete até encontrar um ponto melhor.',
            points: [
              { label: 'chute inicial para `β₀`, `β₁` e `β₂`', accent: '#00e5ff' },
              { label: 'cálculo do custo para saber se melhorou', accent: '#fbbf24' },
              { label: 'novo ajuste pequeno na direção certa', accent: '#ff2e97' },
            ],
            footer: 'No próximo slide, esse passo aparece como uma superfície 3D de custo.',
          },
          graphPanel: {
            eyebrow: 'Novos parâmetros',
            title: 'Cada nova combinação de `β₀`, `β₁` e `β₂` gera um novo MSE',
            description: 'O treino testa uma combinação de parâmetros, calcula o erro das previsões de peso feitas com altura e idade, e decide o próximo ajuste com base nesse resultado.',
            inputNodes: [],
            outputLabel: 'Objetivo',
            outputNode: { label: 'Menor custo', accent: '#fbbf24' },
            chart: {
              xLabel: 'Tentativas com novos parâmetros',
              yLabel: 'Custo (MSE)',
              lineLabel: 'MSE de cada tentativa',
              points: [
                { x: 120, y: 188, label: 'β₀₀,β₁₀,β₂₀', accent: '#ff2e97' },
                { x: 230, y: 156, label: 'β₀₁,β₁₁,β₂₁', accent: '#fbbf24' },
                { x: 335, y: 124, label: 'β₀₂,β₁₂,β₂₂', accent: '#00e5ff' },
                { x: 420, y: 92, label: 'β₀₃,β₁₃,β₂₃', accent: '#a855f7' },
              ],
              lineStart: { x: 110, y: 192 },
              lineEnd: { x: 440, y: 84 },
              footer: 'Se o MSE cai, a nova combinação de `β₀`, `β₁` e `β₂` está prevendo melhor o peso.',
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
            formula: 'β₀, β₁, β₂ -> cost -> adjustment -> better β₀, β₁, β₂',
            description: 'Training moves in a cycle: measure the cost of the weight predictions, make a small adjustment to `β₀`, `β₁`, and `β₂`, and repeat until it finds a better point.',
            points: [
              { label: 'start from an initial guess for `β₀`, `β₁`, and `β₂`', accent: '#00e5ff' },
              { label: 'compute the cost to see if it improved', accent: '#fbbf24' },
              { label: 'make a small adjustment in the right direction', accent: '#ff2e97' },
            ],
            footer: 'The next slide turns this step into a 3D cost surface.',
          },
          graphPanel: {
            eyebrow: 'New parameters',
            title: 'Each new `β₀`, `β₁`, and `β₂` combination produces a new MSE',
            description: 'Training tests one parameter combination, computes the error of the weight predictions made from height and age, and decides the next adjustment from that result.',
            inputNodes: [],
            outputLabel: 'Goal',
            outputNode: { label: 'Lower cost', accent: '#fbbf24' },
            chart: {
              xLabel: 'Attempts with new parameters',
              yLabel: 'Cost (MSE)',
              lineLabel: 'MSE of each attempt',
              points: [
                { x: 120, y: 188, label: 'β₀₀,β₁₀,β₂₀', accent: '#ff2e97' },
                { x: 230, y: 156, label: 'β₀₁,β₁₁,β₂₁', accent: '#fbbf24' },
                { x: 335, y: 124, label: 'β₀₂,β₁₂,β₂₂', accent: '#00e5ff' },
                { x: 420, y: 92, label: 'β₀₃,β₁₃,β₂₃', accent: '#a855f7' },
              ],
              lineStart: { x: 110, y: 192 },
              lineEnd: { x: 440, y: 84 },
              footer: 'If the MSE drops, the new `β₀`, `β₁`, and `β₂` combination is predicting weight better.',
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
        body: 'Agora a ideia deixa de ser apenas “ajustar um pouco” e passa a ter uma regra clara: caminhar na direção em que o custo cai mais rápido. No nosso exemplo, essa caminhada acontece sobre a superfície de custo formada pelas combinações possíveis de `β₀`, `β₁` e `β₂`.\n\n1. **Superfície de custo:** cada combinação de `β₀`, `β₁` e `β₂` vira uma altura no relevo.\n\n2. **Gradiente:** ele aponta para a subida mais íngreme; para descer, seguimos no sentido oposto.\n\n3. **Taxa de aprendizado:** controla o tamanho do passo. Passos pequenos evitam overshoot; passos grandes podem passar do ponto.\n\n4. **Menor custo:** repetindo o movimento, o modelo chega perto do vale em que a previsão de peso a partir de altura e idade erra menos.\n\n> Gradient descent é uma caminhada controlada até o ponto de menor erro.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: descending the gradient',
        body: 'Now the idea is no longer just “adjust a little” but a clear rule: move in the direction where the cost falls fastest. In our example, that walk happens over the cost surface formed by the possible combinations of `β₀`, `β₁`, and `β₂`.\n\n1. **Cost surface:** each combination of `β₀`, `β₁`, and `β₂` becomes a height on the terrain.\n\n2. **Gradient:** it points to the steepest uphill direction; to go down, we move in the opposite direction.\n\n3. **Learning rate:** controls the step size. Small steps avoid overshooting; large steps can skip past the minimum.\n\n4. **Lowest cost:** repeating the motion brings the model close to the valley where predicting weight from height and age makes the smallest error.\n\n> Gradient descent is a controlled walk toward the minimum error.\n\n---',
      },
    },
    visual: {
      id: 'gradient-descent-3d',
      copy: {
        'pt-br': {
          diagramTitle: 'Superfície de custo em 3D',
          diagramDescription: 'O ponto inicial começa alto, o gradiente mostra a direção de maior subida e a trajetória segue o lado oposto com passos curtos até chegar perto do vale das melhores combinações de `β₀`, `β₁` e `β₂`.',
          surfaceLabel: 'superfície de custo',
          gradientLabel: 'gradiente',
          learningRateLabel: 'taxa de aprendizado',
          minimumLabel: 'menor custo',
          pathLabel: 'trajetória da descida',
          startLabel: 'ponto inicial',
          footerLabel: 'Passos curtos e consistentes ajudam o modelo a ajustar `β₀`, `β₁` e `β₂` sem perder o rumo.',
        },
        'en-us': {
          diagramTitle: '3D cost surface',
          diagramDescription: 'The starting point begins high, the gradient shows the steepest uphill direction, and the path follows the opposite side with small steps until it reaches the valley of the best `β₀`, `β₁`, and `β₂` combinations.',
          surfaceLabel: 'cost surface',
          gradientLabel: 'gradient',
          learningRateLabel: 'learning rate',
          minimumLabel: 'lowest cost',
          pathLabel: 'descent path',
          startLabel: 'starting point',
          footerLabel: 'Small, steady steps help the model adjust `β₀`, `β₁`, and `β₂` without losing direction.',
        },
      },
    },
  },
  {
    id: 'linear-regression-notation',
    type: 'two-column',
    content: {
      'pt-br': {
        title: 'Regressão Linear: lendo o plano de previsão em 3D',
        body: 'Agora a regressão deixa de ser apenas fórmula e vira geometria. O mesmo modelo dos próximos slides aparece aqui como um gráfico 3D real.\n\nMapa rápido da fórmula:\n- `β₀`: coeficiente linear / intercepto, o valor base do modelo\n- `β₁`: coeficiente angular da altura, o quanto a previsão sobe quando a altura aumenta\n- `β₂`: coeficiente angular da idade, o quanto a previsão sobe quando a idade aumenta\n- `ŷ`: soma final da previsão, depois que `β₀`, `β₁` e `β₂` fazem seu trabalho\n\n1. **Eixo X = altura:** cada pessoa entra com um valor conhecido de altura.\n\n2. **Eixo Z = idade:** a segunda entrada também entra no espaço, sem ser escondida em uma reta 2D.\n\n3. **Eixo Y = peso:** a altura vertical mostra o peso, que pode ser o valor real `y` ou o valor previsto `ŷ`.\n\n4. **Pontos coloridos = `y`:** cada ponto observado é um peso real do dataset `(160,20,55)` até `(180,36,72)`.\n\n5. **Plano = `ŷ = β₀ + β₁ * altura + β₂ * idade`:** neste exemplo didático, fixamos `β₀ = -21`, `β₁ = 0.4` e `β₂ = 0.6` manualmente para visualizar a superfície de previsão antes de mostrar o treino aprendendo seus próprios coeficientes. Aqui `β₁` e `β₂` funcionam como coeficientes angulares / inclinações, e `β₀` funciona como coeficiente linear / intercepto.\n\nLegenda curta:\n- `y`: peso real observado\n- `ŷ`: peso previsto pelo modelo\n- `β₀`: coeficiente linear / intercepto\n- `β₁` e `β₂`: coeficientes angulares / inclinações\n\n> Quando o ponto real fica longe do plano previsto, a diferença visual já antecipa o erro que depois vira MSE.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: reading the prediction plane in 3D',
        body: 'Here regression stops being only a formula and becomes geometry. The same model from the next slides is shown as a real 3D chart.\n\nQuick formula map:\n- `β₀`: linear coefficient / intercept, the model’s base value\n- `β₁`: angular coefficient for height, how much the prediction changes when height increases\n- `β₂`: angular coefficient for age, how much the prediction changes when age increases\n- `ŷ`: final prediction after `β₀`, `β₁`, and `β₂` do their work\n\n1. **X axis = height:** each person enters with a known height value.\n\n2. **Z axis = age:** the second input stays visible in space instead of being flattened into a 2D line.\n\n3. **Y axis = weight:** the vertical dimension shows weight, either as the real value `y` or the predicted value `ŷ`.\n\n4. **Colored points = `y`:** each observed point is a real dataset weight from `(160,20,55)` to `(180,36,72)`.\n\n5. **Plane = `ŷ = β₀ + β₁ * height + β₂ * age`:** in this teaching example, we manually fix `β₀ = -21`, `β₁ = 0.4`, and `β₂ = 0.6` to visualize the prediction surface before showing training learn its own coefficients. Here `β₁` and `β₂` act like angular coefficients / slopes, and `β₀` acts like the linear coefficient / intercept.\n\nShort legend:\n- `y`: observed real weight\n- `ŷ`: model prediction\n- `β₀`: linear coefficient / intercept\n- `β₁` and `β₂`: angular coefficients / slopes\n\n> When the real point sits far from the prediction plane, that visual gap already anticipates the error that later becomes MSE.\n\n---',
      },
    },
    visual: {
      id: 'linear-regression-3d-chart',
      copy: {
        'pt-br': {
          eyebrow: 'Plano de previsão',
          title: 'Altura, idade e peso no mesmo espaço',
          description: 'Os pontos mostram pesos reais do dataset. O plano semi-transparente mostra o que a regressão linear prevê para cada combinação de altura e idade.',
          tabs: [
            { label: '3D' },
            { label: '2D' },
          ],
          axisLabels: {
            x: 'Altura (X)',
            y: 'Peso (Y)',
            z: 'Idade (Z)',
          },
          dataset: [
            { height: 160, age: 20, realWeight: 55, label: '160 / 20 / 55', accent: '#00e5ff' },
            { height: 165, age: 24, realWeight: 59, label: '165 / 24 / 59', accent: '#fbbf24' },
            { height: 170, age: 28, realWeight: 64, label: '170 / 28 / 64', accent: '#ff2e97' },
            { height: 175, age: 32, realWeight: 68, label: '175 / 32 / 68', accent: '#a855f7' },
            { height: 180, age: 36, realWeight: 72, label: '180 / 36 / 72', accent: '#34d399' },
          ],
          coefficients: {
            beta0: -21,
            beta1: 0.4,
            beta2: 0.6,
            formula: 'ŷ = -21 + 0.4h + 0.6i',
          },
          realLabel: 'ponto real `y`',
          predictedLabel: 'projeção prevista `ŷ`',
          planeLabel: 'plano de regressão',
          symbolGuideTitle: 'Leitura dos símbolos',
          symbolGuide: [
            {
              symbol: 'β₀',
              label: 'Intercepto / coeficiente linear',
              description: 'É a base do modelo. Ele move a superfície inteira para cima ou para baixo.',
              accent: '#fbbf24',
            },
            {
              symbol: 'β₁',
              label: 'Coeficiente angular da altura',
              description: 'Mostra o quanto a previsão muda quando a altura aumenta.',
              accent: '#00e5ff',
            },
            {
              symbol: 'β₂',
              label: 'Coeficiente angular da idade',
              description: 'Mostra o quanto a previsão muda quando a idade aumenta.',
              accent: '#ff2e97',
            },
          ],
          comparisonChart: {
            eyebrow: 'Projeção plana',
            title: 'A mesma relação vista em 2D perde a dimensão da idade',
            description: 'Aqui olhamos apenas altura vs peso para mostrar que um gráfico plano não consegue exibir, ao mesmo tempo, o efeito da idade na previsão.',
            xLabel: 'Altura (X)',
            yLabel: 'Peso (Y)',
            lineLabel: 'reta ajustada em 2D',
            dataset: [
              { height: 160, age: 20, realWeight: 55, label: '160 / 55', accent: '#00e5ff' },
              { height: 165, age: 24, realWeight: 59, label: '165 / 59', accent: '#fbbf24' },
              { height: 170, age: 28, realWeight: 64, label: '170 / 64', accent: '#ff2e97' },
              { height: 175, age: 32, realWeight: 68, label: '175 / 68', accent: '#a855f7' },
              { height: 180, age: 36, realWeight: 72, label: '180 / 72', accent: '#34d399' },
            ],
            lineStart: { x: 104, y: 224 },
            lineEnd: { x: 432, y: 86 },
            symbolGuideTitle: 'Leitura dos símbolos',
            symbolGuide: [
              {
                symbol: 'β₀',
                label: 'Intercepto / coeficiente linear',
                description: 'É a base da reta. Se ele muda, a reta sobe ou desce sem mudar a inclinação.',
                accent: '#fbbf24',
              },
              {
                symbol: 'β₁',
                label: 'Coeficiente angular da altura',
                description: 'Mostra o quanto o peso previsto muda quando a altura aumenta.',
                accent: '#00e5ff',
              },
              {
                symbol: 'β₂',
                label: 'Coeficiente angular da idade',
                description: 'Existe no modelo, mas não aparece no 2D porque a idade saiu do gráfico.',
                accent: '#ff2e97',
              },
            ],
            footer: 'No plano 2D, a leitura vira uma reta e `β₂` fica escondido; no 3D, a mesma ideia vira uma superfície e a idade volta a aparecer.',
          },
          footer: 'A leitura correta é: entradas no plano X/Z, peso no eixo Y, previsão no plano e desvio vertical como erro.',
        },
        'en-us': {
          eyebrow: 'Prediction plane',
          title: 'Height, age, and weight in the same space',
          description: 'The points show real dataset weights. The semi-transparent plane shows what linear regression predicts for each height and age combination.',
          tabs: [
            { label: '3D' },
            { label: '2D' },
          ],
          axisLabels: {
            x: 'Height (X)',
            y: 'Weight (Y)',
            z: 'Age (Z)',
          },
          dataset: [
            { height: 160, age: 20, realWeight: 55, label: '160 / 20 / 55', accent: '#00e5ff' },
            { height: 165, age: 24, realWeight: 59, label: '165 / 24 / 59', accent: '#fbbf24' },
            { height: 170, age: 28, realWeight: 64, label: '170 / 28 / 64', accent: '#ff2e97' },
            { height: 175, age: 32, realWeight: 68, label: '175 / 32 / 68', accent: '#a855f7' },
            { height: 180, age: 36, realWeight: 72, label: '180 / 36 / 72', accent: '#34d399' },
          ],
          coefficients: {
            beta0: -21,
            beta1: 0.4,
            beta2: 0.6,
            formula: 'ŷ = -21 + 0.4h + 0.6a',
          },
          realLabel: 'real point `y`',
          predictedLabel: 'predicted projection `ŷ`',
          planeLabel: 'regression plane',
          symbolGuideTitle: 'Symbol reading',
          symbolGuide: [
            {
              symbol: 'β₀',
              label: 'Intercept / linear coefficient',
              description: 'It is the model base. It moves the whole surface up or down.',
              accent: '#fbbf24',
            },
            {
              symbol: 'β₁',
              label: 'Angular coefficient for height',
              description: 'It shows how much the prediction changes when height increases.',
              accent: '#00e5ff',
            },
            {
              symbol: 'β₂',
              label: 'Angular coefficient for age',
              description: 'It shows how much the prediction changes when age increases.',
              accent: '#ff2e97',
            },
          ],
          comparisonChart: {
            eyebrow: 'Flat projection',
            title: 'The same relationship in 2D loses the age dimension',
            description: 'Here we look only at height vs weight to show that a flat chart cannot display, at the same time, the effect of age on the prediction.',
            xLabel: 'Height (X)',
            yLabel: 'Weight (Y)',
            lineLabel: '2D fitted line',
            dataset: [
              { height: 160, age: 20, realWeight: 55, label: '160 / 55', accent: '#00e5ff' },
              { height: 165, age: 24, realWeight: 59, label: '165 / 59', accent: '#fbbf24' },
              { height: 170, age: 28, realWeight: 64, label: '170 / 64', accent: '#ff2e97' },
              { height: 175, age: 32, realWeight: 68, label: '175 / 68', accent: '#a855f7' },
              { height: 180, age: 36, realWeight: 72, label: '180 / 72', accent: '#34d399' },
            ],
            lineStart: { x: 104, y: 224 },
            lineEnd: { x: 432, y: 86 },
            symbolGuideTitle: 'Symbol reading',
            symbolGuide: [
              {
                symbol: 'β₀',
                label: 'Intercept / linear coefficient',
                description: 'It is the base of the line. If it changes, the line moves up or down without changing slope.',
                accent: '#fbbf24',
              },
              {
                symbol: 'β₁',
                label: 'Angular coefficient for height',
                description: 'It shows how much the predicted weight changes when height increases.',
                accent: '#00e5ff',
              },
              {
                symbol: 'β₂',
                label: 'Angular coefficient for age',
                description: 'It still exists in the model, but it is hidden here because age is not drawn on the graph.',
                accent: '#ff2e97',
              },
            ],
            footer: 'In 2D, the line shows only the height effect and `β₂` stays hidden; in 3D, the surface shows both height and age.',
          },
          footer: 'The correct reading is: inputs on the X/Z plane, weight on Y, prediction on the plane, and the vertical gap as error.',
        },
      },
    },
  },
  {
    id: 'linear-regression-mse-stepper',
    type: 'two-column',
    content: {
      'pt-br': {
        title: 'Regressão Linear: o MSE antes do Python',
        body: 'Agora o MSE deixa de ser definição abstrata e vira conta com dados reais.\n\n1. **Dataset usado:** `(160, 20, 55)`, `(165, 24, 59)`, `(170, 28, 64)`, `(175, 32, 68)`, `(180, 36, 72)`.\n\n2. **Entradas e saída:** altura e idade entram; `y` guarda o peso real e `ŷ` guarda a previsão.\n\n3. **Modelo de exemplo:** para fechar a conta manualmente, vamos usar `ŷ = β₀ + β₁ * altura + β₂ * idade`, com `β₀ = -21`, `β₁ = 0.4` e `β₂ = 0.6` escolhidos para este exemplo didático.\n\n4. **Objetivo da conta:** calcular erro, elevar ao quadrado, somar tudo e dividir pelo total de exemplos.\n\n> Quando cada linha do dataset entra na conta, o MSE deixa de ser sigla e vira um número verificável. Aqui o foco é validar a mecânica da conta, não mostrar o resultado do treino.\n\n---',
      },
      'en-us': {
        title: 'Linear Regression: MSE before Python',
        body: 'Now MSE stops being an abstract definition and becomes arithmetic with real data.\n\n1. **Dataset used:** `(160, 20, 55)`, `(165, 24, 59)`, `(170, 28, 64)`, `(175, 32, 68)`, `(180, 36, 72)`.\n\n2. **Inputs and output:** height and age go in; `y` stores the real weight and `ŷ` stores the prediction.\n\n3. **Example model:** to close the arithmetic by hand, we will use `ŷ = β₀ + β₁ * height + β₂ * age`, with `β₀ = -21`, `β₁ = 0.4`, and `β₂ = 0.6` chosen for this teaching example.\n\n4. **Goal of the calculation:** compute the error, square it, add everything, and divide by the total number of examples.\n\n> When each dataset row enters the arithmetic, MSE stops being an acronym and becomes a verifiable number. The goal here is to validate the mechanics of the calculation, not to show training output.\n\n---',
      },
    },
    visual: {
      id: 'progress-stepper',
      copy: {
        'pt-br': {
          eyebrow: 'Revisão guiada',
          title: 'MSE com altura, idade e peso reais',
          description: 'Usando o mesmo dataset do slide de Python, vamos abrir a conta do MSE passo a passo com previsões numéricas.',
          progressLabel: 'Passo',
          previousLabel: 'Anterior',
          nextLabel: 'Próximo',
          completionLabel: 'Fechamento do raciocínio',
          completionDescription: 'Com esse exemplo, o MSE do conjunto fica `0.12`. No próximo slide, essa mesma sequência aparece em Python como função e loop.',
          footer: 'Aqui a conta fecha de ponta a ponta: prever peso, medir erro, elevar ao quadrado, somar e dividir por 5.',
          table: {
            title: 'Dataset e resultados do exemplo',
            headers: {
              height: 'Altura',
              age: 'Idade',
              realWeight: 'Peso real',
              predictedWeight: 'Previsto',
              error: 'Erro',
              squaredError: 'Erro²',
            },
            rows: [
              { height: '160', age: '20', realWeight: '55', predictedWeight: '55.0', error: '0.0', squaredError: '0.00' },
              { height: '165', age: '24', realWeight: '59', predictedWeight: '59.4', error: '0.4', squaredError: '0.16' },
              { height: '170', age: '28', realWeight: '64', predictedWeight: '63.8', error: '-0.2', squaredError: '0.04' },
              { height: '175', age: '32', realWeight: '68', predictedWeight: '68.2', error: '0.2', squaredError: '0.04' },
              { height: '180', age: '36', realWeight: '72', predictedWeight: '72.6', error: '0.6', squaredError: '0.36' },
            ],
          },
          steps: [
            {
              label: 'Linha 1',
              title: 'Preveja o peso do primeiro exemplo',
              description: 'Para `(altura=160, idade=20, peso=55)`, a fórmula gera `ŷ = -21 + 0.4 * 160 + 0.6 * 20 = -21 + 64 + 12 = 55`. O peso previsto bate exatamente com o peso real.',
              formula: 'ŷ = -21 + 0.4*160 + 0.6*20 = 55',
              accent: '#00e5ff',
              highlightedRowIndexes: [0],
            },
            {
              label: 'Linha 2',
              title: 'Calcule o erro do segundo exemplo',
              description: 'Para `(165, 24, 59)`, a previsão fica `ŷ = -21 + 0.4 * 165 + 0.6 * 24 = 59.4`. O erro é `ŷ - y = 59.4 - 59 = 0.4`.',
              formula: 'erro = ŷ - y = 59.4 - 59 = 0.4',
              accent: '#ff2e97',
              highlightedRowIndexes: [1],
            },
            {
              label: 'Quadrados',
              title: 'Eleve os erros ao quadrado',
              description: 'Os cinco erros do conjunto ficam `0`, `0.4`, `-0.2`, `0.2` e `0.6`. Ao quadrado, eles viram `0`, `0.16`, `0.04`, `0.04` e `0.36`.',
              formula: '0² + 0.4² + (-0.2)² + 0.2² + 0.6²',
              accent: '#fbbf24',
              highlightedRowIndexes: [0, 1, 2, 3, 4],
            },
            {
              label: 'Soma',
              title: 'Some todos os erros quadráticos',
              description: 'Agora juntamos as contribuições do dataset inteiro: `0 + 0.16 + 0.04 + 0.04 + 0.36 = 0.60`.',
              formula: 'soma = 0.60',
              accent: '#a855f7',
              highlightedRowIndexes: [0, 1, 2, 3, 4],
            },
            {
              label: 'MSE final',
              title: 'Divida pela quantidade de exemplos',
              description: 'Como temos `5` linhas no dataset, o erro médio ao quadrado fica `0.60 / 5 = 0.12`. Esse é o custo que o treino tenta reduzir.',
              formula: 'MSE = 0.60 / 5 = 0.12',
              accent: '#34d399',
              highlightedRowIndexes: [0, 1, 2, 3, 4],
            },
          ],
        },
        'en-us': {
          eyebrow: 'Guided review',
          title: 'MSE with real height, age, and weight',
          description: 'Using the same dataset from the Python slide, we now open the MSE calculation step by step with numeric predictions.',
          progressLabel: 'Step',
          previousLabel: 'Previous',
          nextLabel: 'Next',
          completionLabel: 'Reasoning complete',
          completionDescription: 'With this example, the dataset MSE becomes `0.12`. In the next slide, the same sequence appears in Python as a function and a loop.',
          footer: 'This closes the arithmetic from end to end: predict weight, measure error, square it, add everything, and divide by 5.',
          table: {
            title: 'Dataset and example results',
            headers: {
              height: 'Height',
              age: 'Age',
              realWeight: 'Real weight',
              predictedWeight: 'Predicted',
              error: 'Error',
              squaredError: 'Error²',
            },
            rows: [
              { height: '160', age: '20', realWeight: '55', predictedWeight: '55.0', error: '0.0', squaredError: '0.00' },
              { height: '165', age: '24', realWeight: '59', predictedWeight: '59.4', error: '0.4', squaredError: '0.16' },
              { height: '170', age: '28', realWeight: '64', predictedWeight: '63.8', error: '-0.2', squaredError: '0.04' },
              { height: '175', age: '32', realWeight: '68', predictedWeight: '68.2', error: '0.2', squaredError: '0.04' },
              { height: '180', age: '36', realWeight: '72', predictedWeight: '72.6', error: '0.6', squaredError: '0.36' },
            ],
          },
          steps: [
            {
              label: 'Row 1',
              title: 'Predict the first example',
              description: 'For `(height=160, age=20, weight=55)`, the formula gives `ŷ = -21 + 0.4 * 160 + 0.6 * 20 = -21 + 64 + 12 = 55`. The predicted weight matches the real weight exactly.',
              formula: 'ŷ = -21 + 0.4*160 + 0.6*20 = 55',
              accent: '#00e5ff',
              highlightedRowIndexes: [0],
            },
            {
              label: 'Row 2',
              title: 'Compute the second error',
              description: 'For `(165, 24, 59)`, the prediction becomes `ŷ = -21 + 0.4 * 165 + 0.6 * 24 = 59.4`. The error is `ŷ - y = 59.4 - 59 = 0.4`.',
              formula: 'error = ŷ - y = 59.4 - 59 = 0.4',
              accent: '#ff2e97',
              highlightedRowIndexes: [1],
            },
            {
              label: 'Squares',
              title: 'Square the errors',
              description: 'The five dataset errors become `0`, `0.4`, `-0.2`, `0.2`, and `0.6`. Squared, they turn into `0`, `0.16`, `0.04`, `0.04`, and `0.36`.',
              formula: '0² + 0.4² + (-0.2)² + 0.2² + 0.6²',
              accent: '#fbbf24',
              highlightedRowIndexes: [0, 1, 2, 3, 4],
            },
            {
              label: 'Sum',
              title: 'Add all squared errors',
              description: 'Now we aggregate the contribution of the whole dataset: `0 + 0.16 + 0.04 + 0.04 + 0.36 = 0.60`.',
              formula: 'sum = 0.60',
              accent: '#a855f7',
              highlightedRowIndexes: [0, 1, 2, 3, 4],
            },
            {
              label: 'Final MSE',
              title: 'Divide by the number of examples',
              description: 'Since the dataset has `5` rows, the mean squared error becomes `0.60 / 5 = 0.12`. That is the cost training tries to reduce.',
              formula: 'MSE = 0.60 / 5 = 0.12',
              accent: '#34d399',
              highlightedRowIndexes: [0, 1, 2, 3, 4],
            },
          ],
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
        body: 'Agora sim vamos para o Python, mantendo o mesmo exemplo: prever **peso** a partir de **altura** e **idade**. Até aqui, usamos coeficientes fixados manualmente para entender a mecânica da previsão e do MSE; agora o código vai aprender seus próprios `beta_0`, `beta_1` e `beta_2` a partir dos dados.\n\n1. **A função da previsão:** a forma básica agora combina duas entradas com dois coeficientes e um intercepto. Aqui `beta_0` é o intercepto, ou seja, o valor base que aparece mesmo antes de considerar altura e idade.\n\n2. **As entradas e a saída:** altura e idade entram; peso sai. O modelo precisa aprender três números: `beta_0`, `beta_1` e `beta_2`.\n\n3. **O fluxo do treino:** calcular `ŷ`, medir o erro e ajustar os parâmetros um pouco de cada vez.\n\n4. **A leitura de programador:** `predict` calcula, `mse` mede, `train` corrige. É uma função, uma métrica e um loop.\n\n> Em Python, regressão linear continua simples: uma fórmula, um custo e uma rotina de ajuste.\n\n---\n\n```python\n# prever peso usando altura e idade\n\ndados = [\n    (160, 20, 55),\n    (165, 24, 59),\n    (170, 28, 64),\n    (175, 32, 68),\n    (180, 36, 72),\n]\n\ndef prever(altura, idade, beta_0, beta_1, beta_2):\n    return beta_0 + beta_1 * altura + beta_2 * idade\n\n\ndef mse(dados, beta_0, beta_1, beta_2):\n    soma = 0\n    for altura, idade, y in dados:\n        y_hat = prever(altura, idade, beta_0, beta_1, beta_2)\n        erro = y_hat - y\n        soma += erro ** 2\n    return soma / len(dados)\n\n\ndef treinar_regressao_linear(dados, epochs=10000, lr=0.00001):\n    beta_0 = 0.0\n    beta_1 = 0.0\n    beta_2 = 0.0\n    n = len(dados)\n\n    for epoch in range(epochs):\n        grad_beta_0 = 0.0\n        grad_beta_1 = 0.0\n        grad_beta_2 = 0.0\n\n        for altura, idade, y in dados:\n            y_hat = prever(altura, idade, beta_0, beta_1, beta_2)\n            erro = y_hat - y\n            grad_beta_0 += 2 * erro\n            grad_beta_1 += 2 * erro * altura\n            grad_beta_2 += 2 * erro * idade\n\n        grad_beta_0 /= n\n        grad_beta_1 /= n\n        grad_beta_2 /= n\n\n        beta_0 -= lr * grad_beta_0\n        beta_1 -= lr * grad_beta_1\n        beta_2 -= lr * grad_beta_2\n\n    return beta_0, beta_1, beta_2\n\n\nbeta_0, beta_1, beta_2 = treinar_regressao_linear(dados)\n\nprint("\\nModelo final:")\nprint(f"peso = {beta_0:.4f} + {beta_1:.4f} * altura + {beta_2:.4f} * idade")\n```\n\n> O mesmo raciocínio dos slides anteriores aparece inteiro no código: entradas conhecidas, previsão `ŷ`, erro, custo e ajuste dos parâmetros.',
      },
      'en-us': {
        title: 'Linear Regression in Python: the first training version',
        body: 'Now we move to Python while keeping the same example: predicting **weight** from **height** and **age**. Up to this point, we used manually fixed coefficients to understand the mechanics of prediction and MSE; now the code will learn its own `beta_0`, `beta_1`, and `beta_2` from data.\n\n1. **The prediction function:** the basic form now combines two inputs with two coefficients and one intercept. Here `beta_0` is the intercept, the base value added before height and age contribute.\n\n2. **Inputs and output:** height and age go in; weight comes out. The model needs to learn three numbers: `beta_0`, `beta_1`, and `beta_2`.\n\n3. **Training flow:** compute `ŷ`, measure the error, and adjust the parameters little by little.\n\n4. **Programmer reading:** `predict` calculates, `mse` measures, `train` corrects. It is one function, one metric, and one loop.\n\n> In Python, linear regression still stays simple: one formula, one cost, and one adjustment routine.\n\n---\n\n```python\n# predict weight using height and age\n\ndata = [\n    (160, 20, 55),\n    (165, 24, 59),\n    (170, 28, 64),\n    (175, 32, 68),\n    (180, 36, 72),\n]\n\ndef predict(height, age, beta_0, beta_1, beta_2):\n    return beta_0 + beta_1 * height + beta_2 * age\n\n\ndef mse(data, beta_0, beta_1, beta_2):\n    total = 0\n    for height, age, y in data:\n        y_hat = predict(height, age, beta_0, beta_1, beta_2)\n        error = y_hat - y\n        total += error ** 2\n    return total / len(data)\n\n\ndef train_linear_regression(data, epochs=10000, lr=0.00001):\n    beta_0 = 0.0\n    beta_1 = 0.0\n    beta_2 = 0.0\n    n = len(data)\n\n    for epoch in range(epochs):\n        grad_beta_0 = 0.0\n        grad_beta_1 = 0.0\n        grad_beta_2 = 0.0\n\n        for height, age, y in data:\n            y_hat = predict(height, age, beta_0, beta_1, beta_2)\n            error = y_hat - y\n            grad_beta_0 += 2 * error\n            grad_beta_1 += 2 * error * height\n            grad_beta_2 += 2 * error * age\n\n        grad_beta_0 /= n\n        grad_beta_1 /= n\n        grad_beta_2 /= n\n\n        beta_0 -= lr * grad_beta_0\n        beta_1 -= lr * grad_beta_1\n        beta_2 -= lr * grad_beta_2\n\n    return beta_0, beta_1, beta_2\n\n\nbeta_0, beta_1, beta_2 = train_linear_regression(data)\n\nprint("\\nFinal model:")\nprint(f"weight = {beta_0:.4f} + {beta_1:.4f} * height + {beta_2:.4f} * age")\n```\n\n> The same reasoning from the previous slides now appears end to end in code: known inputs, prediction `ŷ`, error, cost, and parameter adjustment.',
      },
    },
  },
];
