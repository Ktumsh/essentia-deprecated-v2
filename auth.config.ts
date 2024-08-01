import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { kv } from "@vercel/kv";
import { getStringFromBuffer } from "@/lib/utils";

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      authorization: {
        params: {
          scope: "email,public_profile",
        },
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize callback triggered");

        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Invalid credentials");
          return null;
        }

        const { email, password } = parsedCredentials.data;
        let user = await kv.hgetall(`user:${email}`);
        if (!user) {
          console.log("User not found");
          return null;
        }

        const encoder = new TextEncoder();
        const saltedPassword = encoder.encode(password + user.salt);
        const hashedPasswordBuffer = await crypto.subtle.digest(
          "SHA-256",
          saltedPassword
        );
        const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

        if (hashedPassword !== user.password) {
          console.log("Invalid password");
          return null;
        }

        return {
          id: user.id as string,
          name: user.name as string,
          lastname: user.lastname as string,
          email: user.email as string,
          username: user.username as string,
          birthdate: user.birthdate as string,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn callback triggered");
      return true;
    },
    async jwt({ token, account, profile, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
        token.lastname = user.lastname;
        token.birthdate = user.birthdate;
      }
      if (account?.provider === "facebook" && account.accessToken) {
        token.accessToken = account.accessToken;
        const response = await fetch(
          `https://graph.instagram.com/me?fields=id,username&access_token=${account.accessToken}`
        );
        const instagramData = await response.json();
        if (instagramData.username) token.username = instagramData.username;

        if (profile?.email) token.email = profile.email;
      }

      if (account?.provider === "twitter" && profile) {
        if ((profile as any).data && (profile as any).data.username)
          token.username = (profile as any).data.username;

        if ((profile as any).email) token.email = (profile as any).email;
      }

      if (account?.provider === "google" && profile) {
        token.name = profile.name;
        token.email = profile.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.user.lastname = token.lastname as string;
        session.user.birthdate = token.birthdate as string;
      }
      return session;
    },
  },
};
