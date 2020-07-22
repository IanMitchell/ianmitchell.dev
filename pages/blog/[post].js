import React from 'react';
import Link from 'next/link';
import ReactDOMServer from 'react-dom/server';
import Page from '../../layouts/Page';
import Meta from '../../components/Meta';
import MDX from '../../components/MDX';
import PostLayout from '../../layouts/Post';
import { getAllPosts, getSerializeableFrontmatter } from '../../lib/posts';
import Social from '../../components/Social';

export default function Post({ frontmatter, content }) {
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
      <Social title={frontmatter.title} description="TODO!" />
      <Meta
        date={new Date(frontmatter.date)}
        tags={frontmatter.tags}
        className="meta-border"
      />

      <PostLayout content={content} {...frontmatter} />
    </Page>
  );
}

export async function getStaticProps(context) {
  const post = (await getAllPosts()).find(
    (post) => post.frontmatter.slug === context.params.post
  );

  const { frontmatter, MDXContent } = post;

  return {
    props: {
      frontmatter: getSerializeableFrontmatter(frontmatter),
      content: ReactDOMServer.renderToString(
        <MDX>
          <MDXContent />
        </MDX>
      ),
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
