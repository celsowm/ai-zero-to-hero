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
        { lineRange: [3, 21], content: 'Função `generate` com `@torch.no_grad()`. Parâmetros: model, idx tokenizado, `max_new_tokens`, temperatura, filtros, `use_cache`, `eos_token_id`. Inicializa `full_idx`, `window_idx` (limitado a `block_size`) e `cache` como None.' },
        { lineRange: [23, 54], content: 'Loop principal: se `use_cache` e cache existe, passa só o último token. Caso contrário, passa a janela completa. Extrai logits da última posição, chama `sample_next_token`, concatena com `torch.cat`. Verifica EOS e mantém `window_idx` dentro de `block_size`.' },
        { lineRange: [56, 56], content: 'Retorna `full_idx` com prompt original + tokens gerados.' },
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
        { lineRange: [3, 21], content: '`generate` function with `@torch.no_grad()`. Parameters: model, tokenized idx, `max_new_tokens`, temperature, filters, `use_cache`, `eos_token_id`. Initializes `full_idx`, `window_idx` (limited to `block_size`), and `cache` as None.' },
        { lineRange: [23, 54], content: 'Main loop: if `use_cache` and cache exists, passes only the last token. Otherwise passes the full window. Extracts last-position logits, calls `sample_next_token`, concatenates with `torch.cat`. Checks EOS and keeps `window_idx` within `block_size`.' },
        { lineRange: [56, 56], content: 'Returns `full_idx` with original prompt + generated tokens.' },
      ],
    },
  },
});
