/** @type {import("next").NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pub-38422227c97d42a6b276b4f48668bc37.r2.dev",
            }
        ]
    }
};

export default nextConfig;
