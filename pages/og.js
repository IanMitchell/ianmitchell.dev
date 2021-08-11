import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/router";
import Twitter from "../components/icons/Twitter";
import Discord from "../components/icons/Discord";
import humanize from "../lib/humanize";

const capitalize = ([firstLetter, ...restOfWord]) =>
  firstLetter.toUpperCase() + restOfWord.join("");

export default function OpenGraph() {
  const router = useRouter();

  const { date, title } = router.query;
  const tags = router.query.tags?.split(",");

  const classes = classNames({
    constrained: title?.length > 50,
  });

  return (
    <section className="opengraph">
      <header>
        <time>{decodeURIComponent(date)}</time> |{" "}
        {humanize(
          tags?.map((tag) => `#${decodeURIComponent(capitalize(tag))}`)
        )}
      </header>
      <h1 className={classes}>{decodeURIComponent(title)}</h1>
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
