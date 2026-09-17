/* ===========================================================================
   npm run new-case "Brand slug" "Case title"

   Writes a new, empty case file into data/cases/ with every field and every
   research question already in place, so you only have to fill it in.

   Example:
     npm run new-case -- salomon "UTMB Basecamp"
   creates data/cases/salomon-utmb-basecamp.md
   =========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { CASE_SECTIONS } from "../src/lib/sections";

const [brandArg, titleArg] = process.argv.slice(2);

if (!brandArg || !titleArg) {
  console.log(`
Usage:  npm run new-case -- <brand-slug> "<Case title>"
Example: npm run new-case -- salomon "UTMB Basecamp"

The brand slug must match a file in data/brands/ (without .md).
`);
  process.exit(1);
}

const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const slug = `${slugify(brandArg)}-${slugify(titleArg)}`;
const file = path.join(process.cwd(), "data", "cases", `${slug}.md`);

if (fs.existsSync(file)) {
  console.error(`\ndata/cases/${slug}.md already exists — nothing written.\n`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const frontmatter = `---
# NEW CASE — everything below is a prompt for you, not research.
# Keep status: placeholder until you have attached real sources.
title: ${titleArg}
brand: ${slugify(brandArg)}
# placeholder | ai-reconstructed | partially-verified | verified
# Anything above "placeholder" needs at least one source with a url.
status: placeholder
# The ONE mechanism this space runs on — an id from
# data/vocab/activation-logic.yml. Exactly one; listing everything that applies
# is what tags are for. An optional second may follow, and must differ.
primaryActivationLogic: ""
secondaryActivationLogic: ""
activationLogicRationale: >-
  Why those two and not the alternatives you considered.
collaborators: []
#  - name: ""
#    role: ""              # what they actually did: agency, production, product
location:
  venue: ""
  city: ""
  region: ""
  country: ""
  countryCode: XX          # two capital letters, e.g. FR
  coordinates: [0.0000, 0.0000]   # [longitude, latitude] — longitude FIRST
  coordinatePrecision: city       # exact | approximate | city
date:
  start: ${today}
  # end: ${today}          # delete if it is a single day
  ongoing: false           # true for a store that is still open
  precision: day           # day | month | year | unknown
spatialType: pop-up        # see data/vocab/spatial-types.yml
# relatedEvent:            # see data/events/ — delete if not at an event
product: ""
tags:                      # see data/vocab/classification-tags.yml
  - retail
images: []
#  - src: /images/cases/${slug}/01.jpg
#    caption: ""
#    credit: ""
#    sourceUrl: ""
# Reserved for the future cross-case Strategy Matrix. Leave these null unless
# the evidence genuinely supports a position — a guessed number plots with the
# same confidence as a researched one.
strategyMatrix:
  performanceToCulture: null   # -100 performance proof  <->  +100 cultural meaning
  productToExperience: null    # -100 product-centred    <->  +100 community / experience
  confidence: null             # high | medium | low
  rationale: null
sources: []
#  - title: ""
#    publisher: ""
#    url: ""
#    type: official-brand  # official-brand | event-organiser | agency-studio | editorial | other
#    accessed: ${today}
---
`;

const body = CASE_SECTIONS.map(
  (section) =>
    `\n## ${section.heading}\n${
      section.required ? "" : "<!-- optional — delete this section if not relevant -->\n"
    }`,
).join("");

fs.writeFileSync(file, `${frontmatter}${body}`, "utf8");

console.log(`
Created data/cases/${slug}.md

Next:
  1. Fill in the frontmatter (location, date, spatial type, tags).
  2. Answer the questions in the body.
  3. Put images in public/images/cases/${slug}/ and list them under images:
  4. Run  npm run validate
`);
