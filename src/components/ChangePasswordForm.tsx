"use client";
import React from "react";
import InputWrapper from "./InputWrapper";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import Button from "./Button";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/authServices";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export type changePasswordType = {
  password: string;
  newPassword: string;
};

export default function ChangePasswordForm() {
  const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: changePasswordType) => {
      await changePassword(data);
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
      reset();
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast.error("Failed to change password");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<changePasswordType>();

  const onSubmit = (data: changePasswordType) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <header>
          <h5 className="text-lg ">Change Password</h5>
        </header>

        <div className="mt-4 space-y-4">
          <InputWrapper label="Current Password" error={errors.password}>
            <input
              type={isPasswordShown ? "text" : "password"}
              placeholder="Password"
              className="placeholder:text-sm w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />

            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setIsPasswordShown((cur) => !cur)}
            >
              {isPasswordShown ? <EyeClosed size={16} /> : <Eye size={16} />}
            </button>
          </InputWrapper>

          <InputWrapper label="New Password" error={errors.password}>
            <input
              type={isPasswordShown ? "text" : "password"}
              placeholder="Password"
              className="placeholder:text-sm w-full"
              {...register("newPassword", {
                required: "New Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: (value) => {
                  if (value == watch("password")) {
                    toast.error(
                      "New password must be different from current password"
                    );
                    return false;
                  }

                  return true;
                },
              })}
            />

            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setIsPasswordShown((cur) => !cur)}
            >
              {isPasswordShown ? <EyeClosed size={16} /> : <Eye size={16} />}
            </button>
          </InputWrapper>

          <Button className="min-w-30" type="submit">
            {isPending ? (
              <Spinner className="!size-5 mx-auto" />
            ) : (
              "Change Password"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
