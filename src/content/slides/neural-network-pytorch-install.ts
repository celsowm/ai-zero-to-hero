import { defineSlide } from './_factory';

export const neuralNetworkPytorchInstall = defineSlide({
  id: 'neural-network-pytorch-install',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.56,
      0.44
    ]
  },
  content: {
    'pt-br': {
      title: `Primeira biblioteca externa: instalando \`torch\` com \`pip\``,
      body: `Até aqui o curso usou apenas Python puro. Agora aparece a primeira biblioteca externa, e isso exige um passo novo: instalar o pacote antes de importar.

1. **\`torch\` não vem junto com o Python:** se você abrir um projeto limpo e tentar \`import torch\`, o mais comum é receber erro de módulo não encontrado.

2. **\`pip\` é o instalador de pacotes do ecossistema Python:** ele baixa a biblioteca e registra a instalação para aquele ambiente Python.

3. **O comando-base recomendado:** usar \`python -m pip install torch\`. Esse formato reduz confusão porque garante que o \`pip\` usado pertence ao mesmo Python que vai executar o código.

4. **Depois da instalação, teste o import:** antes de seguir para treino e inferência, vale confirmar se o Python realmente enxerga a biblioteca.

> Primeiro instalamos o backend. Mais à frente, \`transformers\` entra por cima desse mesmo mundo.

---

### No terminal
\`\`\`bash
python -m pip install torch
\`\`\`

### Teste mínimo depois da instalação
\`\`\`python
snippet:neural-networks/pytorch-version-check
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Tenta importar a biblioteca para confirmar que a instalação via pip funcionou.',
        },
        {
          lineRange: [2, 2],
          content: 'Exibe a versão carregada para garantir que o ambiente está correto.',
        },
      ],
    },
    'en-us': {
      title: `First external library: installing \`torch\` with \`pip\``,
      body: `Up to this point the course only used pure Python. Now the first external library appears, and that requires a new step: install the package before importing it.

1. **\`torch\` does not come with Python by default:** if you open a clean project and try \`import torch\`, the usual result is a module-not-found error.

2. **\`pip\` is the package installer for the Python ecosystem:** it downloads the library and registers that installation for the current Python environment.

3. **Recommended base command:** use \`python -m pip install torch\`. This format reduces confusion because it makes sure the \`pip\` belongs to the same Python that will run the code.

4. **After installation, test the import:** before moving to training and inference, it is worth confirming that Python can really see the library.

> First we install the backend. Later, \`transformers\` comes on top of that same world.

---

### In the terminal
\`\`\`bash
python -m pip install torch
\`\`\`

### Minimal test after installation
\`\`\`python
snippet:neural-networks/pytorch-version-check
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Tries to import the library to confirm that the pip installation worked.',
        },
        {
          lineRange: [2, 2],
          content: 'Displays the loaded version to ensure the environment is correct.',
        },
      ],
    },
  },
});
