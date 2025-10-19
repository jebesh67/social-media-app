import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.graphql$/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
};

export default nextConfig;
