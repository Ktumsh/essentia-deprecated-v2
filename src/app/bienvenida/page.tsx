import Landing from "@/components/landing/landing";
import ButtonUp from "@/components/ui/button-up";
import LandingHeader from "@/components/ui/landing-header";

import { getServerSession } from "next-auth";
import { authConfig } from "@@/auth.config";

import { Metadata } from "next";

import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Bienvenida",
  openGraph: {
    title: "Bienvenida - Essentia",
    description:
      "Tu recurso de información esencial y confiable para una vida más saludable y equilibrada",
    url: "https://essentia-web.vercel.app/bienvenida",
    type: "website",
    images: [
      {
        url: "/essentia-512x512.png",
        width: 512,
        height: 512,
      },
    ],
  },
  twitter: {
    title: "Bienvenida - Essentia",
    description:
      "Tu recurso de información esencial y confiable para una vida más saludable y equilibrada",
    card: "summary_large_image",
    images: [
      {
        url: "/essentia-512x512.png",
        width: 512,
        height: 512,
      },
    ],
  },
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
