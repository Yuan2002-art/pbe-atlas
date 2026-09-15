import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Case/brand/event pages are fully static — nothing here needs a server yet.
  // When the AI research agent arrives it will live in src/app/api/ and this
  // config is where you would add its runtime options.
  reactStrictMode: true,
  // This project keeps its own hand-written CLAUDE.md; do not overwrite it.
  agentRules: false,
};

export default nextConfig;
