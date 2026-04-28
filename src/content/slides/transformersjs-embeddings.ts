import { defineSlide } from './_factory';

export const transformersjsEmbeddings = defineSlide({
  id: 'transformersjs-embeddings',
  type: 'two-column',
  options: {
    "columnRatios": [0.5, 0.5]
  },
  content: {
    'pt-br': {
      title: `Embeddings no Browser com Transformers.js`,
      body: `O mesmo modelo de embeddings que usamos no RAG Python agora roda **100% no browser** — sem servidor, sem API.

### Como funciona

1. **Carrega o modelo via CDN:** o modelo ONNX (~80MB) baixa uma vez e fica em cache no IndexedDB.

2. **Gera embeddings client-side:** cada texto vira um vetor de 384 dimensões rodando na CPU do usuário.

3. **Normalização:** os vetores são normalizados para que cosine similarity seja equivalente a dot product.

### Modelos de embedding populares

- **all-MiniLM-L6-v2**: 384 dim, rápido, bom para maioria dos casos (~80MB)
- **bge-small-en-v1.5**: 384 dim, mais preciso (~130MB)
- **text-embedding-3-small**: via API OpenAI (não roda no browser)

### Performance no browser

- Primeira execução: **2-5 segundos** (download + init)
- Depois: **~50ms** por documento (depende da CPU)
- GPU via WebGPU: **~10ms** por documento (Chrome/Edge)

\`\`\`javascript
snippet:transformersjs/transformersjs-embeddings
\`\`\``,
    },
    'en-us': {
      title: `Embeddings in the Browser with Transformers.js`,
      body: `The same embedding model we used in Python RAG now runs **100% in the browser** — no server, no API.

### How it works

1. **Load model via CDN:** the ONNX model (~80MB) downloads once and gets cached in IndexedDB.

2. **Generate embeddings client-side:** each text becomes a 384-dimensional vector running on the user's CPU.

3. **Normalization:** vectors are normalized so cosine similarity equals dot product.

### Popular embedding models

- **all-MiniLM-L6-v2**: 384 dim, fast, good for most cases (~80MB)
- **bge-small-en-v1.5**: 384 dim, more accurate (~130MB)
- **text-embedding-3-small**: via OpenAI API (doesn't run in browser)

### Browser performance

- First run: **2-5 seconds** (download + init)
- After: **~50ms** per document (depends on CPU)
- GPU via WebGPU: **~10ms** per document (Chrome/Edge)

\`\`\`javascript
snippet:transformersjs/transformersjs-embeddings
\`\`\``,
    },
  },
  visual: {
    id: 'transformersjs-embeddings-visual',
    copy: {
      "pt-br": {
        "title": "Embedding no Browser",
        "doc1Label": "GPT-2 (2019)",
        "doc2Label": "JavaScript web",
        "doc3Label": "Copa 2022",
        "inputLabel": "Texto",
        "modelLabel": "ONNX Model",
        "outputLabel": "Vetor [384]",
        "downloadLabel": "Download (~80MB)",
        "cacheLabel": "Cache IndexedDB",
        "inferLabel": "Inferência ~50ms"
      },
      "en-us": {
        "title": "Embedding in the Browser",
        "doc1Label": "GPT-2 (2019)",
        "doc2Label": "JavaScript web",
        "doc3Label": "World Cup 2022",
        "inputLabel": "Text",
        "modelLabel": "ONNX Model",
        "outputLabel": "Vector [384]",
        "downloadLabel": "Download (~80MB)",
        "cacheLabel": "IndexedDB Cache",
        "inferLabel": "Inference ~50ms"
      }
    },
  },
});
