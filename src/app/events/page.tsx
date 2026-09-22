import Link from "next/link";
import type { Metadata } from "next";

import { EditionTint } from "@/components/event/EditionTint";
import { Locator } from "@/components/event/Locator";
import { MetaItem, PageHeader } from "@/components/ui/Primitives";
import { formatDateRange, plural } from "@/lib/format";
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
        {/* Smaller and denser than before, and the picture is now the card
            rather than a band on top of it. The glass only reads when there is
            something behind it to blur, and on a page of plain paper there was
            nothing — which is why the panels looked like flat pastel blocks.
            The photograph is the something. */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rows.map(({ event, cards, brands }) => (
            <li
              key={event.slug}
              className="card-hover relative aspect-[5/4] overflow-hidden rounded-[var(--radius-card)] border border-rule"
            >
              {/* A photograph when the record has one, and a locator drawn from
                  the edition's own coordinate when it does not. Never a
                  stand-in image: `hero` carries credit and sourceUrl for the
                  same reason a claim carries a source. */}
              {event.hero ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={event.hero.src}
                  alt={event.hero.caption}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0">
                  <Locator
                    coordinates={event.location.coordinates}
                    bounds={
                      atlas.countryBounds.find(
                        (b) => b.code === event.location.countryCode,
                      )?.bounds ?? null
                    }
                    countryCode={event.location.countryCode}
                  />
                </div>
              )}

              {/* The wash and the word for this edition's state, worked out in
                  the browser. Server-side "today" is the build date. */}
              <EditionTint start={event.startDate ?? ""} end={event.endDate ?? ""} />

              <Link
                href={`/events/${event.slug}`}
                className="group absolute inset-0 z-20 flex flex-col justify-end"
              >
                {/* The glass, over the picture, holding everything the card
                    says. */}
                <div className="glass m-2 rounded-[var(--radius-sm)] px-3.5 py-3">
                  <p className="label truncate">
                    {event.eventType} · {event.location.city}, {event.location.countryCode}
                  </p>
                  <h2 className="display mt-1 text-[1.1rem] leading-tight group-hover:underline">
                    {event.name}
                  </h2>
                  <p className="label mt-1">
                    {event.startDate
                      ? formatDateRange({ start: event.startDate, end: event.endDate })
                      : "Date not published"}
                  </p>
                  <p className="label mt-2 flex flex-wrap items-center gap-x-2 border-t border-rule pt-2">
                    <span className="data text-[11px]">
                      {cards.length > 0 ? plural(cards.length, "case") : "no cases yet"}
                    </span>
                    {brands.length > 0 && (
                      <>
                        <span aria-hidden>·</span>
                        <span className="data text-[11px]">
                          {plural(brands.length, "brand")}
                        </span>
                      </>
                    )}
                    {brands.length > 1 && (
                      <span style={{ color: "var(--blue)" }}>· comparable</span>
                    )}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
