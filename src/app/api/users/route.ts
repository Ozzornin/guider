import { NextRequest, NextResponse } from "next/server";
import Connect from "../../../lib/db/connector";

export async function GET(req: NextRequest) {
  const conn = await Connect();
  if (!conn) return NextResponse.json("Error with connecting to the database");

  try {
    const [results, fields] = await conn.query("SELECT * FROM users");
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json(e);
  }
}
