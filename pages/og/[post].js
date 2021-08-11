import Image from "next/image";
import classNames from "classnames";
import Twitter from "../../components/icons/Twitter";
import Discord from "../../components/icons/Discord";
import humanize from "../../lib/humanize";
import { getAllPosts, getSerializeableFrontmatter } from "../../lib/posts";

export default function OpenGraph({ date, tags, title }) {
  const classes = classNames({
    constrained: title?.length > 50,
  });

  return (
    <section className="opengraph">
      <header>
        <time>
          {new Date(date).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </time>{" "}
        | {humanize(tags)}
      </header>
      <h1 className={classes}>{title}</h1>
      <footer>
        <Image
          src="/ian.jpg"
          alt="My profile picture. My mom says I'm a handsome boy!"
          width={200}
          height={200}
          loading="eager"
          priority
          unoptimized
        />
        <div className="opengraph_meta">
          <h2>Ian Mitchell</h2>
          <ul>
            <li>
              <Twitter />
              @IanMitchel1
            </li>
            <li>
              <Discord />
              Desch#3091
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
}

export async function getStaticProps(context) {
  const { frontmatter } = (await getAllPosts()).find(
    (post) => post.frontmatter.slug === context.params.post
  );
  const json = getSerializeableFrontmatter(frontmatter);

  const capitalize = ([firstLetter, ...restOfWord]) =>
    firstLetter.toUpperCase() + restOfWord.join("");

  return {
    props: {
      date: json.date,
      tags: json.tags.map((tag) => `#${capitalize(tag)}`),
      title: json.title,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  const slugs = posts.map((post) => ({
    params: { post: post.frontmatter.slug },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
}
