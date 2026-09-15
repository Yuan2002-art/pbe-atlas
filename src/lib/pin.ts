/* ===========================================================================
   PIN GLYPHS — one geometric mark per spatial type.

   The map is shape-coded, not colour-coded: a reader with colour-vision
   deficiency, or a black-and-white printout of a thesis page, still tells a
   store from a race. Colour is a second, redundant channel.

   A dashed outline means status "placeholder" — invented demo material.
   A solid fill means the case has been researched.

   The same geometry is used by the map markers, the legend, and the lists,
   so nothing can drift out of sync.
   =========================================================================== */

import type { PinShape, Status } from "./schema";

export const SHAPE_GEOMETRY: Record<PinShape, string> = {
  square: '<rect x="5" y="5" width="14" height="14" />',
  circle: '<circle cx="12" cy="12" r="7.2" />',
  triangle: '<polygon points="12,4 20,19 4,19" />',
  cross:
    '<polygon points="9.6,3 14.4,3 14.4,9.6 21,9.6 21,14.4 14.4,14.4 14.4,21 9.6,21 9.6,14.4 3,14.4 3,9.6 9.6,9.6" />',
  diamond: '<polygon points="12,2.8 21.2,12 12,21.2 2.8,12" />',
  chevron: '<polygon points="12,3.4 21,20.6 12,15.4 3,20.6" />',
};

export interface PinOptions {
  shape: PinShape;
  /** Hex colour from the spatial type. */
  accent: string;
  status: Status;
  /** Drawn larger with a ring when it is the open case. */
  selected?: boolean;
  size?: number;
}

/** The inner markup of the glyph (no <svg> wrapper). */
export function pinInner({
  shape,
  accent,
  status,
  selected = false,
}: PinOptions): string {
  const geometry = SHAPE_GEOMETRY[shape];
  const placeholder = status === "placeholder";

  const fill = placeholder ? "var(--paper-raised, #fbf9f4)" : accent;
  const stroke = accent;
  const dash = placeholder ? ' stroke-dasharray="3.2 2.2"' : "";

  const ring = selected
    ? `<circle cx="12" cy="12" r="11" fill="none" stroke="${accent}" stroke-width="1.4" opacity="0.5" />`
    : "";

  return `${ring}<g fill="${fill}" stroke="${stroke}" stroke-width="2"${dash}>${geometry}</g>`;
}

/** A complete standalone <svg> string — used for the map's DOM markers. */
export function pinSvg(options: PinOptions): string {
  const size = options.size ?? 22;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${pinInner(
    options,
  )}</svg>`;
}
