# Anti-Patterns e Violações de SOLID

Análise completa do codebase **ai-zero-to-hero**.

---

## Sumário

| #  | Categoria | Severidade | Arquivo(s) Principal(is) |
|----|-----------|------------|--------------------------|
| 1  | OCP — SlideFactory switch/case | 🔴 Alta | `components/SlideFactory.tsx` |
| 2  | OCP — Visual Registry boilerplate explosivo | 🔴 Alta | `services/visualRegistry.tsx` |
| 3  | DRY — Union type duplicada (RawSlide vs SlideVisual) | 🟡 Média | `data/course-content.ts`, `types/slide/visuals.ts` |
| 4  | SRP — CourseContext como fachada de re-exports | 🟡 Média | `context/CourseContext.tsx` |
| 5  | God Object — Tipo `SlideVisual` com 50+ membros | 🟡 Média | `types/slide/visuals.ts` |
| 6  | SRP — SearchModal com lógica + UI + portal | 🟡 Média | `components/SearchModal.tsx` |
| 7  | Anti-pattern — `any` explícito em VisualCopy | 🟡 Média | `services/visualRegistry.tsx` |
| 8  | DIP — `usePyodideLoader` acoplado a singleton | 🟢 Baixa | `hooks/usePyodideLoader.ts`, `services/pyodideRunner.ts` |
| 9  | ISP — `useExerciseSession` retorna 13 campos | 🟢 Baixa | `hooks/useExerciseSession.ts` |
| 10 | Anti-pattern — Hardcoded strings i18n inline | 🟢 Baixa | `components/Sidebar.tsx`, `SearchModal.tsx` |
| 11 | Anti-pattern — Legacy façade sem data de remoção | 🟢 Baixa | `hooks/usePyodide.ts` |
| 12 | Anti-pattern — `derivedValueRegistry` hardcoded | 🟢 Baixa | `services/exerciseValidators.ts` |
| 13 | Anti-pattern — Inline styles massivos | 🟢 Baixa | Vários componentes |

---

## 1. 🔴 OCP — `SlideFactory` usa `switch/case` extensível manualmente

**Princípio violado:** Open/Closed Principle (OCP)

**Arquivo:** `src/components/SlideFactory.tsx`

**Problema:** Cada novo tipo de slide exige modificar o `switch/case` dentro do componente. O comentário `// Futuros tipos de slides serão adicionados aqui` é um sintoma clássico — o código sabe que será modificado.

```tsx
switch (slide.type) {
  case 'markdown':
    return <MarkdownSlide content={content} />;
  case 'two-column':
    return <TwoColumnSlide slide={slide} language={language} />;
  // ...cada novo tipo = nova linha aqui
}
```

**Sugestão:** Criar um registry de componentes por `SlideType`, análogo ao `visualRegistry`:

```tsx
const slideRenderers: Record<SlideType, React.FC<SlideProps>> = {
  markdown: MarkdownSlide,
  'two-column': TwoColumnSlide,
  // ...
};
```

---

## 2. 🔴 OCP — `visualRegistry.tsx` com 50+ blocos de boilerplate idênticos

**Princípio violado:** Open/Closed Principle (OCP), DRY

**Arquivo:** `src/services/visualRegistry.tsx` (440 linhas)

**Problema:** Cada visual é registrado com um bloco de ~6 linhas que segue exatamente o mesmo padrão:

```tsx
registerVisual('some-visual', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { SomeVisual } = m;
    return <SomeVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));
```

Este padrão é repetido **50+ vezes**, idêntico exceto pelo nome do componente e o id. Adicionar um novo visual exige copiar mais um bloco.

**Sugestão:** Criar uma função helper genérica e um mapeamento declarativo:

```tsx
const visualMap = {
  'inference-diagram': 'InferenceDiagram',
  'learning-loop-diagram': 'LearningLoopDiagram',
  // ...
} as const;

for (const [id, componentName] of Object.entries(visualMap)) {
  registerVisual(id, () =>
    import('../components/visuals').then(m => ({
      default: createVisualAdapter(m[componentName]),
    }))
  );
}
```

---

## 3. 🟡 DRY — Union type `RawSlide.visual` duplica `SlideVisual`

**Princípio violado:** DRY (Don't Repeat Yourself)

**Arquivos:** `src/data/course-content.ts` (linhas 28-89), `src/types/slide/visuals.ts` (linhas 366-430)

**Problema:** O tipo `RawSlide` em `course-content.ts` redefine manualmente cada variante da union visual (`{ id: '...'; copy: ... }`), espelhando quase 1:1 o tipo `SlideVisual`. Toda vez que um novo visual é adicionado, é necessário atualizar **ambos** os locais.

**Sugestão:** Derivar `RawSlide` diretamente de `SlideVisual` com um mapped type que faz o override apenas do caso `localized-image`:

```tsx
type RawVisual = Exclude<SlideVisual, { id: 'localized-image' }>
  | { id: 'localized-image'; copy: Record<Language, RawLocalizedImageCopy> };

type RawSlide = Omit<ISlide, 'visual'> & { visual?: RawVisual };
```

---

## 4. 🟡 SRP — `CourseContext` como fachada de re-exports

**Princípio violado:** Single Responsibility Principle (SRP)

**Arquivo:** `src/context/CourseContext.tsx`

**Problema:** O arquivo re-exporta hooks de outros contextos:

```tsx
export { useLocale } from './LocaleContext';
export { useNavigation } from './NavigationContext';
export { useUI } from './UIContext';
```

Isso cria um "God Module" onde consumidores importam tudo de um único ponto, criando acoplamento desnecessário e violando a responsabilidade única — `CourseContext` deveria ser responsável apenas pelo contexto de curso.

**Sugestão:** Remover os re-exports e importar diretamente de cada contexto nos consumidores.

---

## 5. 🟡 God Object — `SlideVisual` com 50+ membros na union

**Anti-pattern:** God Type / Shotgun Surgery

**Arquivo:** `src/types/slide/visuals.ts`

**Problema:** A union type `SlideVisual` contém 50+ interfaces individuais, cada uma com 3 linhas boilerplate idênticas (`id` + `copy: Record<Language, XCopy>`). Adicionar um novo visual causa **shotgun surgery** em 4+ arquivos: tipo individual, union, registry, course-content.

Além disso, os últimos 5 membros da union usam tipos placeholder com `WelcomeSynthwaveCopy`:

```tsx
| { id: 'unembedding-diagram'; copy: WelcomeSynthwaveCopy }
| { id: 'temperature-slider-interactive'; copy: WelcomeSynthwaveCopy }
```

Isso é claramente um "hack temporário que se tornou permanente".

**Sugestão:** Usar um tipo genérico `VisualDef<Id, Copy>` e/ou um registry de tipos para reduzir boilerplate.

---

## 6. 🟡 SRP — `SearchModal` mistura lógica de busca, keyboard handling e rendering

**Princípio violado:** Single Responsibility Principle (SRP)

**Arquivo:** `src/components/SearchModal.tsx` (187 linhas)

**Problema:** O componente concentra:
- Lógica de filtragem/busca (`useMemo` com `results`)
- Gerenciamento de keyboard shortcuts (3 `useEffect`s)
- Renderização do modal com inline styles complexos
- Tradução inline hardcoded

**Sugestão:** Extrair:
- `useSearchResults(slides, query, language)` — hook de busca
- `useKeyboardNavigation(results, onSelect)` — hook de teclado
- Componente visual separado do container lógico

---

## 7. 🟡 Anti-pattern — `eslint-disable` e `any` explícito

**Arquivo:** `src/services/visualRegistry.tsx`

```tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VisualCopy = any;
```

**Problema:** O cast `as VisualCopy` (`any`) é usado em todos os 50+ registros de visual, contornando completamente a type-safety. Erros de tipo em dados de visuais não serão detectados pelo TypeScript.

**Sugestão:** Usar generics no `registerVisual` para propagar o tipo correto, ou pelo menos `unknown` com narrowing.

---

## 8. 🟢 DIP — `usePyodideLoader` acoplado a singleton global

**Princípio violado:** Dependency Inversion Principle (DIP)

**Arquivos:** `src/hooks/usePyodideLoader.ts`, `src/services/pyodideRunner.ts`

**Problema:** O hook `usePyodideLoader` importa diretamente a função `getPyodide` do singleton `pyodideRunner`. O serviço `pyodideRunner` mantém estado global mutável (`let pyodideInstance`), tornando testes unitários e mocks difíceis.

```tsx
// pyodideRunner.ts
let pyodideInstance: PyodideInterface | null = null;  // estado global mutável
let loadingPromise: Promise<PyodideInterface> | null = null;
```

**Sugestão:** Injetar a factory de Pyodide via Context ou parâmetro, permitindo mocks em testes.

---

## 9. 🟢 ISP — `useExerciseSession` retorna interface gigante (13 campos)

**Princípio violado:** Interface Segregation Principle (ISP)

**Arquivo:** `src/hooks/useExerciseSession.ts`

**Problema:** O hook retorna 13 propriedades em um único objeto:

```tsx
return {
  code, setCode, output, stderr, results,
  showHints, setShowHints, isRunning, pyodideError,
  allPassed, someFailed, handleRun, handleCheck,
};
```

Consumidores que só precisam de `code` e `setCode` são forçados a depender de toda a interface.

**Sugestão:** Dividir em hooks compostos menores: `useExerciseCode()`, `useExerciseValidation()`, `useExerciseHints()`.

---

## 10. 🟢 Anti-pattern — Hardcoded i18n inline

**Arquivos:** `src/components/Sidebar.tsx`, `SearchModal.tsx`, `SlideVisualRenderer.tsx`

**Problema:** Strings traduzidas são definidas inline com ternários:

```tsx
{language === 'pt-br' ? 'Buscar...' : 'Search...'}
```

```tsx
<div>Carregando visual...</div>  // Hardcoded em português
```

O projeto já tem `src/i18n/messages.ts` para exercícios, mas outros componentes não o utilizam.

**Sugestão:** Centralizar todas as strings de UI no sistema de i18n existente.

---

## 11. 🟢 Anti-pattern — Legacy façade `usePyodide` sem plano de remoção

**Arquivo:** `src/hooks/usePyodide.ts`

```tsx
// Re-export for backward compatibility.
// New code should use usePyodideLoader or useExerciseRunner directly.
```

**Problema:** O arquivo existe apenas como redirect, mas `useExerciseSession.ts` ainda o importa. Não há `@deprecated` tag, issue linkada ou data de remoção — é um "compatibility shim" que tende a ficar para sempre.

**Sugestão:** Migrar o último consumidor (`useExerciseSession`) e deletar o arquivo, ou adicionar `@deprecated` com prazo.

---

## 12. 🟢 Anti-pattern — `derivedValueRegistry` com lógica de negócio hardcoded

**Arquivo:** `src/services/exerciseValidators.ts` (linhas 120-125)

```tsx
const derivedValueRegistry: Record<string, DerivedValueResolver> = {
  bmi: ({ altura, peso }) => peso / ((altura / 100) ** 2),
  bmi_en: ({ height, weight }) => weight / ((height / 100) ** 2),
};
```

**Problema:** Fórmulas de validação de exercício estão hardcoded no serviço de validação. Isso viola OCP — cada nova fórmula exige modificar o validador, em vez de estar definida junto ao exercício.

**Sugestão:** Mover as definições de fórmula para os dados do exercício ou para um módulo separado de fórmulas registráveis.

---

## 13. 🟢 Anti-pattern — Inline styles excessivos

**Arquivos:** `SearchModal.tsx`, `Sidebar.tsx`, `FloatingNavigation.tsx`, `CodeBlock.tsx`, `MarkdownRenderer.tsx`

**Problema:** Componentes usam objetos `style={{...}}` massivos com dezenas de propriedades CSS em vez de utilizar classes Tailwind (que já é uma dependência do projeto) ou CSS modules. Isso dificulta manutenção, reutilização e consistência visual.

Exemplo em `SearchModal.tsx`:
```tsx
style={{
  position: 'fixed', inset: 0, zIndex: 999999,
  display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
  paddingTop: '12vh', paddingLeft: '20px', paddingRight: '20px',
  fontFamily: "'Space Grotesk', sans-serif"
}}
```

**Sugestão:** Migrar gradualmente para classes Tailwind (já disponível) ou para um design token system consistente.

---

## Resumo das Violações SOLID

| Princípio | Violações encontradas |
|-----------|----------------------|
| **S** — Single Responsibility | CourseContext como fachada, SearchModal monolítico |
| **O** — Open/Closed | SlideFactory switch, visualRegistry boilerplate, derivedValueRegistry |
| **L** — Liskov Substitution | ✅ Nenhuma violação identificada |
| **I** — Interface Segregation | useExerciseSession com 13 campos |
| **D** — Dependency Inversion | pyodideRunner singleton acoplado |

---

## Priorização Recomendada

1. **visualRegistry.tsx** — maior impacto, 440 linhas que podem ser reduzidas a ~50
2. **SlideVisual union + RawSlide duplicação** — shotgun surgery em 4 arquivos a cada novo visual
3. **SlideFactory switch/case** — refactor simples para registry pattern
4. **CourseContext re-exports** — remoção dos re-exports (breaking change controlável)
5. **SearchModal** — extração de hooks (refactor de conforto)
