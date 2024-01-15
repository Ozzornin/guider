import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { bounds, type, location } = await req.json();
  console.log(bounds);

  try {
    const { sw, nw } = bounds;
    const { lat, lng } = location;
    const baseUrl =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

    const requestBody = {
      location: `${lat},${lng}`,
      bounds: `${sw.lat},${sw.lng},${nw.lat},${nw.lng}`,
      type: type,
      radius: "20000",
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
    const tex = response.url;
    console.log(tex);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.error();
  }

  //return NextResponse.error();
}
