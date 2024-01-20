"use client";

import React, { useRef, useState } from "react";
import GoogleMap from "google-maps-react-markers";
import Marker from "./Marker";

export default function NewMap() {
  return (
    <>
      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
        defaultZoom={5}
        options={undefined}
        mapMinHeight="100vh"
        onChange={(map) => console.log("Map moved", map)}
      >
        <Marker
          draggable={false}
          lat={45.4046987}
          lng={12.2472504}
          markerId="1"
        />
      </GoogleMap>
    </>
  );
}
