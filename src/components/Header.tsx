import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import ProfileComponent from "./ProfileComponent";
import PageHeading from "./PageHeading";

export default function Header() {
  return (
    <div className="px-4 py-2.5 border-b border-stone-200 flex items-center justify-between">
      {/* Mobile Header Items  */}
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Button variant="unstyled">
            <Menu strokeWidth={2} size={20} />
          </Button>
        </div>
        <PageHeading />
      </div>

      <ProfileComponent />
    </div>
  );
}
