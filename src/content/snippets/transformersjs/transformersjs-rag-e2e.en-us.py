# region: transformersjs-rag-e2e
import { pipeline } from '@xenova/transformers';

// Complete RAG in the browser: embeddings + search + generation — zero server
class BrowserRAG {
  async init() {
    // Two Transformers.js models running in the browser
    this.embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    this.generator = await pipeline('text-generation', 'Xenova/Llama-3.2-1B-Instruct');
    this.docs = [];
  }

  // PHASE 1: Index documents
  async ingest(documents) {
    for (const [id, text] of Object.entries(documents)) {
      const out = await this.embedder(text, { pooling: 'mean', normalize: true });
      this.docs.push({ id, text, embedding: Array.from(out.data) });
    }
    console.log(`✅ ${this.docs.length} documents indexed (browser-only)`);
  }

  // PHASES 2-4: Retrieve → Augment → Generate
  async query(question, topK = 3) {
    // RETRIEVE
    const qOut = await this.embedder(question, { pooling: 'mean', normalize: true });
    const qEmb = Array.from(qOut.data);
    const results = this.docs
      .map(d => ({ ...d, score: qEmb.reduce((s, v, i) => s + v * d.embedding[i], 0) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    // AUGMENT
    const context = results.map(r => r.text).join('\n');
    const prompt = `Context:\n${context}\n\nQuestion: ${question}\nAnswer:`;

    // GENERATE (runs in browser via ONNX Runtime Web)
    const output = await this.generator(prompt, { max_new_tokens: 80 });
    return output[0].generated_text.replace(prompt, '').trim();
  }
}

// Usage:
// const rag = new BrowserRAG();
// await rag.init();
// await rag.ingest({
//   'd1': 'The 2022 World Cup was in Qatar.',
//   'd2': 'Argentina defeated France on penalties.',
// });
// const answer = await rag.query('Who won the 2022 World Cup?');
// console.log(answer);
// → "Argentina won the 2022 World Cup, defeating France on penalties."
# endregion
