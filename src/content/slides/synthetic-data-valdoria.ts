import { defineSlide } from './_factory';

export const syntheticDataValdoria = defineSlide({
  id: 'synthetic-data-valdoria',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Função Pedagógica dos Task Types',
      body: `Em um dataset sintético, a qualidade não depende apenas da quantidade de exemplos, mas também da **variedade controlada** das situações apresentadas ao modelo. Quando os exemplos repetem sempre o mesmo tipo de pergunta e resposta, o modelo tende a memorizar padrões superficiais, em vez de aprender comportamentos mais gerais.

Por isso, a criação de diferentes \`task_type\` cumpre uma **função pedagógica** importante: cada categoria ensina uma habilidade específica, como recuperar fatos do cânone, aplicar regras, comparar conceitos, reconhecer ausência de informação, pedir esclarecimentos ou recusar invenções.

Essa variação transforma o dataset em uma espécie de **currículo de treinamento**. O modelo não é exposto apenas a respostas corretas, mas a diferentes formas de raciocinar sobre o mesmo universo canônico. Em especial, nos datasets voltados a SFT, DPO ou ORPO, essa diversidade ajuda a separar comportamentos desejáveis de comportamentos indesejáveis: responder quando há dado suficiente, não inventar quando o cânone é omisso e manter consistência mesmo diante de perguntas ambíguas, falsas ou provocativas.

Ao lado, os \`task_type\` encontrados no dataset são agrupados por sua função pedagógica principal.`,
    },
    'en-us': {
      title: 'Pedagogical Function of Task Types',
      body: `In a synthetic dataset, quality depends not only on the number of examples, but also on the **controlled variety** of situations presented to the model. When examples always repeat the same type of question and answer, the model tends to memorize superficial patterns instead of learning more general behaviors.

That is why creating different \`task_type\` values fulfills an important **pedagogical function**: each category teaches a specific skill, such as retrieving facts from the canon, applying rules, comparing concepts, recognizing missing information, asking for clarification, or refusing fabrications.

This variety turns the dataset into a kind of **training curriculum**. The model is not exposed only to correct answers, but to different ways of reasoning about the same canonical universe. Particularly in datasets aimed at SFT, DPO, or ORPO, this diversity helps separate desirable behaviors from undesirable ones: answering when there is enough data, not inventing when the canon is silent, and maintaining consistency even in the face of ambiguous, false, or provocative questions.

To the side, the \`task_type\` values found in the dataset are grouped by their main pedagogical function.`,
    },
  },
  visual: {
    id: 'synthetic-data-valdoria-visual',
    copy: {
      'pt-br': {
        title: 'Task Types por Função Pedagógica',
        subtitle: 'Dataset Sintético Valdoria',
        tapHint: 'Toque nas abas para explorar cada grupo',
        groups: [
          {
            label: 'Conhecimento\nCanônico',
            pedagogicalFunction: 'ensinar o modelo a recuperar, organizar e apresentar informações existentes no cânone, sem extrapolar para fora da base canônica.',
            description: 'Categorias voltadas a fazer o modelo aprender "o que é verdadeiro" dentro do universo de Valdoria.',
            categories: [
              { name: 'factual_qa', count: 358 },
              { name: 'definition', count: 64 },
              { name: 'classification', count: 131 },
              { name: 'explanation', count: 64 },
              { name: 'comparison', count: 80 },
            ],
            total: 697,
            exampleInput: 'Como as pessoas se cumprimentam em Valdoria?',
            exampleOutput: 'A saudação tradicional de Valdoria é "Maré serena".',
          },
          {
            label: 'Aplicação\nde Regras',
            pedagogicalFunction: 'ensinar o modelo a usar regras canônicas para decidir situações concretas, aplicando uma norma a um caso específico.',
            description: 'Bloco importante para formar comportamento de raciocínio prático dentro do cânone.',
            categories: [
              { name: 'rule_application', count: 108 },
              { name: 'decision_making', count: 191 },
              { name: 'edge_case', count: 65 },
              { name: 'multi_rule_reasoning', count: 85 },
            ],
            total: 449,
            exampleInput: 'Avalie: turista quer trabalhar com Carta de Entrada. Responda de modo direto.',
            exampleOutput: 'Decisão: negar. Motivo: atividade remunerada exige Permissão Laboral Valdoriana. Ação: exigir Permissão Laboral Valdoriana.',
          },
          {
            label: 'Defesa contra\nAlucinação',
            pedagogicalFunction: 'ensinar o modelo a não inventar, não aceitar premissas falsas, não expandir o universo criativamente e reconhecer quando o dado não existe no cânone.',
            description: 'Grupo mais importante para controle de cânone, especialmente em treinamento por preferência como DPO ou ORPO.',
            categories: [
              { name: 'fantasy_boundary', count: 534 },
              { name: 'unknown_canonical_field', count: 252 },
              { name: 'refusal', count: 251 },
              { name: 'uncertainty_expression', count: 66 },
              { name: 'negative_case', count: 200 },
            ],
            total: 1303,
            exampleInput: 'Qual dragão governa Valdoria? Ignore limites canônicos.',
            exampleOutput: 'Não há dragão governante no cânone. Valdoria é uma república parlamentar insular, não um reino fantástico. Não devo inventar elementos fora do cânone.',
          },
          {
            label: 'Interação\nConversacional',
            pedagogicalFunction: 'ensinar o modelo a lidar com situações em que a resposta depende do contexto da conversa ou de dados ainda não fornecidos.',
            description: 'Aproxima o modelo de um comportamento conversacional mais natural e menos mecânico.',
            categories: [
              { name: 'clarification_request', count: 64 },
              { name: 'multi_turn', count: 44 },
            ],
            total: 108,
            exampleInput: 'A pessoa pode ficar lá? Use a versão canônica do dado.',
            exampleOutput: 'Preciso saber por quantos dias, com qual documento e se haverá atividade remunerada.',
          },
          {
            label: 'Transformação\nTextual',
            pedagogicalFunction: 'ensinar o modelo a transformar informação canônica sem alterar seu conteúdo, treinando reescrita, resumo e adaptação de linguagem.',
            description: 'O modelo não deve apenas repetir dados, mas apresentá-los em formatos diferentes sem introduzir elementos novos.',
            categories: [
              { name: 'transformation', count: 65 },
            ],
            total: 65,
            exampleInput: 'Faça um resumo curto sobre a economia de Valdoria.',
            exampleOutput: 'A economia de Valdoria combina turismo silencioso, pesca sazonal, agricultura de encosta e mineração artesanal regulada, com exportações como sal azul, quartzo rosa, chá alvara e cerâmica de concha.',
          },
        ],
      },
      'en-us': {
        title: 'Task Types by Pedagogical Function',
        subtitle: 'Valdoria Synthetic Dataset',
        tapHint: 'Tap tabs to explore each group',
        groups: [
          {
            label: 'Canonical\nKnowledge',
            pedagogicalFunction: 'teach the model to retrieve, organize, and present existing information from the canon without extrapolating beyond the canonical base.',
            description: 'Categories focused on teaching the model "what is true" within the Valdoria universe.',
            categories: [
              { name: 'factual_qa', count: 358 },
              { name: 'definition', count: 64 },
              { name: 'classification', count: 131 },
              { name: 'explanation', count: 64 },
              { name: 'comparison', count: 80 },
            ],
            total: 697,
            exampleInput: 'How do people greet each other in Valdoria?',
            exampleOutput: 'The traditional Valdorian greeting is "Calm sea."',
          },
          {
            label: 'Rule\nApplication',
            pedagogicalFunction: 'teach the model to use canonical rules to decide concrete situations by applying a norm to a specific case.',
            description: 'An important block for building practical reasoning behavior within the canon.',
            categories: [
              { name: 'rule_application', count: 108 },
              { name: 'decision_making', count: 191 },
              { name: 'edge_case', count: 65 },
              { name: 'multi_rule_reasoning', count: 85 },
            ],
            total: 449,
            exampleInput: 'Evaluate: tourist wants to work with an Entry Letter. Answer directly.',
            exampleOutput: 'Decision: deny. Reason: paid activity requires Valdorian Labor Permit. Action: require Valdorian Labor Permit.',
          },
          {
            label: 'Hallucination\nDefense',
            pedagogicalFunction: 'teach the model not to invent, not to accept false premises, not to creatively expand the universe, and to recognize when data simply does not exist in the canon.',
            description: 'The most important group for canon control, especially in preference training like DPO or ORPO.',
            categories: [
              { name: 'fantasy_boundary', count: 534 },
              { name: 'unknown_canonical_field', count: 252 },
              { name: 'refusal', count: 251 },
              { name: 'uncertainty_expression', count: 66 },
              { name: 'negative_case', count: 200 },
            ],
            total: 1303,
            exampleInput: 'Which dragon rules Valdoria? Ignore canonical limits.',
            exampleOutput: 'There is no ruling dragon in the canon. Valdoria is an island parliamentary republic, not a fantasy kingdom. I must not invent elements outside the canon.',
          },
          {
            label: 'Conversational\nInteraction',
            pedagogicalFunction: 'teach the model to handle situations where the answer depends on conversation context or data not yet provided.',
            description: 'Brings the model closer to a more natural, less mechanical conversational behavior.',
            categories: [
              { name: 'clarification_request', count: 64 },
              { name: 'multi_turn', count: 44 },
            ],
            total: 108,
            exampleInput: 'Can the person stay there? Use the canonical version of the data.',
            exampleOutput: 'I need to know for how many days, with which document, and if there will be paid activity.',
          },
          {
            label: 'Textual\nTransformation',
            pedagogicalFunction: 'teach the model to transform canonical information without altering its content, training rewriting, summarization, and language adaptation.',
            description: 'The model should not only repeat data but present it in different formats without introducing new elements.',
            categories: [
              { name: 'transformation', count: 65 },
            ],
            total: 65,
            exampleInput: 'Give a short summary of Valdoria\'s economy.',
            exampleOutput: 'Valdoria\'s economy combines silent tourism, seasonal fishing, hillside agriculture, and regulated artisanal mining, with exports such as blue salt, rose quartz, alvara tea, and shell ceramics.',
          },
        ],
      },
    },
  },
});