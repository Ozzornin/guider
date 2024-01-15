"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Map from "@/Components/Map/Map";
import List from "@/Components/List/List";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import Bounds from "@/types/bounds";

export default function Home() {
  const [places, setPlaces] = useState(null);
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
    console.log(1);
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    //setPlaces(data);
    console.log(data);
  }

  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <List></List>
      </div>
      <div className={styles.map}>
        <Map handleMapChange={handleMapChange}></Map>
      </div>
    </div>
  );
}
