import { render } from 'svelte/server';
export const pages = import.meta.glob('/src/routes/kb/**/+page.svx', { eager: true });
export function renderPage(mod) {
  const result = render(mod.default);
  const styles = Object.values(import.meta.glob('/src/**/*.svelte', { eager: true, query: '?raw', import: 'default' }))
    .flatMap(source => [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]))
    .join('\n').replaceAll(/:global\(([^)]+)\)/g, '$1');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${result.head}<style>${styles}</style></head><body>${result.body}</body></html>`;
}
