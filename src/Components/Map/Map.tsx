"use client";

import React from "react";
import GoogleMapReact from "google-map-react";
import styles from "./map.module.scss";
import Bounds from "@/types/bounds";

export default function Map({
  handleMapChange,
}: {
  handleMapChange: (bounds: Bounds, center: GoogleMapReact.Coords) => void;
}) {
  const coords = {
    lat: 40.2233,
    lng: -20.44453,
  };

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  return (
    <GoogleMapReact
      style={{ position: "relative", width: "100%", height: "100%" }}
      bootstrapURLKeys={{ key: key }}
      defaultCenter={coords}
      center={coords}
      defaultZoom={2}
      margin={[50, 50, 50, 50]}
      options={undefined}
      onChange={(e) => handleMapChange(e.bounds, e.center)}
      onChildClick={undefined}
    ></GoogleMapReact>
  );
}
