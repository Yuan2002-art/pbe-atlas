import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-rule">
      <div className="hatch-placeholder border-b border-rule px-4 py-2.5 sm:px-6">
        <p
          className="label mx-auto max-w-[1400px]"
          style={{ color: "var(--red)" }}
        >
          Prototype · cases marked placeholder are invented demo material and
          must not be cited as research
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
