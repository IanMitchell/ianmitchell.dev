---
title: Sending Sentry Events to Discord
date: 2020-07-20
layout: link
link: ianmitchell/sentry-discord
href: https://github.com/IanMitchell/sentry-discord
excerpt: The most popular part of my bot, Aquarius, is the function that forwards Sentry errors to Discord.
---

I use [Sentry](https://sentry.io) to track errors in Aquarius. When I was first adding it I wanted a way to post notifications in my development channel - Sentry's focus is pretty clearly on Slack though, and they don't offer a Discord integration. I ended up creating a simple webhook function that would forward events to Discord as an embed. I anticipated the webhook would be useful for a few people when I wrote it, but I thought that Aquarius would be the more "interesting" repository. Turns out I was pretty wrong - the sentry-discord repository sees traffic an order of magnitude higher than Aquarius does.
