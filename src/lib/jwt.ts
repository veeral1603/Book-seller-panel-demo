import { JWTType } from "@/types";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createJWT(payloadObj: JWTType) {
  const token = await new SignJWT(payloadObj)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload as JWTType;
  } catch (error) {
    throw error;
  }
}
