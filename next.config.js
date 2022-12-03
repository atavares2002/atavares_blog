/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
        pathname: "/T9nlPhaZRreqP54OjdsP/**",
      },
    ],
  },
};
module.exports = nextConfig;
