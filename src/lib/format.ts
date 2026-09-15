/* ===========================================================================
   Formatting helpers. Pure functions — safe to use on the server or in the
   browser. Dates are formatted in a fixed, archival style rather than with
   the visitor's locale, so a printed screenshot always reads the same.
   =========================================================================== */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export interface DateRangeLike {
  start: string;
  end?: string;
  ongoing?: boolean;
  precision?: "day" | "month" | "year" | "unknown";
}

function parts(iso: string) {
  const [y, m, d] = iso.split("-");
  return { y, m: m ? Number(m) : undefined, d: d ? Number(d) : undefined };
}

/** "26–31 Aug 2024" · "Since Mar 2021" · "2024" · "14 Apr 2025" */
export function formatDateRange(date: DateRangeLike): string {
  const precision = date.precision ?? "day";
  if (precision === "unknown") return "Date unknown";

  const s = parts(date.start);
  const startYear = s.y;

  const one = (p: ReturnType<typeof parts>, withYear = true) => {
    const bits: string[] = [];
    if (precision === "day" && p.d) bits.push(String(p.d));
    if (precision !== "year" && p.m) bits.push(MONTHS[p.m - 1]);
    if (withYear) bits.push(p.y);
    return bits.join(" ");
  };

  if (date.ongoing) return `Since ${one(s)}`;
  if (!date.end || date.end === date.start) return one(s);

  const e = parts(date.end);
  // Same month and year: "26–31 Aug 2024"
  if (s.y === e.y && s.m === e.m && precision === "day") {
    return `${s.d}–${e.d} ${MONTHS[(s.m ?? 1) - 1]} ${s.y}`;
  }
  // Same year: "26 Aug – 1 Sep 2024"
  if (s.y === e.y) return `${one(s, false)} – ${one(e)}`;
  return `${one(s)} – ${one(e)}`;
}

/** The year a case belongs to, for grouping and sorting. */
export function yearOf(date: DateRangeLike): string {
  return date.start.slice(0, 4);
}

/** "45.9237° N · 6.8694° E" — coordinates arrive as [longitude, latitude]. */
export function formatCoordinates([lng, lat]: [number, number]): string {
  const ns = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}`;
  const ew = `${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`;
  return `${ns} · ${ew}`;
}

/** "CHAMONIX, FR" — the archival place stamp used in headers. */
export function placeStamp(city: string, countryCode: string): string {
  return `${city}, ${countryCode}`.toUpperCase();
}

/** Turn a rendered HTML string back into plain text for previews and
 *  <meta> descriptions. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** "4 cases" / "1 case" */
export function plural(n: number, word: string, suffix = "s"): string {
  return `${n} ${word}${n === 1 ? "" : suffix}`;
}
