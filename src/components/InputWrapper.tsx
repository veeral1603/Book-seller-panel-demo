import React from "react";
import FormError from "./FormError";
import { FieldErrors, FieldValues } from "react-hook-form";

export default function InputWrapper({
  children,
  label,
  error,
}: {
  children: React.ReactNode;
  label: string;
  error: FieldValues | FieldErrors | undefined;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">{label}</label>
        {error && <FormError>{String(error?.message)}</FormError>}
      </div>
      <div className="flex items-center gap-2 mt-2 p-2 border border-stone-300 rounded-md focus-within:border-stone-800 transition duration-200">
        {children}
      </div>
    </div>
  );
}
