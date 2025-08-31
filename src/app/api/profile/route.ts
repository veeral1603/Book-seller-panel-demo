import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const seller = await verifyJWT(token);

    if (!seller)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    return NextResponse.json({ success: true, data: seller }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
