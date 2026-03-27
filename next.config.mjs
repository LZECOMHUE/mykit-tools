import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/tools/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/free-:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/tools/free-:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
