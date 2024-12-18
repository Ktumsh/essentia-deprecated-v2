"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "../icons/icons";
import { Button } from "@nextui-org/react";

const ButtonUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout = 0;

    const handleScroll = () => {
      if (!timeout) {
        timeout = requestAnimationFrame(() => {
          const scrollTop =
            document.body.scrollTop || document.documentElement.scrollTop;
          setIsVisible(scrollTop > 20);
          timeout = 0;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeout) {
        cancelAnimationFrame(timeout);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="button-up"
      className={`fixed bottom-16 md:bottom-2 right-2 transition-opacity z-50 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <Button
        id="scroll-to-top"
        aria-label="Volver al inicio de la página"
        disableRipple
        className="group flex items-center justify-center !size-9 min-w-0 px-0 rounded-md shadow-md hover:shadow-lg text-base-color dark:text-base-color-dark data-[hover=true]:text-bittersweet-400 bg-white dark:bg-base-dark dark:data-[hover=true]:bg-base-full-dark border border-gray-200 dark:border-white/10 data-[hover=true]:border-bittersweet-400 data-[hover=true]:scale-105 data-[hover=true]:!opacity-100 motion-safe:transition transition cursor-pointer"
        onClick={scrollToTop}
      >
        <div className="dark:bg-noise dark:bg-repeat dark:bg-[length:100px] pointer-events-none absolute inset-0 z-10 dark:opacity-[0.06]"></div>
        <ArrowUpIcon className="size-4 rotate-0 md:rotate-45 group-data-[hover=true]:rotate-0 transition-transform" />
      </Button>
    </div>
  );
};

export default ButtonUp;
