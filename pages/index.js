import Link from "next/link";
import Entry from "../layouts/Entry";
import { getAllPosts, getSerializeableFrontmatter } from "../lib/posts";
import Page from "../layouts/Page";
import Email from "../components/icons/Email";
import GitHub from "../components/icons/GitHub";
import LinkedIn from "../components/icons/LinkedIn";
import Twitter from "../components/icons/Twitter";
import RSS from "../components/icons/RSS";
import Discord from "../components/icons/Discord";

export default function Home({ entries }) {
  return (
    <Page>
      <section className="about">
        <h1>Hello! My name is Ian Mitchell.</h1>
        <header className="masthead">
          <img className="avatar big-me" src="/ian.jpg" loading="lazy" />
          <div className="masthead-container">
            <div className="masthead-content">
              <img className="avatar mini-me" src="/ian.jpg" loading="lazy" />
              <p>
                Welcome to my website! I'm a web developer from Seattle,
                Washington. I{" "}
                <Link href="/resume">
                  <a>work at Facebook</a>
                </Link>{" "}
                as a Software Engineer. In my free time I like to play video
                games, follow politics, and tinker with coding projects.
              </p>
            </div>
            <ul className="masthead-contact horizontal-stack">
              <li>
                <a href="mailto:ian.mitchell@hey.com">
                  <Email />
                </a>
              </li>
              <li>
                <a href="https://github.com/IanMitchell" rel="me">
                  <GitHub />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ianmitchel1" rel="me">
                  <Twitter />
                </a>
              </li>
              <li>
                <a href="https://discordapp.com/channels/@me/90339695967350784">
                  <Discord />
                </a>
              </li>
            </ul>
          </div>
        </header>
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
