import path from 'path';
import fs from 'fs';
import slug from './slug';
import tagList from '../content/tags.json';
import { bundleMDX } from 'mdx-bundler';
import gfm from 'remark-gfm';
import metastring from './rehype/metastring';

const tagNames = tagList.tags.map((tag) => tag.name.toLowerCase());

function verifyTags(post) {
  const valid = post.frontmatter.tags.every((tag) =>
    tagNames.includes(tag.toLowerCase())
  );

  if (!valid) {
    console.error(`"${post.frontmatter.title}" contains an unknown tag:`);
  }
}

export function getSerializeableFrontmatter(frontmatter) {
  // Initialize with required keys
  const fm = {
    title: null,
    slug: null,
    tags: null,
    date: frontmatter.date.toJSON(),
    excerpt: null,
  };

  Object.entries(frontmatter).forEach(([key, value]) => {
    fm[key] = value ?? null;
  });

  return fm;
}

export async function getAllPosts() {
  const directory = path.join(process.cwd(), 'content', 'posts');
  const files = fs.readdirSync(directory);

  const components = ['CodePen'];

  const bundles = await Promise.all(
    files
      .map((file) => path.join(process.cwd(), 'content', 'posts', file))
      .map((file) => fs.readFileSync(file))
      .map((file) =>
        bundleMDX(file, {
          files: components.reduce((list, component) => {
            list[`../components/${component}.jsx`] = fs
              .readFileSync(
                path.join(process.cwd(), 'components', `${component}.jsx`)
              )
              .toString();
            return list;
          }, {}),
          xdmOptions(input, options) {
            options.remarkPlugins = [...(options.remarkPlugins ?? []), gfm];
            options.rehypePlugins = [
              ...(options.rehypePlugins ?? []),
              metastring,
            ];

            return options;
          },
        })
      )
  );

  const posts = bundles.map((bundle) => ({
    code: bundle.code,
    frontmatter: {
      ...bundle.frontmatter,
      slug: slug(bundle.frontmatter.title),
    },
  }));

  posts.forEach((post) => verifyTags(post));

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();

  return posts.find((post) => post.frontmatter.slug === slug);
}

export async function getAllPostsByTag(tag) {
  const posts = await getAllPosts();

  return posts.filter((post) =>
    post.frontmatter.tags
      ?.map((value) => value.toLowerCase())
      .includes(tag.toLowerCase())
  );
}
