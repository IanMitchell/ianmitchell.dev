import fs from 'fs';
import RSS from 'rss';
import React, { Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import MDX from '../components/MDX';
import { getAllPosts } from '../lib/posts';

async function generate() {
  const feed = new RSS({
    title: 'Ian Mitchell',
    site_url: 'https://ianmitchell.dev',
    feed_url: 'https://ianmitchell.dev/feed.xml',
  });

  const posts = await getAllPosts();

  posts.slice(0, 10).forEach((post) => {
    const { frontmatter, MDXContent } = post;
    feed.item({
      title: frontmatter.title,
      guid: frontmatter.slug,
      url: frontmatter.slug,
      date: frontmatter.date,
      description: ReactDOMServer.renderToStaticMarkup(
        <Fragment>
          <MDX>
            <MDXContent />
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

  fs.writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
