import { defineSlide } from './_factory';

export const pythonIntro = defineSlide({
  id: 'python-intro',
  type: 'two-column',
  options: {
    "columnRatios": [
      1,
      1
    ]
  },
  content: {
    'pt-br': {
      title: `Python: O Motor da Inteligência Artificial`,
      body: `Python não é apenas uma linguagem; é o ecossistema que viabiliza a IA moderna. Sua sintaxe limpa permite focar na lógica matemática e nos dados, não em burocracias de baixo nível.

### 📦 Instalação Oficial
1. Acesse **[python.org](https://www.python.org/downloads/)** e baixe a versão estável mais recente (3.10+).
2. **Windows:** Marque obrigatoriamente a opção **"Add Python to PATH"**.
3. **Verificação:** No terminal/PowerShell, digite \`python --version\`.

### 📝 O primeiro "Olá Mundo" (Na mão)
Não precisa de IDE para começar. Tente isto:
1. Abra o **Bloco de Notas** (Win) ou **TextEdit** (Mac).
2. Digite: \`print("Olá, IA!")\`.
3. Salve como \`hello.py\` em sua pasta de preferência.
4. No terminal, navegue até a pasta e digite:
   \`\`\`bash
   python hello.py
   \`\`\`

> Se o terminal responder com a mensagem, seu ambiente está pronto!

---

### 🛠️ Onde escrever seu código?
Para produtividade real, use ferramentas que entendem o código:

1. **[VS Code](https://code.visualstudio.com/) (O Padrão Gold)**
   - Instale as extensões \`Python\` e \`Jupyter\`.
   - Gratuito, leve e extremamente poderoso.

2. **[Cursor](https://cursor.com/) (O Editor de IA)**
   - Um fork do VS Code com IA nativa que ajuda a programar.
   - Recomendado para quem quer acelerar o aprendizado.

3. **[PyCharm](https://www.jetbrains.com/pycharm/) (IDE Profissional)**
   - Robusta, com excelente suporte a refatoração.

### 🐍 Isolamento de Projetos
Para evitar que uma biblioteca quebre outra, usamos ambientes virtuais:
\`\`\`bash
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
.venv\\Scripts\\activate     # Windows
\`\`\``,
      codeExplanations: [

  ],
    },
    'en-us': {
      title: `Python: The Engine of Artificial Intelligence`,
      body: `Python is not just a language; it's the ecosystem that enables modern AI. Its clean syntax allows focusing on mathematical logic and data, rather than low-level boilerplate.

### 📦 Official Installation
1. Go to **[python.org](https://www.python.org/downloads/)** and download the latest stable version (3.10+).
2. **Windows:** You MUST check **"Add Python to PATH"**.
3. **Verification:** In your terminal/PowerShell, type \`python --version\`.

### 📝 Your first "Hello World" (Manual)
You don't need an IDE to start. Try this:
1. Open **Notepad** (Win) or **TextEdit** (Mac).
2. Type: \`print("Hello, AI!")\`.
3. Save as \`hello.py\` in your favorite folder.
4. In the terminal, navigate to the folder and type:
   \`\`\`bash
   python hello.py
   \`\`\`

> If the terminal prints the message, your environment is ready!

---

### 🛠️ Where to write your code?
For real productivity, use tools that understand your code:

1. **[VS Code](https://code.visualstudio.com/) (The Gold Standard)**
   - Install \`Python\` and \`Jupyter\` extensions.
   - Free, lightweight, and extremely powerful.

2. **[Cursor](https://cursor.com/) (The AI Editor)**
   - A VS Code fork with native AI that helps you code.
   - Recommended for those who want to accelerate learning.

3. **[PyCharm](https://www.jetbrains.com/pycharm/) (Professional IDE)**
   - Robust, with excellent refactoring support.

### 🐍 Project Isolation
To prevent libraries from conflicting, we use virtual environments:
\`\`\`bash
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
.venv\\Scripts\\activate     # Windows
\`\`\``,
      codeExplanations: [

  ],
    },
  },
});
