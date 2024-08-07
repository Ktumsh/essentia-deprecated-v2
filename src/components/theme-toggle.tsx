"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { Button, Tooltip } from "@nextui-org/react";
import { MoonIcon, SunIcon, SystemIcon } from "./icons/icons";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className = "!size-6" }) => {
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

  const handleThemeChange = (newTheme: string) => {
    if (!isSSR) {
      setTheme(newTheme);
    }
  };

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "flex gap-1.5 rounded-full border border-gray-200 dark:border-base-dark"
      )}
    >
      <Tooltip
        content="Sistema"
        delay={800}
        closeDelay={0}
        classNames={{
          content:
            "bg-white dark:bg-base-dark text-xs text-base-color-h dark:text-base-color-dark",
        }}
      >
        <Button
          disableRipple
          isIconOnly
          size="sm"
          radius="full"
          onPress={() => handleThemeChange("system")}
          className={cn(
            "text-base-color-h dark:text-gray-400 bg-transparent min-w-6",
            theme === "system" && "!bg-gray-200 dark:!bg-base-dark",
            className
          )}
        >
          <SystemIcon
            className={cn("size-3", className === "!size-8" && "size-4")}
          />
        </Button>
      </Tooltip>
      <Tooltip
        content="Claro"
        delay={800}
        closeDelay={0}
        classNames={{
          content:
            "bg-white dark:bg-base-dark text-xs text-base-color-h dark:text-base-color-dark",
        }}
      >
        <Button
          disableRipple
          isIconOnly
          size="sm"
          radius="full"
          onPress={() => handleThemeChange("light")}
          className={cn(
            "text-base-color-h dark:text-gray-400 bg-transparent min-w-6",
            theme === "light" && "!bg-gray-200 dark:!bg-base-dark",
            className
          )}
        >
          <SunIcon
            className={cn("size-3", className === "!size-8" && "size-4")}
          />
        </Button>
      </Tooltip>
      <Tooltip
        content="Oscuro"
        delay={800}
        closeDelay={0}
        classNames={{
          content:
            "bg-white dark:bg-base-dark text-xs text-base-color-h dark:text-base-color-dark",
        }}
      >
        <Button
          disableRipple
          isIconOnly
          size="sm"
          radius="full"
          onPress={() => handleThemeChange("dark")}
          className={cn(
            "text-base-color-h dark:text-gray-400 bg-transparent min-w-6",
            theme === "dark" && "!bg-gray-200 dark:!bg-base-dark",
            className
          )}
        >
          <MoonIcon
            className={cn("size-3", className === "!size-8" && "size-4")}
          />
        </Button>
      </Tooltip>
    </div>
  );
};
