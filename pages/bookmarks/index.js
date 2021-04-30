import React from "react";
import Link from "next/link";
import Page from "../../layouts/Page";
import Social from "../../components/Social";
import RightArrow from "../../components/icons/RightArrow";

export default function Bookmarks({ posts }) {
  return (
    <Page
      title="Bookmarks"
      className="bookmarks"
      breadcrumb={
        <Link href="/">
          <a>&larr; Home</a>
        </Link>
      }
    >
      <Social
        title="Ian Mitchell | Bookmarks"
        description="My collection of bookmarks on a variety of web development and web design topics."
      />

      <section>
        <h2>The Best</h2>
        <p>Stuff here</p>
      </section>

      <section>
        <p>Design!</p>

        <div className="bookmarks-entrylist">
          <article className="bookmarks-entry">
            <a href="">
              <header>
                <h2>User Experience</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry">
            <a href="">
              <header>
                <h2>User Interface</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry">
            <a href="">
              <header>
                <h2>Typography</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry">
            <a href="">
              <header>
                <h2>Design</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry">
            <a href="">
              <header>
                <h2>Animation</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>
        </div>
      </section>

      <section>
        <p>CSS Goodness!</p>

        <div className="bookmarks-entrylist">
          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>CSS3</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Sass / SCSS</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>
        </div>
      </section>

      <section>
        <p>JavaScript ohMY!</p>

        <div className="bookmarks-entrylist">
          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>jQuery</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>React</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Node</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Vanilla JS</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>
        </div>
      </section>

      <section>
        <p>HTML Goodness!</p>

        <div className="bookmarks-entrylist">
          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>HTML5</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>SVG</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Platform Integration</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>
        </div>
      </section>

      <section>
        <p>HTML Goodness!</p>

        <div className="bookmarks-entrylist">
          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Documentation</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Analytics</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Security</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>
        </div>
      </section>

      <section>
        <p>Cross section important items</p>

        <div className="bookmarks-entrylist">
          <article className="bookmarks-entry bookmarks-entry_full">
            <a href="">
              <header>
                <h2>Accessibility</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Performance</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Tools</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Theory</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>
        </div>
      </section>

      <section>
        <p>Ruby!</p>

        <div className="bookmarks-entrylist">
          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Gems</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Rails</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Configuration</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>

          <article className="bookmarks-entry bookmarks-entry">
            <a href="">
              <header>
                <h2>Tutorials</h2>
                <RightArrow />
              </header>
              <p>Description</p>
            </a>
          </article>
        </div>
      </section>
    </Page>
  );
}
