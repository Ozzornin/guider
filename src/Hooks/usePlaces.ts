import { LngLatBounds } from "mapbox-gl";
import { useEffect, useState } from "react";

export default function usePlaces() {
  const [places, setPlaces] = useState<any>();
  const [bounds, setBounds] = useState<LngLatBounds>();
  const [placeType, setPlaceType] = useState<String[]>([]);

  useEffect(() => {
    async function getPlaces(bounds: any, placeTypes: String[] | undefined) {
      const baseUrl = "http://localhost:3000/api/places";
      const requestBody = {
        bounds: bounds,
        placeTypes: placeTypes,
      };
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const data = await response.json();
        setPlaces(data);
      } else console.log("Failed to fetch the data from api/places");
    }
    getPlaces(bounds, placeType);
  }, [bounds, placeType]);
  return { places, setBounds, setPlaceType };
}
