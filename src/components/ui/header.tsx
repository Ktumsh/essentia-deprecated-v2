"use client";

import { SearchIcon } from "../icons/icons";

import { CommunityIcon } from "../icons/main";

import AvatarDropdown from "./avatar-dropdown";

import NavbarLinks from "./navbarLinks";

import Image from "next/image";

import { siteConfig } from "@/config/site";

import { usePathname } from "next/navigation";

import { normalizedPathName } from "@/lib/utils";

import { Button, Input, Navbar, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import MainSearch from "../main-search";

const Header = ({ session }: any) => {
  const pathname = usePathname();

  const normalizedPath = normalizedPathName(pathname);

  const pages = siteConfig.navLinks.map((page) => ({
    ...page,
    active: normalizedPath === page.href,
  }));

  return (
    <>
      <div role="banner" className="z-[100] fixed top-0 w-full hidden md:block">
        <Navbar
          maxWidth="sm"
          classNames={{
            base: "bg-white/80 dark:bg-base-full-dark-80",
            wrapper: "h-14 justify-center",
          }}
        >
          <NavbarContent justify="center">
            <NavbarLinks pages={pages} />
          </NavbarContent>
        </Navbar>
        <div className="z-40 fixed top-0 left-0">
          <div className="flex items-center justify-center w-full px-4 h-14 gap-5">
            <div className="flex items-center gap-2 w-fit">
              <Link
                className="relative hidden sm:block size-10 active:scale-95 transition-transform rounded-full"
                href="/"
                aria-label="Página de inicio"
              >
                <Image
                  className="size-10 block dark:hidden origin-center transition-all ease-in-out"
                  width={40}
                  height={40}
                  src="/e-logomark-on-light.webp"
                  alt="Logo de Essentia"
                />
                <Image
                  className="size-10 hidden dark:block origin-center transition-all ease-in-out"
                  width={40}
                  height={40}
                  src="/e-logomark-on-dark.webp"
                  alt="Logo de Essentia"
                />
              </Link>
              <Link
                href="/"
                className="hidden xl:block font-grotesk text-base-color dark:text-white/95"
              >
                Essentia®️
              </Link>
            </div>
            <MainSearch />
          </div>
        </div>
        <div className="z-40 fixed top-0 right-0">
          <div className="flex justify-center items-center size-full text-sm font-normal text-gray-500 dark:text-base-color-dark-h ">
            <Button
              as={Link}
              href="/comunidad"
              fullWidth
              color="danger"
              endContent={<CommunityIcon className="xl:ml-2 size-4" />}
              className="mr-5 px-0 lg:px-4 min-w-10 rounded-full lg:rounded-xl"
            >
              <span className="hidden lg:block">Comunidad</span>
            </Button>
            <div
              role="separator"
              className="h-14 border-r border-gray-200 dark:border-base-full-dark"
            ></div>
            <div className="flex items-center justify-center h-full px-6">
              <AvatarDropdown session={session} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
