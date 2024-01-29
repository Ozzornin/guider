import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(req: NextRequest) {
  const { photoRef } = await req.json();
  // const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
  // `;
  try {
    const res = await fetch(photoRef, {
      method: "GET",
      headers: {
        "Content-Type": "image/png",
      },
    });
    const headers = new Headers();
    headers.set("Content-Type", "image/*");
    const data = await res.blob();
    const imgURL = URL.createObjectURL(data);
    console.log(imgURL);
    return new NextResponse(data, { status: 200, statusText: "OK", headers });
  } catch (e) {
    console.log(photoRef);
    return NextResponse.json("failed to fetch data");
  }
}
