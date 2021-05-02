import fs from "fs";
import RSS from "rss";
import Link from "next/link";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import React, { Fragment } from "react";
import ReactDOMServer from "react-dom/server";
import MDX from "../components/MDX";
import { getAllPosts } from "../lib/posts";
import Alert from "../components/Alert";
import CodePen from "../components/CodePen";

const COMPONENTS = {
  CodePen,
  Link,
  Alert,
};

async function generate() {
  const feed = new RSS({
    title: "Ian Mitchell",
    site_url: "https://ianmitchell.dev",
    feed_url: "https://ianmitchell.dev/feed.xml",
  });

  const posts = await getAllPosts();

  const entries = await Promise.all(
    posts.slice(0, 10).map(async (post) => {
      const { frontmatter, content } = post;
      const { renderedOutput } = await renderToString(content, {
        components: COMPONENTS,
        provider: { component: MDX },
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      });

      return {
        frontmatter,
        source: renderedOutput,
      };
    })
  );

  entries.forEach(({ frontmatter, source }) => {
    feed.item({
      title: frontmatter.title,
      guid: frontmatter.slug,
      url: frontmatter.slug,
      date: frontmatter.date,
      description: ReactDOMServer.renderToStaticMarkup(
        <Fragment>
          <MDX>
            <section dangerouslySetInnerHTML={{ __html: source }} />
          </MDX>
          <a
            href={`mailto:ian.mitchell@hey.com?subject=Reply%20to:%20“${frontmatter.title}”`}
          >
            Reply via e-mail
          </a>
        </Fragment>
      ),
    });
  });

  fs.writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
