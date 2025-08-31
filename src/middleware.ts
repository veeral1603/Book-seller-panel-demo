import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicRoutes = ["/login", "/signup", "/"];

  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (path === "/") {
    if (token) return NextResponse.redirect(new URL("/dashboard", req.url));
    else return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token && !publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token) {
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!payload.sellerId && !publicRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (payload.sellerId && publicRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/dashboard/listings", req.url));
    }

    if (path === "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard/listings", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "Some thing went wrong" });
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
