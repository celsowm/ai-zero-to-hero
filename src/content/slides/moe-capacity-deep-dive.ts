import { defineSlide } from './_factory';

export const moeCapacityDeepDive = defineSlide({
  id: 'moe-capacity-deep-dive',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'Expert Capacity: O Que Acontece Quando o Expert Está Cheio?',
      body: `Cada expert tem um limite de tokens que consegue processar por batch — isso é o **expert capacity**.

### Capacity Factor
O capacity factor $C$ multiplica a capacidade esperada:

$$\\text{capacity} = C \\cdot \\frac{\\text{batch\\_size} \\cdot \\text{seq\\_len}}{\\text{num\\_experts}}$$

- $C = 1.0$: capacidade exata (arriscado — tokens podem ser dropped)
- $C = 1.25$: 25% de margem (padrão em Mixtral)
- $C = 2.0$: dobro da capacidade (conservativo, mas desperdiça memória)

### Tokens Dropped
Quando um expert recebe mais tokens do que comporta:
1. Os tokens **excedentes são descartados** — não são processados.
2. O output para esses tokens é **zero** (ou o embedding residual puro).
3. Isso cria um **gradiente de pressão** durante o treinamento: o roteador aprende a não sobrecarregar um único expert.

### O Problema do "Expert Death"
Se um expert nunca recebe tokens (ou recebe muito poucos):
- Seus gradientes não atualizam → **morre por negligência**.
- O modelo efetivamente perde parâmetros.
- O auxiliary loss tenta prevenir isso penalizando distribuição desigual.

### Capacidade na Prática
| Capacity Factor | Tokens Dropped | Memória |
| :--- | :--- | :--- |
| 1.0 | ~5-10% | Mínima |
| 1.25 | ~1-3% | Moderada |
| 2.0 | ~0% | Máxima |

> **Interaja →** O visual ao lado simula o roteamento de tokens para experts com capacidade limitada.`,
    },
    'en-us': {
      title: 'Expert Capacity: What Happens When an Expert Is Full?',
      body: `Each expert has a limit on how many tokens it can process per batch — this is **expert capacity**.

### Capacity Factor
The capacity factor $C$ multiplies the expected capacity:

$$\\text{capacity} = C \\cdot \\frac{\\text{batch\\_size} \\cdot \\text{seq\\_len}}{\\text{num\\_experts}}$$

- $C = 1.0$: exact capacity (risky — tokens may be dropped)
- $C = 1.25$: 25% margin (default in Mixtral)
- $C = 2.0$: double capacity (conservative, but wastes memory)

### Dropped Tokens
When an expert receives more tokens than it can handle:
1. **Excess tokens are dropped** — not processed.
2. The output for these tokens is **zero** (or pure residual embedding).
3. This creates a **pressure gradient** during training: the router learns not to overload a single expert.

### The "Expert Death" Problem
If an expert never receives tokens (or receives too few):
- Its gradients don't update → **dies by neglect**.
- The model effectively loses parameters.
- The auxiliary loss tries to prevent this by penalizing uneven distribution.

### Capacity in Practice
| Capacity Factor | Dropped Tokens | Memory |
| :--- | :--- | :--- |
| 1.0 | ~5-10% | Minimal |
| 1.25 | ~1-3% | Moderate |
| 2.0 | ~0% | Maximum |

> **Interact →** The visual on the right simulates token routing to experts with limited capacity.`,
    },
  },
  visual: {
    id: 'moe-capacity-visual',
    copy: {
      'pt-br': {
        title: 'Simulador de Expert Capacity',
        subtitle: 'Tokens sendo roteados com capacidade limitada',
        batchSizeLabel: 'Batch Size',
        seqLenLabel: 'Seq Length',
        capacityFactorLabel: 'Capacity Factor',
        numExpertsLabel: 'Num Experts',
        tokenLabel: 'Token',
        expertLabel: 'Expert',
        capacityLabel: 'Capacidade',
        droppedLabel: 'Dropped',
        processedLabel: 'Processados',
        overflowLabel: 'Overflow',
        totalTokensLabel: 'Total Tokens',
        droppedCountLabel: 'Tokens Perdidos',
        efficiencyLabel: 'Eficiência',
        warningTitle: 'Atenção',
        warningLowCapacity: 'Capacity baixo — muitos tokens sendo perdidos!',
        warningHighCapacity: 'Capacity alto — memória desperdiçada.',
        warningOptimal: 'Capacity balanceado — poucos ou nenhum token perdido.',
      },
      'en-us': {
        title: 'Expert Capacity Simulator',
        subtitle: 'Tokens being routed with limited capacity',
        batchSizeLabel: 'Batch Size',
        seqLenLabel: 'Seq Length',
        capacityFactorLabel: 'Capacity Factor',
        numExpertsLabel: 'Num Experts',
        tokenLabel: 'Token',
        expertLabel: 'Expert',
        capacityLabel: 'Capacity',
        droppedLabel: 'Dropped',
        processedLabel: 'Processed',
        overflowLabel: 'Overflow',
        totalTokensLabel: 'Total Tokens',
        droppedCountLabel: 'Dropped Tokens',
        efficiencyLabel: 'Efficiency',
        warningTitle: 'Warning',
        warningLowCapacity: 'Low capacity — many tokens being dropped!',
        warningHighCapacity: 'High capacity — memory being wasted.',
        warningOptimal: 'Capacity balanced — few or no tokens dropped.',
      },
    },
  },
});
