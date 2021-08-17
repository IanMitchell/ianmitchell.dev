import React from "react";
import Link from "next/link";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Page from "../../layouts/Page";
import Meta from "../../components/Meta";
import { COMPONENTS } from "../../components/MDX";
import PostLayout from "../../layouts/Post";
import { getAllPosts, getSerializeableFrontmatter } from "../../lib/posts";
import { GeneratedSocial } from "../../components/Social";

export default function Post({ frontmatter, source }) {
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
      <GeneratedSocial
        title={frontmatter.title}
        description={
          frontmatter.description ?? frontmatter.excerpt ?? frontmatter.title
        }
        date={new Date(frontmatter.date).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })}
        tags={frontmatter.tags}
      />
      <Meta
        date={new Date(frontmatter.date)}
        tags={frontmatter.tags}
        className="meta-border"
      />

      <PostLayout {...frontmatter}>
        <MDXRemote {...source} components={COMPONENTS} />
      </PostLayout>
    </Page>
  );
}

export async function getStaticProps(context) {
  const post = (await getAllPosts()).find(
    (item) => item.frontmatter.slug === context.params.post
  );

  const { frontmatter, content } = post;
  const source = await serialize(content);

  return {
    props: {
      frontmatter: getSerializeableFrontmatter(frontmatter),
      source,
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
    throw new Error("Slugs are not unique!");
  }

  return {
    paths: slugs,
    fallback: false,
  };
}
