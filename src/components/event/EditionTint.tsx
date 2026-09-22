"use client";

import { useEffect, useState } from "react";

import {
  editionState,
  STATE_WASH,
  STATE_WORDS,
  toTime,
  type EditionState,
} from "@/lib/edition-state";

/* ===========================================================================
   The wash on an edition card in the register, and the word for it.

   Colour says the same thing here as it does on the home strip: grey has
   finished, red is running now or within a month, blue is further out. A card
   that is running now also breathes, because "now" is the one state that is
   changing while you look at it.

   A client component for one reason: the register is statically built, so the
   server's "today" is the build date. The wash is worked out against the
   reader's clock and nothing is painted until it is known — an undated
   edition, or a page that has not hydrated, keeps the plain card.

   The word is printed as well as the colour, so the state never rests on hue
   alone. That is the same reason the map is shape-coded.
   =========================================================================== */

export function EditionTint({ start, end }: { start: string; end: string }) {
  const [state, setState] = useState<EditionState | null>(null);

  useEffect(() => {
    if (!start && !end) return;
    const s = toTime(start || end);
    const e = toTime(end || start);
    setState(editionState(s, e, Date.now()));
  }, [start, end]);

  if (!state) return null;

  return (
    <>
      {/* Over the whole card, picture included, at an alpha you read straight
          through — a pane of tinted glass rather than a block behind the
          text. z-30 puts it above the card's own content; pointer-events-none
          keeps the link clickable. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-30 rounded-[var(--radius-card)] ${
          state === "now" ? "edition-pulse" : ""
        }`}
        style={{ background: STATE_WASH[state] }}
      />
      {/* On its own frosted chip, because it sits over the locator diagram on
          some cards and over the wash on others, and has to read on both. */}
      <span
        className="label glass absolute right-3 top-3 z-40 rounded-[var(--radius-pill)] px-2.5 py-1"
        style={{ color: "var(--ink)" }}
      >
        {STATE_WORDS[state]}
      </span>
    </>
  );
}
