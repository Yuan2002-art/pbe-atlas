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

/* --- research overview --------------------------------------------------- */

const byStatus = new Map<string, number>();
for (const c of data.cases) byStatus.set(c.status, (byStatus.get(c.status) ?? 0) + 1);

console.log(`\n${DIM}Evidence status${OFF}`);
for (const status of ["verified", "partially-verified", "ai-reconstructed", "placeholder"]) {
  const n = byStatus.get(status) ?? 0;
  if (n > 0) console.log(`  ${status.padEnd(20)} ${n}`);
}

/* Activation logic is free text on purpose, which means a typo silently
   creates a new category. Listing every distinct value with its count makes
   "Community" vs "community" vs "Communtiy" obvious at a glance. */
const logicCounts = new Map<string, number>();
for (const c of data.cases) {
  for (const logic of c.primaryActivationLogic) {
    logicCounts.set(logic, (logicCounts.get(logic) ?? 0) + 1);
  }
}

if (logicCounts.size > 0) {
  console.log(`\n${DIM}Activation logic in use${OFF} ${DIM}(check for near-duplicates)${OFF}`);
  for (const [logic, n] of [...logicCounts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    console.log(`  ${String(n).padStart(2)} x  ${logic}`);
  }
}

/* --- non-blocking notices ----------------------------------------------- */

const notices: string[] = [];

const placeholders = data.cases.filter((c) => c.status === "placeholder");
if (placeholders.length > 0) {
  notices.push(
    `${placeholders.length} of ${data.cases.length} cases are still marked "placeholder" — demo content, not research.`,
  );
}

for (const c of data.cases) {
  // Placeholder cases are demo scaffolding — holding them to research
  // standards would bury the notices that actually matter in noise.
  if (c.status === "placeholder") continue;

  if (c.images.length === 0) notices.push(`cases/${c.slug}.md has no images.`);
  if (c.sources.length > 0 && c.sources.every((s) => s.type === "other")) {
    notices.push(
      `cases/${c.slug}.md: no source is categorised (official-brand / event-organiser / agency-studio / editorial).`,
    );
  }
  if (c.primaryActivationLogic.length === 0) {
    notices.push(`cases/${c.slug}.md has no primaryActivationLogic.`);
  }
  if (c.status === "partially-verified" && !c.sections.verificationNotes) {
    notices.push(
      `cases/${c.slug}.md is partially-verified but has no "## Verification notes" saying which parts are not.`,
    );
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
