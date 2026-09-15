import Link from "next/link";

import { SectionHeading } from "@/components/ui/Primitives";
import type { CaseImage, CaseSections, Source } from "@/lib/schema";
import { ANALYSIS_SECTIONS } from "@/lib/sections";

/* --------------------------------------------------------------------------
   Prose block — one rendered Markdown section.
   -------------------------------------------------------------------------- */

export function Prose({ html, className = "" }: { html: string; className?: string }) {
  return (
    <div
      className={`prose-atlas ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* --------------------------------------------------------------------------
   Framing strip — the four summary fields.

   Performance credibility and Cultural meaning are NOT separate fields in the
   data: they are the two corresponding answers from the strategic analysis,
   surfaced here so the top of the page reads as a summary. Asked once,
   shown twice.
   -------------------------------------------------------------------------- */

export function FramingStrip({ sections }: { sections: CaseSections }) {
  const items = [
    { label: "Strategic purpose", html: sections.strategicPurpose, note: "" },
    {
      label: "Performance credibility",
      html: sections.performanceClaim,
      note: "from the analysis below",
    },
    {
      label: "Cultural / emotional meaning",
      html: sections.culturalMeaning,
      note: "from the analysis below",
    },
    { label: "Archive use", html: sections.archiveUse, note: "" },
  ];

  return (
    <div className="grid gap-x-8 gap-y-6 border-y border-rule py-6 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label}>
          <p className="label flex items-baseline gap-2">
            <span style={{ color: "var(--ink)" }}>{item.label}</span>
            {item.note && <span className="text-pencil">· {item.note}</span>}
          </p>
          <Prose html={item.html} className="mt-2 text-[14px]" />
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Strategic analysis — the seven research questions as an interrogation grid.
   -------------------------------------------------------------------------- */

export function AnalysisGrid({
  sections,
  index = "§3",
}: {
  sections: CaseSections;
  index?: string;
}) {
  const rows = ANALYSIS_SECTIONS.map((section) => ({
    ...section,
    html: sections[section.key as keyof CaseSections] ?? "",
  })).filter((row) => row.html);

  return (
    <section>
      <SectionHeading index={index} note="seven questions asked of every case">
        Strategic analysis
      </SectionHeading>
      <dl className="border-t border-rule">
        {rows.map((row, position) => (
          <div
            key={row.key}
            className="grid gap-x-8 gap-y-1 border-b border-rule py-4 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
          >
            <dt className="label flex items-baseline gap-2 md:pt-1">
              <span className="text-pencil">{String(position + 1).padStart(2, "0")}</span>
              <span style={{ color: "var(--ink)" }}>{row.label}</span>
            </dt>
            <dd className="min-w-0">
              <Prose html={row.html} className="text-[14.5px]" />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Image plates
   -------------------------------------------------------------------------- */

export function ImagePlates({
  images,
  caseRef,
  index = "§4",
}: {
  images: CaseImage[];
  caseRef: string;
  index?: string;
}) {
  if (!images.length) return null;
  return (
    <section>
      <SectionHeading index={index} note={`${images.length} plate(s)`}>
        Images
      </SectionHeading>
      <div className="grid gap-5 sm:grid-cols-2">
        {images.map((image, position) => (
          <figure key={image.src} className="min-w-0">
            <div className="border border-rule bg-paper-sunk">
              {/* Plain <img>: these are placeholder SVGs today and will be
                  researched photographs later. Swap to next/image when the
                  real images arrive and sizes are known. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.caption}
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-2">
              <p className="label">
                Plate {caseRef}.{String(position + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-graphite">
                {image.caption}
              </p>
              <p className="label mt-1">
                Credit: {image.credit || "TBD"}
                {image.sourceUrl && (
                  <>
                    {" · "}
                    <a
                      href={image.sourceUrl}
                      className="underline"
                      style={{ color: "var(--blue)" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      source
                    </a>
                  </>
                )}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Sources
   -------------------------------------------------------------------------- */

export function SourceList({
  sources,
  index = "§5",
}: {
  sources: Source[];
  index?: string;
}) {
  return (
    <section>
      <SectionHeading index={index}>Sources</SectionHeading>
      {sources.length === 0 ? (
        <p className="label" style={{ color: "var(--red)" }}>
          No sources attached — this record is not yet research.
        </p>
      ) : (
        <ol className="border-t border-rule">
          {sources.map((source, position) => (
            <li
              key={`${source.title}-${position}`}
              className="flex gap-4 border-b border-rule py-2.5"
            >
              <span className="data shrink-0 text-pencil">
                [{String(position + 1).padStart(2, "0")}]
              </span>
              <span className="min-w-0 text-[13.5px] leading-snug">
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                    style={{ color: "var(--blue)" }}
                  >
                    {source.title}
                  </a>
                ) : (
                  <span>{source.title}</span>
                )}
                {source.publisher && (
                  <span className="text-graphite"> — {source.publisher}</span>
                )}
                {source.accessed && (
                  <span className="label ml-2">accessed {source.accessed}</span>
                )}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

/* --------------------------------------------------------------------------
   Previous / next navigation through the register.
   -------------------------------------------------------------------------- */

export function CaseStepper({
  previous,
  next,
}: {
  previous?: { slug: string; ref: string; title: string };
  next?: { slug: string; ref: string; title: string };
}) {
  return (
    <nav
      aria-label="Register navigation"
      className="grid gap-px border-t border-rule sm:grid-cols-2"
    >
      {[
        { item: previous, direction: "Previous case" },
        { item: next, direction: "Next case" },
      ].map(({ item, direction }) =>
        item ? (
          <Link
            key={direction}
            href={`/cases/${item.slug}`}
            className="group block px-4 py-4 transition-colors hover:bg-paper-sunk sm:px-5"
          >
            <span className="label block">
              {direction} · {item.ref}
            </span>
            <span className="mt-1 block text-[14px] group-hover:underline">
              {item.title}
            </span>
          </Link>
        ) : (
          <span key={direction} className="block px-4 py-4 sm:px-5">
            <span className="label block text-pencil">{direction}</span>
            <span className="mt-1 block text-[14px] text-pencil">—</span>
          </span>
        ),
      )}
    </nav>
  );
}
