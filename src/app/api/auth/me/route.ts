import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
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
