import type { Metadata } from "next";

import { PinGlyph } from "@/components/ui/PinGlyph";
import {
  MetaItem,
  PageHeader,
  SectionHeading,
  StatusMark,
} from "@/components/ui/Primitives";
import { getAtlas, statusTally } from "@/lib/queries";
import { ANALYSIS_SECTIONS } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Method",
  description:
    "The classification system, the seven strategic questions, and the evidence status of every record in the Atlas.",
};

const STATUS_NOTES = [
  {
    status: "placeholder" as const,
    note: "Invented demonstration content written to test the structure. Not research. Must never be cited.",
  },
  {
    status: "draft" as const,
    note: "Written from general knowledge, not yet checked against sources. Treat as a lead, not a finding.",
  },
  {
    status: "verified" as const,
    note: "Every claim on the record is supported by the sources listed at the foot of the page.",
  },
];

export default function AboutPage() {
  const atlas = getAtlas();
  const tally = statusTally();

  return (
    <div>
      <PageHeader
        eyebrow="Method · classification · evidence"
        title="How the Atlas works"
        lede="The Atlas records physical and experiential brand activity as comparable cases. Every case answers the same questions and carries the same labels, so cases can be compared rather than only described."
        meta={
          <>
            <MetaItem label="Cases" value={atlas.cases.length} />
            <MetaItem label="Spatial types" value={atlas.spatialTypes.length} />
            <MetaItem label="Classification tags" value={atlas.tags.length} />
            <MetaItem label="Strategic questions" value={ANALYSIS_SECTIONS.length} />
          </>
        }
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-9 sm:px-5">
        {/* Evidence warning first — it is the most important thing on the page */}
        <section className="mb-12">
          <SectionHeading index="§1">Evidence status</SectionHeading>

          <div className="hatch-placeholder mb-6 border px-4 py-3" style={{ borderColor: "var(--red)" }}>
            <p className="label-lg" style={{ color: "var(--red)" }}>
              This build contains {tally.placeholder} placeholder case
              {tally.placeholder === 1 ? "" : "s"} of {atlas.cases.length}
            </p>
            <p className="mt-2 max-w-[70ch] text-[13.5px] leading-snug">
              The cases in this prototype were invented to test the structure of the
              Atlas — the brands are real, the spaces described are not. They exist so
              the map, the filters and the comparison views can be evaluated before
              research begins. Replace them file by file; the status label on each
              record is what tells you which is which.
            </p>
          </div>

          <dl className="border-t border-rule">
            {STATUS_NOTES.map((item) => (
              <div
                key={item.status}
                className="grid gap-x-6 gap-y-1 border-b border-rule py-3 sm:grid-cols-[10rem_minmax(0,1fr)]"
              >
                <dt>
                  <StatusMark status={item.status} />
                </dt>
                <dd className="max-w-[70ch] text-[13.5px] leading-snug text-graphite">
                  {item.note}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Spatial types */}
        <section className="mb-12">
          <SectionHeading index="§2" note="one per case">
            Spatial types
          </SectionHeading>
          <p className="prose-atlas mb-5 text-graphite">
            The physical form of the case — what was actually built. Each type has its
            own mark on the map, so the map can be read in black and white.
          </p>
          <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {atlas.spatialTypes.map((type) => (
              <div key={type.id} className="bg-paper p-4">
                <dt className="flex items-center gap-2">
                  <PinGlyph
                    shape={type.pinShape}
                    accent={type.accent}
                    status="verified"
                    size={15}
                  />
                  <span className="label-lg" style={{ color: "var(--ink)" }}>
                    {type.label}
                  </span>
                </dt>
                <dd className="mt-2 max-w-[52ch] text-[13.5px] leading-snug text-graphite">
                  {type.definition}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Classification tags */}
        <section className="mb-12">
          <SectionHeading index="§3" note="one or more per case">
            Classification
          </SectionHeading>
          <p className="prose-atlas mb-5 text-graphite">
            The analytical lens — what the case is doing, as distinct from what it is.
            A single space can hold several of these at once, and the overlaps are
            where the argument lives.
          </p>
          <dl className="border-t border-rule">
            {atlas.tags.map((tag) => (
              <div
                key={tag.id}
                className="grid gap-x-8 gap-y-1 border-b border-rule py-3.5 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]"
              >
                <dt className="label-lg" style={{ color: "var(--ink)" }}>
                  {tag.label}
                </dt>
                <dd className="max-w-[70ch] text-[13.5px] leading-snug text-graphite">
                  {tag.definition}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* The seven questions */}
        <section className="mb-12">
          <SectionHeading index="§4" note="asked of every case">
            Strategic analysis
          </SectionHeading>
          <p className="prose-atlas mb-5 text-graphite">
            Every case answers these, in its own words, in{" "}
            <span className="data">data/cases/&lt;slug&gt;.md</span>. Asking the same
            questions of a flagship store and of a race is what makes the two
            comparable.
          </p>
          <ol className="border-t border-rule">
            {ANALYSIS_SECTIONS.map((section, index) => (
              <li
                key={section.key}
                className="flex items-baseline gap-4 border-b border-rule py-3"
              >
                <span className="data shrink-0 text-pencil">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[14.5px]">{section.label}</span>
                {!section.required && <span className="label ml-auto">optional</span>}
              </li>
            ))}
          </ol>
          <p className="label mt-3 max-w-[70ch]">
            Performance credibility and cultural meaning appear at the top of a case
            page as a summary, but they are not separate fields: they are questions 05
            and 06, shown twice so the page can be read quickly or slowly.
          </p>
        </section>

        {/* How the data works */}
        <section className="mb-12">
          <SectionHeading index="§5">Where the data lives</SectionHeading>
          <dl className="border-t border-rule">
            {[
              ["data/cases/", "One Markdown file per case. This is the Atlas."],
              ["data/brands/", "One file per brand."],
              ["data/events/", "One file per event."],
              [
                "data/vocab/",
                "The two vocabularies above. Add a spatial type or a tag here and the filters, the map key and this page all update.",
              ],
              [
                "data/map-palette.json",
                "Map colours. Change one and run npm run map-style.",
              ],
              [
                "npm run validate",
                "Checks every file and explains, in plain language, anything that is wrong or missing.",
              ],
              [
                "npm run new-case",
                "Writes a new empty case file with all the fields and questions in place.",
              ],
            ].map(([path, note]) => (
              <div
                key={path}
                className="grid gap-x-8 gap-y-1 border-b border-rule py-3 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]"
              >
                <dt className="data text-[12px]" style={{ color: "var(--ink)" }}>
                  {path}
                </dt>
                <dd className="max-w-[70ch] text-[13.5px] leading-snug text-graphite">
                  {note}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Deliberate limits */}
        <section>
          <SectionHeading index="§6">Deliberate limits of this build</SectionHeading>
          <ul className="prose-atlas">
            <li>
              No AI-assisted research, no image-to-3D or floor-plan reconstruction, no
              timeline, no similarity search, no user submissions. The structure
              anticipates them; this build does not attempt them.
            </li>
            <li>
              No database. Ten Markdown files edited by hand are faster to work with
              than any admin interface, and the code reads the filesystem in exactly
              one place so a database can replace it later.
            </li>
            <li>
              No aggregate charts across cases. A claim about what performance brands
              do in general is a finding, and findings need verified data first.
            </li>
            <li>
              Cases that share a location are nudged apart on the map by up to about
              two kilometres so that each pin can be clicked. The coordinates printed
              on each case page are the real ones.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
