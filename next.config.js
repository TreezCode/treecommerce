/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["cdn.sanity.io"],
    formats: ["image/webp"],
    unoptimized: true,
  }
}

module.exports = nextConfig
