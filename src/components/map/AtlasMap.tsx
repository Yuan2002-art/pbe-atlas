"use client";

import {
  LngLatBounds,
  MapLibreMap,
  Marker,
  NavigationControl,
  ScaleControl,
  setWorkerUrl,
} from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

import type { CaseCard } from "@/lib/card";
import { pinSvg } from "@/lib/pin";
import type { PinShape } from "@/lib/schema";

/** The generated style file. Regenerate it with `npm run map-style` after
 *  editing data/map-palette.json. */
const STYLE_URL = "/map/atlas-style.json";

/** MapLibre looks for its worker next to its own bundle, which does not exist
 *  as a URL after Next.js bundles it. `npm run map-style` copies the worker
 *  into public/map/ and this points the library at it. */
let workerConfigured = false;
function configureWorker() {
  if (workerConfigured) return;
  setWorkerUrl("/map/maplibre-gl-worker.mjs");
  workerConfigured = true;
}

export interface MapTypeStyle {
  id: string;
  accent: string;
  pinShape: PinShape;
}

interface AtlasMapProps {
  /** Every case, so markers are created once and then shown or hidden. */
  cards: CaseCard[];
  /** The slugs currently passing the filters. */
  visible: Set<string>;
  selected: string | null;
  onSelect: (slug: string | null) => void;
  types: MapTypeStyle[];
  /** Changes whenever the filter set changes — the map reframes on a new one. */
  frameKey: string;
  /** A box to frame instead of the pins, [west, south, east, north]. Used when
   *  the filter is asking "where in this country"; null fits the pins. */
  frameBounds: [number, number, number, number] | null;
  className?: string;
}

export function AtlasMap({
  cards,
  visible,
  selected,
  onSelect,
  types,
  frameKey,
  frameBounds,
  className = "",
}: AtlasMapProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapLibreMap | null>(null);
  const markers = useRef(new Map<string, Marker>());
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const lastFrame = useRef("");

  /* --- create the map once ---------------------------------------------- */
  useEffect(() => {
    if (!container.current || map.current) return;
    configureWorker();

    const instance = new MapLibreMap({
      container: container.current,
      style: STYLE_URL,
      center: [6, 38],
      zoom: 1.35,
      minZoom: 1,
      maxZoom: 17,
      attributionControl: { compact: true },
      // A flat map reads like a printed atlas plate.
      dragRotate: false,
      pitchWithRotate: false,
    });

    instance.addControl(new NavigationControl({ showCompass: false }), "bottom-right");
    instance.addControl(new ScaleControl({ unit: "metric" }), "bottom-right");
    instance.on("load", () => setReady(true));
    instance.on("error", (event) => {
      // Map problems are usually network problems. Report the first one
      // instead of leaving an empty rectangle with no explanation.
      const message =
        (event as { error?: { message?: string } })?.error?.message ??
        "unknown map error";
      console.error("[atlas map]", message);
      setFailed((current) => current ?? message);
    });
    // Clicking empty map closes the preview card.
    instance.on("click", () => onSelect(null));

    map.current = instance;

    /* Keep the canvas in step with its box. Without this the map stays at
       whatever size it had when it was created — which breaks on a window
       resize, on a phone rotating, and when the map starts life inside a
       hidden or collapsed panel. */
    const observer = new ResizeObserver(() => instance.resize());
    observer.observe(container.current);

    return () => {
      observer.disconnect();
      markers.current.forEach((marker) => marker.remove());
      markers.current.clear();
      instance.remove();
      map.current = null;
    };
    // onSelect is stable enough for this one-time setup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* --- create one marker per case --------------------------------------- */
  useEffect(() => {
    const instance = map.current;
    if (!instance || !ready) return;

    const accentOf = (id: string) => types.find((t) => t.id === id)?.accent ?? "#16161a";

    for (const card of cards) {
      if (markers.current.has(card.slug)) continue;

      const element = document.createElement("button");
      element.type = "button";
      element.className = "atlas-pin";
      element.setAttribute(
        "aria-label",
        `${card.brandName}, ${card.title}. ${card.spatialTypeSummary} in ${card.city}, ${card.dateLabel}.`,
      );
      element.innerHTML = pinSvg({
        shape: card.pinShape,
        accent: accentOf(card.primarySpatialType),
        status: card.status,
        size: 22,
      });
      element.addEventListener("click", (event) => {
        event.stopPropagation();
        onSelect(card.slug);
      });

      const marker = new Marker({ element, anchor: "center" })
        .setLngLat(card.pinCoordinates)
        .addTo(instance);
      markers.current.set(card.slug, marker);
    }
  }, [cards, ready, types, onSelect]);

  /* --- show or hide markers as the filters change ------------------------ */
  useEffect(() => {
    for (const [slug, marker] of markers.current) {
      const element = marker.getElement();
      const shown = visible.has(slug);
      element.style.display = shown ? "grid" : "none";
      element.tabIndex = shown ? 0 : -1;
      element.classList.toggle("is-selected", slug === selected);
      // Selected pin sits above its neighbours.
      element.style.zIndex = slug === selected ? "3" : "1";
    }
  }, [visible, selected, ready]);

  /* --- reframe when the filter set changes ------------------------------- */
  useEffect(() => {
    const instance = map.current;
    if (!instance || !ready) return;
    /* The frame box is part of the frame's identity, not just the set of pins:
       adding a brand to a country filter can leave the same cases showing and
       still has to reframe, because it stops being a country question. */
    const frameId = `${frameBounds?.join(",") ?? "pins"}::${frameKey}`;
    if (frameId === lastFrame.current) return;
    lastFrame.current = frameId;

    /* Keep the frame clear of the panels floating on top of the map. Once the
       rail and the editions sit over the basemap rather than beside it,
       fitBounds has no idea that the left of its own viewport is covered, and
       it will happily centre a filtered pin underneath the rail. The panels
       only float from the lg breakpoint up, which is also where the map goes
       full-bleed, so the container's own width is the thing to ask. */
    const floating = instance.getContainer().clientWidth >= 1024;
    const padding = floating
      ? { top: 130, right: 100, bottom: 140, left: 340 }
      : { top: 90, right: 90, bottom: 140, left: 90 };

    /* A country filter asks "where in this country", so it frames the country
       and lets the pins fall where they fall. This has to be a box rather than
       a zoom cap: the same zoom shows twice as much land on a wide monitor as
       on a narrow one, so a fixed number would frame France correctly on one
       screen and nowhere else. fitBounds works from the viewport it has. */
    if (frameBounds) {
      const [west, south, east, north] = frameBounds;
      instance.fitBounds(
        new LngLatBounds([west, south], [east, north]),
        { padding, duration: 700 },
      );
      return;
    }

    const shown = cards.filter((card) => visible.has(card.slug));
    if (shown.length === 0) return;

    const bounds = new LngLatBounds();
    for (const card of shown) bounds.extend(card.pinCoordinates);

    /* Otherwise fit as close as the pins allow. The cap used to be zoom 7 for
       any two or more pins, which meant a filter down to one event — five
       spaces inside one valley — framed a third of Europe and stacked the pins
       on top of each other. 14 only stops a pair of near-identical coordinates
       filling the screen; the pins decide the rest. */
    instance.fitBounds(bounds, {
      padding,
      maxZoom: shown.length === 1 ? 11 : 14,
      duration: 700,
    });
  }, [frameKey, cards, visible, ready, frameBounds]);

  /* --- ease to a case chosen from a list -------------------------------- */
  useEffect(() => {
    const instance = map.current;
    if (!instance || !ready || !selected) return;
    const card = cards.find((c) => c.slug === selected);
    if (!card) return;
    instance.easeTo({
      center: card.pinCoordinates,
      duration: 600,
      zoom: Math.max(instance.getZoom(), 5),
    });
  }, [selected, cards, ready]);

  return (
    <div className={`relative ${className}`}>
      {/* Fills its parent by height, not by absolute positioning: MapLibre's
          own stylesheet sets `position: relative` on this element, which
          would defeat `absolute inset-0` and collapse it to zero height. */}
      <div ref={container} className="h-full w-full bg-paper-sunk" />

      {!ready && !failed && (
        <p className="label absolute left-4 top-4 z-10 border border-rule bg-paper px-2 py-1">
          Loading basemap…
        </p>
      )}

      {failed && !ready && (
        <div className="absolute left-4 top-4 z-10 max-w-[38ch] border border-red bg-paper px-3 py-2">
          <p className="label" style={{ color: "var(--red)" }}>
            Basemap unavailable
          </p>
          <p className="mt-1 text-[13px] leading-snug">
            Run <span className="data">npm run map-style</span> to rebuild{" "}
            <span className="data">public/map/atlas-style.json</span>, or check your
            internet connection. The register and all case pages work without it.
          </p>
          <p className="data mt-2 text-[11px] text-pencil">{failed}</p>
        </div>
      )}

      {/* Pin styling lives here so the map component is self-contained. */}
      <style>{`
        .atlas-pin {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          transition: transform 120ms ease;
        }
        .atlas-pin:hover { transform: scale(1.22); }
        .atlas-pin:focus-visible { outline: 2px solid var(--blue); outline-offset: 1px; }
        .atlas-pin.is-selected { transform: scale(1.35); }
        .atlas-pin.is-selected svg { filter: drop-shadow(0 0 0 var(--blue)); }
      `}</style>
    </div>
  );
}
