import { defineSlide } from './_factory';

export const residualStream = defineSlide({
  id: 'residual-stream',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `A via expressa (Conexão Residual)`,
      body: `Com tantas operações pesadas, como garantimos que o significado original da palavra não se perca no meio do caminho? Entra a **Conexão Residual**.

1. **A autoestrada:** imagine uma grande via expressa de dados passando reto do início ao fim do modelo. Esse é o fluxo residual.

2. **Desvios suaves:** a Atenção não substitui os dados da autoestrada. Ela pega uma cópia, processa, e apenas *soma* o resultado de volta na pista principal.

3. **Acúmulo de contexto:** assim, o significado original do token é preservado, e cada bloco apenas adiciona (soma) novas camadas sutis de interpretação.

> O fluxo residual carrega o pensamento principal; os blocos apenas fazem pequenas adições ao longo do caminho.`,
    },
    'en-us': {
      title: `The expressway (Residual Connection)`,
      body: `With so many heavy operations, how do we ensure the word's original meaning is not lost along the way? Enter the **Residual Connection**.

1. **The highway:** imagine a massive data expressway running straight from the beginning to the end of the model. That is the residual stream.

2. **Gentle detours:** Attention does not replace the highway data. It takes a copy, processes it, and merely *adds* the result back into the main lane.

3. **Accumulating context:** this way, the token's original meaning is preserved, and each block just adds (sums) subtle new layers of interpretation.

> The residual stream carries the main thought; blocks merely make small additions along the way.`,
    },
  },
  visual: {
    id: 'residual-stream-highway',
    copy: {
      "pt-br": {
        "highway": "Fluxo Residual (+)",
        "block": "Bloco de Processamento"
      },
      "en-us": {
        "highway": "Residual Stream (+)",
        "block": "Processing Block"
      }
    },
  },
});
