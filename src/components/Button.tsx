import React from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-black text-white",
  secondary: "bg-stone-200 text-foreground",
};

export default function Button({
  children,
  onClick,
  disabled,
  type,
  variant,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${className} px-4 py-2 text-sm  cursor-pointer disabled:opacity-60 rounded-md flex justify-center items-center gap-2 ${
        variantClasses[variant || "primary"]
      }`}
    >
      {children}
    </button>
  );
}
