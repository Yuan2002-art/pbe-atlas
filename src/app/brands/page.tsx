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
        lede="Each brand is one actor in the Atlas. Open one to see every space it has built, on a map and as a list."
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

      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-5">
        <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ brand, cards, mix }) => (
            <li key={brand.slug} className="bg-paper">
              <Link
                href={`/brands/${brand.slug}`}
                className="group flex h-full flex-col gap-3 p-4 transition-colors hover:bg-paper-sunk sm:p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="label">{brand.category}</span>
                  <StatusMark status={brand.status} />
                </div>

                <h2 className="display text-[1.5rem] group-hover:underline">
                  {brand.name}
                </h2>

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
