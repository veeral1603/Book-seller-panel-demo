import React from "react";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={`animate-spin inline-block size-6 border-3  aspect-square border-current border-t-transparent text-white rounded-full ${className}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
