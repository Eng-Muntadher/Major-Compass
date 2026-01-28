import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hlckgsfzfwbbyssatscd.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
