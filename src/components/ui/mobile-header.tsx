"use client";

import { useState } from "react";

import { Navbar } from "@nextui-org/react";

import Image from "next/image";
import Link from "next/link";

import MenuButton from "./menu-button";
import MobileMenu from "./mobile-menu";

import SwipeableContainer from "../swipeable-container";

import { $ } from "@/lib/dom-selector";

const MobileHeader = ({ session }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    $("body")?.classList.toggle("overflow-hidden", !isMenuOpen);
  };
  return (
    <SwipeableContainer
      onSwipedLeft={() => {
        setIsMenuOpen(true);
        $("body")?.classList.add("overflow-hidden");
      }}
      onSwipedRight={() => {
        setIsMenuOpen(false);
        $("body")?.classList.remove("overflow-hidden");
      }}
      isMenuOpen={isMenuOpen}
    >
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
        className={`fixed inset-0 w-full h-full min-h-dvh bg-black/80 transition-opacity lg:hidden z-40 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
    </SwipeableContainer>
  );
};

export default MobileHeader;
