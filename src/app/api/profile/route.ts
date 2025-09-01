import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const decoded = await verifyJWT(token);

    if (!decoded)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const seller = await prisma.seller.findUnique({
      where: { id: decoded.sellerId },
    });

    if (!seller) {
      return NextResponse.json(
        { success: false, message: "Seller not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          email: seller.email,
          name: seller.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

    const body = await request.json();

    const updatedInformation = { ...body };

    const updatedSeller = await prisma.seller.update({
      where: {
        id: seller.sellerId,
      },
      data: updatedInformation,
    });

    return NextResponse.json(
      { success: true, data: updatedSeller },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
