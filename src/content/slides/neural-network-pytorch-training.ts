import { defineSlide } from './_factory';

export const neuralNetworkPytorchTraining = defineSlide({
  id: 'neural-network-pytorch-training',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Loop de treino para next-token',
      body: `O loop de treino de um language model é o loop padrão do PyTorch, com uma diferença prática: o target é a sequência deslocada.

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
      body: `A language-model training loop is the standard PyTorch loop, with one practical twist: the target is the shifted sequence.

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
          title: 'Modelo minimo treinavel',
          description: 'Classe pequena com `Embedding`, `lm_head` e `forward(idx, targets)` que retorna logits e loss.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Importamos o necessario para um modelo minimo de linguagem com perda.' },
            { lineRange: [6, 10], content: 'Embedding e `lm_head` ja montam um LM treinavel.' },
            { lineRange: [11, 14], content: 'O `forward` recebe IDs, produz logits e opcionalmente devolve loss.' },
          ],
        },
        pipelinePanel: {
          title: 'Dependencias do loop de treino',
          subtitle: 'A ordem importa, mas ela depende de um batch deslocado e de um loss bem formado.',
          steps: [
            { label: 'batch deslocado', shape: 'x,y -> (B,T)', body: '`x` e `y` não são dois tensores arbitrários: `y` é a sequência deslocada que ensina próximo token.', risk: 'Se targets não estiverem deslocados, o modelo aprende a copiar a posição errada.' },
            { label: 'model(x, y)', body: 'O forward devolve logits sempre e loss quando os targets existem.', risk: 'Ler esse forward como “caixa-preta” apaga a ponte entre batch deslocado e critério de erro.' },
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
          title: 'Minimal trainable model',
          description: 'Small class with `Embedding`, `lm_head`, and `forward(idx, targets)` returning logits and loss.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'We import what is needed for a tiny language model with loss.' },
            { lineRange: [6, 10], content: 'Embedding and `lm_head` are enough to build a trainable LM.' },
            { lineRange: [11, 14], content: '`forward` receives IDs, produces logits, and optionally returns loss.' },
          ],
        },
        pipelinePanel: {
          title: 'Training-loop dependencies',
          subtitle: 'Order matters, but it depends on a shifted batch and a correctly formed loss.',
          steps: [
            { label: 'shifted batch', shape: 'x,y -> (B,T)', body: '`x` and `y` are not arbitrary tensors: `y` is the shifted sequence that teaches next-token prediction.', risk: 'If targets are not shifted, the model learns the wrong position-to-target alignment.' },
            { label: 'model(x, y)', body: 'Forward always returns logits and returns loss when targets exist.', risk: 'Reading this forward as a black box hides the bridge between shifted data and error criterion.' },
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
