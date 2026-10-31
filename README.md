# kb — the support knowledge base

## S01E03 review

The added page is `src/routes/kb/incidents/4471-review/+page.svx`.
Its rendered copy is `rendered/kb/incidents/4471-review/index.html`.
The proposed replacement for the historical duplicate policy is decision 0002.
Decision 0001 and all exported evidence remain unchanged.

Run `npm ci`, then `npm run build` with Node.js 24 or later.
Serve `rendered/` as the web root to read pages and follow kb links.
For example: `python3 -m http.server 8763 --directory rendered`.

The HTML files are static renderings of the actual Svelte/mdsvex components.
Tables, charts, stale warnings, and signature stamps execute during the build.
The exported explorer's initial state is shown; static HTML does not enable its controls.
Rebuild after a data update. The source export is dated 2026-10-04.

Issue drafts and report-ID manifests are in `tickets/`.
The proposed public repository is `szymonkm/mega-s01e03`.
The student approved publication and revisions for course acceptance.

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.
