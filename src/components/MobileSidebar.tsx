"use client";
import React from "react";
import SidebarContent from "./SidebarContent";
import { useNavbar } from "@/hooks/useNavbar";

export default function MobileSidebar() {
  const { isOpen, closeNavbar } = useNavbar();
  return (
    <>
      <div
        className={`border-r border-stone-200 fixed inset-y-0 z-10 w-76 bg-white md:hidden ${
          isOpen ? "left-0" : "-left-100"
        } transition-all duration-300`}
      >
        <SidebarContent />
      </div>

      <div
        className={`bg-black/50 md:hidden fixed z-9 backdrop-blur-xs inset-0 transition ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={closeNavbar}
      />
    </>
  );
}
