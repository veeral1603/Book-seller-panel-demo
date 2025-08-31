import Image from "next/image";
import React from "react";

export default function Sidebar() {
  return (
    <div className="border-r border-stone-200 hidden md:block">
      <div className="p-3.5 md:px-2 md:py-3.5 lg:px-3 lg:py-4 border-b border-stone-200 flr">
        <Image
          className="md:hidden lg:block"
          src={"/logo.webp"}
          alt="logo"
          width={200}
          height={30}
        />

        <span className="font-bold text-xl hidden md:block lg:hidden">Dbm</span>
      </div>
    </div>
  );
}
