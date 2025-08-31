import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/context/userContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Book Seller Panel - Demo",
  description: "A demo application for book sellers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${inter.className} antialiased`}>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
