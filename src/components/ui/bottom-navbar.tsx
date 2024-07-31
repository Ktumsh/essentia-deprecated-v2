"use client";

import { siteConfig } from "@/config/site";
import { cn, normalizedPathName } from "@/lib/utils";
import { Button, Link, Navbar, Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();

  const normalizedPath = normalizedPathName(pathname);

  const pages = siteConfig.navLinks.map((page) => ({
    ...page,
    active: normalizedPath === page.href,
  }));
  return (
    <Navbar
      classNames={{
        base: "md:hidden bottom-0 bg-white dark:bg-base-dark z-40",
        wrapper: "h-14 justify-center gap-0",
      }}
    >
      {pages.map(
        ({ name, href, icon: Icon, fillIcon: FillIcon, active }, key) => (
          <Tooltip
            key={key}
            content={name}
            delay={500}
            closeDelay={0}
            classNames={{
              content:
                "bg-gradient-to-br from-white to-gray-300 dark:from-base-dark dark:to-base-full-dark text-xs text-base-color-h dark:text-base-color-dark-h",
            }}
          >
            <li className="relative flex items-center justify-center size-full">
              <Button
                as={Link}
                id={`navbar_link_${key + 1}`}
                fullWidth
                variant="light"
                color="danger"
                href={href}
                className={cn(
                  "!h-full after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:h-[3px] after:bg-current after:scale-x-0 data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-base-full-dark-50 text-gray-500 dark:text-gray-400 dark:data-[hover=true]:text-bittersweet-400 dark:dark:data-[hover=true]:text-cerise-red-600 min-w-0",
                  active
                    ? "current-page rounded-t-none text-bittersweet-400 dark:text-cerise-red-600 after:bg-bittersweet-400 dark:after:bg-cerise-red-600 after:scale-x-100 data-[hover=true]:bg-transparent dark:data-[hover=true]:bg-transparent"
                    : "not-current"
                )}
              >
                {active ? (
                  <FillIcon className="size-6" aria-hidden="true" />
                ) : (
                  <Icon className="size-6" aria-hidden="true" />
                )}
              </Button>
            </li>
          </Tooltip>
        )
      )}
    </Navbar>
  );
};

export default BottomNav;
