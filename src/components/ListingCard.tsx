import { ListingType } from "@/types";
import React from "react";

type ListingCardProps = {
  book: ListingType;
};

export default function ListingCard({ book }: ListingCardProps) {
  return (
    <article className="mb-6 rounded-2xl bg-white  ring-1 ring-black/5 overflow-hidden cursor-pointer group hover:shadow-sm transition-shadow duration-300">
      {/* card Image */}
      <div className="h-64 md:h-70 lg:h-86 overflow-hidden">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full  object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          loading="lazy"
        />
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h2 className="text-base font-semibold truncate">{book.title}</h2>
        <p className="mt-1 text-sm text-neutral-700">
          ₹{book.price.toFixed(2)}
        </p>
        <p
          className={`mt-1 text-xs ${
            book.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {book.stock > 0 ? `In Stock: ${book.stock}` : "Out of Stock"}
        </p>

        {/* Actions */}
        {/* <div className="mt-4 flex gap-2">
          <button className="px-3 py-1.5 rounded-xl bg-black text-white text-xs">
            Add to Cart
          </button>
          <button className="px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-900 text-xs ring-1 ring-black/5">
            Save
          </button>
        </div> */}
      </div>
    </article>
  );
}
