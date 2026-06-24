import { defineSlide } from './_factory';

export const datasetsHfClient = defineSlide({
  id: 'datasets-hf-client',
  type: 'two-column',
  options: { columnRatios: [0.45, 0.55] },
  content: {
    'pt-br': {
      title: 'Datasets e Hugging Face Hub: do JSONL ao push_to_hub',
      body: [
        'O dataset Valdoria — com seus milhares de exemplos pedagógicos — está no formato JSONL. Mas como transformar isso em algo que o `SFTTrainer`, `DPOTrainer` ou `ORPOTrainer` entendem?',
        '',
        'A Hugging Face oferece duas ferramentas complementares:',
        '',
        '**`datasets`** — biblioteca Python que carrega JSONL, CSV, Parquet e dezenas de outros formatos com `load_dataset()`. Ela baixa do Hub ou lê arquivos locais e devolve um objeto que os Trainers consomem nativamente.',
        '',
        '**`hf` CLI** — a nova ferramenta de linha de comando da Hugging Face (escrita em Rust, sucessora do `huggingface-cli`) para autenticar, gerenciar repositórios e fazer upload de datasets e modelos.',
        '',
        '---',
        '',
        '### Passo a passo',
        '',
        '1. Instalar `datasets` com `pip`',
        '2. Carregar o JSONL com `load_dataset(\'json\', data_files=\'...\')`',
        '3. Instalar o `hf` CLI com o instalador standalone',
        '4. Autenticar com `hf auth`',
        '5. Salvar localmente com `save_to_disk` ou enviar ao Hub com `push_to_hub`',
        '',
        '> O `hf` CLI substitui o antigo `huggingface-cli login`. Ele é mais rápido e tem comandos simplificados como `hf auth` para login interativo.',
      ].join('\n'),
    },
    'en-us': {
      title: 'Datasets and Hugging Face Hub: from JSONL to push_to_hub',
      body: [
        'The Valdoria dataset — with its thousands of pedagogical examples — is in JSONL format. But how do you turn that into something `SFTTrainer`, `DPOTrainer`, or `ORPOTrainer` can understand?',
        '',
        'Hugging Face provides two complementary tools:',
        '',
        '**`datasets`** — a Python library that loads JSONL, CSV, Parquet, and dozens of other formats with `load_dataset()`. It downloads from the Hub or reads local files and returns an object that Trainers consume natively.',
        '',
        '**`hf` CLI** — the new command-line tool from Hugging Face (written in Rust, successor to `huggingface-cli`) for authentication, repository management, and uploading datasets and models.',
        '',
        '---',
        '',
        '### Step by step',
        '',
        '1. Install `datasets` with `pip`',
        '2. Load the JSONL with `load_dataset(\'json\', data_files=\'...\')`',
        '3. Install the `hf` CLI with the standalone installer',
        '4. Authenticate with `hf auth`',
        '5. Save locally with `save_to_disk` or push to the Hub with `push_to_hub`',
        '',
        '> The `hf` CLI replaces the old `huggingface-cli login`. It is faster and has simplified commands like `hf auth` for interactive login.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Instalação e Carga' }, { label: 'CLI e Upload' }],
        codePanels: [
          {
            title: 'Instalar datasets e carregar JSONL',
            description: 'Instala a biblioteca datasets e carrega um arquivo JSONL com load_dataset. O parâmetro split=\'train\' retorna o dataset diretamente.',
            source: { snippetId: 'datasets_hf/load-jsonl', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 1], content: 'Importamos a função `load_dataset` da biblioteca `datasets` da Hugging Face — a principal entrada para carregar datasets no ecossistema HF.' },
              { lineRange: [3, 3], content: '`load_dataset` com `\'json\'` como primeiro parâmetro indica que o arquivo está em formato JSONL (JSON Lines: um objeto por linha, sem colchetes). O caminho pode ser local ou uma URL.' },
              { lineRange: [5, 5], content: '`dataset[0]` exibe o primeiro exemplo. O dataset se comporta como uma lista de dicionários, onde cada chave é uma coluna (ex: prompt, chosen, rejected).' },
            ],
          },
          {
            title: 'CLI, autenticação e upload para o Hub',
            description: 'Instala o hf CLI, autentica e envia o dataset para o Hugging Face Hub ou salva localmente.',
            source: { snippetId: 'datasets_hf/push-to-hub', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 1], content: '`save_to_disk` salva o dataset no formato Arrow da Hugging Face, preservando colunas, tipos e split. Ideal para backup local.' },
              { lineRange: [3, 3], content: '`push_to_hub` envia o dataset para o Hugging Face Hub. Requer login com `hf auth` antes. O nome segue o formato `usuario/nome_do_dataset`.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [{ label: 'Install and Load' }, { label: 'CLI and Upload' }],
        codePanels: [
          {
            title: 'Install datasets and load JSONL',
            description: 'Installs the datasets library and loads a JSONL file with load_dataset. The split=\'train\' parameter returns the dataset directly.',
            source: { snippetId: 'datasets_hf/load-jsonl', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 1], content: 'We import the `load_dataset` function from Hugging Face\'s `datasets` library — the main entry point for loading datasets in the HF ecosystem.' },
              { lineRange: [3, 3], content: '`load_dataset` with `\'json\'` as the first parameter tells it the file is in JSONL format (JSON Lines: one JSON object per line, no brackets). The path can be local or a URL.' },
              { lineRange: [5, 5], content: '`dataset[0]` displays the first example. The dataset behaves like a list of dicts, each key being a column (e.g., prompt, chosen, rejected).' },
            ],
          },
          {
            title: 'CLI, authentication, and upload to the Hub',
            description: 'Installs the hf CLI, authenticates, and pushes the dataset to the Hugging Face Hub or saves locally.',
            source: { snippetId: 'datasets_hf/push-to-hub', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 1], content: '`save_to_disk` saves the dataset in Hugging Face Arrow format, preserving columns, types, and split. Ideal for local backup.' },
              { lineRange: [3, 3], content: '`push_to_hub` uploads the dataset to the Hugging Face Hub. Requires login with `hf auth` beforehand. The name follows the `username/dataset_name` format.' },
            ],
          },
        ],
      },
    },
  },
});
