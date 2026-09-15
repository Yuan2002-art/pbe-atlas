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
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-[2px]">
      <div className="flex items-stretch justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 border-rule px-4 py-3 sm:border-r sm:px-5"
        >
          <span
            aria-hidden
            className="grid h-6 w-6 shrink-0 place-items-center border border-ink text-[9px] font-medium tracking-[0.04em]"
            style={{ fontFamily: "var(--font-plex-mono), monospace" }}
          >
            PBE
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-medium tracking-[-0.01em]">
              Performance Brand Experience Atlas
            </span>
            <span className="label hidden sm:block">
              Global research prototype · MVP
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-stretch sm:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`label-lg flex items-center border-l border-rule px-5 transition-colors ${
                isActive(item.href)
                  ? "bg-ink text-paper"
                  : "hover:bg-paper-sunk hover:text-ink"
              }`}
              style={isActive(item.href) ? { color: "var(--paper)" } : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="label-lg border-l border-rule px-4 sm:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-rule sm:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`label-lg block border-b border-rule px-4 py-3 ${
                isActive(item.href) ? "bg-ink" : ""
              }`}
              style={isActive(item.href) ? { color: "var(--paper)" } : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
