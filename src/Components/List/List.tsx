import React from "react";
import styles from "./List.module.scss";
export default function List() {
  let arr: Array<Number> = [1, 2, 3, 4, 5, 6];

  return (
    <ul className={styles.list}>
      {arr.map((elem, index) => (
        <li key={index}>1</li>
      ))}
    </ul>
  );
}
