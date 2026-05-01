<<<<<<< HEAD
const isGithubPages = process.env.GITHUB_PAGES === 'true';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');
=======
// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin('./i18n.ts');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }

// export default withNextIntl(nextConfig)

>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3

/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === 'true'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
<<<<<<< HEAD
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: isGithubPages ? '/nomad-cafe' : '',
  assetPrefix: isGithubPages ? '/nomad-cafe' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
=======
  output: isExport ? 'export' : 'standalone',
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
>>>>>>> c7523c8f09727490134dbf1a44325eff46bd8cd3
}

export default withNextIntl(nextConfig)
