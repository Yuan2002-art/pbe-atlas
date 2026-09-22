import Link from "next/link";
import type { Metadata } from "next";

import { EditionTint } from "@/components/event/EditionTint";
import { Locator } from "@/components/event/Locator";
import { MetaItem, PageHeader, StatusMark } from "@/components/ui/Primitives";
import { formatDateRange } from "@/lib/format";
import { plural } from "@/lib/format";
import { cardsForEvent, getAtlas } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Races, launches and gatherings where several brands act at once — the comparative core of the Atlas.",
};

export default function EventsPage() {
  const atlas = getAtlas();

  /* Most recent edition first, and undated editions last rather than guessed
     into an order — the same rule the home strip follows. The global sort in
     content.ts stays alphabetical because the filter rail and the brand pages
     want a list you can scan by name; chronology is this page's question. */
  const rows = atlas.events
    .map((event) => {
      const cards = cardsForEvent(event.slug);
      return {
        event,
        cards,
        brands: [...new Set(cards.map((card) => card.brandName))],
        when: event.endDate ?? event.startDate ?? "",
      };
    })
    .sort((a, b) => {
      if (!a.when) return 1;
      if (!b.when) return -1;
      return b.when.localeCompare(a.when);
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
              className="glass card-hover relative overflow-hidden rounded-[var(--radius-card)]"
            >
              {/* The wash and the word for this edition's state, worked out in
                  the browser. Server-side "today" is the build date. */}
              <EditionTint start={event.startDate ?? ""} end={event.endDate ?? ""} />
              <Link
                href={`/events/${event.slug}`}
                className="group relative z-10 flex h-full flex-col"
              >
                {/* A photograph when the record has one, and a locator drawn
                    from the edition's own coordinate when it does not. Never a
                    stand-in image: `hero` carries credit and sourceUrl for the
                    same reason a claim carries a source, and no edition has
                    one yet, so every card here is currently a diagram. */}
                <div className="relative h-[9rem] w-full border-b border-rule">
                  {event.hero ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={event.hero.src}
                      alt={event.hero.caption}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Locator
                      coordinates={event.location.coordinates}
                      bounds={
                        atlas.countryBounds.find(
                          (b) => b.code === event.location.countryCode,
                        )?.bounds ?? null
                      }
                      countryCode={event.location.countryCode}
                    />
                  )}
                </div>

                <div className="flex h-full flex-col gap-3 p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="label">
                    {event.eventType} · {event.year} · {event.location.city}, {event.location.countryCode}
                  </span>
                  <StatusMark status={event.status} />
                </div>

                <h2 className="display text-[1.75rem] group-hover:underline">
                  {event.name}
                </h2>

                <p className="label">
                  {event.startDate
                    ? formatDateRange({ start: event.startDate, end: event.endDate })
                    : "Date not published"}
                </p>

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
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
