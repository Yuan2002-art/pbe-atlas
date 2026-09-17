"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/* Two tiers, because the sections are not peers. Map, Events and Brands are
   the three ways into the research; Register and Method are how you read it
   once you are in. Order here is the order on screen. */
const NAV = [
  { href: "/", label: "Map", tier: "primary" },
  { href: "/events", label: "Events", tier: "primary" },
  { href: "/brands", label: "Brands", tier: "primary" },
  { href: "/cases", label: "Register", tier: "secondary" },
  { href: "/about", label: "Method", tier: "secondary" },
] as const;

const PRIMARY = NAV.filter((item) => item.tier === "primary");
const SECONDARY = NAV.filter((item) => item.tier === "secondary");

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--header)] w-full max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6">
        {/* Wordmark */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
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

        {/* The thesis in one line. It used to sit in a strip under the header,
            which cost a band across the page and pushed the map down; up here
            it reads as the standing description of the whole Atlas, which is
            what it always was. Hidden below xl, where the nav needs the room. */}
        <p className="hidden min-w-0 flex-1 truncate text-[12.5px] leading-snug text-graphite xl:block">
          How performance brands use permanent retail, races, pop-ups, launches and
          activations to build performance credibility and cultural meaning.
        </p>

        {/* Desktop nav — quiet pills, filled when active. Primary tier sits
            larger and in ink; secondary stays at label size and graphite. */}
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
          {PRIMARY.map((item) => (
            <NavPill key={item.href} item={item} active={isActive(item.href)} primary />
          ))}
          <span aria-hidden className="mx-2 h-4 w-px shrink-0 bg-rule" />
          {SECONDARY.map((item) => (
            <NavPill key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="btn-quiet sm:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
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
                  <hr aria-hidden className="my-2 border-rule" />
                )}
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
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
