# Performance Brand Experience Atlas — project brief

## What this is

A research platform for an architecture / brand-strategy thesis. It maps how
performance brands use permanent retail, sports events, pop-ups, product
launches and experiential activations to build performance credibility,
cultural meaning and consumer engagement.

The owner is a designer, not an engineer. Favour code that can be read and
edited by hand over code that is clever. Every new mechanism should be
explainable in one sentence.

## Standing rules

1. **Never invent case facts.** Evidence status is
   `placeholder` (invented) → `ai-reconstructed` (machine-assembled, unchecked)
   → `partially-verified` (some claims sourced) → `verified` (every fact in the
   verified-facts layer traces to a listed source). Anything above
   `placeholder` must have at least one source with a url — `npm run validate`
   enforces this and the build fails without it.

   **A placeholder once leaked into a research brief.** An invented demo case
   called "Salomon UTMB Basecamp" was later handed back as a subject to verify;
   no such activation exists. Fabricated content does not stay contained just
   because it is labelled. Prefer deleting a placeholder over keeping it once a
   real case covers the same brand and event.

2. **Facts and interpretation are separate layers, in the data.** A case body
   has a `facts` group (Description, Verification notes) and an `analysis`
   group. `src/lib/sections.ts` defines which is which and the case page renders
   them as §1 Verified facts and §2 Strategic interpretation, with a notice
   saying the second is not evidence. Never move an unsourced claim up into the
   facts layer.

3. **One event record = one edition.** `data/events/utmb-mont-blanc-2026.md`
   is a different record from the 2024 one. Editions are what brands actually
   activate at, they carry real dates, and comparing one year against another
   is impossible if a single record spans all of them. `parentSeries` groups
   them. A case points at an edition through `relatedEvent` (the slug) — that
   field already is the event id; do not rename it for cosmetic reasons.

4. **`strategyMatrix` stays null until the evidence earns a number.** It is
   reserved for a future cross-case chart, and a guessed coordinate will plot
   with exactly the same confidence as a researched one. `npm run validate`
   reports how many cases are plottable and flags any with a coordinate but no
   rationale. It belongs to the interpretation layer, not the facts layer.

5. **Activation logic is one primary, one optional secondary, both from
   `data/vocab/activation-logic.yml`.** Never a list. The field answers "what
   does this space run on", and forcing a single choice is the whole point:
   an earlier free-text version produced fourteen distinct values across six
   cases, of which only one ever repeated, which made the field useless for
   comparison. `tags` is where everything that applies goes; this is where the
   load-bearing mechanism goes. Every case that names one must also record
   `activationLogicRationale` saying why that mechanism and not the runners-up.

   The three vocabularies divide as: `spatialType` = the form (one),
   `tags` = analytical attributes (many, unordered), activation logic = the
   engine (one + one optional). `event-activation` and `cultural-archive` are
   deliberately excluded from the logic vocabulary — the first is a dependency
   relation rather than a mechanism, the second is covered by
   `cultural-narrative` and keeping both would restart the drift.

6. **Record what could not be verified.** `## Verification notes` is where
   uncertainty goes — inferred years, street-level-only coordinates,
   single-press-release trade coverage, claims deliberately excluded. A blank
   field is silent; a note is honest. `partially-verified` records must have one.

7. **No LinkedIn scraping, and no scraping of any site whose terms forbid it.**
   If asked for that, say so and offer a manual alternative.
8. **Data stays hand-editable.** Markdown with YAML frontmatter, one file per
   record, in `data/`. Do not introduce a CMS or a database without being asked.
9. **Vocabularies live in data, not code.** Spatial types and classification
   tags and activation logics all come from `data/vocab/*.yml`; the filters, the
   map key, the case pages and the Method page all read from there.
10. **Show gaps, never hide them.** A brand or event with no cases renders an
   honest empty state. Do not pad the dataset to make the interface look full.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · MapLibre GL with a free
OpenFreeMap basemap · `gray-matter` + `marked` for content · `js-yaml` for the
vocabularies · Zod for validation. No database, no CMS, no state library, no
component library.

## Architecture

- `src/lib/schema.ts` — the data model. The single definition of what a case,
  brand and event may contain. Read this before changing anything about data.
- `src/lib/content.ts` — **the only file that touches the filesystem.** If the
  project ever outgrows Markdown, this becomes a database client and nothing
  else changes. Keep it that way.
- `src/lib/queries.ts` — everything the pages ask of the data.
- `src/lib/sections.ts` — the prose sections of a case, in order. Drives the
  template, the parser and the page layout.
- `src/lib/filters.ts` and `src/lib/card.ts` — pure, no filesystem, no React;
  they run in the browser as well as on the server.
- `src/lib/pin.ts` — the six map marks. Used by the map, the legend and the
  lists so the shapes can never drift apart.
- `src/styles/tokens.css` — every colour and measurement in the design.

Pages under `src/app/`: `/` global map · `/cases` register · `/cases/[slug]` ·
`/brands` + `/brands/[slug]` · `/events` + `/events/[slug]` · `/about` method.

## Design decisions worth not undoing

- **Performance credibility and cultural meaning are stored once**, as answers
  05 and 06 of the strategic analysis, and displayed twice — in the Framing
  strip at the top of a case page and in the analysis grid below. The original
  field list had them in both places; duplicating the field would mean writing
  the same paragraph twice.
- **The map is shape-coded, not colour-coded.** Colour is a redundant second
  channel, so the map survives colour-vision deficiency and black-and-white
  printing in a thesis. A dashed outline means a placeholder record.
- **The visual language is light-editorial (cards, radius, soft shadow, large
  display type) but the research furniture is not decorative.** The monospaced
  field labels, the numbered §-sections, the status badge on every record and
  the facts / interpretation split are what stop this reading as an inspiration
  feed. Restyle them; do not remove them.
- **The event page leads with occupancy, not a list.** Cases are spaces with a
  duration, not timed events, so `EventTimeline` draws a bar per case across the
  edition's days. A case whose dates were never published gets a dashed ghost
  bar labelled as such rather than a guessed position.

## Known limitations, recorded and not yet fixed

- **`spatialType` is single-valued, but two cases are hybrids.** The North Face
  bundles a Basecamp chalet (`activation`) with a permanent store
  (`permanent-retail`); ASICS bundles a Trail Pop-Up with a separately-sited
  Trail Camp. In both, the second space is currently visible only in the prose
  and the tags. The same hybrid is what forces the activation logic's secondary
  slot to carry a mechanism belonging to the other half of the case. Three ways
  out when it matters: split into two cases, make `spatialType` multi-valued, or
  add `secondarySpatialType`. Not worth doing until a third hybrid appears.
- **`strategyMatrix` is populated on no case at all.** Deliberate — see rule 4.

## Map notes

`npm run map-style` does two things: it repaints the OpenFreeMap basemap style
with the palette in `data/map-palette.json`, and it copies MapLibre's web worker
into `public/map/` (rewriting its relative import to an absolute path). The
second part is needed because MapLibre resolves its worker relative to its own
bundle, which does not exist as a URL after Next.js bundles it —
`setWorkerUrl` in `src/components/map/AtlasMap.tsx` points it at the copy.
Re-run the script after upgrading `maplibre-gl`.

The map container is sized with `h-full`, not `absolute inset-0`: MapLibre's own
stylesheet sets `position: relative` on that element, which would collapse it to
zero height.

Filter state is kept in the URL with the history API rather than
`useSearchParams`, which keeps the map out of a Suspense boundary.

## Commands

```bash
npm run dev          # http://localhost:3000
npm run validate     # check every file in data/ and report problems in plain language
npm run new-case     # npm run new-case -- <brand-slug> "<Title>"
npm run map-style    # rebuild the map style + worker after changing colours
npm run build        # production build; also type-checks
```

## Not built yet — do not add unasked

AI-assisted case research · image-to-3D spatial reconstruction · floor-plan
reconstruction · similarity search · user submissions · a database · a
full-text search engine · pin clustering · the Strategy Matrix chart ·
aggregate charts across cases (an aggregate is a research finding, and
findings need verified data first).

Evidence labels are now **built**, not postponed: see the four-value status in
rule 1 and `SOURCE_TYPES` in `src/lib/schema.ts`.
