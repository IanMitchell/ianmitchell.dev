import React from "react";
import Link from "next/link";
import Page from "../../layouts/Page";
import Entry from "../../layouts/Entry";
import { getSerializeableFrontmatter, getAllPostsByTag } from "../../lib/posts";
import Social from "../../components/Social";

export default function Tag({ tag, posts }) {
  return (
    <Page
      title={`#${tag}`}
      className="tag"
      breadcrumb={
        <Link href="/blog">
          <a>&larr; Blog</a>
        </Link>
      }
    >
      <Social
        title={`Ian Mitchell | #${tag}`}
        description={`#${tag} • ${posts.length} posts`}
      />

      <section className="blog">
        {posts &&
          posts.map((post) => (
            <Entry
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={new Date(post.date)}
              tags={post.tags}
              excerpt={post.excerpt}
            />
          ))}
      </section>
    </Page>
  );
}

export async function getStaticProps(context) {
  const { tags } = await import("../../content/post-tags.json");
  const tag = tags.find((tag) => tag.name.toLowerCase() === context.params.tag);

  const posts = (await getAllPostsByTag(tag.name)).map((post) =>
    getSerializeableFrontmatter(post.frontmatter)
  );

  return {
    props: {
      tag: tag.name,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const { tags } = await import("../../content/post-tags.json");

  return {
    paths: tags.map((tag) => ({
      params: {
        tag: tag.name.toLowerCase(),
      },
    })),
    fallback: false,
  };
}
