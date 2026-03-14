import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {name: 'removeViewBox', active: false},
                {name: 'removeDimensions', active: true},
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
