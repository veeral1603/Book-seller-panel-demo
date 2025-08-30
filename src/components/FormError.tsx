import React from "react";

export default function FormError({
  children,
}: {
  children: undefined | string;
}) {
  return <div className="text-red-500 text-xs ">{children}</div>;
}
