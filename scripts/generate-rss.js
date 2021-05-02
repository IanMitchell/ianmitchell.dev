import fs from "fs";
import { Feed } from "feed";
import RSS from "rss";
import Link from "next/link";
import renderToString from "next-mdx-remote/render-to-string";
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
  const feed = new Feed({
    title: "Ian Mitchell",
    description: "My most recent blog posts",
    id: "https://ianmitchell.dev",
    link: "https://ianmitchell.dev",
    // image: "http://example.com/image.png",
    // favicon: "http://example.com/favicon.ico",
    feedLinks: {
      json: "https://ianmitchell.dev/json",
      atom: "https://ianmitchell.dev/atom",
    },
    author: {
      name: "Ian Mitchell",
      email: "ian.mitchell@hey.com",
      link: "https://ianmitchell.dev",
    },
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
    feed.addItem({
      title: frontmatter.title,
      guid: frontmatter.slug,
      link: `https://ianmitchell.dev/blog/${frontmatter.slug}`,
      date: frontmatter.date,
      // image: frontmatter.image,
      content: ReactDOMServer.renderToStaticMarkup(
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

  fs.writeFileSync("./public/feed.xml", feed.rss2());
  fs.writeFileSync("./public/feed.json", feed.json1());
}

generate();
