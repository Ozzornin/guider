import { kMaxLength } from "buffer";
import { LngLatBounds } from "mapbox-gl";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log(1);
  const { bounds, placeTypes }: { bounds: LngLatBounds; placeTypes: String[] } =
    await req.json();
  const placeTypes1 = ["architecture", "cultural", "historic"];
  try {
    const baseUrl = "https://api.opentripmap.com/0.1/en/places/bbox";
    const params = `&lon_min=${bounds._sw?.lng}&lat_min=${
      bounds._sw?.lat
    }&lon_max=${bounds._ne.lng}&lat_max=${
      bounds._ne.lat
    }&kinds=${placeTypes1.join(",")}&lan=en`;
    const url = `${baseUrl}?apikey=${process.env.NEXT_PUBLIC_OTM_API_KEY}${params}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return NextResponse.json(data.features);
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.error();
  }
}
