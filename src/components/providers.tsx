"use client";

import * as React from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider } from "@/lib/hooks/use-theme";
import SessionProviderComponent from "@/lib/hooks/use-session";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProviderComponent>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </SessionProviderComponent>
  );
}
