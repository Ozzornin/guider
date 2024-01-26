import Connect from "@/lib/db/connector";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, password } = data;
    const conn = await Connect();

    const [results, fields]: any = await conn?.query(
      `SELECT * from users where email="${email}"`
    );

    if (!results) {
      return new NextResponse("Email doesnt exist", { status: 400 });
    }
    console.log(results);
    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) return new NextResponse("Wrong password");

    const token = await new SignJWT(results[0])
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30s")
      .sign(getJwtSecretKey());

    const res = NextResponse.json(
      { success: true },
      { status: 200, headers: { "content-type": "application/json" } }
    );
    res.cookies.set({
      name: "token",
      value: token,
      path: "/",
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}
