import { defineSlide } from './_factory';

export const pytorchGpt2InferInteractive = defineSlide({
  id: 'pytorch-gpt2-infer-interactive',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Geração interativa / debug token a token',
      body: `Este slide é o mais "debug visual" da parte de inferência.

A geração normal devolve texto final. Mas, para ensinar, às vezes queremos ver o processo token por token: quais candidatos estavam no topo, qual foi sorteado, qual era a probabilidade, qual era o rank, qual foi a entropia, quanto tempo demorou e como top-k/top-p mudaram a distribuição.

O arquivo \`infer/interactive.py\` faz isso. Ele cria um \`TokenGenerator\` que mantém o prompt tokenizado, os tokens gerados, o KV cache, os logits e as probabilidades. A cada \`step()\`, ele calcula a distribuição de sampling, lista candidatos, escolhe ou recebe manualmente um token e devolve métricas.

Didaticamente, esse arquivo é ouro para aula, porque torna a geração observável. Em vez de "o modelo completou uma frase", o aluno vê a sequência de decisões. No projeto, \`TokenGenerator.step()\` retorna um dicionário com \`token_id\`, texto, probabilidade bruta, probabilidade após sampling, rank, surprisal, entropia, massa podada, perplexity, latência e candidatos.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/infer-interactive
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 13], content: 'Docstring e imports: `math`, `time`, `typing`, `torch`, `F`, tipos de tokenizer, `GPT2ForCausalLM` e `KVCache`.' },
        { lineRange: [16, 24], content: '`format_token_bytes`: formata bytes de token para display — EOT, substitui espaços/newlines/tabs, escapa não-printáveis.' },
        { lineRange: [27, 56], content: '`TokenGenerator.__init__`: recebe modelo e prompt. Inicializa vocab_bytes, prompt_tokens, generated_tokens, cache, step_index, logits/probs e cumulative_log_prob. Chama `_forward()`.' },
        { lineRange: [58, 73], content: '`_forward()`: executa forward pass com ou sem cache, armazena logits e raw_probs.' },
        { lineRange: [75, 110], content: '`compute_sampling_distribution()`: aplica temperature scaling, top-k, top-p, retorna sampling_probs, active_tokens_count, pruned_mass.' },
        { lineRange: [112, 139], content: '`get_candidates()`: ordena por sampling ou raw probs, retorna top_n candidatos com rank, token_id, display_text, raw_prob, sampling_prob e logit.' },
        { lineRange: [141, 213], content: '`step()`: calcula sampling_distribution, entropias, candidatos. Escolhe greedy/sampled/manual. Concatena token, atualiza cache, retorna métricas completas.' },
      ],
    },
    'en-us': {
      title: 'Interactive generation / token-by-token debug',
      body: `This slide is the most "visual debug" part of the inference section.

Normal generation returns final text. But for teaching, sometimes we want to see the process token by token: which candidates were at the top, which one was picked, what was the probability, the rank, the entropy, how long it took, and how top-k/top-p changed the distribution.

The \`infer/interactive.py\` file does this. It creates a \`TokenGenerator\` that maintains the tokenized prompt, generated tokens, KV cache, logits, and probabilities. At each \`step()\`, it computes the sampling distribution, lists candidates, picks (or receives manually) a token, and returns metrics.

Didactically, this file is gold for the classroom because it makes generation observable. Instead of "the model completed a sentence", the student sees the sequence of decisions. In the project, \`TokenGenerator.step()\` returns a dictionary with \`token_id\`, text, raw probability, sampling probability, rank, surprisal, entropy, pruned mass, perplexity, latency, and candidates.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/infer-interactive
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 13], content: 'Docstring and imports: `math`, `time`, `typing`, `torch`, `F`, tokenizer types, `GPT2ForCausalLM` and `KVCache`.' },
        { lineRange: [16, 24], content: '`format_token_bytes`: formats token bytes for display — EOT, replaces spaces/newlines/tabs, escapes non-printable chars.' },
        { lineRange: [27, 56], content: '`TokenGenerator.__init__`: receives model and prompt. Initializes vocab_bytes, prompt_tokens, generated_tokens, cache, step_index, logits/probs, and cumulative_log_prob. Calls `_forward()`.' },
        { lineRange: [58, 73], content: '`_forward()`: runs forward pass with or without cache, stores logits and raw_probs.' },
        { lineRange: [75, 110], content: '`compute_sampling_distribution()`: applies temperature scaling, top-k, top-p, returns sampling_probs, active_tokens_count, pruned_mass.' },
        { lineRange: [112, 139], content: '`get_candidates()`: sorts by sampling or raw probs, returns top_n candidates with rank, token_id, display_text, raw_prob, sampling_prob, and logit.' },
        { lineRange: [141, 213], content: '`step()`: computes sampling_distribution, entropies, candidates. Chooses greedy/sampled/manual. Concatenates token, updates cache, returns full metrics.' },
      ],
    },
  },
});

