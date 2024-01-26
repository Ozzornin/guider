import { jwtVerify } from "jose";

export function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not provided");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string | Uint8Array) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (e) {
    return null;
  }
}
