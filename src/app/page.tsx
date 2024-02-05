"use client";
import styles from "./page.module.css";
import List from "@/Components/List/List";
import MapGL from "@/Components/Map/MapGL";

import usePlaces from "@/Hooks/usePlaces";
import { addFavorite } from "@/server/actions";
import { Paper } from "@mui/material";
import { useRef } from "react";
import { MapRef } from "react-map-gl";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { places, setBounds, setPlaceType } = usePlaces();
  const { data, error } = useQuery({
    queryKey: ["addFavorite"],
    queryFn: () => addFavorite({ xid: "123213321" }),
  });

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
