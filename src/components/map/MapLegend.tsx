"use client";

import { PinGlyph } from "@/components/ui/PinGlyph";
import type { PinShape } from "@/lib/schema";

export interface LegendEntry {
  id: string;
  label: string;
  shape: PinShape;
  accent: string;
}

/** Map key. Shape carries the meaning, colour only reinforces it, and a
 *  dashed outline marks unverified placeholder material. */
export function MapLegend({ entries }: { entries: LegendEntry[] }) {
  /* A slim vertical strip, not a box. The key was as wide as its longest
     label — "Sports Event / Race" set the width for all six rows and made a
     square panel out of a list of six marks. It now uses the `short` form from
     data/vocab/spatial-types.yml, which is what that field is for, so the
     strip is about half as wide and reads down rather than across. The full
     labels are still on the Method page, where there is room for them. */
  return (
    <details className="glass w-[9.5rem] rounded-[var(--radius-card)]" open>
      <summary
        className="label-lg cursor-pointer list-none px-3 py-2"
        style={{ color: "var(--ink)" }}
      >
        Key
      </summary>
      <ul className="border-t border-rule px-3 py-2.5">
        {entries.map((entry) => (
          <li key={entry.id} className="flex items-center gap-2 py-1">
            <PinGlyph shape={entry.shape} accent={entry.accent} status="verified" size={12} />
            <span className="label" style={{ color: "var(--ink)" }}>
              {entry.label}
            </span>
          </li>
        ))}
      </ul>
      <p
        className="label border-t border-rule px-3 py-2"
        style={{ color: "var(--red)" }}
      >
        Dashed = placeholder
      </p>
    </details>
  );
}
