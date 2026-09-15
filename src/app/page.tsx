import { MapExplorer } from "@/components/map/MapExplorer";
import type { FilterGroupDef } from "@/components/filters/FilterRail";
import { getAtlas, statusTally, tagLabels } from "@/lib/queries";

export default function HomePage() {
  const atlas = getAtlas();
  const tally = statusTally();

  /* The filter rail is built from the data, not hard-coded: add a spatial
     type or a tag to data/vocab/ and it appears here automatically. */
  const groups: FilterGroupDef[] = [
    {
      group: "type",
      legend: "Spatial type",
      hint: "The physical form of the case.",
      defaultOpen: true,
      options: atlas.spatialTypes.map((type) => ({
        value: type.id,
        label: type.label,
        shape: type.pinShape,
        accent: type.accent,
      })),
    },
    {
      group: "brand",
      legend: "Brand",
      defaultOpen: true,
      options: atlas.brands.map((brand) => ({ value: brand.slug, label: brand.name })),
    },
    {
      group: "tag",
      legend: "Classification",
      hint: "The research lens. A case can carry several.",
      options: atlas.tags.map((tag) => ({ value: tag.id, label: tag.label })),
    },
    {
      group: "event",
      legend: "Event",
      options: atlas.events.map((event) => ({ value: event.slug, label: event.name })),
    },
    {
      group: "country",
      legend: "Country",
      options: atlas.countries.map((country) => ({
        value: country.code,
        label: country.name,
      })),
    },
    {
      group: "city",
      legend: "City",
      options: atlas.cities.map((city) => ({ value: city, label: city })),
    },
  ];

  return (
    <div>
      {/* Intro strip — short, because the map is the argument. */}
      <div className="border-b border-rule">
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:px-5">
          <p className="max-w-[72ch] text-[13.5px] leading-snug text-graphite">
            <span className="label-lg" style={{ color: "var(--ink)" }}>
              Global map ·{" "}
            </span>
            How performance brands use permanent retail, races, pop-ups, launches and
            activations to build performance credibility and cultural meaning.
          </p>
          <p className="label shrink-0" style={{ color: "var(--red)" }}>
            {tally.placeholder} of {atlas.cards.length} cases are placeholder demo data
          </p>
        </div>
      </div>

      <MapExplorer
          cards={atlas.cards}
          groups={groups}
          types={atlas.spatialTypes.map((type) => ({
            id: type.id,
            accent: type.accent,
            pinShape: type.pinShape,
          }))}
          legend={atlas.spatialTypes.map((type) => ({
            id: type.id,
            label: type.label,
            shape: type.pinShape,
            accent: type.accent,
          }))}
        tagLabels={tagLabels()}
      />
    </div>
  );
}
