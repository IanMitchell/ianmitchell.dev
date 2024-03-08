---
title: My 2021 Project Stacks
date: 2021-04-13
excerpt: The tools I'm using for several of my side projects
---

It may sound dry, but one of my favorite things to do with my friends is compare project stacks. I think it's fascinating to hear what people are enjoying working with and what they've been disappointed in. A couple of friends and I spent a couple of hours in a Discord call comparing notes recently, and I thought it might be fun to write up what I'm using for a few of my more popular personal projects as a blog post here.

If you want the tl;dr - I'm a huge fan of Next.js, Vercel, Name.com, and DigitalOcean.

---

## This website!

My personal website is "simple" in terms of tools used - the website itself is over-engineered for a blog, but I think that makes it fun to tinker with. This is my personal playground, and where I come to try new things out. It's important to show what I can do! The code is all on GitHub and is deployed through the Vercel integration.

- Website: Next.js and SCSS
- Host: Vercel
- Domain: Name.com
- Analytics: Fathom

Once I get closer to finishing up Ramble, I might switch over to using that as a framework. Overall though, this is probably as good a setup as I've ever had for a personal website. Now I just need to make the design and typography better.

#### Monthly cost

| Service   | Cost            |
| --------- | --------------- |
| Domain    | $17/yr          |
| Analytics | $14/mo (shared) |

---

## Aquarius

Aquarius is the most interesting, and frustrating, setup I have. I've tried to make GitHub the single source of truth - the deploy system is slightly convoluted as a result. Each commit to the `main` branch runs a GitHub action that creates a docker image, syncs environment secrets from GitHub, and then creates a kubernetes config file from. It finally submits everything to a DigitalOcean kubernetes instance. The (very under-developed) Dashboard is a subpackage in the repository, and the Vercel integration automatically deploys it as necessary.

I just switched logging providers to LogDNA. I had been using Timber up until then, but it was unfortunately shut down.

- App: Node.js using Discord.js
- Dashboard: Next.js
- Hosting: DigitalOcean Kubernetes Droplet
- Database: DigitalOcean Managed PostgreSQL
- Domain: Name.com
- Logging: LogDNA

#### Monthly cost

| Service  | Cost                                                |
| -------- | --------------------------------------------------- |
| Domain   | $55/yr                                              |
| Hosting  | $10/mo                                              |
| Database | $15/mo (shared with Sentry&rarr;Discord and Ramble) |

---

## Deschtimes

[Deschtimes](https://deschtimes.com) is a project management system I built years ago for a group of friends with an unusual workflow. I've slowly opened it up to other groups over the years, and today there are about 103 registered groups using it. The website is a Ruby on Rails app, so Heroku was the easiest to plug it into (I'm a sucker for anything that means less devops work for me).

- Website: Ruby on Rails
- Database: Heroku PostgreSQL
- Host: Heroku
- Domain: Name.com
- Analytics: Fathom
- Performance Tracking: [Skylight](https://skylight.io)
- Error Tracking: Sentry

I'm pretty happy with the current setup. The only thing I might change is the database - it doesn't have guaranteed uptime, and over the span of two months has had several multi-hour outages. I went with Rails instead of Next.js since this website primarily serves as a database and API for other clients.

#### Monthly cost

| Service   | Cost            |
| --------- | --------------- |
| Database  | $9/mo           |
| Domain    | $15/yr          |
| Hosting   | $7/mo           |
| Analytics | $14/mo (shared) |

---

## Sentry&rarr;Discord

[Sentry&rarr;Discord](https://sentrydiscord.dev) is primarily a serverless function talking to a database. It has a few static web pages that allow users to create a new redirect, but the bulk of the traffic hits the API endpoint.

- Website: Next.js (styles from TailwindUI)
- Database: DigitalOcean Managed PostgreSQL
- Host: Vercel
- Domain: Vercel
- Analytics: Fathom

All of the code is on GitHub, and I use Vercel's auto-deploy integration to push updates. For the most part, I think this is the ideal setup. I ran into some problems with the shared database and connection limits - I might need to stop sharing it with Aquarius in the future.

#### Monthly cost

| Service   | Cost                                     |
| --------- | ---------------------------------------- |
| Database  | $15/mo (shared with Aquarius and Ramble) |
| Domain    | $20/yr                                   |
| Analytics | $14/mo (shared)                          |

---

## Ramble

[Ramble](https://ramble.pub) is a website framework for blogging websites. My goal with it is to make something I can use for my personal website while also scaling to the size of some heavier-traffic Ghost blogs I run. It's still very, very early in development (it might not ever get finished) but so far this is what it's being built on. All of the code is hosted on GitHub, and I use the Vercel integration to deploy it automatically. I'll probably be building a GitHub action to automate database migrations shortly.

- Website: Next.js (admin styles from TailwindUI)
- Database: DigitalOcean Managed PostgreSQL
- Host: Vercel
- Domain: Name.com
- Analytics: Fathom

#### Monthly cost

| Service   | Cost                                                  |
| --------- | ----------------------------------------------------- |
| Database  | $15/mo (shared with Aquarius and Sentry&rarr;Discord) |
| Domain    | $27/yr                                                |
| Analytics | $14/mo (shared)                                       |

---

## Anime Awards

The [Anime Awards Guide Tool](https://animeawards.guide) is a service Crunchyroll contracted me to write. It allows users to create graphics for who they want to win the annual Anime Awards and easily share them on Twitter to help drum up social engagement and excitement. The code is hosted in a private GitHub repository and I deploy the code manually via SSH. In future iterations I might try to make it work with Vercel so I can set up an autodeploy hook.

- Website: Next.js
- File Storage: DigitalOcean Spaces
- Host: DigitalOcean Droplet
- Analytics: Fathom
- Domain: Name.com

#### Monthly Cost

| Service   | Cost            |
| --------- | --------------- |
| Domain    | $38/yr          |
| Analytics | $14/mo (shared) |
