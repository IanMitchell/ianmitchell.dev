const detectFrontmatter = require('remark-frontmatter');
const visit = require('unist-util-visit');
const remove = require('unist-util-remove');
const builder = require('unist-builder');
const yaml = require('yaml');

function extractFrontmatter() {
  return (tree, file) => {
    visit(tree, 'yaml', (node) => {
      file.data.frontmatter = yaml.parse(node.value);
    });
    remove(tree, 'yaml');
  };
}

function exportFrontmatter() {
  return (tree, file) => {
    const value = JSON.stringify(file.data.frontmatter, null, 2);
    const frontmatter = builder(
      'export',
      `export const frontmatter = ${value}`
    );
    tree.children = [frontmatter, ...tree.children];
  };
}

const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [detectFrontmatter, extractFrontmatter, exportFrontmatter],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'mdx'],
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = { ...(await originalEntry()) };

        // These scripts can import components from the app and use ES modules
        entries['./scripts/generate-rss.js'] = './scripts/generate-rss.js';

        return entries;
      };
    }

    return config;
  },
  env: {
    DOMAIN: 'https://ianmitchell.dev',
  },
  async redirects() {
    return [
      {
        source: '/what-i-use',
        destination: '/uses',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/uses',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:post',
        destination: '/blog/:post',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/pokemon',
        destination: '/projects/pokemon/index.html',
      },
      {
        source: '/resume',
        destination: '/projects/resume/index.html',
      },
    ];
  },
});
