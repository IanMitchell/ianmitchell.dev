import React from "react";
import Link from "next/link";
import Page from "../../layouts/Page";
import Social from "../../components/Social";
import BookmarkPanel from "../../components/BookmarkPanel";
import {
  DescriptionItem,
  DescriptionList,
} from "../../components/DescriptionList";
import PullQuote from "../../components/PullQuote";

export default function Bookmarks() {
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

      <p>
        Over the years I've accumulated a lot of web design and development
        bookmarks. Some I read every year, some I hold on to just in case I need
        them someday. I read once that you can think of it as lazy-loading
        information - you might not read a tutorial and commit it to memory, but
        you save it so when you do need that information you know where to go to
        look.
      </p>

      <section>
        <h2>The Best of the Best</h2>
        <p>
          Look, everything here is objectively stellar content, but sometimes...
          there are stars within stars.
        </p>

        {/* Stockman said so: https://twitter.com/evocateur/status/1387997719797460993 */}
        <PullQuote cite="Ian Mitchell, Quarantine Year One">
          "Sometimes... there are stars within stars ⭐"
        </PullQuote>

        <p>
          These posts and people are ones that I keep coming back to, either
          because they deeply impacted my development as a web developer or
          because their content is consistently amazing.
        </p>

        <DescriptionList>
          <DescriptionItem
            title="7 Principles of Rich Web Applications"
            icon="https://pbs.twimg.com/profile_images/1029230542716264448/LgLb--Of_400x400.jpg"
            alt="7 Principles of Rich Web Applications"
            href="https://rauchg.com/2014/7-principles-of-rich-web-applications"
          >
            This article has influenced how I approach web development for years
            now. A lot of it has since become relatively mainstream, but there
            are still sections that need a slightly more-conscious approach.
          </DescriptionItem>
          <DescriptionItem
            title="7 Rules for Creating Gorgeous UI"
            icon="https://learnui.design/blog/img/posts/7-rules-1.jpeg"
            alt="7 Rules for Creating Gorgeous UI"
            href="https://learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-1.html"
          >
            Is seven a lucky number or something? Look, I'm a developer first
            and foremost. I know a good design when I see one, and I definitely
            can point out UX and UI issues in an existing design. But if you sat
            me down and asked me to develop something from scratch, I'd have a
            real rough time of it. I've read several articles over the years
            that teach you how to do styles, but this article was incredibly
            helpful teaching me <em>fundamentals</em>. 'Course, I still violate
            these all the time, but that's on me.
          </DescriptionItem>
        </DescriptionList>
      </section>

      <hr />

      <section>
        <h2>People and Blogs</h2>

        <div className="bookmarks-entrylist">
          <BookmarkPanel href="/bookmarks/blogs" title="Blogs">
            Be an artisanal web dev and add RSS to your website.
          </BookmarkPanel>

          <BookmarkPanel href="/bookmarks/twitter" title="Twitter Accounts">
            Twitter is the drug I can't quit, no matter how desperately I crave
            freedom
          </BookmarkPanel>
        </div>
      </section>

      <section>
        <h2>More coming soon!</h2>
        <p>
          I've been saying this for over four years, but I need to launch this
          redesign without codifying my 400+ links.
        </p>
        <p>
          It's just that every time I start, I start worrying and overthinking
          it. How do I check for dead links? What if a link shows up twice? What
          if I want to do things like auto-pull the website favicon? Bunch of me
          problems, I know.
        </p>
      </section>
    </Page>
  );
}
