"use client";

import { usePathname } from "next/navigation";
import React from "react";

const pageheading: Record<string, string> = {
  "/dashboard/listings": "Listings",
  "/dashboard/new-listing": "New Listing",
  "/dashboard/sales": "Sales",
  "/dashboard/profile": "My Profile",
};

export default function PageHeading() {
  const pathname = usePathname();

  return (
    <div className="text-base md:text-lg font-semibold">
      {pageheading[pathname]}
    </div>
  );
}
