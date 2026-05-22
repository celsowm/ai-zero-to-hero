import { defineSlide } from './_factory';

export const neuralNetworkPytorchInstall = defineSlide({
  id: 'neural-network-pytorch-install',
  type: 'two-column',
  options: {
    columnRatios: [0.4, 0.6],
  },
  content: {
    'pt-br': {
      title: 'Primeira biblioteca externa: instalando `torch` com `pip`',
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
      title: 'First external library: installing `torch` with `pip`',
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
    id: 'pytorch-decision-matrix',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Diagnóstico' }],
        codePanel: {
          title: 'Verificação mínima de instalação',
          description: 'Depois do `pip install`, valide import e versao antes de seguir para treino.',
          source: { snippetId: 'neural-networks/pytorch-version-check', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Importa a biblioteca para confirmar instalação funcional.' },
            { lineRange: [2, 2], content: 'Mostra a versão carregada no ambiente atual.' },
          ],
        },
        matrixPanel: {
          title: 'Sintoma -> causa -> correção',
          subtitle: 'Instalar PyTorch quase nunca falha por "mistério". Quase sempre é ambiente, interpretador ou wheel errada.',
          columns: ['Causa provável', 'Correção', 'Como validar'],
          callouts: [
            { label: 'Comando-base', value: 'Use `python -m pip install torch` para amarrar o pip ao mesmo interpretador que vai rodar o código.' },
            { label: 'Ambiente', value: 'Prefira `.venv` desde o primeiro install para evitar dependência espalhada entre Python global e editor.' },
          ],
          rows: [
            { label: 'ModuleNotFoundError', cells: ['O pacote não foi instalado neste interpretador.', 'Rode `python -m pip install torch` no ambiente certo.', 'Abra o mesmo Python e teste `import torch`.'] },
            { label: 'Versão aparece no terminal mas não no editor', cells: ['Terminal e IDE estão apontando para Pythons diferentes.', 'Selecione a mesma `.venv` no notebook, VS Code ou PyCharm.', 'Compare o caminho do interpretador nos dois lados.'] },
            { label: 'Ambiente novo', cells: ['Ainda não há dependências registradas para o projeto.', 'Crie e ative uma `.venv` antes do install.', 'Instale e rode `torch.__version__` dentro dela.'] },
            { label: 'Teste mínimo', cells: ['Você ainda não confirmou que o install funciona de verdade.', 'Faça import e imprima versão antes de qualquer script longo.', 'Se isso falhar, o resto do projeto vai falhar também.'] },
          ],
          footer: 'Regra prática: só avance para treino ou inferência depois que import e versão funcionarem no mesmo ambiente em que você vai executar o modelo.',
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
        matrixPanel: {
          title: 'Symptom -> cause -> fix',
          subtitle: 'PyTorch installation problems are rarely mysterious. They are usually interpreter, environment, or wheel mismatches.',
          columns: ['Likely cause', 'Fix', 'How to validate'],
          callouts: [
            { label: 'Base command', value: 'Use `python -m pip install torch` so pip is tied to the same interpreter that will run the code.' },
            { label: 'Environment', value: 'Prefer a `.venv` from day one to avoid mixing global Python, editor settings, and project dependencies.' },
          ],
          rows: [
            { label: 'ModuleNotFoundError', cells: ['The package is missing from this interpreter.', 'Run `python -m pip install torch` in the correct environment.', 'Open that same Python and test `import torch`.'] },
            { label: 'Version shows in terminal but not editor', cells: ['Terminal and IDE point to different Pythons.', 'Select the same `.venv` in the notebook, VS Code, or PyCharm.', 'Compare interpreter paths on both sides.'] },
            { label: 'Fresh environment', cells: ['No dependencies have been installed for this project yet.', 'Create and activate a `.venv` before installing.', 'Install and run `torch.__version__` inside it.'] },
            { label: 'Minimum test', cells: ['You have not confirmed the install actually works.', 'Run import plus version print before any long script.', 'If that fails, everything else will fail too.'] },
          ],
          footer: 'Practical rule: do not move to training or inference until import and version work in the exact environment that will run the model.',
        },
      },
    },
  },
});
