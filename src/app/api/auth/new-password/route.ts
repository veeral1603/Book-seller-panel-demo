import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verifyJWT } from "@/lib/jwt";

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const decoded = await verifyJWT(token);

    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const seller = await prisma.seller.findUnique({
      where: {
        id: decoded.sellerId,
      },
    });

    if (!seller) {
      return NextResponse.json(
        {
          success: false,
          message: "Seller not found",
        },
        { status: 404 }
      );
    }
    const { password, newPassword } = await request.json();

    const isValid = await bcrypt.compare(password, seller.password);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 }
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.seller.update({
      where: {
        id: decoded.sellerId,
      },
      data: {
        password: hashedNewPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
