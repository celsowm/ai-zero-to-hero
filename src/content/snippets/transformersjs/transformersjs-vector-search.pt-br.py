# region: transformersjs-vector-search
import { pipeline } from '@xenova/transformers';

// Vector DB simples no browser: array de { id, text, embedding }
class BrowserVectorDB {
  constructor() {
    this.docs = [];
    this.embedder = null;
  }

  async init() {
    this.embedder = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
  }

  async add(id, text) {
    const output = await this.embedder(text, { pooling: 'mean', normalize: true });
    this.docs.push({ id, text, embedding: Array.from(output.data) });
  }

  search(query, topK = 3) {
    const qOutput = await this.embedder(query, { pooling: 'mean', normalize: true });
    const queryEmb = Array.from(qOutput.data);

    // Cosine similarity (vetores já normalizados = dot product)
    const scored = this.docs.map(doc => ({
      ...doc,
      score: queryEmb.reduce((sum, v, i) => sum + v * doc.embedding[i], 0),
    }));

    return scored.sort((a, b) => b.score - a.score).slice(0, topK);
  }
}

// Uso:
// const db = new BrowserVectorDB();
// await db.init();
// await db.add('doc1', 'O GPT-2 foi criado pela OpenAI');
// await db.add('doc2', 'Python é ótimo para ML');
// console.log(await db.search('Quem criou o GPT?'));
// → [{ id: 'doc1', score: 0.72, text: 'O GPT-2 foi criado pela OpenAI' }]
# endregion
