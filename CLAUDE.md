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

   The three vocabularies divide as: spatial type = the form (one + one
   optional), `tags` = analytical attributes (many, unordered), activation
   logic = the engine (one + one optional). `event-activation` and `cultural-archive` are
   deliberately excluded from the logic vocabulary — the first is a dependency
   relation rather than a mechanism, the second is covered by
   `cultural-narrative` and keeping both would restart the drift.

6. **Record what could not be verified — in the file, not on the page.**
   `## Verification notes` is where uncertainty goes: inferred years,
   street-level-only coordinates, single-press-release trade coverage, claims
   deliberately excluded. A blank field is silent; a note is honest.
   `partially-verified` records must have one, and `npm run validate` still
   checks it.

   **The page does not print it, and the `verified` / `partially-verified`
   badges are not shown either.** What the Atlas records is published strategy:
   a brand's own announcement of a space is a fact about that brand's plan
   whether or not it later rained. Badging one real record "verified" and the
   next "partially verified" invited a reader to grade them against each other,
   when the difference is mostly that a title partner gets written about by the
   organiser and a non-partner does not — which says more about who holds
   rights than about the research. The note is the working record behind the
   page, reachable through the source-file link in §0.

   **The three badges that remain are the ones that say "do not cite":**
   `placeholder`, `ai-reconstructed`, `unsourced`. Those warn about content
   that is not research, which is what rule 1 is for. The Method page still
   prints all five, because it documents the vocabulary rather than stamping a
   record.

7. **No LinkedIn scraping, and no scraping of any site whose terms forbid it.**
   If asked for that, say so and offer a manual alternative.
8. **Data stays hand-editable.** Markdown with YAML frontmatter, one file per
   record, in `data/`. Do not introduce a CMS or a database without being asked.
9. **Vocabularies live in data, not code.** Spatial types and classification
   tags and activation logics all come from `data/vocab/*.yml`; the filters, the
   map key, the case pages and the Method page all read from there.
10. **Show gaps, never hide them.** A brand or event with no cases renders an
   honest empty state. Do not pad the dataset to make the interface look full.

    A corollary learned the hard way: **a standing claim about the data must come
    from the data.** The footer banner asserted "cases marked placeholder are
    invented demo material" on every page, and stayed there after the last
    placeholder was deleted — telling readers to watch for a marking that no
    longer existed. It now reads off `statusTally()`. Anything that counts or
    characterises the dataset should be computed, not written down.

11. **`founded` describes the entity, not its parent.** An independent brand uses
   the field. A sub-brand or product line leaves it **blank** unless a sourced
   date belongs clearly to that entity, and the parent's date goes in the prose
   where it cannot be misread. Nike Running / ACG carried 1971 and adidas
   Running / Terrex carried 1949 — neither described the line the record is
   about, and 1971 is not even Nike's founding (1964, as Blue Ribbon Sports).
   Both are now blank; ACG's sourced 1989 debut lives in the prose. Amazfit
   keeps `founded: 2015` because that date is Amazfit's own, not Zepp Health's —
   that is the distinction the rule turns on.

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
- `src/lib/filters.ts`, `src/lib/card.ts` and `src/lib/format.ts` — pure, no
  filesystem, no React; they run in the browser as well as on the server.
  `format.ts` holds the date, coordinate and place formatters, and dates are
  formatted in a fixed archival style rather than the visitor's locale so a
  screenshot in a thesis always reads the same.
- `src/lib/pin.ts` — the map marks, one per spatial type. Used by the map, the legend and the
  lists so the shapes can never drift apart.
- `src/styles/tokens.css` — every colour and measurement in the design.

Pages under `src/app/`: `/` global map · `/cases` register · `/cases/[slug]` ·
`/brands` + `/brands/[slug]` · `/events` + `/events/[slug]` · `/about` method.

### `research/` — leads, and deliberately not data

A top-level directory of unverified research leads. **`content.ts` only reads
`data/`, so nothing in `research/` is ever loaded, validated or rendered.** It
holds `utmb-2026-marathon-weekend-leads.md`: 149 brand activations listed by a
third-party aggregator for UTMB 2026, every one marked
`research lead / unverified` with the url it came from.

Its `README.md` is the thing to read before touching it, because it records the
one exception: the 26 `Pop-up / Expo` leads were transcribed into
`data/events/utmb-mont-blanc-2026.md` as `reportedActivity` and do render — as
leads, never as cases. The other 123 were not, because they are activities
rather than spaces with a duration.

Refresh it **by hand, in a browser**. marathon-weekend.com returns 429 to curl
and keeps doing so with full browser headers — it blocks at the TLS-fingerprint
level. Its `robots.txt` permits access and its Imprint carries no terms against
it, but the block is the answer that counts, so never put this behind a cron job.

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
- **Spatial form is one primary plus one optional secondary**, the same shape as
  activation logic, and deliberately *not* an unrestricted multi-select. A free
  list invites one case to carry four types and destroys the comparison the
  field exists for; one primary plus one optional secondary still forces the
  judgement about which form leads.

  Examples of hybrids: The North Face bundles a Basecamp chalet (`activation`)
  with a permanent store (`permanent-retail`); ASICS bundles a Trail Pop-Up with
  a separately-sited Trail Camp (`activation`); rabbit takes over two hotels and
  calls the result "part pop-up shop" while running a separate Vendor Village
  chalet (`pop-up`). **Run `npm run validate` for the current hybrid count** —
  it is computed, and this file used to state one.

- **`distributed` is a form, not a gap.** NNormal's race weeks (2024 and 2026)
  had no space of their own — every session was in someone else's café, hotel
  or brewery. The author judged that absence the finding, so it is the seventh
  spatial type. A `distributed` case is still one record at one coordinate: the
  town, at precision `city`, with the venues listed in the prose. It draws as a
  hollow `ring` (`src/lib/pin.ts`) so a town-level pin never reads as an
  address. A new pin shape means adding it to `PIN_SHAPES` in `schema.ts` and to
  `pin.ts`; nothing else.

  Three consequences, and they will break quietly if separated:

  1. **The map draws the primary only.** A case is one space at one coordinate,
     so it carries one mark. `card.pinShape`, the accent and the sort order all
     read the primary.
  2. **The filters match either.** Filtering by `pop-up` finds rabbit, whose
     pop-up is its second form — recording a second form is pointless if it is
     invisible. So the facet counts sum to more than the number of cases, the
     same way tag counts already do.
  3. **The brand-page spatial mix counts the primary only**, because `MixBar`
     draws it against `cards.length` and counting a hybrid twice would push the
     bar past 100%.

- **Component CSS lives in `@layer components`, and has to stay there.**
  Tailwind v4 puts its utilities in `@layer utilities`, and **anything written
  outside a layer beats every layer, whatever the specificity.** Unlayered,
  `.card` won over `bg-ink` on the same element — which is why the Key
  strategic insight box rendered white text on a light card, and why
  `.btn-quiet` kept the mobile Menu button sitting on the desktop bar. Two
  symptoms, one cause. Inside the layer, a utility on the element wins, which
  is what every call site already assumed. `.on-photo` and the MapLibre
  overrides stay *outside* on purpose: the first has to beat utilities to flip
  a header's colours over a photograph, the second has to beat a third-party
  stylesheet.

- **`.glass` is liquid glass, not frosted glass.** Frosted is uniformly milky;
  this is close to clear through the middle and does its work at the rim — a
  bright specular edge above, a muted return below, one diagonal sheen, and
  saturation at 190% because blurring averages colours together and drains
  them. Without the saturate it reads as dirty plastic. True refraction is
  deliberately not attempted: no `backdrop-filter` function displaces a pixel,
  so it would need an SVG displacement filter, which is Chromium-only.

  **It only works when there is something behind it.** The events register
  looked like flat pastel blocks for a while because the cards sat on plain
  paper. The fix was putting the photograph behind the panel, not tuning the
  colours.

- **Every record page has a back control, and it goes back.** A case belongs to
  a brand, an edition and the register at once, so a fixed "All cases" link
  sent everyone to the same place whichever of the three they arrived from.
  `BackLink` is an arrow that steps back through history, falling back to a
  real link when `history.length` says there is nowhere to return to.

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

- **The editions strip is a bar calendar, and its colour is state, not
  decoration.** The home page floats one panel over the map with the five dated
  editions nearest today — some behind, some ahead — on a real shared time
  axis, so the gap between two race weeks reads as a gap. Grey has finished,
  red is running now or starts within a month, blue is further out. Position
  still says *when*, a rule marks today on every row, and the key is printed
  underneath, so the state never rests on hue alone. The events register
  carries the same three states as a wash over each card, and a finished
  edition renders in grayscale.

  Undated editions are left out rather than guessed into an order.

  **Both are client components, and that is the point.** The pages are
  statically built, so the server's "today" is the build date; a strip built in
  September that still called a race "upcoming" in December would be a
  written-down claim about live data, which is exactly what rule 10's corollary
  exists to prevent. Which five, what colour, and whether to desaturate are all
  worked out against the reader's clock. The shared logic is
  `src/lib/edition-state.ts` — pure, no React — so the two views can never
  disagree about what "upcoming" means.

- **Pictures are real, credited, and honest about what they show.** `hero` on
  an event and `images` on a case both carry `credit` and `sourceUrl`: an
  uncredited photo is the same problem as an unsourced claim. The first entry
  in a case's `images` is its hero. A case with no picture still reserves the
  same header band and fills it with the locator — the record's own coordinate
  inside its country's box from `data/vocab/country-bounds.yml`, a diagram made
  only of data already in the record. **Never a stand-in photograph**, because
  a photograph is the most convincing thing on a page and an invented plate is
  how a placeholder once passed for research.

  Two live compromises, both written into the captions rather than hidden.
  Most event heroes come from Wikimedia Commons and show an **earlier edition**
  of the same race, so every caption leads with the year and says plainly that
  it is not the edition the record is about; where a source states no year, the
  caption claims none. And Sydney has no hero at all, because Commons has no
  photograph of that race — the gap stands rather than being filled. If the
  first compromise is ever judged wrong, the fix is to delete the heroes, not
  to soften the captions.

  Brand-published product visuals are used even where the brand generated them
  rather than photographed them. What this Atlas studies is what brands
  publish, and how a brand made its own product shot does not stop it being the
  brand's material; the caption carries the distinction, and a verification
  note records the provenance.

- **Pictures: every case should look like `arcteryx-distance-aid-station`** — a
  hero plus several detail plates. The author asked for this explicitly after
  two rounds of "the pictures are still missing". Aim for 5–8 per case, in this
  order: photographs of the space at that edition; the brand's / organiser's /
  agency's own visuals for that activation (key art, programme graphics, maps,
  renders) and product shots of the products the case names; official photos of
  the venue building. Each caption says which it is ("a graphic, not a
  photograph of the space"; "the building as listed, not the installation").
  Never a social-media CDN (Instagram, Facebook…), stock, or another year's
  photo passed off as this one. The cited sources are usually pre-event
  announcements with no photos — look further: builders' and art directors'
  portfolios, post-event newsletters, trade press. Downloads are batched and
  approved by the author first; every picture is then looked at before it is
  captioned, and anything over 2000px is resized with `sharp`.

  **Pictures must be visible where people browse.** The card carries
  `heroImage` (the first image) and `CaseThumb` draws it in the register, the
  shared list row, the event comparison table and the map preview card. For a
  while pictures existed only on case pages, and the site looked imageless.

- **An edition may show reported activity it has not researched, as leads.**
  `reportedActivity` on an event record holds branded spaces a third party
  lists for that edition, unverified. UTMB Mont-Blanc 2026 carries 26 of them
  against a smaller number of researched cases, and that ratio is the reason the
  section exists: showing only the researched ones would make the research look
  more complete than it is. **Run `npm run validate` for the current counts** —
  this file said "against 5 researched cases" until the fifth new case landed,
  which is the same way the footer banner went stale.

  The rules that keep it from becoming a second class of case: every entry must
  carry the url it was reported at (the schema refuses one without); the
  section is last on the page, drawn as dashed boxes rather than cards, and
  opens by saying none of it is research and none of it may be cited; entries
  have no evidence status, because a status is a claim about verification and
  nothing here has been verified. **A lead never becomes a case by being
  copied** — a case is written from the brand, the organiser, the agency or the
  press, and an aggregator points at those rather than standing in for them.

- **The event page leads with occupancy, not a list.** Cases are spaces with a
  duration, not timed events, so `EventTimeline` draws a bar per case. The axis
  spans the race days **plus every dated space around them** (falling back to
  the race days if that exceeds 60 days), with the race columns labelled Race: a
  marathon is one day, and an axis of race days alone clipped every city space
  to "1 day". A case whose dates were never published gets a dashed ghost bar
  across the race days only, labelled as such, rather than a guessed position.

## How research is done here — methods that worked, and traps

- **A lead's origin is often one click away.** marathon-weekend.com's event
  pages link the Instagram post or form they were built from; that post is often
  the brand's or a co-signed collaboration (Goldwin Motion Studies was found
  this way). Open the aggregator page **by hand in the browser**, once.
- **Eventbrite organiser pages** list every session a brand ran in a city with
  addresses in their JSON-LD (NNormal's whole Chamonix week came from one).
- **Dead brand pages live on the Wayback Machine** (On Labs Boston, Chaiten).
  Read the capture's *text*, and check the year: one Brooks capture a research
  pass cited as 2025 was 2023 content.
- **Year from weekday.** Pages are reused every edition. "Tuesday 25 August"
  fits 2026, not 2025 — use it, and say so in the notes.
- **Geocode with Nominatim, one request per address, with the postcode.**
  "250 Boylston Street, Boston" first landed in Jamaica Plain. Street-only hits
  are `approximate`; a named building or shop is `exact`.
- **Agent reports are leads, never sources.** Background research agents were
  useful for finding candidates, and wrong often enough (a coffee partner the
  article never mentions, a 2023 page called 2025, alt text invented by a
  summariser) that every quote was re-read on the live page before it went in.
  WebFetch paraphrases; for quotes, read the page text in the browser.
- **Don't loop over Instagram.** One post opened once, read from its page
  metadata, is the limit (rule 7).
- **Leads closed without a case** are listed, with reasons, in
  `research/README.md`, so they are not researched twice.

## Known limitations, recorded and not yet fixed

- **Activation-logic vocabulary candidates are tracked, not added.** Some cases
  have hit mechanisms the vocabulary cannot express — see the candidate block at
  the foot of `data/vocab/activation-logic.yml`, which is the list, so this file
  does not carry a count that can rot. A candidate is only promoted to
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

The project path contains spaces, so quote it.

**Commit messages from PowerShell:** `git commit -m "…"` with double quotes
inside the message is split into pathspecs by PowerShell 5.1. Write the message
to a file and use `git commit -F <file>`.

**Don't run `npm run build` while another session's dev server is running in
this folder** — both use `.next`. `npx tsc --noEmit` plus loading pages in the
browser is the safe check then. To check a command the way she
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
rule 1 and `SOURCE_TYPES` in `src/lib/schema.ts`. Images are built too — see
the picture rule under design decisions.

There is still **no image pipeline**, and none is wanted. Sources serve wildly
different sizes; anything oversized is resized once by hand with the `sharp`
already in `node_modules` and then the record says it was resized. A source
that served 20-30MB originals is the reason this is written down.
