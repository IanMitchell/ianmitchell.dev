import { Fragment } from "react";
import Link from "next/link";
import Entry from "../layouts/Entry";
import { getAllPosts, getSerializeableFrontmatter } from "../lib/posts";
import Page from "../layouts/Page";
import Social from "../components/Social";
import Email from "../components/icons/Email";
import GitHub from "../components/icons/GitHub";
import Twitter from "../components/icons/Twitter";
import RSS from "../components/icons/RSS";
import Discord from "../components/icons/Discord";

export default function Home({ entries }) {
  return (
    <Fragment>
      <Social
        title="Ian Mitchell"
        description="I'm a web developer from Seattle, Washington. Welcome to my corner of the web!"
      />
      <Page>
        <section className="masthead">
          <div className="masthead_about">
            <h2>Hello! My name is Ian Mitchell.</h2>
            <p>
              I'm a web developer from Seattle, Washington. I{" "}
              <Link href="/resume">
                <a>work at Discord</a>
              </Link>{" "}
              as a Senior Software Engineer on the Bots and API team. In my free
              time I like to play video games, follow politics, and tinker with
              coding projects.
            </p>
          </div>
          <ul className="masthead_contact">
            <li className="masthead_contact_email">
              <a href="mailto:ian.mitchell@hey.com">
                <Email />
              </a>
            </li>
            <li className="masthead_contact_github">
              <a href="https://github.com/IanMitchell" rel="me">
                <GitHub />
              </a>
            </li>
            <li className="masthead_contact_twitter">
              <a href="https://twitter.com/ianmitchel1" rel="me">
                <Twitter />
              </a>
            </li>
            <li className="masthead_contact_discord">
              <a href="https://discord.gg/ian">
                <Discord />
              </a>
            </li>
          </ul>
        </section>

        <section className="recent-posts">
          <header className="horizontal-stack">
            <h2>Recent Posts</h2>
            <a className="right" href="/feed.xml">
              <RSS className="rss" />
            </a>
          </header>

          {entries &&
            entries.map((entry) => <Entry {...entry} key={entry.slug} />)}

          <Link href="/blog">
            <a className="blog-link">
              <span>All Posts &rarr;</span>
            </a>
          </Link>
        </section>
      </Page>
    </Fragment>
  );
}

export async function getStaticProps() {
  const entries = (await getAllPosts())
    .slice(0, 10)
    .map((post) => getSerializeableFrontmatter(post.frontmatter));

  return {
    props: {
      entries,
    },
  };
}
