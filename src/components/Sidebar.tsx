import React from "react";
import SidebarContent from "./SidebarContent";
import MobileSidebar from "./MobileSidebar";

export default function Sidebar() {
  return (
    <>
      {/* Mobile Sidebar  */}
      <MobileSidebar />

      <div className="border-r border-stone-200 hidden bg-white md:block">
        <SidebarContent />
      </div>
    </>
  );
}
