# Performance Brand Experience Atlas

A research atlas mapping how performance brands — Arc'teryx, Salomon, On, Satisfy,
HOKA, Nike ACG, adidas Terrex, Oakley, Descente, Rapha — use permanent retail,
races, pop-ups, product launches and activations to build performance
credibility and cultural meaning.

This is the **MVP**: the structure of the research, working end to end, with
placeholder cases in place of research.

> ### The data in this build is invented
> All ten cases are marked `status: placeholder`. The brands are real; the
> spaces described are not. They exist so the map, the filters and the
> comparison views can be judged before the research starts. Nothing here may
> be cited. Replace them file by file, and change `status` when you have
> attached real sources.

---

## Run it

```bash
npm install
npm run map-style     # once after cloning: builds the map style + map worker
npm run dev           # then open http://localhost:3000
```

Other commands:

| Command | What it does |
|---|---|
| `npm run validate` | Checks every file in `data/` and explains anything wrong, in plain language. Run it after editing data. |
| `npm run new-case -- <brand-slug> "<Title>"` | Creates a new case file with every field and question already in place. |
| `npm run map-style` | Rebuilds the map style from `data/map-palette.json`, and refreshes the map library's worker files. Run after changing map colours or upgrading `maplibre-gl`. |
| `npm run build` | Production build. Also type-checks everything. |
| `npm start` | Serves the production build locally. |

---

## Add a case in five steps

1. **Scaffold the file**

   ```bash
   npm run new-case -- salomon "UTMB Basecamp"
   ```

   That writes `data/cases/salomon-utmb-basecamp.md`.

2. **Fill in the frontmatter** — the block between the two `---` lines. The
   fields that matter most:

   - `brand` — must match a filename in `data/brands/` (without `.md`)
   - `coordinates` — **longitude first, then latitude**. Right-click a spot in
     Google Maps and it gives you `latitude, longitude` — so swap them.
   - `spatialType` — one id from `data/vocab/spatial-types.yml`
   - `tags` — one or more ids from `data/vocab/classification-tags.yml`
   - `relatedEvent` — a filename from `data/events/` if it happened at an event;
     delete the line if not
   - `status` — leave as `placeholder` until you have real sources

3. **Answer the questions** in the body. Each `## Heading` is one section; write
   normal prose underneath. Two headings are optional (Why this event, Why this
   product) and can be deleted if they do not apply.

4. **Add images** to `public/images/cases/<slug>/` and list them under
   `images:` with a caption, a credit and a source URL.

5. **Check it**

   ```bash
   npm run validate
   ```

   Then reload the site — it picks up the change immediately.

To add a brand or an event, copy an existing file in `data/brands/` or
`data/events/` and edit it. The filename becomes the URL.

---

## Where everything lives

```
data/                    ← everything you edit is in here
  cases/<slug>.md        one file per case
  brands/<slug>.md       one file per brand
  events/<slug>.md       one file per event
  vocab/
    spatial-types.yml       the six spatial types, their definitions and map marks
    classification-tags.yml the nine research tags and their definitions
  map-palette.json       map colours (then run `npm run map-style`)

public/
  images/cases/<slug>/   case images
  map/                   generated map style + map worker (committed; don't edit)

src/
  app/                   one folder per page
  components/            the interface, grouped by what it is for
  lib/
    schema.ts            what a case, brand and event may contain — read this first
    content.ts           the only file that reads from disk  ← swap for a database later
    queries.ts           everything the pages ask of the data
    filters.ts           the filter logic and URL handling
    sections.ts          the prose sections of a case, in order
  styles/tokens.css      every colour and measurement in the design
scripts/                 the three npm commands above
```

Two files are worth knowing by name:

- **`src/lib/schema.ts`** is the data model. Reading it is the fastest way to
  understand the whole project.
- **`src/styles/tokens.css`** holds every colour, rule weight and measurement.
  Change a value there and it changes everywhere.

---

## Adding a spatial type or a classification tag

Add a block to the relevant file in `data/vocab/`. The filters, the map key,
the case pages and the Method page all read from those two files, so nothing in
the code needs to change.

For a new spatial type, `pinShape` must be one of: `square`, `circle`,
`triangle`, `cross`, `diamond`, `chevron`.

---

## Design

Warm off-white paper, dark ink, hairline rules, technical blue and signal red,
uppercase monospaced labels, two typefaces (Archivo and IBM Plex Mono). The map
is deliberately pale so the case pins carry all the contrast, and pins are
**shape-coded** so the map still reads printed in black and white. A dashed pin
means a placeholder record.

---

## Deliberately not built yet

AI-assisted case research · image-to-3D reconstruction · floor-plan
reconstruction · timeline view · similarity search · user submissions ·
verified / reconstructed / AI-interpreted evidence labels · a database · full-text
search · aggregate charts across cases.

The structure anticipates them:

- `src/lib/content.ts` is the only place that touches the filesystem, so a
  database can replace it without changing any page.
- `src/app/api/` is where a research agent would live; it would write the same
  `data/cases/*.md` files you edit by hand.
- `status` already exists for richer evidence labels.
- Images already carry a credit and a source URL.

---

## Hosting

Nothing here needs a server: `npm run build` prerenders every case, brand and
event page. It deploys to Vercel with no configuration, whenever you want a link
to share. No accounts or API keys are needed to run it locally.

The basemap comes from [OpenFreeMap](https://openfreemap.org) — free, no
account, no API key. If it is ever unavailable, put another MapLibre style URL
in `data/map-palette.json` and run `npm run map-style` again.
