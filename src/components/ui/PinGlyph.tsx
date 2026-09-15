import { pinInner } from "@/lib/pin";
import type { PinShape, Status } from "@/lib/schema";

/** The spatial-type mark, for legends and list rows. Geometry comes from
 *  lib/pin.ts, which the map markers use too. */
export function PinGlyph({
  shape,
  accent = "#16161a",
  status = "placeholder",
  size = 14,
  className = "",
}: {
  shape: PinShape;
  accent?: string;
  status?: Status;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: pinInner({ shape, accent, status }) }}
    />
  );
}
