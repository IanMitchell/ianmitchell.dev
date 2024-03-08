/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  experimental: {
    // mdxRs: true,
    typedRoutes: true,
  },
  async Headers() {
    return [
      {
        source: "*",
        headers: [
          {
            key: "Permission-Policy",
            value: "interest-cohort=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/what-i-use",
        destination: "/uses",
        permanent: true,
      },
      {
        source: "/tools",
        destination: "/uses",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:post",
        destination: "/blog/:post",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/fykBTchEeG",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/pokemon",
        destination: "/projects/pokemon/index.html",
      },
      {
        source: "/resume",
        destination: "/projects/resume/index.html",
      },
    ];
  },
};
