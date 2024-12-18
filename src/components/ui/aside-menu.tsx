"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import Greeting from "@/components/greeting";
import Footer from "./footer";
import Link from "next/link";

const AsideMenu = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const asideLinks = siteConfig.asideMenuLinks;

  return (
    <aside className="hidden md:block lg:w-full max-w-96 max-h-dvh sticky left-0 top-0 md:pt-14">
      <div className="relative flex w-fit lg:w-72 h-full">
        <div className="flex flex-col items-center w-full p-2 pb-0 md:space-y-4 mt-14 md:mt-0">
          <div className="flex flex-col size-full">
            <div className="flex flex-col w-full gap-2 mb-2">
              <div className="hidden lg:flex justify-center items-center w-full h-14 px-5 bg-bittersweet-400 dark:bg-cerise-red-900 rounded-xl shadow-md">
                <div className="flex flex-col w-full items-center justify-center relative">
                  <h2 className="font-bold text-white">
                    <Greeting />
                  </h2>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center gap-5 lg:w-full h-14 lg:px-3 lg:py-2 rounded-xl lg:bg-white lg:dark:bg-base-dark lg:border lg:border-gray-200 lg:dark:border-base-full-dark">
                <h3 className="font-medium uppercase">Recursos</h3>
              </div>
            </div>
            <ul>
              {asideLinks.map((link, index) => (
                <li key={index} className="w-fit lg:w-full">
                  <Link href={link.link}>
                    <Button
                      disableRipple
                      fullWidth
                      size="lg"
                      radius="lg"
                      variant="light"
                      startContent={
                        <link.icon className="size-5 transition-colors text-base-color-h dark:text-base-color-dark group-hover:text-base-color dark:group-hover:text-white" />
                      }
                      className="w-fit lg:w-full min-w-fit lg:min-w-24 h-auto lg:h-[50px] justify-start text-left p-3 mb-2 data-[hover=true]:bg-white dark:hover:bg-base-dark !duration-150"
                    >
                      <span className="hidden lg:block text-sm mr-4 transition-colors text-base-color-h dark:text-base-color-dark group-hover:text-base-color dark:group-hover:text-white">
                        {link.name}
                      </span>
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      </div>
    </aside>
  );
};

export default AsideMenu;
