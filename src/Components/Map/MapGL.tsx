"use client";
import React, { Dispatch, MutableRefObject, useRef } from "react";
import { LngLatBounds, Map, MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import feature from "@/types/OpenTripMap/feature";

export default function MapGL({
  initCoords,
  setBounds,
  places,
}: {
  initCoords: any;
  setBounds: Dispatch<LngLatBounds>;
  places: feature[];
}) {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        zoom: 14,
        longitude: initCoords.lng,
        latitude: initCoords.lat,
      }}
      mapStyle="mapbox://styles/matt-coop/clrp7tgqf008z01pefpxjeplm"
      onMoveEnd={(e) => {
        const bounds: LngLatBounds = e.target.getBounds();
        if (e.viewState.zoom > 14)
          setBounds((old: LngLatBounds) => {
            if (
              old._sw.lat < bounds._sw.lat &&
              old._sw.lng < bounds._sw.lng &&
              old._ne.lat > bounds._ne.lat &&
              old._ne.lng > bounds._ne.lng
            )
              return old;
            else return bounds;
          });
      }}
    >
      {places?.map((place) => (
        <Marker
          key={place.properties.xid}
          latitude={place.geometry.coordinates[1]}
          longitude={place.geometry.coordinates[0]}
          draggable={false}
        >
          <p>{place.properties.name}</p>
          <div>🌴</div>
        </Marker>
      ))}
    </Map>
  );
}
