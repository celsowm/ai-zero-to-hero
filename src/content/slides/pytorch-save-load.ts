import { defineSlide } from './_factory';

export const pytorchSaveLoad = defineSlide({
  id: 'pytorch-save-load',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'Salvar e recarregar checkpoint',
      body: `No slide anterior, rodamos a geração token a token com \`model.eval()\` e \`torch.no_grad()\`. O modelo estava na memória. Se fechar o notebook ou quiser fazer deploy, precisa **persistir** esse estado treinado.

Checkpoint não é backup eventual. É contrato de continuidade de treino.

Estado mínimo sério:
1. **pesos do modelo** (\`state_dict\`).
2. **estado do otimizador** (momento, acumuladores).
3. **passo/época atual** para retomar agenda de treino.

Sem estado do otimizador, você "retoma" com outra dinâmica de update.
Sem passo atual, métricas e scheduler ficam inconsistentes.

Dois casos de uso:
- **inferência**: salvar só \`model.state_dict()\` já basta.
- **retomada de treino**: salvar modelo + optimizer + passo + config + metadata do tokenizer.`,
    },
    'en-us': {
      title: 'Save and reload a checkpoint',
      body: `In the previous slide we ran token-by-token generation with \`model.eval()\` and \`torch.no_grad()\`. The model lived in memory. If you close the notebook or want to deploy, you need to **persist** that trained state.

Checkpointing is not occasional backup. It is a training continuity contract.

Minimum serious state:
1. **model weights** (\`state_dict\`).
2. **optimizer state** (momenta, accumulators).
3. **current step/epoch** to resume training schedule.

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
          description: 'Exemplo curto de save/load com modelo, otimizador e passo.',
          source: { snippetId: 'pytorch-lm/save-load', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Criamos modelo e otimizador porque checkpoint de treino precisa dos dois estados, não só dos pesos.' },
            { lineRange: [6, 12], content: 'Montamos um dicionário com pesos, otimizador, passo, config e metadata do tokenizer para retomada consistente.' },
            { lineRange: [14, 21], content: '`torch.save` serializa o payload, `torch.load` recarrega em CPU, e os estados são restaurados no modelo e otimizador.' },
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
              whyItMatters: 'Guarda momento e acumuladores do Adam/W. Sem eles, o próximo update ignora o histórico de gradientes — como começar do zero no meio da corrida.',
              breaksWithout: 'A curva de loss retoma com outra inércia. O treino perde eficiência.',
            },
            {
              id: 'step',
              label: 'Passo / época',
              content: 'step: 120',
              whyItMatters: 'Metadado operacional: qual passo da agenda de treino? Scheduler (cosine, step) depende desse valor para definir a taxa de aprendizado correta.',
              breaksWithout: 'Learning rate pode pular para o valor errado. Logs e checkpoints de avaliação ficam inconsistentes.',
            },
            {
              id: 'file',
              label: 'Container .pt',
              content: 'torch.save(checkpoint, "checkpoint.pt")',
              whyItMatters: 'O arquivo .pt é só um container de serialização (zip/torchScript). Guarda tudo junto para transferência entre execuções e máquinas.',
              breaksWithout: 'Você salva pedaços soltos e não consegue recompôr o estado completo de forma confiável.',
            },
          ],
          timelineSteps: [
            { label: 'Treinar', description: 'Rodar forward/backward/step por N iterações. A cada K passos, tiramos um snapshot do estado.' },
            { label: 'Salvar', description: 'Empacotar model.state_dict + optimizer.state_dict + step num dicionário e serializar com torch.save.' },
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
          description: 'Short save/load example with model, optimizer, and step metadata.',
          source: { snippetId: 'pytorch-lm/save-load', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'We instantiate model and optimizer because training checkpoints must preserve both, not just weights.' },
            { lineRange: [6, 12], content: 'We assemble a payload with weights, optimizer, step, config, and tokenizer metadata for consistent resume.' },
            { lineRange: [14, 21], content: '`torch.save` serializes the payload, `torch.load` reloads on CPU, and states are restored into model and optimizer.' },
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
              whyItMatters: 'Stores Adam/W momenta and accumulators. Without them, the next update ignores gradient history — like starting from zero mid-race.',
              breaksWithout: 'The loss curve resumes with wrong inertia. Training loses efficiency.',
            },
            {
              id: 'step',
              label: 'Step / epoch',
              content: 'step: 120',
              whyItMatters: 'Operational metadata: which step of the schedule are we on? Scheduler (cosine, step) depends on this value to set the correct learning rate.',
              breaksWithout: 'Learning rate may jump to the wrong value. Logs and evaluation checkpoints become inconsistent.',
            },
            {
              id: 'file',
              label: '.pt container',
              content: 'torch.save(checkpoint, "checkpoint.pt")',
              whyItMatters: 'The .pt file is just a serialization container (zip/torchScript). It holds everything together for transfer across runs and machines.',
              breaksWithout: 'You save disconnected pieces and cannot reliably reconstruct the complete state.',
            },
          ],
          timelineSteps: [
            { label: 'Train', description: 'Run forward/backward/step for N iterations. Every K steps, take a snapshot of the state.' },
            { label: 'Save', description: 'Pack model.state_dict + optimizer.state_dict + step into a dictionary and serialize with torch.save.' },
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
