import Connect from "@/lib/db/connector";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { name, surname, password, email } = await req.json();

    if (!name || !surname || !password || !email)
      return new NextResponse("Missing required fields", { status: 400 });

    if (!validator.isEmail(email))
      return new NextResponse("Invalid email", { status: 400 });

    const conn = await Connect();

    const [results, fields]: any = await conn?.query(
      `SELECT * FROM users where email="${email}"`
    );

    if (!results)
      return new NextResponse("User is already exist", { status: 400 });
    const hshPassword = await bcrypt.hash(password, 10);
    const resp = await conn?.query(
      `INSERT INTO users (name, surname, password, email) VALUES ("${name}", "${surname}", "${hshPassword}", "${email}")`
    );
    return new NextResponse("Success", { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
