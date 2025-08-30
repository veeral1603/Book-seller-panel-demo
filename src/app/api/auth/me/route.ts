import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const seller = jwt.verify(token || "", process.env.JWT_SECRET || "");

    return NextResponse.json({ success: true, data: seller });
  } catch (error) {
    console.log("error fetching current user", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
