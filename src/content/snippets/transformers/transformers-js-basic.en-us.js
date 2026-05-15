import { pipeline } from '@huggingface/transformers';

const classifier = await pipeline('sentiment-analysis');
const result = await classifier('I love this!');

console.log(result);
// [{ label: 'POSITIVE', score: 0.99 }]
