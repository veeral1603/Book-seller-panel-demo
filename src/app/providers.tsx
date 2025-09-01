"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/context/userContext";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </UserProvider>
  );
}
