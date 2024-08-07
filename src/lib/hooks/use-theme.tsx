"use client";

import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    if (session) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session]);

  useEffect(() => {
    const handleThemeLoaded = () => {
      setIsThemeLoaded(true);
    };

    if (!isThemeLoaded) {
      handleThemeLoaded();
    }
  }, [isThemeLoaded]);

  return (
    <NextUIProvider locale="es-ES" navigate={router.push}>
      <NextThemesProvider {...props} enableSystem={isAuthenticated}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
