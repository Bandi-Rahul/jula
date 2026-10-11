import type { NextConfig } from "next";

const githubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";
const config: NextConfig = {
  poweredByHeader: false,
  ...(githubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/jula",
        images: { unoptimized: true },
      }
    : {}),
  async redirects() {
    if (githubPages) return [];
    return [
      { source: "/en", destination: "/", permanent: false },
      { source: "/en/:path*", destination: "/:path*", permanent: false },
    ];
  },
  async headers() {
    if (githubPages) return [];
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

if (githubPages) {
  delete config.headers;
  delete config.redirects;
}

export default config;
