"use client";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import EditProfileInfoForm from "@/components/EditProfileInfoForm";
import Spinner from "@/components/Spinner";
import { getProfile } from "@/services/ProfileServices";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import React from "react";

export default function ProfilePage() {
  const { data, isFetching } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 60 * 1000,
  });

  return (
    <div className="container flex flex-col gap-4 md:gap-6">
      <div className="bg-white border border-stone-200 p-4 md:p-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-md bg-green-200 p-2">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-xl font-medium">Seller Profile</h3>
              <p className="text-stone-500 text-xs">
                Manage your details and profile here!
              </p>
            </div>
          </div>
        </header>

        <div className="mt-7 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          {isFetching && (
            <Spinner className="mx-auto !size-8 !text-black col-span-2" />
          )}
          {data && !isFetching && (
            <>
              <EditProfileInfoForm data={data} />

              <ChangePasswordForm />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
