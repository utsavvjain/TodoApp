/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable standalone output for better serverless deployment
  output: 'standalone',
  // Optimize for Amplify deployment
  trailingSlash: true,
  // Image optimization for Amplify
  images: {
    unoptimized: true
  },
  // Environment variable configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  }
};

module.exports = nextConfig;
