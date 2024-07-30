"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  AvatarIcon,
  HelpIcon,
  LogoutIcon,
  SettingsIcon,
  ThemeIcon,
} from "../icons/icons";
import { CommunityIcon } from "../icons/main";
import { Avatar } from "@nextui-org/react";
import { ThemeToggle } from "../theme-toggle";
import { MOBILE_MENU_CONTENT_ID } from "@/consts/mobile-menu";
import { getFirstNameAndLastName } from "@/lib/utils";
import { Session } from "next-auth";

interface Props {
  isMenuOpen: boolean;
  session: Session | null;
}

const MobileMenu = ({ isMenuOpen, session }: Props) => {
  const normalizeName = getFirstNameAndLastName(session?.user?.name);
  const hasUsername = session?.user?.username
    ? `@${session.user.username}`
    : session?.user?.email;

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
              <hr className="border-none h-5" />
              <hr className="h-5 border-t-0 border-b-1 border-gray-200 dark:border-base-dark" />
              <hr className="h-5 border-none" />
              <div className="subMenu group">
                <a
                  href="/comunidad"
                  className="relative flex items-center w-full py-3 font-medium"
                  aria-label="Comunidad"
                >
                  <CommunityIcon className="mr-3" width="24" height="24" />
                  Comunidad
                </a>
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
