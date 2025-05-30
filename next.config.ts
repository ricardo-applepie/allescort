import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    appDir: true,  // Ensure App Router is enabled
  },
  output: 'standalone', // Required for server functions in Amplify
};

export default nextConfig;
