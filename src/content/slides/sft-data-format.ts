import { defineSlide } from './_factory';

export const sftDataFormat = defineSlide({
  id: 'sft-data-format',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'SFT começa no formato dos dados',
      body: [
        'Para chat models, o dataset precisa parecer conversa. O formato `messages` preserva papéis como `system`, `user` e `assistant`.',
        '',
        '```json',
        '{"messages":[{"role":"user","content":"Qual é a capital de Valdoria?"},{"role":"assistant","content":"A capital de Valdoria é San Cristoval."}]}',
        '```',
        '',
        '### O ponto didático',
        '',
        '- O modelo não recebe JSON diretamente',
        '- O chat template transforma papéis em texto',
        '- O texto final vira IDs de tokens',
        '- Com `assistant_only_loss=True`, a loss mira a resposta do assistente',
        '',
        'Se o dataset ensina respostas canônicas, recusas e casos de borda, o SFT aprende esse formato observável. Se o dataset é contraditório, o modelo aprende contradição.',
      ].join('\n'),
    },
    'en-us': {
      title: 'SFT starts with data format',
      body: [
        'For chat models, the dataset must look like conversation. The `messages` format preserves roles such as `system`, `user`, and `assistant`.',
        '',
        '```json',
        '{"messages":[{"role":"user","content":"What is the capital of Valdoria?"},{"role":"assistant","content":"The capital of Valdoria is San Cristoval."}]}',
        '```',
        '',
        '### The teaching point',
        '',
        '- The model does not receive JSON directly',
        '- The chat template turns roles into text',
        '- The final text becomes token IDs',
        '- With `assistant_only_loss=True`, loss targets the assistant answer',
        '',
        'If the dataset teaches canonical answers, refusals, and edge cases, SFT learns that observable format. If the dataset is contradictory, the model learns contradiction.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Dataset' }],
        codePanels: [
          {
            title: 'Ver mensagens e chat template',
            description: 'Carrega o dataset Valdoria do Hub e mostra como uma conversa vira texto/token.',
            source: { snippetId: 'sft_trl/data-format', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 2], content: 'Importamos o carregador de datasets e o tokenizador.' },
              { lineRange: [4, 8], content: 'Fixamos modelo, dataset do Hub e carregamos ambos.' },
              { lineRange: [10, 14], content: 'Inspecionamos a primeira conversa no formato `messages`.' },
              { lineRange: [16, 23], content: 'Aplicamos o chat template real do Qwen para produzir texto treinável.' },
              { lineRange: [25, 26], content: 'Tokenizamos o texto final para medir o custo do exemplo.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [{ label: 'Dataset' }],
        codePanels: [
          {
            title: 'Inspect messages and chat template',
            description: 'Loads the Valdoria dataset from the Hub and shows how a conversation becomes text/tokens.',
            source: { snippetId: 'sft_trl/data-format', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 2], content: 'We import the dataset loader and tokenizer.' },
              { lineRange: [4, 8], content: 'We pin the model, Hub dataset, and load both.' },
              { lineRange: [10, 14], content: 'We inspect the first conversation in `messages` format.' },
              { lineRange: [16, 23], content: 'We apply the real Qwen chat template to produce trainable text.' },
              { lineRange: [25, 26], content: 'We tokenize the final text to measure example cost.' },
            ],
          },
        ],
      },
    },
  },
});
