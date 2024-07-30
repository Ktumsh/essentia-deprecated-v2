"use client";

import { SearchIcon } from "../icons/icons";

import { CommunityIcon } from "../icons/main";

import AvatarDropdown from "./avatar-dropdown";

import NavbarLinks from "./navbarLinks";

import Image from "next/image";

import { siteConfig } from "@/config/site";

import { usePathname } from "next/navigation";

import { normalizedPathName } from "@/lib/utils";

import { Button, Input, Link, Navbar, NavbarContent } from "@nextui-org/react";

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
              <a
                className="relative hidden sm:block size-10 active:scale-95 transition-transform rounded-full"
                href="/"
                aria-label="Página de inicio"
              >
                <Image
                  className="size-10 block dark:hidden origin-center transition-all ease-in-out"
                  width={1500}
                  height={1500}
                  src="/e-logomark-on-light.webp"
                  alt="Logo de Essentia"
                />
                <Image
                  className="size-10 hidden dark:block origin-center transition-all ease-in-out"
                  width={1500}
                  height={1500}
                  src="/e-logomark-on-dark.webp"
                  alt="Logo de Essentia"
                />
              </a>
              <span className="hidden xl:block font-grotesk text-base-color dark:text-white/95">
                Essentia®️
              </span>
            </div>
            <Input
              classNames={{
                mainWrapper: "h-full w-10 xl:w-full",
                input:
                  "data-[has-start-content=true]:ps-7 text-sm placeholder:text-base-color-d dark:placeholder:text-base-color-dark-d placeholder:opacity-0 xl:placeholder:opacity-100",
                inputWrapper:
                  "h-full text-base-color-h bg-white dark:bg-base-dark-50 data-[hover=true]:bg-black/5 group-data-[focus=true]:bg-white dark:data-[hover=true]:bg-base-dark dark:group-data-[focus=true]:bg-base-dark-50",
              }}
              placeholder="Busca lo que quieras..."
              size="md"
              radius="full"
              isClearable
              startContent={
                <SearchIcon className="absolute ml-[2px] xl:ml-0 left-2 xl:left-3 size-5" />
              }
            />
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
