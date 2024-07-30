import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "@@/auth.config";
import { getFirstNameAndLastName } from "@/lib/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authConfig);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const normalizeName = getFirstNameAndLastName(session?.user?.name);
  const username = session?.user?.username || normalizeName;

  return {
    redirect: {
      destination: `/profile/${encodeURIComponent(username)}`,
      permanent: false,
    },
  };
};

const RedirectPage = () => null;

export default RedirectPage;
