import Link from "next/link";
import type { Metadata } from "next";

import { PinGlyph } from "@/components/ui/PinGlyph";
import { MetaItem, PageHeader, StatusMark } from "@/components/ui/Primitives";
import { plural } from "@/lib/format";
import { cardsForBrand, getAtlas, spatialTypeMix } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "The brands covered by the Atlas, with the spatial strategies recorded for each.",
};

export default function BrandsPage() {
  const atlas = getAtlas();
  const accentOf = (id: string) =>
    atlas.spatialTypes.find((t) => t.id === id)?.accent ?? "#16161a";

  const rows = atlas.brands.map((brand) => ({
    brand,
    cards: cardsForBrand(brand.slug),
    mix: spatialTypeMix(cardsForBrand(brand.slug)),
  }));

  return (
    <div>
      <PageHeader
        eyebrow="Brands · actors"
        title="Brands"
        lede="Each brand is one actor. Open one to see every space it has built."
        ledeMax="none"
        meta={
          <>
            <MetaItem label="Brands" value={atlas.brands.length} />
            <MetaItem
              label="With cases"
              value={rows.filter((row) => row.cards.length > 0).length}
            />
            <MetaItem
              label="Awaiting research"
              value={rows.filter((row) => row.cards.length === 0).length}
            />
          </>
        }
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ brand, cards, mix }) => (
            <li
              key={brand.slug}
              className="glass card-hover relative overflow-hidden rounded-[var(--radius-card)]"
            >
              <Link
                href={`/brands/${brand.slug}`}
                className="group relative flex h-full flex-col gap-3 p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="label">{brand.category}</span>
                  <StatusMark status={brand.status} />
                </div>

                <div className="flex items-center gap-3">
                  {brand.logo && (
                    /* The mark as the brand serves it, in a fixed square well.
                       Some are white on dark and some dark on white, so the
                       well keeps the tile's own ground rather than forcing a
                       colour onto someone's trademark. */
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-rule bg-paper-raised">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brand.logo.src}
                        alt=""
                        width={44}
                        height={44}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </span>
                  )}
                  <h2 className="display text-[1.75rem] group-hover:underline">
                    {brand.name}
                  </h2>
                </div>

                <p className="text-[13.5px] leading-snug text-graphite">
                  {brand.positioning}
                </p>

                <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-1 border-t border-rule pt-3">
                  <div>
                    <dt className="label">Origin</dt>
                    <dd className="data text-[12px]">
                      {brand.country || "—"}
                      {brand.founded ? ` · ${brand.founded}` : ""}
                    </dd>
                  </div>
                  <div>
                    <dt className="label">Cases</dt>
                    <dd className="data text-[12px]">
                      {cards.length > 0 ? plural(cards.length, "case") : "none yet"}
                    </dd>
                  </div>
                </dl>

                {mix.length > 0 && (
                  <p className="label flex flex-wrap items-center gap-x-2 gap-y-1">
                    {mix.map((item) => (
                      <span key={item.id} className="inline-flex items-center gap-1">
                        <PinGlyph
                          shape={
                            atlas.spatialTypes.find((t) => t.id === item.id)?.pinShape ??
                            "circle"
                          }
                          accent={accentOf(item.id)}
                          status="verified"
                          size={11}
                        />
                        {item.count} {item.label}
                      </span>
                    ))}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
