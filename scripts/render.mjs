import { build } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
await build();
const { pages, renderPage } = await import('../.render/entry.js');
for (const [path, mod] of Object.entries(pages)) {
  const route = path.replace('/src/routes/', '').replace('/+page.svx', '/index.html');
  const output = resolve('rendered', route);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, renderPage(mod));
  console.log(output);
}
