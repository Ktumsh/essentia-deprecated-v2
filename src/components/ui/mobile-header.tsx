"use client";

import { Navbar } from "@nextui-org/react";
import Image from "next/image";
import MenuButton from "./menu-button";
import MobileMenu from "./mobile-menu";

import { useEffect, useRef, useState } from "react";

const MobileHeaderTop = ({ session }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const touchMargin = 50;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    document.body.classList.toggle("overflow-hidden");
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startX.current;
    const deltaY = touch.clientY - startY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (
        startX.current > window.innerWidth - touchMargin &&
        deltaX < 0 &&
        !isOpen
      ) {
        toggleMenu();
      } else if (deltaX > 0 && isOpen) {
        toggleMenu();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
  }, [isOpen]);
  return (
    <>
      <Navbar
        shouldHideOnScroll
        classNames={{
          base: "fixed md:hidden bg-white dark:bg-base-dark shadow-md overflow-hidden",
          wrapper: "h-14",
        }}
      >
        <a
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
        </a>
        <MenuButton
          sessionImage={session?.user?.image}
          isOpen={isOpen}
          toggleMenu={toggleMenu}
        />
      </Navbar>
      <MobileMenu isMenuOpen={isOpen} session={session} />
      <div
        data-overlay-container={isOpen}
        aria-hidden={true}
        onClick={() => toggleMenu()}
        className={`fixed inset-0 w-full h-full min-h-dvh bg-overlay/50 transition-opacity lg:hidden z-50 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
    </>
  );
};

export default MobileHeaderTop;
