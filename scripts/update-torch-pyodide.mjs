import { readdirSync, rmSync, createWriteStream, writeFileSync } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { resolve } from 'node:path';

const PYPI_URL = 'https://pypi.org/pypi/torch-pyodide/json';
const wheelRe = /^torch_pyodide-(.+)-py3-none-any\.whl$/;
const vendorDir = resolve('public', 'vendor', 'python');

async function main() {
  const res = await fetch(PYPI_URL);
  if (!res.ok) throw new Error(`Failed to fetch ${PYPI_URL}: ${res.status}`);
  const data = await res.json();
  const latest = data.info?.version;
  if (!latest) throw new Error('Could not resolve latest version from PyPI metadata');

  const files = data.releases?.[latest] ?? [];
  const wheel = files.find((f) => f.filename === `torch_pyodide-${latest}-py3-none-any.whl`);
  if (!wheel?.url) throw new Error(`Wheel not found for version ${latest}`);

  const existing = readdirSync(vendorDir).filter((n) => wheelRe.test(n));
  for (const name of existing) {
    rmSync(resolve(vendorDir, name), { force: true });
  }

  const outPath = resolve(vendorDir, wheel.filename);
  const wheelRes = await fetch(wheel.url);
  if (!wheelRes.ok || !wheelRes.body) throw new Error(`Failed to download wheel: ${wheelRes.status}`);

  await pipeline(wheelRes.body, createWriteStream(outPath));
  writeFileSync(
    resolve(vendorDir, 'torch-pyodide.json'),
    JSON.stringify(
      {
        fileName: wheel.filename,
        version: latest,
        pypiSpec: `torch-pyodide==${latest}`,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(`Updated torch-pyodide wheel to ${wheel.filename}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
