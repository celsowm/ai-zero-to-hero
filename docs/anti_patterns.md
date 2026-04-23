# Anti-Patterns Report

> Codebase audit of **ai-zero-to-hero** — a React/TypeScript slide-based course app.

---

## Table of Contents

1. [AP-01 — Massive Inline `style` Objects Instead of CSS/Tailwind](#ap-01--massive-inline-style-objects-instead-of-csstailwind)
2. [AP-02 — Giant Switch-Case Visual Renderer (God Component)](#ap-02--giant-switch-case-visual-renderer-god-component)
3. [AP-03 — Duplicated Visual Union Type in `course-content.ts`](#ap-03--duplicated-visual-union-type-in-course-contentts)
4. [AP-04 — Hardcoded Portuguese Strings in Logic Layers](#ap-04--hardcoded-portuguese-strings-in-logic-layers)
5. [AP-05 — `dangerouslySetInnerHTML` for User-Facing Content](#ap-05--dangerouslysetinnerhtml-for-user-facing-content)
6. [AP-06 — Leftover `console.log` in Production Code](#ap-06--leftover-consolelog-in-production-code)
7. [AP-07 — Duplicate Case Branches in `SlideFactory`](#ap-07--duplicate-case-branches-in-slidefactory)
8. [AP-08 — `dangerouslySetInnerHTML` for CSS Animations (Injecting `<style>` Tags)](#ap-08--dangerouslysetinnerhtml-for-css-animations-injecting-style-tags)
9. [AP-09 — Monolithic Context Provider (God Context)](#ap-09--monolithic-context-provider-god-context)
10. [AP-10 — `FONT_SCALE_BASE` Constant Conflicts with Context `fontScale`](#ap-10--font_scale_base-constant-conflicts-with-context-fontscale)
11. [AP-11 — Accessibility Labels Hardcoded in Portuguese](#ap-11--accessibility-labels-hardcoded-in-portuguese)
12. [AP-12 — No Memoization on Expensive Visual Components](#ap-12--no-memoization-on-expensive-visual-components)
13. [AP-13 — Pyodide Global State Leak Between Exercise Runs](#ap-13--pyodide-global-state-leak-between-exercise-runs)

---

## AP-01 — Massive Inline `style` Objects Instead of CSS/Tailwind

**Severity:** Medium  
**Category:** Maintainability / Consistency

### Description

The project uses Tailwind CSS but the vast majority of styling is done via inline `style={{...}}` objects — often 10–20 properties per element. This is pervasive across `SearchModal.tsx`, `Sidebar.tsx`, `CodeBlock.tsx`, `ExerciseEditor.tsx`, `ExerciseCard.tsx`, `FloatingNavigation.tsx`, `FontSizeControls.tsx`, `MarkdownRenderer.tsx`, and many visual components.

### Why it's a problem

- Violates the project's own convention of using Tailwind (visible in `App.tsx`, `tailwind.config.js`).
- Inline styles can't leverage pseudo-classes (`:hover`, `:focus`), media queries, or dark mode.
- Massively increases JSX verbosity and makes diffs hard to review.
- Prevents style reuse and theming.

### Files affected

- `src/components/SearchModal.tsx` (almost entirely inline styles)
- `src/components/CodeBlock.tsx`
- `src/components/FloatingNavigation.tsx`
- `src/components/FontSizeControls.tsx`
- `src/components/MarkdownRenderer.tsx`
- `src/components/exercise/ExerciseEditor.tsx`
- `src/components/exercise/ExerciseCard.tsx`
- `src/components/SlideFrame.tsx`
- `src/components/SlideCounter.tsx`

---

## AP-02 — Giant Switch-Case Visual Renderer (God Component)

**Severity:** High  
**Category:** Scalability / Open-Closed Principle

### Description

`SlideVisualRenderer.tsx` is a ~180-line switch statement with **50+ cases**, each mapping a `visual.id` string to a component. Every new visual requires editing this file.

### Why it's a problem

- Violates the Open/Closed Principle — the file must change for every new visual.
- Imports **all** visual components eagerly, hurting bundle size.
- The corresponding `RawSlide` type in `course-content.ts` duplicates this list as a union (see AP-03).
- High merge-conflict probability since every contributor touches the same file.

### Files affected

- `src/components/slide-visuals/SlideVisualRenderer.tsx`
- `src/components/visuals/index.ts` (parallel 65-line export barrel)

---

## AP-03 — Duplicated Visual Union Type in `course-content.ts`

**Severity:** Medium  
**Category:** DRY Violation

### Description

`course-content.ts` defines a `RawSlide.visual` type that manually enumerates **every** visual id as a union — duplicating what's already defined in `types/slide/visuals.ts` as the `SlideVisual` union type. Both must be kept in sync manually.

### Why it's a problem

- Two sources of truth for the same information.
- Adding a visual requires updating **three** files: the type in `visuals.ts`, the `RawSlide` union in `course-content.ts`, and the switch in `SlideVisualRenderer.tsx`.

### Files affected

- `src/data/course-content.ts` (lines 20–73)
- `src/types/slide/visuals.ts`

---

## AP-04 — Hardcoded Portuguese Strings in Logic Layers

**Severity:** High  
**Category:** i18n / Localization

### Description

The app supports `pt-br` and `en-us`, yet validation messages, error strings, and some UI labels are hardcoded in Portuguese:

- `exerciseValidators.ts`: `"Saída esperada"`, `"Variável ... não é numérica"`, `"Função ... não encontrada"`, `"Erro na execução"`, `"Tipo de validador desconhecido"`, etc.
- `ExerciseEditor.tsx`: `"Erro"`, `"Execute ou verifique para ver a saída."`
- `ExerciseCard.tsx`: `"Falha ao carregar o interpretador Python"`

### Why it's a problem

- English-speaking users see Portuguese error messages.
- The localization architecture exists (via `Language` type and `copy` props) but is bypassed.

### Files affected

- `src/services/exerciseValidators.ts` (lines 52–204)
- `src/components/exercise/ExerciseEditor.tsx` (lines 148–155)
- `src/components/exercise/ExerciseCard.tsx` (line 138)

---

## AP-05 — `dangerouslySetInnerHTML` for User-Facing Content

**Severity:** Medium  
**Category:** Security / XSS

### Description

`ExerciseCard.tsx` (line 82) renders `exercise.instructions` via `dangerouslySetInnerHTML` with a simple `\n` → `<br/>` replacement. The instructions come from JSON data files that are trusted today, but this pattern is fragile.

### Why it's a problem

- Bypasses React's built-in XSS protection.
- A simple `<br/>` replacement could be done with CSS (`white-space: pre-wrap`) or by splitting into `<p>` tags.

### Files affected

- `src/components/exercise/ExerciseCard.tsx` (line 82)

---

## AP-06 — Leftover `console.log` in Production Code

**Severity:** Low  
**Category:** Code Hygiene

### Description

`CourseContext.tsx` (line 134) has `console.log('Search toggled via shortcut')` — a debug statement left in production code.

### Files affected

- `src/context/CourseContext.tsx` (line 134)

---

## AP-07 — Duplicate Case Branches in `SlideFactory`

**Severity:** Low  
**Category:** DRY Violation

### Description

`SlideFactory.tsx` has two separate `case` branches (`'custom'` and `'exercise'`) that render the exact same component with the exact same props:

```tsx
case 'custom':
  return <CustomVisualSlide slide={slide} language={language} />;
case 'exercise':
  return <CustomVisualSlide slide={slide} language={language} />;
```

### Files affected

- `src/components/SlideFactory.tsx` (lines 26–30)

---

## AP-08 — `dangerouslySetInnerHTML` for CSS Animations (Injecting `<style>` Tags)

**Severity:** Medium  
**Category:** Maintainability / Performance

### Description

Multiple visual components inject `<style>` tags with `dangerouslySetInnerHTML` to define CSS animations:

- `CodeBlock.tsx` — tooltip animation
- `Gpt2BlackboxDiagram.tsx`, `BigramCounter.tsx`, `EmbeddingSpace3D.tsx`, `LanguageModelingDiagram.tsx`, `ParallelPredictionDiagram.tsx`, `MlpTextDiagram.tsx`, `SamplingRoulette.tsx`, `NextTokenInteractive.tsx`

### Why it's a problem

- Injects duplicate `<style>` elements into the DOM on every render.
- These animations could be defined once in `index.css` or a shared CSS module.
- Bypasses React's reconciliation for these nodes.

### Files affected

- `src/components/CodeBlock.tsx` (lines 72–81)
- 7+ visual components under `src/components/visuals/`

---

## AP-09 — Monolithic Context Provider (God Context)

**Severity:** Medium  
**Category:** Performance / Separation of Concerns

### Description

`CourseContext.tsx` bundles **all** app state into a single context: navigation, language, font scale, and search modal state. Any change to any value re-renders every consumer.

### Why it's a problem

- Changing `fontScale` triggers re-renders on `Sidebar`, `FloatingNavigation`, `SlideCounter`, etc., even though they don't use it.
- Changing `isSearchOpen` re-renders all slide content.
- Makes testing individual features harder.

### Files affected

- `src/context/CourseContext.tsx`

---

## AP-10 — `FONT_SCALE_BASE` Constant Conflicts with Context `fontScale`

**Severity:** Low  
**Category:** Confusing API

### Description

There are two font-scaling concepts: `FONT_SCALE_BASE` (a constant = `1.4`) and `fontScale` from context (user-adjustable, default `1`). Every font-size calculation multiplies both: `size * FONT_SCALE_BASE * fontScale`. The naming makes it unclear why a "base" of 1.4 exists and how it relates to the user control.

### Files affected

- `src/constants/course.ts`
- `src/components/MarkdownSlide.tsx`, `MarkdownRenderer.tsx`, `CodeSlide.tsx`, `TwoColumnSlide.tsx`, `SlideFrame.tsx`

---

## AP-11 — Accessibility Labels Hardcoded in Portuguese

**Severity:** Low  
**Category:** Accessibility / i18n

### Description

`FontSizeControls.tsx` has `aria-label="Diminuir fonte"` and `aria-label="Aumentar fonte"` — hardcoded in Portuguese regardless of the selected language.

### Files affected

- `src/components/FontSizeControls.tsx` (lines 13, 29)

---

## AP-12 — No Memoization on Expensive Visual Components

**Severity:** Medium  
**Category:** Performance

### Description

The `SlideVisualRenderer` re-creates heavy components (3D visuals with Three.js, interactive diagrams) on every render. None of the visual components are wrapped in `React.memo()`, and the renderer itself isn't memoized. Combined with the God Context (AP-09), this means any context change re-renders every 3D canvas and interactive widget.

### Files affected

- `src/components/slide-visuals/SlideVisualRenderer.tsx`
- All visual components under `src/components/visuals/`

---

## AP-13 — Pyodide Global State Leak Between Exercise Runs

**Severity:** Medium  
**Category:** Correctness

### Description

`pyodideRunner.ts` uses a single global Pyodide instance. Variables defined in one exercise persist in memory and are visible to subsequent exercises. This means:

- A student's solution to Exercise 1 can accidentally affect Exercise 2.
- Validators checking for specific variables might find stale values from previous runs.

### Files affected

- `src/services/pyodideRunner.ts`
- `src/hooks/usePyodide.ts`

---

## Multi-Step Refactoring Plan

### Phase 1: Quick Wins (Low Risk, High Impact)

| Step | Anti-Pattern | Action | Files |
|------|-------------|--------|-------|
| 1.1 | AP-06 | Remove `console.log('Search toggled via shortcut')` | `CourseContext.tsx` |
| 1.2 | AP-07 | Merge `'custom'` and `'exercise'` cases with a fallthrough | `SlideFactory.tsx` |
| 1.3 | AP-05 | Replace `dangerouslySetInnerHTML` with `white-space: pre-wrap` styling | `ExerciseCard.tsx` |
| 1.4 | AP-11 | Use `language` from context to set localized `aria-label` / `title` | `FontSizeControls.tsx` |

### Phase 2: Localization Fix (Medium Risk)

| Step | Anti-Pattern | Action | Files |
|------|-------------|--------|-------|
| 2.1 | AP-04 | Create a `src/i18n/messages.ts` file with all UI strings keyed by `Language` | New file |
| 2.2 | AP-04 | Refactor `exerciseValidators.ts` to accept a `language` parameter and return localized messages from the messages file | `exerciseValidators.ts` |
| 2.3 | AP-04 | Replace hardcoded Portuguese in `ExerciseEditor.tsx` and `ExerciseCard.tsx` with localized lookups | `ExerciseEditor.tsx`, `ExerciseCard.tsx` |

### Phase 3: Context Splitting (Medium Risk)

| Step | Anti-Pattern | Action | Files |
|------|-------------|--------|-------|
| 3.1 | AP-09 | Extract `NavigationContext` (slide index, goTo methods) from `CourseContext` | New file + `CourseContext.tsx` |
| 3.2 | AP-09 | Extract `UIContext` (fontScale, isSearchOpen) from `CourseContext` | New file + `CourseContext.tsx` |
| 3.3 | AP-09 | Keep `CourseContext` for read-only data (slides, language) | `CourseContext.tsx` |
| 3.4 | AP-09 | Update all consumers to import from the correct context | All component files |

### Phase 4: Visual Renderer Registry (Medium-High Risk)

| Step | Anti-Pattern | Action | Files |
|------|-------------|--------|-------|
| 4.1 | AP-02 | Create a `visualRegistry: Record<string, React.LazyExoticComponent>` map that auto-registers visuals | New file |
| 4.2 | AP-02 | Replace the switch-case in `SlideVisualRenderer` with a registry lookup + `React.lazy()` for code splitting | `SlideVisualRenderer.tsx` |
| 4.3 | AP-03 | Remove the duplicated `RawSlide.visual` union in `course-content.ts` and derive it from the `SlideVisual` type | `course-content.ts` |
| 4.4 | AP-12 | Wrap each visual component in `React.memo()` | All visual components |

### Phase 5: Style Migration (High Effort, Low Risk per File)

| Step | Anti-Pattern | Action | Files |
|------|-------------|--------|-------|
| 5.1 | AP-01 | Define reusable CSS variables / Tailwind utilities for recurring patterns (glass panels, glow effects, mono-font) | `index.css`, `tailwind.config.js` |
| 5.2 | AP-01 | Migrate `SearchModal.tsx` inline styles to Tailwind classes (highest ROI — 180 lines of JSX) | `SearchModal.tsx` |
| 5.3 | AP-01 | Migrate `CodeBlock.tsx`, `ExerciseEditor.tsx`, `ExerciseCard.tsx` | Component files |
| 5.4 | AP-08 | Move all injected `<style>` CSS animations to `index.css` and remove `dangerouslySetInnerHTML` style injections | `CodeBlock.tsx`, 7+ visual files |
| 5.5 | AP-01 | Incrementally migrate remaining components (one file per PR) | All inline-styled components |

### Phase 6: Runtime Isolation (Medium Risk)

| Step | Anti-Pattern | Action | Files |
|------|-------------|--------|-------|
| 6.1 | AP-13 | Before each exercise run, clear user-defined globals in Pyodide (`del` all non-builtin names or call `pyodide.globals.clear()`) | `pyodideRunner.ts` |
| 6.2 | AP-13 | Add integration tests verifying that Exercise N's state doesn't leak into Exercise N+1 | New test file |

### Phase 7: Naming Cleanup (Low Risk)

| Step | Anti-Pattern | Action | Files |
|------|-------------|--------|-------|
| 7.1 | AP-10 | Rename `FONT_SCALE_BASE` to `DESIGN_SCALE_MULTIPLIER` (or absorb it into the base font sizes in CSS) and document its purpose | `course.ts`, all consumers |
