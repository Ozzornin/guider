"use client";
import React, { Dispatch, MutableRefObject, useRef, useState } from "react";
import {
  LngLatBounds,
  Map,
  MapRef,
  Marker,
  ViewStateChangeEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import feature from "@/types/OpenTripMap/feature";
import styles from "./map.module.scss";
import useSupercluster from "use-supercluster";
import { height } from "@mui/system";
import pin from "@/app/location-pin.svg";
import { Badge } from "@mui/material";
import Image from "next/image";

export default function MapGL({
  initCoords,
  setBounds,
  places,
}: {
  initCoords: any;
  setBounds: Dispatch<LngLatBounds>;
  places: feature[];
}) {
  const mapRef = useRef<MapRef | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(17);
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;
  const points = places
    ? places.map((place) => ({
        type: "Feature",
        properties: {
          cluster: false,
          placeId: place.properties.xid,
          placeName: place.properties.name,
        },
        geometry: { type: "Point", coordinates: place.geometry.coordinates },
      }))
    : [];

  const handleMoveEnd = (e: ViewStateChangeEvent) => {
    const bounds: LngLatBounds = e.target.getBounds();
    setMapZoom(e.target.getZoom());
    if (e.viewState.zoom > 10)
      setBounds((old: LngLatBounds) => {
        // return bounds;
        if (
          old._sw.lat < bounds._sw.lat &&
          old._sw.lng < bounds._sw.lng &&
          old._ne.lat > bounds._ne.lat &&
          old._ne.lng > bounds._ne.lng
        )
          return old;
        else return bounds;
      });
  };

  const { clusters, supercluster } = useSupercluster({
    points,
    // zoom: mapRef?.current?.getZoom() as number,
    zoom: mapZoom,
    bounds,
    options: { radius: 75, maxZoom: 20 },
  });
  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        zoom: mapZoom,
        longitude: initCoords.lng,
        latitude: initCoords.lat,
      }}
      maxZoom={20}
      minZoom={10}
      mapStyle="mapbox://styles/matt-coop/clrp7tgqf008z01pefpxjeplm"
      onLoad={(e) => setBounds(e.target.getBounds())}
      onMoveEnd={handleMoveEnd}
    >
      {clusters?.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={cluster.properties.placeId}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                className={styles.customCluster}
                style={{
                  width: `${(5 + (20 * pointCount) / places?.length) * 10}px`,
                  height: `${(5 + (20 * pointCount) / places?.length) * 10}px`,
                }}
                // onClick={() => {
                //   const id = Number(cluster.id);
                //   const zoomInto = Math.min(
                //     Number(supercluster?.getClusterExpansionZoom(id)),
                //     20
                //   );
                //   mapRef.current?.zoomIn();
                // }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={cluster.properties.placeId}
            latitude={latitude}
            longitude={longitude}
            draggable={false}
          >
            <div className={styles.customMarker}>
              <p>
                {cluster.properties.placeName}
                <b>({cluster.properties.placeId})</b>
              </p>
            </div>
          </Marker>
        );
      })}
    </Map>
  );
}
