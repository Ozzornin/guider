import { LatLngLiteral } from "google-maps-react-markers";
import { Pathway_Gothic_One } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface MarkerProps {
  className?: string;
  draggable: boolean;
  lat: number;
  lng: number;
  markerId: string;
  photoRef: google.maps.places.PlacePhoto[] | undefined;
  onClick?: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    props: { lat: number; lng: number; markerId: string }
  ) => void;
  onDrag?: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    props: { latLng: LatLngLiteral }
  ) => void;
  onDragEnd?: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    props: { latLng: LatLngLiteral }
  ) => void;
  onDragStart?: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    props: { latLng: LatLngLiteral }
  ) => void;
}

export default function Marker({
  className,
  lat,
  lng,
  markerId,
  onClick,
  draggable,
  onDrag,
  onDragEnd,
  onDragStart,
  photoRef,
  ...props
}: MarkerProps) {
  let photo: string | null = null;
  photoRef?.forEach((p) => (photo = p.photo_reference));
  const [img, setImg] = useState<any>();
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/photos", {
          method: "POST",
          headers: {
            "Content-Type": "image/*",
          },
          body: JSON.stringify({ photoRef: photo }),
        });
        const data = await res.blob();
        console.log(data);
        const blob = URL.createObjectURL(data);
        setImg(blob);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();

    // Clean up the blob URL when the component is unmounted
    return () => {
      if (img) {
        URL.revokeObjectURL(img);
      }
    };
  }, [photo, photoRef]);

  return (
    <div>
      🌴
      <img src={img} width={50} alt="image"></img>
    </div>
  );
}
