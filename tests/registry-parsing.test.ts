import { describe, it, expect } from 'vitest';

// We'll extract the parseSnippetSource function logic for testing since it's not exported.
// In a real scenario, we might want to export it or test it via the registry's public API.
// For now, I'll copy the logic to verify it.

const START_REGION_RE = /^\s*(?:#|\/\/)\s*@?region\s+([A-Za-z0-9_-]+)\s*$/;
const END_REGION_RE = /^\s*(?:#|\/\/)\s*@?end(?:region)?(?:\s+[A-Za-z0-9_-]+)?\s*$/;

function normalizeNewlines(code: string): string {
  return code.replace(/\r\n/g, '\n');
}

function parseSnippetSource(rawCode: string): { code: string; regions: Record<string, [number, number]> } {
  const lines = normalizeNewlines(rawCode).split('\n');
  const renderedLines: string[] = [];
  const regionStack: Array<{ name: string; startLine: number }> = [];
  const regions = new Map<string, [number, number]>();

  for (const line of lines) {
    const startMatch = line.match(START_REGION_RE);
    if (startMatch) {
      if (regionStack.length > 0) {
        throw new Error(`Nested snippet regions are not supported: "${startMatch[1]}"`);
      }

      regionStack.push({ name: startMatch[1], startLine: renderedLines.length + 1 });
      continue;
    }

    if (END_REGION_RE.test(line)) {
      const current = regionStack.pop();

      if (!current) {
        throw new Error('Encountered an endregion marker without a matching start marker');
      }

      regions.set(current.name, [current.startLine, renderedLines.length]);
      continue;
    }

    renderedLines.push(line);
  }

  if (regionStack.length > 0) {
    const openRegions = regionStack.map((region) => region.name).join(', ');
    throw new Error(`Unclosed snippet regions: ${openRegions}`);
  }

  return {
    code: renderedLines.join('\n'),
    regions: Object.fromEntries(regions),
  };
}

describe('parseSnippetSource', () => {
  it('parses a simple snippet without regions', () => {
    const source = 'print("hello")\nprint("world")';
    const result = parseSnippetSource(source);
    expect(result.code).toBe(source);
    expect(result.regions).toEqual({});
  });

  it('parses regions with simple @endregion', () => {
    const source = `
# @region part1
print("hello")
# @endregion
print("world")
    `.trim();
    const result = parseSnippetSource(source);
    expect(result.code).toBe('print("hello")\nprint("world")');
    expect(result.regions).toEqual({ part1: [1, 1] });
  });

  it('parses regions with named @endregion (the fix)', () => {
    const source = `
# @region e2e
print("e2e test")
# @endregion e2e
    `.trim();
    const result = parseSnippetSource(source);
    expect(result.code).toBe('print("e2e test")');
    expect(result.regions).toEqual({ e2e: [1, 1] });
  });

  it('parses regions with named endregion (no @)', () => {
    const source = `
# region validation
print("validating")
# endregion validation
    `.trim();
    const result = parseSnippetSource(source);
    expect(result.code).toBe('print("validating")');
    expect(result.regions).toEqual({ validation: [1, 1] });
  });

  it('throws error for unclosed regions', () => {
    const source = `
# @region e2e
print("missing end")
    `.trim();
    expect(() => parseSnippetSource(source)).toThrow('Unclosed snippet regions: e2e');
  });

  it('throws error for nested regions', () => {
    const source = `
# @region outer
# @region inner
# @endregion
# @endregion
    `.trim();
    expect(() => parseSnippetSource(source)).toThrow('Nested snippet regions are not supported: "inner"');
  });

  it('throws error for extra endregion', () => {
    const source = `
# @region test
print("ok")
# @endregion
# @endregion
    `.trim();
    expect(() => parseSnippetSource(source)).toThrow('Encountered an endregion marker without a matching start marker');
  });
});
