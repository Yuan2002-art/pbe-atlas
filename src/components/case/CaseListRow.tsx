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
      className="card card-hover group grid grid-cols-[auto_minmax(0,1fr)] gap-x-3.5 gap-y-1.5 p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-5"
    >
      <span className="pt-1">
        <PinGlyph shape={card.pinShape} accent={accent} status={card.status} />
      </span>

      <span className="min-w-0">
        <span className="label block">
          Case {card.ref} · {card.spatialTypeSummary}
          {card.relatedEventName && ` · ${card.relatedEventName}`}
        </span>
        <span className="mt-1 block text-[15.5px] leading-snug group-hover:underline">
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
