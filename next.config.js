const isProd = process.env.NODE_ENV === 'production';
const repo = 'joiascortantes';
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : undefined,
};
