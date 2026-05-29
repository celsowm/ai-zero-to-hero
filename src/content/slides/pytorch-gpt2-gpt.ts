import { defineSlide } from './_factory';

export const pytorchGpt2Gpt = defineSlide({
  id: 'pytorch-gpt2-gpt',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'GPT completo',
      body: `Agora as peças viram o modelo completo.

O GPT recebe IDs \`(B, T)\`, cria embeddings de token e posição, passa por blocos Transformer, aplica \`ln_f\` e projeta para logits \`(B, T, V)\`.

Se receber \`targets\`, calcula cross-entropy contra o próximo token esperado.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/gpt
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `torch`, `F` (functional) para cross-entropy, `nn`, `ModelConfig`, e `TransformerBlock`.' },
        { lineRange: [13, 44], content: '`GPT` estende `nn.Module`. `__init__`: guarda config, cria `token_embedding` (vocab_size → n_embd), `position_embedding` (block_size → n_embd), dropout, ModuleList de `TransformerBlock`, `ln_f` (LayerNorm final), `lm_head` (projeção para logits). Se `tie_weights`, compartilha pesos do embedding com o head.' },
        { lineRange: [46, 61], content: '`forward`: recebe `idx (B,T)` e opcionalmente `targets`. Valida sequência não excede `block_size`. Cria posições com `torch.arange`, soma token_emb + pos_emb.' },
        { lineRange: [63, 83], content: 'Passa pela stack de blocos (`for block in self.blocks: x = block(x)`), aplica `ln_f`, projeta com `lm_head` para logits `(B,T,V)`. Se targets existem, calcula cross-entropy flattening T×B juntos. Retorna `(logits, loss)`.' },
      ],
    },
    'en-us': {
      title: 'Complete GPT',
      body: `Now the pieces become the full model.

GPT receives IDs \`(B, T)\`, creates token and position embeddings, passes through Transformer blocks, applies \`ln_f\`, and projects to logits \`(B, T, V)\`.

If it receives \`targets\`, it computes cross-entropy against the expected next token.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/gpt
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `torch`, `F` (functional) for cross-entropy, `nn`, `ModelConfig`, and `TransformerBlock`.' },
        { lineRange: [13, 44], content: '`GPT` extends `nn.Module`. `__init__`: stores config, creates `token_embedding`, `position_embedding`, dropout, ModuleList of `TransformerBlock`, `ln_f`, `lm_head`. If `tie_weights`, shares embedding weights with the head.' },
        { lineRange: [46, 61], content: '`forward`: receives `idx (B,T)` and optionally `targets`. Validates sequence length, creates position tensor, sums token_emb + pos_emb.' },
        { lineRange: [63, 83], content: 'Passes through the block stack (`for block in self.blocks: x = block(x)`), applies `ln_f`, projects with `lm_head` to logits `(B,T,V)`. If targets exist, computes cross-entropy flattening T×B together. Returns `(logits, loss)`.' },
      ],
    },
  },
});
