import LayoutWrapper from "@/components/layout-wrapper";
import BottomNav from "@/components/ui/bottom-navbar";
import ButtonUp from "@/components/ui/button-up";
import Header from "@/components/ui/header";
import MobileHeader from "@/components/ui/mobile-header";
import { authConfig } from "@@/auth.config";
import { getServerSession } from "next-auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  return (
    <>
      {/* Header */}
      <Header session={session} />
      {/* Mobile Header */}
      <MobileHeader session={session} />
      <LayoutWrapper session={session}>{children}</LayoutWrapper>
      {/* Bottom Mobile Navbar */}
      <BottomNav />
      <ButtonUp />
    </>
  );
}
