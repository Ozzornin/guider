import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(req: NextRequest) {
  const { xid } = await req.json();
  const url = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${process.env.NEXT_PUBLIC_OTM_API_KEY}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json("failed to fetch data");
  }
}
