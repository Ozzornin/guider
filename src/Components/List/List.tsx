import React, { useState, useEffect, MutableRefObject } from "react";
import styles from "./List.module.scss";
import feature from "@/types/OpenTripMap/feature";
import ListItem from "./ListItem";
import { Stack } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { MapRef } from "react-map-gl";

export default function List({
  places,
  mapRef,
}: {
  places: feature[];
  mapRef: MutableRefObject<MapRef | null>;
}) {
  const [offset, setOffset] = useState<number>(0);
  const [ref, inView] = useInView({ triggerOnce: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getNext = () => {
      if (inView) {
        if (places?.length > offset) setOffset((old) => old + 10);
      }
      setIsLoading(false);
    };
    setIsLoading(true);
    setTimeout(getNext, 1000);
  }, [inView]);

  useEffect(() => {
    setOffset(10);
  }, [places]);
  return (
    <Stack
      spacing={1}
      overflow={"auto"}
      height={"90vh"}
      style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
    >
      {places?.slice(0, offset).map((place, index) => {
        return (
          <div
            key={place.properties.xid}
            style={{ flex: "1", minWidth: "300px" }}
          >
            <ListItem
              xid={place.properties.xid}
              timeout={0}
              onClick={() => {
                mapRef.current?.flyTo({
                  maxDuration: 3000,
                  screenSpeed: 0.1,
                  center: place.geometry.coordinates,
                  animate: true,
                  duration: 3000,
                  zoom: 20,
                  essential: true,
                });
              }}
            />
          </div>
        );
      })}
      <div ref={ref} style={{ width: "100%" }}>
        {isLoading ? "Loading..." : "Loaded"}
      </div>
    </Stack>
  );
}
