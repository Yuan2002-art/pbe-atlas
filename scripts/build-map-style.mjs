/* ===========================================================================
   npm run map-style

   Downloads the free basemap style named in data/map-palette.json, repaints
   every layer in the Atlas colours, drops the layers we do not want (points
   of interest, house numbers, road shields) and writes the result to
   public/map/atlas-style.json — which is what the map actually loads.

   Run it once after cloning, and again whenever you change a colour.
   The generated file is committed, so the site does not depend on this
   script at build time.
   =========================================================================== */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const paletteFile = path.join(root, "data", "map-palette.json");
const outFile = path.join(root, "public", "map", "atlas-style.json");

const palette = JSON.parse(fs.readFileSync(paletteFile, "utf8"));
const c = palette.colors;

/* --- 1. Copy the map library's web worker into public/ -------------------

   MapLibre loads a separate worker file and resolves it relative to its own
   bundle, which does not exist as a URL once Next.js has bundled it. Serving
   the worker ourselves from /map/ and pointing the library at it (see
   setWorkerUrl in src/components/map/AtlasMap.tsx) is the standard fix.
   Re-run this script after upgrading maplibre-gl.
   ---------------------------------------------------------------------- */

const WORKER_FILES = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"];
const workerSource = path.join(root, "node_modules", "maplibre-gl", "dist");

fs.mkdirSync(path.join(root, "public", "map"), { recursive: true });
for (const file of WORKER_FILES) {
  const from = path.join(workerSource, file);
  if (!fs.existsSync(from)) {
    console.error(`Missing ${from} — run npm install first.`);
    process.exit(1);
  }
  // The worker imports its shared module relatively ("./maplibre-gl-shared.mjs").
  // Browsers resolve that against the worker's own base URL, which is not
  // /map/ in every case, so pin it to an absolute path.
  const contents = fs
    .readFileSync(from, "utf8")
    .replaceAll('"./maplibre-gl-shared.mjs"', '"/map/maplibre-gl-shared.mjs"')
    .replaceAll("'./maplibre-gl-shared.mjs'", "'/map/maplibre-gl-shared.mjs'");
  fs.writeFileSync(path.join(root, "public", "map", file), contents, "utf8");
}
console.log(`Copied ${WORKER_FILES.length} map worker files into public/map/`);

console.log(`Fetching ${palette.upstreamStyle}`);

const response = await fetch(palette.upstreamStyle);
if (!response.ok) {
  console.error(
    `\nCould not download the basemap style (HTTP ${response.status}).\n` +
      `Check your internet connection, or set a different "upstreamStyle"\n` +
      `in data/map-palette.json.\n`,
  );
  process.exit(1);
}
const style = await response.json();

/* --- helpers ------------------------------------------------------------- */

const has = (id, ...needles) => needles.some((n) => id.includes(n));

const hide = (id) =>
  palette.hideLayerPatterns.some((pattern) => id.toLowerCase().includes(pattern));

/** Replace a paint property only if the layer already had one, so we never
 *  invent properties the upstream style did not use. */
function repaint(layer, property, value) {
  layer.paint = layer.paint ?? {};
  if (property in layer.paint || layer.paint[property] === undefined) {
    layer.paint[property] = value;
  }
}

/* --- repaint ------------------------------------------------------------- */

let kept = 0;
let dropped = 0;

const layers = [];
for (const layer of style.layers) {
  const id = (layer.id ?? "").toLowerCase();

  if (hide(id)) {
    dropped += 1;
    continue;
  }

  switch (layer.type) {
    case "background":
      repaint(layer, "background-color", c.background);
      break;

    case "fill": {
      if (has(id, "water", "ocean", "sea", "lake", "river")) {
        repaint(layer, "fill-color", c.water);
      } else if (has(id, "building")) {
        repaint(layer, "fill-color", c.building);
        repaint(layer, "fill-outline-color", c.buildingOutline);
      } else if (has(id, "park", "wood", "forest", "grass", "pitch", "cemetery")) {
        repaint(layer, "fill-color", c.park);
      } else if (has(id, "landcover", "landuse", "sand", "glacier", "residential")) {
        repaint(layer, "fill-color", c.landcover);
      } else {
        repaint(layer, "fill-color", c.land);
      }
      break;
    }

    case "fill-extrusion":
      repaint(layer, "fill-extrusion-color", c.building);
      break;

    case "line": {
      if (has(id, "waterway", "river", "stream", "canal")) {
        repaint(layer, "line-color", c.waterway);
      } else if (has(id, "boundary")) {
        // Country borders read slightly stronger than internal ones.
        repaint(layer, "line-color", has(id, "_2", "_3", "country") ? c.boundaryCountry : c.boundary);
      } else if (has(id, "railway", "rail", "transit")) {
        repaint(layer, "line-color", c.railway);
      } else if (has(id, "casing")) {
        repaint(layer, "line-color", c.roadCasing);
      } else if (has(id, "motorway", "trunk", "primary")) {
        repaint(layer, "line-color", c.roadMajor);
      } else if (has(id, "road", "street", "path", "track", "bridge", "tunnel", "link")) {
        repaint(layer, "line-color", c.roadMinor);
      } else {
        repaint(layer, "line-color", c.boundary);
      }
      break;
    }

    case "symbol": {
      const water = has(id, "water", "ocean", "sea", "lake");
      const place = has(id, "place", "country", "state", "city", "town");
      repaint(layer, "text-color", water ? c.labelWater : place ? c.labelPlace : c.label);
      repaint(layer, "text-halo-color", c.labelHalo);
      repaint(layer, "text-halo-width", 1.4);
      // Icons would fight with the case pins.
      if (layer.layout) layer.layout["icon-image"] = undefined;
      break;
    }

    default:
      break;
  }

  kept += 1;
  layers.push(layer);
}

style.layers = layers;
style.name = "Atlas — Performance Brand Experience";
style.metadata = {
  ...(style.metadata ?? {}),
  "atlas:generated": new Date().toISOString(),
  "atlas:upstream": palette.upstreamStyle,
  "atlas:note": "Generated by scripts/build-map-style.mjs — edit data/map-palette.json, not this file.",
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(style), "utf8");

const size = (fs.statSync(outFile).size / 1024).toFixed(0);
console.log(`Repainted ${kept} layers, dropped ${dropped}.`);
console.log(`Wrote public/map/atlas-style.json (${size} KB)`);
