"use client";

import Link from "next/link";

import { PinGlyph } from "@/components/ui/PinGlyph";
import { StatusMark, TagChip } from "@/components/ui/Primitives";
import type { CaseCard } from "@/lib/card";

/** The card that opens when a pin is clicked. Bottom-left panel on desktop,
 *  bottom sheet on a phone. */
export function PreviewCard({
  card,
  accent,
  tagLabels,
  onClose,
}: {
  card: CaseCard;
  accent: string;
  tagLabels: Record<string, string>;
  onClose: () => void;
}) {
  return (
    <aside
      className="card pointer-events-auto w-full overflow-hidden shadow-[var(--shadow-lift)] sm:max-w-[27rem]"
      aria-label={`Preview of case ${card.ref}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-rule px-3.5 py-2.5">
        <p className="label flex items-center gap-2">
          <PinGlyph shape={card.pinShape} accent={accent} status={card.status} size={13} />
          Case {card.ref} · {card.spatialTypeSummary}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="label -mr-1 -mt-0.5 px-1 hover:text-ink"
          aria-label="Close preview"
        >
          Close
        </button>
      </div>

      <div className="px-3.5 py-3">
        <p className="label">{card.brandName}</p>
        <h2 className="display mt-1 text-[1.45rem]">{card.title}</h2>

        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <dt className="label">Place</dt>
            <dd className="text-[13px] leading-snug">
              {card.city}, {card.countryCode}
            </dd>
          </div>
          <div>
            <dt className="label">Date</dt>
            <dd className="data text-[12px] leading-snug">{card.dateLabel}</dd>
          </div>
          {card.relatedEventName && (
            <div className="col-span-2">
              <dt className="label">Event</dt>
              <dd className="text-[13px] leading-snug">
                <Link
                  href={`/events/${card.relatedEvent}`}
                  className="underline hover:no-underline"
                >
                  {card.relatedEventName}
                </Link>
              </dd>
            </div>
          )}
          {card.product && (
            <div className="col-span-2">
              <dt className="label">Product</dt>
              <dd className="text-[13px] leading-snug">{card.product}</dd>
            </div>
          )}
        </dl>

        <p className="mt-3 line-clamp-4 text-[13.5px] leading-snug text-graphite">
          {card.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {card.tags.map((tag) => (
            <TagChip key={tag} id={tag} label={tagLabels[tag] ?? tag} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-rule px-3.5 py-2.5">
        <StatusMark status={card.status} />
        <Link
          href={`/cases/${card.slug}`}
          className="btn-primary"
        >
          Open case →
        </Link>
      </div>
    </aside>
  );
}
