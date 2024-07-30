import Landing from "@/components/landing/landing";
import ButtonUp from "@/components/ui/button-up";
import LandingHeader from "@/components/ui/landing-header";

import { getServerSession } from "next-auth";
import { authConfig } from "@@/auth.config";

import { Metadata } from "next";

import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Bienvenida",
};

const WelcomePage = async () => {
  const session = await getServerSession(authConfig);
  if (session) {
    return redirect("/");
  }
  return (
    <>
      <LandingHeader />
      <Landing />
      <ButtonUp />
    </>
  );
};

export default WelcomePage;
