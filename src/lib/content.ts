/* ===========================================================================
   CONTENT LAYER — the ONLY place in the project that touches the filesystem.

   Everything above this file (pages, components, queries) asks for cases,
   brands and events and does not care where they came from. If you ever
   outgrow Markdown files, this is the single file that becomes a database
   client; nothing else has to change.
   =========================================================================== */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import { marked } from "marked";
import { z } from "zod";

import {
  BrandFrontmatterSchema,
  CaseFrontmatterSchema,
  CaseSectionsSchema,
  ClassificationTagSchema,
  EventFrontmatterSchema,
  SpatialTypeSchema,
  type Brand,
  type Case,
  type CaseSections,
  type ClassificationTag,
  type Event,
  type SpatialType,
} from "./schema";
import { CASE_SECTIONS, SECTION_BY_HEADING, normaliseHeading } from "./sections";

const DATA_DIR = path.join(process.cwd(), "data");

export interface DataSetError {
  file: string;
  field: string;
  message: string;
}

export interface DataSet {
  cases: Case[];
  brands: Brand[];
  events: Event[];
  spatialTypes: SpatialType[];
  tags: ClassificationTag[];
  errors: DataSetError[];
}

/* --------------------------------------------------------------------------
   Low-level file helpers
   -------------------------------------------------------------------------- */

function readDir(sub: string): string[] {
  const dir = path.join(DATA_DIR, sub);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();
}

function pushIssues(
  errors: DataSetError[],
  file: string,
  error: z.ZodError,
  prefix = "",
): void {
  for (const issue of error.issues) {
    const where = issue.path.join(".") || "(root)";
    errors.push({
      file,
      field: prefix ? `${prefix} -> ${where}` : where,
      message: issue.message,
    });
  }
}

function readYaml<T>(file: string, schema: z.ZodType<T>, errors: DataSetError[]): T[] {
  const full = path.join(DATA_DIR, "vocab", file);
  if (!fs.existsSync(full)) {
    errors.push({ file: `vocab/${file}`, field: "-", message: "file is missing" });
    return [];
  }
  const parsed = yaml.load(fs.readFileSync(full, "utf8"));
  if (!Array.isArray(parsed)) {
    errors.push({
      file: `vocab/${file}`,
      field: "-",
      message: "must be a YAML list of entries",
    });
    return [];
  }
  const out: T[] = [];
  parsed.forEach((entry, i) => {
    const result = schema.safeParse(entry);
    if (result.success) out.push(result.data);
    else pushIssues(errors, `vocab/${file}`, result.error, `entry ${i + 1}`);
  });
  return out;
}

/** Render a Markdown string to HTML. */
function md(source: string): string {
  return marked.parse(source, { async: false }) as string;
}

/* --------------------------------------------------------------------------
   Markdown body -> prose sections

   A case body is a series of `## Heading` blocks. Headings are matched
   loosely (case and punctuation insensitive) against lib/sections.ts, so
   "Why this location?" and "why this location" both work.
   -------------------------------------------------------------------------- */

function parseSections(
  body: string,
  file: string,
  errors: DataSetError[],
): CaseSections | null {
  const found: Record<string, string> = {};
  const unknown: string[] = [];

  // Split on level-2 headings, keeping the heading text.
  const blocks = body.split(/^##\s+/m).slice(1);
  for (const block of blocks) {
    const newline = block.indexOf("\n");
    const heading = (newline === -1 ? block : block.slice(0, newline)).trim();
    const text = (newline === -1 ? "" : block.slice(newline + 1)).trim();
    const def = SECTION_BY_HEADING[normaliseHeading(heading)];
    if (!def) {
      unknown.push(heading);
      continue;
    }
    found[def.key] = text;
  }

  for (const heading of unknown) {
    errors.push({
      file,
      field: `## ${heading}`,
      message:
        "not a recognised section heading - see src/lib/sections.ts for the exact list",
    });
  }

  for (const def of CASE_SECTIONS) {
    if (def.required && !found[def.key]) {
      errors.push({
        file,
        field: `## ${def.heading}`,
        message: "required section is missing or empty",
      });
    }
  }

  const result = CaseSectionsSchema.safeParse(found);
  if (!result.success) {
    pushIssues(errors, file, result.error, "body");
    return null;
  }
  // Render each section's Markdown to HTML once, here.
  const rendered = Object.fromEntries(
    Object.entries(result.data).map(([k, v]) => [k, v ? md(v) : ""]),
  );
  return rendered as CaseSections;
}

/* --------------------------------------------------------------------------
   Loaders
   -------------------------------------------------------------------------- */

function loadCases(errors: DataSetError[]): Case[] {
  const cases: Case[] = [];

  for (const filename of readDir("cases")) {
    const file = `cases/${filename}`;
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(DATA_DIR, "cases", filename), "utf8");
    const { data, content } = matter(raw);

    const front = CaseFrontmatterSchema.safeParse(data);
    const sections = parseSections(content, file, errors);
    if (!front.success) {
      pushIssues(errors, file, front.error);
      continue;
    }
    if (!sections) continue;

    cases.push({ ...front.data, slug, ref: "", sections });
  }

  // Oldest first, then assign stable CASE 001... numbers in that order.
  cases.sort(
    (a, b) => a.date.start.localeCompare(b.date.start) || a.slug.localeCompare(b.slug),
  );
  cases.forEach((c, i) => {
    c.ref = String(i + 1).padStart(3, "0");
  });

  return cases;
}

function loadBrands(errors: DataSetError[]): Brand[] {
  const brands: Brand[] = [];
  for (const filename of readDir("brands")) {
    const file = `brands/${filename}`;
    const slug = filename.replace(/\.md$/, "");
    const { data, content } = matter(
      fs.readFileSync(path.join(DATA_DIR, "brands", filename), "utf8"),
    );
    const front = BrandFrontmatterSchema.safeParse(data);
    if (!front.success) {
      pushIssues(errors, file, front.error);
      continue;
    }
    brands.push({ ...front.data, slug, body: md(content.trim()) });
  }
  brands.sort((a, b) => a.name.localeCompare(b.name));
  return brands;
}

function loadEvents(errors: DataSetError[]): Event[] {
  const events: Event[] = [];
  for (const filename of readDir("events")) {
    const file = `events/${filename}`;
    const slug = filename.replace(/\.md$/, "");
    const { data, content } = matter(
      fs.readFileSync(path.join(DATA_DIR, "events", filename), "utf8"),
    );
    const front = EventFrontmatterSchema.safeParse(data);
    if (!front.success) {
      pushIssues(errors, file, front.error);
      continue;
    }
    events.push({ ...front.data, slug, body: md(content.trim()) });
  }
  events.sort((a, b) => a.name.localeCompare(b.name));
  return events;
}

/* --------------------------------------------------------------------------
   Cross-reference checks - the mistakes most likely to bite in practice:
   a mistyped brand slug, a tag that does not exist, a renamed event.
   -------------------------------------------------------------------------- */

function checkReferences(data: DataSet): void {
  const brandSlugs = new Set(data.brands.map((b) => b.slug));
  const eventSlugs = new Set(data.events.map((e) => e.slug));
  const typeIds = new Set(data.spatialTypes.map((t) => t.id));
  const tagIds = new Set(data.tags.map((t) => t.id));

  const suggest = (value: string, pool: Set<string>): string => {
    const near = [...pool].find(
      (candidate) =>
        candidate.startsWith(value.slice(0, 3)) ||
        value.startsWith(candidate.slice(0, 3)),
    );
    return near
      ? ` Did you mean "${near}"?`
      : ` Known values: ${[...pool].join(", ")}.`;
  };

  for (const c of data.cases) {
    const file = `cases/${c.slug}.md`;
    if (!brandSlugs.has(c.brand)) {
      data.errors.push({
        file,
        field: "brand",
        message: `no brand file data/brands/${c.brand}.md.${suggest(c.brand, brandSlugs)}`,
      });
    }
    if (!typeIds.has(c.spatialType)) {
      data.errors.push({
        file,
        field: "spatialType",
        message: `"${c.spatialType}" is not in data/vocab/spatial-types.yml.${suggest(
          c.spatialType,
          typeIds,
        )}`,
      });
    }
    if (c.relatedEvent && !eventSlugs.has(c.relatedEvent)) {
      data.errors.push({
        file,
        field: "relatedEvent",
        message: `no event file data/events/${c.relatedEvent}.md.${suggest(
          c.relatedEvent,
          eventSlugs,
        )}`,
      });
    }
    for (const tag of c.tags) {
      if (!tagIds.has(tag)) {
        data.errors.push({
          file,
          field: "tags",
          message: `"${tag}" is not in data/vocab/classification-tags.yml.${suggest(
            tag,
            tagIds,
          )}`,
        });
      }
    }
    if (new Set(c.tags).size !== c.tags.length) {
      data.errors.push({ file, field: "tags", message: "contains a duplicate tag" });
    }
  }
}

/* --------------------------------------------------------------------------
   Public entry point

   In production the files are read once per process. In development they are
   re-read on every request, so editing a file in data/ and reloading the page
   is enough - you never have to restart the dev server.
   -------------------------------------------------------------------------- */

const CACHE_ENABLED = process.env.NODE_ENV === "production";

let cached: DataSet | null = null;

export function loadDataSet(): DataSet {
  if (cached && CACHE_ENABLED) return cached;

  const errors: DataSetError[] = [];
  const spatialTypes = readYaml("spatial-types.yml", SpatialTypeSchema, errors);
  const tags = readYaml("classification-tags.yml", ClassificationTagSchema, errors);
  const data: DataSet = {
    cases: loadCases(errors),
    brands: loadBrands(errors),
    events: loadEvents(errors),
    spatialTypes,
    tags,
    errors,
  };
  checkReferences(data);

  cached = data;
  return data;
}

/** Same as loadDataSet() but refuses to hand back broken data - used by the
 *  pages, so a data mistake fails the build loudly instead of rendering blanks. */
export function requireDataSet(): DataSet {
  const data = loadDataSet();
  if (data.errors.length > 0) {
    const list = data.errors
      .slice(0, 10)
      .map((e) => `  - ${e.file} -> ${e.field}: ${e.message}`)
      .join("\n");
    throw new Error(
      `${data.errors.length} problem(s) in data/. Run "npm run validate" for the full report.\n${list}`,
    );
  }
  return data;
}
