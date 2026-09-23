# research/

Raw research leads. **Nothing in this directory is part of the Atlas.**

- `src/lib/content.ts` only reads `data/`, so nothing here is loaded, parsed,
  validated against `src/lib/schema.ts`, or rendered on any page.
- `npm run validate` does not look at these files.
- No lead here has been verified. Every row is marked
  `research lead / unverified` and carries the URL it came from.

A lead becomes a case only after its facts are confirmed against an official
brand, event-organiser, agency or editorial source — and then it is written by
hand into `data/cases/` with its own `sources:` block, following the standing
rules in `CLAUDE.md`. **A lead never becomes a case by being copied.**

## One exception, and exactly what it is

The 26 `Pop-up / Expo` leads for UTMB 2026 have been copied into
`data/events/utmb-mont-blanc-2026.md` as `reportedActivity`, and they render at
the foot of that edition's page under "Also reported at this edition".

They are **still leads**. They are not cases, they carry no evidence status of
their own, they are drawn as dashed boxes rather than cards, the section says in
its first sentence that none of it is research and none of it may be cited, and
every row links to where it was reported. The reason for showing them is that
the listing carries twenty-six spaces and the Atlas has researched fewer of
them: displaying only the researched ones would make the research look more
complete than it is, which rule 10 exists to prevent. **Run
`npm run validate` for the current case count at that edition** — this file
said "five" until the tenth case landed, which is exactly how the footer banner
went stale.

The other 123 leads — runs, talks, parties, races — were not copied. They are
activities rather than spaces with a duration, which is what this Atlas records.

**This directory is still never read by the site.** `content.ts` only reads
`data/`. The 26 entries were transcribed into a record under `data/` and are
validated by `schema.ts` like anything else there; nothing here is loaded.

## Leads closed without a case, and why

A lead that was researched and deliberately not written up is recorded here,
so the next person does not research it again.

(NNormal was on this list for one commit, as "not a space". It is now a case
under a new spatial type, `distributed`, because the absence of a space turned
out to be the finding.)

- **Rossignol at the Ultra-Trail Village.** A stand, like the others in the
  Village; Rossignol's own mention of it is one line of its Run & Try Days
  calendar. The brand's Chamonix *store* was written up instead
  (`data/cases/rossignol-store-chamonix.md`).
- **Every other "Brand X at the Ultra-Trail Village" lead.** One of 110 brands
  in the organiser's square. Written from the aggregator they would add records
  and no research; see `data/cases/ultra-trail-village-chamonix.md`. The way to
  do them is the organiser's Exhibitors Guide PDF, by hand. The exception is a
  stand the brand documents itself, as Goldwin and Altra did.

## Refresh these by hand, in a real browser. Never on a schedule.

`marathon-weekend.com` returns **HTTP 429 Too Many Requests** to `curl`, and
keeps doing so with a full set of browser headers — it blocks at the
TLS-fingerprint level, not on headers. Only a real browser gets through.

So although its `robots.txt` permits access (`User-Agent: *` / `Allow: /`) and
its Imprint carries no terms forbidding it, **the site actively blocks
automation**. Permission in `robots.txt` and a wish not to be crawled are not
the same thing, and here they point in opposite directions.

Treat that as the site's answer: refresh this file **by hand, in a browser, when
you actually need it**. Do not put it behind a cron job, a scheduled task or a
script, and do not retry into a 429.

## Files

| File | What it is |
|---|---|
| `utmb-2026-marathon-weekend-leads.md` | 149 brand activations listed for UTMB Mont-Blanc 2026, from marathon-weekend.com |
