import Link from "next/link";
import type { Metadata } from "next";

import { MetaItem, PageHeader, StatusMark } from "@/components/ui/Primitives";
import { plural } from "@/lib/format";
import { cardsForEvent, getAtlas } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Races, launches and gatherings where several brands act at once — the comparative core of the Atlas.",
};

export default function EventsPage() {
  const atlas = getAtlas();

  const rows = atlas.events.map((event) => {
    const cards = cardsForEvent(event.slug);
    return {
      event,
      cards,
      brands: [...new Set(cards.map((card) => card.brandName))],
    };
  });

  return (
    <div>
      <PageHeader
        eyebrow="Events · moments"
        title="Events"
        lede="An event is a moment when several brands act in the same place at the same time. Open one to compare what each of them built — the same week, the same valley, and a different answer from every brand in it."
        /* Wider than the default 56ch: this lede is explaining the comparative
           method rather than just introducing a page, and at 56ch it broke
           into two short lines that read like a caption. */
        ledeMax="82ch"
        meta={
          <>
            <MetaItem label="Events" value={atlas.events.length} />
            <MetaItem
              label="With cases"
              value={rows.filter((row) => row.cards.length > 0).length}
            />
            <MetaItem
              label="Comparable"
              value={rows.filter((row) => row.brands.length > 1).length}
            />
          </>
        }
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ event, cards, brands }) => (
            <li
              key={event.slug}
              className="glass card-hover overflow-hidden rounded-[var(--radius-card)]"
            >
              <Link
                href={`/events/${event.slug}`}
                className="group flex h-full flex-col gap-3 p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="label">
                    {event.eventType} · {event.year} · {event.location.city}, {event.location.countryCode}
                  </span>
                  <StatusMark status={event.status} />
                </div>

                <h2 className="display text-[1.75rem] group-hover:underline">
                  {event.name}
                </h2>

                <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-1 border-t border-rule pt-3">
                  <div>
                    <dt className="label">Cases</dt>
                    <dd className="data text-[12px]">
                      {cards.length > 0 ? plural(cards.length, "case") : "none yet"}
                    </dd>
                  </div>
                  <div>
                    <dt className="label">Brands present</dt>
                    <dd className="data text-[12px]">{brands.length}</dd>
                  </div>
                </dl>

                {/* The brand names used to be listed here. They are on the
                    edition's own page, where each one is a link to a case
                    rather than a run-on line of text, and the count above
                    already says how many there are. */}
                {brands.length > 1 && (
                  <p className="label" style={{ color: "var(--blue)" }}>
                    Comparison available
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
