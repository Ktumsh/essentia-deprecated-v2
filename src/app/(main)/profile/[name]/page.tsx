import { getServerSession } from "next-auth";
import { authConfig } from "@@/auth.config";
import Header from "@/components/ui/header";
import { Metadata } from "next";
import Dashboard from "@/components/profile/dashboard";

type Props = {
  params: { name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = params.name;
  const decodedName = decodeURIComponent(name);
  return {
    title: `Perfil de ${decodedName}`,
  };
}

const ProfilePage = async () => {
  const session = await getServerSession(authConfig);
  return (
    <>
      <Header session={session} />
      <main className="sticky top-0 flex flex-col min-h-dvh w-full md:min-w-[768px] max-w-5xl px-5 pt-14 shrink items-stretch grow">
        <Dashboard session={session} />
      </main>
    </>
  );
};

export default ProfilePage;
