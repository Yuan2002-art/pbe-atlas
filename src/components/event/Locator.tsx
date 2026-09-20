import { pinInner } from "@/lib/pin";
import type { CountryBounds } from "@/lib/schema";

/* ===========================================================================
   Edition locator — a diagram, never a stand-in photograph.

   Used wherever an edition has no `hero` image: the recent-editions strip once
   used it, the events register uses it now. It never shows a substitute
   picture, because a photograph is the most convincing thing on a page and an
   invented plate is how a placeholder once passed for research.
   =========================================================================== */

/** Where the edition sits inside its country, drawn rather than photographed.
 *
 *  Honest by construction: the frame is the country's box from
 *  data/vocab/country-bounds.yml and the mark is the edition's own coordinate
 *  inside it, so there is nothing here that is not already in the data. It is
 *  a diagram and reads as one — no coastlines, because we do not have any. */
export function Locator({
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
  /* Nearly opaque, not fully frosted. This panel is itself a small map, and
     letting the real basemap read through it would put two maps on top of each
     other at different scales. */
  return (
    <div className="relative h-full w-full" style={{ background: "var(--glass-strong)" }}>
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
