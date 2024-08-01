/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.blogs.es",
      "imagenes.muyinteresante.com",
      "www.elcalbucano.cl",
      "yt3.googleusercontent.com",
      "cdn.elrancahuaso.cl",
      "www.ovejeronoticias.cl",
      "phantom-elmundo.unidadeditorial.es",
      "encrypted-tbn0.gstatic.com",
      "imgs.hipertextual.com",
      "play-lh.googleusercontent.com",
      "i.bytvi.com",
    ],
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "platform-lookaside.fbsbx.com",
      },
      {
        hostname: "pbs.twimg.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/profile/redirect",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
