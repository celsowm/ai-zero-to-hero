import * as webllm from '@mlc-ai/web-llm';

const engine = await webllm.CreateMLCEngine('Llama-3-8B-q4f16_1-webgpu');

const chunks = await engine.chat.completions.create({
  messages: [{ role: 'user', content: 'Hello!' }],
  stream: true
});

for await (const chunk of chunks) {
  process.stdout.write(chunk.choices[0].delta.content || "");
}
