import Link from "next/link";

import { formatDateRange, placeStamp, plural } from "@/lib/format";
import { pinInner } from "@/lib/pin";
import type { CountryBounds, Event } from "@/lib/schema";

/* ===========================================================================
   Recent editions — the strip across the top of the home page.

   One card per dated edition, most recently finished first. Each card shows a
   photograph if the record has one and a locator drawn from its own
   coordinates if it does not. It never shows a stand-in picture: an invented
   plate is how a placeholder once passed for research, and a photograph is the
   most convincing thing on a page.
   =========================================================================== */

/** Where the edition sits inside its country, drawn rather than photographed.
 *
 *  Honest by construction: the frame is the country's box from
 *  data/vocab/country-bounds.yml and the mark is the edition's own coordinate
 *  inside it, so there is nothing here that is not already in the data. It is
 *  a diagram and reads as one — no coastlines, because we do not have any. */
function Locator({
  coordinates,
  bounds,
  countryCode,
}: {
  coordinates: [number, number];
  bounds: CountryBounds["bounds"] | null;
  countryCode: string;
}) {
  const [lng, lat] = coordinates;
  // Fall back to a centred mark when the country has no box on file.
  const [west, south, east, north] = bounds ?? [lng - 4, lat - 3, lng + 4, lat + 3];
  const x = ((lng - west) / (east - west)) * 100;
  const y = ((north - lat) / (north - south)) * 100;

  /* The lines are stretched to the card with preserveAspectRatio="none",
     which is right for a graticule and wrong for a glyph — it would flatten
     the mark into a different shape from the one the map key defines. So the
     mark is a separate, unstretched layer placed with percentages. */
  return (
    <div className="relative h-full w-full" style={{ background: "var(--paper-sunk)" }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        {[20, 40, 60, 80].map((n) => (
          <g key={n} stroke="var(--grid)" strokeWidth="0.7">
            <line x1={n} y1="0" x2={n} y2="100" />
            <line x1="0" y1={n} x2="100" y2={n} />
          </g>
        ))}
        {/* Crosshair on the edition, so the position reads at thumbnail size. */}
        <g stroke="var(--rule-strong)" strokeWidth="0.7" strokeDasharray="2.5 2.5">
          <line x1={x} y1="0" x2={x} y2="100" />
          <line x1="0" y1={y} x2="100" y2={y} />
        </g>
      </svg>

      <svg
        viewBox="0 0 24 24"
        width={16}
        height={16}
        aria-hidden="true"
        className="absolute -ml-2 -mt-2"
        style={{ left: `${x}%`, top: `${y}%` }}
        dangerouslySetInnerHTML={{
          __html: pinInner({
            shape: "triangle",
            accent: "var(--ink)",
            status: "verified",
          }),
        }}
      />

      <span
        className="label absolute bottom-1 left-2"
        style={{ color: "var(--graphite)" }}
      >
        {countryCode}
      </span>
    </div>
  );
}

export function RecentEditions({
  editions,
  countryBounds,
}: {
  editions: { event: Event; caseCount: number }[];
  countryBounds: CountryBounds[];
}) {
  // Nothing dated to show: say so rather than render an empty rail.
  if (editions.length === 0) return null;

  return (
    <section aria-labelledby="recent-editions" className="border-b border-rule">
      <div className="flex items-baseline justify-between px-4 pb-2 pt-3 sm:px-5">
        <h2 id="recent-editions" className="label-lg" style={{ color: "var(--ink)" }}>
          Recent editions
        </h2>
        <Link href="/events" className="label hover:text-ink">
          All events →
        </Link>
      </div>

      {/* One row, scrolled sideways on a narrow screen rather than wrapped. */}
      <ul className="quiet-scroll flex gap-3 overflow-x-auto px-4 pb-4 sm:px-5">
        {editions.map(({ event, caseCount }) => {
          const bounds =
            countryBounds.find((b) => b.code === event.location.countryCode)?.bounds ?? null;
          return (
            <li key={event.slug} className="w-[15.5rem] shrink-0">
              <Link
                href={`/events/${event.slug}`}
                className="group block overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper-raised shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative h-[5.5rem] w-full border-b border-rule">
                  {event.hero ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={event.hero.src}
                      alt={event.hero.caption}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Locator
                      coordinates={event.location.coordinates}
                      bounds={bounds}
                      countryCode={event.location.countryCode}
                    />
                  )}
                </div>

                <div className="px-3 py-2.5">
                  <p className="label truncate">
                    {formatDateRange({
                      start: event.startDate ?? "",
                      end: event.endDate,
                    })}
                  </p>
                  <p className="mt-0.5 truncate text-[13.5px] font-medium leading-snug group-hover:underline">
                    {event.shortName || event.name}
                  </p>
                  <p className="label mt-1 truncate">
                    {placeStamp(event.location.city, event.location.countryCode)} ·{" "}
                    {caseCount === 0 ? "No cases yet" : plural(caseCount, "case")}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
