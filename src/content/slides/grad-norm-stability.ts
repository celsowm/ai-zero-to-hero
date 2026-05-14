import { defineSlide } from './_factory';

export const gradNormStability = defineSlide({
  id: 'grad-norm-stability',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Estabilidade: Grad Norm e Learning Rate`,
      body: `Como saber se o treino está estável ou prestes a quebrar? Olhamos para a "física" da atualização dos pesos.

### 1. Grad Norm
Mede o tamanho das correções que o otimizador quer aplicar.
*   **Saudável:** Valores controlados (ex: 5 a 30).
*   **Perigoso:** Picos gigantes (100+) ou \`NaN\`.

### 2. Learning Rate (LR)
O LR é o acelerador. Usamos um **Scheduler** para mudar a velocidade:
*   **Warmup:** Começa devagar.
*   **Decay:** Diminui no final.

---

### Sinais de Estabilidade
*   🟢 **Estável:** Grad Norm oscilando entre 10 e 20.
*   🟡 **Alerta:** Picos súbitos de 80+ seguidos de queda.
*   🔴 **Crítico:** Grad Norm ou Loss vira \`NaN\`.
*   📈 **Scheduler:** LR sobe no início e desce no fim.

> Se o \`grad_norm\` explodir, reduza o Learning Rate.`,
    },
    'en-us': {
      title: `Stability: Grad Norm and Learning Rate`,
      body: `How do you know if the training is stable or about to break? We look at the "physics" of the weight updates.

### 1. Grad Norm
Measures the size of the corrections the optimizer wants to apply.
*   **Healthy:** Controlled values (e.g., 5 to 30).
*   **Dangerous:** Giant spikes (100+) or \`NaN\`.

### 2. Learning Rate (LR)
LR is the accelerator. We use a **Scheduler** to change the speed:
*   **Warmup:** Starts slowly.
*   **Decay:** Decreases at the end.

---

### Stability Signs
*   🟢 **Stable:** Grad Norm oscillating between 10 and 20.
*   🟡 **Warning:** Sudden spikes of 80+ followed by a drop.
*   🔴 **Critical:** Grad Norm or Loss becomes \`NaN\`.
*   📈 **Scheduler:** LR goes up at the start and down at the end.

> If \`grad_norm\` explodes, reduce the Learning Rate.`,
    },
  },
});
