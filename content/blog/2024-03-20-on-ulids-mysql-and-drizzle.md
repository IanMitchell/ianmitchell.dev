---
title: On ULIDs, MySQL, and Drizzle
date: 2024-03-20
layout: link
link: Saving precious bytes by storing ULID strings as binary with Drizzle
href: https://x2f.dev/blog/saving-precious-bytes-by-storing-ulid-strings-as-binary-with-drizzle
excerpt: Leah Lundqvist wrote an article on how to decrease ULID storage size with Drizzle and MySQL.
---

I’ve been working on a project with [Leah Lundqvist](https://twitter.com/LeahLundqvist) for a few months now, and she wrote an article about one of the technical optimizations we made. We opted to create identifiers using the [ULID](https://github.com/ulid/spec) format, which has increased storage requirements when compared to a serial bigint column. With some neat tricks, you can significantly decrease the column storage size. If you’re using Drizzle, PlanetScale, and ULID identifiers check it out!
