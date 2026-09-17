"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { CaseListRow } from "@/components/case/CaseListRow";
import { FilterRail, type FilterGroupDef } from "@/components/filters/FilterRail";
import { AtlasMap, type MapTypeStyle } from "@/components/map/AtlasMap";
import { MapLegend, type LegendEntry } from "@/components/map/MapLegend";
import { PreviewCard } from "@/components/map/PreviewCard";
import { EmptyState } from "@/components/ui/Primitives";
import type { CaseCard } from "@/lib/card";
import {
  buildQuery,
  EMPTY_FILTERS,
  facetCounts,
  filterCards,
  parseFilters,
  toggleValue,
  type FilterGroup,
  type Filters,
} from "@/lib/filters";

export function MapExplorer({
  cards,
  groups,
  types,
  legend,
  tagLabels,
  countryBounds,
  hero,
}: {
  cards: CaseCard[];
  groups: FilterGroupDef[];
  types: MapTypeStyle[];
  legend: LegendEntry[];
  tagLabels: Record<string, string>;
  /** Framing boxes from data/vocab/country-bounds.yml. */
  countryBounds: { code: string; bounds: [number, number, number, number] }[];
  /** Rendered on the server and floated over the map — the editions strip. */
  hero?: React.ReactNode;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [railOpen, setRailOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  /* Filter state lives in the address bar: a filtered view of the Atlas is a
     link you can paste into your notes. The state is mirrored here so the
     component can render, and written back with the history API — no page
     reload, and the browser Back button still works. */
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  useEffect(() => {
    const readUrl = () =>
      setFilters(parseFilters(new URLSearchParams(window.location.search)));
    readUrl();
    window.addEventListener("popstate", readUrl);
    return () => window.removeEventListener("popstate", readUrl);
  }, []);

  const write = useCallback((next: Filters) => {
    setFilters(next);
    const query = buildQuery(next);
    window.history.replaceState(null, "", `${window.location.pathname}${query}`);
  }, []);

  const onToggle = useCallback(
    (group: FilterGroup, value: string) => write(toggleValue(filters, group, value)),
    [filters, write],
  );

  const onSearch = useCallback(
    (value: string) => write({ ...filters, q: value }),
    [filters, write],
  );

  const onClear = useCallback(() => write({ ...EMPTY_FILTERS }), [write]);

  const shown = useMemo(() => filterCards(cards, filters), [cards, filters]);
  const counts = useMemo(() => facetCounts(cards, filters), [cards, filters]);
  const visible = useMemo(() => new Set(shown.map((card) => card.slug)), [shown]);
  const frameKey = useMemo(() => shown.map((card) => card.slug).join("|"), [shown]);

  /* Country is the one filter that asks "where in this country", so on its own
     it frames the whole country rather than the cases inside it. Narrow it with
     anything else - a brand, an event, a search - and the pins take over again.
     A country with no box in data/vocab/country-bounds.yml also falls back to
     the pins, so the file never has to be complete. */
  const frameBounds = useMemo<[number, number, number, number] | null>(() => {
    const onlyCountry =
      filters.country.length > 0 &&
      !filters.q.trim() &&
      filters.brand.length === 0 &&
      filters.city.length === 0 &&
      filters.type.length === 0 &&
      filters.event.length === 0 &&
      filters.tag.length === 0;
    if (!onlyCountry) return null;

    const boxes = filters.country
      .map((code) => countryBounds.find((b) => b.code === code)?.bounds)
      .filter((b): b is [number, number, number, number] => Boolean(b));
    if (boxes.length !== filters.country.length || boxes.length === 0) return null;

    // Several countries selected: frame all of them.
    return boxes.reduce<[number, number, number, number]>(
      (acc, [w, s, e, n]) => [
        Math.min(acc[0], w),
        Math.min(acc[1], s),
        Math.max(acc[2], e),
        Math.max(acc[3], n),
      ],
      [boxes[0][0], boxes[0][1], boxes[0][2], boxes[0][3]],
    );
  }, [filters, countryBounds]);

  const selectedCard = selected ? cards.find((card) => card.slug === selected) : undefined;
  const accentOf = (id: string) => types.find((t) => t.id === id)?.accent ?? "#16161a";

  const ordered = useMemo(
    () => [...shown].sort((a, b) => b.ref.localeCompare(a.ref)),
    [shown],
  );

  const rail = (
    <FilterRail
      groups={groups}
      filters={filters}
      counts={counts}
      onToggle={onToggle}
      onSearch={onSearch}
      onClear={onClear}
      total={cards.length}
      shown={shown.length}
    />
  );

  /* The map is the ground, and everything else floats on it.

     This used to be a two-column grid: a full-height rail down the left with a
     rule beside it, and the editions strip as a band above. Both were slabs
     that took width and height away from the map permanently. Now the map
     fills the area under the header and the rail and the editions sit over it
     as frosted panels, so the basemap runs edge to edge and reads underneath
     them.

     The phone keeps the old arrangement for the rail: a sheet you open, not a
     panel covering the map on a screen that has no room to spare. */
  return (
    <div>
      <div className="border-b border-rule lg:hidden">
        <button
          type="button"
          onClick={() => setRailOpen((v) => !v)}
          aria-expanded={railOpen}
          className="label-lg flex w-full items-center justify-between px-4 py-3"
        >
          <span style={{ color: "var(--ink)" }}>Filters</span>
          <span>
            {shown.length} of {cards.length} · {railOpen ? "Hide" : "Show"}
          </span>
        </button>
      </div>

      <aside className={`border-b border-rule lg:hidden ${railOpen ? "block" : "hidden"}`}>
        {rail}
      </aside>

      {/* ---- Map ---- */}
      <section className="relative">
        <AtlasMap
          cards={cards}
          visible={visible}
          selected={selected}
          onSelect={setSelected}
          types={types}
          frameKey={frameKey}
          frameBounds={frameBounds}
          className="h-[62svh] min-h-[380px] lg:h-[calc(100svh-var(--header))]"
        />

        {/* Floating left column: editions on top, rail beneath it on desktop.
            The column itself is transparent to the pointer so the map can still
            be dragged in the gap beside the panels; each panel takes its own
            events back. */}
        <div className="pointer-events-none absolute inset-3 z-20 flex flex-col items-start gap-3 sm:inset-4">
          {hero && <div className="pointer-events-auto max-w-full shrink-0">{hero}</div>}

          <aside className="glass pointer-events-auto hidden min-h-0 w-[var(--rail)] flex-1 overflow-hidden rounded-[var(--radius-card)] lg:block">
            {rail}
          </aside>
        </div>

        {/* Legend + list toggle */}
        <div className="pointer-events-none absolute right-3 top-3 z-10 flex max-w-[16rem] flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => setListOpen((v) => !v)}
            aria-expanded={listOpen}
            className="btn-quiet pointer-events-auto shadow-[var(--shadow-card)]"
            style={{ color: "var(--ink)" }}
          >
            {listOpen ? "Hide list" : `List (${shown.length})`}
          </button>
          <div className="pointer-events-auto hidden sm:block">
            <MapLegend entries={legend} />
          </div>
        </div>

        {/* Result list, overlaying the map */}
        {listOpen && (
          <div className="quiet-scroll absolute inset-y-0 right-0 z-20 w-full max-w-[28rem] overflow-y-auto border-l border-rule bg-paper">
            <div className="sticky top-0 flex items-baseline justify-between border-b border-rule bg-paper px-4 py-2.5">
              <p className="label-lg" style={{ color: "var(--ink)" }}>
                {shown.length} case{shown.length === 1 ? "" : "s"} shown
              </p>
              <button
                type="button"
                onClick={() => setListOpen(false)}
                className="label hover:text-ink"
              >
                Close
              </button>
            </div>
            {ordered.length === 0 ? (
              <div className="p-4">
                <EmptyState title="No cases match these filters">
                  Remove a filter, or clear them all in the rail.
                </EmptyState>
              </div>
            ) : (
              <div className="flex flex-col gap-3 p-3">
                {ordered.map((card) => (
                  <CaseListRow
                    key={card.slug}
                    card={card}
                    accent={accentOf(card.spatialType)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Zero-result notice over the map itself */}
        {shown.length === 0 && !listOpen && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 sm:max-w-[26rem]">
            <div className="pointer-events-auto">
              <EmptyState title="No cases match these filters">
                Nothing to plot. Remove a filter, or press Clear all.
              </EmptyState>
            </div>
          </div>
        )}

        {/* Preview card */}
        {selectedCard && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-3">
            <PreviewCard
              card={selectedCard}
              accent={accentOf(selectedCard.spatialType)}
              tagLabels={tagLabels}
              onClose={() => setSelected(null)}
            />
          </div>
        )}
      </section>
    </div>
  );
}
