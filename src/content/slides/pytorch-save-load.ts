import { defineSlide } from './_factory';

export const pytorchSaveLoad = defineSlide({
  id: 'pytorch-save-load',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'Salvar e recarregar checkpoint',
      body: `No slide anterior, rodamos a geração token a token com \`model.eval()\` e \`torch.no_grad()\`. O modelo estava só na memória. Para usar depois, continuar treino ou fazer deploy, precisa **persistir** esse estado treinado em disco.

Checkpoint não é backup eventual. É contrato de continuidade de treino.

Estado mínimo sério:
1. **pesos do modelo** (\`state_dict\`).
2. **estado do otimizador** (momento, acumuladores).
3. **step atual** para retomar agenda de treino.

Aqui, **step** é uma iteração de treino: normalmente \`forward -> loss -> backward -> optimizer.step()\`.
\`epoch\` é uma passada completa pelo dataset de treino; em datasets grandes, uma epoch contém muitos steps.
\`train_step\` é o contador externo que você salva no checkpoint.
\`state["step"]\` dentro do AdamW é o contador interno por parâmetro, usado junto com \`exp_avg\` e \`exp_avg_sq\`.

> Step conta updates. Epoch conta voltas completas no dataset.

\`torch.save(checkpoint, "checkpoint.pt")\` gera um arquivo \`.pt\` no disco com esse dicionário serializado.

Sem estado do otimizador, você "retoma" com outra dinâmica de update.
Sem passo atual, métricas e scheduler ficam inconsistentes.

Dois casos de uso:
- **inferência**: salvar só \`model.state_dict()\` já basta.
- **retomada de treino**: salvar modelo + optimizer + passo + config + metadata do tokenizer.`,
    },
    'en-us': {
      title: 'Save and reload a checkpoint',
      body: `In the previous slide we ran token-by-token generation with \`model.eval()\` and \`torch.no_grad()\`. The model only lived in memory. To use it later, continue training, or deploy it, you need to **persist** that trained state to disk.

Checkpointing is not occasional backup. It is a training continuity contract.

Minimum serious state:
1. **model weights** (\`state_dict\`).
2. **optimizer state** (momenta, accumulators).
3. **current step** to resume the training schedule.

Here, **step** means one training iteration: usually \`forward -> loss -> backward -> optimizer.step()\`.
\`epoch\` means one full pass over the training dataset; on large datasets, one epoch contains many steps.
\`train_step\` is the external counter saved in the checkpoint.
\`state["step"]\` inside AdamW is the internal per-parameter counter, used together with \`exp_avg\` and \`exp_avg_sq\`.

> Step counts updates. Epoch counts full passes over the dataset.

\`torch.save(checkpoint, "checkpoint.pt")\` creates a \`.pt\` file on disk with that serialized dictionary.

Without optimizer state, resume starts with different update dynamics.
Without step metadata, metrics and scheduler become inconsistent.

Two use cases:
- **inference**: saving only \`model.state_dict()\` is enough.
- **training resume**: save model + optimizer + step + config + tokenizer metadata.`,
    },
  },
  visual: {
    id: 'pytorch-checkpoint-explorer',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Explorador' }],
        codePanel: {
          title: 'Checkpoint mínimo',
          description: 'Exemplo executável de save/load com um step real, estado do AdamW e arquivo .pt.',
          source: { snippetId: 'pytorch-lm/save-load', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 9], content: 'Importamos PyTorch, fixamos a seed, criamos um `Linear`, um AdamW e inicializamos `train_step` como contador externo do treino.' },
            { lineRange: [11, 17], content: 'Inspecionamos `model.state_dict()` e o estado inicial do otimizador. Antes de qualquer `optimizer.step()`, o AdamW ainda não criou acumuladores por parâmetro.' },
            { lineRange: [19, 30], content: 'Executamos um step real: dados sintéticos, loss MSE, `zero_grad`, `backward`, `optimizer.step` e incremento de `train_step`.' },
            { lineRange: [32, 38], content: 'Comparamos o peso antes/depois para provar que o update mudou os parâmetros do modelo.' },
            { lineRange: [40, 47], content: 'Depois do primeiro step, o AdamW passa a ter estado interno: `state["step"]`, `exp_avg` e `exp_avg_sq` para cada parâmetro.' },
            { lineRange: [49, 57], content: 'Montamos o checkpoint com modelo, otimizador, `step`, config e tokenizer, então `torch.save` grava esse dicionário no arquivo `checkpoint.pt`.' },
            { lineRange: [59, 68], content: '`torch.load(..., map_location="cpu")` recarrega o `.pt`; em seguida criamos novo modelo/otimizador e restauramos seus estados.' },
            { lineRange: [70, 77], content: 'O step e o learning rate restaurados confirmam o estado operacional; a diferença máxima zero confirma que os pesos foram recuperados.' },
          ],
        },
        explorerPanel: {
          title: 'Anatomia de um checkpoint',
          subtitle: 'Cada seção do dicionário tem um papel específico na continuidade do treino.',
          fileLabel: 'checkpoint.pt',
          whyLabel: 'Por que isso importa',
          missingLabel: 'Se faltar',
          allSectionsLabel: 'Todas as seções',
          timelineLabel: 'Ciclo de vida',
          sections: [
            {
              id: 'model',
              label: 'Pesos do modelo',
              content: "model.state_dict()",
              whyItMatters: 'Contém todos os parâmetros treinados: pesos e biases de cada camada. Sem isso, você não reproduz a função que gera logits.',
              breaksWithout: 'Você não consegue nem fazer inferência. O modelo é um bloco aleatório.',
            },
            {
              id: 'optimizer',
              label: 'Estado do otimizador',
              content: "optimizer.state_dict()",
              whyItMatters: 'Guarda o estado interno do AdamW: `step`, `exp_avg` e `exp_avg_sq`. Sem isso, o próximo update ignora o histórico de gradientes.',
              breaksWithout: 'A curva de loss retoma com outra inércia. O treino perde eficiência.',
            },
            {
              id: 'step',
              label: 'Step de treino',
              content: 'step: train_step',
              whyItMatters: '`step` é a iteração de treino que acabou de rodar: forward, loss, backward e optimizer.step. Esse contador externo orienta logs, scheduler e retomada.',
              breaksWithout: 'Learning rate pode pular para o valor errado. Logs e checkpoints de avaliação ficam inconsistentes.',
            },
            {
              id: 'file',
              label: 'Arquivo .pt',
              content: 'torch.save(checkpoint, "checkpoint.pt")',
              whyItMatters: 'O `.pt` é o arquivo criado no disco. Ele contém o dicionário serializado e pode ser carregado depois com `torch.load`.',
              breaksWithout: 'Você salva pedaços soltos e não consegue recompôr o estado completo de forma confiável.',
            },
          ],
          timelineSteps: [
            { label: 'Treinar', description: 'Rodar forward/backward/step por N iterações. A cada K passos, tiramos um snapshot do estado.' },
            { label: 'Salvar', description: 'Empacotar model.state_dict + optimizer.state_dict + step num dicionário e gravar `checkpoint.pt` com torch.save.' },
            { label: 'Transferir', description: 'O .pt pode ser copiado para outra máquina, Cloud Storage ou registry de modelos.' },
            { label: 'Carregar', description: 'torch.load + model.load_state_dict + optimizer.load_state_dict restaura o estado exato.' },
            { label: 'Retomar', description: 'O scheduler sabe em qual passo estava. A curva de treino continua de onde parou, sem reinício brusco.' },
          ],
          footer: 'Regra: um checkpoint bom permite retomar e obter a mesma curva de treino contínua, como se nunca tivesse parado.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Explorer' }],
        codePanel: {
          title: 'Minimal checkpoint',
          description: 'Executable save/load example with one real step, AdamW state, and a .pt file.',
          source: { snippetId: 'pytorch-lm/save-load', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 9], content: 'We import PyTorch, fix the seed, create a `Linear`, an AdamW optimizer, and initialize `train_step` as the external training counter.' },
            { lineRange: [11, 17], content: 'We inspect `model.state_dict()` and the optimizer initial state. Before any `optimizer.step()`, AdamW has not created per-parameter accumulators yet.' },
            { lineRange: [19, 30], content: 'We run one real step: synthetic data, MSE loss, `zero_grad`, `backward`, `optimizer.step`, and `train_step` increment.' },
            { lineRange: [32, 38], content: 'We compare weights before and after to prove the update changed the model parameters.' },
            { lineRange: [40, 47], content: 'After the first step, AdamW has internal state: `state["step"]`, `exp_avg`, and `exp_avg_sq` for each parameter.' },
            { lineRange: [49, 57], content: 'We assemble the checkpoint with model, optimizer, `step`, config, and tokenizer, then `torch.save` writes that dictionary to `checkpoint.pt`.' },
            { lineRange: [59, 68], content: '`torch.load(..., map_location="cpu")` reloads the `.pt`; then we create a new model/optimizer and restore their states.' },
            { lineRange: [70, 77], content: 'The restored step and learning rate confirm operational state; zero max difference confirms the weights were recovered.' },
          ],
        },
        explorerPanel: {
          title: 'Checkpoint anatomy',
          subtitle: 'Each section of the dictionary has a specific role in training continuity.',
          fileLabel: 'checkpoint.pt',
          whyLabel: 'Why it matters',
          missingLabel: 'If missing',
          allSectionsLabel: 'All sections',
          timelineLabel: 'Lifecycle timeline',
          sections: [
            {
              id: 'model',
              label: 'Model weights',
              content: "model.state_dict()",
              whyItMatters: 'Contains all trained parameters: weights and biases of every layer. Without it, you cannot reproduce the logit-generating function.',
              breaksWithout: 'You cannot even run inference. The model is a random block.',
            },
            {
              id: 'optimizer',
              label: 'Optimizer state',
              content: "optimizer.state_dict()",
              whyItMatters: 'Stores AdamW internal state: `step`, `exp_avg`, and `exp_avg_sq`. Without it, the next update ignores gradient history.',
              breaksWithout: 'The loss curve resumes with wrong inertia. Training loses efficiency.',
            },
            {
              id: 'step',
              label: 'Training step',
              content: 'step: train_step',
              whyItMatters: '`step` is the training iteration that just ran: forward, loss, backward, and optimizer.step. This external counter drives logs, scheduler, and resume.',
              breaksWithout: 'Learning rate may jump to the wrong value. Logs and evaluation checkpoints become inconsistent.',
            },
            {
              id: 'file',
              label: '.pt file',
              content: 'torch.save(checkpoint, "checkpoint.pt")',
              whyItMatters: 'The `.pt` is the file created on disk. It contains the serialized dictionary and can be loaded later with `torch.load`.',
              breaksWithout: 'You save disconnected pieces and cannot reliably reconstruct the complete state.',
            },
          ],
          timelineSteps: [
            { label: 'Train', description: 'Run forward/backward/step for N iterations. Every K steps, take a snapshot of the state.' },
            { label: 'Save', description: 'Pack model.state_dict + optimizer.state_dict + step into a dictionary and write `checkpoint.pt` with torch.save.' },
            { label: 'Transfer', description: 'The .pt can be copied to another machine, Cloud Storage, or model registry.' },
            { label: 'Load', description: 'torch.load + model.load_state_dict + optimizer.load_state_dict restores the exact state.' },
            { label: 'Resume', description: 'The scheduler knows which step we were on. The training curve continues from where it stopped, without abrupt restart.' },
          ],
          footer: 'Rule: a good checkpoint lets you resume and obtain the same continuous training curve, as if it never stopped.',
        },
      },
    },
  },
});
