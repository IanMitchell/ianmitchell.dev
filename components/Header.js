import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <header>
      <img className="splash" src="/header.svg" alt="" />

      <section className="header-content container">
        <h1>
          <Link href="/">
            <a>
              <Image
                src="/ian.jpg"
                alt="My profile picture. My mom says I'm a handsome boy!"
                width={48}
                height={48}
                loading="eager"
                priority
                unoptimized
              />
              <span>Ian</span>
            </a>
          </Link>
        </h1>
        <nav className="container">
          <ol>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/bookmarks">
                <a>Bookmarks</a>
              </Link>
            </li>
            <li>
              <Link href="/snippets">
                <a>Snippets</a>
              </Link>
            </li>
            <li>
              <Link href="/uses">
                <a>My Stack</a>
              </Link>
            </li>
          </ol>
        </nav>
      </section>
    </header>
  );
}
