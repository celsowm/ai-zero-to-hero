import { defineSlide } from './_factory';

export const gpt2PytorchLmHeadGenerate = defineSlide({
  id: 'gpt2-pytorch-lm-head-generate',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'LM head e loop de geração',
      body: `Depois do forward, a geração olha só para a última posição.

Ritmo da geração autoregressiva:

1. rodar o modelo no contexto atual
2. pegar \`logits[:, -1, :]\`
3. transformar em probabilidades
4. amostrar um próximo token

Controles que mudam o comportamento:
- temperatura: mais baixa = mais conservador
- top-k/top-p: limita cauda da distribuicao
- max_new_tokens: controla custo e tamanho da resposta

Efeito tipico dos knobs:
- temperatura baixa + top-k curto = saida repetitiva e segura
- temperatura moderada + top-p = saida mais diversa sem abrir toda a cauda

Problemas comuns:
- repeticao excessiva: temperatura baixa demais
- ruido sem sentido: temperatura alta demais`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/generate
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'Começamos com um prefixo pequeno já tokenizado.' },
        { lineRange: [3, 10], content: 'Cada iteração usa o contexto atual para produzir os logits da próxima decisão, amostrar e anexar o token.' },
      ],
    },
    'en-us': {
      title: 'LM head and the generation loop',
      body: `After the forward pass, generation only cares about the last position.

Rhythm of autoregressive generation:

1. run the model on the current context
2. take \`logits[:, -1, :]\`
3. turn them into probabilities
4. sample the next token

Controls that change behavior:
- temperature: lower = more conservative
- top-k/top-p: trims the distribution tail
- max_new_tokens: controls cost and output length

Typical knob effect:
- low temperature + short top-k = safer but repetitive output
- moderate temperature + top-p = more diverse output without opening the full tail

Common issues:
- excessive repetition: temperature too low
- incoherent noise: temperature too high`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/generate
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'We start from a tiny tokenized prefix.' },
        { lineRange: [3, 10], content: 'Each iteration uses the current context to produce the next logits, sample, and append the token.' },
      ],
    },
  },
});
