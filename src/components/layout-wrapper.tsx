"use client";

import { usePathname } from "next/navigation";
import AsideMenu from "./ui/aside-menu";
import AsideTabs from "./ui/aside.tabs";
import { motion } from "framer-motion";
import { cn, getFirstNameAndLastName, usernameOrEmail } from "@/lib/utils";
import { useSession } from "next-auth/react";

const LayoutWrapper = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const normalizeName = getFirstNameAndLastName(session?.user?.name);
  const username = session?.user?.username || normalizeName;
  const encodedUsername = encodeURIComponent(username);
  const pathname = usePathname();
  const essentiaAI = pathname === "/essentia-ai";
  const additionals = pathname === "/adicionales";
  const profile = pathname === `/profile/${encodedUsername}`;

  return (
    <>
      {essentiaAI ? null : (
        <div
          className={cn(
            additionals || profile ? "dark:bg-dark-gradient" : "dark:bg-none",
            "page-bg fixed inset-0 size-full bg-cover bg-light-gradient-v2"
          )}
        ></div>
      )}
      <div className="relative size-full overflow-clip">
        <div className="flex min-h-dvh size-full">
          {essentiaAI ? null : <AsideMenu />}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="flex flex-col grow items-center size-full"
          >
            {children}
          </motion.div>
          {essentiaAI ? null : <AsideTabs />}
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
