const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  experimental: {
    esmExternals: true,
  },
  webpack5: true,
  pageExtensions: ["js", "mdx"],
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = { ...(await originalEntry()) };

        // These scripts can import components from the app and use ES modules
        entries["scripts/generate-rss.js"] = "./scripts/generate-rss.js";

        return entries;
      };
    }

    return config;
  },
  env: {
    DOMAIN: "https://ianmitchell.dev",
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
});
