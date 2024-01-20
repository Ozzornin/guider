import React from "react";
import styles from "./List.module.scss";

export default function List({
  places,
}: {
  places: google.maps.places.PlaceResult[];
}) {
  return (
    <ul className={styles.list}>
      {places.map((place) => (
        <li key={place.place_id}>
          {place.name} {place.vicinity}
        </li>
      ))}
    </ul>
  );
}
