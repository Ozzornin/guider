import React from "react";
import styles from "./List.module.scss";

export default function List({ places }: { places: any | null }) {
  return (
    <>
      <ul>
        {places?.map((place) => (
          <li key={place?.properties.xid}>
            <h1>{place?.properties.name}</h1>
          </li>
        ))}
      </ul>
    </>
  );
}
