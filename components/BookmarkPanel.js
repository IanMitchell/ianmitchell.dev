import Link from "next/link";
import RightArrow from "./icons/RightArrow";

export default function BookmarkPanel({ href, title, children }) {
  return (
    <article className="bookmarks-panel">
      <Link href={href}>
        <a>
          <header>
            <h2>{title}</h2>
            <RightArrow />
          </header>
          <p>{children}</p>
        </a>
      </Link>
    </article>
  );
}
