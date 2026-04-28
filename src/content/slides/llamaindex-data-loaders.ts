import { defineSlide } from './_factory';

export const llamaindexDataLoaders = defineSlide({
  id: 'llamaindex-data-loaders',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Data Loaders: Ingerindo Dados',
      body: `O primeiro passo de qualquer RAG é **carregar seus dados**. O LlamaIndex tem **50+ loaders** para diferentes fontes.

### Loaders mais usados

**SimpleDirectoryReader** — lê todos os arquivos de um diretório:

\`\`\`python
snippet:llamaindex/simple-directory-reader
\`\`\`

**SimpleWebPageReader** — scrapeia páginas web:

\`\`\`python
snippet:llamaindex/simple-web-page-reader
\`\`\`

### Outros loaders importantes

| Loader | Fonte | Caso de uso |
|---|---|---|
| DatabaseReader | SQL | Dados estruturados |
| NotionPageReader | Notion API | Docs de equipe |
| CodeReader | .py, .ts, .js | Codebase RAG |
| PDFReader | PDFs | Papers, manuais |

> O loader retorna uma lista de **Document objects** — cada um com texto + metadata.`,
    },
    'en-us': {
      title: 'Data Loaders: Ingesting Data',
      body: `The first step of any RAG is **loading your data**. LlamaIndex has **50+ loaders** for different sources.

### Most used loaders

**SimpleDirectoryReader** — reads all files in a directory:

\`\`\`python
snippet:llamaindex/simple-directory-reader
\`\`\`

**SimpleWebPageReader** — scrapes web pages:

\`\`\`python
snippet:llamaindex/simple-web-page-reader
\`\`\`

### Other important loaders

| Loader | Source | Use case |
|---|---|---|
| DatabaseReader | SQL | Structured data |
| NotionPageReader | Notion API | Team docs |
| CodeReader | .py, .ts, .js | Codebase RAG |
| PDFReader | PDFs | Papers, manuals |

> The loader returns a list of **Document objects** — each with text + metadata.`,
    },
  },
  visual: {
    id: 'llamaindex-data-loaders-visual',
    copy: {
      'pt-br': {
        title: 'Data Loaders do LlamaIndex',
        directoryLabel: '📁 Diretório',
        webLabel: '🌐 Web',
        databaseLabel: '🗄️ SQL',
        codeLabel: '💻 Código',
        filesLabel: 'Lê .txt, .pdf, .md, .json',
        nodesLabel: 'nodes gerados',
        loaderCount: 'Loader',
      },
      'en-us': {
        title: 'LlamaIndex Data Loaders',
        directoryLabel: '📁 Directory',
        webLabel: '🌐 Web',
        databaseLabel: '🗄️ SQL',
        codeLabel: '💻 Code',
        filesLabel: 'Reads .txt, .pdf, .md, .json',
        nodesLabel: 'nodes generated',
        loaderCount: 'Loader',
      },
    },
  },
});
