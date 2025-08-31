"use client";

import { getCurrentUser } from "@/services/authServices";
import React from "react";

type UserType = {
  createdAt: Date;
  id: string;
  email: string;
  name: string;
};

type UserContextType = {
  user: UserType | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
};

export const UserContext = React.createContext<UserContextType>({
  user: null,
  loading: true,
  fetchUser: async () => Promise.resolve(),
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<UserType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const result = await getCurrentUser();

      if (result.success) {
        setUser(result.data);
      } else {
        console.error("Failed to fetch user:", result.error);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
