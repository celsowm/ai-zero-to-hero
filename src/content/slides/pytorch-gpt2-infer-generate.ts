import { defineSlide } from './_factory';

export const pytorchGpt2InferGenerate = defineSlide({
  id: 'pytorch-gpt2-infer-generate',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Loop autoregressivo',
      body: `Agora que sabemos escolher o próximo token, precisamos repetir isso várias vezes.

O arquivo \`infer/generate.py\` contém o loop autoregressivo. Ele recebe um prompt já tokenizado, chama o GPT, pega os logits da última posição, usa o sampler para escolher o próximo token, concatena esse token ao contexto e repete.

Esse slide é fundamental porque mostra a diferença entre treino e geração.

No treino, o modelo recebe \`x\` e compara todos os próximos tokens contra \`y\` em paralelo. Na geração, ele só precisa da última distribuição para escolher **um** próximo token por vez.

Também aparece aqui o KV cache. Sem cache, a cada novo token o modelo reprocessa toda a janela. Com cache, ele reaproveita K e V das posições anteriores e passa só o token novo quando possível. No projeto, o loop mantém \`full_idx\`, \`window_idx\` e \`cache\`; quando \`use_cache=True\`, usa o último token depois que o cache já existe.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/infer-generate
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 65], content: '`generate()`: loop autoregressivo com suporte a KV cache. Recebe prompt tokenizado, gera tokens um a um, gerencia window_idx e cache, suporta EOS.' },
      ],
    },
    'en-us': {
      title: 'Autoregressive loop',
      body: `Now that we know how to pick the next token, we need to repeat it many times.

The \`infer/generate.py\` file contains the autoregressive loop. It receives a tokenized prompt, calls GPT, takes the logits from the last position, uses the sampler to pick the next token, concatenates it to the context, and repeats.

This slide is fundamental because it shows the difference between training and generation.

During training, the model receives \`x\` and compares all next tokens against \`y\` in parallel. During generation, it only needs the last distribution to pick **one** next token at a time.

KV cache also appears here. Without cache, each new token makes the model reprocess the entire window. With cache, it reuses K and V from previous positions and only passes the new token when possible. In the project, the loop maintains \`full_idx\`, \`window_idx\`, and \`cache\`; when \`use_cache=True\`, it uses the last token after the cache exists.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/infer-generate
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 65], content: '`generate()`: autoregressive loop with KV cache support. Takes tokenized prompt, generates one token at a time, manages window_idx and cache, supports EOS.' },
      ],
    },
  },
});

