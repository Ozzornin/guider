"use client";
import styles from "./page.module.css";
import List from "@/Components/List/List";
import MapGL from "@/Components/Map/MapGL";

import usePlaces from "@/Hooks/usePlaces";
import { Paper } from "@mui/material";
import { useRef } from "react";
import { MapRef } from "react-map-gl";

export default function Home() {
  const { places, setBounds, setPlaceType } = usePlaces();
  const mapRef = useRef<MapRef | null>(null);
  return (
    <div className={styles.main}>
      <Paper className={styles.sidebar}>
        <List places={places} mapRef={mapRef}></List>
      </Paper>
      <div className={styles.map}>
        <MapGL setBounds={setBounds} places={places} mapRef={mapRef}></MapGL>
      </div>
    </div>
  );
}
