/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    // API_URI: process.env.API_URL,
  },
  experimental: {
    outputStandalone: true,
  },
  // async headers() {
  //   return [];
  // },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL,
    // staticFolder: "/static",
  },
};

module.exports = nextConfig;
