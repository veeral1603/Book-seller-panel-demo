import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: true, message: "Unauthorized", data: null },
        { status: 200 }
      );
    }

    const decoded = (await verifyJWT(token)) as {
      sellerId: string;
    };

    const seller = await prisma.seller.findUnique({
      where: { id: decoded.sellerId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: seller });
  } catch (error) {
    console.log("error fetching current user", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
