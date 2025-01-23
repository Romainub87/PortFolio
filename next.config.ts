import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
    },
    basePath: isProduction ? '/Portfolio' : '',
    assetPrefix: isProduction ? '/Portfolio/' : '',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/en',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;