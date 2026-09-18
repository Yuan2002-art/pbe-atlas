import Link from "next/link";

import { statusTally } from "@/lib/queries";

export function SiteFooter() {
  /* Read the banner off the data rather than asserting it. It used to say
     "cases marked placeholder are invented demo material" on every page of the
     site — which stayed there after the last placeholder was deleted, telling
     readers to watch for a marking that no longer existed and implying the
     dataset still held invented material. A standing claim about the data
     should come from the data. */
  const tally = statusTally();
  const invented = tally.placeholder + tally["ai-reconstructed"];

  return (
    <footer className="mt-20 border-t border-rule">
      <div
        className={`border-b border-rule px-4 py-2.5 sm:px-6 ${
          invented > 0 ? "hatch-placeholder" : ""
        }`}
      >
        <p
          className="label mx-auto max-w-[1400px]"
          style={{ color: invented > 0 ? "var(--red)" : "var(--graphite)" }}
        >
          {invented > 0 ? (
            <>
              Prototype · {invented} case{invented === 1 ? "" : "s"} marked
              placeholder or AI-reconstructed are not research and must not be
              cited
            </>
          ) : (
            <>
              Prototype · every case here is research, at the evidence level
              stated on it · nothing in this dataset is invented
            </>
          )}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="display text-[1.35rem]">
            Performance Brand Experience Atlas
          </p>
          <p className="mt-2 max-w-[42ch] text-[13.5px] leading-snug text-graphite">
            How performance brands use permanent retail, races, pop-ups,
            launches and activations to build performance credibility and
            cultural meaning.
          </p>
        </div>

        <nav aria-label="Browse">
          <p className="label mb-3">Browse</p>
          <ul className="flex flex-col gap-2 text-[13.5px]">
            <li><Link href="/" className="hover:underline">Global map</Link></li>
            <li><Link href="/cases" className="hover:underline">Case register</Link></li>
            <li><Link href="/brands" className="hover:underline">Brands</Link></li>
            <li><Link href="/events" className="hover:underline">Events</Link></li>
          </ul>
        </nav>

        <nav aria-label="About">
          <p className="label mb-3">Research</p>
          <ul className="flex flex-col gap-2 text-[13.5px]">
            <li><Link href="/about" className="hover:underline">Method &amp; classification</Link></li>
            <li><Link href="/about" className="hover:underline">Evidence status</Link></li>
            <li>
              <span className="text-graphite">Data in </span>
              <span className="data" style={{ fontSize: 11 }}>/data</span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-rule px-4 py-5 sm:px-6">
        <p className="label mx-auto max-w-[1400px]">
          Basemap © OpenFreeMap · © OpenMapTiles · data from OpenStreetMap
        </p>
      </div>
    </footer>
  );
}
