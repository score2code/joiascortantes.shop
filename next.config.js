/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'joiascortantes';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true, // ajuda em export estático
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : undefined,
};

module.exports = nextConfig;
