// "use client";

// import React, { useState } from "react";
// import GoogleMapReact, { Coords } from "google-map-react";
// import GoogleMap from "google-maps-react-markers";
// import styles from "./map.module.scss";
// import Bounds from "@/types/bounds";

// export default function Map({
//   handleMapChange,
//   places,
//   children,
// }: {
//   handleMapChange: (bounds: Bounds, center: GoogleMapReact.Coords) => void;
//   places: google.maps.places.PlaceResult[];
//   children: any;
// }) {
//   const [zoom, setZoom] = useState(14);
//   const [center, setCenter] = useState({
//     lat: 50.0165804,
//     lng: 29.0192741,
//   });

//   const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
//   // places?.map((place) => {
//   //   console.log(place.geometry?.location);
//   // });
//   console.log(places);
//   return (
//     <GoogleMap
//       style={{ position: "relative", width: "100%", height: "100%" }}
//       //bootstrapURLKeys={{ key: key }}
//       apiKey={key};
//       defaultCenter={{
//         lat: 50.0165804,
//         lng: 29.0192741,
//       }}
//       //center={center}
//       defaultZoom={14}
//       //zoom={zoom}
//       //margin={[50, 50, 50, 50]}
//       options={undefined}
//       //resetBoundsOnResize={true}
//       // onChange={(e) => {
//       //   if (e.zoom >= 13) handleMapChange(e.bounds, e.center);
//       //   setZoom(e.zoom);
//       //   setCenter(e.center);
//       // }}
//       //onChange={(e) => console.log(e)}
//       //onChildClick={undefined}
//     >
//       {children}
//     </GoogleMap>
//   );
// }
