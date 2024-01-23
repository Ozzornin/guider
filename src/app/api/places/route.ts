import { kMaxLength } from "buffer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { bounds, type, location, nextPageToken } = await req.json();

  if (nextPageToken) {
    const nextPageData = await fetchNextPage(nextPageToken);
    return NextResponse.json(nextPageData);
  }

  try {
    const { ne, sw } = bounds;
    console.log(bounds);
    console.log(location);
    const { lat, lng } = location;
    const baseUrl =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

    const requestBody = {
      location: `${lng},${lat}`,
      bounds: `${ne.lat},${ne.lng},${sw.lat},${sw.lng}`,
      type: type,
      radius: "200",
    };
    const params = `&location=${requestBody.location}&radius=20000&bounds=${requestBody.bounds}&type=${type}`;
    const url = `${baseUrl}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}${params}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.error();
  }
}

async function fetchNextPage(token: string) {
  const baseUrl =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  const url = `${baseUrl}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&pagetoken=${token}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
