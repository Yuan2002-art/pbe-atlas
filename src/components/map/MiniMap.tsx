"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { AtlasMap, type MapTypeStyle } from "@/components/map/AtlasMap";
import type { CaseCard } from "@/lib/card";

/** A small, filter-free map for the brand and event views: it plots one
 *  subset of cases, and clicking a pin opens that case. */
export function MiniMap({
  cards,
  types,
  className = "h-[42svh] min-h-[280px]",
}: {
  cards: CaseCard[];
  types: MapTypeStyle[];
  className?: string;
}) {
  const router = useRouter();

  const visible = useMemo(() => new Set(cards.map((card) => card.slug)), [cards]);
  const frameKey = useMemo(() => cards.map((card) => card.slug).join("|"), [cards]);

  return (
    <AtlasMap
      cards={cards}
      visible={visible}
      selected={null}
      onSelect={(slug) => {
        if (slug) router.push(`/cases/${slug}`);
      }}
      types={types}
      frameKey={frameKey}
      /* Always the pins: this map is already narrowed to one brand or one
         edition, so the country it sits in is not the question. */
      /* Always fits its own pins: a locator that opened on the world would
         show nothing. Only the global map has a world frame. */
      unfiltered={false}
      frameBounds={null}
      className={`border border-rule ${className}`}
    />
  );
}
