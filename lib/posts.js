import path from 'path';
import fs from 'fs';
import slug from './slug';
import { tags } from '../content/tags.json';

const tagNames = tags.map((tag) => tag.name.toLowerCase());

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
    date: new Date(frontmatter.date).toJSON(),
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

  const entries = await Promise.all(
    files.map((file) => import(`../content/posts/${file}`))
  );

  const posts = entries.map((entry) => ({
    frontmatter: {
      ...entry.frontmatter,
      slug: slug(entry.frontmatter.title),
    },
    MDXContent: entry.default,
  }));

  posts.forEach((post) => verifyTags(post));

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );
}

export async function getAllPostsByTag(tag) {
  const posts = await getAllPosts();

  return posts.filter((post) =>
    post.frontmatter.tags
      ?.map((value) => value.toLowerCase())
      .includes(tag.toLowerCase())
  );
}
