import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" grid h-screen grid-cols-1 overflow-hidden  md:grid-cols-[4rem_1fr] lg:grid-cols-[16rem_1fr]">
      <Sidebar />

      <div className="relative flex max-h-screen flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <main className="font-poppins h-full px-4 py-4 md:p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
