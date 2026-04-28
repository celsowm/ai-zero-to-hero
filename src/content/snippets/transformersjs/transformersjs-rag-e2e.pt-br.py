# region: transformersjs-rag-e2e
import { pipeline } from '@xenova/transformers';

// RAG completo no browser: embeddings + busca + geração — zero servidor
class BrowserRAG {
  async init() {
    // Dois modelos Transformers.js rodando no browser
    this.embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    this.generator = await pipeline('text-generation', 'Xenova/Llama-3.2-1B-Instruct');
    this.docs = [];
  }

  // FASE 1: Indexar documentos
  async ingest(documents) {
    for (const [id, text] of Object.entries(documents)) {
      const out = await this.embedder(text, { pooling: 'mean', normalize: true });
      this.docs.push({ id, text, embedding: Array.from(out.data) });
    }
    console.log(`✅ ${this.docs.length} documentos indexados (browser-only)`);
  }

  // FASE 2-4: Retrieve → Augment → Generate
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

    // GENERATE (roda no browser via ONNX Runtime Web)
    const output = await this.generator(prompt, { max_new_tokens: 80 });
    return output[0].generated_text.replace(prompt, '').trim();
  }
}

// Uso:
// const rag = new BrowserRAG();
// await rag.init();
// await rag.ingest({
//   'd1': 'A Copa de 2022 foi no Catar.',
//   'd2': 'Argentina venceu a França nos pênaltis.',
// });
// const answer = await rag.query('Quem ganhou a Copa de 2022?');
// console.log(answer);
// → "A Argentina ganhou a Copa de 2022, vencendo a França nos pênaltis."
# endregion
