"use client";

import Image from "next/image";
import styles from "./page.module.css";
//import Map from "@/Components/Map/Map";
import List from "@/Components/List/List";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import Bounds from "@/types/bounds";
import NewMap from "@/Components/Map/Map";
import Marker from "@/Components/Map/Marker";
import { LatLngBounds } from "google-maps-react-markers";
import MapGL from "@/Components/Map/MapGL";

export default function Home() {
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [bounds, setBounds] = useState(null);
  async function handleMapChange(
    bounds: LatLngBounds,
    center: GoogleMapReact.Coords
  ) {
    const baseUrl = "http://localhost:3000/api/places";
    const requestBody = {
      location: center,
      bounds: {
        ne: {
          lat: bounds.getNorthEast().lat(),
          lng: bounds.getNorthEast().lng(),
        },
        sw: {
          lat: bounds.getSouthWest().lat(),
          lng: bounds.getSouthWest().lng(),
        },
      },
      type: "tourist_attraction",
    };
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    setPlaces(data.results);
  }
  const position = {
    lat: 50.0165804,
    lng: 29.0192741,
  };

  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <List places={places}></List>
      </div>
      <div className={styles.map}>
        <MapGL></MapGL>
      </div>
    </div>
  );
}
