import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { LogoutIcon, AvatarIcon } from "../icons/icons";
import { ThemeToggle } from "../theme-toggle";
import Image from "next/image";
import { getFirstNameAndLastName, usernameOrEmail } from "@/lib/utils";

export default function AvatarDropdown({ session }: any) {
  const lastname = session?.user?.lastname || "";
  const normalizeName = getFirstNameAndLastName(session?.user?.name);
  const username = session?.user?.username || normalizeName;
  const hasUsernameOrEmail = usernameOrEmail(session);
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        shouldBlockScroll={false}
        classNames={{
          content:
            "p-1 bg-gradient-to-br from-white to-gray-100 dark:from-base-dark dark:to-base-full-dark border border-gray-200 dark:border-base-dark rounded-xl",
        }}
        placement="bottom-end"
      >
        <DropdownTrigger>
          <button
            className="size-8 focus:outline-none ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[rgb(6,_27,_55)] ring-gray-200 dark:ring-midnight-900/30 rounded-full overflow-hidden"
            aria-label="Perfil de usuario"
          >
            {session?.user?.image ? (
              <Image
                width={96}
                height={96}
                src={session?.user?.image}
                alt="Avatar del usuario"
              />
            ) : (
              <Avatar
                showFallback
                src="https://images.unsplash.com/broken"
                size="sm"
                icon={<AvatarIcon />}
                classNames={{
                  icon: "text-base-color-m dark:text-base-color-dark-m size-[80%]",
                  base: "bg-gray-300 dark:bg-gray-600",
                  name: "font-medium text-base-color-h dark:text-base-color-dark-h",
                }}
              />
            )}
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Acciones del perfil" variant="flat">
          <DropdownItem
            key="profile"
            textValue="Perfil"
            href={`/profile/${username}`}
            className="h-14 gap-2 rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
          >
            <p className="font-medium dark:text-base-color-dark">
              {`${normalizeName} ${lastname}`}
            </p>
            <p className="text-xs">{hasUsernameOrEmail}</p>
          </DropdownItem>
          <DropdownItem
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
            key="configurations"
            textValue="Configuración"
          >
            Configuración
          </DropdownItem>
          <DropdownItem
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
            key="help_and_feedback"
            textValue="Help and Feedback"
          >
            Centro de Ayuda
          </DropdownItem>
          <DropdownItem
            isReadOnly
            endContent={<ThemeToggle />}
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark"
            textValue="Tema"
          >
            Tema
          </DropdownItem>
          <DropdownItem
            id="avatar_logout"
            className="rounded-xl  text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-bittersweet-400 dark:data-[hover=true]:text-cerise-red-600 !duration-150"
            key="logout"
            textValue="Logout"
            color="danger"
            startContent={<LogoutIcon className="size-4" />}
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
