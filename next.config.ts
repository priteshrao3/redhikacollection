import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image's SSRF guard refuses to fetch from hosts that resolve to
    // private/loopback IPs (e.g. localhost during local dev against a local
    // backend) — harmless to skip optimization there; production always
    // points at a real public host (PythonAnywhere) so stays optimized.
    unoptimized: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shibra.pythonanywhere.com",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
