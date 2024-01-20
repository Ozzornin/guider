"use client";

import Image from "next/image";
import styles from "./page.module.css";
//import Map from "@/Components/Map/Map";
import List from "@/Components/List/List";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import Bounds from "@/types/bounds";
import NewMap from "@/Components/Map/NewMap";
export default function Home() {
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [bounds, setBounds] = useState(null);
  async function handleMapChange(
    bounds: Bounds,
    center: GoogleMapReact.Coords
  ) {
    const baseUrl = "http://localhost:3000/api/places";
    const requestBody = {
      location: center,
      bounds: bounds,
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
    // if (data.next_page_token) {
    //   setTimeout(async () => {
    //     const response = await fetch(baseUrl, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ nextPageToken: data.next_page_token }),
    //     });
    //     const newData = await response.json();
    //     setPlaces((prevPlaces) => [...prevPlaces, ...newData.results]);
    //   }, 3000);
    //}
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
        <NewMap></NewMap>
      </div>
    </div>
  );
}
