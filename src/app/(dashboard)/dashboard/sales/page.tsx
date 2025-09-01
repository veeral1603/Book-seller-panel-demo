"use client";
import SalesCard from "@/components/SalesCard";
import SalesTable from "@/components/SalesTable";
import Spinner from "@/components/Spinner";
import { CURRENCY } from "@/constants";
import {
  getAverageOrderValue,
  getTotalRevenue,
  getTotalSales,
} from "@/lib/sales";
import { getSalesData } from "@/services/SalesServices";
import { useQuery } from "@tanstack/react-query";
import { IndianRupee } from "lucide-react";
import React from "react";

export default function SalesPage() {
  const { data, isFetching } = useQuery({
    queryKey: ["sales"],
    queryFn: getSalesData,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="container flex flex-col gap-4 md:gap-6">
      {isFetching && <Spinner className="!size-8 !text-black mx-auto" />}
      {!isFetching && data.length === 0 && (
        <p className="text-center text-gray-500">No sales data found.</p>
      )}
      {!isFetching && data.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <SalesCard
              label="Total Revenue"
              icon={<IndianRupee size={16} />}
              value={`${CURRENCY} ${getTotalRevenue(data)}`}
            />

            <SalesCard
              label="Total Sales"
              icon={<IndianRupee size={16} />}
              value={`${getTotalSales(data)} Books`}
            />

            <SalesCard
              label="Average Order Value"
              icon={<IndianRupee size={16} />}
              value={`${CURRENCY} ${getAverageOrderValue(data).toFixed(2)}`}
            />
          </div>

          <div>
            <div className="mt-6">
              <SalesTable sales={data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
