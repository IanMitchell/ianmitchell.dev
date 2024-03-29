---
title: On MVPs and Hackathons
date: 2015-01-18
---

I recently read a tweet from [Milktea](https://twitter.com/_lilchen/status/565594310461382659) that expressed uncertainty on how to scale Minimal Viable Products (MVPs) past the proof of concept stage. It made me think about how I had developed applications in the past, and reflect on common patterns I had employed. Given her occupation I suspect she was talking about the design of a product, but seeing as I'm a programmer this post will lean more towards the code side of things.

#### My Background

First, a bit about my experience. Throughout my college career, I participated in various coding challenges. I attended two startup weekends (placing 3rd at one of them), a Microsoft hackathon (placing 3rd), a MindBody hackathon (placing 1st), and a Global Game Jam (placing 1st). There were several smaller events I competed in as well, but these are the ones I consider most memorable.

It's also worth mentioning that I attended an Entrepreneurship class that went into MVP theory during my senior year; while I won't be getting into that class as much in this post, the big takeaway was “make small, quick iterations and pivot frequently”. In essence, build a small feature, try it as soon as you can, and respond to feedback accordingly.

## Patterns and Shortcuts

These are some of the concepts I feel are important when developing an MVP. They include some shortcuts I've found helpful when I'm under time constraints; If you aren't severely pressed for time, then some of these sections (such as edge cases and unit tests) won't apply.

I'll go into how to scale an MVP at the end of the post, but these help establish some context.

### Domain Knowledge

You want to be aware of what's going on in your field. This doesn't mean you have to be an expert; just be knowledgable on what tools people are using and what trends are popular. I use Twitter, RSS Feeds, Email Newsletters, and GitHub to stay on top of emerging web frameworks and libraries. When it comes time to make an MVP, having a large list of third party scripts and plugins is **immensely** useful. I might not know how to code an autocomplete system — but I do know two or three open-source libraries that will do that for me. I've published my [list of bookmarks](/bookmarks) before. While it's slightly out of date at the moment, anytime I need to implement a feature on an MVP I'll check the list first to see if I have a resource that does some heavy lifting for me.

### Start Small

Beware of feature creep. Figure out what you're going to do, and then think about how necessary each feature is. Is it something that can be added after you launch? Is it something that's truly worth having when you go live? Stay as focused on the core components as you can.

### Heavy use of Plugins

Also known as “Don't Reinvent the Wheel”. If you don't have to code something yourself, you shouldn't. In most of the MVPs I've made, code I custom write generally is more of a glue than a system. I choose several existing libraries, and spend a bit of time stringing them together.

Normally, you wouldn't want to do this. A website should be lean: plugins add a lot of cruft and bulk. But when you're on a budget (especially when it comes to time) plugins and libraries like jQuery are your best friend. If a script does X, Y, and Z but you just need a script that does X, use it! The Y and Z features might add page weight and be annoying down the road, but for an MVP you just need to get a system that you can demo. Try to offload as much as you possibly can to third party libraries and plugins.

### Contained Custom Components

When you need to develop something yourself, make it contained. Chances are, especially in the rush to present an MVP, your initial implementation won't be as flexible or robust as you'll need it to be later. You want to make it as cheap as possible to go back, rip it out, and swap in the new system. Think Iron Man and his Arc Reactor — when one dies, he pulls it out of his chest and puts a new model in. So instead of calling an API everywhere in your code, make a wrapper class that is the only place where you directly interface with the API. It will be far less painful in the future if you need to switch providers or make a fix.

### Don't Unit Test an MVP

Unit Tests are good if you have a product that is going to be long-term and stable. MVPs are meant to be agile in spirit; you're going to be making a lot of changes frequently. Wasting time writing tests for a feature which might not be there next week just isn't worth it. An MVP should also be fairly small; manually testing it should be less time consuming than writing unit tests.

### Ignore Edge Cases

This one can bite you. In both of the startup weekends I attended, our MVP crashed because of programming errors that were the result of ignored edge cases. Ultimately, the time you save by ignoring these is worth it though. Focus exclusively on the main use case.

## So… How to Scale?

Finally, let's return to the question at hand! How do you take an MVP and scale it to a finalized product? My answer: use the same MVP process, but also revisit history to correct previous shortcuts. Generally after a launch I'll spend a lot of time addressing some of the bigger pain points (things like optimizations, tests, and edge cases) before I start on new features.

In my experience, an MVP and an “upgraded MVP” can be viewed pretty much the same way. I've never seen a product that is 'done' before. Usually, there's something that needs tweaking, some new technology that can be added, some new design you can use. The same attitude that you had for your MVP can — and should — be applied to new features going forward. For instance, instead of adding social integrations all at once, break it into parts. Start with share buttons, then add Twitter card support. Break new features into smaller, contained MVPs.

As your product expands, problems will arise caused by things that you thought were fine. Pivot! Identifying these areas during your initial MVP phase isn't always possible — don't spend a lot of time worrying about it. Experience will also help here; the more MVPs you ship, the more aware of potential problems you'll be without spending a lot of time beforehand thinking about implementation details.

## Conclusion

My professor told me once that it takes less time to fix mistakes than it does sitting around thinking about how to avoid mistakes altogether. I think in an industry where you can ship updates quickly and cheaply, it's advice worth taking to heart. Ship fast and break things — learn from experience!
