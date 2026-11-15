import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the approved standalone marketing homepage while preserving all
  // existing legal, resource and demo routes in this Next.js project.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/marketing/index.html" },
        ...["product", "features", "pricing", "apply", "apply-success", "for-fisheries", "french-fisheries", "integrations", "resources", "about", "ecosystem", "demo", "privacy", "terms", "cookies"].map((slug) => ({
          source: `/${slug}`,
          destination: `/marketing/pages/${slug}.html`,
        })),
      ],
    };
  },
  async redirects() {
    return [
      { source: "/next", destination: "https://app.carpsync.com/next", permanent: true },
      { source: "/next/:path*", destination: "https://app.carpsync.com/next/:path*", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
