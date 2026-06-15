/** @type {import('next').NextConfig} */
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@codesandbox/sandpack-react"],
};

export default withBundleAnalyzer(nextConfig);
