import { RecentEditions } from "@/components/event/RecentEditions";
import { MapExplorer } from "@/components/map/MapExplorer";
import type { FilterGroupDef } from "@/components/filters/FilterRail";
import { getAtlas, recentEditions, tagLabels } from "@/lib/queries";

export default function HomePage() {
  const atlas = getAtlas();

  /* The filter rail is built from the data, not hard-coded: add a spatial
     type or a tag to data/vocab/ and it appears here automatically. */
  /* Rail order, top to bottom: who, then what form, then where — brand, spatial
     type, event, country, city. Classification sits last: it is the research
     lens rather than a property of the space, and it is the one you reach for
     only once you already know what you are looking at. */
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
      group: "city",
      legend: "City",
      options: atlas.cities.map((city) => ({ value: city, label: city })),
    },
    {
      group: "tag",
      legend: "Classification",
      hint: "The research lens. A case can carry several.",
      options: atlas.tags.map((tag) => ({ value: tag.id, label: tag.label })),
    },
  ];

  /* No intro strip and no editions band any more. The description moved into
     the header, where it reads as the Atlas's standing line rather than a
     caption on the map, and the editions float over the map instead of sitting
     in a slab above it. Both changes give the map the whole area under the
     header. */
  return (
    <div>
      <MapExplorer
        hero={
          <RecentEditions
            editions={recentEditions()}
            countryBounds={atlas.countryBounds}
          />
        }
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
