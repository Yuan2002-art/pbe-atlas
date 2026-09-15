import Link from "next/link";

import type { Status } from "@/lib/schema";

/* --------------------------------------------------------------------------
   Page header — the archival plate at the top of every page.
   -------------------------------------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="grid-paper border-b border-rule">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-5 sm:py-10">
        <p className="label-lg">{eyebrow}</p>
        <h1 className="display mt-3 text-[clamp(1.9rem,4.4vw,3.1rem)]">{title}</h1>
        {lede && (
          <p className="prose-atlas mt-4 text-graphite" style={{ maxWidth: "58ch" }}>
            {lede}
          </p>
        )}
        {meta && <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">{meta}</div>}
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

const STATUS_COPY: Record<Status, { label: string; tone: string }> = {
  placeholder: { label: "Placeholder", tone: "var(--red)" },
  draft: { label: "Draft", tone: "var(--blue)" },
  verified: { label: "Verified", tone: "var(--ink)" },
};

export function StatusMark({ status }: { status: Status }) {
  const { label, tone } = STATUS_COPY[status];
  return (
    <span
      className="label inline-flex items-center gap-1.5 border px-1.5 py-0.5"
      style={{ color: tone, borderColor: tone }}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5"
        style={{ backgroundColor: tone }}
      />
      {label}
    </span>
  );
}

/** The full-width warning band on placeholder and draft records. */
export function PlaceholderBand({ status }: { status: Status }) {
  if (status === "verified") return null;
  const placeholder = status === "placeholder";
  return (
    <div
      className={`border-b px-4 py-2.5 sm:px-5 ${placeholder ? "hatch-placeholder" : ""}`}
      style={{
        borderColor: placeholder ? "var(--red)" : "var(--blue)",
        backgroundColor: placeholder ? undefined : "var(--blue-sunk)",
      }}
      role="note"
    >
      <p
        className="label-lg mx-auto max-w-[1400px]"
        style={{ color: placeholder ? "var(--red)" : "var(--blue)" }}
      >
        {placeholder
          ? "Placeholder record — invented demo content. Do not cite."
          : "Draft record — written from general knowledge, not yet source-verified."}
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
    "label inline-block whitespace-nowrap border border-rule bg-paper-raised px-1.5 py-0.5 transition-colors hover:border-ink hover:text-ink";
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
    <div className="border border-dashed border-rule-strong bg-paper-sunk px-5 py-8 text-center">
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
        className="flex h-2 w-full overflow-hidden border border-rule bg-paper-raised"
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
