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
  return (
    <details
      className="border border-rule bg-paper/95 backdrop-blur-[2px]"
      open
    >
      <summary className="label-lg cursor-pointer list-none px-3 py-2" style={{ color: "var(--ink)" }}>
        Key
      </summary>
      <ul className="border-t border-rule px-3 py-2">
        {entries.map((entry) => (
          <li key={entry.id} className="flex items-center gap-2 py-0.5">
            <PinGlyph shape={entry.shape} accent={entry.accent} status="verified" size={12} />
            <span className="label" style={{ color: "var(--ink)" }}>
              {entry.label}
            </span>
          </li>
        ))}
      </ul>
      <p className="label border-t border-rule px-3 py-2" style={{ color: "var(--red)" }}>
        Dashed outline = placeholder record
      </p>
    </details>
  );
}
