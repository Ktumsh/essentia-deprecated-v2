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
    "/salud-y-bienestar/:path*",
    "/ejercicios-y-fitness/:path*",
    "/nutricion-y-alimentacion/:path*",
    "/bienestar-emocional/:path*",
    "/salud-y-educacion-sexual/:path*",
    "/salud-para-todas-las-edades/:path*",
    "/noticias",
    "/essentia-ai",
    "/adicionales",
    "/comunidad/:path*",
    "/profile",
  ],
};
