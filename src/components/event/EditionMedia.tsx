"use client";

import { useEffect, useState } from "react";

import { Locator } from "@/components/event/Locator";
import {
  editionState,
  STATE_WASH,
  STATE_WORDS,
  toTime,
  type EditionState,
} from "@/lib/edition-state";
import type { CaseImage, CountryBounds } from "@/lib/schema";

/* ===========================================================================
   The picture layer of an edition card: the photograph or the locator, the
   state wash over it, and the word for the state.

   All of it is client-side for one reason — the register is statically built,
   so the server's "today" is the build date. Nothing is painted until there is
   a real clock. That also means the grayscale below cannot be a server class:
   whether an edition has finished is not knowable at build time.
   =========================================================================== */

export function EditionMedia({
  hero,
  coordinates,
  bounds,
  countryCode,
  start,
  end,
}: {
  hero: CaseImage | null;
  coordinates: [number, number];
  bounds: CountryBounds["bounds"] | null;
  countryCode: string;
  start: string;
  end: string;
}) {
  const [state, setState] = useState<EditionState | null>(null);

  useEffect(() => {
    if (!start && !end) return;
    setState(editionState(toTime(start || end), toTime(end || start), Date.now()));
  }, [start, end]);

  /* Finished editions go monochrome. It is the strongest signal on the page
     and it costs nothing: a race that has happened stops competing for
     attention with the ones still to come. */
  const past = state === "past";

  return (
    <>
      {hero ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={hero.src}
          alt={hero.caption}
          className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-300 ${
            past ? "grayscale" : ""
          }`}
        />
      ) : (
        <div className={`absolute inset-0 ${past ? "grayscale" : ""}`}>
          <Locator coordinates={coordinates} bounds={bounds} countryCode={countryCode} />
        </div>
      )}

      {state && (
        <>
          {/* Over the whole card, picture included, at an alpha you read
              straight through — a pane of tinted glass rather than a block
              behind the text. */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-30 rounded-[var(--radius-card)] ${
              state === "now" ? "edition-pulse" : ""
            }`}
            style={{ background: STATE_WASH[state] }}
          />
          <span
            className="label glass absolute right-3 top-3 z-40 rounded-[var(--radius-pill)] px-2.5 py-1"
            style={{ color: "var(--ink)" }}
          >
            {STATE_WORDS[state]}
          </span>
        </>
      )}
    </>
  );
}
