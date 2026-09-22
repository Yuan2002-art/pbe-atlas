/* ===========================================================================
   Where an edition sits relative to now.

   Pure, no React, no filesystem — the editions strip and the events register
   both read it, so the two can never disagree about what "upcoming" means.

   Always evaluated against the reader's clock, never the server's. Both pages
   are statically built, so "today" on the server is the build date; a page
   built in September that still called a race upcoming in December would be a
   written-down claim about live data, which is what rule 10's corollary exists
   to prevent.
   =========================================================================== */

export const DAY = 86_400_000;
/** How far ahead still counts as imminent. */
export const SOON = 31 * DAY;

export type EditionState = "past" | "now" | "soon" | "future";

/** Midnight UTC, so a date never shifts a day with the reader's timezone —
 *  the same reason dates are formatted in a fixed archival style. */
export function toTime(day: string): number {
  return new Date(`${day}T00:00:00Z`).getTime();
}

export function editionState(start: number, end: number, now: number): EditionState {
  if (end < now) return "past";
  if (start <= now) return "now";
  return start - now <= SOON ? "soon" : "future";
}

/** Bar fills for the strip. `soon` shares the red with `now`: both are the
 *  thing a reader should look at next. */
export const STATE_BAR: Record<EditionState, string> = {
  past: "var(--edition-past)",
  now: "var(--edition-now)",
  soon: "var(--edition-now)",
  future: "var(--edition-future)",
};

/** Card washes for the register. Translucent, so the card's own paper still
 *  reads through and the grid keeps one material. */
export const STATE_WASH: Record<EditionState, string> = {
  past: "var(--wash-past)",
  now: "var(--wash-now)",
  soon: "var(--wash-now)",
  future: "var(--wash-future)",
};

export const STATE_WORDS: Record<EditionState, string> = {
  past: "Finished",
  now: "Running now",
  soon: "Within a month",
  future: "Upcoming",
};
