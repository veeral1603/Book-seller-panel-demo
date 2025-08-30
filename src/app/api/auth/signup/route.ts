import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!JWT_SECRET) throw new Error();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingSeller = await prisma.seller.findUnique({
      where: {
        email,
      },
    });

    if (existingSeller) {
      return NextResponse.json(
        { message: "Seller already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = await prisma.seller.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });

    const token = jwt.sign(
      { sellerId: seller.id, sellerEmail: seller.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const res = NextResponse.json(
      {
        success: true,
        message: "Signed Up successfully!",
        data: seller,
      },
      { status: 200 }
    );

    res.cookies.set("token", token, { httpOnly: true });

    return res;
  } catch (error) {
    console.error("Error signing up seller:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
