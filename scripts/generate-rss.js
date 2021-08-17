import fs from "fs";
import { Feed } from "feed";
import { serialize } from "next-mdx-remote/serialize";
import React, { Fragment } from "react";
import ReactDOMServer from "react-dom/server";
import MDX, { COMPONENTS } from "../components/MDX";
import { getAllPosts } from "../lib/posts";
import { MDXRemote } from "next-mdx-remote";

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
      const source = await serialize(content);

      return {
        frontmatter,
        source,
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
            <MDXRemote {...source} components={COMPONENTS} />
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
