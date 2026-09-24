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
 *  unsourced           real subject, written by hand, nothing cited yet.
 *  partially-verified  some claims sourced, others not; see Verification notes.
 *  verified            every claim on the record traces to a listed source.
 *
 *  "unsourced" exists because the first four had no room for a record that is
 *  real but uncited, and the gap did real damage. Brand and event records
 *  carrying no sources were pushed down to "placeholder" to satisfy rule 1,
 *  which made the Boston Marathon page announce that the Boston Marathon was
 *  invented. Claiming a true record is fabricated is the mirror image of the
 *  error rule 1 exists to prevent, and it is worse, because it discredits the
 *  real thing.
 *
 *  So "unsourced" is the honest floor for a real record: no source is required
 *  of it, and it is still not citable. It sits above "ai-reconstructed"
 *  because a person asserted these facts rather than a model, and directly
 *  below "partially-verified" because it is one citation short of it. */
export const StatusSchema = z.enum([
  "placeholder",
  "ai-reconstructed",
  "unsourced",
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
  /** The single mechanism the space runs on — an id from
   *  data/vocab/activation-logic.yml.
   *
   *  Exactly one, on purpose. Listing everything that applies is what `tags`
   *  are for; this field forces the judgement about which mechanism is
   *  load-bearing. An earlier free-text version produced fourteen distinct
   *  values across six cases, which made the field useless for comparison. */
  primaryActivationLogic: z.string().default(""),
  /** An optional second mechanism, also from the vocabulary. At most one, and
   *  it may not repeat the primary. */
  secondaryActivationLogic: z.string().default(""),
  /** Why those two were chosen over the alternatives. Interpretation, not
   *  fact — it records a judgement and should read as one. */
  activationLogicRationale: z.string().default(""),
  location: LocationSchema,
  date: DateRangeSchema,
  /** The form the space primarily takes — an id from
   *  data/vocab/spatial-types.yml.
   *
   *  One primary, on purpose, and deliberately not an unrestricted
   *  multi-select: a free list invites one case to carry four types and
   *  destroys the comparison the field exists for. This is the field that
   *  decides the map mark, because a case is one space at one coordinate. */
  primarySpatialType: z.string().min(1, "primarySpatialType is required"),
  /** An optional second form, for a genuinely hybrid space — a chalet beside a
   *  permanent store, a pop-up beside a camp. At most one, and it may not
   *  repeat the primary. Same shape as the activation-logic pair above, and
   *  for the same reason: naming a second form is allowed, but naming which
   *  one leads is still required. */
  secondarySpatialType: z.string().default(""),
  /** Event slug from data/events/, if this case happened at an event. */
  relatedEvent: z.string().min(1).optional(),
  /** Product or collaboration at the centre of the case. */
  product: z.string().default(""),
  /** One or more ids from data/vocab/classification-tags.yml */
  tags: z.array(z.string()).min(1, "at least one classification tag is required"),
  images: z.array(ImageSchema).default([]),
  sources: z.array(SourceSchema).default([]),
  /** Reserved for the future cross-case Strategy Matrix. Part of the
   *  interpretation layer, not the facts layer. Leave every value null
   *  unless the evidence genuinely supports a position — a guessed
   *  coordinate is worse than an empty one, because a chart will plot it
   *  with the same confidence as a researched one. */
  strategyMatrix: z
    .strictObject({
      /** -100 = performance-proof driven · +100 = cultural-meaning driven */
      performanceToCulture: z.number().min(-100).max(100).nullable().default(null),
      /** -100 = product-centred · +100 = community / experience-centred */
      productToExperience: z.number().min(-100).max(100).nullable().default(null),
      confidence: z.enum(["high", "medium", "low"]).nullable().default(null),
      rationale: z.string().nullable().default(null),
    })
    .default({
      performanceToCulture: null,
      productToExperience: null,
      confidence: null,
      rationale: null,
    }),
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
  /** Establishment date of **this** entity, and optional for that reason.
   *
   *  A sub-brand or product line leaves it blank unless a sourced date belongs
   *  clearly to the sub-brand itself. Nike Running / ACG and adidas Running /
   *  Terrex both carried a parent's date — 1971 and 1949 — which described
   *  neither the line the record is about nor, in Nike's case, the company's
   *  actual founding in 1964. A date that belongs to the parent goes in the
   *  prose, where it cannot be read as the division's. */
  founded: z.union([z.number(), z.string()]).optional(),
  /** trail · road-running · outdoor · lifestyle · eyewear · cycling · other */
  category: z.string().default("other"),
  /** One line on how the brand positions itself. */
  positioning: z.string().default(""),
  /** The brand's own wordmark or logo, used to identify it in the register.
   *
   *  It carries the same `credit` and `sourceUrl` discipline as every other
   *  picture here, for the same reason: a mark taken from somewhere unstated
   *  is an unsourced claim about what the brand's identity looks like. Files
   *  live in `public/images/brands/`. A brand without one renders as type
   *  alone, which is an honest empty state rather than a gap to fill with a
   *  stand-in. */
  logo: ImageSchema.nullable().default(null),
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

/** One race inside an edition. Distance and elevation are optional because
 *  organiser listings often omit them — an absent number is not a zero. */
/** Brand activity at an edition that someone else has reported and nobody here
 *  has checked. **This is not a case and must never be read as one.**
 *
 *  It exists because the gap between what an edition holds and what this Atlas
 *  has researched is itself worth showing: UTMB Mont-Blanc 2026 has five
 *  researched cases and a third-party listing carries twenty-six branded
 *  spaces. Hiding the other twenty-one would make the research look more
 *  complete than it is, which is the opposite of rule 10.
 *
 *  Every entry must carry the url it was reported at, so a reader can go and
 *  check it. None of these fields is ever promoted into a case by copying: a
 *  case is written from the brand, the organiser, the agency or the press, and
 *  an aggregator is a pointer to those, not a substitute for them. */
export const ReportedActivitySchema = z.strictObject({
  /** As the report labels it — not necessarily a brand slug in this Atlas. */
  brand: z.string().min(1),
  title: z.string().min(1),
  /** The reporter's own category, kept in their words. */
  activityType: z.string().default(""),
  start: IsoDate.optional(),
  end: IsoDate.optional(),
  venue: z.string().default(""),
  /** Where it was reported. Required: an unverified claim with no pointer to
   *  its own source is just a rumour in a data file. */
  url: z.string().min(1, "a reported activity must say where it was reported"),
});
export type ReportedActivity = z.infer<typeof ReportedActivitySchema>;

export const KeyRaceSchema = z.strictObject({
  name: z.string().min(1),
  date: IsoDate.optional(),
  startLocation: z.string().default(""),
  distanceKm: z.number().positive().optional(),
  elevationGainM: z.number().positive().optional(),
});
export type KeyRace = z.infer<typeof KeyRaceSchema>;

/** An event record is **one edition**, not a recurring series.
 *
 *  "HOKA UTMB Mont-Blanc 2026" is one record; the 2024 edition is another.
 *  Editions are what brands actually activate at, they are what carries real
 *  dates, and comparing one year against another is only possible if each
 *  year is its own record. Use `parentSeries` to group them. */
export const EventFrontmatterSchema = z.strictObject({
  name: z.string().min(1, "name is required"),
  /** Short label for tables and chips, e.g. "UTMB 2026". */
  shortName: z.string().default(""),
  /** The edition year. One record = one edition. */
  year: z.number().int().min(1900).max(2100),
  /** The series this edition belongs to, e.g. "UTMB World Series". */
  parentSeries: z.string().default(""),
  /** sports-event · marathon · ultra · trail · brand-launch · other */
  eventType: z.string().default("other"),
  /** e.g. "Trail running / ultra running" */
  sport: z.string().default(""),
  location: LocationSchema,
  /** Wider area the edition occupies, beyond the single pin. */
  venueArea: z.string().default(""),
  startDate: IsoDate.optional(),
  endDate: IsoDate.optional(),
  officialUrl: z.string().default(""),
  keyRaces: z.array(KeyRaceSchema).default([]),
  notes: z.string().default(""),
  /** One photograph for the recent-editions strip on the home page. Null means
   *  there is no photograph, and the strip draws a locator from the edition's
   *  coordinates instead — it never invents a picture. Carries the same credit
   *  and sourceUrl discipline as a case image, because an uncredited photo is
   *  the same problem as an unsourced claim. */
  hero: ImageSchema.nullable().default(null),
  /** Third-party reports of brand activity at this edition, unverified. See
   *  ReportedActivitySchema — these are leads shown as leads, never cases. */
  reportedActivity: z.array(ReportedActivitySchema).default([]),
  /** Who reported them, in one phrase, for the section's attribution line. */
  reportedActivitySource: z.string().default(""),
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
  "ring",
] as const;
export type PinShape = (typeof PIN_SHAPES)[number];

/** A country's framing box on the map — see data/vocab/country-bounds.yml.
 *  Not research data: it decides what the viewport shows and nothing else. */
export const CountryBoundsSchema = z.strictObject({
  code: z.string().length(2),
  name: z.string().min(1),
  /** [west, south, east, north] in degrees. */
  bounds: z.tuple([z.number(), z.number(), z.number(), z.number()]),
});
export type CountryBounds = z.infer<typeof CountryBoundsSchema>;

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

export const ActivationLogicSchema = z.strictObject({
  id: z.string().min(1),
  label: z.string().min(1),
  definition: z.string().min(1),
  /** The one-line question that decides whether this logic applies. */
  test: z.string().min(1),
});
export type ActivationLogic = z.infer<typeof ActivationLogicSchema>;
