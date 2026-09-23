import Link from "next/link";

import { PinGlyph } from "@/components/ui/PinGlyph";
import type { Case, Event, PinShape } from "@/lib/schema";

/* ===========================================================================
   Occupancy timeline for one edition.

   Marathon Weekend lists discrete, timed events under each day. The Atlas
   records something different: spaces that exist for a *span* of days. So the
   same date axis is used, but each case is drawn as a bar across the days it
   actually occupied — which makes the strategic question visible at a glance:
   who arrived before the race, who stayed for the finish, who came for four
   days and left.
   =========================================================================== */

const DAY_MS = 86_400_000;

function toUtc(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, (m ?? 1) - 1, d ?? 1);
}

function eachDay(start: string, end: string): string[] {
  const out: string[] = [];
  for (let t = toUtc(start); t <= toUtc(end); t += DAY_MS) {
    out.push(new Date(t).toISOString().slice(0, 10));
  }
  return out;
}

const WEEKDAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function EventTimeline({
  event,
  cases,
  accentOf,
  shapeOf,
  brandNameOf,
}: {
  event: Event;
  cases: Case[];
  accentOf: (spatialType: string) => string;
  shapeOf: (spatialType: string) => PinShape;
  brandNameOf: (slug: string) => string;
}) {
  if (!event.startDate || cases.length === 0) return null;
  const raceStart = event.startDate;
  const raceEnd = event.endDate ?? event.startDate;

  /* The axis covers the race days and every dated space around them. A
     marathon is one day, but the spaces built for it open days before; an
     axis of race days alone clipped every London bar to "1 day". If the spread
     is implausibly long (a permanent store's opening year, say), the axis
     falls back to the race days and clips, as before. */
  const dated = cases.filter((c) => c.date.precision !== "unknown" && !c.date.ongoing);
  const spanStart = [raceStart, ...dated.map((c) => c.date.start)].sort()[0];
  const spanEnd = [raceEnd, ...dated.map((c) => c.date.end ?? c.date.start)].sort().at(-1)!;
  let days = eachDay(spanStart, spanEnd);
  if (days.length > 60) days = eachDay(raceStart, raceEnd);
  if (days.length === 0 || days.length > 60) return null;
  const isRaceDay = (day: string) => day >= raceStart && day <= raceEnd;

  const first = toUtc(days[0]);
  const last = toUtc(days[days.length - 1]);

  const rows = cases
    .map((record) => {
      // A case with an unknown date occupies nothing we can honestly draw, so
      // it gets a ghost bar across the window and says why.
      const unknown = record.date.precision === "unknown";
      const rawStart = toUtc(record.date.start);
      const rawEnd = toUtc(record.date.end ?? record.date.start);

      const start = Math.max(rawStart, first);
      const end = Math.min(rawEnd, last);
      if (!unknown && (end < first || start > last)) return null;

      const colStart = Math.round((start - first) / DAY_MS) + 1;
      const span = Math.max(1, Math.round((end - start) / DAY_MS) + 1);

      // An undated case is drawn across the race days only, not the wider axis.
      const raceCol = days.indexOf(raceStart) + 1 || 1;
      const raceSpan = days.filter(isRaceDay).length || days.length;

      return {
        record,
        unknown,
        colStart: unknown ? raceCol : colStart,
        span: unknown ? raceSpan : span,
        clippedStart: rawStart < first,
        clippedEnd: rawEnd > last,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null)
    // Longest occupation first — the brands that held the valley longest.
    .sort((a, b) => b.span - a.span || a.colStart - b.colStart);

  return (
    <div className="card overflow-hidden">
      <div className="quiet-scroll overflow-x-auto">
        <div className="min-w-[44rem]">
          {/* Date axis */}
          <div
            className="grid border-b border-rule bg-paper-sunk"
            style={{
              gridTemplateColumns: `minmax(9rem, 12rem) repeat(${days.length}, minmax(0, 1fr))`,
            }}
          >
            <div className="px-4 py-3">
              <span className="label">Brand</span>
            </div>
            {days.map((day) => {
              const date = new Date(toUtc(day));
              const race = isRaceDay(day);
              return (
                <div
                  key={day}
                  className={`border-l border-rule px-1 py-3 text-center ${
                    race ? "bg-paper-raised" : ""
                  }`}
                  style={race ? { boxShadow: "inset 0 3px 0 var(--ink)" } : undefined}
                >
                  <span className="label block">
                    {race ? "Race" : WEEKDAY[date.getUTCDay()]}
                  </span>
                  <span className="data mt-0.5 block text-[13px]">
                    {date.getUTCDate()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* One row per case */}
          {rows.map(({ record, unknown, colStart, span, clippedStart, clippedEnd }) => {
            const accent = accentOf(record.primarySpatialType);
            return (
              <div
                key={record.slug}
                className="grid items-center border-b border-rule last:border-b-0"
                style={{
                  gridTemplateColumns: `minmax(9rem, 12rem) repeat(${days.length}, minmax(0, 1fr))`,
                }}
              >
                <div className="flex items-center gap-2 px-4 py-2.5">
                  <PinGlyph
                    shape={shapeOf(record.primarySpatialType)}
                    accent={accent}
                    status={record.status}
                    size={12}
                  />
                  <Link
                    href={`/cases/${record.slug}`}
                    title={record.title}
                    className="truncate text-[13.5px] font-medium hover:underline"
                  >
                    {brandNameOf(record.brand)}
                  </Link>
                </div>

                {/* The bar itself, placed on the day grid */}
                <div
                  className="relative py-2.5 pr-2"
                  style={{ gridColumn: `${colStart + 1} / span ${span}` }}
                >
                  <Link
                    href={`/cases/${record.slug}`}
                    title={
                      unknown
                        ? `${record.title} — date never published; bar shows the event window, not the case`
                        : `${record.title} — ${record.date.start}${
                            record.date.end ? ` to ${record.date.end}` : ""
                          }`
                    }
                    className="flex h-7 items-center gap-1.5 overflow-hidden rounded-[var(--radius-pill)] px-2.5 transition-opacity hover:opacity-80"
                    style={
                      unknown
                        ? {
                            border: `1px dashed ${accent}`,
                            color: accent,
                            background: "transparent",
                          }
                        : { background: accent, color: "var(--paper-raised)" }
                    }
                  >
                    <span
                      className="truncate"
                      style={{
                        fontFamily: "var(--font-plex-mono), monospace",
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {clippedStart && "← "}
                      {unknown
                        ? "date not published"
                        : `${span} ${span === 1 ? "day" : "days"}`}
                      {clippedEnd && " →"}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="label border-t border-rule px-4 py-3">
        Bar length is the days each space was open. Columns marked Race are the
        edition's own dates; the axis runs wider when spaces opened before or
        stayed after. A dashed bar means the date was never published — the case
        is placed in the week, not dated.
      </p>
    </div>
  );
}
