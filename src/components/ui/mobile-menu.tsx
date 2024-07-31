"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  AvatarIcon,
  Chevron,
  HelpIcon,
  LogoutIcon,
  SettingsIcon,
  ThemeIcon,
} from "../icons/icons";
import { CommunityIcon } from "../icons/main";
import {
  Avatar,
  Button,
  Divider,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { ThemeToggle } from "../theme-toggle";
import { MOBILE_MENU_CONTENT_ID } from "@/consts/mobile-menu";
import { cn, getFirstNameAndLastName } from "@/lib/utils";
import { Session } from "next-auth";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  isMenuOpen: boolean;
  session: Session | null;
}

const MobileMenu = ({ isMenuOpen, session }: Props) => {
  const [currentPath, setCurrentPath] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const normalizeName = getFirstNameAndLastName(session?.user?.name);
  const hasUsername = session?.user?.username
    ? `@${session.user.username}`
    : session?.user?.email;

  const resourceLinks = siteConfig.asideMenuLinks;

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <>
      {/* Mobile Menu */}
      <div
        id={MOBILE_MENU_CONTENT_ID}
        role="menu"
        className={`fixed inset-y-0 right-0 z-[999] flex w-screen max-w-[310px] h-full flex-col items-center overflow-x-auto bg-white dark:bg-base-full-dark lg:hidden px-8 no-scroll ${
          isMenuOpen ? "open" : ""
        }`}
      >
        <nav
          className={`size-full transition-opacity ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col justify-between size-full max-h-dvh">
            <div className="flex flex-col w-full text-base-color-h dark:text-base-color-dark-h">
              <div className="flex w-full h-auto py-5 border-b-1 border-gray-200 dark:border-base-dark">
                <div className="inline-flex flex-col items-start justify-center gap-2">
                  {session?.user?.image ? (
                    <a href="#" aria-label="Perfil de usuario">
                      <Image
                        className="size-8 rounded-full"
                        width={96}
                        height={96}
                        src={session?.user?.image}
                        alt="Avatar del usuario"
                      />
                    </a>
                  ) : (
                    <a
                      className="relative flex justify-center items-center overflow-hidden align-middle size-8 z-0 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 active:brightness-90 active:scale-95 transition-[filter,_transform] duration-100"
                      href="#"
                    >
                      <Avatar
                        showFallback
                        src="https://images.unsplash.com/broken"
                        size="sm"
                        icon={<AvatarIcon />}
                        classNames={{
                          icon: "text-base-color-m size-[80%]",
                        }}
                      />
                    </a>
                  )}
                  <a
                    className="inline-flex flex-col items-start active:bg-gray-200 dark:active:bg-base-dark transition-colors duration-100"
                    href="#"
                  >
                    <span className="font-medium text-inherit transition-none capitalize">
                      {normalizeName || "Usuario"}
                    </span>
                    <span className="text-sm text-base-color-m dark:text-base-color-dark-d transition-none">
                      {hasUsername}
                    </span>
                  </a>
                </div>
              </div>
              <div className="group flex mt-5">
                <Button
                  variant="light"
                  radius="none"
                  disableRipple
                  fullWidth
                  endContent={
                    <Chevron
                      className={cn(
                        isOpen ? "rotate-90" : "-rotate-90",
                        "size-6 transition-transform"
                      )}
                    />
                  }
                  className={cn(
                    isOpen
                      ? "text-black dark:text-white"
                      : "text-base-color-h dark:text-base-color-dark-h",
                    "justify-between px-0 text-base font-medium bg-transparent data-[hover=true]:bg-transparent data-[pressed=true]:scale-100"
                  )}
                  onPress={() => setIsOpen(!isOpen)}
                >
                  Recursos
                </Button>
              </div>
              <div
                className={cn(
                  isOpen ? "h-[268px] opacity-100" : "h-0 opacity-0",
                  "overflow-hidden transition-all"
                )}
              >
                <Listbox
                  classNames={{
                    base: "px-0 pt-3",
                    list: "gap-3",
                  }}
                >
                  {resourceLinks.map((link) => (
                    <ListboxItem
                      key={link.name}
                      href={link.link}
                      variant="light"
                      startContent={
                        <link.icon
                          className={`size-5 transition-colors ${
                            currentPath === link.link
                              ? "text-bittersweet-400 dark:text-cerise-red-400"
                              : "text-base-color-h dark:text-base-color-dark"
                          }`}
                        />
                      }
                      classNames={{
                        base: "px-0",
                      }}
                      className={
                        currentPath === link.link
                          ? "text-bittersweet-400 dark:text-cerise-red-400"
                          : "text-base-color-h dark:text-base-color-dark-h"
                      }
                    >
                      {link.name}
                    </ListboxItem>
                  ))}
                </Listbox>
              </div>
              <Divider className="mt-5 bg-gray-200 dark:bg-base-dark" />
              <div className="group mt-5">
                <Button
                  as={Link}
                  href="/comunidad"
                  aria-label="Comunidad"
                  variant="solid"
                  radius="none"
                  startContent={<CommunityIcon className="size-5" />}
                  className="justify-start px-0 text-base font-medium bg-transparent text-base-color-h dark:text-base-color-dark-h"
                >
                  Comunidad
                </Button>
              </div>
            </div>
            <footer className="flex flex-col w-full text-base-color-m dark:text-base-color-dark-m">
              <a
                className="relative flex items-center w-full py-5 text-sm"
                href=""
              >
                <SettingsIcon className="mr-3 size-[14px]" />
                Configuración
              </a>
              <a
                className="relative flex items-center w-full py-5 text-sm"
                href=""
              >
                <HelpIcon className="mr-3 size-[14px]" />
                Centro de Ayuda
              </a>
              <div className="w-full flex items-center justify-between py-3">
                <div className="flex flex-row items-center">
                  <ThemeIcon className="mr-3 size-[14px]" />
                  <span className="text-sm">Tema</span>
                </div>
                <ThemeToggle
                  buttonClass="dark:bg-base-dark"
                  spanClass="dark:bg-base-full-dark"
                />
              </div>
              {session ? (
                <button
                  id="logout"
                  className="relative flex items-center w-full py-5 text-sm font-medium text-bittersweet-400 dark:text-cerise-red-600"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogoutIcon className="mr-3 size-[14px]" />
                  Cerrar sesión
                </button>
              ) : null}
            </footer>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
