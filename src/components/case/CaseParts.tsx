import Link from "next/link";

import { SectionHeading } from "@/components/ui/Primitives";
import type { CaseImage, CaseSections, Source, SourceType } from "@/lib/schema";
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
   The line between evidence and reading.

   Everything above this marker is what a source says. Everything below it is
   the author's interpretation. A thesis reader has to be able to see the join
   without being told, so it is a piece of furniture on the page rather than a
   sentence buried in a paragraph.
   -------------------------------------------------------------------------- */

export function InterpretationNotice() {
  return (
    <div
      className="rounded-[var(--radius-card)] border-l-2 bg-blue-sunk px-5 py-4"
      style={{ borderColor: "var(--blue)" }}
    >
      <p className="label-lg" style={{ color: "var(--blue)" }}>
        Analysis, not fact
      </p>
      <p className="mt-1.5 max-w-[68ch] text-[13.5px] leading-snug">
        Everything in this section is the author&apos;s reading of the case. It is
        argued from the verified facts above, but it is not itself evidence and no
        source states it.
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Key strategic insight — the one line meant to be read across every case at
   once. Rendered as the closing synthesis of the interpretation, not as one
   more row in the grid.
   -------------------------------------------------------------------------- */

export function KeyInsight({ html }: { html: string }) {
  if (!html) return null;
  return (
    <div className="card bg-ink px-6 py-6" style={{ color: "var(--paper-raised)" }}>
      <p className="label-lg" style={{ color: "var(--paper-raised)", opacity: 0.7 }}>
        Key strategic insight
      </p>
      <div
        className="prose-atlas mt-3 text-[17px]"
        style={{ color: "var(--paper-raised)" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
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
    <div className="card grid gap-x-10 gap-y-7 p-6 sm:grid-cols-2">
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
  // Key strategic insight is pulled out and rendered by <KeyInsight /> as the
  // closing synthesis, so it is not repeated here.
  const rows = ANALYSIS_SECTIONS.filter((s) => s.key !== "keyStrategicInsight")
    .map((section) => ({
      ...section,
      html: sections[section.key as keyof CaseSections] ?? "",
    }))
    .filter((row) => row.html);

  return (
    <section>
      <SectionHeading index={index} note="the same questions asked of every case">
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
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper-sunk">
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

/** Ordered strongest-to-weakest as evidence. A brand describing its own space
 *  and a magazine reporting on it are not the same claim, and the page should
 *  not flatten them into one list. */
const SOURCE_GROUPS: { type: SourceType; label: string }[] = [
  { type: "official-brand", label: "Official brand source" },
  { type: "event-organiser", label: "Event organiser" },
  { type: "agency-studio", label: "Agency / design studio" },
  { type: "editorial", label: "Editorial / secondary" },
  { type: "other", label: "Other" },
];

export function SourceList({
  sources,
  index = "§5",
}: {
  sources: Source[];
  index?: string;
}) {
  // Numbering runs continuously across the groups so a source can be cited as
  // [03] regardless of which group it sits in.
  let counter = 0;
  const groups = SOURCE_GROUPS.map((group) => ({
    ...group,
    items: sources
      .filter((source) => source.type === group.type)
      .map((source) => ({ source, n: ++counter })),
  })).filter((group) => group.items.length > 0);

  return (
    <section>
      <SectionHeading
        index={index}
        note={sources.length > 0 ? `${sources.length} source(s)` : undefined}
      >
        Sources
      </SectionHeading>
      {sources.length === 0 ? (
        <p className="label" style={{ color: "var(--red)" }}>
          No sources attached — this record is not yet research.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group.type}>
              <p className="label border-b border-rule pb-1.5">{group.label}</p>
              <ol>
                {group.items.map(({ source, n }) => (
                  <li
                    key={`${source.title}-${n}`}
                    className="flex gap-4 border-b border-rule py-2.5"
                  >
                    <span className="data shrink-0 text-pencil">
                      [{String(n).padStart(2, "0")}]
                    </span>
                    <span className="min-w-0 text-[13.5px] leading-snug">
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="break-words underline"
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
            </div>
          ))}
        </div>
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
