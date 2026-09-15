/* ===========================================================================
   npm run validate

   Reads every file in data/ and reports, in plain language, anything that
   would break the site: a missing field, a mistyped brand slug, a tag that
   does not exist in the vocabulary, a required section left empty.

   Run this after editing data. It changes nothing — it only reports.
   =========================================================================== */

import { loadDataSet } from "../src/lib/content";
import { CASE_SECTIONS } from "../src/lib/sections";

const RED = "[31m";
const GREEN = "[32m";
const YELLOW = "[33m";
const DIM = "[2m";
const BOLD = "[1m";
const OFF = "[0m";

const data = loadDataSet();

console.log(`${BOLD}Performance Brand Experience Atlas — data check${OFF}\n`);

/* --- what was found ----------------------------------------------------- */

console.log(`${DIM}Loaded${OFF}`);
console.log(`  cases            ${data.cases.length}`);
console.log(`  brands           ${data.brands.length}`);
console.log(`  events           ${data.events.length}`);
console.log(`  spatial types    ${data.spatialTypes.length}`);
console.log(`  tags             ${data.tags.length}`);

/* --- errors ------------------------------------------------------------- */

if (data.errors.length > 0) {
  console.log(`\n${RED}${BOLD}${data.errors.length} problem(s) found${OFF}\n`);
  let currentFile = "";
  for (const error of data.errors) {
    if (error.file !== currentFile) {
      currentFile = error.file;
      console.log(`${BOLD}data/${currentFile}${OFF}`);
    }
    console.log(`  ${RED}x${OFF} ${error.field}`);
    console.log(`    ${error.message}`);
  }
  console.log(
    `\n${DIM}Fix the files above and run npm run validate again.${OFF}\n`,
  );
  process.exit(1);
}

console.log(`\n${GREEN}All data files are valid.${OFF}`);

/* --- non-blocking notices ----------------------------------------------- */

const notices: string[] = [];

const placeholders = data.cases.filter((c) => c.status === "placeholder");
if (placeholders.length > 0) {
  notices.push(
    `${placeholders.length} of ${data.cases.length} cases are still marked "placeholder" — demo content, not research.`,
  );
}

for (const c of data.cases) {
  if (c.images.length === 0) notices.push(`cases/${c.slug}.md has no images.`);
  const unsourced = c.sources.filter((s) => !s.url).length;
  if (c.sources.length === 0) {
    notices.push(`cases/${c.slug}.md has no sources.`);
  } else if (unsourced === c.sources.length) {
    notices.push(`cases/${c.slug}.md has sources but none with a URL.`);
  }
  for (const section of CASE_SECTIONS) {
    if (!section.required && !c.sections[section.key as keyof typeof c.sections]) {
      notices.push(
        `cases/${c.slug}.md leaves the optional section "${section.heading}" empty.`,
      );
    }
  }
}

const usedBrands = new Set(data.cases.map((c) => c.brand));
for (const brand of data.brands) {
  if (!usedBrands.has(brand.slug)) {
    notices.push(`brands/${brand.slug}.md has no cases yet.`);
  }
}

const usedEvents = new Set(data.cases.map((c) => c.relatedEvent).filter(Boolean));
for (const event of data.events) {
  if (!usedEvents.has(event.slug)) {
    notices.push(`events/${event.slug}.md has no cases yet.`);
  }
}

const usedTags = new Set(data.cases.flatMap((c) => c.tags));
for (const tag of data.tags) {
  if (!usedTags.has(tag.id)) notices.push(`tag "${tag.id}" is not used by any case.`);
}

const usedTypes = new Set(data.cases.map((c) => c.spatialType));
for (const type of data.spatialTypes) {
  if (!usedTypes.has(type.id)) {
    notices.push(`spatial type "${type.id}" is not used by any case.`);
  }
}

if (notices.length > 0) {
  console.log(`\n${YELLOW}Notices${OFF} ${DIM}(nothing is broken — these are gaps)${OFF}`);
  for (const notice of notices) console.log(`  ${YELLOW}-${OFF} ${notice}`);
}

console.log("");
