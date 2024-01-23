"use client";

import React, { ReactElement, useRef, useState } from "react";
import GoogleMap, { LatLngBounds } from "google-maps-react-markers";

import Marker from "./Marker";
import Bounds from "@/types/bounds";
import { Coords } from "google-map-react";

export default function NewMap({
  children,
  handleMapChange,
}: {
  children: React.ReactNode;
  handleMapChange: (bounds: LatLngBounds, center: Coords) => void;
}) {
  return (
    <>
      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        defaultCenter={{ lat: 50.017812214010206, lng: 29.02477139489581 }}
        defaultZoom={14}
        options={undefined}
        mapMinHeight="90vh"
        onChange={(map) => {
          if (map.zoom > 13)
            handleMapChange(map.bounds, {
              lat: map.center[0],
              lng: map.center[1],
            } as Coords);
        }}
      >
        {children}
      </GoogleMap>
    </>
  );
}
