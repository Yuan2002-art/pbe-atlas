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

1. **Never invent case facts.** Any case, brand or event content that has not
   been checked against a source must carry `status: placeholder` (invented) or
   `status: draft` (written from general knowledge). Only `verified` may be
   cited, and only when real sources are listed on the record. All ten cases in
   this build are `placeholder` demo material.
2. **No LinkedIn scraping, and no scraping of any site whose terms forbid it.**
   If asked for that, say so and offer a manual alternative.
3. **Data stays hand-editable.** Markdown with YAML frontmatter, one file per
   record, in `data/`. Do not introduce a CMS or a database without being asked.
4. **Vocabularies live in data, not code.** Spatial types and classification
   tags come from `data/vocab/*.yml`; the filters, the map key, the case pages
   and the Method page all read from there.
5. **Show gaps, never hide them.** A brand or event with no cases renders an
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

## Two design decisions worth not undoing

- **Performance credibility and cultural meaning are stored once**, as answers
  05 and 06 of the strategic analysis, and displayed twice — in the Framing
  strip at the top of a case page and in the analysis grid below. The original
  field list had them in both places; duplicating the field would mean writing
  the same paragraph twice.
- **The map is shape-coded, not colour-coded.** Colour is a redundant second
  channel, so the map survives colour-vision deficiency and black-and-white
  printing in a thesis. A dashed outline means a placeholder record.

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
reconstruction · timeline view · similarity search · user submissions ·
verified / reconstructed / AI-interpreted evidence labels · a database ·
a full-text search engine · pin clustering · aggregate charts across cases
(an aggregate is a research finding, and findings need verified data first).
