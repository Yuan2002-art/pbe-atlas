import type { CaseCard } from "@/lib/card";

/** A case's hero picture, small, for lists and preview cards. Renders nothing
 *  when the case has no picture: an empty slot is honest, a stand-in is not. */
export function CaseThumb({
  card,
  className = "h-14 w-20",
}: {
  card: Pick<CaseCard, "heroImage" | "title">;
  className?: string;
}) {
  if (!card.heroImage) return null;
  return (
    // Plain <img>, as on the case page: the files are already resized by hand.
    <img
      src={card.heroImage}
      alt=""
      loading="lazy"
      className={`shrink-0 rounded-[6px] bg-paper-sunk object-cover ${className}`}
    />
  );
}
