import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Prose } from "@/components/case/CaseParts";
import { EventTimeline } from "@/components/event/EventTimeline";
import { MiniMap } from "@/components/map/MiniMap";
import { PinGlyph } from "@/components/ui/PinGlyph";
import {
  EmptyState,
  MetaItem,
  PageHeader,
  PlaceholderBand,
  SectionHeading,
  StatusMark,
  TagChip,
} from "@/components/ui/Primitives";
import { formatCoordinates, formatDateRange, plural, stripHtml } from "@/lib/format";
import { cardsForEvent, getAtlas, getEvent } from "@/lib/queries";

export function generateStaticParams() {
  return getAtlas().events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.name,
    description: `Which brands acted at ${event.name}, and what they built.`,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const atlas = getAtlas();
  const cards = cardsForEvent(event.slug);
  const cases = atlas.cases.filter((record) => record.relatedEvent === event.slug);
  const types = atlas.spatialTypes.map((type) => ({
    id: type.id,
    accent: type.accent,
    pinShape: type.pinShape,
  }));
  const accentOf = (id: string) =>
    atlas.spatialTypes.find((t) => t.id === id)?.accent ?? "#16161a";
  const shapeOf = (id: string) =>
    atlas.spatialTypes.find((t) => t.id === id)?.pinShape ?? "circle";
  const tagLabelOf = (id: string) => atlas.tags.find((t) => t.id === id)?.label ?? id;

  /* One row per participating case, ordered by brand so the comparison reads
     as a table of actors rather than a chronology. */
  const rows = cases
    .map((record) => {
      const card = cards.find((c) => c.slug === record.slug)!;
      return { record, card };
    })
    .sort((a, b) => a.card.brandName.localeCompare(b.card.brandName));

  const brandCount = new Set(cards.map((card) => card.brand)).size;

  /* Section numbers, worked out once so adding or removing a block cannot
     leave the page with two §2s. */
  const hasTimeline = cases.length > 0 && Boolean(event.startDate);
  const hasMap = cards.length > 0;
  let n = 0;
  const num = () => `§${++n}`;
  const hasReported = event.reportedActivity.length > 0;
  const timelineIndex = hasTimeline ? num() : "";
  const comparisonIndex = num();
  const mapIndex = hasMap ? num() : "";
  const reportedIndex = hasReported ? num() : "";
  const noteIndex = num();

  /* Brands already researched at this edition, so the reported list can say
     which of its entries are covered and which are still only reported. */
  const researchedBrands = new Set(cards.map((card) => card.brandName.toLowerCase()));

  return (
    <div>
      <PlaceholderBand status={event.status} />

      <PageHeader
        eyebrow={`Event · ${event.eventType} · ${event.year}`}
        title={event.name}
        lede={`${event.location.city}, ${event.location.country}${
          event.parentSeries ? ` · ${event.parentSeries}` : ""
        }${
          event.startDate
            ? ` · ${formatDateRange({
                start: event.startDate,
                end: event.endDate,
                precision: "day",
              })}`
            : ""
        }`}
        meta={
          <>
            <MetaItem label="Brands present" value={brandCount} />
            <MetaItem label="Cases" value={cards.length} />
            <MetaItem
              label="Coordinates"
              value={formatCoordinates(event.location.coordinates)}
            />
            {event.officialUrl && (
              <MetaItem
                label="Official"
                value={
                  <a
                    href={event.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                    style={{ color: "var(--blue)" }}
                  >
                    organiser site
                  </a>
                }
              />
            )}
            <MetaItem label="Evidence" value={<StatusMark status={event.status} />} />
          </>
        }
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-9 sm:px-5">
        {/* ---- When each brand held the valley ---- */}
        {hasTimeline && (
          <section className="mb-12">
            <SectionHeading index={timelineIndex} note="bar length = days open">
              Occupancy
            </SectionHeading>
            <EventTimeline
              event={event}
              cases={cases}
              accentOf={accentOf}
              shapeOf={shapeOf}
              brandNameOf={(slug) =>
                atlas.brands.find((b) => b.slug === slug)?.name ?? slug
              }
            />
          </section>
        )}

        {/* ---- The comparison: the point of this page ---- */}
        <section>
          <SectionHeading
            index={comparisonIndex}
            note={
              brandCount > 1
                ? `${brandCount} brands compared`
                : "needs a second brand to compare"
            }
          >
            Brand comparison
          </SectionHeading>

          {rows.length === 0 ? (
            <EmptyState title="No cases recorded at this event yet">
              The event is in the Atlas as a record. Once two or more brands are
              researched here, this page becomes a side-by-side comparison.
            </EmptyState>
          ) : (
            <div className="quiet-scroll overflow-x-auto border-t border-rule">
              <table className="w-full min-w-[54rem] border-collapse text-left">
                <caption className="sr-only">
                  Brands present at {event.name}, what they launched and what
                  performance claim each made
                </caption>
                <thead>
                  <tr className="border-b border-rule-strong">
                    {[
                      "Brand",
                      "Spatial type",
                      "What was launched",
                      "Performance claim",
                      "Classification",
                      "",
                    ].map((heading, index) => (
                      <th
                        key={heading || index}
                        scope="col"
                        className="label px-3 py-2 align-bottom first:pl-0 last:pr-0"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ record, card }) => (
                    <tr
                      key={record.slug}
                      className="border-b border-rule align-top transition-colors hover:bg-paper-sunk"
                    >
                      <td className="px-3 py-4 pl-0">
                        <Link
                          href={`/brands/${record.brand}`}
                          className="text-[15px] font-medium hover:underline"
                        >
                          {card.brandName}
                        </Link>
                        <span className="label mt-0.5 block">Case {card.ref}</span>
                      </td>
                      <td className="px-3 py-4">
                        <span className="flex items-center gap-2">
                          <PinGlyph
                            shape={card.pinShape}
                            accent={accentOf(card.spatialType)}
                            status={card.status}
                            size={13}
                          />
                          <span className="label" style={{ color: "var(--ink)" }}>
                            {card.spatialTypeLabel}
                          </span>
                        </span>
                        <span className="data mt-1 block text-[11px] text-pencil">
                          {card.dateLabel}
                        </span>
                      </td>
                      <td className="max-w-[20ch] px-3 py-4 text-[13.5px] leading-snug">
                        {record.product || <span className="text-pencil">—</span>}
                      </td>
                      <td className="max-w-[34ch] px-3 py-4 text-[13.5px] leading-snug text-graphite">
                        {stripHtml(record.sections.performanceClaim)}
                      </td>
                      <td className="px-3 py-4">
                        <span className="flex max-w-[18ch] flex-wrap gap-1">
                          {record.tags.map((tag) => (
                            <TagChip
                              key={tag}
                              id={tag}
                              label={tagLabelOf(tag)}
                              href={`/?tag=${tag}`}
                            />
                          ))}
                        </span>
                      </td>
                      <td className="px-3 py-4 pr-0">
                        <Link
                          href={`/cases/${record.slug}`}
                          className="label-lg whitespace-nowrap border border-ink px-2 py-1.5"
                          style={{ color: "var(--ink)" }}
                        >
                          Case →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ---- Map + event note ---- */}
        <div className="mt-10 grid gap-x-12 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
          {cards.length > 0 && (
            <section className="min-w-0">
              <SectionHeading index={mapIndex} note={plural(cards.length, "case")}>
                Where the brands set up
              </SectionHeading>
              <MiniMap cards={cards} types={types} />
              <p className="label mt-3">
                <Link href={`/?event=${event.slug}`} className="underline hover:text-ink">
                  → Show only {event.name} on the global map
                </Link>
              </p>
            </section>
          )}

          <section className="min-w-0">
            <SectionHeading index={noteIndex}>
              Event note
            </SectionHeading>
            <Prose html={event.body} className="text-[14px]" />

            {event.keyRaces.length > 0 && (
              <div className="mt-6">
                <p className="label border-b border-rule pb-1.5">
                  Races in this edition
                </p>
                <ul>
                  {event.keyRaces.map((race) => (
                    <li
                      key={race.name}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-rule py-2"
                    >
                      <span className="label-lg" style={{ color: "var(--ink)" }}>
                        {race.name}
                      </span>
                      <span className="data text-[11px] text-graphite">
                        {[
                          race.startLocation,
                          race.date,
                          race.distanceKm ? `${race.distanceKm} km` : null,
                          race.elevationGainM ? `${race.elevationGainM} m D+` : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="label mt-5">
              Source file ·{" "}
              <span className="data" style={{ fontSize: 10 }}>
                data/events/{event.slug}.md
              </span>
            </p>
          </section>
        </div>
      </div>

      {/* Reported, unverified activity. Deliberately the last section on the
          page and deliberately not styled like a case: these are other
          people's claims, and the gap between five researched cases and
          twenty-six reported spaces is the point of showing them at all. */}
      {hasReported && (
        <div className="border-t border-rule bg-paper-sunk">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
            <p className="label-lg" style={{ color: "var(--ink)" }}>
              {reportedIndex} · Also reported at this edition
            </p>

            <div
              className="mt-4 max-w-[80ch] border-l-2 pl-4"
              style={{ borderColor: "var(--red)" }}
            >
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
                <strong>None of the {event.reportedActivity.length} entries below is
                research.</strong>{" "}
                They are branded spaces listed for this edition by{" "}
                {event.reportedActivitySource || "a third party"} — and nobody here has
                checked them. No date, address or claim in this section has been confirmed
                against the brand, the organiser, the agency or the press, and none of it
                may be cited.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-graphite">
                They are here because the Atlas has {cases.length}{" "}
                {cases.length === 1 ? "case" : "cases"} at this edition and the listing
                carries {event.reportedActivity.length} spaces. Showing only the
                researched ones would make the research look more complete than it is.
                Each row links to where it was reported, so it can be followed up.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {event.reportedActivity.map((item) => {
                /* A reported brand field can name several parties — "Arc'teryx,
                   Distance, Strava" — so match on any one of them, or an
                   already-researched brand reads as unresearched. */
                const covered = item.brand
                  .split(",")
                  .some((part) => researchedBrands.has(part.trim().toLowerCase()));
                return (
                  <li
                    key={item.url}
                    className="rounded-[var(--radius-card)] border border-dashed border-rule-strong p-4"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="label truncate">{item.brand}</span>
                      {covered && (
                        <span className="label shrink-0" style={{ color: "var(--blue)" }}>
                          Case exists
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[14px] font-medium leading-snug">
                      {item.title}
                    </p>
                    <p className="label mt-2">
                      {[
                        item.start
                          ? formatDateRange({ start: item.start, end: item.end })
                          : "Date not given",
                        item.venue,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="label mt-2 inline-block hover:text-ink"
                      style={{ color: "var(--blue)" }}
                    >
                      Where it was reported →
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="label mt-8 max-w-[80ch]">
              The full listing, including the runs, talks and parties this section leaves
              out, is in research/utmb-2026-marathon-weekend-leads.md — which is outside
              data/ and is never loaded by the site.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
