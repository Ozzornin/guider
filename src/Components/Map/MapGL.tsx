"use client";
import React from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapGL() {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        zoom: 14,
        longitude: 29.02477139489581,
        latitude: 50.017812214010206,
      }}
      mapStyle="mapbox://styles/matt-coop/clrp7tgqf008z01pefpxjeplm"
    >
      <Marker
        latitude={50.017812214010206}
        longitude={29.02477139489581}
        draggable={false}
      >
        <p>🌴</p>
      </Marker>
    </Map>
  );
}
