"use client";

import styles from "./page.module.css";
import List from "@/Components/List/List";
import MapGL from "@/Components/Map/MapGL";
import usePlaces from "@/Hooks/usePlaces";
import { Paper } from "@mui/material";

export default function Home() {
  const { places, setBounds, setPlaceType } = usePlaces();
  return (
    <div className={styles.main}>
      <Paper className={styles.sidebar}>
        <List places={places}></List>
      </Paper>
      <div className={styles.map}>
        <MapGL
          initCoords={{ lat: 50.017812214010206, lng: 29.02477139489581 }}
          setBounds={setBounds}
          places={places}
        ></MapGL>
      </div>
    </div>
  );
}
