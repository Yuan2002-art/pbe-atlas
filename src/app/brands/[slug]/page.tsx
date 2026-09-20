import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Prose, SourceList } from "@/components/case/CaseParts";
import { CaseListRow } from "@/components/case/CaseListRow";
import { MiniMap } from "@/components/map/MiniMap";
import {
  EmptyState,
  MetaItem,
  MixBar,
  PageHeader,
  PlaceholderBand,
  SectionHeading,
  TagChip,
} from "@/components/ui/Primitives";
import { plural } from "@/lib/format";
import { cardsForBrand, getAtlas, getBrand, spatialTypeMix, tagMix } from "@/lib/queries";

export function generateStaticParams() {
  return getAtlas().brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "Brand not found" };
  return { title: brand.name, description: brand.positioning };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const atlas = getAtlas();
  const cards = cardsForBrand(brand.slug);
  const types = atlas.spatialTypes.map((type) => ({
    id: type.id,
    accent: type.accent,
    pinShape: type.pinShape,
  }));
  const accentOf = (id: string) =>
    atlas.spatialTypes.find((t) => t.id === id)?.accent ?? "#16161a";

  const typeMix = spatialTypeMix(cards);
  const tags = tagMix(cards);
  const events = [
    ...new Map(
      cards
        .filter((card) => card.relatedEvent)
        .map((card) => [card.relatedEvent, card.relatedEventName]),
    ).entries(),
  ];

  /* Section numbers count up as they render, so a section hidden on a brand
     with no cases leaves no gap in the sequence. Same idiom as the event page. */
  let n = 0;
  const num = () => `§${++n}`;
  const casesIndex = num();
  const noteIndex = num();
  const mixIndex = cards.length > 0 ? num() : "";
  const eventsIndex = events.length > 0 ? num() : "";
  const sourcesIndex = num();

  return (
    <div>
      <PlaceholderBand status={brand.status} />

      <PageHeader
        eyebrow={`Brand · ${brand.category}`}
        title={brand.name}
        lede={brand.positioning}
        meta={
          <>
            <MetaItem label="Origin" value={brand.country || "—"} />
            <MetaItem label="Founded" value={brand.founded ?? "—"} />
            <MetaItem label="Cases" value={cards.length} />
            <MetaItem
              label="Cities"
              value={new Set(cards.map((card) => card.city)).size}
            />
          </>
        }
      />

      <div className="mx-auto grid w-full max-w-[1400px] gap-x-12 gap-y-9 px-4 py-9 sm:px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        {/* Map + list */}
        <div className="min-w-0">
          <SectionHeading index={casesIndex} note={plural(cards.length, "case")}>
            Where this brand builds
          </SectionHeading>

          {cards.length === 0 ? (
            <EmptyState title="No cases recorded yet">
              This brand is in the Atlas as a record, but no spaces, events or
              activations have been researched for it. Add one with{" "}
              <span className="data">npm run new-case -- {brand.slug} &quot;Title&quot;</span>.
            </EmptyState>
          ) : (
            <>
              <MiniMap cards={cards} types={types} />
              <ul className="mt-6 flex flex-col gap-3">
                {cards.map((card) => (
                  <li key={card.slug}>
                    <CaseListRow
                      card={card}
                      accent={accentOf(card.primarySpatialType)}
                      showBrand={false}
                    />
                  </li>
                ))}
              </ul>
              <p className="label mt-3">
                <Link href={`/?brand=${brand.slug}`} className="underline hover:text-ink">
                  → Show only {brand.name} on the global map
                </Link>
              </p>
            </>
          )}
        </div>

        {/* Brand record */}
        <aside className="flex min-w-0 flex-col gap-8">
          <section>
            <SectionHeading index={noteIndex}>Brand note</SectionHeading>
            <Prose html={brand.body} className="text-[14px]" />
          </section>

          {cards.length > 0 && (
            <section>
              <SectionHeading index={mixIndex}>Spatial mix</SectionHeading>
              <MixBar items={typeMix} total={cards.length} />
              <p className="mt-4 label">Classification emphasis</p>
              <ul className="mt-2 border-t border-rule">
                {tags.map((tag) => (
                  <li
                    key={tag.id}
                    className="flex items-baseline justify-between gap-3 border-b border-rule py-1.5"
                  >
                    <TagChip id={tag.id} label={tag.label} href={`/?tag=${tag.id}`} />
                    <span className="data text-[11px] text-pencil">{tag.count}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {events.length > 0 && (
            <section>
              <SectionHeading index={eventsIndex}>Events attended</SectionHeading>
              <ul className="border-t border-rule">
                {events.map(([eventSlug, name]) => (
                  <li key={eventSlug} className="border-b border-rule py-2">
                    <Link
                      href={`/events/${eventSlug}`}
                      className="text-[14px] underline hover:no-underline"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <SourceList sources={brand.sources} index={sourcesIndex} />

          <p className="label">
            Source file ·{" "}
            <span className="data" style={{ fontSize: 10 }}>
              data/brands/{brand.slug}.md
            </span>
          </p>
        </aside>
      </div>
    </div>
  );
}
