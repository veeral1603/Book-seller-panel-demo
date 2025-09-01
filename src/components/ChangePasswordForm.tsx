"use client";
import React from "react";
import InputWrapper from "./InputWrapper";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import Button from "./Button";

export default function ChangePasswordForm() {
  const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form>
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

          <Button type="submit">Change Password</Button>
        </div>
      </div>
    </form>
  );
}
