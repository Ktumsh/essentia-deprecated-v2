"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import MenuButton from "./menu-button";
import MobileMenu from "./mobile-menu";
import useBodySwipeable from "@/lib/hooks/use-body-swipeable";
import { $ } from "@/lib/dom-selector";

interface MobileHeaderProps {
  session: any;
}

const MobileHeader = ({ session }: MobileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bodyRef = useRef<HTMLElement | null>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      $("body")?.classList.toggle("overflow-hidden", newState);
      return newState;
    });
  }, []);

  const handleSwipedLeft = useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      $("body")?.classList.add("overflow-hidden");
    }
  }, [isMenuOpen]);

  const handleSwipedRight = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      $("body")?.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  const swipeHandlers = useBodySwipeable(handleSwipedLeft, handleSwipedRight);

  useEffect(() => {
    bodyRef.current = document.querySelector("body");

    const handleSwipe = (event: Event) => {
      if (event instanceof TouchEvent || event instanceof MouseEvent) {
        if (event.type === "touchstart" || event.type === "mousedown") {
          swipeHandlers.ref(event.target as HTMLElement);
        }
      }
    };

    if (bodyRef.current) {
      bodyRef.current.addEventListener("touchstart", handleSwipe);
      bodyRef.current.addEventListener("mousedown", handleSwipe);
    }

    return () => {
      if (bodyRef.current) {
        bodyRef.current.removeEventListener("touchstart", handleSwipe);
        bodyRef.current.removeEventListener("mousedown", handleSwipe);
      }
    };
  }, [swipeHandlers]);

  return (
    <>
      <Navbar
        shouldHideOnScroll
        classNames={{
          base: "fixed md:hidden bg-white dark:bg-base-dark shadow-md overflow-hidden",
          wrapper: "h-14",
        }}
      >
        <Link
          className="relative size-8 active:scale-95 transition-transform rounded-full"
          href="/"
          aria-label="Página de inicio"
        >
          <Image
            className="size-8 dark:hidden origin-center transition-all ease-in-out"
            width={32}
            height={32}
            src="/e-logomark-on-light.webp"
            alt="Logo de Essentia"
          />
          <Image
            className="size-8 hidden dark:block origin-center transition-all ease-in-out"
            width={32}
            height={32}
            src="/e-logomark-on-dark.webp"
            alt="Logo de Essentia"
          />
        </Link>
        <MenuButton
          sessionImage={session?.user?.image}
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </Navbar>
      <MobileMenu isMenuOpen={isMenuOpen} session={session} />
      <div
        data-overlay-container={isMenuOpen}
        aria-hidden={true}
        onClick={() => toggleMenu()}
        className={`fixed inset-0 size-full min-h-dvh bg-black/80 transition-opacity lg:hidden z-[60] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
    </>
  );
};

export default MobileHeader;
