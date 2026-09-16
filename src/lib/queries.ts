/* ===========================================================================
   QUERIES — everything the pages ask of the data, in one place.

   Server-side only (it reads the filesystem through lib/content.ts).
   Client components receive the results of these functions as props.
   =========================================================================== */

import { requireDataSet } from "./content";
import { spreadOverlappingPins, toCard, type CaseCard, type CardLookups } from "./card";
import type {
  Brand,
  Case,
  ClassificationTag,
  Event,
  PinShape,
  SpatialType,
  Status,
} from "./schema";

export interface CountryFacet {
  code: string;
  name: string;
}

export interface Atlas {
  cases: Case[];
  brands: Brand[];
  events: Event[];
  spatialTypes: SpatialType[];
  tags: ClassificationTag[];
  /** Compact cases, with overlapping pins already spread apart. */
  cards: CaseCard[];
  countries: CountryFacet[];
  cities: string[];
}

const FALLBACK_TYPE = {
  label: "Unclassified",
  short: "Unclassified",
  pinShape: "circle" as PinShape,
};

/* Cached in production, rebuilt on every request in development - see the
   note at the foot of lib/content.ts. */
const CACHE_ENABLED = process.env.NODE_ENV === "production";

let atlas: Atlas | null = null;

export function getAtlas(): Atlas {
  if (atlas && CACHE_ENABLED) return atlas;

  const data = requireDataSet();
  const brandBySlug = new Map(data.brands.map((b) => [b.slug, b]));
  const eventBySlug = new Map(data.events.map((e) => [e.slug, e]));
  const typeById = new Map(data.spatialTypes.map((t) => [t.id, t]));

  const lookups: CardLookups = {
    brandName: (slug) => brandBySlug.get(slug)?.name ?? slug,
    eventName: (slug) => eventBySlug.get(slug)?.name ?? slug,
    spatialType: (id) => typeById.get(id) ?? FALLBACK_TYPE,
  };

  const cards = spreadOverlappingPins(data.cases.map((c) => toCard(c, lookups)));

  const countryMap = new Map<string, string>();
  const citySet = new Set<string>();
  for (const card of cards) {
    countryMap.set(card.countryCode, card.country);
    citySet.add(card.city);
  }

  atlas = {
    cases: data.cases,
    brands: data.brands,
    events: data.events,
    spatialTypes: data.spatialTypes,
    tags: data.tags,
    cards,
    countries: [...countryMap.entries()]
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    cities: [...citySet].sort((a, b) => a.localeCompare(b)),
  };
  return atlas;
}

/* --- single records ------------------------------------------------------ */

export function getCase(slug: string): Case | undefined {
  return getAtlas().cases.find((c) => c.slug === slug);
}

export function getBrand(slug: string): Brand | undefined {
  return getAtlas().brands.find((b) => b.slug === slug);
}

export function getEvent(slug: string): Event | undefined {
  return getAtlas().events.find((e) => e.slug === slug);
}

export function getCard(slug: string): CaseCard | undefined {
  return getAtlas().cards.find((c) => c.slug === slug);
}

/* --- collections -------------------------------------------------------- */

/** Newest first — the order used in every list on the site. */
export function newestFirst(cards: CaseCard[]): CaseCard[] {
  return [...cards].sort((a, b) => b.ref.localeCompare(a.ref));
}

export function cardsForBrand(slug: string): CaseCard[] {
  return newestFirst(getAtlas().cards.filter((c) => c.brand === slug));
}

export function cardsForEvent(slug: string): CaseCard[] {
  return newestFirst(getAtlas().cards.filter((c) => c.relatedEvent === slug));
}

export function cardsForTag(tag: string): CaseCard[] {
  return newestFirst(getAtlas().cards.filter((c) => c.tags.includes(tag)));
}

/* --- vocabulary lookups ------------------------------------------------- */

export function spatialTypeLabel(id: string): string {
  return getAtlas().spatialTypes.find((t) => t.id === id)?.label ?? id;
}

export function tagLabel(id: string): string {
  return getAtlas().tags.find((t) => t.id === id)?.label ?? id;
}

/** { "performance-archive": "Performance Archive", ... } — handed to client
 *  components so they can label tags without another lookup. */
export function tagLabels(): Record<string, string> {
  return Object.fromEntries(getAtlas().tags.map((t) => [t.id, t.label]));
}

/* --- small derived figures used in the brand / event views -------------- */

export interface Mix {
  id: string;
  label: string;
  count: number;
}

/** "4 retail · 2 race · 1 pop-up" — the spatial-type mix of a set of cases. */
export function spatialTypeMix(cards: CaseCard[]): Mix[] {
  const counts = new Map<string, number>();
  for (const card of cards) {
    counts.set(card.spatialType, (counts.get(card.spatialType) ?? 0) + 1);
  }
  return getAtlas()
    .spatialTypes.filter((t) => counts.has(t.id))
    .map((t) => ({ id: t.id, label: t.short, count: counts.get(t.id) ?? 0 }))
    .sort((a, b) => b.count - a.count);
}

export function tagMix(cards: CaseCard[]): Mix[] {
  const counts = new Map<string, number>();
  for (const card of cards) {
    for (const tag of card.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return getAtlas()
    .tags.filter((t) => counts.has(t.id))
    .map((t) => ({ id: t.id, label: t.label, count: counts.get(t.id) ?? 0 }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/** How many cases sit at each evidence status — shown in the header so the
 *  state of the dataset is never hidden. */
export function statusTally(): Record<Status, number> {
  const tally: Record<Status, number> = {
    placeholder: 0,
    "ai-reconstructed": 0,
    "partially-verified": 0,
    verified: 0,
  };
  for (const card of getAtlas().cards) tally[card.status] += 1;
  return tally;
}

/** Cases whose evidence status makes them citable research. */
export function researchedCount(): number {
  const tally = statusTally();
  return tally.verified + tally["partially-verified"];
}
