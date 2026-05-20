import { defineSlide } from './_factory';

export const neuralNetworkPytorchTraining = defineSlide({
  id: 'neural-network-pytorch-training',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Loop de treino para next-token',
      body: `O treino de language model segue o mesmo esqueleto do PyTorch, com um detalhe central: o target e a sequencia deslocada.

Ponte com regressao:
- antes usamos **MSE (Mean Squared Error / Erro Medio Quadratico)** para prever valor continuo;
- agora usamos **CE (Cross-Entropy / Entropia Cruzada)** para classificar o proximo token.

Em ambos os casos, a estrutura e a mesma: \`forward -> loss -> backward -> step\`.

Checklist:

1. pegar \`x\` e \`y\`
2. chamar \`model(x, y)\`
3. zerar gradiente
4. fazer backward
5. atualizar pesos

Ponte importante: esses \`x/y\` sao exatamente o batch deslocado do slide \`pytorch-token-batch\`.`,
    },
    'en-us': {
      title: 'Training loop for next-token prediction',
      body: `Language-model training follows the standard PyTorch loop, with one central twist: the target is the shifted sequence.

Bridge from regression:
- before, we used **MSE (Mean Squared Error)** for continuous-value prediction;
- now, we use **CE (Cross-Entropy)** for next-token classification.

In both cases, the mechanics stay the same: \`forward -> loss -> backward -> step\`.

Checklist:

1. fetch \`x\` and \`y\`
2. call \`model(x, y)\`
3. zero gradients
4. run backward
5. update weights

Important bridge: these \`x/y\` tensors are exactly the shifted batch from the \`pytorch-token-batch\` slide.`,
    },
  },
  visual: {
    id: 'pytorch-execution-pipeline',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Dependencias' }],
        codePanel: {
          title: 'Treino end-to-end minimo',
          description: 'Batch deslocado, modelo, cross-entropy, update e uma predicao final no mesmo fluxo.',
          source: { snippetId: 'pytorch-lm/lm-training-e2e', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: 'Importamos PyTorch, camadas de rede e a funcao de cross-entropy para fechar o ciclo de treino.' },
            { lineRange: [5, 11], content: 'Definimos vocabulario, batch deslocado (`x`,`y`), modelo minimo e optimizer para um caso real de treino.' },
            { lineRange: [13, 19], content: 'Cada passo executa forward, calcula loss, limpa gradiente, roda backward, aplica update com `step()` e reporta a loss.' },
            { lineRange: [21, 26], content: 'No final, inspecionamos uma predicao em `no_grad()` para confirmar o pipeline completo: treina e depois infere.' },
          ],
        },
        pipelinePanel: {
          title: 'Dependencias do loop de treino',
          subtitle: 'A ordem importa, mas ela depende de um batch deslocado e de um loss bem formado.',
          steps: [
            { label: 'batch deslocado', shape: 'x,y -> (B,T)', body: '`x` e `y` não são dois tensores arbitrários: `y` é a sequência deslocada que ensina próximo token.', risk: 'Se targets não estiverem deslocados, o modelo aprende a copiar a posição errada.' },
            { label: 'model(x, y)', body: 'O forward produz logits. A loss usa CE (cross-entropy), enquanto na regressao usavamos MSE (mean squared error).', risk: 'Sem saber qual loss esta em jogo, o aluno nao entende o que esta sendo otimizado.' },
            { label: 'zero_grad()', body: 'Zera o buffer antes de propagar o erro do batch atual.', risk: 'Sem isso, um batch invade o próximo e polui a leitura do update.' },
            { label: 'backward()', body: 'A loss empurra sinal de correção para cada parâmetro treinável.', risk: 'Backward sem loss coerente só propaga um erro mal definido.' },
            { label: 'step()', body: 'O optimizer aplica o ajuste e fecha o ciclo treino -> erro -> correção.', risk: 'Se a loss não cai, quase sempre o problema está no batch, no contrato do forward ou na ordem do loop.' },
          ],
          failureTitle: 'Bugs que travam o treino',
          failureModes: [
            { label: 'Target errado', value: 'O batch não foi deslocado como next-token training exige.' },
            { label: 'Loop fora de ordem', value: 'A chamada do optimizer não reflete o batch atual.' },
            { label: 'Loss plana', value: 'Pode ser bug de dados, de targets ou de forward, antes de ser “modelo ruim”.' },
          ],
          mentalModelTitle: 'Modelo mental',
          mentalModel: [
            'LM training é o loop padrão do PyTorch com targets deslocados.',
            'O contrato do forward une inferência e treino na mesma assinatura.',
            'Sem batch certo, nenhum optimizer “conserta” o experimento.',
          ],
          footer: 'Diagnostico rapido: loss nao cai -> verificar ordem do loop e se `targets` estao deslocados.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Dependencies' }],
        codePanel: {
          title: 'Minimal end-to-end training',
          description: 'Shifted batch, model, cross-entropy, weight updates, and a final prediction in one flow.',
          source: { snippetId: 'pytorch-lm/lm-training-e2e', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: 'We import PyTorch, neural layers, and cross-entropy to close the full training cycle.' },
            { lineRange: [5, 11], content: 'We define vocabulary, shifted batch (`x`,`y`), a minimal model, and an optimizer for a real trainable setup.' },
            { lineRange: [13, 19], content: 'Each step runs forward, computes loss, clears gradients, runs backward, applies `step()`, and logs loss.' },
            { lineRange: [21, 26], content: 'At the end, we inspect one prediction under `no_grad()` to confirm the full path: train first, infer next.' },
          ],
        },
        pipelinePanel: {
          title: 'Training-loop dependencies',
          subtitle: 'Order matters, but it depends on a shifted batch and a correctly formed loss.',
          steps: [
            { label: 'shifted batch', shape: 'x,y -> (B,T)', body: '`x` and `y` are not arbitrary tensors: `y` is the shifted sequence that teaches next-token prediction.', risk: 'If targets are not shifted, the model learns the wrong position-to-target alignment.' },
            { label: 'model(x, y)', body: 'Forward gives logits. Loss uses CE (cross-entropy), while regression used MSE (mean squared error).', risk: 'If the learner does not know which loss is active, optimization logic becomes opaque.' },
            { label: 'zero_grad()', body: 'Clears buffers before propagating the current batch error.', risk: 'Without it, one batch leaks into the next and pollutes update meaning.' },
            { label: 'backward()', body: 'Loss pushes correction signals into each trainable parameter.', risk: 'Backward with incoherent loss only propagates a poorly defined error.' },
            { label: 'step()', body: 'The optimizer applies the update and closes the loop: training -> error -> correction.', risk: 'If loss does not fall, the bug is often in data, targets, or loop order before it is “the model”.' },
          ],
          failureTitle: 'Bugs that stall training',
          failureModes: [
            { label: 'Wrong target', value: 'The batch was not shifted the way next-token training requires.' },
            { label: 'Wrong order', value: 'Optimizer execution no longer reflects the current batch.' },
            { label: 'Flat loss', value: 'Often a data, target, or forward-contract bug before it is a weak model.' },
          ],
          mentalModelTitle: 'Mental model',
          mentalModel: [
            'LM training is standard PyTorch loop logic plus shifted targets.',
            'The forward contract unifies inference and training under one signature.',
            'Without the right batch, no optimizer can rescue the experiment.',
          ],
          footer: 'Quick diagnosis: loss not decreasing -> check loop order and shifted targets.',
        },
      },
    },
  },
});
