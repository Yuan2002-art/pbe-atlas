import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  AnalysisGrid,
  CaseStepper,
  FramingStrip,
  ImagePlates,
  InterpretationNotice,
  KeyInsight,
  Prose,
  SourceList,
} from "@/components/case/CaseParts";
import { Locator } from "@/components/event/Locator";
import { BackLink } from "@/components/ui/BackLink";
import { PinGlyph } from "@/components/ui/PinGlyph";
import {
  FieldRow,
  PlaceholderBand,
  SectionHeading,
  StatusMark,
  TagChip,
} from "@/components/ui/Primitives";
import { formatCoordinates, placeStamp, stripHtml } from "@/lib/format";
import { getAtlas, getCase } from "@/lib/queries";

export function generateStaticParams() {
  return getAtlas().cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = getCase(slug);
  if (!record) return { title: "Case not found" };
  return {
    title: `${record.title} — ${record.location.city}`,
    description: stripHtml(record.sections.description).slice(0, 200),
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = getCase(slug);
  if (!record) notFound();

  const atlas = getAtlas();
  const brand = atlas.brands.find((b) => b.slug === record.brand);
  const event = atlas.events.find((e) => e.slug === record.relatedEvent);
  const type = atlas.spatialTypes.find((t) => t.id === record.primarySpatialType);
  const secondType = record.secondarySpatialType
    ? atlas.spatialTypes.find((t) => t.id === record.secondarySpatialType)
    : undefined;
  const card = atlas.cards.find((c) => c.slug === record.slug)!;

  // Walk the register in case order for the previous/next links.
  const ordered = [...atlas.cards].sort((a, b) => a.ref.localeCompare(b.ref));
  const position = ordered.findIndex((c) => c.slug === record.slug);
  const previous = ordered[position - 1];
  const next = ordered[position + 1];

  const tagOf = (id: string) => atlas.tags.find((t) => t.id === id);
  const logicLabel = (id: string) =>
    atlas.activationLogics.find((l) => l.id === id)?.label ?? id;

  /* The first image is the hero and the rest are plates. One list, first item
     leads — the same rule as the primary spatial type, and no second field to
     keep in sync. There is no fallback picture: a case with no image keeps the
     plain header, because a stand-in photograph is the most convincing thing
     on a page and inventing one is how a placeholder once passed for
     research. */
  const hero = record.images[0] ?? null;

  return (
    <article>
      <PlaceholderBand status={record.status} />

      {/* ---- Header ----
           Every case reserves the same band, so the register reads as one
           shape whether or not a record has a picture yet. With a photograph
           it is the photograph, under a scrim, with the type flipped. Without
           one it is the locator — the case's own coordinate inside its
           country's box, a diagram made only of data already in the record.
           It is never a stand-in photograph: an invented plate is how a
           placeholder once passed for research. */}
      <header className="relative border-b border-rule">
        {hero ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.src}
              alt={hero.caption}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.30) 45%, rgba(10,10,12,0.80) 100%)",
              }}
            />
          </>
        ) : (
          <div aria-hidden className="absolute inset-0 opacity-[0.55]">
            <Locator
              coordinates={record.location.coordinates}
              bounds={
                atlas.countryBounds.find(
                  (b) => b.code === record.location.countryCode,
                )?.bounds ?? null
              }
              countryCode={record.location.countryCode}
            />
          </div>
        )}
        <div
          className={`relative mx-auto w-full max-w-[1400px] px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-28 ${
            hero ? "on-photo" : ""
          }`}
        >
          {/* Back to the register. Every record page carries one: a case is
              one entry in a list, and the browser Back button is not an answer
              when the reader arrived from the map or from a link. */}
          <p className="mb-4">
            <BackLink fallback={{ href: "/cases", label: "All cases" }} />
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <PinGlyph
              shape={card.pinShape}
              accent={type?.accent ?? "#16161a"}
              status={record.status}
              size={18}
            />
            <p className="label-lg">
              Case {record.ref} · {type?.label ?? record.primarySpatialType}
              {/* A year here would be a claim. Records whose date is unknown
                  carry a sort value only, so the header stays silent. */}
              {record.date.precision !== "unknown" && ` · ${card.year}`} ·{" "}
              {placeStamp(record.location.city, record.location.countryCode)}
            </p>
            <span className="ml-auto">
              <StatusMark status={record.status} />
            </span>
          </div>

          <p className="mt-6">
            <Link
              href={`/brands/${record.brand}`}
              className="display text-[clamp(1.1rem,2vw,1.4rem)] underline decoration-rule-strong decoration-1 underline-offset-4 hover:decoration-ink"
            >
              {brand?.name ?? record.brand}
            </Link>
          </p>
          <h1 className="display mt-2 text-[clamp(2.2rem,4.6vw,3.6rem)]">
            {record.title}
          </h1>
          {record.product && (
            <p
              className={`mt-3 max-w-[52ch] text-[15px] ${
                hero ? "" : "text-graphite"
              }`}
            >
              {record.product}
            </p>
          )}

          {hero && (
            <p className="label mt-8">
              {hero.caption} · {hero.credit}
              {hero.sourceUrl && (
                <>
                  {" · "}
                  <a
                    href={hero.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    source
                  </a>
                </>
              )}
            </p>
          )}
        </div>
      </header>

      {/* ---- Body: register on the left, research on the right ---- */}
      <div className="mx-auto grid w-full max-w-[1400px] gap-x-14 gap-y-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)]">
        {/* Metadata register */}
        <aside className="lg:sticky lg:top-[calc(var(--header)+1.5rem)] lg:self-start">
          <SectionHeading index="§0">Record</SectionHeading>
          <dl className="card px-5 py-1">
            <FieldRow label="Brand">
              <Link href={`/brands/${record.brand}`} className="underline hover:no-underline">
                {brand?.name ?? record.brand}
              </Link>
            </FieldRow>
            {record.collaborators.length > 0 && (
              <FieldRow label="Partners">
                <ul>
                  {record.collaborators.map((partner) => (
                    <li key={partner.name} className="mb-1 last:mb-0">
                      {partner.name}
                      {partner.role && (
                        <span className="label mt-0.5 block">{partner.role}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </FieldRow>
            )}
            {record.location.venue && (
              <FieldRow label="Location">{record.location.venue}</FieldRow>
            )}
            <FieldRow label="City">
              <Link
                href={`/?city=${encodeURIComponent(record.location.city)}`}
                className="underline hover:no-underline"
              >
                {record.location.city}
              </Link>
              {record.location.region && (
                <span className="text-graphite">, {record.location.region}</span>
              )}
            </FieldRow>
            <FieldRow label="Country">
              <Link
                href={`/?country=${record.location.countryCode}`}
                className="underline hover:no-underline"
              >
                {record.location.country}
              </Link>
            </FieldRow>
            <FieldRow label="Coordinates">
              <span className="data">{formatCoordinates(record.location.coordinates)}</span>
              {record.location.coordinatePrecision !== "exact" && (
                <span className="label mt-0.5 block">
                  {/* Describes the pin, not the record's knowledge. It used to
                      say "no street address sourced", which contradicted the
                      venue field on any case whose address is documented but
                      was never geocoded — the pin is the town centre either
                      way, and that is what this line is about. */}
                  {record.location.coordinatePrecision === "city"
                    ? "town centre — pin not geocoded"
                    : "approximate"}
                </span>
              )}
            </FieldRow>
            <FieldRow label="Date">
              <span className="data">{card.dateLabel}</span>
              {record.date.precision !== "day" && (
                <span className="label ml-2">{record.date.precision} precision</span>
              )}
            </FieldRow>
            <FieldRow label="Spatial type">
              <Link
                href={`/?type=${record.primarySpatialType}`}
                className="underline hover:no-underline"
              >
                {type?.label ?? record.primarySpatialType}
              </Link>
              {secondType && (
                <>
                  {" + "}
                  <Link
                    href={`/?type=${record.secondarySpatialType}`}
                    className="underline hover:no-underline"
                  >
                    {secondType.label}
                  </Link>
                  <span className="label ml-2">second form</span>
                </>
              )}
            </FieldRow>
            <FieldRow label="Related event">
              {event ? (
                <Link href={`/events/${event.slug}`} className="underline hover:no-underline">
                  {event.name}
                </Link>
              ) : (
                <span className="text-pencil">Not event-linked</span>
              )}
            </FieldRow>
            <FieldRow label="Product">
              {record.product || <span className="text-pencil">—</span>}
            </FieldRow>
            <FieldRow label="Classification">
              <span className="flex flex-wrap gap-1">
                {record.tags.map((tag) => (
                  <TagChip
                    key={tag}
                    id={tag}
                    label={tagOf(tag)?.label ?? tag}
                    href={`/?tag=${tag}`}
                  />
                ))}
              </span>
            </FieldRow>
            {record.primaryActivationLogic && (
              <FieldRow label="Activation logic">
                <span className="label-lg block" style={{ color: "var(--ink)" }}>
                  {logicLabel(record.primaryActivationLogic)}
                </span>
                <span className="label mt-0.5 block">primary</span>
                {record.secondaryActivationLogic && (
                  <>
                    <span
                      className="label-lg mt-2 block"
                      style={{ color: "var(--graphite)" }}
                    >
                      {logicLabel(record.secondaryActivationLogic)}
                    </span>
                    <span className="label mt-0.5 block">secondary</span>
                  </>
                )}
              </FieldRow>
            )}
            {/* Only when there is a mark to show; see StatusMark. */}
            {record.status !== "verified" && record.status !== "partially-verified" && (
              <FieldRow label="Evidence">
                <StatusMark status={record.status} />
              </FieldRow>
            )}
          </dl>

          <p className="label mt-4">
            Source file ·{" "}
            <span className="data" style={{ fontSize: 10 }}>
              data/cases/{record.slug}.md
            </span>
          </p>
        </aside>

        {/* Research — two layers, kept visibly apart */}
        <div className="flex min-w-0 flex-col gap-12">
          {/* ---- Layer A: what the sources say ---- */}
          <section>
            <SectionHeading index="§1" note="externally verifiable">
              Verified facts
            </SectionHeading>
            <Prose html={record.sections.description} />

            {/* `## Verification notes` is no longer shown on the page. It is
                still required by rule 6, still written on every record, still
                in data/cases/*.md and still checked by `npm run validate` — it
                is the working note behind the record, not something the reader
                is made to read first. What the page publishes is meant to be
                the confirmed account. The source file is linked in §0 for
                anyone who wants the rest. */}
          </section>

          {/* ---- Layer B: what the author makes of them ---- */}
          <section className="flex flex-col gap-8">
            <div>
              <SectionHeading index="§2" note="the author's reading">
                Strategic interpretation
              </SectionHeading>
              <InterpretationNotice />
            </div>

            {record.activationLogicRationale && (
              <div className="card p-6">
                <p className="label flex flex-wrap items-baseline gap-x-2">
                  <span style={{ color: "var(--ink)" }}>Activation logic</span>
                  <span className="text-pencil">
                    · why this mechanism and not another
                  </span>
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="label-lg rounded-[var(--radius-pill)] bg-ink px-3 py-1.5" style={{ color: "var(--paper-raised)" }}>
                    {logicLabel(record.primaryActivationLogic)}
                  </span>
                  {record.secondaryActivationLogic && (
                    <>
                      <span className="text-pencil">+</span>
                      <span className="label-lg rounded-[var(--radius-pill)] border border-rule px-3 py-1.5" style={{ color: "var(--ink)" }}>
                        {logicLabel(record.secondaryActivationLogic)}
                      </span>
                    </>
                  )}
                </p>
                <p className="mt-3 max-w-[68ch] text-[14px] leading-snug text-graphite">
                  {record.activationLogicRationale}
                </p>
              </div>
            )}

            <FramingStrip sections={record.sections} />
            <AnalysisGrid sections={record.sections} index="" />
            <KeyInsight html={record.sections.keyStrategicInsight} />
          </section>

          <ImagePlates images={record.images.slice(1)} caseRef={record.ref} index="§3" />
          <SourceList sources={record.sources} index="§4" />

          <nav className="flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-5">
            <Link href={`/brands/${record.brand}`} className="label hover:text-ink">
              → All {brand?.name ?? record.brand} cases
            </Link>
            {event && (
              <Link href={`/events/${event.slug}`} className="label hover:text-ink">
                → Compare brands at {event.name}
              </Link>
            )}
            <Link href={`/?type=${record.primarySpatialType}`} className="label hover:text-ink">
              → Map all {type?.label.toLowerCase() ?? "cases"}
            </Link>
          </nav>
        </div>
      </div>

      <CaseStepper
        previous={previous && { slug: previous.slug, ref: previous.ref, title: previous.title }}
        next={next && { slug: next.slug, ref: next.ref, title: next.title }}
      />
    </article>
  );
}
