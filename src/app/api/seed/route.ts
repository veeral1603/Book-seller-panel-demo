// import { NextResponse, type NextRequest } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { verifyJWT } from "@/lib/jwt";

// export async function GET(request: NextRequest) {
//   try {
//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" });
//     }
//     const decoded = await verifyJWT(token);
//     if (!decoded) {
//       return NextResponse.json({ success: false, message: "Unauthorized" });
//     }

//     const books = await prisma.book.findMany({
//       where: { sellerId: decoded.sellerId },
//     });

//     const salesData = [
//       {
//         quantity: 2,
//         totalPrice: books[0].price * 2,
//         bookId: books[0].id,
//       },
//       {
//         quantity: 1,
//         totalPrice: books[1]?.price ?? 0,
//         bookId: books[1]?.id ?? books[0].id,
//       },
//       {
//         quantity: 3,
//         totalPrice: books[0].price * 3,
//         bookId: books[0].id,
//       },
//       {
//         quantity: 5,
//         totalPrice: books[2]?.price ? books[2].price * 5 : books[0].price * 5,
//         bookId: books[2]?.id ?? books[0].id,
//       },
//     ];

//     for (const sale of salesData) {
//       await prisma.sale.create({
//         data: sale,
//       });
//     }
//     console.log("✅ Sales data seeded successfully!");

//     return NextResponse.json({
//       success: false,
//       message: "Seeded successfully!",
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Some error occurred in seeding data" },
//       { status: 500 }
//     );
//   }
// }
