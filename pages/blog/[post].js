import React, { useMemo } from 'react';
import Link from 'next/link';
import Page from '../../layouts/Page';
import Meta from '../../components/Meta';
import PostLayout from '../../layouts/Post';
import {
  getAllPosts,
  getPostBySlug,
  getSerializeableFrontmatter,
} from '../../lib/posts';
import Social from '../../components/Social';
import { getMDXComponent } from 'mdx-bundler/client';

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
  const { frontmatter, code } = await getPostBySlug(context.params.post);

  return {
    props: {
      frontmatter: getSerializeableFrontmatter(frontmatter),
      content: code,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  const slugs = posts.map((post) => ({
    params: { post: post.frontmatter.slug },
  }));

  // Check to make sure pages are unique
  const uniqueSlugs = new Set(posts.map((post) => post.frontmatter.slug));

  if (uniqueSlugs.size !== posts.length) {
    console.error('Slugs are not unique!');
    process.exit(1);
  }

  return {
    paths: slugs,
    fallback: false,
  };
}
