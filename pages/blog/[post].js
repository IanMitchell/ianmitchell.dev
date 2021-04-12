import React, { useMemo } from 'react';
import Link from 'next/link';
import Page from '../../layouts/Page';
import Meta from '../../components/Meta';
import MDX from '../../components/MDX';
import PostLayout from '../../layouts/Post';
import {
  //   getAllPosts,
  getPostBySlug,
  getSerializeableFrontmatter,
} from '../../lib/posts';
import Social from '../../components/Social';
import { getMDXComponent } from 'mdx-bundler/client';
import { bundleMDX } from 'mdx-bundler';

export default function Post({ frontmatter, content }) {
  const Component = useMemo(() => getMDXComponent(content), [content]);

  return (
    <Page
      title={frontmatter.title}
      className="post"
      breadcrumb={
        <Link href="/blog">
          <a>&larr; All Posts</a>
        </Link>
      }
    >
      <Social
        title={frontmatter.title}
        // TODO: Improve the description
        description={frontmatter.excerpt ?? frontmatter.title}
      />
      <Meta
        date={new Date(frontmatter.date)}
        tags={frontmatter.tags}
        className="meta-border"
      />

      <PostLayout {...frontmatter}>
        <Component />
      </PostLayout>
    </Page>
  );
}

export async function getStaticProps(context) {
  const file = await getPostBySlug(context.params.post);
  // const file = fs.readFileSync(
  //   path.join(process.cwd(), 'content', 'posts', '2021-03-31-discord.mdx'),
  //   'utf-8'
  // );
  const { frontmatter, code } = await bundleMDX(file);

  return {
    props: {
      frontmatter: getSerializeableFrontmatter(frontmatter),
      content: code,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { post: 'discord' },
      },
    ],
    fallback: false,
  };

  // const posts = await getAllPosts();

  // const slugs = posts.map((post) => ({
  //   params: { post: post.frontmatter.slug },
  // }));

  // // Check to make sure pages are unique
  // const uniqueSlugs = new Set(posts.map((post) => post.frontmatter.slug));

  // if (uniqueSlugs.size !== posts.length) {
  //   console.error('Slugs are not unique!');
  //   process.exit(1);
  // }

  // return {
  //   paths: slugs,
  //   fallback: false,
  // };
}
