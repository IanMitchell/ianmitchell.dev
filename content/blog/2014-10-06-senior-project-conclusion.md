---
title: Senior Project Conclusion
date: 2014-10-06
---

I'm a bit late in posting this, but my Senior Project drew to a close in June after two quarters of work. In this post I discuss some of our design decisions and what our group accomplished.

## The Idea

My previous [Senior Project: Introduction](/blog/senior-project-introduction) post introduces our idea, but in short we wanted to create a stat-tracker for the game [League of Legends](http://na.leagueoflegends.com). If you've ever watched a sporting event on ESPN, you've probably heard casters list off seemingly obscure facts (such as, "the last time the Seahawks lost by more than 6 points was in 2011"). We wanted to create a database of League of Legend games that users could run custom queries on, so that they could create similar soundbites through their own analysis. As users played games, we would automatically collect data that they could examine.

## League of Legends

One common question we were asked was "why choose League of Legends over a different sport?". We chose League for a variety of reasons:

1. It's a computer game. We could have used Baseball, Soccer, or Football, but then we would have had to go through the process of finding an affordable data source.
2. Every member in the group played League of Legends and knew the game pretty well. Not everyone on our team watched Baseball, Soccer, or Football; they would have needed to spend time getting up to speed on what statistics were important, and how to calculate them.
3. A League of Legends stat-tracker hadn't already been done. Websites exist that let you create custom queries for other sports, but none are out there for League.
4. League of Legends is growing. It's one of the world's largest video games, with 67+ million players (27 million a day, with 7.5 million concurrently at peak hours). 32 million people watched the League of Legends 2013 World Championship last year; the market is gigantic.
5. League of Legends had just released a public version of their API.

Perhaps most importantly though, it was a game we were all passionate about. As a group we would watch competitive matches and get into friendly arguments about our favorite teams. We all found League of Legends enjoyable.

## My Role

I was responsible for most aspects of the project, with the exception of the query system and decision engine (discussed later). I designed and implemented the website layout, page flow, database design, code architecture, and data pipelines. I expand on each part below.

## Page Flow

![Page Flow](/images/posts/page_flow.png)

Our application had relatively few webpages. We needed a `Home` page, an `About` page with a short description of the application and developers involved, a generic `Pages` system where we could host standalone FAQ pages or site-wide announcements, a `User` system for account registration, and finally the `Stats` system that handled queries and their respective outputs. The above image outlines the page flow I designed; from the landing page, visitors could read the about page and announcements, or login and gain access to stats and settings.

## Database Structure

![Database Relations](/images/posts/database_structure.png)

League of Legends has a lot of information that you can store. Baron Pit tracks over 500 stats per game; we didn't want to discard any data, since something we might not pay heed to could be incredibly valuable to a third party.

The biggest challenge in designing the database was decreasing the amount of space it would take up. Since we would be tracking a large amount of games, we needed to get the data to be as compact as possible in order to ensure low cost and high speed. To this end, we reorganized the imported data in order to optimize it. One of the things we did was identify player data returned by the API that was shared by the game (for instance, `Game Length`). This was taken out of the `Stat` table, and tied to the `Game` table to reduce duplication.

Another thing we needed to account for was variable data per game patch, which wasn't tracked by the API. League of Legends is an evolving game; every two weeks or so, in order to balance the game, Riot Games will change numbers associated with items (for instance, increasing the Cost of an item from 375 to 475 gold). We wanted to be able to identify when these changes occurred, so that users could run queries such as "Before Patch 4.18, what was Maokai's win rate? What was it after?" and produce meaningful results. We setup links between Items, Runes, Spells, Talents, and Champions and associated each of those with a Patch. This also helped reduce space; instead of each Stat entry having an Item Name and Item Effect as a String field, it had a foreign key to an Item. This helped save a significant amount of space, and resulted in better flexibility at the same time.

## Code Structure

We decided to use [Ruby on Rails](http://rubyonrails.org) for our backend, and [Zurb Foundation](http://foundation.zurb.com) for our frontend. This was chiefly my call -- I had web development experience going into this project, while my friends had only done Java development. We briefly considered the idea of using a framework like Java Spring, but decided against it (having one person in the group familiar with the tech stack was preferable to none). I briefly considered Node.js, but decided I didn't feel as comfortable with it as I did Ruby on Rails when developing a large application.

We began by creating a League of Legends API wrapper as a gem, which allowed us to respond to API changes faster. We then mapped out our three Data Pipelines (discussed below), and set the rest up using standard Rails paradigms. We didn't use many other gems extensively in our application, beyond development environment helpers such as [Guard](https://github.com/guard/guard). We used [Slim](http://slim-lang.com) for templating, and a small amount of custom SCSS. We relied rather heavily on Foundation for styling; the focus of the project was functionality rather than aesthetics.

## Data Pipeline

Our application required three separate, dedicated data pipelines. Each had its own set of requirements and limitations:

1. **Static Import:** The static pipeline downloaded all the static assets from the API. This information was League of Legends related, rather than tied to a single game -- things like which Champions were available, what Runes you could use, what Items you could buy, what Masteries you could run, and what Spells existed in the game. We would run this once before we checked for new games - we needed to make sure that our internal representation of the game was up to date with the League of Legend game state. If a new patch had been pushed out with balance changes, we needed to download everything and update our database with the new information.
2. **Team Import:** Team Import would run once every 12 seconds. It would check the `TeamQueue` table and grab the oldest entry. It would then import information about the team, and the summoners on its roster. If we had an older version of the team in our database, we attached the two of them accordingly.
3. **Game Import:** Game Import would run once every 12 seconds. This pipeline was by far the most complex, and to some extent controlled the other two pipelines. It was responsible for looping through all registered users, determining if new games had been played, and then importing all the new games per player. The Game Import pipeline was responsible for the following notable edge cases:

- Has the summoner changed teams?
- Have any of the teams changed rosters
- How many new games are there?
- Is the oldest game still in the match history for all players?
- Is the player on both teams? If so, which team were they part of?

  Additional edge cases had to be accounted for, but these were the most difficult to resolve. In the result of team changes or absence, the team would be added to the `TeamQueue` table and the Game Import pipeline would exit prematurely, moving on to the next user. On the next run if both teams were in the database, the game would be imported. A decision engine was then run on the game, attempting to determine what role each player had fulfilled. In League of Legends, there is a 'metagame', or what is considered to be the best way to go about playing in order to maximize your winning potential. There are five roles, or positions players can take -- Top Lane, Middle Lane, AD Carry, Support, and Jungle. Our decision engine would analyze the stats from the game, and attempt to place each player into the role it thought fit best. If no decision could be reached, the user would be notified and asked to manually set the roles (this also helped ensure if a team ran a nonstandard strategy, our system could account for it). If our system incorrectly assigned roles, users could modify them at a later time.

One of the more difficult parts of this system was maneuvering around the API limit. The League of Legends API has a rate limit of around 10 requests every 1 second. For our application, we required well over this amount; unfortunately, the only way to apply for a limit increase was to demo a functional application. We therefore created a rotating system that took advantage of six API keys (one from each member of the group, and one provided by a friend). Our group was very uncomfortable with our solution; we were intentionally circumventing what we felt was the spirit of the rate limit, and we didn't like it. Unfortunately, we didn't see any other way of doing things. If we used one key, things would slow down to the point of risking significant data loss; we asked a Riot employee if there was any way we could get a partially larger cap, and were told it wasn't possible. Ultimately, we decided to use six keys in our application, with the following self-imposed rules:

1. We would only allow one user account to be registered on the website while our system was in place.
2. The system would be used **only** for development and applying for a larger rate limit.
3. Once a higher rate limit was granted, we would rip the system out immediately (before launch) and use the dedicated key.
4. When submitting the application to Riot, we would be upfront about using multiple keys.

The concept we settled on was simple; use a key until it neared its cap, then swap it out for a fresh key, continually rotating keys as needed. We designed our pipelines to never use up all keys at the same time; by spacing out pipeline calls to occur every 12 seconds at a minimum, we never risked hitting the application with the one user rule. To enforce this, we used the gem [Whenever](https://github.com/javan/whenever) to dictate when each pipeline would be called.

## Final Stats

![Code Stats](/images/posts/code_stats.png)

Although these stats don't always paint the best picture, I still find they're fun to look at and can give a general impression of what we did. We had tests for the majority of our application, with the exception of some import pipelines. Due to frequent changes to the API, we tested parts of our pipeline manually.

## Pain Points

There were a few major pain points:

1. Most of our members didn't know Ruby on Rails, and due to a heavy school workload were never were able to take the time to really learn the language and framework. This meant that while they could provide pseudo code and theoretical design patterns, ultimately the burden fell on me to implement everything. This bottleneck severely restricted how much we were able to accomplish.
2. Riot's League of Legends API was constantly changing due to it being in early Beta. This meant that we were spending some time each week rewriting and testing our API wrapper.
3. Designing around the API limitations was incredibly time consuming. I discussed this earlier, but the rate limits were aggravating. We were able to get our system working, but not as quickly as we were hoping. Additional quality of life problems only amplified this. For instance, when you check recent games with the API, it responds with the `TeamID` of the opposing Teams - but with the API, you could only search teams by using the `TeamName`. To convert from a `TeamID` to a `TeamName`, you needed to perform an additional request. Inconveniences like these normally aren't much of an issue, but when combined with an already problematic rate limit it becomes a major sore spot.

## Final Presentation

Here are the [slides for our final presentation](https://cldup.com/8RLnsOhoVF.pdf). Each team member reported on their specific area of the project in front of a panel of industry experts from companies such as Facebook, Adobe, Microsoft, and more. At the end of our project, we received full points.

## Result

![Baron Pit](/images/posts/baron_pit.png)

_Baron Pit with placeholder artwork_

At the end of two quarters, we had a website with a basic query interface users could interact with. We didn't have time to develop a nice theme complete with custom artwork, but we did our best to make the website look clean.

Our query interface didn't extend past a very minimal implementation, but members James Aldag and Zach Behnke were able to get a rough version working and connected to the website. The other aspects of the website worked as desired. Our database was completed, and our Data Pipelines were implemented and running as designed. The Decision Engine we made handled standard picks with a high accuracy; we unfortunately didn't have time to completely test it with non-meta strategies.

## Moving Forward

Near the end of our project Riot announced they were working on a similar service, which they have [since released](http://na.leagueoflegends.com/en/news/game-updates/features/announcing-new-match-history-beta). It duplicates much of the work we did while also providing additional information the API doesn't allow access to. As such, we have shelved our project.
