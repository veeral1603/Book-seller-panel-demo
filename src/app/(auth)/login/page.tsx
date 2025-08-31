"use client";

import InputWrapper from "@/components/InputWrapper";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginType } from "@/types";
import toast from "react-hot-toast";
import { login } from "@/services/authServices";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useUser from "@/hooks/useUser";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { fetchUser } = useUser();

  const router = useRouter();

  const onSubmit = async (data: LoginType) => {
    try {
      setLoading(true);
      const result = await login(data);

      if (result.success) {
        toast.success(result.message);
        router.replace("/dashboard/listings");
        fetchUser();
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      toast.error((error as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <div className="p-4 md:p-6 rounded-md shadow-sm bg-white border border-stone-200 flex items-center flex-col  min-w-sm ">
        <div>
          <Image src={"/logo.webp"} alt="logo" width={200} height={30} />
        </div>
        <div className="text-center text-2xl font-medium mt-2">
          <h2>Login to seller panel</h2>
        </div>

        <div className="mt-6 w-full">
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              {loading ? <Spinner className="!size-5" /> : "Login"}
            </Button>

            <div className="text-sm ">
              <p>
                Don&apos;t have an account?{" "}
                <Link className="font-medium" href="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
