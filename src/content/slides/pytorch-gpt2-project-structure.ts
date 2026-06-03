import { defineSlide } from './_factory';

const projectTreeHtml = `<style>
.pgs-tree { list-style: none; padding: 0; margin: 0; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 12.5px; line-height: 2.1; color: #e8e4f0; }
.pgs-tree ul { list-style: none; padding-left: 22px; margin: 0; position: relative; }
.pgs-tree ul::before { content: ''; position: absolute; left: 35px; top: 0; bottom: 0; border-left: 1px dashed rgba(0, 229, 255, 0.18); pointer-events: none; }
.pgs-tree li { padding-left: 4px; white-space: nowrap; }
.pgs-tree .ico { display: inline-block; width: 18px; text-align: center; margin-right: 4px; }
.pgs-tree .root { color: #ff2e97; font-weight: 600; }
.pgs-tree .folder { color: #00e5ff; }
.pgs-tree .py { color: #e8e4f0; }
.pgs-tree .yaml { color: #fbbf24; }
.pgs-tree .toml { color: #a855f7; }
.pgs-tree a.link { display: inline-block; margin-left: 6px; text-decoration: none; color: #ff2e97; opacity: 0.55; transition: all 180ms ease; font-size: 11px; }
.pgs-tree a.link:hover { opacity: 1; transform: scale(1.25); }
</style>

<ul class="pgs-tree">
  <li><span class="ico">📁</span><span class="root">&lt;project-name&gt;/</span>
    <ul>
      <li><span class="ico">⚙️</span><span class="toml">pyproject.toml</span><a class="link" href="#/pytorch-gpt2-project-structure">🔗</a></li>
      <li><span class="ico">📁</span><span class="folder">scripts/</span>
        <ul>
          <li><span class="ico">🐍</span><span class="py">train_tokenizer.py</span><a class="link" href="#/pytorch-gpt2-train-tokenizer">🔗</a></li>
          <li><span class="ico">🐍</span><span class="py">prepare_data.py</span><a class="link" href="#/pytorch-gpt2-prepare-data">🔗</a></li>
          <li><span class="ico">🐍</span><span class="py">train.py</span><a class="link" href="#/pytorch-gpt2-train-model">🔗</a></li>
          <li><span class="ico">🐍</span><span class="py">generate.py</span><a class="link" href="#/pytorch-gpt2-script-generate">🔗</a></li>
        </ul>
      </li>
      <li><span class="ico">📁</span><span class="folder">configs/</span>
        <ul>
          <li><span class="ico">📁</span><span class="folder">data/</span>
            <ul>
              <li><span class="ico">📋</span><span class="yaml">hf_text.yaml</span><a class="link" href="#/pytorch-gpt2-yamls">🔗</a></li>
            </ul>
          </li>
          <li><span class="ico">📁</span><span class="folder">model/</span>
            <ul>
              <li><span class="ico">📋</span><span class="yaml">gpt2-small-bpe.yaml</span><a class="link" href="#/pytorch-gpt2-yamls">🔗</a></li>
            </ul>
          </li>
          <li><span class="ico">📁</span><span class="folder">train/</span>
            <ul>
              <li><span class="ico">📋</span><span class="yaml">gpt2-small-bf16.yaml</span><a class="link" href="#/pytorch-gpt2-yamls">🔗</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><span class="ico">📁</span><span class="folder">src/</span>
        <ul>
          <li><span class="ico">🐍</span><span class="py">__init__.py</span></li>
          <li><span class="ico">🐍</span><span class="py">config.py</span><a class="link" href="#/pytorch-gpt2-config">🔗</a></li>
          <li><span class="ico">📁</span><span class="folder">utils/</span>
            <ul>
              <li><span class="ico">🐍</span><span class="py">__init__.py</span></li>
              <li><span class="ico">🐍</span><span class="py">seed.py</span><a class="link" href="#/pytorch-gpt2-config">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">device.py</span><a class="link" href="#/pytorch-gpt2-config">🔗</a></li>
            </ul>
          </li>
          <li><span class="ico">📁</span><span class="folder">train/</span>
            <ul>
              <li><span class="ico">🐍</span><span class="py">__init__.py</span></li>
              <li><span class="ico">🐍</span><span class="py">optimizer.py</span><a class="link" href="#/pytorch-gpt2-optimizer">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">scheduler.py</span><a class="link" href="#/pytorch-gpt2-optimizer">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">checkpoint.py</span><a class="link" href="#/pytorch-gpt2-checkpoint">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">trainer.py</span><a class="link" href="#/pytorch-gpt2-trainer">🔗</a></li>
            </ul>
          </li>
          <li><span class="ico">📁</span><span class="folder">data/</span>
            <ul>
              <li><span class="ico">🐍</span><span class="py">__init__.py</span></li>
              <li><span class="ico">🐍</span><span class="py">text_source.py</span><a class="link" href="#/pytorch-gpt2-text-source">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">tokenizer.py</span><a class="link" href="#/pytorch-gpt2-tokenizer">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">prepare.py</span><a class="link" href="#/pytorch-gpt2-prepare-shards">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">shard_dataset.py</span><a class="link" href="#/pytorch-gpt2-shard-dataset">🔗</a></li>
            </ul>
          </li>
          <li><span class="ico">📁</span><span class="folder">model/</span>
            <ul>
              <li><span class="ico">🐍</span><span class="py">__init__.py</span></li>
              <li><span class="ico">🐍</span><span class="py">mlp.py</span><a class="link" href="#/pytorch-gpt2-mlp">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">attention.py</span><a class="link" href="#/pytorch-gpt2-attention">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">block.py</span><a class="link" href="#/pytorch-gpt2-block">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">gpt.py</span><a class="link" href="#/pytorch-gpt2-gpt">🔗</a></li>
            </ul>
          </li>
          <li><span class="ico">📁</span><span class="folder">infer/</span>
            <ul>
              <li><span class="ico">🐍</span><span class="py">__init__.py</span></li>
              <li><span class="ico">🐍</span><span class="py">sampler.py</span><a class="link" href="#/pytorch-gpt2-infer-sampler">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">generate.py</span><a class="link" href="#/pytorch-gpt2-infer-generate">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">pretrained.py</span><a class="link" href="#/pytorch-gpt2-infer-pretrained">🔗</a></li>
              <li><span class="ico">🐍</span><span class="py">interactive.py</span><a class="link" href="#/pytorch-gpt2-infer-interactive">🔗</a></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>`;

export const pytorchGpt2ProjectStructure = defineSlide({
  id: 'pytorch-gpt2-project-structure',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Estrutura do projeto Python',
      body: `Antes de escrever o GPT, a primeira coisa é transformar a pasta em um projeto Python importável.

\`scripts/\` são comandos de terminal, enquanto \`src/\` é a biblioteca interna do projeto. Essa separação é o ponto importante: comandos ficam na borda, lógica reutilizável fica dentro de \`src/\`.

Os arquivos \`__init__.py\` não têm lógica importante, mas são parte da estrutura de pacote. Eles permitem que Python trate aquelas pastas como módulos importáveis.

O projeto começa com organização: o treino depois vai usar imports limpos, em vez de gambiarra com arquivos soltos.

**Depois de criar a estrutura, lembre-se de rodar ${"\`"}pip install -e .${"\`"} na raiz do projeto** para que os pacotes dentro de ${"\`"}src/${"\`"} fiquem disponíveis para import — sem isso, os ${"\`"}from src.xxx${"\`"} nos scripts vão falhar.`,
    },
    'en-us': {
      title: 'Python project structure',
      body: `Before writing the GPT, the first step is turning the folder into an importable Python project.

\`scripts/\` are terminal commands, while \`src/\` is the internal library. That separation is the important point: commands stay at the edge, reusable logic lives under \`src/\`.

The \`__init__.py\` files have no important logic, but they are part of the package structure. They let Python treat those folders as importable modules.

The project starts with organization: training later will use clean imports instead of loose files.

**After creating the structure, remember to run ${"\`"}pip install -e .${"\`"} at the project root** so that the packages under ${"\`"}src/${"\`"} are available for import — without it, the ${"\`"}from src.xxx${"\`"} in scripts will fail.`,
    },
  },
  visual: {
    id: 'pytorch-dual-code',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Estrutura' },
          { label: 'pyproject.toml' },
        ],
        codePanels: [
          {
            kind: 'html',
            title: 'Árvore do projeto',
            html: projectTreeHtml,
          },
          {
            title: 'pyproject.toml',
            description: 'Manifesto do projeto Python: identidade, dependências, integração com setuptools e pytest.',
            source: { snippetId: 'pytorch_gpt2/project-structure', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 3], content: 'O arquivo `pyproject.toml` é o manifesto do projeto Python. A linha com `#` é só um marcador visual — o TOML ignora comentários.' },
              { lineRange: [4, 6], content: 'Declaração de identidade: nome do pacote, versão semântica e a versão mínima do Python (`>=3.11`). O pip usa isso para saber se o interpretador é compatível.' },
              { lineRange: [8, 13], content: 'Lista de dependências de runtime: torch para os tensores e autograd, numpy para dados numéricos, pyyaml para ler configs de treino, tqdm para barra de progresso.' },
              { lineRange: [15, 19], content: 'Dependências opcionais agrupadas sob `hf`. Só instalam (`pip install .[hf]`) se o aluno for usar Hugging Face Datasets como fonte de texto. Inclui tanto `datasets` quanto `huggingface-hub`.' },
              { lineRange: [21, 22], content: 'Configuração do pytest: `pythonpath = ["src"]` faz com que os imports a partir de `src/` funcionem nos testes sem precisar de variável de ambiente PYTHONPATH.' },
              { lineRange: [24, 25], content: 'Diretiva essencial para o `pip install -e .` funcionar: diz ao setuptools que os módulos Python estão dentro de `src/`, e não na raiz do projeto.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Structure' },
          { label: 'pyproject.toml' },
        ],
        codePanels: [
          {
            kind: 'html',
            title: 'Project tree',
            html: projectTreeHtml,
          },
          {
            title: 'pyproject.toml',
            description: 'Python project manifest: identity, dependencies, setuptools and pytest integration.',
            source: { snippetId: 'pytorch_gpt2/project-structure', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 3], content: 'The `pyproject.toml` file is the Python project manifest. The `#` line is a visual marker — TOML ignores comments.' },
              { lineRange: [4, 6], content: 'Identity declaration: package name, semantic version, and minimum Python version (`>=3.11`). Pip uses this to check interpreter compatibility.' },
              { lineRange: [8, 13], content: 'Runtime dependencies: torch for tensors and autograd, numpy for numeric data, pyyaml for reading training configs, tqdm for progress bars.' },
              { lineRange: [15, 19], content: 'Optional dependencies grouped under `hf`. They only install (`pip install .[hf]`) when using Hugging Face Datasets as the text source. Includes both `datasets` and `huggingface-hub`.' },
              { lineRange: [21, 22], content: 'Pytest configuration: `pythonpath = ["src"]` makes imports from `src/` work in tests without setting the PYTHONPATH environment variable.' },
              { lineRange: [24, 25], content: 'Essential directive for `pip install -e .` to work: tells setuptools that Python modules are inside `src/`, not at the project root.' },
            ],
          },
        ],
      },
    },
  },
});
