import Link from "next/link";

import { PinGlyph } from "@/components/ui/PinGlyph";
import { StatusMark } from "@/components/ui/Primitives";
import type { CaseCard } from "@/lib/card";

/** One row of the register. Used by /cases, the map's list panel, the brand
 *  view and the event view, so every list on the site looks the same. */
export function CaseListRow({
  card,
  accent = "#16161a",
  showBrand = true,
}: {
  card: CaseCard;
  accent?: string;
  showBrand?: boolean;
}) {
  return (
    <Link
      href={`/cases/${card.slug}`}
      className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 border-b border-rule px-4 py-3.5 transition-colors hover:bg-paper-sunk sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:px-5"
    >
      <span className="pt-1">
        <PinGlyph shape={card.pinShape} accent={accent} status={card.status} />
      </span>

      <span className="min-w-0">
        <span className="label block">
          Case {card.ref} · {card.spatialTypeLabel}
          {card.relatedEventName && ` · ${card.relatedEventName}`}
        </span>
        <span className="mt-0.5 block text-[15px] leading-snug group-hover:underline">
          {showBrand && (
            <span className="font-medium">{card.brandName}&nbsp;&mdash;&nbsp;</span>
          )}
          {card.title}
        </span>
        <span className="label mt-1 block">
          {card.city}, {card.countryCode} · {card.dateLabel}
        </span>
      </span>

      <span className="col-span-2 flex items-start gap-2 sm:col-span-1 sm:justify-end">
        <StatusMark status={card.status} />
      </span>
    </Link>
  );
}
