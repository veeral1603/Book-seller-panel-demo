"use client";
import ListingCard from "@/components/ListingCard";
import Spinner from "@/components/Spinner";
import { getListings } from "@/services/ListingService";
import { ListingType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function ListingsPage() {
  const { isFetching, data } = useQuery<ListingType[]>({
    queryKey: ["listings"],
    queryFn: getListings,
    staleTime: 1000 * 60 * 5,
  });

  console.log(data);

  return (
    <div className="container flex flex-col gap-4 md:gap-6">
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
