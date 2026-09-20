"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* Two tiers, because the sections are not peers. Map, Events and Brands are
   the three ways into the research and stay on the bar. Register and Method
   are how you read it once you are in, so they sit behind the Research
   button rather than competing with the three. Order here is the order on
   screen. */
const NAV = [
  { href: "/", label: "Map", tier: "primary" },
  { href: "/events", label: "Events", tier: "primary" },
  { href: "/brands", label: "Brands", tier: "primary" },
  { href: "/cases", label: "Register", tier: "secondary" },
  { href: "/about", label: "Method", tier: "secondary" },
] as const;

const PRIMARY = NAV.filter((item) => item.tier === "primary");
const SECONDARY = NAV.filter((item) => item.tier === "secondary");

/** The Atlas's standing line. Declared once, used in the strip and as the
 *  mobile fallback, so the two can never drift. */
const STANDING_LINE =
  "How performance brands use permanent retail, races, pop-ups, launches and activations to build performance credibility and cultural meaning.";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const researchRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const researchActive = SECONDARY.some((item) => isActive(item.href));

  /* Close the Research menu on Escape and on any click outside it. Both are
     what a reader expects of a dropdown, and neither is worth a library. */
  useEffect(() => {
    if (!researchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResearchOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (!researchRef.current?.contains(e.target as Node)) setResearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [researchOpen]);

  /* Route change closes both menus. */
  useEffect(() => {
    setResearchOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--header)] w-full max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6">
        {/* Wordmark, with the standing line stacked under it. The line had
            its own full-width strip for a while; it read as a separate band of
            site furniture rather than as what the Atlas is. It belongs to the
            wordmark, so it sits under "Global research prototype" and indents
            to the same left edge as the title (28px badge + 10px gap). Shown
            from 1024px, where it fits on one line. */}
        <div className="flex min-w-0 flex-col justify-center">
          <Link href="/" className="flex items-center gap-2.5 self-start">
            <span
              aria-hidden
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[8px] font-medium tracking-[0.04em]"
              style={{ fontFamily: "var(--font-plex-mono), monospace", color: "var(--paper-raised)" }}
            >
              PBE
            </span>
            <span className="leading-tight">
              <span className="block text-[13.5px] font-medium tracking-[-0.01em]">
                Performance Brand Experience Atlas
              </span>
              <span className="label hidden sm:block">Global research prototype</span>
            </span>
          </Link>
          <p className="hidden truncate pl-[38px] pt-1 text-[12.5px] leading-tight text-graphite lg:block">
            {STANDING_LINE}
          </p>
        </div>

        {/* Desktop nav — the three ways in, then Research. */}
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
          {PRIMARY.map((item) => (
            <NavPill key={item.href} item={item} active={isActive(item.href)} primary />
          ))}

          <span aria-hidden className="mx-2 h-4 w-px shrink-0 bg-rule" />

          <div ref={researchRef} className="relative">
            <button
              type="button"
              onClick={() => setResearchOpen((v) => !v)}
              aria-expanded={researchOpen}
              aria-haspopup="menu"
              aria-controls="research-menu"
              className={`label-xl rounded-[var(--radius-pill)] border border-rule px-3.5 py-2 transition-colors ${
                researchActive || researchOpen ? "bg-ink" : "hover:bg-paper-sunk hover:text-ink"
              }`}
              style={
                researchActive || researchOpen
                  ? { color: "var(--paper-raised)" }
                  : { color: "var(--ink)" }
              }
            >
              Research
              <span aria-hidden className="ml-1.5 inline-block text-[9px] align-middle">
                {researchOpen ? "▲" : "▼"}
              </span>
            </button>

            {researchOpen && (
              <div
                id="research-menu"
                role="menu"
                className="absolute right-0 top-[calc(100%+8px)] min-w-[11rem] rounded-[var(--radius-sm)] border border-rule bg-paper-raised p-1.5 shadow-lg"
              >
                {SECONDARY.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      aria-current={active ? "page" : undefined}
                      className={`label block rounded-[var(--radius-sm)] px-3 py-2.5 ${
                        active ? "bg-ink" : "hover:bg-paper-sunk hover:text-ink"
                      }`}
                      style={active ? { color: "var(--paper-raised)" } : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile toggle. The hiding lives on the wrapper, not the button:
            .btn-quiet sets display:flex and outranks the sm:hidden utility on
            the same element, which is why this button used to sit on the
            desktop bar next to the nav it duplicates. */}
        <div className="sm:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="btn-quiet"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-rule bg-paper px-4 py-2 sm:hidden"
        >
          {NAV.map((item, i) => {
            const active = isActive(item.href);
            const primary = item.tier === "primary";
            return (
              <div key={item.href}>
                {!primary && NAV[i - 1]?.tier === "primary" && (
                  <>
                    <hr aria-hidden className="my-2 border-rule" />
                    <p className="label px-4 pb-1 pt-1">Research</p>
                  </>
                )}
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`${
                    primary ? "label-xl" : "label"
                  } my-1 block rounded-[var(--radius-pill)] px-4 py-2.5 ${
                    active ? "bg-ink" : ""
                  }`}
                  style={
                    active
                      ? { color: "var(--paper-raised)" }
                      : primary
                        ? { color: "var(--ink)" }
                        : undefined
                  }
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
          <hr aria-hidden className="my-2 border-rule" />
          <p className="px-4 pb-3 pt-1 text-[12.5px] leading-snug text-graphite">
            {STANDING_LINE}
          </p>
        </nav>
      )}
    </header>
  );
}

/** One nav pill. Kept local to the header because the two tiers differ only
 *  in type size and colour, and nothing else needs it. */
function NavPill({
  item,
  active,
  primary = false,
}: {
  item: (typeof NAV)[number];
  active: boolean;
  primary?: boolean;
}) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`${
        primary ? "label-xl px-3.5 py-2" : "label px-3 py-2"
      } rounded-[var(--radius-pill)] transition-colors ${
        active ? "bg-ink" : "hover:bg-paper-sunk hover:text-ink"
      }`}
      style={
        active
          ? { color: "var(--paper-raised)" }
          : primary
            ? { color: "var(--ink)" }
            : undefined
      }
    >
      {item.label}
    </Link>
  );
}
