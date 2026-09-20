import Link from "next/link";
import type { Metadata } from "next";

import { PinGlyph } from "@/components/ui/PinGlyph";
import {
  PageHeader,
  MetaItem,
  StatusMark,
  TagChip,
} from "@/components/ui/Primitives";
import type { CaseCard } from "@/lib/card";
import { plural } from "@/lib/format";
import { getAtlas, statusTally } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Register",
  description: "Every case in the Atlas, as a flat sortable register.",
};

const SORTS = {
  case: { label: "Case", compare: (a: CaseCard, b: CaseCard) => b.ref.localeCompare(a.ref) },
  brand: { label: "Brand", compare: (a: CaseCard, b: CaseCard) => a.brandName.localeCompare(b.brandName) },
  type: { label: "Type", compare: (a: CaseCard, b: CaseCard) => a.primarySpatialTypeLabel.localeCompare(b.primarySpatialTypeLabel) },
  place: { label: "Place", compare: (a: CaseCard, b: CaseCard) => a.city.localeCompare(b.city) },
  date: { label: "Date", compare: (a: CaseCard, b: CaseCard) => b.year.localeCompare(a.year) || b.ref.localeCompare(a.ref) },
} as const;

type SortKey = keyof typeof SORTS;

function SortLink({ column, active }: { column: SortKey; active: SortKey }) {
  return (
    <Link
      href={column === "case" ? "/cases" : `/cases?sort=${column}`}
      className={`label rounded-[var(--radius-pill)] border px-3 py-1.5 transition-colors ${
        active === column
          ? "border-ink bg-ink"
          : "border-rule bg-paper-raised hover:border-ink hover:text-ink"
      }`}
      style={active === column ? { color: "var(--paper-raised)" } : undefined}
      aria-current={active === column ? "true" : undefined}
    >
      {SORTS[column].label}
      {active === column && " ↓"}
    </Link>
  );
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const active: SortKey = sort && sort in SORTS ? (sort as SortKey) : "case";

  const atlas = getAtlas();
  const accentOf = (id: string) =>
    atlas.spatialTypes.find((t) => t.id === id)?.accent ?? "#16161a";
  const tagLabelOf = (id: string) => atlas.tags.find((t) => t.id === id)?.label ?? id;

  const rows = [...atlas.cards].sort(SORTS[active].compare);
  const tally = statusTally();

  return (
    <div>
      <PageHeader
        eyebrow="Register · all cases"
        title="Case register"
        lede="The flat index of everything in the Atlas. The map is the argument; this is the filing cabinet behind it."
        meta={
          <>
            <MetaItem label="Cases" value={rows.length} />
            <MetaItem label="Brands" value={atlas.brands.length} />
            <MetaItem label="Events" value={atlas.events.length} />
            <MetaItem label="Countries" value={atlas.countries.length} />
            <MetaItem
              label="Evidence"
              value={`${tally.verified} verified · ${tally["partially-verified"]} partial · ${tally.placeholder} placeholder`}
            />
          </>
        }
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
        {/* Sort controls */}
        <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="label">Sort by</span>
          {(Object.keys(SORTS) as SortKey[]).map((key) => (
            <SortLink key={key} column={key} active={active} />
          ))}
          <span className="label ml-auto">{plural(rows.length, "case")}</span>
        </div>

        <div className="card quiet-scroll overflow-x-auto p-1 sm:p-2">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              All cases in the Atlas, sorted by {SORTS[active].label.toLowerCase()}
            </caption>
            <thead>
              <tr className="border-b border-rule-strong">
                {["Case", "Brand & title", "Spatial type", "Place", "Date", "Classification", "Evidence"].map(
                  (heading) => (
                    <th key={heading} scope="col" className="label px-3 py-3 align-bottom">
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((card) => (
                <tr key={card.slug} className="border-b border-rule align-top transition-colors last:border-b-0 hover:bg-paper-sunk">
                  <td className="px-3 py-4">
                    <span className="data flex items-center gap-2 text-pencil">
                      <PinGlyph
                        shape={card.pinShape}
                        accent={accentOf(card.primarySpatialType)}
                        status={card.status}
                        size={13}
                      />
                      {card.ref}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <Link href={`/cases/${card.slug}`} className="block max-w-[26ch] hover:underline">
                      <span className="block text-[14px] font-medium leading-tight">{card.brandName}</span>
                      <span className="block text-[14px] leading-tight text-graphite">{card.title}</span>
                    </Link>
                  </td>
                  <td className="px-3 py-4">
                    <span className="label">{card.spatialTypeSummary}</span>
                    {card.relatedEventName && (
                      <Link
                        href={`/events/${card.relatedEvent}`}
                        className="label mt-1 block hover:text-ink"
                        style={{ color: "var(--blue)" }}
                      >
                        {card.relatedEventName}
                      </Link>
                    )}
                  </td>
                  <td className="px-3 py-4">
                    <span className="text-[13.5px] leading-tight">{card.city}</span>
                    <span className="label mt-0.5 block">{card.country}</span>
                  </td>
                  <td className="px-3 py-4">
                    <span className="data whitespace-nowrap">{card.dateLabel}</span>
                  </td>
                  <td className="px-3 py-4">
                    <span className="flex max-w-[22ch] flex-wrap gap-1">
                      {card.tags.map((tag) => (
                        <TagChip key={tag} id={tag} label={tagLabelOf(tag)} href={`/?tag=${tag}`} />
                      ))}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <StatusMark status={card.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="label mt-4">
          Every row is one file in{" "}
          <span className="data" style={{ fontSize: 10 }}>
            data/cases/
          </span>
          . Add one with{" "}
          <span className="data" style={{ fontSize: 10 }}>
            npm run new-case
          </span>
          .
        </p>
      </div>
    </div>
  );
}
