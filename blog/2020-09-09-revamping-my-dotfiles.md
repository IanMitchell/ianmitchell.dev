---
title: Revamping my Dotfiles
date: 2020-09-08
excerpt: I broke my WSL installation while installing PostgreSQL and realized I hadn't updated my dotfile repository in over a year - whoops!
---

Over the past few weeks I've been working on a few projects that need PostgreSQL databases. While trying to install it on [WSL2](https://docs.microsoft.com/en-us/windows/wsl/about) I inadvertently broke my linux installation, and I had to delete it and create a new WSL instance. I took this opportunity to revamp my [dotfiles](https://github.com/ianmitchell/dotfiles) which, admittedly, had been unmaintained for a while.

The goal of the revamp was to have everything work from a `./install` command, in the hopes that my new setup would work with [GitHub Codespaces](https://docs.github.com/en/github/developing-online-with-codespaces/personalizing-codespaces-for-your-account). I haven't been able to get the dotfiles to work with a codespace yet, but I'm continuing to try! I also wanted to move from the [powerlevel10l](https://github.com/romkatv/powerlevel10k) prompt to [Starship](https://starship.rs/). Despite being more limited (no right-aligned items) it is noticeably faster. Other tools I added include:

- [Delta](https://github.com/dandavison/delta) - A fantastic terminal diff viewer. I mainly use [GitHub Desktop](https://desktop.github.com/) as a git client but this has been helpful for quicker WSL diffs.
- [bat](https://github.com/sharkdp/bat) - `cat` but better! Syntax highlighting out of the box is immensely helpful.
- [exa](https://the.exa.website/) - An improved `ls` viewer. Icons, coloring, better meta information - and by default it lists file sizes in a format I can read!
- [tldr](https://tldr.sh/) - I'm not a terminal whiz. I know enough to get by, but I need a lot of help to do non-trivial tasks. Stack Overflow had been my best friend for this, presenting information in a clearer way than the man-pages do. Then I discovered tldr from a [Test Double Blog Post](https://blog.testdouble.com/posts/2020-04-07-favorite-things/) and it became one of my most used tools. tldr is easily my top recommendation.
- [Volta](https://volta.sh/) - I always have a couple of side projects I bounce around. They don't all use the same node version - Volta makes installing and switching to the right version mindless.
- [Oh My Zsh](https://ohmyz.sh/) - I don't use the prompts, but I do use a few plugins and settings. If there's something you want your terminal to do, chances are they have a plugin for it.
