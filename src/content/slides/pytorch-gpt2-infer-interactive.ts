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
        { lineRange: [1, 35], content: '`TokenGenerator.__init__`: recebe model e prompt, tokeniza, armazena cache e window_idx. Chama `_forward()` para obter logits iniciais do prompt.' },
        { lineRange: [37, 73], content: '`compute_sampling_distribution`: aplica temperatura e filtros top-k/top-p, retorna as probabilidades de sampling, contagem de tokens ativos e massa de probabilidade podada.' },
        { lineRange: [75, 111], content: '`step()`: calcula distribuição de sampling, escolhe token (manual, greedy ou amostrado) e retorna dicionário com `token_id`, `method`, `active_tokens`, `pruned_mass` entre outras métricas.' },
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
        { lineRange: [1, 35], content: '`TokenGenerator.__init__`: receives model and prompt, tokenizes, stores cache and window_idx. Calls `_forward()` to get initial logits from the prompt.' },
        { lineRange: [37, 73], content: '`compute_sampling_distribution`: applies temperature and top-k/top-p filters, returns sampling probabilities, active token count, and pruned probability mass.' },
        { lineRange: [75, 111], content: '`step()`: computes sampling distribution, picks token (manual, greedy, or sampled), and returns dictionary with `token_id`, `method`, `active_tokens`, `pruned_mass`, and other metrics.' },
      ],
    },
  },
});
