/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, {isServer}) => { 
        // canvas 관련 설정 추가
        config.module.rules.push({test : /\.node$/, use: 'raw-loader'})

        if (!isServer) config.externals.push('canvas');
        return config;
    }
}

module.exports = nextConfig
