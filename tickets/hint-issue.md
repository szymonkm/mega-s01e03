## Problem

booking-v3 displays MM/DD/YYYY for day-first tenants. People follow the hint, but the form interprets the value in tenant order. These are form-channel reports for alder.physio, copper.studio, and pale.harbour. This needs a separate fix from the shared parser.

## Coverage

- **33 unique reports** from merged ticket #4471.
- 3 affected tenants.
- Received 2026-04-17 through 2026-09-22.
- Intake tags in this group: parser: 15, hint: 18.

Count method: uniqueById(reports), filter mergedInto === 4471, then groupByCause with tenantOf. The export has 427 rows, but 412 unique report IDs: 379 parser + 33 hint. Overlapping export rows must not be counted again. Counts reflect the 2026-10-04 export.

## Example evidence

R-41230: copper.studio (es-ES), form. It is tagged parser at intake, but belongs to hint. R-41241 and R-41251 are further examples.

## Proposed fix and verification

Make the hint match the form input interpretation for each tenant locale. Verify the display and submission behavior on booking-v3 for the three affected tenants. Check that app and email parser behavior remains covered by its separate issue.

## Caveat

A matching subject or browser-derived intake tag is insufficient evidence of a shared cause. No one-day-move desk note belongs to this group.

## Evidence files

See src/lib/data/reports-4471.json, src/lib/data/tenants/, src/lib/data/desk-notes.json, src/lib/kb/causes.ts, and src/routes/kb/incidents/4471-review/+page.svx in this repository. The rendered page is rendered/kb/incidents/4471-review/index.html.

<details><summary>Report IDs (33)</summary>

R-41230, R-41241, R-41251, R-41259, R-41262, R-41275, R-41294, R-41305, R-41308, R-41366, R-41372, R-41384, R-41387, R-41396, R-41400, R-41406, R-41415, R-41416, R-41418, R-41428, R-41439, R-41441, R-41449, R-41453, R-41456, R-41460, R-41472, R-41485, R-41493, R-41539, R-41572, R-41582, R-41584

</details>
