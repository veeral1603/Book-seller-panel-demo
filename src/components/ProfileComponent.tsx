"use client";
import React from "react";
import useUser from "@/hooks/useUser";
import { ChevronDown, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { logout } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfileComponent() {
  const { loading, user, fetchUser } = useUser();
  const [dropDownOpen, setDropdownOpen] = React.useState<boolean>(false);
  const [loggingOut, setLoggingOut] = React.useState<boolean>(false);

  const queryClient = useQueryClient();

  const router = useRouter();

  const dropdownRef = React.useRef<null | HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropdownOpen]);

  const onClickLogout = async () => {
    try {
      setLoggingOut(true);

      const result = await logout();

      if (result.success) {
        toast.success(result.message);
        queryClient.clear();
        router.replace("/login");
        fetchUser();
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div
      className="min-w-30  text-sm h-10 p-1 flex items-center justify-center relative cursor-pointer gap-4 hover:bg-stone-50 transition duration-300 rounded-md"
      onClick={() => setDropdownOpen((cur) => !cur)}
      ref={toggleRef}
    >
      {loading && (
        <div className="bg-stone-100 animate-pulse h-full w-full rounded-md" />
      )}

      {!loading && user && (
        <>
          <div className="text-sm flex items-center justify-between gap-3">
            <div className="size-8 rounded-full  border border-stone-200 text-stone-400 font-medium flex items-center justify-center text-lg">
              {user?.name.slice(0, 1)}
            </div>
            <p>{user?.name}</p>

            <ChevronDown className="text-stone-600" strokeWidth={3} size={14} />
          </div>

          <AnimatePresence>
            {dropDownOpen && (
              <motion.div
                className="w-70  bg-white border border-stone-200 absolute top-full right-0 shadow-md mt-2 cursor-default divide-y divide-stone-200 rounded-md overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, type: "spring" }}
                onClick={(e) => e.stopPropagation()}
                ref={dropdownRef}
              >
                <div className="p-3 flex items-center gap-4">
                  <div className="size-12 rounded-full  border border-stone-200 text-stone-400 font-medium flex items-center justify-center text-xl">
                    {user?.name.slice(0, 1)}
                  </div>

                  <div>
                    <h4 className="text-[15px]">{user?.name}</h4>
                    <p className="text-xs text-stone-500">{user?.email}</p>
                  </div>
                </div>

                <div className="p-3 text-sm text-stone-700">
                  <p>
                    User since: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <button
                    className="flex items-center gap-2 p-3 hover:bg-stone-100 transition duration-300 cursor-pointer w-full"
                    onClick={onClickLogout}
                  >
                    {loggingOut ? (
                      <Spinner className="!text-black !size-5 mx-auto" />
                    ) : (
                      <>
                        <LogOut size={18} />
                        <p>Log out</p>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
