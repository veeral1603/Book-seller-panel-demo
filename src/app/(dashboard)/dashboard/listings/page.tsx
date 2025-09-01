"use client";
import Button from "@/components/Button";
import ListingCard from "@/components/ListingCard";
import Spinner from "@/components/Spinner";
import { getListings } from "@/services/ListingService";
import { ListingType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ListingsPage() {
  const { isFetching, data } = useQuery<ListingType[]>({
    queryKey: ["listings"],
    queryFn: getListings,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="container flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between w-full">
        <Link href="/dashboard/listings/new">
          <Button>
            <Plus size={20} />
            <p>New Listing</p>
          </Button>
        </Link>
      </div>
      {isFetching && <Spinner className="!text-black mx-auto !size-8" />}
      {!isFetching && data && data.length === 0 && <p>No listings found.</p>}
      {!isFetching && data && data.length > 0 && (
        <div className="gap-4 md:gap-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {data &&
            data.map((book) => <ListingCard key={book.title} book={book} />)}
        </div>
      )}
    </div>
  );
}
