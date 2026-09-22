"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  DAY,
  editionState,
  STATE_BAR,
  STATE_WORDS,
  toTime,
  type EditionState,
} from "@/lib/edition-state";
import { formatDateRange, plural } from "@/lib/format";
import type { EditionRow } from "@/lib/queries";

/* ===========================================================================
   Editions — the strip floating over the home map.

   A bar calendar on a real shared time axis: every bar sits at its true
   position between the earliest and latest date shown, so the gap between two
   race weeks reads as a gap.

   Colour is the edition's STATE, not its month. Grey has finished, red is
   running now or starts within a month, blue is further out. Position on the
   axis still says when, and a rule marks today on every row, so the state is
   carried in two channels rather than in colour alone — the same reason the
   map is shape-coded.

   Client-side on purpose. The home page is static, so "today" on the server is
   the build date; a strip built in September that still called a race
   "upcoming" in December would be a written-down claim about live data, which
   is what rule 10's corollary exists to prevent. Which five, and what colour,
   are worked out against the reader's own clock.
   =========================================================================== */

export function RecentEditions({ editions }: { editions: EditionRow[] }) {
  /* Null until mounted. Rendering a date-relative view on the server and then
     changing it on hydration is a mismatch; the panel is simply not drawn
     until there is a real clock to draw it against. */
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);
  if (now === null || editions.length === 0) return null;

  /* The five closest to today in either direction, then latest first — so the
     furthest ahead sits at the top and the most recently finished at the
     bottom, reading down through now. */
  const rows = [...editions]
    .map((e) => ({ ...e, s: toTime(e.start), e2: toTime(e.end) }))
    .sort((a, b) => {
      const da = Math.min(Math.abs(a.s - now), Math.abs(a.e2 - now));
      const db = Math.min(Math.abs(b.s - now), Math.abs(b.e2 - now));
      return da - db;
    })
    .slice(0, 5)
    .sort((a, b) => b.e2 - a.e2);

  const axisStart = Math.min(...rows.map((r) => r.s));
  const axisEnd = Math.max(...rows.map((r) => r.e2));
  const span = Math.max(axisEnd - axisStart, DAY);

  const years: number[] = [];
  for (
    let y = new Date(axisStart).getUTCFullYear();
    y <= new Date(axisEnd).getUTCFullYear();
    y++
  ) {
    years.push(y);
  }

  const nowX = ((now - axisStart) / span) * 100;

  /* Exactly the rail's width, so the strip and the filter panel beneath it
     share a left edge and a right edge — one column, not two things that
     nearly line up. */
  return (
    <section aria-labelledby="recent-editions" className="w-[var(--rail)] max-w-full">
      <div className="glass rounded-[var(--radius-card)] px-3.5 py-3">
        <div className="mb-2.5 flex items-baseline justify-between gap-3">
          <h2 id="recent-editions" className="label-lg" style={{ color: "var(--ink)" }}>
            Editions
          </h2>
          <Link href="/events" className="label hover:text-ink">
            All events →
          </Link>
        </div>

        <ul>
          {rows.map((row) => {
            const state = editionState(row.s, row.e2, now);
            const left = ((row.s - axisStart) / span) * 100;
            const width = ((row.e2 - row.s) / span) * 100;
            const dateLabel = formatDateRange({ start: row.start, end: row.end });
            return (
              <li key={row.slug}>
                <Link
                  href={`/events/${row.slug}`}
                  className="group grid grid-cols-[7.5rem_1fr] items-center gap-2 rounded-[var(--radius-sm)] px-1.5 py-1 hover:bg-paper-sunk"
                  title={`${row.name} · ${dateLabel} · ${STATE_WORDS[state].toLowerCase()} · ${
                    row.caseCount === 0 ? "no cases yet" : plural(row.caseCount, "case")
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] font-medium leading-tight group-hover:underline">
                      {row.shortName || row.name}
                    </span>
                    <span className="label block truncate leading-tight">{dateLabel}</span>
                  </span>

                  <span className="relative block h-[13px]">
                    {years.map((y) => {
                      const x = ((toTime(`${y}-01-01`) - axisStart) / span) * 100;
                      if (x < 0 || x > 100) return null;
                      return (
                        <span
                          key={y}
                          aria-hidden
                          className="absolute top-0 h-full w-px"
                          style={{ left: `${x}%`, background: "var(--rule)" }}
                        />
                      );
                    })}

                    {/* Today, on every row, so the eye can see which side of
                        it each bar falls on. */}
                    {nowX >= 0 && nowX <= 100 && (
                      <span
                        aria-hidden
                        className="absolute -top-0.5 h-[17px] w-px"
                        style={{ left: `${nowX}%`, background: "var(--rule-strong)" }}
                      />
                    )}

                    {/* min-width is a legibility floor, not a claim about
                        duration: a one-day marathon on a months-long axis is a
                        hairline. The exact dates are beside the name. */}
                    <span
                      className="absolute top-0 h-full min-w-[14px] rounded-[var(--radius-sm)]"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        background: STATE_BAR[state],
                      }}
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-1.5 border-t border-rule pt-1.5">
          <div aria-hidden className="label flex items-center justify-between pl-[8.1rem]">
            {years.map((y) => (
              <span key={y}>{y}</span>
            ))}
          </div>
          <ul className="label mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            {(
              [
                ["past", "Finished"],
                ["now", "Now / within a month"],
                ["future", "Upcoming"],
              ] as [EditionState, string][]
            ).map(([key, label]) => (
              <li key={key} className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-block h-2 w-3.5 rounded-[2px]"
                  style={{ background: STATE_BAR[key] }}
                />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
