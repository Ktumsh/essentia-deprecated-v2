"use client";

import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { Tooltip } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "./icons/icons";
import { cn } from "@/lib/utils";

export interface ThemeSwitchProps {
  className?: string;
  buttonClass?: string;
  spanClass?: string;
}

export const ThemeToggle: FC<ThemeSwitchProps> = ({
  buttonClass = "dark:bg-base-full-dark",
  spanClass = "dark:bg-base-dark",
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isSSR && theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, isSSR]);

  const handleThemeToggle = () => {
    if (!isSSR) {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  // Si el componente aún no está montado, evita renderizarlo
  if (!mounted) return null;

  return (
    <Tooltip
      className="bg-gradient-to-br dark:from-white dark:to-gray-300 from-base-dark to-base-full-dark text-xs dark:text-base-color-h text-base-color-dark-h"
      content={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
      delay={500}
      closeDelay={0}
    >
      <button
        aria-label="Cambiar modo"
        type="button"
        className={clsx(
          `group btn__mode relative inline-flex flex-shrink-0 items-center justify-start w-14 h-8 px-1 text-base-color-h dark:text-gray-400 bg-gray-200 rounded-full overflow-hidden cursor-pointer ${
            theme === "dark" ? "darkmode" : ""
          }`,
          buttonClass
        )}
        onClick={handleThemeToggle}
      >
        <SunIcon
          className={cn(
            "z-0 absolute left-1.5 text-current text-medium transition-transform-opacity",
            `${
              theme !== "dark" ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`
          )}
        />
        <span
          className={cn(
            `flex justify-center items-center size-6 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,.2)] dark:shadow-[0_2px_10px_rgba(0,_0,_0,_0.3)] transition-[margin,_width] z-10 group-active:w-7 ${
              theme === "dark"
                ? "mr-6 group-active:mr-5"
                : "ml-6 group-active:ml-5"
            }`,
            spanClass
          )}
        ></span>
        <MoonIcon
          className={cn(
            "z-0 absolute right-1.5 text-medium opacity-100 transition-transform-opacity",
            `${theme === "dark" ? "opacity-100" : "opacity-0 translate-x-3"}`
          )}
        />
      </button>
    </Tooltip>
  );
};
