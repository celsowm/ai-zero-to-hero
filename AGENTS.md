# Project Rules for AI Agents

This file documents project-specific rules discovered through trial and error.

## Pre-commit Pipeline (`.husky/pre-commit`)

Before any commit passes, these run **in order**:
1. `npx tsc -b --noEmit` — TypeScript type-check
2. `node scripts/validate-slides.mjs` — slide validation
3. `npx vitest run` — all tests (87+ tests across 6 files)
4. `npm run lint` — ESLint

## Slide Creation Rules

### 1. No raw code blocks for Python/JS (test: `all-code-coverage.test.ts:208`)

Every ` ```python ` or ` ```js ` / ` ```javascript ` block in a slide `.ts` file **must** use the snippet system:

```typescript
// ❌ WILL FAIL pre-commit
\`\`\`python
from jinja2 import Template
print("hello")
\`\`\`

// ✅ CORRECT
\`\`\`python
snippet:jinja/jinja-intro-example
\`\`\`
```

**Allowed inline** (no snippet required): `bash`, `txt`, `jinja` (non-Python/JS languages)

### 2. Snippet `meta.json` id must match file path (test: `content-integrity.test.ts:45`)

If snippet is at `src/content/snippets/jinja/jinja-intro-example.en-us.py`, the `meta.json` id must be `"jinja/jinja-intro-example"` (relative path with `/`, no extension, no locale).

```json
// File: src/content/snippets/jinja/jinja-intro-example.meta.json
{
  "id": "jinja/jinja-intro-example",  // MUST match path, NOT "jinja-intro-example"
  "language": "python",
  "explanations": { ... }
}
```

### 3. Every slide needs `codeExplanations` when it has snippet references (test: `all-code-coverage.test.ts`)

If a slide body references a `snippet:xxx`, that slide **must** have a `codeExplanations` array in both `pt-br` and `en-us` content, with `lineRange` entries that match lines in the snippet file.

### 4. Slide registration pattern

Every new slide needs **3 registrations**:

**a) Import in `src/content/slides/index.ts`:**
```typescript
import { jinjaIntro } from './jinja-intro';
```

**b) Export in `allSlides` array (same file, alphabetical order):**
```typescript
export const allSlides: ISlide[] = [
  ...
  jinjaIntro,
  jinjaChatmlPractice,
  ...
];
```

**c) ID in `src/data/course-outline.ts` (ordered for presentation):**
```typescript
export const courseSlideOrder = [
  ...
  'jinja-intro',
  'jinja-chatml-practice',
  ...
];
```

### 5. Build command

```bash
npm run build    # tsc -b && vite build
```

Always run this before committing if not relying on the pre-commit hook.

### 6. PT-BR must use natural accentuation

For any user-facing Portuguese content (`pt-br`) in slides/snippets/`codeExplanations`:
- **Use proper Portuguese accentuation** (e.g., `é`, `ção`, `á`, `í`, `ú`, `ã`, `õ`, `ç`).
- Do **not** "ASCII-ize" Portuguese prose (avoid forms like `nao`, `acao`, `logica` in PT-BR text).
- Exceptions: code identifiers, file paths, API names, and other technical tokens that are conventionally ASCII.

If editing an existing PT-BR text that is missing accents, normalize it to natural Portuguese spelling.
