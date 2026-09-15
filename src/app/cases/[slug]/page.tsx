import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  AnalysisGrid,
  CaseStepper,
  FramingStrip,
  ImagePlates,
  Prose,
  SourceList,
} from "@/components/case/CaseParts";
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
  const type = atlas.spatialTypes.find((t) => t.id === record.spatialType);
  const card = atlas.cards.find((c) => c.slug === record.slug)!;

  // Walk the register in case order for the previous/next links.
  const ordered = [...atlas.cards].sort((a, b) => a.ref.localeCompare(b.ref));
  const position = ordered.findIndex((c) => c.slug === record.slug);
  const previous = ordered[position - 1];
  const next = ordered[position + 1];

  const tagOf = (id: string) => atlas.tags.find((t) => t.id === id);

  return (
    <article>
      <PlaceholderBand status={record.status} />

      {/* ---- Header ---- */}
      <header className="grid-paper border-b border-rule">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-5 sm:py-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <PinGlyph
              shape={card.pinShape}
              accent={type?.accent ?? "#16161a"}
              status={record.status}
              size={18}
            />
            <p className="label-lg">
              Case {record.ref} · {type?.label ?? record.spatialType} ·{" "}
              {card.year} · {placeStamp(record.location.city, record.location.countryCode)}
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
          <h1 className="display mt-1 text-[clamp(1.9rem,4.6vw,3.2rem)]">
            {record.title}
          </h1>
          {record.product && (
            <p className="mt-3 max-w-[52ch] text-[15px] text-graphite">
              {record.product}
            </p>
          )}
        </div>
      </header>

      {/* ---- Body: register on the left, research on the right ---- */}
      <div className="mx-auto grid w-full max-w-[1400px] gap-x-12 gap-y-10 px-4 py-9 sm:px-5 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        {/* Metadata register */}
        <aside className="lg:sticky lg:top-[calc(var(--header)+1.5rem)] lg:self-start">
          <SectionHeading index="§0">Record</SectionHeading>
          <dl className="border-t border-rule">
            <FieldRow label="Brand">
              <Link href={`/brands/${record.brand}`} className="underline hover:no-underline">
                {brand?.name ?? record.brand}
              </Link>
            </FieldRow>
            {record.collaborators.length > 0 && (
              <FieldRow label="With">
                {record.collaborators.join(", ")}
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
            </FieldRow>
            <FieldRow label="Date">
              <span className="data">{card.dateLabel}</span>
              {record.date.precision !== "day" && (
                <span className="label ml-2">{record.date.precision} precision</span>
              )}
            </FieldRow>
            <FieldRow label="Spatial type">
              <Link
                href={`/?type=${record.spatialType}`}
                className="underline hover:no-underline"
              >
                {type?.label ?? record.spatialType}
              </Link>
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
            <FieldRow label="Evidence">
              <StatusMark status={record.status} />
            </FieldRow>
          </dl>

          <p className="label mt-4">
            Source file ·{" "}
            <span className="data" style={{ fontSize: 10 }}>
              data/cases/{record.slug}.md
            </span>
          </p>
        </aside>

        {/* Research */}
        <div className="flex min-w-0 flex-col gap-10">
          <section>
            <SectionHeading index="§1">Description</SectionHeading>
            <Prose html={record.sections.description} />
          </section>

          <section>
            <SectionHeading index="§2" note="summary layer">
              Framing
            </SectionHeading>
            <FramingStrip sections={record.sections} />
          </section>

          <AnalysisGrid sections={record.sections} index="§3" />
          <ImagePlates images={record.images} caseRef={record.ref} index="§4" />
          <SourceList sources={record.sources} index="§5" />

          <nav className="flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-5">
            <Link href={`/brands/${record.brand}`} className="label hover:text-ink">
              → All {brand?.name ?? record.brand} cases
            </Link>
            {event && (
              <Link href={`/events/${event.slug}`} className="label hover:text-ink">
                → Compare brands at {event.name}
              </Link>
            )}
            <Link href={`/?type=${record.spatialType}`} className="label hover:text-ink">
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
