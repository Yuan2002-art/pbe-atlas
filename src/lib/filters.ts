/* ===========================================================================
   FILTERS — filter state lives in the URL, nowhere else.

   /?brand=salomon,on&type=pop-up&country=FR

   That means a filtered view of the Atlas is a link you can paste into your
   thesis notes, and the browser Back button works. There is no state library
   and no hidden state. Pure functions only — this file runs in the browser.
   =========================================================================== */

import type { CaseCard } from "./card";

/** The five facet groups plus free text. */
export const FILTER_GROUPS = ["brand", "country", "city", "type", "event", "tag"] as const;
export type FilterGroup = (typeof FILTER_GROUPS)[number];

export type Filters = Record<FilterGroup, string[]> & { q: string };

export const EMPTY_FILTERS: Filters = {
  brand: [],
  country: [],
  city: [],
  type: [],
  event: [],
  tag: [],
  q: "",
};

type RawParams = URLSearchParams | Record<string, string | string[] | undefined>;

function readParam(params: RawParams, key: string): string[] {
  const value =
    params instanceof URLSearchParams ? params.getAll(key).join(",") : params[key];
  const flat = Array.isArray(value) ? value.join(",") : (value ?? "");
  return flat
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

/** URL search params -> Filters */
export function parseFilters(params: RawParams): Filters {
  const filters = { ...EMPTY_FILTERS, q: readParam(params, "q").join(" ") };
  for (const group of FILTER_GROUPS) filters[group] = readParam(params, group);
  return filters;
}

/** Filters -> "?brand=on&type=pop-up" (empty string when nothing is active) */
export function buildQuery(filters: Filters): string {
  const params = new URLSearchParams();
  for (const group of FILTER_GROUPS) {
    if (filters[group].length) params.set(group, filters[group].join(","));
  }
  if (filters.q.trim()) params.set("q", filters.q.trim());
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function isEmpty(filters: Filters): boolean {
  return (
    !filters.q.trim() && FILTER_GROUPS.every((group) => filters[group].length === 0)
  );
}

export function activeCount(filters: Filters): number {
  return (
    FILTER_GROUPS.reduce((n, group) => n + filters[group].length, 0) +
    (filters.q.trim() ? 1 : 0)
  );
}

/** Add or remove one value from one group. */
export function toggleValue(
  filters: Filters,
  group: FilterGroup,
  value: string,
): Filters {
  const current = filters[group];
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  return { ...filters, [group]: next };
}

/* --------------------------------------------------------------------------
   Matching. Within a group the values are OR'd ("Salomon or On"); the groups
   are AND'd ("Salomon or On, and only in France").
   -------------------------------------------------------------------------- */

function valuesOf(card: CaseCard, group: FilterGroup): string[] {
  switch (group) {
    case "brand":
      return [card.brand];
    case "country":
      return [card.countryCode];
    case "city":
      return [card.city];
    case "type":
      return [card.spatialType];
    case "event":
      return card.relatedEvent ? [card.relatedEvent] : [];
    case "tag":
      return card.tags;
  }
}

function matchesText(card: CaseCard, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    card.title,
    card.brandName,
    card.city,
    card.country,
    card.venue,
    card.product,
    card.relatedEventName,
    card.spatialTypeLabel,
    card.summary,
    card.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();
  // Every whitespace-separated word must appear somewhere.
  return needle.split(/\s+/).every((word) => haystack.includes(word));
}

/** Does this card pass every group except the one named? Used for facet counts. */
function matchesExcept(
  card: CaseCard,
  filters: Filters,
  except: FilterGroup | null,
): boolean {
  if (!matchesText(card, filters.q)) return false;
  for (const group of FILTER_GROUPS) {
    if (group === except) continue;
    const selected = filters[group];
    if (!selected.length) continue;
    const values = valuesOf(card, group);
    if (!values.some((v) => selected.includes(v))) return false;
  }
  return true;
}

export function filterCards(cards: CaseCard[], filters: Filters): CaseCard[] {
  return cards.filter((card) => matchesExcept(card, filters, null));
}

/** How many cases each option would yield, given the other active filters.
 *  This is what makes the rail honest: an option showing 0 is a dead end. */
export function facetCounts(
  cards: CaseCard[],
  filters: Filters,
): Record<FilterGroup, Record<string, number>> {
  const counts = Object.fromEntries(
    FILTER_GROUPS.map((group) => [group, {} as Record<string, number>]),
  ) as Record<FilterGroup, Record<string, number>>;

  for (const group of FILTER_GROUPS) {
    for (const card of cards) {
      if (!matchesExcept(card, filters, group)) continue;
      for (const value of valuesOf(card, group)) {
        counts[group][value] = (counts[group][value] ?? 0) + 1;
      }
    }
  }
  return counts;
}
