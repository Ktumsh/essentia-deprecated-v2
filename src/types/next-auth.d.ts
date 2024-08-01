import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
      lastname: string;
      birthdate: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    username: string;
    name: string;
    birthdate: string;
  }

  interface User extends DefaultUser {
    username: string;
    lastname: string;
    birthdate: string;
  }
}
