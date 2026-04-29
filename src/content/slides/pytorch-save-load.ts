import { defineSlide } from './_factory';

export const pytorchSaveLoad = defineSlide({
  id: 'pytorch-save-load',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.48,
      0.52
    ]
  },
  content: {
    'pt-br': {
      title: `Salvando e carregando modelos: \`torch.save\` e \`torch.load\``,
      body: `Até aqui a rede vive só na memória. Feche o terminal e os pesos somem. Para levar o modelo a produção (ou só continuar amanhã) é preciso **persistir** o que foi aprendido.

1. **O que salvar:** não faz sentido gravar o dataset ou o loop de treino. O que importa são os **pesos** — o \`state_dict\` do modelo.

2. **\`torch.save(state_dict, caminho)\`:** grava um dicionário com tensores em disco. A extensão \`.pt\` é convenção, não regra.

3. **\`load_state_dict\` + \`eval()\`:** para usar o modelo salvo, recrie a arquitetura do zero e carregue os pesos. O \`eval()\` desliga dropout e batchnorm de treino.

4. **\`weights_only=True\`:** desde o PyTorch 2.0, carregue sempre com esse flag. Ele impede execução arbitrária de código embutido no arquivo.

> Treinar é caro. Prever é barato. Salvar o modelo é o que conecta os dois.

---

\`\`\`python
snippet:neural-networks/pytorch-save-load
\`\`\`

### O que observar
- \`state_dict()\`: só os pesos, não a classe inteira
- \`weights_only=True\`: segurança contra serializações maliciosas
- \`eval()\`: muda o comportamento de camadas específicas
- o próximo slide exercita tensores; este aqui garante que o treino não se perde`,
      codeExplanations: [
    {
      "lineRange": [1, 13],
      "content": "Definimos a classe do modelo — a arquitetura que existirá de novo na hora de carregar."
    },
    {
      "lineRange": [15, 17],
      "content": "Salvamos o state_dict (os pesos) em disco. Nada de dados ou código do treino."
    },
    {
      "lineRange": [19, 23],
      "content": "Recriamos a arquitetura e carregamos os pesos salvos com load_state_dict."
    },
    {
      "lineRange": [25, 31],
      "content": "Testamos o modelo recarregado com o mesmo paciente para confirmar que a predição sobreviveu."
    }
  ],
    },
    'en-us': {
      title: `Saving and loading models: \`torch.save\` and \`torch.load\``,
      body: `So far the network lives only in memory. Close the terminal and the weights vanish. To take the model to production (or just continue tomorrow) you need to **persist** what was learned.

1. **What to save:** there is no point in writing the dataset or the training loop. What matters are the **weights** — the model's \`state_dict\`.

2. **\`torch.save(state_dict, path)\`:** writes a dictionary of tensors to disk. The \`.pt\` extension is a convention, not a rule.

3. **\`load_state_dict\` + \`eval()\`:** to use the saved model, recreate the architecture from scratch and load the weights. \`eval()\` disables dropout and training-mode batchnorm.

4. **\`weights_only=True\`:** since PyTorch 2.0, always load with this flag. It prevents arbitrary code execution embedded in the file.

> Training is expensive. Prediction is cheap. Saving the model is what connects the two.

---

\`\`\`python
snippet:neural-networks/pytorch-save-load
\`\`\`

### What to watch
- \`state_dict()\`: weights only, not the whole class
- \`weights_only=True\`: security against malicious serializations
- \`eval()\`: changes behavior of specific layers
- the next slide exercises tensors; this one ensures the training isn't lost`,
      codeExplanations: [
    {
      "lineRange": [1, 13],
      "content": "We define the model class — the architecture that will need to exist again at load time."
    },
    {
      "lineRange": [15, 17],
      "content": "We save the state_dict (the weights) to disk. No training data or code."
    },
    {
      "lineRange": [19, 23],
      "content": "We recreate the architecture and load the saved weights with load_state_dict."
    },
    {
      "lineRange": [25, 31],
      "content": "We test the reloaded model with the same patient to confirm the prediction survived."
    }
  ],
    },
  },
});
