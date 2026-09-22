import Link from "next/link";

import { formatDateRange, placeStamp, plural } from "@/lib/format";
import type { Event } from "@/lib/schema";

/* ===========================================================================
   Recent editions — the strip floating over the home map.

   A bar calendar rather than a row of picture cards. The cards were three
   panels of 300px each and took a slab out of the top of the map; this is one
   panel, five rows, and it says the same thing in a third of the space.

   It is a real time axis: every bar sits at its true position between the
   earliest start and the latest end of the five editions shown, so the gap
   between two race weeks is visible as a gap. Read the horizontal position as
   "when", never the colour — the colours only tell rows apart, and the
   meaning-bearing colour in this project is the spatial-type accent on the
   map, which is shape-coded as well.
   =========================================================================== */

/** Midnight UTC, so a date never shifts a day with the reader's timezone —
 *  the same reason dates are formatted in a fixed archival style. */
function toTime(day: string): number {
  return new Date(`${day}T00:00:00Z`).getTime();
}

export function RecentEditions({
  editions,
}: {
  editions: { event: Event; caseCount: number }[];
}) {
  /* Dated editions only. An undated one has no position on an axis, and
     guessing one would be inventing a fact to make a graphic work. */
  const rows = editions
    .filter((e) => e.event.startDate || e.event.endDate)
    .slice(0, 5)
    .map(({ event, caseCount }) => {
      const start = toTime((event.startDate ?? event.endDate)!);
      const end = toTime((event.endDate ?? event.startDate)!);
      return { event, caseCount, start, end };
    });

  if (rows.length === 0) return null;

  const axisStart = Math.min(...rows.map((r) => r.start));
  const axisEnd = Math.max(...rows.map((r) => r.end));
  // A single dated edition would give a zero-width axis; give it one day.
  const span = Math.max(axisEnd - axisStart, 86_400_000);

  /* One tick per January inside the range, so the axis is readable without a
     row of month labels crowding a 560px panel. */
  const years: number[] = [];
  for (
    let y = new Date(axisStart).getUTCFullYear();
    y <= new Date(axisEnd).getUTCFullYear();
    y++
  ) {
    years.push(y);
  }

  /* Exactly the rail's width, so the strip and the filter panel beneath it
     share a left edge and a right edge — one column, not two things that
     nearly line up. */
  return (
    <section aria-labelledby="recent-editions" className="w-[var(--rail)] max-w-full">
      <div className="glass rounded-[var(--radius-card)] px-3.5 py-3">
        <div className="mb-2.5 flex items-baseline justify-between gap-3">
          <h2 id="recent-editions" className="label-lg" style={{ color: "var(--ink)" }}>
            Recent editions
          </h2>
          <Link href="/events" className="label hover:text-ink">
            All events →
          </Link>
        </div>

        <ul>
          {rows.map((row, i) => {
            const left = ((row.start - axisStart) / span) * 100;
            const width = ((row.end - row.start) / span) * 100;
            const dateLabel = formatDateRange({
              start: row.event.startDate ?? "",
              end: row.event.endDate,
            });
            return (
              <li key={row.event.slug}>
                <Link
                  href={`/events/${row.event.slug}`}
                  className="group grid grid-cols-[7.5rem_1fr] items-center gap-2 rounded-[var(--radius-sm)] px-1.5 py-1 hover:bg-paper-sunk"
                  title={`${row.event.name} · ${dateLabel} · ${placeStamp(
                    row.event.location.city,
                    row.event.location.countryCode,
                  )} · ${
                    row.caseCount === 0 ? "no cases yet" : plural(row.caseCount, "case")
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] font-medium leading-tight group-hover:underline">
                      {row.event.shortName || row.event.name}
                    </span>
                    <span className="label block truncate leading-tight">{dateLabel}</span>
                  </span>

                  <span className="relative block h-[13px]">
                    {/* Year rules, behind the bar. */}
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

                    {/* The bar. min-width is a legibility floor, not a claim
                        about duration: a seven-day race week across a two-year
                        axis is under four pixels, which reads as a dot and
                        cannot show its gradient. Short editions are drawn at
                        18px; the exact dates are beside the name, and those
                        are the fact. */}
                    <span
                      className="absolute top-0 h-full min-w-[18px] rounded-[var(--radius-sm)]"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        background: `var(--edition-${(i % 5) + 1})`,
                      }}
                    />
                  </span>
                </Link>

              </li>
            );
          })}
        </ul>

        {/* Axis footer: the two ends, and the years between them. */}
        <div
          aria-hidden
          className="label mt-1.5 flex items-center justify-between border-t border-rule pl-[8.1rem] pt-1.5"
        >
          {years.map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
