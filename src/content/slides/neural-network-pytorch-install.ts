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

Sintomas reais de ambiente:
- **\`ModuleNotFoundError: No module named 'torch'\`**: o pacote não foi instalado nesse interpretador.
- **versão instalada mas notebook/script falha igual**: o editor está usando outro Python ou outra \`.venv\`.

> Primeiro instalamos o backend. Depois treinamos e inferimos no mesmo ambiente.`,
    },
    'en-us': {
      title: `First external library: installing \`torch\` with \`pip\``,
      body: `Up to this point the course only used pure Python. Now the first external library appears, and that requires a new step: install the package before importing it.

1. **\`torch\` does not come with Python by default:** if you open a clean project and try \`import torch\`, the usual result is a module-not-found error.

2. **\`pip\` is the package installer for the Python ecosystem:** it downloads the library and registers that installation for the current Python environment.

3. **Recommended base command:** use \`python -m pip install torch\`. This format reduces confusion because it makes sure the \`pip\` belongs to the same Python that will run the code.

4. **After installation, test the import:** before moving to training and inference, it is worth confirming that Python can really see the library.

Real environment symptoms:
- **\`ModuleNotFoundError: No module named 'torch'\`**: the package was not installed into this interpreter.
- **installed version exists but notebook/script still fails**: the editor is using a different Python or a different \`.venv\`.

> Install backend first, then train and infer in the same environment.`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Diagnostico' }],
        codePanel: {
          title: 'Verificacao minima de instalacao',
          description: 'Depois do `pip install`, valide import e versao antes de seguir para treino.',
          source: { snippetId: 'neural-networks/pytorch-version-check', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Importa a biblioteca para confirmar instalacao funcional.' },
            { lineRange: [2, 2], content: 'Mostra a versao carregada no ambiente atual.' },
          ],
        },
        visualPanel: {
          title: 'Sintoma -> causa -> correcao',
          items: [
            { label: 'ModuleNotFoundError', value: 'Causa: torch ausente neste Python. Correcao: instalar com `python -m pip install torch`.' },
            { label: 'Versao aparece no terminal mas nao no editor', value: 'Causa: interpretador diferente. Correcao: selecionar a mesma `.venv` no IDE/notebook.' },
            { label: 'Ambiente limpo', value: 'Use `.venv` para isolar dependencias e reproduzir o mesmo setup.' },
            { label: 'Teste minimo', value: 'Import + `torch.__version__` antes de qualquer script longo.' },
          ],
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Diagnosis' }],
        codePanel: {
          title: 'Minimum installation verification',
          description: 'After `pip install`, validate import and version before any training step.',
          source: { snippetId: 'neural-networks/pytorch-version-check', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Import library to confirm installation actually works.' },
            { lineRange: [2, 2], content: 'Print loaded version from the current environment.' },
          ],
        },
        visualPanel: {
          title: 'Symptom -> cause -> fix',
          items: [
            { label: 'ModuleNotFoundError', value: 'Cause: torch missing in this Python. Fix: install with `python -m pip install torch`.' },
            { label: 'Version shows in terminal but not editor', value: 'Cause: different interpreter. Fix: select the same `.venv` in your IDE/notebook.' },
            { label: 'Clean environment', value: 'Use `.venv` to isolate dependencies and reproduce the same setup.' },
            { label: 'Minimum test', value: 'Run import + `torch.__version__` before any long script.' },
          ],
        },
      },
    },
  },
});
