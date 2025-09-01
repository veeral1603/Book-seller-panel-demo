import React from "react";

export default function SalesCard({
  label,
  icon,
  value,
}: {
  label: string;
  icon: React.ReactNode;
  value: string | number;
}) {
  return (
    <div className=" bg-white p-4 rounded-lg   border border-stone-200">
      <header className="flex items-center justify-between gap-3">
        <h4 className="text-base font-medium">{label}</h4>
        <div className="bg-green-100 rounded-lg p-2">{icon}</div>
      </header>
      <div className="mt-2">
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
}
