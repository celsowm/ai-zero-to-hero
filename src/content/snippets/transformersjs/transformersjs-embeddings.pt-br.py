# region: transformersjs-embeddings
import { pipeline } from '@xenova/transformers';

// Carregar modelo de embedding no browser
const embedder = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2'
);

const documentos = [
  'O GPT-2 foi lançado pela OpenAI em 2019.',
  'JavaScript é a linguagem mais popular da web.',
  'A Copa do Mundo de 2022 foi no Catar.',
];

// Gerar embeddings (vetores de 384 dimensões)
for (const doc of documentos) {
  const output = await embedder(doc, { pooling: 'mean', normalize: true });
  const embedding = Array.from(output.data);
  console.log(`${doc.substring(0, 30)}... → [${embedding.length} dimensões]`);
}

// Output:
// O GPT-2 foi lançado pela Open... → [384 dimensões]
// JavaScript é a linguagem mais... → [384 dimensões]
// A Copa do Mundo de 2022 foi n... → [384 dimensões]

// Cada documento vira um vetor semântico — pronto para busca vetorial.
# endregion
