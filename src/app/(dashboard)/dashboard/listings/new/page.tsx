import ListingForm from "@/components/ListingForm";
import { Plus } from "lucide-react";
import React from "react";

export default function NewListingPage() {
  return (
    <div className="container flex flex-col gap-4 md:gap-6">
      <div className="bg-white border border-stone-200 p-4 md:p-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-md bg-green-200 p-2">
              <Plus size={20} />
            </div>
            <div>
              <h3 className="text-xl font-medium">Create new listing</h3>
              <p className="text-stone-500 text-xs">
                Create new listings for your shop!
              </p>
            </div>
          </div>
        </header>

        <div className="mt-7">
          <ListingForm />
        </div>
      </div>
    </div>
  );
}
