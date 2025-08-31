"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IndianRupee, ListCheck, Plus, User } from "lucide-react";

const menuItems = [
  {
    label: "My Listings",
    href: "/dashboard/listings",
    icon: <ListCheck size={20} />,
  },
  {
    label: "New Listing",
    href: "/dashboard/listings/new",
    icon: <Plus size={20} />,
  },
  { label: "Sales", href: "/dashboard/sales", icon: <IndianRupee size={20} /> },
  { label: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
];

export default function SidebarMenu() {
  const pathName = usePathname();
  return (
    <ul className="flex flex-col text-sm space-y-2">
      {menuItems.map((item) => (
        <li
          key={item.href}
          className={` transition duration-300 rounded-sm  ${
            pathName === item.href
              ? "bg-black text-white font-medium"
              : "hover:bg-stone-50"
          }`}
        >
          <Link
            href={item.href}
            className="flex items-center md:justify-center lg:justify-start gap-2 p-3 "
          >
            <div className="">{item.icon}</div>
            <p className="md:hidden lg:block">{item.label}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
