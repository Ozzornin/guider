import React from "react";
import styles from "./List.module.scss";
import feature from "@/types/OpenTripMap/feature";
import ListItem from "./ListItem";
import { Stack } from "@mui/material";

export default function List({ places }: { places: feature[] | null }) {
  const reqTimeout = 200;
  return (
    <Stack
      spacing={1}
      overflow={"auto"}
      height={"90vh"}
      style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
    >
      {places?.map((place, index) => (
        <div
          key={place.properties.xid}
          style={{ flex: "1", minWidth: "300px" }}
        >
          <ListItem xid={place.properties.xid} timeout={index * reqTimeout} />
        </div>
      ))}
    </Stack>
  );
}
{
  /* <ListItem key={place.id} xid={place.properties.xid}></ListItem>) */
}
