/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Return file paths rather than URLs for fonts to support variable fonts
  assetPrefix: undefined,
  // Export static files to 'out' directory for Cloudflare Pages
  output: 'export',
};

module.exports = nextConfig; 