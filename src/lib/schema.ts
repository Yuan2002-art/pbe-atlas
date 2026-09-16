/* ===========================================================================
   SCHEMA — the single definition of what a case, brand and event may contain.
   Used by `npm run validate` and by the site itself, so the pages and the
   validator can never disagree.

   Reading this file is the fastest way to understand the data model.
   =========================================================================== */

import { z } from "zod";

/* --- small shared pieces -------------------------------------------------- */

/** YAML turns an unquoted 2024-08-26 into a JS Date. Accept either and
 *  normalise to a plain "YYYY-MM-DD" string. */
const IsoDate = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v.trim()))
  .refine((v) => /^\d{4}(-\d{2}(-\d{2})?)?$/.test(v), {
    message: 'must be a date written as YYYY-MM-DD, YYYY-MM or YYYY (e.g. 2024-08-26)',
  });

/** Evidence status, weakest to strongest. Every record carries one, and it is
 *  shown on the page — a reader should never have to guess how much a record
 *  can be trusted.
 *
 *  placeholder         invented demo content. Not research. Never cite.
 *  ai-reconstructed    assembled by a model from indirect signals, unchecked.
 *  partially-verified  some claims sourced, others not; see Verification notes.
 *  verified            every claim on the record traces to a listed source.
 */
export const StatusSchema = z.enum([
  "placeholder",
  "ai-reconstructed",
  "partially-verified",
  "verified",
]);
export type Status = z.infer<typeof StatusSchema>;

export const LocationSchema = z.strictObject({
  /** Building, street or venue name. Empty means "not recorded". */
  venue: z.string().default(""),
  city: z.string().min(1, "city is required"),
  /** State, province, prefecture, département. Empty means "not recorded". */
  region: z.string().default(""),
  country: z.string().min(1, "country is required"),
  countryCode: z
    .string()
    .regex(/^[A-Z]{2}$/, "countryCode must be two capital letters, e.g. FR or JP"),
  /** [longitude, latitude] — longitude FIRST, the map library's order. */
  coordinates: z.tuple([
    z.number().min(-180).max(180),
    z.number().min(-90).max(90),
  ]),
  /** How much the pin can be trusted. A case whose street address is unknown
   *  still needs a pin, but it must not look as precise as a surveyed one.
   *  exact       geocoded from a documented address
   *  approximate a described area — a square, a district, a mountain station
   *  city        no address known; the pin sits on the town centre */
  coordinatePrecision: z.enum(["exact", "approximate", "city"]).default("exact"),
});
export type CaseLocation = z.infer<typeof LocationSchema>;

export const DateRangeSchema = z
  .strictObject({
    start: IsoDate,
    end: IsoDate.optional(),
    /** true for permanent retail that is still open. */
    ongoing: z.boolean().default(false),
    precision: z.enum(["day", "month", "year", "unknown"]).default("day"),
  })
  .refine((d) => !d.end || d.end >= d.start, {
    message: "end date cannot be before start date",
    path: ["end"],
  });

export const ImageSchema = z.strictObject({
  src: z.string().min(1, "image src is required, e.g. /images/cases/<slug>/01.svg"),
  caption: z.string().min(1, "every image needs a caption"),
  /** Photographer / rights holder. "TBD" while unresearched. */
  credit: z.string().min(1, 'every image needs a credit (use "TBD" if unknown)'),
  /** Where the image came from. Empty string while unresearched. */
  sourceUrl: z.string().default(""),
});
export type CaseImage = z.infer<typeof ImageSchema>;

/** Who is speaking. Two sources are not equal evidence: a brand describing its
 *  own space, the event organiser confirming it happened, the studio that built
 *  it, and a magazine reporting on it carry different weight, and a thesis has
 *  to be able to see which is which. */
export const SOURCE_TYPES = [
  "official-brand",
  "event-organiser",
  "agency-studio",
  "editorial",
  "other",
] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

export const SourceSchema = z.strictObject({
  title: z.string().min(1, "source title is required"),
  publisher: z.string().default(""),
  url: z.string().default(""),
  type: z.enum(SOURCE_TYPES).default("other"),
  accessed: IsoDate.optional(),
});
export type Source = z.infer<typeof SourceSchema>;

/** A partner, agency, studio or collaborating brand. Write either a plain
 *  string or, better, a name with the role it actually played. */
export const CollaboratorSchema = z
  .union([
    z.string().min(1),
    z.strictObject({
      name: z.string().min(1, "collaborator name is required"),
      role: z.string().default(""),
    }),
  ])
  .transform((value) =>
    typeof value === "string" ? { name: value, role: "" } : value,
  );
export type Collaborator = { name: string; role: string };

/* --- case ---------------------------------------------------------------- */

/** Frontmatter of data/cases/<slug>.md */
export const CaseFrontmatterSchema = z.strictObject({
  title: z.string().min(1, "title is required"),
  /** Brand slug — must match a file in data/brands/. */
  brand: z.string().min(1, "brand is required (a slug from data/brands/)"),
  /** Partners, agencies, studios and collaborating brands, with their role. */
  collaborators: z.array(CollaboratorSchema).default([]),
  status: StatusSchema,
  /** The strategic logic the case runs on, e.g. ["Community", "Product Drop"].
   *  Free text on purpose: this is a research instrument still being formed,
   *  so it must not be constrained by code. `npm run validate` lists every
   *  distinct value in use so inconsistent wording is easy to spot. */
  primaryActivationLogic: z.array(z.string().min(1)).default([]),
  location: LocationSchema,
  date: DateRangeSchema,
  /** One spatial type — an id from data/vocab/spatial-types.yml */
  spatialType: z.string().min(1, "spatialType is required"),
  /** Event slug from data/events/, if this case happened at an event. */
  relatedEvent: z.string().min(1).optional(),
  /** Product or collaboration at the centre of the case. */
  product: z.string().default(""),
  /** One or more ids from data/vocab/classification-tags.yml */
  tags: z.array(z.string()).min(1, "at least one classification tag is required"),
  images: z.array(ImageSchema).default([]),
  sources: z.array(SourceSchema).default([]),
});

/** The prose sections parsed out of the Markdown body.
 *
 *  Which of these are required is declared once, in lib/sections.ts, and
 *  checked there — so a missing section produces one readable message
 *  ("required section is missing or empty") instead of two. */
export const CaseSectionsSchema = z.object({
  // Verified facts layer
  description: z.string().default(""),
  verificationNotes: z.string().default(""),
  // Strategic interpretation layer
  strategicPurpose: z.string().default(""),
  archiveUse: z.string().default(""),
  whyLocation: z.string().default(""),
  whyTiming: z.string().default(""),
  whyEvent: z.string().default(""),
  whyProduct: z.string().default(""),
  performanceClaim: z.string().default(""),
  culturalMeaning: z.string().default(""),
  physicalExperienceRole: z.string().default(""),
  experienceMechanism: z.string().default(""),
  keyStrategicInsight: z.string().default(""),
});
export type CaseSections = z.infer<typeof CaseSectionsSchema>;

export type Case = z.infer<typeof CaseFrontmatterSchema> & {
  /** Filename without .md — the URL at /cases/<slug>. */
  slug: string;
  /** Stable display number, assigned by date order: CASE 001, 002, … */
  ref: string;
  sections: CaseSections;
};

/* --- brand --------------------------------------------------------------- */

export const BrandFrontmatterSchema = z.strictObject({
  name: z.string().min(1, "name is required"),
  /** Country of origin / headquarters. */
  country: z.string().default(""),
  founded: z.union([z.number(), z.string()]).optional(),
  /** trail · road-running · outdoor · lifestyle · eyewear · cycling · other */
  category: z.string().default("other"),
  /** One line on how the brand positions itself. */
  positioning: z.string().default(""),
  /** Optional hex colour used sparingly in brand views. */
  accent: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "accent must be a hex colour like #1e4fd8")
    .optional(),
  status: StatusSchema,
  sources: z.array(SourceSchema).default([]),
});

export type Brand = z.infer<typeof BrandFrontmatterSchema> & {
  slug: string;
  /** Markdown body, rendered to HTML. */
  body: string;
};

/* --- event --------------------------------------------------------------- */

export const EventFrontmatterSchema = z.strictObject({
  name: z.string().min(1, "name is required"),
  /** ultra · marathon · trail · brand-launch · other */
  type: z.string().default("other"),
  location: LocationSchema,
  /** Does it run every year? */
  recurring: z.boolean().default(true),
  /** Years covered by the Atlas, e.g. [2023, 2024, 2025] */
  editions: z.array(z.number()).default([]),
  /** Approximate month it takes place, 1-12. */
  month: z.number().min(1).max(12).optional(),
  status: StatusSchema,
  sources: z.array(SourceSchema).default([]),
});

export type Event = z.infer<typeof EventFrontmatterSchema> & {
  slug: string;
  body: string;
};

/* --- vocabularies -------------------------------------------------------- */

export const PIN_SHAPES = [
  "square",
  "circle",
  "triangle",
  "cross",
  "diamond",
  "chevron",
] as const;
export type PinShape = (typeof PIN_SHAPES)[number];

export const SpatialTypeSchema = z.strictObject({
  id: z.string().min(1),
  label: z.string().min(1),
  short: z.string().min(1),
  pinShape: z.enum(PIN_SHAPES),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  definition: z.string().min(1),
});
export type SpatialType = z.infer<typeof SpatialTypeSchema>;

export const ClassificationTagSchema = z.strictObject({
  id: z.string().min(1),
  label: z.string().min(1),
  definition: z.string().min(1),
});
export type ClassificationTag = z.infer<typeof ClassificationTagSchema>;
