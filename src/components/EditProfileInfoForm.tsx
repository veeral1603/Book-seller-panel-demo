"use client";
import React from "react";
import InputWrapper from "./InputWrapper";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Spinner from "./Spinner";
import useUser from "@/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/services/ProfileServices";
import toast from "react-hot-toast";

export type FormData = {
  name?: string;
  email?: string;
};

export default function EditProfileInfoForm({ data }: { data: FormData }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { fetchUser } = useUser();
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      setIsLoading(true);
      await updateProfile(data);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Profile updated successfully");
      fetchUser();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      setIsLoading(false);
      console.error(error.message);
      toast.error("Failed to update profile");
    },
  });

  const initialName = data.name;
  const initialEmail = data.email;

  const onSubmit = (data: FormData) => {
    if (data.name !== initialName || data.email !== initialEmail) {
      mutate(data);
    } else {
      toast.error("No changes made to update");
      return;
    }
  };

  React.useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("email", data.email);
    }
  }, [data, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <header>
          <h5 className="text-lg ">Edit Information</h5>
        </header>

        <div className="mt-4 space-y-4">
          <InputWrapper label="Full Name" error={errors.name}>
            <input
              type="text"
              placeholder="Full Name"
              className="placeholder:text-sm w-full"
              {...register("name", {
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
              })}
            />
          </InputWrapper>
          <InputWrapper label="Email Address" error={errors.email}>
            <input
              type="email"
              placeholder="Email"
              className="placeholder:text-sm w-full"
              {...register("email")}
            />
          </InputWrapper>

          <Button variant="primary" type="submit" className="min-w-30">
            {isLoading ? <Spinner className="!size-5" /> : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
