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
rules in `CLAUDE.md`. **Do not bulk-import anything from this directory.**

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
