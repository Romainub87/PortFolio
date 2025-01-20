import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
    },
    basePath: isProduction ? '/Portfolio' : '',
    assetPrefix: isProduction ? '/Portfolio/' : '',
};

export default nextConfig;