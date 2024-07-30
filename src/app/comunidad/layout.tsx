import Aside from "@/components/community/aside";
import CommunityHeader from "@/components/community/header";

import { authConfig } from "@@/auth.config";
import { getServerSession } from "next-auth";

import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    absolute: "Comunidad de Essentia",
  },
};

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return redirect("/bienvenida");
  }
  return (
    <>
      <div className="page-bg fixed inset-0 size-full bg-cover bg-light-gradient-v2 dark:bg-none"></div>
      <div className="flex justify-center max-h-dvh w-full">
        <CommunityHeader session={session} />
        <main className="relative flex grow shrink items-start w-full max-w-[1310px] min-h-dvh overflow-y-auto">
          <div className="relative flex grow shrink items-stretch justify-between w-full max-w-[1050px]">
            <div className="flex items-stretch justify-center lg:justify-between min-h-full">
              <div className="w-full xl:min-w-[600px] max-w-[600px] min-h-dvh grow mx-0 py-6 border-x-1 border-white dark:border-base-dark text-base-color dark:text-base-color-dark">
                {children}
              </div>
              <Aside />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
