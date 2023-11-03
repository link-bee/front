/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, {isServer}) => { 
        // canvas 관련 설정 추가
        config.module.rules.push({test : /\.node$/, use: 'raw-loader'})

        if (!isServer) config.externals.push('canvas');
        return config;

    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cloudflare-ipfs.com',
                port: '',
            },
        ],
        domains: ['commondatastorage.googleapis.com'],
    },
    reactStrictMode: false,
    swcMinify: true,
    async rewrites() {
    return [
        {
            source: "/:path*",
            destination: "http://151.145.38.133:8084/:path*",
        },
    ];
},
}

module.exports = nextConfig
