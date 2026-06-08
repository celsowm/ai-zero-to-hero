import OpenAI from 'openai';

// 1. Setup the client
const openai = new OpenAI({
  baseURL: "http://localhost:8000/v1",
  apiKey: "zero-to-hero",
  dangerouslyAllowBrowser: true
});

async function main() {
  // 2. Start the stream
  const stream = await openai.chat.completions.create({
    model: "Qwen/Qwen3-0.5B",
    messages: [{ role: "user", content: "What is streaming?" }],
    stream: true, // Enables Server-Sent Events (SSE)
  });

  // 3. Consume chunks via async loop
  process.stdout.write("Response: ");
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    process.stdout.write(content);
  }
  console.log("\n[End]");
}

main();
