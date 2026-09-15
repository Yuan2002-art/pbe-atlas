import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="hatch-placeholder border-b border-rule px-4 py-2 sm:px-5">
        <p className="label" style={{ color: "var(--red)" }}>
          Prototype · all case content is placeholder material and must not be
          cited as research
        </p>
      </div>
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-5">
        <p className="label">
          Performance Brand Experience Atlas — MVP build · data in{" "}
          <span className="data" style={{ fontSize: 10 }}>
            /data
          </span>
        </p>
        <nav className="label flex gap-4" aria-label="Footer">
          <Link href="/about" className="hover:text-ink">
            Method &amp; classification
          </Link>
          <Link href="/cases" className="hover:text-ink">
            Full register
          </Link>
        </nav>
      </div>
    </footer>
  );
}
