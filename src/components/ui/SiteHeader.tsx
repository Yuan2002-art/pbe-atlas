"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Map" },
  { href: "/cases", label: "Register" },
  { href: "/brands", label: "Brands" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "Method" },
];

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

        {/* Desktop nav — quiet pills, filled when active */}
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`label-lg rounded-[var(--radius-pill)] px-3.5 py-2 transition-colors ${
                  active ? "bg-ink" : "hover:bg-paper-sunk hover:text-ink"
                }`}
                style={active ? { color: "var(--paper-raised)" } : undefined}
              >
                {item.label}
              </Link>
            );
          })}
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
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`label-lg my-1 block rounded-[var(--radius-pill)] px-4 py-2.5 ${
                  active ? "bg-ink" : ""
                }`}
                style={active ? { color: "var(--paper-raised)" } : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
