"use client";
import React from "react";
import SidebarMenu from "./SidebarMenu";
import Image from "next/image";
import { X } from "lucide-react";
import Button from "./Button";
import { useNavbar } from "@/hooks/useNavbar";

export default function SidebarContent() {
  const { closeNavbar } = useNavbar();
  return (
    <>
      <div className="p-3.5 md:px-2 md:py-3.5 lg:px-3 lg:py-4 border-b border-stone-200 flr flex items-center justify-between">
        <Image
          className="md:hidden lg:block"
          src={"/logo.webp"}
          alt="logo"
          width={200}
          height={30}
        />

        <Button className="md:hidden" variant="unstyled" onClick={closeNavbar}>
          <X size={20} />
        </Button>

        <span className="font-bold text-xl hidden md:block lg:hidden">Dbm</span>
      </div>

      <div className="p-3.5 md:px-2 md:py-3.5 lg:px-3 lg:py-4">
        <SidebarMenu />
      </div>
    </>
  );
}
