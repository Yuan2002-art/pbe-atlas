import { MapExplorer } from "@/components/map/MapExplorer";
import type { FilterGroupDef } from "@/components/filters/FilterRail";
import { getAtlas, tagLabels } from "@/lib/queries";

export default function HomePage() {
  const atlas = getAtlas();

  /* The filter rail is built from the data, not hard-coded: add a spatial
     type or a tag to data/vocab/ and it appears here automatically. */
  /* Rail order, top to bottom: who, then what form, then where — brand, spatial
     type, event, country. Classification and city follow because they are the
     ones you reach for last. */
  const groups: FilterGroupDef[] = [
    {
      group: "brand",
      legend: "Brand",
      defaultOpen: true,
      options: atlas.brands.map((brand) => ({ value: brand.slug, label: brand.name })),
    },
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
      group: "tag",
      legend: "Classification",
      hint: "The research lens. A case can carry several.",
      options: atlas.tags.map((tag) => ({ value: tag.id, label: tag.label })),
    },
    {
      group: "city",
      legend: "City",
      options: atlas.cities.map((city) => ({ value: city, label: city })),
    },
  ];

  return (
    <div>
      {/* Intro strip — one line, because the map is the argument. The
          placeholder count used to sit here in red; the per-record status
          badges carry that instead. */}
      <div className="border-b border-rule">
        <div className="px-4 py-3 sm:px-5">
          <p className="text-[13.5px] leading-snug text-graphite">
            <span className="label-lg" style={{ color: "var(--ink)" }}>
              Global map ·{" "}
            </span>
            How performance brands use permanent retail, races, pop-ups, launches and
            activations to build performance credibility and cultural meaning.
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
        countryBounds={atlas.countryBounds}
      />
    </div>
  );
}
