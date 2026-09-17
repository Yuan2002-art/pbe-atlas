"use client";

import { PinGlyph } from "@/components/ui/PinGlyph";
import type { FilterGroup, Filters } from "@/lib/filters";
import type { PinShape } from "@/lib/schema";

export interface FilterOption {
  value: string;
  label: string;
  /** Spatial types draw their glyph next to the label. */
  shape?: PinShape;
  accent?: string;
}

export interface FilterGroupDef {
  group: FilterGroup;
  legend: string;
  hint?: string;
  options: FilterOption[];
  defaultOpen?: boolean;
}

export function FilterRail({
  groups,
  filters,
  counts,
  onToggle,
  onSearch,
  onClear,
  total,
  shown,
}: {
  groups: FilterGroupDef[];
  filters: Filters;
  counts: Record<FilterGroup, Record<string, number>>;
  onToggle: (group: FilterGroup, value: string) => void;
  onSearch: (value: string) => void;
  onClear: () => void;
  total: number;
  shown: number;
}) {
  return (
    <div className="quiet-scroll flex h-full flex-col overflow-y-auto">
      {/* Count + clear */}
      <div className="flex items-baseline justify-between gap-3 border-b border-rule px-5 py-4">
        <p className="label-lg" style={{ color: "var(--ink)" }}>
          {shown} of {total} cases
        </p>
        <button
          type="button"
          onClick={onClear}
          className="label underline hover:text-ink disabled:no-underline disabled:opacity-40"
          disabled={shown === total && !filters.q}
        >
          Clear all
        </button>
      </div>

      {/* Text search */}
      <div className="border-b border-rule px-5 py-4">
        <label className="label block" htmlFor="atlas-search">
          Search
        </label>
        <input
          id="atlas-search"
          type="search"
          value={filters.q}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="brand, city, product, keyword"
          className="mt-2 w-full rounded-[var(--radius-pill)] border border-rule bg-paper-raised px-3.5 py-2 text-[13px] placeholder:text-pencil focus:border-blue focus:outline-none"
        />
      </div>

      {/* Facet groups */}
      {groups.map((definition) => {
        const active = filters[definition.group];
        return (
          <details
            key={definition.group}
            open={definition.defaultOpen ?? active.length > 0}
            className="border-b border-rule"
          >
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-2 px-5 py-3.5 hover:bg-paper-sunk">
              <span className="label-lg" style={{ color: "var(--ink)" }}>
                {definition.legend}
              </span>
              <span className="label shrink-0">
                {active.length > 0 ? `${active.length} on` : definition.options.length}
              </span>
            </summary>

            <div className="px-5 pb-4">
              {definition.hint && (
                <p className="label mb-2 text-pencil">{definition.hint}</p>
              )}
              <ul>
                {definition.options.map((option) => {
                  const count = counts[definition.group][option.value] ?? 0;
                  const checked = active.includes(option.value);
                  const dead = count === 0 && !checked;
                  return (
                    <li key={option.value}>
                      <label
                        className={`flex cursor-pointer items-center gap-2 py-1 text-[13px] ${
                          dead ? "text-pencil" : "hover:text-ink"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={dead}
                          onChange={() => onToggle(definition.group, option.value)}
                          className="h-3 w-3 shrink-0 accent-blue"
                          style={{ accentColor: "var(--blue)" }}
                        />
                        {option.shape && (
                          <PinGlyph
                            shape={option.shape}
                            accent={option.accent ?? "#16161a"}
                            status="placeholder"
                            size={12}
                          />
                        )}
                        <span className="min-w-0 flex-1 truncate">{option.label}</span>
                        <span className="data shrink-0 text-pencil" style={{ fontSize: 10 }}>
                          {count}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </details>
        );
      })}

      <p className="label px-5 py-5 text-pencil">
        Filters are written into the address bar — copy the URL to save or cite a
        particular view of the Atlas.
      </p>
    </div>
  );
}
