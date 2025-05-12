/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Return file paths rather than URLs for fonts to support variable fonts
  assetPrefix: undefined,
};

module.exports = nextConfig; 