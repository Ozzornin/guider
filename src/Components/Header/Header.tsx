"use client";

import React from "react";
import styles from "./header.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Cultural Guider</h1>
      <div className={styles.nav}>
        <Link href={"/login"}>Log in</Link>
      </div>
    </header>
  );
}
