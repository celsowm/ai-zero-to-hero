# region: transformersjs-embeddings
import { pipeline } from '@xenova/transformers';

// Load embedding model in the browser
const embedder = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2'
);

const documents = [
  'GPT-2 was released by OpenAI in 2019.',
  'JavaScript is the most popular web language.',
  'The 2022 World Cup was held in Qatar.',
];

// Generate embeddings (384-dimensional vectors)
for (const doc of documents) {
  const output = await embedder(doc, { pooling: 'mean', normalize: true });
  const embedding = Array.from(output.data);
  console.log(`${doc.substring(0, 30)}... → [${embedding.length} dimensions]`);
}

// Output:
// GPT-2 was released by OpenAI... → [384 dimensions]
// JavaScript is the most popula... → [384 dimensions]
// The 2022 World Cup was held... → [384 dimensions]

// Each document becomes a semantic vector — ready for vector search.
# endregion
