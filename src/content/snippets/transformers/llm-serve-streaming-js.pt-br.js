import OpenAI from 'openai';

// 1. Configurar o cliente
const openai = new OpenAI({
  baseURL: "http://localhost:8000/v1",
  apiKey: "zero-to-hero",
  dangerouslyAllowBrowser: true
});

async function main() {
  // 2. Iniciar a stream
  const stream = await openai.chat.completions.create({
    model: "Qwen/Qwen3-0.5B",
    messages: [{ role: "user", content: "O que é streaming?" }],
    stream: true, // Ativa Server-Sent Events (SSE)
  });

  // 3. Consumir chunks via loop assíncrono
  process.stdout.write("Resposta: ");
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    process.stdout.write(content);
  }
  console.log("\n[Fim]");
}

main();
