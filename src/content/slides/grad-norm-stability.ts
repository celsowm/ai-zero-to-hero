import { defineSlide } from './_factory';

export const gradNormStability = defineSlide({
  id: 'grad-norm-stability',
  type: 'two-column',
  options: {
    columnRatios: [0.55, 0.45],
  },
  content: {
    'pt-br': {
      title: `Estabilidade: Grad Norm e Learning Rate`,
      body: `Como saber se o treino está estável ou prestes a quebrar? Olhamos para a "física" da atualização dos pesos.

### 1. Grad Norm (Norma do Gradiente)
Mede o tamanho das correções que o otimizador quer aplicar.
*   **Saudável:** Valores finitos e controlados (ex: 5 a 30).
*   **Perigoso:** Picos gigantes (100+) ou valores \`NaN\`/\`inf\`. Isso indica que o treino "explodiu".

### 2. Learning Rate (LR) e Scheduler
O LR é o acelerador. Usamos um **Scheduler** para mudar a velocidade:
*   **Warmup:** Começa bem devagar para não "assustar" o modelo com dados novos.
*   **Cosine Decay:** Diminui o passo no final para o ajuste fino com cuidado.

### Sinais de Estabilidade
*   🟢 **Estável:** Grad Norm oscilando entre 10 e 20.
*   🟡 **Alerta:** Picos súbitos de 80+ seguidos de queda.
*   🔴 **Crítico:** Grad Norm vira NaN e Loss vira NaN.
*   📈 **Scheduler:** LR sobe no início e desce no fim.`,
    },
    'en-us': {
      title: `Stability: Grad Norm and Learning Rate`,
      body: `How do you know if the training is stable or about to break? We look at the "physics" of the weight updates.

### 1. Grad Norm (Gradient Norm)
Measures the size of the corrections the optimizer wants to apply.
*   **Healthy:** Finite and controlled values (e.g., 5 to 30).
*   **Dangerous:** Giant spikes (100+) or \`NaN\`/\`inf\` values. This indicates the training has "exploded."

### 2. Learning Rate (LR) and Scheduler
LR is the accelerator. We use a **Scheduler** to change the speed:
*   **Warmup:** Starts very slowly so as not to "startle" the model with new data.
*   **Cosine Decay:** Decreases the step at the end for the model to do careful fine-tuning.

### Stability Signs
*   🟢 **Stable:** Grad Norm oscillating between 10 and 20.
*   🟡 **Warning:** Sudden spikes of 80+ followed by a drop.
*   🔴 **Critical:** Grad Norm becomes NaN and Loss becomes NaN.
*   📈 **Scheduler:** LR goes up at the start and down at the end.`,
    },
  },
});
