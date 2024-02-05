"use server";
import Connect from "@/lib/db/connector";
import validator from "validator";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
type props = {
  name: string;
  surname: string;
  password: string;
  email: string;
};
export async function registerUser({ name, surname, password, email }: props) {
  try {
    if (!name || !surname || !password || !email)
      throw new Error("Missing required fields");

    if (!validator.isEmail(email)) throw new Error("Invalid email");

    const conn = await Connect();

    const [results, fields]: any = await conn?.query(
      `SELECT * FROM users where email="${email}"`
    );

    if (!results) throw new Error("User is already exist");
    const hshPassword = await bcrypt.hash(password, 10);
    const resp = await conn?.query(
      `INSERT INTO users (name, surname, password, email) VALUES ("${name}", "${surname}", "${hshPassword}", "${email}")`
    );
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}

import { SignJWT } from "jose";
import { getJwtSecretKey, verifyJwtToken } from "@/lib/auth/jwt";
import { constrainedMemory } from "process";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const conn = await Connect();

    const [results, fields]: any = await conn?.query(
      `SELECT * from users where email="${email}"`
    );
    if (!results) {
      throw new Error("Email doesnt exist");
    }
    console.log(results);
    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) throw new Error("Wrong password");

    const token = await new SignJWT(results[0])
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30s")
      .sign(getJwtSecretKey());
    //const cookies = new Cookies(null, { path: "/" });
    const cookieStore = cookies();
    cookieStore.set("token", token);
    return { success: true };
  } catch (e) {
    return { success: false, error: e };
  }
}

export async function addFavorite({ xid }: { xid: string }) {
  try {
    const conn = await Connect();
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const payload = await verifyJwtToken(token?.value);
    console.log("payload", payload);
  } catch (e) {
    return { success: false, error: e };
  }
}
