<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, uniqueById, readAs, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  const unique = uniqueById(reports as Report[]).filter(r => r.mergedInto === 4471);
  const groups = groupByCause(unique, tenantOf);
  const mismatch = groups.reduce((n, g) => n + g.reports.filter(r => r.meta.intakeTag !== g.cause).length, 0);
  const firstMerge = unique.map(r => r.mergedAt).filter(Boolean).sort()[0]?.slice(0, 10);
  const pendingBefore = unique.filter(r => r.receivedAt.slice(0, 10) < (firstMerge ?? '')).length;
</script>

<p>The export contains <strong>{reports.length}</strong> rows and <strong>{unique.length}</strong> unique reports for #4471.
  Remove <strong>{reports.length - unique.length}</strong> repeated rows by report ID before counting.</p>
<table>
  <thead><tr><th>Problem</th><th>Reports</th><th>Tenants</th><th>Received</th></tr></thead>
  <tbody>{#each groups as g (g.cause)}
    <tr><td>{g.cause}</td><td>{g.reports.length}</td><td>{g.tenants}</td><td>{g.firstSeen} to {g.lastSeen}</td></tr>
  {/each}</tbody>
</table>
<p>Intake tags disagree with tenant-based classification for <strong>{mismatch}</strong> reports.
  Browser locale and intake tags are evidence about intake, not reliable cause labels.</p>
{#each groups as g (g.cause)}
  {#if readAs(g, notes.oneDayMove)}
    <p><strong>{readAs(g, notes.oneDayMove)}</strong> reports describe a one-day move:
      {g.reports.filter(r => notes.oneDayMove.includes(r.id)).map(r => r.id).join(', ')}.
      The supplied classifier places them under {g.cause}. Keep this count, but investigate the symptoms before assuming that one fix resolves them.</p>
  {/if}
{/each}
<p>Reports arrived before the desk merged them. The first recorded merge was <strong>{firstMerge}</strong>;
  <strong>{pendingBefore}</strong> reports had arrived on earlier days. Merge time does not measure when users first had trouble.</p>
