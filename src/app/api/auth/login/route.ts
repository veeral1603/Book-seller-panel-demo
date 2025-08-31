import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createJWT } from "@/lib/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const seller = await prisma.seller.findUnique({
      where: { email },
    });

    if (!seller) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, seller.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const token = await createJWT({
      sellerId: seller.id,
      sellerEmail: seller.email,
      sellerName: seller.name,
    });

    const res = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully!",
        data: { sellerId: seller.id, sellerEmail: seller.email },
      },
      { status: 200 }
    );

    res.cookies.set("token", token, { httpOnly: true });

    return res;
  } catch (error) {
    console.log("login error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
