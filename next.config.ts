import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      basePath: '/mi-cocina-semanal',
      assetPrefix: '/mi-cocina-semanal',
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
