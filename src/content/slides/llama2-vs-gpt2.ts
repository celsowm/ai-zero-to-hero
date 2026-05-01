import { defineSlide } from './_factory';

export const llama2VsGpt2 = defineSlide({
  id: 'llama2-vs-gpt2',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'GPT-2 → LLaMA 2: 4 Anos de Salto Brutal',
      body: `A arquitetura base é a **mesma** (decoder-only). Mas tudo ao redor mudou radicalmente.

### O Que Realmente Mudou (3 coisas)
1. **Positional Encoding**: Sinusoidal (GPT-2) → **RoPE** (LLaMA). RoPE rotaciona vetores em vez de somar posição fixa — extrapola muito melhor para contextos longos.
2. **Escala**: 1.5B → 70B parâmetros, 40B → 2T tokens. Mais 50x dados e 47x parâmetros. Isso cria **inteligência emergente** que o GPT-2 não tinha.
3. **Alignment (RLHF)**: GPT-2 gera texto sem objetivo. LLaMA 2 foi alinhado com RLHF — segue instruções, faz chat multi-turno, é útil na prática.

### O Que Continuou Igual
- **Arquitetura**: decoder-only, attention full O(n²), feedforward MLP
- **Tokenizer**: BPE (só mudou a biblioteca: GPT-2 → SentencePiece)
- **Training**: autoregressive next-token prediction (mesma loss function)
- **Inference**: sample token → append → repeat (mesmo loop)

### O Que Melhorou Incrementalmente
- Dataset mais limpo (menos lixo da web)
- AdamW em vez de Adam (regularização melhor)
- Context window 4× maior (1024 → 4096)
- Quantização mais madura (GGUF, AWQ, GPTQ)

> A tabela interativa ao lado compara 22 dimensões. Clique em cada linha para detalhes.`,
    },
    'en-us': {
      title: 'GPT-2 → LLaMA 2: 4 Years of Brutal Leap',
      body: `The base architecture is the **same** (decoder-only). But everything around it changed radically.

### What Really Changed (3 things)
1. **Positional Encoding**: Sinusoidal (GPT-2) → **RoPE** (LLaMA). RoPE rotates vectors instead of adding fixed position — extrapolates much better for long contexts.
2. **Scale**: 1.5B → 70B parameters, 40B → 2T tokens. 50x more data and 47x more parameters. This creates **emergent intelligence** that GPT-2 didn't have.
3. **Alignment (RLHF)**: GPT-2 generates text without purpose. LLaMA 2 was aligned with RLHF — follows instructions, does multi-turn chat, is practically useful.

### What Stayed the Same
- **Architecture**: decoder-only, full O(n²) attention, feedforward MLP
- **Tokenizer**: BPE (only changed library: GPT-2 → SentencePiece)
- **Training**: autoregressive next-token prediction (same loss function)
- **Inference**: sample token → append → repeat (same loop)

### What Improved Incrementally
- Cleaner dataset (less web garbage)
- AdamW instead of Adam (better regularization)
- 4× larger context window (1024 → 4096)
- More mature quantization (GGUF, AWQ, GPTQ)

> The interactive table on the right compares 22 dimensions. Click each row for details.`,
    },
  },
  visual: {
    id: 'llama-comparison-table',
    copy: {
      'pt-br': {
        title: 'Comparação GPT-2 vs LLaMA vs LLaMA 2',
        subtitle: '22 dimensões comparativas',
        categoryLabel: 'Categoria',
        gpt2Label: 'GPT-2 (2019)',
        llama1Label: 'LLaMA v1 (2023)',
        llama2Label: 'LLaMA 2 (2023)',
        clickHint: 'Clique para expandir',
        rowYear: 'Ano',
        rowObjective: 'Objetivo',
        rowArchitecture: 'Arquitetura',
        rowPositional: 'Positional Encoding',
        rowParams: 'Parâmetros',
        rowTokens: 'Tokens de Treino',
        rowDataset: 'Dataset',
        rowTokenizer: 'Tokenizer',
        rowContext: 'Context Window',
        rowAttention: 'Attention',
        rowOptimization: 'Otimização',
        rowAlignment: 'Alignment',
        rowInstruction: 'Instruction Following',
        rowCoherence: 'Coerência Longa',
        rowCoding: 'Coding',
        rowHallucination: 'Alucinação',
        rowMultiTurn: 'Multi-turn Chat',
        rowLicense: 'Licença',
        rowLocalDeploy: 'Deploy Local',
        rowQuantization: 'Quantização',
        rowEcosystem: 'Ecossistema',
        rowRealUse: 'Uso Real',
        details: {
          year: { gpt2: '2019 — era pré-ChatGPT. Modelo como demonstração acadêmica.', llama1: '2023 — Meta entra na corrida de LLMs com pesquisa séria.', llama2: '2023 — mesma base, mas com foco em produção.' },
          objective: { gpt2: 'Provar que decoder-only funciona. "GPT" era o foco.', llama1: 'Eficiência: mais performance com menos compute por parâmetro.', llama2: 'Produção open: modelo que empresas podem usar comercialmente.' },
          architecture: { gpt2: 'Transformer decoder-only, 12 camadas no 124M.', llama1: 'Mesma arquitetura base, mas com RMSNorm e SwiGLU.', llama2: 'Igual ao LLaMA v1, apenas refinado.' },
          positional: { gpt2: 'Sinusoidal fixo — não extrapola bem além de 1024 tokens.', llama1: 'RoPE — rotaciona vetores, extrapola naturalmente.', llama2: 'Mesmo RoPE, com fine-tuning de contexto longo.' },
          params: { gpt2: '124M, 355M, 774M, 1.5B — 4 tamanhos.', llama1: '7B, 13B, 33B, 65B — saltou 43× no máximo.', llama2: '7B, 13B, 70B — 70B é o flagship.' },
          tokens: { gpt2: '~40B tokens do WebText.', llama1: '~1-1.4T tokens — 25-35× mais dados.', llama2: '~2T tokens — mais 2× que LLaMA v1.' },
          dataset: { gpt2: 'WebText: páginas de Reddit com 3+ karma. Muito lixo.', llama1: 'Curado: CommonCrawl + papers + código + Wikipedia.', llama2: 'Melhor filtrado, menos conteúdo tóxico.' },
          tokenizer: { gpt2: 'BPE com vocabulário de 50k, implementação própria.', llama1: 'SentencePiece com 32k tokens — mais eficiente.', llama2: 'Mesmo SentencePiece, refinado.' },
          context: { gpt2: '1024 tokens — suficiente para parágrafos.', llama1: '2048-4096 — páginas inteiras.', llama2: '4096, com fine-tuning para até 32k.' },
          attention: { gpt2: 'Full attention O(n²) — gargalo fundamental.', llama1: 'Full O(n²) — sem mudança aqui.', llama2: 'Full O(n²) — ainda o gargalo.' },
          optimization: { gpt2: 'Adam padrão — funcionava mas não era ótimo.', llama1: 'AdamW com weight decay melhor, cosine LR schedule.', llama2: 'Mesmo AdamW, com melhor tuning geral.' },
          alignment: { gpt2: 'Zero — gera qualquer texto sem filtro.', llama1: 'Quase zero — modelo base sem fine-tuning de chat.', llama2: 'RLHF — modelo chat alinhado com feedback humano.' },
          instruction: { gpt2: 'Ruim — não segue instruções, só completa texto.', llama1: 'Médio — com prompt engineering funciona ok.', llama2: 'Bom — segue instruções com boa confiabilidade.' },
          coherence: { gpt2: 'Fraca — perde o fio após 2-3 parágrafos.', llama1: 'Boa — mantém coerência por páginas.', llama2: 'Melhor — mais consistente em contextos longos.' },
          coding: { gpt2: 'Fraco — gera código que raramente funciona.', llama1: 'Ok — funciona para snippets simples.', llama2: 'Melhor — código funcional em muitos casos.' },
          hallucination: { gpt2: 'Muito alta — inventa fatos livremente.', llama1: 'Alta — ainda alucina, mas menos.', llama2: 'Menor — RLHF reduz alucinação, mas não elimina.' },
          multiTurn: { gpt2: 'Não foi projetado para chat.', llama1: 'Limitado — sem fine-tuning de conversação.', llama2: 'Funcional — chat multi-turno real com RLHF.' },
          license: { gpt2: 'Open — mas OpenAI retirou o modelo grande inicialmente.', llama1: 'Restrita — pesquisa acadêmica apenas.', llama2: 'Comercial limitada — uso comercial com restrições.' },
          localDeploy: { gpt2: 'Fácil — 1.5B cabe em GPU consumer.', llama1: 'Mais pesado — 65B precisa de multi-GPU.', llama2: 'Mais pesado — 70B precisa de quantização ou multi-GPU.' },
          quantization: { gpt2: 'Sim — mas ecosistema imaturo na época.', llama1: 'Sim — GPTQ e GGUF surgiram para LLaMA.', llama2: 'Melhor suporte — comunidade já madura em quantização.' },
          ecosystem: { gpt2: 'Pequeno — research e demos.', llama1: 'Crescendo — fine-tunes e adaptações surgindo.', llama2: 'Explodiu — Mistral, CodeLlama, milhares de fine-tunes.' },
          realUse: { gpt2: 'Demo e research — poucas aplicações reais.', llama1: 'Research sério — papers e POCs.', llama2: 'Apps reais — chatbots, coding assistants, RAG.' },
        },
      },
      'en-us': {
        title: 'GPT-2 vs LLaMA vs LLaMA 2 Comparison',
        subtitle: '22 comparative dimensions',
        categoryLabel: 'Category',
        gpt2Label: 'GPT-2 (2019)',
        llama1Label: 'LLaMA v1 (2023)',
        llama2Label: 'LLaMA 2 (2023)',
        clickHint: 'Click to expand',
        rowYear: 'Year',
        rowObjective: 'Objective',
        rowArchitecture: 'Architecture',
        rowPositional: 'Positional Encoding',
        rowParams: 'Parameters',
        rowTokens: 'Training Tokens',
        rowDataset: 'Dataset',
        rowTokenizer: 'Tokenizer',
        rowContext: 'Context Window',
        rowAttention: 'Attention',
        rowOptimization: 'Optimization',
        rowAlignment: 'Alignment',
        rowInstruction: 'Instruction Following',
        rowCoherence: 'Long Coherence',
        rowCoding: 'Coding',
        rowHallucination: 'Hallucination',
        rowMultiTurn: 'Multi-turn Chat',
        rowLicense: 'License',
        rowLocalDeploy: 'Local Deploy',
        rowQuantization: 'Quantization',
        rowEcosystem: 'Ecosystem',
        rowRealUse: 'Real Use',
        details: {
          year: { gpt2: '2019 — pre-ChatGPT era. Model as academic demo.', llama1: '2023 — Meta enters the LLM race with serious research.', llama2: '2023 — same base, but production-focused.' },
          objective: { gpt2: 'Prove decoder-only works. "GPT" was the focus.', llama1: 'Efficiency: more performance with less compute per parameter.', llama2: 'Open production: model companies can use commercially.' },
          architecture: { gpt2: 'Transformer decoder-only, 12 layers in 124M.', llama1: 'Same base architecture, but with RMSNorm and SwiGLU.', llama2: 'Same as LLaMA v1, just refined.' },
          positional: { gpt2: 'Fixed sinusoidal — does not extrapolate well beyond 1024.', llama1: 'RoPE — rotates vectors, extrapolates naturally.', llama2: 'Same RoPE, with long-context fine-tuning.' },
          params: { gpt2: '124M, 355M, 774M, 1.5B — 4 sizes.', llama1: '7B, 13B, 33B, 65B — jumped 43× at max.', llama2: '7B, 13B, 70B — 70B is the flagship.' },
          tokens: { gpt2: '~40B tokens from WebText.', llama1: '~1-1.4T tokens — 25-35× more data.', llama2: '~2T tokens — 2× more than LLaMA v1.' },
          dataset: { gpt2: 'WebText: Reddit pages with 3+ karma. Lots of junk.', llama1: 'Curated: CommonCrawl + papers + code + Wikipedia.', llama2: 'Better filtered, less toxic content.' },
          tokenizer: { gpt2: 'BPE with 50k vocab, own implementation.', llama1: 'SentencePiece with 32k tokens — more efficient.', llama2: 'Same SentencePiece, refined.' },
          context: { gpt2: '1024 tokens — enough for paragraphs.', llama1: '2048-4096 — full pages.', llama2: '4096, with fine-tuning up to 32k.' },
          attention: { gpt2: 'Full attention O(n²) — fundamental bottleneck.', llama1: 'Full O(n²) — no change here.', llama2: 'Full O(n²) — still the bottleneck.' },
          optimization: { gpt2: 'Standard Adam — worked but was not optimal.', llama1: 'AdamW with weight decay, cosine LR schedule.', llama2: 'Same AdamW, with better overall tuning.' },
          alignment: { gpt2: 'Zero — generates any text without filter.', llama1: 'Almost zero — base model without chat fine-tuning.', llama2: 'RLHF — chat model aligned with human feedback.' },
          instruction: { gpt2: 'Poor — does not follow instructions, only completes text.', llama1: 'Medium — works ok with prompt engineering.', llama2: 'Good — follows instructions with decent reliability.' },
          coherence: { gpt2: 'Weak — loses the thread after 2-3 paragraphs.', llama1: 'Good — maintains coherence for pages.', llama2: 'Better — more consistent in long contexts.' },
          coding: { gpt2: 'Weak — generates code that rarely works.', llama1: 'Ok — works for simple snippets.', llama2: 'Better — functional code in many cases.' },
          hallucination: { gpt2: 'Very high — freely invents facts.', llama1: 'High — still hallucinates, but less.', llama2: 'Lower — RLHF reduces hallucination, but does not eliminate.' },
          multiTurn: { gpt2: 'Not designed for chat.', llama1: 'Limited — no conversation fine-tuning.', llama2: 'Functional — real multi-turn chat with RLHF.' },
          license: { gpt2: 'Open — but OpenAI initially withheld the large model.', llama1: 'Restricted — academic research only.', llama2: 'Commercial limited — commercial use with restrictions.' },
          localDeploy: { gpt2: 'Easy — 1.5B fits on consumer GPU.', llama1: 'Heavier — 65B needs multi-GPU.', llama2: 'Heavier — 70B needs quantization or multi-GPU.' },
          quantization: { gpt2: 'Yes — but ecosystem immature at the time.', llama1: 'Yes — GPTQ and GGUF emerged for LLaMA.', llama2: 'Better support — community already mature in quantization.' },
          ecosystem: { gpt2: 'Small — research and demos.', llama1: 'Growing — fine-tunes and adaptations emerging.', llama2: 'Exploded — Mistral, CodeLlama, thousands of fine-tunes.' },
          realUse: { gpt2: 'Demo and research — few real applications.', llama1: 'Serious research — papers and POCs.', llama2: 'Real apps — chatbots, coding assistants, RAG.' },
        },
      },
    },
  },
});
