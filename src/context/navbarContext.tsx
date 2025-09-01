// NavbarContext.tsx
import { createContext, useState, ReactNode } from "react";

type NavbarContextType = {
  isOpen: boolean;
  toggleNavbar: () => void;
  openNavbar: () => void;
  closeNavbar: () => void;
};

export const NavbarContext = createContext<NavbarContextType | undefined>(
  undefined
);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen((prev) => !prev);
  const openNavbar = () => setIsOpen(true);
  const closeNavbar = () => setIsOpen(false);

  return (
    <NavbarContext.Provider
      value={{ isOpen, toggleNavbar, openNavbar, closeNavbar }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

// Custom hook
