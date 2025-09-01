"use client";
import React from "react";
import InputWrapper from "./InputWrapper";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Image from "next/image";
import { ListingType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListing } from "@/services/ListingService";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export default function ListingForm() {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm<ListingType>();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ListingType) => createListing(data),
    onSuccess: () => {
      toast.success("Listing created successfully.");
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      reset();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const imageUrl = watch("imageUrl");

  const onSubmit = (data: ListingType) => {
    mutate({ ...data, stock: Number(data.stock), price: Number(data.price) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div>
          <header>
            <h5 className="text-lg ">General Information</h5>
          </header>

          <div className="mt-4 space-y-4">
            <InputWrapper label="Book Title" error={errors.title}>
              <input
                type="text"
                placeholder="Book Title"
                className="w-full"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 4,
                    message: "Title must be at least 4 characters long",
                  },
                })}
              />
            </InputWrapper>

            <InputWrapper label="Book Description" error={errors.description}>
              <textarea
                placeholder="Book Description"
                className="w-full"
                rows={6}
                {...register("description", {
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long",
                  },
                })}
              />
            </InputWrapper>
          </div>
        </div>

        <div className="row-span-2">
          <header>
            <h5 className="text-lg ">Upload Image</h5>
          </header>

          <div className="mt-4 space-y-4">
            <InputWrapper label="Image URL" error={errors.imageUrl}>
              <input
                type="url"
                placeholder="Image URL"
                className="w-full"
                {...register("imageUrl", {
                  required: "Image URL is required",
                  minLength: {
                    value: 4,
                    message: "Image URL must be at least 4 characters long",
                  },
                })}
              />
            </InputWrapper>

            <div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Image Preview</label>
              </div>
              <div className="mt-2">
                {imageUrl && (
                  <img
                    src={imageUrl.trim()}
                    alt="Preview"
                    style={{
                      objectFit: "contain", // or "cover" depending on your preference
                    }}
                    className="h-[300px] w-auto"
                  />
                )}
                {!imageUrl && (
                  <Image
                    src="/image-placeholder.jpg"
                    alt="Preview"
                    width={170}
                    height={300}
                    style={{
                      height: "300px",
                      width: "auto", // keeps aspect ratio
                      objectFit: "contain", // or "cover" depending on your preference
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <header>
            <h5 className="text-lg ">Pricing and Stock</h5>
          </header>

          <div className="mt-4 space-y-4">
            <InputWrapper label="Price (₹) " error={errors.price}>
              <input
                type="number"
                placeholder="Price"
                className="w-full"
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 0,
                    message: "Price must be a positive number",
                  },
                })}
              />
            </InputWrapper>

            <InputWrapper label="Stock" error={errors.stock}>
              <input
                type="number"
                placeholder="Stock"
                className="w-full"
                {...register("stock", {
                  required: "Stock is required",
                  min: {
                    value: 0,
                    message: "Stock must be a positive number",
                  },
                })}
              />
            </InputWrapper>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6">
        <Button type="submit" className="min-w-30">
          {isPending ? <Spinner className="!size-5" /> : "Create Listing"}
        </Button>
      </div>
    </form>
  );
}
