# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
   → `unsourced` (real subject, nothing cited yet) → `partially-verified`
   (some claims sourced) → `verified` (every fact in the verified-facts layer
   traces to a listed source). Anything above `unsourced` must have at least
   one source with a url — `npm run validate` enforces this on cases, events
   and brands alike, and the build fails without it.

   **`unsourced` is the floor for a real record, and `placeholder` is not.**
   The two are not interchangeable and the difference is not cosmetic:
   `placeholder` means the record was made up, and the page says so — "invented
   demo content. Do not cite." Brand and event records were once pushed down to
   `placeholder` to satisfy this rule, which made the Boston Marathon page
   announce that the Boston Marathon was invented. Declaring a true record
   fabricated is the mirror image of the error this rule exists to prevent, and
   it is worse, because it discredits the real thing. When validate catches an
   uncited record, the answer is `unsourced` or a source — never `placeholder`.

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

### How a Markdown file becomes a page

Worth tracing once, because no single file shows it:

1. `content.ts` reads `data/**/*.md`, splits frontmatter from body with
   `gray-matter`, and validates the frontmatter against `schema.ts`.
2. The body is split on `## ` headings and each heading is matched — case and
   punctuation insensitively — against `CASE_SECTIONS` in `sections.ts`. An
   unrecognised heading is an error, not silently dropped. Each section's
   Markdown is rendered to HTML once, here. **So adding a prose section means
   editing `sections.ts`, not any page.**
3. `content.ts` then runs cross-reference checks: brand, event, tag, spatial
   type and activation-logic ids must exist; `verified` needs a sourced url;
   a secondary logic may not repeat the primary. Anything wrong is collected
   and `requireDataSet()` throws, so the build fails loudly rather than
   rendering blanks.
4. `queries.ts` wraps that into `getAtlas()` and derives what pages ask for —
   including `cards`, the compact form of a case that the client map and the
   lists receive as props. Full cases carry rendered HTML and never cross to
   the client.
5. `card.ts` spreads pins that share a coordinate so none hide behind another.

`getAtlas()` and `loadDataSet()` memoise **in production only**. In development
every request re-reads `data/`, so editing a Markdown file and reloading is
enough — no restart. If an edit seems not to apply, that is not why.

`scripts/*.ts` run through `tsx` so they import the same `schema.ts` the site
uses; there is deliberately no second copy of the rules.

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
- **On the home page the map is the ground and everything floats on it.** The
  filter rail and the editions used to be slabs — a full-height column with a
  rule beside it, and a band across the top — each taking width or height from
  the map permanently. Now the map fills the whole area under the header and
  the rail and the editions sit over it as rounded frosted panels
  (`.glass` in `globals.css`, `--glass*` in `tokens.css`), so the basemap runs
  edge to edge and reads underneath them. Nothing draws a background wider
  than the thing it contains.

  Two things this couples together, and they will break quietly if separated:

  1. **`fitBounds` padding has to know about the panels.** The panels cover the
     left of the map's own viewport, and MapLibre has no idea, so it will
     centre a filtered pin underneath the rail. `AtlasMap` pads left by 340 and
     top by 130 once its container is at least 1024px wide — the same
     breakpoint at which the panels start floating. Move or resize a panel and
     that padding moves with it.
  2. **The phone does not float the rail.** It keeps the sheet you open, since
     a panel over a 375px-wide map leaves no map. Only the editions float at
     every width, scrolled sideways.

  The locator thumbnails inside the cards stay nearly opaque
  (`--glass-strong`) on purpose: they are small maps, and letting the basemap
  through them would stack two maps at different scales.

- **The recent-editions strip draws a locator rather than borrowing a photo.**
  The home page opens with one card per *dated* edition, most recently finished
  first. Each shows the edition's `hero` photograph if it has one, and if it
  does not, a locator built from the country box in
  `data/vocab/country-bounds.yml` with the edition's own coordinate marked in
  it — a diagram, made only of data already in the record. It never
  substitutes a stand-in image, because a photograph is the most convincing
  thing on a page and an invented plate is how a placeholder once passed for
  research. `hero` carries `credit` and `sourceUrl` like a case image does: an
  uncredited photo is the same problem as an unsourced claim.

  Undated editions are left out of the strip rather than guessed into an order,
  and nothing in the dataset is upcoming, so it says "recent", not "next".

- **An edition may show reported activity it has not researched, as leads.**
  `reportedActivity` on an event record holds branded spaces a third party
  lists for that edition, unverified. UTMB Mont-Blanc 2026 carries 26 of them
  against 5 researched cases, and that ratio is the reason the section exists:
  showing only the 5 would make the research look more complete than it is.

  The rules that keep it from becoming a second class of case: every entry must
  carry the url it was reported at (the schema refuses one without); the
  section is last on the page, drawn as dashed boxes rather than cards, and
  opens by saying none of it is research and none of it may be cited; entries
  have no evidence status, because a status is a claim about verification and
  nothing here has been verified. **A lead never becomes a case by being
  copied** — a case is written from the brand, the organiser, the agency or the
  press, and an aggregator points at those rather than standing in for them.

- **The event page leads with occupancy, not a list.** Cases are spaces with a
  duration, not timed events, so `EventTimeline` draws a bar per case across the
  edition's days. A case whose dates were never published gets a dashed ghost
  bar labelled as such rather than a guessed position.

## Known limitations, recorded and not yet fixed

- **`spatialType` is single-valued, and three cases are now hybrids.** The North
  Face bundles a Basecamp chalet (`activation`) with a permanent store
  (`permanent-retail`); ASICS bundles a Trail Pop-Up with a separately-sited
  Trail Camp; rabbit takes over two hotels and calls the result "part pop-up
  shop" while running a separate Vendor Village chalet on different dates. In
  each, the second space is visible only in the prose and the tags.

  **The third hybrid has arrived, and the decision is made but not yet built.**
  When this changes, it becomes `primarySpatialType` plus an optional
  `secondarySpatialType` — deliberately *not* an unrestricted multi-select. The
  reason is the same one behind rule 5: a free list invites one case to carry
  four types and destroys comparison, whereas one primary plus one optional
  secondary forces the judgement about which form leads. Until it is built,
  hybrids keep a single primary type and say so in their verification notes.

- **Activation-logic vocabulary candidates are tracked, not added.** Two cases
  have hit mechanisms the vocabulary cannot express — see the candidate block at
  the foot of `data/vocab/activation-logic.yml`. A candidate is only promoted to
  a real value once the **same** mechanism appears in additional cases, because
  a value invented for a single case is how the earlier free-text drift started.
  A case that hits a gap records it in `activationLogicRationale`, names the
  values it tested and rejected, and files under the closest honest value.
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

**How the map decides what to frame.** Normally it fits the visible pins, as
close as they allow. The exception is a country filter *on its own*: then the
question is "where in this country", so it frames the country from
`data/vocab/country-bounds.yml` and lets the pins fall where they fall. Add any
other filter — a brand, an event, a search — and the pins take over again.

That has to be a box rather than a zoom number: the same zoom shows twice as
much land on a wide monitor as on a narrow one, so a fixed zoom would frame a
country correctly on exactly one screen. Those boxes are **mainland only and
approximate** — with French Guiana included, "France" spans the Atlantic. They
are framing aids, never shown as facts, and a country missing from the file
just falls back to its pins.

## Commands

```bash
npm run dev          # http://localhost:3000
npm run validate     # check every file in data/ and report problems in plain language
npm run new-case     # npm run new-case -- <brand-slug> "<Title>"
npm run map-style    # rebuild the map style + worker after changing colours
npm run build        # production build; also type-checks
npx tsc --noEmit     # type-check alone — much faster than a build while iterating
```

**There is no test framework and no linter in this project.** Nothing is
missing or broken; none was ever added. The checks that exist are
`npm run validate` for data and `npx tsc --noEmit` / `npm run build` for code.
Do not scaffold Jest, Vitest or ESLint unless asked.

### Shell note — this matters on the owner's machine

Her terminal is **Windows PowerShell 5.1 with the execution policy at
Restricted**, which has two consequences for any command handed to her:

- `npm` and `npx` resolve to `npm.ps1` / `npx.ps1` and are **blocked**. Use
  `npm.cmd` and `npx.cmd`, which bypass PowerShell scripts entirely.
- `&&` is a parse error. Chain with `;`.

```bash
cd "C:\Users\yuan\Claude Projects\Performance Brand Experience Atlas"; npm.cmd run dev
```

The project path contains spaces, so quote it. To check a command the way she
will actually experience it:
`powershell -NoProfile -ExecutionPolicy Restricted -Command "<cmd>"` — an agent's
own shell usually runs with Bypass and will not reproduce her failure.

## Not built yet — do not add unasked

AI-assisted case research · image-to-3D spatial reconstruction · floor-plan
reconstruction · similarity search · user submissions · a database · a
full-text search engine · pin clustering · the Strategy Matrix chart ·
aggregate charts across cases (an aggregate is a research finding, and
findings need verified data first).

Evidence labels are now **built**, not postponed: see the five-value status in
rule 1 and `SOURCE_TYPES` in `src/lib/schema.ts`.
