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
  // Note: per-page robots are emitted as <meta> tags by the App Router's
  // Metadata API. We don't set X-Robots-Tag here because a global
  // "index, follow" would conflict with per-page noindex (e.g. on
  // country tools without SEO content) and force Google to reconcile
  // mixed signals.
};

export default nextConfig;
