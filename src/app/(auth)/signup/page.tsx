"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import InputWrapper from "@/components/InputWrapper";
import { Eye, EyeClosed } from "lucide-react";
import { SignupType } from "@/types";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { signup } from "@/services/authServices";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupType>();

  const onSubmit = async (data: SignupType) => {
    try {
      setLoading(true);

      const result = await signup(data);

      if (result.success) {
        toast.success(result.message);
        router.replace("/dashboard");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false);

  const password = watch("password");

  return (
    <div className="h-full">
      <div className="p-4 md:p-6 rounded-md shadow-sm bg-white border border-stone-200 flex items-center flex-col  min-w-sm ">
        <div className="text-center text-2xl font-medium">
          <h2>Create an Account</h2>
        </div>

        <div className="mt-6 w-full">
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputWrapper label="Full Name" error={errors.name}>
              <input
                type="text"
                placeholder="Full Name"
                className="placeholder:text-sm w-full"
                {...register("name", {
                  required: "Full name is required",
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
                {...register("email", { required: "Email is required" })}
              />
            </InputWrapper>

            <InputWrapper label="Password" error={errors.password}>
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

            <InputWrapper
              label="Confirm Password"
              error={errors.confirmPassword}
            >
              <input
                type={isPasswordShown ? "text" : "password"}
                placeholder="Confirm Password"
                className="placeholder:text-sm w-full"
                {...register("confirmPassword", {
                  required: "Password confirmation is required",
                  validate: (val) => val === password || "Passwords must match",
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Spinner /> : "Sign Up"}
            </Button>

            <div className="text-sm ">
              <p>
                Already have an account?{" "}
                <Link className="font-medium" href="/login">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
