import { defineSlide } from './_factory';

export const pytorchExercisesLanguageModeling = defineSlide({
  id: 'pytorch-exercises-language-modeling',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercícios: Sequência Integrada de LM em PyTorch',
      body: 'Uma sequência única e progressiva: base de embedding, projeção para logits e mecânica central de modelagem de linguagem (máscara causal, top-k, perplexidade e amostragem).',
    },
    'en-us': {
      title: 'Exercises: Integrated PyTorch LM Sequence',
      body: 'A single progressive sequence: embedding base, projection to logits, and core language modeling mechanics (causal mask, top-k, perplexity, and sampling).',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Bateria Única: Da Base ao Próximo Token',
        description: 'Construa uma trilha curta e contínua, da entrada por embedding até a decisão final de token.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Perfeito! Você consolidou a sequência essencial de LM em PyTorch.',
        errorMessage: 'A sequência falhou em algum ponto. Revise shapes, máscara e lógica de decisão de token.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Embedding lookup',
            instructions: 'Crie `wte = nn.Embedding(V, C)` e aplique em `idx`. Salve em `H` com shape `(B,T,C)`.',
            snippetId: 'pytorch-exercises-architecture-2',
            validators: [
              { type: 'assertVariable', variableName: 'H_shape', expectedValue: [2, 3, 4] },
              { type: 'assertVariable', variableName: 'embedding_weight_shape', expectedValue: [10, 4] },
            ],
            hints: ['Embedding recebe IDs `torch.long`.', 'A tabela tem shape `(V,C)`.'],
          },
          {
            id: '2. Projeção e Softmax',
            instructions: 'Calcule `logits = x @ w.t() + b` e depois salve em `probs` o `torch.softmax(logits, dim=-1)`.',
            snippetId: 'pytorch-exercises-training-1',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'probs',
                expectedValue: [0.9241, 0.0759],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `torch.softmax(logits, dim=-1)`.'],
          },
          {
            id: '3. Máscara Causal (Look-Ahead)',
            instructions: 'O script fornece `size`. Gere uma matriz quadrada triangular inferior de `1s` e `0s` chamada `mask`. Use `torch.tril` e `torch.ones`.',
            snippetId: 'pytorch-exercises-language-modeling-1',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'mask',
                expectedValue: [[1, 0, 0], [1, 1, 0], [1, 1, 1]],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `torch.tril(torch.ones(size, size))`.'],
          },
          {
            id: '4. Top-K Logits Filtering',
            instructions: 'Dados `logits` e `k`, mantenha em `filtered` apenas os `k` maiores valores. Substitua os outros por `-inf`. Use `torch.topk` para achar o corte.',
            snippetId: 'pytorch-exercises-language-modeling-2',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'filtered',
                expectedValue: [null, 4.5, null, null, 3.8],
                tolerance: 0.001,
              },
            ],
            hints: ['`cutoff = torch.topk(logits, k).values[-1]`.'],
          },
          {
            id: '5. Perplexidade (PPL)',
            instructions: 'O script fornece `loss_val`. Calcule a perplexidade em `ppl` usando a fórmula `exp(loss)`. Use `torch.exp`.',
            snippetId: 'pytorch-exercises-language-modeling-3',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'ppl',
                expectedValue: 10.0,
                tolerance: 0.001,
              },
            ],
            hints: ['PPL é a exponencial da cross-entropy.'],
          },
          {
            id: '6. Amostragem Multinomial',
            instructions: 'Dadas as probabilidades `probs`, sorteie o índice de UM token em `sampled_idx`. Use `torch.multinomial(probs, num_samples=1)`.',
            snippetId: 'pytorch-exercises-language-modeling-4',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'sampled_idx',
                expectedValue: 1,
                tolerance: 0.001,
              },
            ],
            hints: ['Retorne apenas o valor numérico usando `.item()`.'],
          },
        ],
      },
      'en-us': {
        title: 'Single Battery: From Base to Next Token',
        description: 'Build one short continuous track, from embedding input to final token decision.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Perfect! You consolidated the essential LM sequence in PyTorch.',
        errorMessage: 'The sequence failed at some step. Recheck shapes, mask logic, and token decision flow.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Embedding lookup',
            instructions: 'Create `wte = nn.Embedding(V, C)` and apply it to `idx`. Save `H` with shape `(B,T,C)`.',
            snippetId: 'pytorch-exercises-architecture-6',
            validators: [
              { type: 'assertVariable', variableName: 'H_shape', expectedValue: [2, 3, 4] },
              { type: 'assertVariable', variableName: 'embedding_weight_shape', expectedValue: [10, 4] },
            ],
            hints: ['Embedding receives `torch.long` IDs.', 'The table shape is `(V,C)`.'],
          },
          {
            id: '2. Projection and Softmax',
            instructions: 'Compute `logits = x @ w.t() + b` and then save `torch.softmax(logits, dim=-1)` into `probs`.',
            snippetId: 'pytorch-exercises-training-5',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'probs',
                expectedValue: [0.9241, 0.0759],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `torch.softmax(logits, dim=-1)`.'],
          },
          {
            id: '3. Causal Mask (Look-Ahead)',
            instructions: 'The script provides `size`. Generate a square lower triangular matrix of `1s` and `0s` called `mask`. Use `torch.tril` and `torch.ones`.',
            snippetId: 'pytorch-exercises-language-modeling-5',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'mask',
                expectedValue: [[1, 0, 0], [1, 1, 0], [1, 1, 1]],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `torch.tril(torch.ones(size, size))`.'],
          },
          {
            id: '4. Top-K Logits Filtering',
            instructions: 'Given `logits` and `k`, keep only the top `k` values in `filtered`. Replace others with `-inf`. Use `torch.topk` to find the cutoff.',
            snippetId: 'pytorch-exercises-language-modeling-6',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'filtered',
                expectedValue: [null, 4.5, null, null, 3.8],
                tolerance: 0.001,
              },
            ],
            hints: ['`cutoff = torch.topk(logits, k).values[-1]`.'],
          },
          {
            id: '5. Perplexity (PPL)',
            instructions: 'The script provides `loss_val`. Calculate perplexity in `ppl` using `exp(loss)`. Use `torch.exp`.',
            snippetId: 'pytorch-exercises-language-modeling-7',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'ppl',
                expectedValue: 10.0,
                tolerance: 0.001,
              },
            ],
            hints: ['PPL is the exponential of cross-entropy.'],
          },
          {
            id: '6. Multinomial Sampling',
            instructions: 'Given `probs`, sample ONE token index into `sampled_idx`. Use `torch.multinomial(probs, num_samples=1)`.',
            snippetId: 'pytorch-exercises-language-modeling-8',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'sampled_idx',
                expectedValue: 1,
                tolerance: 0.001,
              },
            ],
            hints: ['Return only the numeric value using `.item()`.'],
          },
        ],
      },
    },
  },
});
