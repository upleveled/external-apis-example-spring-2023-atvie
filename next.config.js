/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['files.stripe.com'],
  },
};

module.exports = nextConfig;
