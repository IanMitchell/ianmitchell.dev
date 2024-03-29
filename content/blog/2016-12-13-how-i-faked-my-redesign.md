---
title: How I Faked My Redesign
date: 2016-12-13
---

Friends don't let friends do redesigns, folks. Unfortunately, I don't have any friends and ended up with a new look! I documented my wildly unfocused process below[^1] as well as listing some advice for developers about to embark on the same journey.

# Generalized Advice

> The worst thing as a designer is when the developer gets creative.
>
> <small>
> 	<cite>Smashing Conf SF 2016</cite>
> </small>

I'm a developer. I did a redesign, which means I got creative. If you're a designer, save yourself some pain and stop reading because you're probably not going to like this post.

If you're a developer, good news! Faking your way into a decent looking design isn't incredibly hard. It might not be cutting edge, it might not be super cohesive, but it'll work.

### Identify Limitations

Before you start a redesign figure out what you'll have to work around. For this project I had two core limitations:

1. **GitHub Pages**: I'm hosting this website on GitHub Pages. That meant using Jekyll with no custom plugins or gems. If I wanted custom functionality I would have to get creative.
2. **Performance**: This was self-imposed, but I wanted an extremely performant website. I limited page paints, delayed heavy asset loading, and used as few external fonts as possible - performance was a top consideration.

### Responsive Design

Start your redesign by going mobile first -- it helps. One, because it's the right thing to do. Two, scaling a design up is easier than scaling a design down. And three, as a developer you're targeting an audience that will in all likelihood be using a mobile device to visit your website (check your Google Analytics data and see what your traffic looks like).

### Share Ideas

Don't be afraid to borrow ideas (note: _Ideas_ not implementations) from other websites! My post body styling is a heavily modified fork of Casper's, the default theme for the [Ghost](https://ghost.org/) blogging system. I used this theme for my website for a long time, so reusing it allowed me to start from a familiar base. I've made plenty of changes, and I plan on making even more, but it's an incredibly strong foundation to build from. I've ended up with something that's distinctly mine without having to start from scratch.

### Typography

Rely on Typography for the core design elements. It's easy to make typography look decent![^2] Heavy use of text is rarely a bad idea. The pitfall of this strategy: choosing fonts is hard. So let the user's system choose for you! You can use the system default font stack with this CSS snippet:

```css
body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
		Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
```

The font will be clean, comfortable to read, and goes well with pretty much anything. You might lose out a bit on making your site stand out with its body text, but you'll find it's far easier to choose the wrong font than the right one.

---

# My Process

This is where this article becomes a bit comical. Prepare to be dismayed at my redesign process!

### Project Comet

I started by using Project Comet (since renamed to [Adobe Experience Design](http://www.adobe.com/products/experience-design.html)) to _sketch_[^3] out what my website would look like on mobile devices. I spent a lot of time learning the tool while iterating on designs.

When I design a website it tends to involve a lot of staring at the screen, questioning "What purpose does this element serve? Is there a better way to present it?" over and over again. Eventually I get a rough outline finished and begin translating the designs into code.

### Jekyll Boilerplate

I knew I wanted to use Jekyll because of GitHub pages -- but using Jekyll doesn't mean you have to start with the default `jekyll new` template. There are many alternatives out there -- I had seen Hugo Giraudel's [starter template](https://github.com/HugoGiraudel/jekyll-boilerplate) before and I liked the simplicity and sane defaults he used. It made more sense to me to start from this template instead of the stock one, especially since I had previously [submitted some updates](https://github.com/HugoGiraudel/jekyll-boilerplate/graphs/contributors) to the project myself.

### Sass Boilerplate

As it turns out Hugo also has a [preferred Sass structure](https://github.com/HugoGiraudel/sass-boilerplate) that resonates with me. The next step after downloading Jekyll Boilerplate was integrating this system into the Jekyll's Sass directory (pretty straightforward).

### Sass Plugins

Plugins are bae[^4]. There's always a balance to strike between using third-party code and bloat, but I had some distinct areas I thought plugins might be appropriate in. Animations are always a popular choice to use libraries for, and I also wanted to see if I could use a vertical rhythm library. Over the course of my redesign I spent a lot of time with the following libraries.

##### Repaintless

I'm a big proponent of web performance; one of the things you want to avoid doing is triggering website repaints. [Repaintless](https://github.com/szynszyliszys/repaintless) is a CSS animation framework that doesn't cause a browser repaint. I had read about it before and saved the link hoping I could use it in a future website. I tried to use Repaintless for the navigation dropdown animation, but unfortunately it didn't work out. Since my menu animation was the only animation I would be using, I decided a slight performance hit would be ok. I ended up not using Repaintless at all.

##### Sassline

I had heard a lot about Vertical Rhythm and wanted to try to integrate it into my project. Sassline was one of the first libraries I heavily investigated; it seemed pretty solid and (relatively) easy to configure compared to some of the other alternatives I had found. After spending some time trying to integrate the library I realized I was fighting an uphill battle and it wasn't going to be compatible with my design. I cut it out of my site and moved on.

##### Sass Burger

I had used this in an earlier project and knew it was an easy drop-in library to use. I didn't hesitate in returning to it to create the menu animation.

##### Typecsset

I returned to Vertical Rhythm, this time checking out [Typecsset by Harry Roberts](http://csswizardry.com/typecsset/). I spent more time with this library than Sassline, but it still didn't feel right - and text on my posts quickly fell out of sync because of inlined images and other embedded objects. At this point I realized Vertical Rhythm was going to be a much more complicated process than I had anticipated. While it would be nice to have, I was guaranteed a great typographical foundation already thanks to building off of Ghost's Casper CSS; a slight increase didn't seem worth the effort and routine maintenance it would involve. I decided to forgo Vertical Rhythm and move on.

##### Sass Breakpoint

I've seen [Sass Breakpoint](http://breakpoint-sass.com/) in a lot of posts, so it was a natural place to start for a media query Sass mixin. After poking around the source code for a bit (always a good way to learn about and evaluate libraries) I realized that Sass Breakpoint required Compass and discovered [just how complex the code was](https://github.com/at-import/breakpoint/tree/2.x.x/stylesheets/breakpoint). I decided I could find a better alternative for my use case and moved on. This library never made it into my code; I ended up vetoing it before I even tried to integrate it.

##### Include Media

I probably read twenty articles about defining your own breakpoint mixin system, but none spoke to me. For how few Media Queries I use on this site, it might seem silly to care so much about finding the perfect breakpoint plugin - I wanted a project I could use in future websites though, and this was a great opportunity to pick one up.

Eventually I found [Include Media](https://github.com/eduardoboucas/include-media). Initially, I wasn't a huge fan - I didn't like the string approach, even though I did like how it allowed for designating `> < >= <=` and other such operators. I sat on it for a bit and poked around some other libraries. I kept coming back though and thinking about how Include Media had approached things. It began to grow on me. The one thing I couldn't get over though, and this is probably because of my coding background, is how you had to write it as `'>phone'` instead of `'> phone'`. Adding the space broke the library, and (I kid you not) this was **very** close to being a deal-breaker. _(This says a lot about me, I agree)_

I [reached out to Hugo](https://twitter.com/HugoGiraudel/status/758394788450340864) to figure out if the library breaking with an added space stemmed from a technical limitation or not, and found out it didn't. I hadn't seen a `trim()` Sass function before but figured one must exist; after searching on GitHub I found one (written by Hugo, surprise surprise) and spent some time figuring out where it would need to go. After I pinpointed the best spot I went ahead and [submitted a pull request](https://github.com/eduardoboucas/include-media/pull/138). The team was incredibly gracious and went ahead and merged the change.

[Oops](https://github.com/eduardoboucas/include-media/issues/139). As it turns out, I caused a bug. I felt really, really guilty about that. It's never a good feeling when you cause issues for people. I felt an obligation to track down the cause and submit a fix - due to some great debugging skills from [@danez](https://github.com/danez) and others we were able to pinpoint the problem to an error in libsass's `str-slice` method. A few of my C++ savvy friends I [frequently collaborate with](http://companyinc.company) thought it would be fun to jump in and help fix the bug. We were able to figure out that it was a negative index issue on strings of length 1. I submitted a [fix](https://github.com/sass/libsass/pull/2133) and [test case](https://github.com/sass/sass-spec/pull/883) for the bug.

A lot of effort because I couldn't get over not writing it as `>phone`, eh?

_**Update:** Months later, and this hasn't yet been fixed. This seems to stem more from libsass being a [bit stagnant](https://github.com/sass/libsass/releases). There is a release candidate that's recently been pushed, so I'm hoping we see this patch available soon. In the meantime I sucked it up and wrote my media queries as `>phone`, but I am **itching** to change them._

_**Update 2:** Naturally it's released just days before I publish this post..._

### CSS Style and Naming

I designed the layout of my site in Flexbox - I've been using it for a year now, and I love it. I cannot recommend it highly enough. There are some articles out there about CSS Grids, when using Flexbox is appropriate, and when Floats are better - but my rule of thumb right now is "Flexbox Everywhere."

```bash
ianm in ~/Sites/ianmitchell.io/assets/sass on master [+]
➜ grep -ir "float" .
./base/_base.scss:  float: left;
./vendor/_syntax.scss:    .mf    { color: #099 } // Literal.Number.Float
```

Of the two `float` references in my CSS, one is a comment about syntax highlighting and the other was imported from Ghost and likely to be refactored out in the future.

I could go on and on about Flexbox, but in short:

- [It's well supported](http://caniuse.com/#feat=flexbox).
- It's a little difficult at first, but becomes straightforward once you understand it.
- I use [this cheatsheet](http://jonibologna.com/flexbox-cheatsheet/) from time to time.
- Take the dive and use it. Seriously.

There are a ton of resources and articles that do a brilliant job teaching flexbox. Learn it, use it, love it.

### Favicon and Head

During one of my obsessive "check every page and find things to fix" sessions I got annoyed at how many network requests my list of favicon images was generating. I tried to switch to a single SVG, but unfortunately browser support is pretty poor. I ended up scrapping the SVG system and accepting that several versions of my favicon would be downloaded (the fact we don't have a better way of doing this is absurd).

### Cover Images

So this bit gets funny. I knew I wanted to keep cover photos, but I wanted a low-resolution image as a placeholder and then have a script scale it up after the main content had been loaded. I spent a long time cropping a test image to the right size and then downscaling it. I discovered pretty quickly that I am most definitely not a designer - I knew there were different types of blurs, but I didn't realize just how many there are. I spent two days trying out different sizes and resolutions attempting to find the best combination, but I couldn't find one that worked consistently across the different images. I decided to take a break and import all my old posts along with their cover photos over to the new blog. I realized I would need to resize every cover photo - rather than doing it by hand I wrote up a quick script to do it for me. "Aha! Ian, you're a coder not a designer. Why don't you try to write a script to generate the thumbnails for you?" I thought to myself.

I'd like to pause here to remind everyone I had previously spent two days working on these thumbnails by hand.

I looked into the rmagick documentation, and wrote some insanely complex Ruby to generate the thumbnail for me:

```ruby
thumb = img.resize_to_fill(45, 45).blur_image
thumb.write("assets/images/thumbnails/filename.jpg") { self.quality = 50 }
```

I ran the script, and the results absolutely demolished what I had done by hand. I happened to be visiting my parents when I wrote this script, and while they thought my lack of wit was the funniest thing ever, I was decidedly less amused. Moral of the story: don't ever ask me to do something in photoshop.

I now had a set of images to display to desktop browsers, but I wanted a second set of smaller images to display for mobile users. I began researching how to use a `picture` element and have the image based on screen resolution. I was surprised there was so little on it. Using a standard `div` with a media queries to set a different `background-image` (the correct, simple solution) just didn't occur to me for an embarrassingly long time. I rationalize this mistake by telling myself it was because I was still stewing over my Ruby script.

I'm not a proud man.

### Menu JavaScript

I returned to my menu to write some JavaScript to allow a "cancel" click. When the user opens the menu and then clicks elsewhere on the website, the menu should close. This was a quick process; I just had to leverage [event bubbling](http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing).

### Jekyll 3.2 Upgrade

It took a day or two for me to figure out Jekyll 3.2 had been released, but when I learned about it the next step immediately became updating. For the most part it was a seamless back-end focused change, but it alerted me to a problem in my site. As it turns out, my [Ghost](/blog/ghost) post had been getting distorted due to Jekyll's Liquid Templating. I had never noticed before; after the 3.2 upgrade the build process complained that there was something wrong.

Jekyll 3.2 also introduced the `link` Liquid tag. I converted my `pages` directory into a collection and switched my links over to use this new tag - everything is a little cleaner now!

### MVP or Perfect?

After working through the above problems (and at the time I write this paragraph), I could probably ship an initial implementation of this website. A large portion of the content is unwritten, but to be fair it isn't published on the current site either. I decide(d) to move forward a little bit and try to finish up some of the missing content before I publish the redesign, however; my current design works, and while shipping early is a great thing there's no rush for this particular project.

### Month and a Half Break

A month and a half after I wrote the above and I haven't gotten around to finishing any of the written content. Life decided to show up and pay a visit; family came to vacation with us, I went to [PAX](http://west.paxsite.com/) with several of my Company Inc. coworkers, and my computer decided to have a meltdown. That was fun.

### Final Touches and Revisions

At this point, releasing a little early is beginning to look more appealing. It's less from a pressing need to do so and more from the desire to see my work published; I identify a few areas I need to touch up before publishing and commit to getting them done and releasing the redesign.

### 3 Weeks Later: Hah, JK!

That above promise worked swimmingly. Ok, so I barely touched any of the above. And I discovered a few other issues along the way related to performance. Most concerning is my image preloader (for the post header) doesn't actually work. This one really bothers me. Luckily, I'm already aggressively optimizing the images so the total pageweight is still ~350kb, but it could be around 200kb if I fixed that bug. At this point, I need to decide if I just ship it and work on fixing it after or if I try to fix it beforehand. I'm leaning towards the former; I have a sneaking suspicion (hope?) that GitHub will have an aggressive caching mechanism for GitHub Pages that will turn this into a non-issue, as the second request will just return a 302 Not Changed and we'll be good to go. On the other hand, when has hoping for the best ever worked out?

I need to make a decision, but I also need to fix the CSS, finish the "What I use" page, clean up the Bookmarks page, finish the About page... yikes. More work than I thought.

I should mention I toyed around with data files and collections for two days when I was working on my Bookmarks page. I thought it would be cool to have a yaml file that looks like this:

```yaml
template:
  name: Template name
  description: Index page collection description
  links:
    section:
      name: Subheading Title
      items:
        - name: Item 1
          url: Item 1
          description: Item 1
        - name: Item 2
          url: Item 2
          description: Item 2
```

I could split up the (huge) bookmarks page into different categories and make things a little more manageable this way. It turns out that you can't easily generate pages based on data files though. For each data file I had, I would have to make a collection page that references the data file... at that point, it didn't seem worth it. I'm worried about the performance of the massive Bookmarks page though, so I might be looking to break it up manually in the future.[^5]

### Week of Work, Day 1

Apparently I never compressed my images. It's important to have a checklist, folks. Anyways, that's done now. Unfortunately I also need to import my resume and other project files, so that TODO item has been immediately replaced. I finished a rough About page design, but I need to find a few SVG images to use. Not looking forward to that.

### Real Work Picks Up

And then I hit the busy season. For several weeks, real work occupied most of my time and I unfortunately wasn't able to dedicate much time to this project. But Zillow released some really cool products, and I'm incredibly excited to see the impact they have. I was more than happy to put this project aside for a bit to focus on shipping some big things.

Turning to the future, we're coming into the Holiday season - it's the perfect opportunity to spend some time on the finishing touches and get this site out the door!

### Next.js

Oh man. Where to even begin? This is about to turn into a Zeit HQ love sonnet. Zeit released a universal JavaScript library called [Next.js](https://github.com/zeit/next.js) and it's everything I've ever wanted (this seems to be a pretty common reaction to anything they release). I spent a day or two contemplating whether I should ditch Jekyll and move to Next or not; after a few quick test projects I realized that the library was a little too new and had some bugs that would prevent it from fitting my needs. One of those issues is the lack of Markdown integration; without that, I don't have a great way of transferring my blog posts over in a reusable format. But it is _definitely_ worth keeping an eye on.

### Another break, and Markdown JavaScript

At this point I'm gonna stop detailing the breaks I take. It's coming up on Thanksgiving weekend, and I'm hoping I can just release some stuff soon. My new takeaway is to try to keep posts to ~4 paragraphs max. My Pokémon GO post is an example of what I hope to start publishing (and one of several posts I've written since starting the redesign that I have yet to release).

In other news, I've began planning my next redesign. Like I mentioned above, I'm curious what I can do with Next.js, but the Markdown issues gave me pause. Well, [this markdown library](https://github.com/threepointone/markdown-in-js) was just released which is looking pretty much like what'd I want. So, yeah... maybe in the future. I would love to have more control over my website, and the opportunity to integrate service workers and other cutting edge JavaScript features to showcase what I can do is incredibly appealing. But before I start working on that, I need to finish this project.

So what remains? Basically some writing. I want to finish this post (as I write this paragraph, large sections are unwritten / stubbed out. It could probably use some extensive editing as well). My About page is sparse and has an SVG color issue I need to fix, and the image duplicate download bug still exists. And I need to finish the "What I use" page.

Luckily, the new Pokémon game just came out so I'm sure this will all happen really soon.

### And then I was done

Believe it or not, I'm done. I suppose this is kind of due to my brother. He took an interest in Pokémon so I bought a New Nintendo 3DS XL for myself and gave him my old one... along with my charger. I forgot to get a new charger for myself ([THANKS NINTENDO](http://www.polygon.com/2015/1/14/7547465/new-nintendo-3ds-xl-charger-ac-adapter-warranty)), and seeing as how it's Black Friday I won't be able to find one anytime soon. So I've been left with some free time!

I tried to fix up the SVG icons and didn't make much progress in the half an hour I allotted myself. I need to spend some time researching SVG; in the meantime, I cut the icons out entirely. I'll come back to them some other time in a future release.

With those out of the way, I bunkered down and hammered out some writing. I finished up the About page, cut out unfinished bits elsewhere, did a quick pass through my two new posts, and then sat down to finish this post. There's still a lot for me to do, but what I have now is good enough to ship. I'm looking forward to slowly expanding on this design in future updates, and I do plan on moving off of Jekyll shortly. I'm excited to see what happens next!

# Conclusion

And thus concludes my tale of how a pretty simple redesign ended up taking over four months. Have a "small" personal project that's stressing you out because of how long it's taking? I wouldn't worry about it. You aren't alone.

![Post Redesign State](/images/posts/redesign_state.jpg)

[^1]: This post is gonna paint me in a bad light mostly for humor's sake; In my defense, I juggled a lot of personal projects while working on this redesign. Updating my website wasn't a pressing concern since I was mostly happy with the last design I used. So if you're a potential employer please don't pass on me because of this post 😅
[^2]: I'm so sorry to all the designers I just offended. I know it's more complicated, but for a developer without much insight into the world of design it holds true basic typography is a crutch
[^3]: This is the designer equivalent of a dad joke
[^4]: This phrase was hip when I began writing this post I swear
[^5]: This would be quick to fix with a custom plugin, but that would mean I would have to either leave GitHub pages or add a precompile step. I didn't want to go down either of those paths.
