"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button, Tooltip } from "@nextui-org/react";
import { MoonIcon, SunIcon, SystemIcon } from "./icons/icons";
import { cn } from "@/lib/utils";
import { tooltipStyles } from "@/styles/tooltip-styles";

type Theme = "light" | "dark" | "system";

export const ThemeToggle = ({ className = "!size-6" }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

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
        classNames={{ content: tooltipStyles.content }}
      >
        <Button
          aria-label="Modo sistema"
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
            aria-hidden="true"
            className={cn("size-3", className === "!size-8" && "size-4")}
          />
        </Button>
      </Tooltip>
      <Tooltip
        content="Claro"
        delay={800}
        closeDelay={0}
        classNames={{ content: tooltipStyles.content }}
      >
        <Button
          aria-label="Modo claro"
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
            aria-hidden="true"
            className={cn("size-3", className === "!size-8" && "size-4")}
          />
        </Button>
      </Tooltip>
      <Tooltip
        content="Oscuro"
        delay={800}
        closeDelay={0}
        classNames={{ content: tooltipStyles.content }}
      >
        <Button
          aria-label="Modo oscuro"
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
            aria-hidden="true"
            className={cn("size-3", className === "!size-8" && "size-4")}
          />
        </Button>
      </Tooltip>
    </div>
  );
};
