import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
});

export const config = {
  matcher: [
    "/",
    "/recursos/:path*",
    "/noticias",
    "/essentia-ai",
    "/adicionales",
    "/comunidad/:path*",
    "/profile",
  ],
};
