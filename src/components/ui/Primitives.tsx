import Link from "next/link";

import { BackLink } from "@/components/ui/BackLink";

import type { Status } from "@/lib/schema";

/* --------------------------------------------------------------------------
   Page header — the archival plate at the top of every page.
   -------------------------------------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  lede,
  ledeMax = "56ch",
  meta,
  back,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  /** A way back to the list this record came from. One edition is one item in
   *  a register, and the browser Back button is not an answer when the reader
   *  arrived from the map or from a link. */
  back?: { href: string; label: string };
  /** Measure for the lede. 56ch is the default editorial column; a page whose
   *  lede is doing more explaining than introducing can widen it. */
  ledeMax?: string;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
        {back && (
          <p className="mb-4">
            <BackLink fallback={back} />
          </p>
        )}
        <p className="label-lg">{eyebrow}</p>
        {/* No ch cap. A 20ch measure is right for a paragraph and wrong for a
            title: it broke "HOKA UTMB Mont-Blanc 2026" across two lines on a
            1440px screen with most of the column empty beside it. The column
            is the limit now, so a title wraps when it genuinely does not
            fit. */}
        <h1 className="display mt-4 text-[clamp(2.3rem,5vw,4rem)]">
          {title}
        </h1>
        {lede && (
          <p
            className="mt-5 text-[16.5px] leading-relaxed text-graphite"
            style={{ maxWidth: ledeMax }}
          >
            {lede}
          </p>
        )}
        {meta && (
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">{meta}</div>
        )}
        {children}
      </div>
    </header>
  );
}

/** A label/value pair used in header meta strips. */
export function MetaItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <span className="block">
      <span className="label block">{label}</span>
      <span className="data mt-0.5 block">{value}</span>
    </span>
  );
}

/* --------------------------------------------------------------------------
   Section heading — numbered, ruled, uppercase.
   -------------------------------------------------------------------------- */

export function SectionHeading({
  index,
  children,
  note,
}: {
  index?: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="mb-5 flex items-baseline gap-3 border-b border-rule pb-2">
      {index && (
        <span className="data shrink-0 text-pencil" style={{ fontSize: 11 }}>
          {index}
        </span>
      )}
      <h2 className="label-lg" style={{ color: "var(--ink)" }}>
        {children}
      </h2>
      {note && <span className="label ml-auto hidden sm:block">{note}</span>}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Evidence status
   -------------------------------------------------------------------------- */

/** `trusted: false` means the record is not research and the page says so in a
 *  full-width band. Placeholder and AI-reconstructed share the warning tone
 *  deliberately — both are "do not cite"; the label says which. */
const STATUS_COPY: Record<
  Status,
  { label: string; tone: string; trusted: boolean; band: string }
> = {
  placeholder: {
    label: "Placeholder",
    tone: "var(--red)",
    trusted: false,
    band: "Placeholder record — invented demo content. Do not cite.",
  },
  "ai-reconstructed": {
    label: "AI-reconstructed",
    tone: "var(--red)",
    trusted: false,
    band: "AI-reconstructed record — assembled by a model, not checked against sources. Do not cite.",
  },
  /* Graphite, not red. An uncited real record is a gap in the research, not a
     warning about fabricated content, and it must never read as one. */
  unsourced: {
    label: "Unsourced",
    tone: "var(--graphite)",
    trusted: false,
    band: "Unsourced record — the subject is real, but nothing on this page is cited yet. Do not cite.",
  },
  /* No band. Partially verified is the normal state of a working research
     record, not a warning, and a strip across the top of every real page
     announcing it made the ordinary case look doubtful. The status is still
     stamped on the record in §0 and on every card. The bands above stay,
     because those three say "do not cite" about content that is not
     research — that is the warning rule 1 exists for. */
  "partially-verified": {
    label: "Partially verified",
    tone: "var(--blue)",
    trusted: true,
    band: "",
  },
  verified: {
    label: "Verified",
    tone: "var(--ink)",
    trusted: true,
    band: "",
  },
};

/** The evidence stamp.
 *
 *  Silent on `verified` and `partially-verified`, because what the Atlas
 *  records is published strategy: a brand's own announcement of a space is a
 *  fact about that brand's plan whether or not it later rained. Badging one
 *  real record "verified" and the next "partially verified" invited the
 *  reader to grade them against each other, when the difference is mostly
 *  that an event's title partner gets written about by the organiser and a
 *  non-partner does not. The status is still in the data, still enforced by
 *  `npm run validate`, and still visible on the three statuses that mean
 *  something a reader must act on — placeholder, ai-reconstructed and
 *  unsourced all say "do not cite".
 *
 *  `always` overrides this, for the Method page, which is documenting the
 *  vocabulary rather than stamping a record. */
export function StatusMark({
  status,
  always = false,
}: {
  status: Status;
  always?: boolean;
}) {
  if (!always && (status === "verified" || status === "partially-verified")) {
    return null;
  }
  const { label, tone } = STATUS_COPY[status];
  return (
    <span
      className="label inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-pill)] border px-2.5 py-1"
      style={{ color: tone, borderColor: tone }}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: tone }}
      />
      {label}
    </span>
  );
}

/** The full-width band at the top of any record that is not fully verified. */
export function PlaceholderBand({ status }: { status: Status }) {
  const { tone, trusted, band } = STATUS_COPY[status];
  if (!band) return null;
  return (
    <div
      className={`border-b px-4 py-2.5 sm:px-5 ${trusted ? "" : "hatch-placeholder"}`}
      style={{
        borderColor: tone,
        backgroundColor: trusted ? "var(--blue-sunk)" : undefined,
      }}
      role="note"
    >
      <p className="label-lg mx-auto max-w-[1400px]" style={{ color: tone }}>
        {band}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Tag chip
   -------------------------------------------------------------------------- */

export function TagChip({
  id,
  label,
  href,
}: {
  id: string;
  label: string;
  href?: string;
}) {
  const className =
    "label inline-block whitespace-nowrap rounded-[var(--radius-pill)] border border-rule bg-paper-raised px-2.5 py-1 transition-colors hover:border-ink hover:text-ink";
  if (!href) return <span className={className}>{label}</span>;
  return (
    <Link href={href} className={className} title={`Filter the map by ${label}`}>
      {label}
    </Link>
  );
}

/* --------------------------------------------------------------------------
   Field row — the hairline label/value register on detail pages.
   -------------------------------------------------------------------------- */

export function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-x-3 gap-y-0.5 border-b border-rule py-2.5 sm:grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)]">
      <dt className="label pt-0.5">{label}</dt>
      <dd className="min-w-0 text-[13.5px] leading-snug">{children}</dd>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Empty state — used wherever the research has a gap. Gaps are shown, never
   hidden: an empty brand or event page is information too.
   -------------------------------------------------------------------------- */

export function EmptyState({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-rule-strong bg-paper-sunk px-6 py-12 text-center">
      <p className="label-lg" style={{ color: "var(--ink)" }}>
        {title}
      </p>
      {children && (
        <p className="mx-auto mt-2 max-w-[46ch] text-[13.5px] text-graphite">
          {children}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Mix bar — the proportional strip used on brand and event views.
   -------------------------------------------------------------------------- */

export function MixBar({
  items,
  total,
}: {
  items: { id: string; label: string; count: number }[];
  total: number;
}) {
  if (!items.length || total === 0) return null;
  return (
    <div>
      <div
        className="flex h-2.5 w-full overflow-hidden rounded-[var(--radius-pill)] border border-rule bg-paper-raised"
        role="img"
        aria-label={items.map((i) => `${i.count} ${i.label}`).join(", ")}
      >
        {items.map((item, index) => (
          <span
            key={item.id}
            className="block h-full"
            style={{
              width: `${(item.count / total) * 100}%`,
              backgroundColor: index % 2 === 0 ? "var(--ink)" : "var(--blue)",
              opacity: 1 - index * 0.12,
            }}
          />
        ))}
      </div>
      <p className="label mt-2">
        {items.map((item, index) => (
          <span key={item.id}>
            {index > 0 && <span className="text-pencil"> · </span>}
            {item.count} {item.label}
          </span>
        ))}
      </p>
    </div>
  );
}
