"use client";
import { Menu } from "lucide-react";
import React from "react";
import Button from "./Button";
import ProfileComponent from "./ProfileComponent";
import PageHeading from "./PageHeading";
import { useNavbar } from "@/hooks/useNavbar";

export default function Header() {
  const { toggleNavbar } = useNavbar();
  return (
    <div className="px-4 py-2.5 border-b border-stone-200 flex items-center justify-between">
      {/* Mobile Header Items  */}
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Button variant="unstyled" onClick={toggleNavbar}>
            <Menu strokeWidth={2} size={20} />
          </Button>
        </div>
        <PageHeading />
      </div>

      <ProfileComponent />
    </div>
  );
}
