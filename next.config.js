/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apy_key: process.env.NEXT_PUBLIC_API_KEY,
  },
};

module.exports = nextConfig;
