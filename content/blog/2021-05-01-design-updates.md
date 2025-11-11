---
title: Design Updates
date: 2021-05-01
excerpt: I'm starting to take this blog a little more seriously, and have been ironing out some long standing bugs and design issues.
---

I finally got the motivation to continue working on my website two or three weeks ago. I've made some design changes that attempt to fix several large issues the last one had. I think the new design is at the point now where I can ship it and iterate on the live site, so I'm going to take the plunge and launch it today with this post.

I worked on the blog functionality too, but most of it shouldn't be immediately transparent. It will allow me to be more creative in future posts if I want though, which is exciting!

Here's some rough notes about what I did and what went into it all.

## General Vibes

I liked the structure of my website, but I didn't like the style of it as much.

1. The homepage felt unfinished. It didn't work great on mobile, the h1 title felt out of place, and the contact icons needed to fit in more.
2. I needed a navigation bar. The back link was pushing its limit at three levels deep, and since I was adding additional pages it was past time to add a proper website header.
3. The footer design was the most flair the website had, and it was a literal diagonal line. I can do better than that.

The minimalism of the website content was nice though. Some of the pages had layouts I liked, and the color choice still felt good to me (how I was using the colors, not as much - more on that later). I also didn't want to modify the tech stack or flow much.

## Tailwind

I almost used Tailwind for the redesign. I don't really know why I didn't, to be honest. I'm sure the tokens and scaling system would make my website more consistent, and there would be less bugs and responsive design issues in general. I think part of me just likes Sass, and this is the last website where I still use it. It's hard to let go.

I've been using Tailwind more and more in my recent projects, and it continues to grow on me. Tailwind struggled a bit when I used it with Ruby on Rails (I think [GitHub's ViewComponent](https://github.com/github/view_component) library would have _really_ helped smooth the rough edges) but it is still a fantastic choice for React websites.

## Dark Mode / Light Mode

The last design iteration was very dark. I like having a dark mode, but I don't like having it be the only option - I know a lot of people struggle to read light text on dark backgrounds, so one of my top priorities was to create a light mode / dark mode system. The dark theme isn't quite finished yet, but hopefully not too much longer.

I mentioned liking my old color palette earlier, and making the swap from a darker design to the current light one was pretty easy in practice - I ended up only needing to swap several instances of CSS variable usage.

```css showLineNumbers
/* 🌚 */ /* [!code --] */
background-color: var(--dark); /* [!code --] */
color: var(--light); /* [!code --] */
/* 🌝 */ /* [!code ++] */
background-color: var(--light); /* [!code ++] */
color: var(--dark); /* [!code ++] */
```

## Readability / Typography

I'm still working on this, but I tried to make reading this website just generally... nicer. I was using px values everywhere, and I knew I wanted to switch to em/rem values. I was a little apprehensive implementing that from scratch, but it ended up not being as hard as I thought. The CSS I ended up with feels cleaner and more consistent after the overhaul.

## Syntax highlighting

I spent some time looking at [Shiki](https://shiki.matsu.io) as an alternative to [Prism](https://prismjs.com). [Ryan Florence](https://twitter.com/ryanflorence) has been tweeting some really neat stuff he's done with the library recently, and it inspired me to try and integrate with it. I might have had more success if I hadn't _bundled_ it with mdx-bundler (get it?) but I struggled getting Shiki, Remark, and Rehype to work together in the way I wanted.

At the same time, I've been using a lot of [Prisma](https://www.prisma.io) and absolutely love their custom Prism highlighter component. I decided to build on top of the one they wrote rather than trying to spend more time trying to get Shiki into a comparable state.

I'm largely happy with the result. The syntax theme is derived from one [shuding\_](https://twitter.com/shuding_) created I believe - I can't find the tweet anymore, but from what I can remember he published a Zeit (now Vercel) VS Code theme back in 2019 that I used as a base.

## MDX (and TipTap)

MDX is a love-hate thing for me. I love Markdown, and the ability to slip in JSX is fantastic. Over time though, I've been feeling that React developers are moving slowly towards more of a Markdown-in-JSX system as opposed to a JSX-in-Markdown one. Put another way, instead of Markdown being the first class citizen with JSX sprinkles, it feels like it's becoming JSX first with Markdown here and there.

My old system compiled MDX in a way that prevented custom components from rehydrating on the client - this prevented me from ever using interactive components. Fixing this limitation was a top priority. There's been a lot of chatter recently about [mdx-bundler](https://github.com/kentcdodds/mdx-bundler), and on paper it looks fantastic. I spent several days integrating with it before ultimately giving up and adopting [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) instead. These are the main reasons why I eventually abandoned mdx-bundler:

1. The Prism component I forked from Prisma relies on metastring values sent to Code Blocks. xdm, the system powering mdx-bundler, does not support them. It is possible to work around this by writing a custom Rehype plugin, but that takes time and I really wanted to limit scope creep.
2. Markdown's `inlineCode` syntax could be overridden by MDX custom components, but xdm didn't support this. In xdm, if you define a custom code block component it also applies to inline code. If you pass a custom Code component in xdm, the recommended approach is to use `<code>` HTML directly when marking inline code instead of using single backticks. Switching from Markdown to HTML wasn't a hard fix, but it felt like a fundamental departure from Markdown and rubbed me the wrong way.
3. If you use custom components in your MDX file, xdm requires you to import them in the file itself - but you _also_ have to pass in a mapping of file locations and content source when you compile the MDX. I didn't spend much time researching why this requirement exists, but it feels redundant as a user. The imports also have to be relative to where the compilation happens, not the source file (this took me about an hour of debugging to figure out, which wasn't my proudest moment).

There are [other things that xdm does that breaks my content](https://github.com/wooorm/xdm/issues/38#issuecomment-818510715) due to it needing to construct an AST from the source (which to be clear, is my problem not theirs). But having to go back and edit each of my posts was another adoption barrier.

Overall, xdm and mdx-bundler were really impressive with their speed, API, and implementation, but parts of their opinionated design lead me to stick with next-mdx-remote. If you aren't a grumpy stickler like me, I highly recommend checking the libraries out, especially for new projects.

I also spent a short time looking at [TipTap](https://tiptap.dev) as an MDX alternative after I saw [Leah](https://twitter.com/LeahLundqvist) tweet a glowing review of it. I decided it wouldn't work with how I want to structure content on this blog, but if I ever get time to work on Ramble again it will be a fantastic fit.

---

## "What I use" and "Bookmark" Pages

I _finally_ got started on my [/uses](https://ianmitchell.dev/uses) and [/bookmarks](https://ianmitchell.dev/bookmarks) pages. The blurred icon system was inspired by [a Twitter thread on a similar effect from Splitbee](https://twitter.com/pacocoursey/status/1302028626724974592). I got a chance to use CSS variables in a fun way here, which I wouldn't have if I had ended up going with Tailwind earlier.

The content is... almost non-existent, but at least the pages exist now.

# Let me know what you think!

There are areas that have rough edges (I'm actively working on mobile web) but I'm happy with the current state of the website. If you have any feedback on the current design you'd like to share, let me know on [Twitter](https://twitter.com/ianmitchel1)!

I'm really excited to try the new components I've been working on on my next blog post, which I hope will be out later this next week.
