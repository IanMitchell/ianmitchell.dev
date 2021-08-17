import React, { Fragment } from "react";
import Link from "next/link";
import { getSerializeableFrontmatter, getAllPosts } from "../../lib/posts";
import Page from "../../layouts/Page";
import Social from "../../components/Social";
import ExternalLink from "../../components/icons/ExternalLink";
import humanize from "../../lib/humanize";

function getIcon(post) {
  const { layout = "blog" } = post;

  switch (layout.toLowerCase()) {
    case "link":
      return <ExternalLink className="layout-icon" />;
    default:
      return null;
  }
}

export default function Blog({ posts }) {
  return (
    <Page
      title="Blog"
      className="blog"
      breadcrumb={
        <Link href="/">
          <a>&larr; Home</a>
        </Link>
      }
    >
      <Social
        title="Ian Mitchell | Blog"
        description="All the posts I've written over the years"
      />

      {Object.keys(posts)
        .reverse()
        .map((year) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ul>
              {posts[year] &&
                posts[year].map((post) => (
                  <li key={post.title}>
                    <Link href="/blog/[post]" as={`/blog/${post.slug}`}>
                      <a>
                        {getIcon(post)}
                        {post.title}
                      </a>
                    </Link>
                    <span>
                      {humanize(post.tags)} &bull;{" "}
                      {new Date(post.date).toLocaleString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </span>
                  </li>
                ))}
            </ul>
          </Fragment>
        ))}
    </Page>
  );
}

export async function getStaticProps() {
  const entries = {};

  const posts = (await getAllPosts()).map((post) =>
    getSerializeableFrontmatter(post.frontmatter)
  );

  const years = new Set(posts.map((post) => new Date(post.date).getFullYear()));

  years.forEach((year) => {
    entries[year] = [];
  });

  posts.forEach((post) =>
    entries[new Date(post.date).getFullYear()].push(post)
  );

  years.forEach((year) => {
    entries[year] = entries[year].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  });

  return {
    props: {
      posts: entries,
    },
  };
}
