/* ===========================================================================
   CASE CARD — the compact form of a case that the map and the lists use.

   A full case carries several paragraphs of rendered prose. The interactive
   map only needs the spine of it, so the server sends cards, not cases. Keep
   this file pure (no filesystem, no React) — it runs in the browser too.
   =========================================================================== */

import type { Case, PinShape, Status } from "./schema";
import { formatDateRange, stripHtml, yearOf } from "./format";

export interface CaseCard {
  slug: string;
  ref: string;
  title: string;
  brand: string;
  brandName: string;
  status: Status;

  city: string;
  country: string;
  countryCode: string;
  venue: string;
  /** [longitude, latitude] as written in the data file. */
  coordinates: [number, number];
  /** Coordinates nudged so two cases in the same place do not overlap. */
  pinCoordinates: [number, number];

  primarySpatialType: string;
  primarySpatialTypeLabel: string;
  primarySpatialTypeShort: string;
  secondarySpatialType: string;
  secondarySpatialTypeLabel: string;
  secondarySpatialTypeShort: string;
  /** "Pop-up", or "Pop-up + Permanent Retail" for a hybrid. The one string a
   *  list or a preview card should print; everything that needs a single
   *  value — the pin, the accent, sorting — uses the primary. */
  spatialTypeSummary: string;
  /** From the primary type: a case is one space at one coordinate, so it
   *  carries one mark. */
  pinShape: PinShape;

  relatedEvent: string;
  relatedEventName: string;

  product: string;
  tags: string[];
  year: string;
  dateLabel: string;
  /** Plain-text first sentences, for preview cards. */
  summary: string;
}

export interface CardLookups {
  brandName: (slug: string) => string;
  eventName: (slug: string) => string;
  spatialType: (id: string) => {
    label: string;
    short: string;
    pinShape: PinShape;
  };
}

export function toCard(c: Case, look: CardLookups): CaseCard {
  const type = look.spatialType(c.primarySpatialType);
  const second = c.secondarySpatialType
    ? look.spatialType(c.secondarySpatialType)
    : null;
  return {
    slug: c.slug,
    ref: c.ref,
    title: c.title,
    brand: c.brand,
    brandName: look.brandName(c.brand),
    status: c.status,

    city: c.location.city,
    country: c.location.country,
    countryCode: c.location.countryCode,
    venue: c.location.venue,
    coordinates: c.location.coordinates,
    pinCoordinates: c.location.coordinates,

    primarySpatialType: c.primarySpatialType,
    primarySpatialTypeLabel: type.label,
    primarySpatialTypeShort: type.short,
    secondarySpatialType: c.secondarySpatialType,
    secondarySpatialTypeLabel: second?.label ?? "",
    secondarySpatialTypeShort: second?.short ?? "",
    spatialTypeSummary: second ? `${type.label} + ${second.label}` : type.label,
    pinShape: type.pinShape,

    relatedEvent: c.relatedEvent ?? "",
    relatedEventName: c.relatedEvent ? look.eventName(c.relatedEvent) : "",

    product: c.product,
    tags: c.tags,
    year: yearOf(c.date),
    dateLabel: formatDateRange(c.date),
    summary: stripHtml(c.sections.description),
  };
}

/* --------------------------------------------------------------------------
   Pin collision

   Two cases in the same city (or literally the same address in different
   years) would stack invisibly on the map. Spread any group sharing a
   rounded coordinate around a small circle, in a fixed order so the map
   looks identical on every reload.
   -------------------------------------------------------------------------- */

const COLLISION_RADIUS_DEG = 0.025; // ~2.5 km — enough to separate, small
                                    // enough not to misplace a case badly.
                                    // Exact coordinates are on the case page.

export function spreadOverlappingPins(cards: CaseCard[]): CaseCard[] {
  const groups = new Map<string, CaseCard[]>();
  for (const card of cards) {
    const [lng, lat] = card.coordinates;
    const key = `${lng.toFixed(2)},${lat.toFixed(2)}`;
    const group = groups.get(key);
    if (group) group.push(card);
    else groups.set(key, [card]);
  }

  for (const group of groups.values()) {
    if (group.length < 2) continue;
    group.sort((a, b) => a.ref.localeCompare(b.ref));
    group.forEach((card, i) => {
      const angle = (2 * Math.PI * i) / group.length - Math.PI / 2;
      const [lng, lat] = card.coordinates;
      // Scale longitude by latitude so the ring stays circular on screen.
      const lngScale = Math.max(0.2, Math.cos((lat * Math.PI) / 180));
      card.pinCoordinates = [
        lng + (COLLISION_RADIUS_DEG * Math.cos(angle)) / lngScale,
        lat + COLLISION_RADIUS_DEG * Math.sin(angle),
      ];
    });
  }

  return cards;
}
