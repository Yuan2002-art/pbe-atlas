/* ===========================================================================
   The prose sections of a case file, in the order they appear.
   This single list drives: the case template (scripts/new-case.mjs), the
   Markdown parser (lib/content.ts) and the case page layout. Change a heading
   here and everything follows — but you must also update existing case files.
   =========================================================================== */

/** The two layers a case page is split into, plus the summary strip.
 *
 *  facts      externally verifiable — what a source says was there
 *  framing    the four-field summary at the top of the interpretation
 *  analysis   the author's reading. Not fact, and labelled as such.
 *
 *  Keeping this distinction in the data, not only in the layout, is what lets
 *  the page state plainly where evidence stops and interpretation begins. */
export type SectionGroup = "facts" | "framing" | "analysis";

export interface SectionDef {
  /** Key used in code and in the parsed case object. */
  key: string;
  /** The exact `## Heading` written in the Markdown file. */
  heading: string;
  /** How it is labelled on the page. */
  label: string;
  group: SectionGroup;
  /** Missing required sections fail `npm run validate`. */
  required: boolean;
}

export const CASE_SECTIONS: SectionDef[] = [
  {
    key: "description",
    heading: "Description",
    label: "Short description",
    group: "facts",
    required: true,
  },
  {
    key: "verificationNotes",
    heading: "Verification notes",
    label: "Verification notes",
    group: "facts",
    required: false,
  },
  {
    key: "strategicPurpose",
    heading: "Strategic purpose",
    label: "Strategic purpose",
    group: "framing",
    required: true,
  },
  {
    key: "archiveUse",
    heading: "Archive use",
    label: "Archive use",
    group: "framing",
    required: true,
  },
  {
    key: "whyLocation",
    heading: "Why this location?",
    label: "Why this location?",
    group: "analysis",
    required: true,
  },
  {
    key: "whyTiming",
    heading: "Why this timing?",
    label: "Why this timing?",
    group: "analysis",
    required: true,
  },
  {
    key: "whyEvent",
    heading: "Why this event?",
    label: "Why this event?",
    group: "analysis",
    required: false,
  },
  {
    key: "whyProduct",
    heading: "Why this product?",
    label: "Why this product?",
    group: "analysis",
    required: false,
  },
  {
    key: "performanceClaim",
    heading: "What performance claim is being reinforced?",
    label: "What performance claim is being reinforced?",
    group: "analysis",
    required: true,
  },
  {
    key: "culturalMeaning",
    heading: "What cultural meaning is being built?",
    label: "What cultural meaning is being built?",
    group: "analysis",
    required: true,
  },
  {
    key: "physicalExperienceRole",
    heading: "What role does the physical experience play?",
    label: "What role does the physical experience play?",
    group: "analysis",
    required: true,
  },
  {
    key: "experienceMechanism",
    heading: "Experience mechanism",
    label: "Experience mechanism",
    group: "analysis",
    required: false,
  },
  {
    // Deliberately last: the one-line synthesis of everything above it, and
    // the field most likely to be read across every case at once.
    key: "keyStrategicInsight",
    heading: "Key strategic insight",
    label: "Key strategic insight",
    group: "analysis",
    required: false,
  },
];

export const FACTS_SECTIONS = CASE_SECTIONS.filter((s) => s.group === "facts");
export const ANALYSIS_SECTIONS = CASE_SECTIONS.filter((s) => s.group === "analysis");

/** Normalised form used to match a heading in a file to a section key,
 *  so "Why this location?" and "why this location" both resolve. */
export function normaliseHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export const SECTION_BY_HEADING: Record<string, SectionDef> = Object.fromEntries(
  CASE_SECTIONS.map((s) => [normaliseHeading(s.heading), s]),
);
