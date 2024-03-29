---
title: Smashing Conf
date: 2016-10-08
---

I kept meaning to write up a blog post about my Smashing Conf reflections, but six months later and I have yet to do so. Accepting my fate as a slacker when it comes to this site, I'm just going to dump my (slightly edited) notes from the conference. If you have any questions, reach out to me via email or [Twitter](http://twitter.com/ianmitchel1)!

Smashing Conf was a lot of fun, and San Francisco is a wonderful city to visit. I'm looking forward to attending again this year!

# Smashing Conf SF 2016

### Workshop Notes

- Responsive design is the pain point
- Avoid media queries with flexbox
- When you start designing, don't start with the page
  - Forces you to think about components / responsive behaviors
    - Takes a lot of time to design this without a result (have to finish to receive feedback)
- Visual Inventory to inform direction
- Project asset hub, sorted chronologically
  - All documents related to the project go here
- Pattern libraries help maintain projects over time
- On redlines: "The worst thing as a designer is when the developer gets creative"
  - Takes a ton of time to create redlines
  - With pattern libraries, you just describe component patterns - much easier / faster, leaves more time for design
- Names in a pattern library are very important
- Establishing Modularity
  - Vocabulary - need to be understood and used day to day
  - Grammar - identify simple rules on how parts fit together
    - "Vertical spacing for a module is always proportional to the line-height of the base font size"
  - Language - Design as assembly of flexible, distinct, modules
- PageLayers - allows you to export HTML+CSS -> Photoshop as layers
- [lonelyplanet/rizzo](https://github.com/lonelyplanet/rizzo) - good open source tool for remote teams
- [salesforce-ux/theo](https://github.com/salesforce-ux/theo)
- Don't hide elements you want to drive traffic to (hamburger menus)
- Navigation is used to get an idea of what the page is about, not just to navigate
  - Hamburger menus are often opened, menus read, and then closed to get an idea of what type of content is on the site
  - Put a close icon where the menu icon is; so if you open, you can click again to close without moving the mouse
    - Big usability win
    - `"|="` menu becomes `"x |="`
- [http://responsive-jp.com](http://responsive-jp.com)
  - Great way to think about design challenges
- Bottom middle is where the most common navigation elements should go
  - Easiest to get at for the user across mobile / tablet screen sizes
- Responsively size icons + logos
  - Change them at different breakpoints
  - viget.com/inspire article on this
- Favicon is a good place to convey state too
  - WhatsApp displays a red alert on their favicon when offline, normal when online
  - Use for production / staging server identification
  - pamelafox tweet
- For complex responsive designs, use canvas instead of svg (maps, seating charts, musical charts)
- Codepen for "adaptive map" (iframe vs image loading based on screen size)
- Reorder elements using flexbox value in media queries
- `margin-top: auto;` works on flexbox items now (drops to bottom)
- Use @supports (display:flex) or @supports not (display: flex)
- use currentColor to define color dependent items - very well supported
  - ie, to set a button's border / icon color based on text color
- Modular load - render first 1,000 pixels, then load the rest
- Use async/defer on scripts always
- Javascript window/document.visibilityState
- guardian/frontend
- Aim for a speedindex of under 1000 (webpagetest)
- HTML5 preload for initial article (js script to insert a link to it at the end of the page)
- Delay webfonts for a large perf increase

### Day One

1. Offline, but tweet (#smashingconf or @smashingmag) and use slack 🙄
2. Proper Etiquette For The Advancement of Design by Dan Mall
   1. Dark Dining
   2. Being a great graphic designer isn't enough
      1. You need the proper setup
      2. You need to bring everyone along with you on the journey
   3. Three parts
      1. Bad News
         1. All design projects start here
         2. We're wasting money, we're being inefficient, we look bad
      2. Good News
         1. Research (talk to people)
            1. Three questions
               1. Why redesign the site?
               2. Why redesign the site now?
               3. How will we know if the new site is better than the old site?
         2. We can prioritize your goals
            1. Determine objectives
         3. Articulate what success looks like
            1. Objectives & Key Results
               1. Objectives are vague, Key Results are measurable and defined
               2. Improve Usability -> 25% faster initial page load + Double people who agree with "site is easy to use" in survey
         4. Design doesn't always require 'design' tools
            1. Map out pattern libraries in a google spreadsheet, not code or sketch. Everyone can participate
         5. We can move quickly
            1. It's easier to revise than create
         6. Be the first to visualize it
            1. OKR-based designs
            2. Element collages
            3. Explain why, not what
         7. Other notes
            1. Read about the creator's purpose when choosing a font (ie, Graphik)
            2. FF Quadrat
      3. So what?
         1. It makes people invested
3. Atoms, Modules, and other Fancy Particles by Alla Kholmatova
   1. Brad Frost: Atoms > Modules > Organisms > Templates > Pages
   2. Pattern Library
   3. What is a system?
      1. Donella H. Meadows - Thinking in Systems
      2. A system is more than a collection of elements
      3. Purpose of a Design System
         1. Produce coherent patterns that facilitate / encourage certain types of behaviour
      4. Connections
         1. Semantic
            1. Start with the language, not the interface
            2. Name things based on their global function
            3. Name things collaboratively and refer to them by their names
            4. Shared vocabulary
         2. Structural
            1. Organisms (Standalones)
            2. Molecules (Helpers)
            3. Structure matters less than it being shared and understood
4. CSS for Software Engineers for CSS Developers by Harry Roberts
   1. Writing CSS in a style borrowing from Software Engineers
   2. DRY (Don't Repeat Yourself) / Single Source of Truth
      1. DRY is what you do, Single Source of Truth is what you get
      2. SST means key data should only exist once (makes modifications simpler)
      3. DRY is important in source, not production
      4. Avoid going too far; don't DRY if it's repeated coincidentally
      5. Repetition is better than incorrect abstraction
   3. Single Responsibility Principle
      1. Do one thing only, and do it well
      2. Easier to reason about
      3. Easier composability
   4. Separation of Concerns
      1. Don't write DOM-like selectors
         1. "header nav ul li a \{…\}" makes assumptions about DOM layout
      2. Don't bind CSS onto data-\* attributes
      3. Don't bind JS onto CSS classes
      4. Only bind CSS onto CSS-based classes only
      5. Writing CSS in JS Modules violates this
   5. Immutability
      1. An object can't be changed after it's created
      2. Helps debugging
      3. Makes things predictable
      4. Reduces cognitive overhead
      5. ie, setting ".col-6" to 50% on large screens and 100% on small screens violates this
         1. .col-6 and .col6@sm instead
      6. Use !important on utility classes, since it should trump all else
         1. Often run into specificity issues. Block = center align, with an h2 left align - the block takes precedence.
   6. Cyclomatic Complexity
      1. The number of branches in a decision tree
      2. A form of static analysis
      3. Counting number of paths through a program
      4. The higher the complexity the worse it is
      5. div.main section h1 a span \{…\} is bad - we only care about the span
         1. Use .text-highlight instead!
      6. Deeply nested selectors are bad
   7. The Open/Closed Principle
      1. Very very useful for group projects and legacy code
      2. Everything should be open for extension, but closed for modification
      3. Never change anything at its source
         1. Creates a domino effect
         2. Visual regressions
      4. Easier to track the knock-on effects
      5. Only change to correct errors; new features or changed features should be in a new class
      6. Everything is opt in
      7. Safe way to make changes
      8. Creates a safety contract - not only does it require a CSS change, need to opt in on the markup side as well
         1. Metaphor: it takes two keys to fire nuke
   8. Orthogonality
      1. Reduces interdependence
      2. Improves composability
      3. Separates concerns
      4. Good litmus test: can we reorder imports?
      5. The implication is they don't rely on one another
      6. Hallmarks of a flexible and modular system
      7. Will it nest?
      8. Can things be combined in the DOM?
      9. Well-scoped selectors improve
   9. Tools
      1. Immutable CSS
      2. Link for Grid System information being tweeted out (personal or @smashingconf?)
5. Beyond the Browser by Tom Giannattasio
   1. Mandarin is most commonly spoken language @ 850m speakers
   2. HTML sites are at 1 Billion (not pages, sites)
   3. Benefits of a hybrid app
      1. Don't need to worry about different browsers; you define the box
      2. One central code base
      3. Vibrant community
      4. Performance benefits - not competing for resources
   4. Electron
      1. cool color scheme
      2. Be careful with file systems; you have full control
      3. Osaka font
   5. attasi.com/hybrid
6. Photoshop is dead! Editing Images in CSS by Una Kravets
   1. Lots of cool color Math
   2. http://una.im/CSSgram
   3. arttheweb.com
7. Yesterday's Perf Best-Practices are Today's HTTP/2 Anti-Patterns by Ilya Grigorik
   1. http://istlsfastyet.com
   2. It's here, support is pretty good
      1. All modern browsers support it
   3. Requires TLS connection (secure)
      1. ~62% of TLS requests are HTTP/2
   4. Server support is pretty good as well
   5. What is HTTP/2?
      1. Protocol for low-latency transport of content
         1. Improve end-user perceived latency
         2. Address the "head of the line" blocking
         3. Not require multiple connections
         4. Retain semantics of HTTP/1.1
      2. Four important concepts
         1. One TCP connection
         2. Request -> Stream
            1. Streams are multiplexed
            2. Streams are prioritized
               1. Can say "put x% on this resource, y% on this other resource"
               2. Fine grained control
               3. Can declare dependencies
               4. Not yet exposed to developers, but will be soon
         3. Binary framing layer
            1. Prioritization
            2. Flow Control
            3. Server Push
         4. Header compression (HPACK)
            1. Can mirror benefits of websockets (or do better!)
   6. Radio consumes a ton of energy (polling is really bad for battery)
      1. HTTP/1.x and HTTP/2
      2. If third party services are doing this (analytics), audit and remove it
   7. Reduce DNS lookups
      1. HTTP/1.x and HTTP/2
      2. Unresolved names block requests
   8. Reuse TCP Connections
      1. HTTP/1.x and HTTP/2
      2. Connections are expensive - HTTP/2 is really important especially since a single TLS connection
   9. Use a Content Delivery Network
      1. HTTP/1.x and HTTP/2
      2. Page rendering is latency-bound (most of the time)
   10. Minimize number of HTTP Redirects
       1. HTTP/1.x and HTTP/2
       2. Each redirect restarts the fetch process
   11. Eliminate Unnecessary Request Bytes
       1. HTTP/1.x and HTTP/2 (HPACK helps)
       2. Unnecessary metadata (eg headers) add up quickly
   12. Compress Assets During Transfer
       1. HTTP/1.x and HTTP/2
   13. Cache Resources on the Client
       1. HTTP/1.x and HTTP/2
   14. Eliminate Unnecessary Resources
       1. HTTP/1.x and HTTP/2
   15. So what's different for HTTP/2?
       1. Parallelism is limited by number of connections (in practice, on HTTP/1.x it's six connections at a time per origin)
          1. Domain sharding isn't a silver bullet. Abuse of sharding leads to congestion, retransmissions, etc.
             1. In practice, you should have two domain shards - anything higher ends up causing more harm than benefit
             2. Domain Sharding is really bad for HTTP/2, since you get rid of prioritization and lose out on HPACK compression benefits
             3. tl;dr: HTTP/1.x = 2 domain shards, HTTP/2 = no domain sharding
             4. HTTP/2 can coalesce connections on your behalf if Hosts resolve to the same IP and if valid TLS certs for each
                1. HTTP/1.1 -> opens new connections to each origin
                2. HTTP/2 -> reuses the same connection for altName origins
          2. Another technique is reducing requests
             1. Concatenation is a popular technique
                1. Parallelism workaround, improved compression in HTTP/1.1
                2. Delays processing and execution, expensive cache invalidations
                   1. Single byte change forces full fetch, redundant data transfers on update
                3. Should I ship 100+ modules?
                   1. Probably not!
                   2. Each request has own overhead on the client, eg dispatching an IPC querying the cache.
                   3. ~dozens of files that provide optimal tradeoff between cache reuse and request overhead.
                      1. Thousands of files shipped to client is a bad idea; be wary of extremes.
                      2. Think from the angle of cache invalidation
             2. Inlining is another popular solutions
                1. These can't be cached independently
                2. Breaks resource multiplexing and prioritization of HTTP/2
                3. Use server push instead
                   1. Very helpful when user requests page + js + image, return the three files instead of a full round trip saying "request these other files as well"
8. Vision, Hearing, and the Brain: 10 Things About Perception by Susan Weinschenk
   1. Peripheral Vision Gives the Gist of the Scene
      1. Peripheral vision tells us if we are where we think we are
      2. Central Vision vs Peripheral Vision especially noticeable on a large monitor
      3. Eye tracking only measures central vision
   2. Peripheral Vision "decides" where you look next
      1. Three Questions
         1. You check into a hotel on a trip, vintage old fashioned hotel, faucet looks like the two +'s. You want lukewarm water to come out
            1. My A: Turn clockwise, 90deg on hot 45deg cold
         2. Needle 1/4 of the way down a meter, what way do you turn knob?
            1. My A: Clockwise
         3. You have a circle divided by four quadrants, what would you label them? (A/B/C/D where?)
            1. My A: Upper right A, bottom right B, bottom left C, top left D
   3. People Have Mental Models
      1. Your mental model makes sense, most reasonable people will share it. It feels right
         1. Not true!
   4. There are Generational Differences in Tech Expectations
      1. What tech you used before puberty shapes you
      2. The median age of someone in the US is 37
         1. On the planet, it's 29.9
         2. In Africa, ranges from 14-20 to 20-25
      3. Myth or truth? More Americans >65 than &lt;14
         1. Myth: 60mil for under 14, 20% -
   5. You May not Be your Target Audience
   6. Some Things Change and Some Things Stay the Same
      1. Neuroplasticity
   7. Sex And Social Always Sells
      1. Snapchat!
   8. Transience Is Coming More Valued
      1. Snapchat again!
   9. Cell Phones are Stand-Ins For Our Entire Social Network
   10. We WILL Have Relationships with Robots
       1. Japan is exploring this right now to deal with population age issues
       2. "Brobots"
9. Addicted to Community by Jeff Atwood
   1. Programmers love to argue, they're very good at rules lawyering
   2. Our generation got into programming through games (this is fun, I'll create my own) but now it's Minecraft
   3. The best way to learn is to teach
   4. How to talk so kids will listen & listen so kids will talk
      1. Recommended book
   5. It's not about problem solving, it's about empathy
      1. This is very hard for engineers
      2. It's not about the Nail
   6. Forums and stories outlasted the games they were about
      1. The forum game is fun and long-lasting
   7. Another book, 59 seconds
      1. Imagine a negative experience. What's more helpful, talking or writing
         1. Writing encourages the creation of a story, a structure helps people make sense of what happened to them. Resulted in a better outcome
   8. Stack Overflow displays Reminders as people work help resist temptation
      1. Just in time reminder to do the right thing and be who you want to be
      2. Check your emotions
   9. Discourse reminders users posting short posts they can use emoji reactions

### Day Two

1. Mystery Speaker
   1. The Web Image Problem and How to Solve It by Christian Heilmann
      1. A picture is not worth a thousand words - ask the visually impaired
      2. The problem is that we've become picture mad on the web
      3. Inspirational Obesity
      4. Mobile, Tablets, Great Hardware and Fast Connections result in no empathy for users who have less
         1. This is who we should be working for
         2. You can't control the user's platform
      5. Maintenance
   2. Bait and Switch - Jason Fried is here instead for an interview
      1. Basecamp's secret is simplification
      2. Making something people can use, trust, and worked well
         1. The "real" key to success
      3. People in the tech world get bored of tools very easily, but small businesses don't
         1. Tech people aren't looking for tools to use, but for things to experiment with
      4. Most people don't want five or six different products, but want something that packages everything they need together
         1. A DIY toolkit is expensive, and only appealing to tech experimenters
      5. An interop layer / API isn't a problem Basecamp cares about - it's for smaller businesses with less than ten people
      6. 98% of businesses are small businesses - they're a huge market
      7. A weird thing in the tech world is world domination, what's the point?
      8. Don't worry about what everyone else is doing, focus on what works for you
         1. Over-collaboration reduces efficiency
         2. Remote works well since it reduces interruptions
         3. Overlap just a few hours a day
      9. Basecamp doesn't have meetings since they're a waste of time (meeting defined as 4+)
         1. Meetings need agendas and to be organized
      10. Basecamp handles standups automatically, so people can figure out what goes on on their own time
          1. Forced standups are terrible
      11. Basecamp does a social week twice a year for remote workers, since face to face time is very important
          1. Better than video chat, but that's still important
      12. Facebook and Twitter are modern day smoke-breaks
          1. The idea remote workers are screwing around and people in the office aren't is wrong
      13. 40 hours per worker is enough to do a good job. "Working at 7 or 8? Fuck that"
      14. As affluent tech industry workers, we should use our position to push for greater social benefits (ie, I have a kid - I'd like to work from home twice per week)
      15. Everyone is chasing rather than asking themselves what's important
          1. Jason is a big fan of just right, just enough (what's wrong with 10% growth a year compared to 50%? Nothing!)
      16. Breeding a generation of web users who expect content for free is haunting us, and will come back to haunt us even more
      17. Stock is ephemeral - Basecamp focuses on experiences and things like that, which they published on Medium
2. What We Talk About When We Talk About Web Performance by Patty Toland
   1. Filament Group - design and front-end code, good content
      1. Presentation linked on Twitter
   2. Average web page size has more than tripled in the past five years
      1. Coincides with better screens and better networks, though
   3. 2G Network Speeds not limited to the third world
      1. The vast majority (Asia + Africa) are limited to 2G right now
      2. Will continue to be a major concern up until ~2021
   4. Speed issues aren't limited to slower networks
      1. Website visitors care more about speed than anything else on the webpage
      2. High end machines don't always mean a high end network (planes, trains, etc)
   5. "Not Really Our Problem"
      1. Read Tammy Everts for performance impacts (primarily retail industry)
      2. Google has done a lot of mobile performance work
      3. Pew Research Center has been doing studies about behaviour with technologies
      4. WebPageTest has been an incredible game changer
   6. Time is Money
      1. People get frustrated with anything over 2 seconds
      2. This is neuroscience, not entitlement
      3. In retail, this is very very apparent - 2s is the commerce sweet spot
         1. 1s faster = +27% increase in conversions
         2. 25% of customers leave within 4s, >50% after 8s if waiting
         3. Smartphones lead conversion, but only if they're fast
         4. The prevalence of mobile-only shoppers is rapidly growing
   7. Cell phones and smartphones and tablets are growing dramatically, other devices flat or declining
      1. 77% of cell internet users say they experience slow speeds
      2. 15% do not have Javascript-enabled devices (Americans)
      3. 19% of American Adults are smartphone dependent, or have no other internet access
         1. Growing among younger, minority, lower income populations
   8. Ads on Mobile devices are absolutely fatal
      1. They should be looked at extensively and avoided by any means
      2. One of the worst things you can do for performance
   9. Environmental Impacts
      1. Cell Networks are energy hogs
      2. Equivalent of 5 million cars on the road in 2015
      3. Things that download in the background unnecessarily (ads, trackers) are having a huge impact
         1. \$80 billion wasted in power with 'useless' downloads
   10. 2x Compression Experiment
       1. Make the image 1.4-2x of expected size
       2. Progressive checked
       3. Adjust quality to 25-45%
       4. Touch of blur to help with compression algo but not enough to be visible
          1. So, for a 2x image make it 4x and really compress it
       5. This gets an image down to about half the size
       6. This image works for both SD and HD screens! No need for a @2x version
       7. Again, slides are up on Twitter with these details
   11. Audit JS - is it needed? For all pages?
   12. "Cut the mustard" test - test for support before loading resources
   13. Use a fallback font and intelligent loading to prevent Flash of Invisible Text (use Flash of Unstyled Text instead)
   14. Utilize Lazy Loading first, deferred loading sparingly
       1. Only when -absolutely certain- they will be seen
       2. Loading should be opt-in
   15. Load Super low-res images (~2-3k each) on page load, and lazy load higher quality images as the user scrolls
       1. For a 48 product grid, initial page size dropped from 2mb to 450k
       2. Only with explicit action will the user download the full 2mb now
   16. Sites are beginning to get sued over accessibility issues
       1. Netflix and Target hit with ~\$800k settlements
3. Living Design Systems by Jina Bolton
   1. Designing for Scale and Configuration
   2. Lessons learned on first app
      1. Where are the icons? What color is this border?
      2. At the time, they were using redlines
         1. This doesn't scale at enterprise level
         2. Redlines design pages, not products
            1. A fractured process leads to a fractured UX
      3. Style guides are all the rage
         1. [http://styleguides.io](http://styleguides.io)
         2. The key is keeping style guide current and useful
      4. Salesforce1 Style guide presented as a nice example
         1. Partners and customers want to look and feel like salesforce to ease transition for customers
         2. Needed resources and tools to get things done "in the official salesforce way"
      5. Zombie Style Guides are a thing
         1. Successful style guides MUST be living
         2. A style guide is an artifact of design process. A design system is a living thing that exists in an ecosystem
   3. [http://salesforce.com/designsystem](http://salesforce.com/designsystem)
      1. Consistent with Salesforce lightning UI
      2. Great design systems are usable by entire team - @mdo
   4. Works for different team models
      1. Solitary - one person
      2. Centralized - one central team produces and others consume
      3. Federated - multiple teams collaborate
      4. Cyclical - design system informs product design, product design informs design system
   5. A design system isn't a project, it's a product serving products
      1. Should have a roadmap
      2. Should be doing user research
      3. Having a clear vision is very important
         1. Priority order is a key part
         2. Drive design decisions with design principles
            1. At salesforce…
               1. Clarity
               2. Efficiency
               3. Consistency
               4. Beauty
            2. After Salesforce founded principles, it did a UI inventory
               1. Standardized and consolidated everything
               2. Took component notes
               3. List people involved, open ended questions
      4. Many styleguides list colors, but don't show what they're used for
         1. Visual differentiation, components, etc
   6. How do you push updates / keep design system agnostic?
      1. Single Source of Truth
         1. Assets are stored in a repo and updates are pushed everywhere
      2. Design tokens
         1. Atoms of design system
         2. Helps scale across native and web
         3. Font weights, sizes, shadows, spacing, sizing, z-indexes
         4. Instead of listing values, you list tokens (variable names)
         5. Created a tool called `theo` (Open Source)
            1. Converts to Lightning, Sass, Less, Stylus, JSON, XML, Color Swatches
            2. Accounts for style differences
            3. Achieves goal of being Framework Agnostic
               1. No more hard coded values!
               2. Empowers developers to focus on logic and not checking for styleguide adherence
         6. clarity > brevity for naming
            1. Namespaced classes with scoping option
               1. .slds—button\_\_stuff—here
      3. Make things only as you need it (be lean!)
   7. Design systems and tokens can free designers to focus on bigger picture like user flows (small decisions like spacing are dictated by design tokens)
   8. How do you lower the bar for adoption?
      1. Minimize dependencies
   9. No JavaScript
      1. Decision made since things need to work in Lightning React Angular jQuery etc
      2. List states, but don't dictate how state changes in anything other than extensive documentation (ie, show Default and Active and describe how and when that changes in detail but don't actually write the JS)
   10. Support three versions
       1. Current, Previous, Future
       2. Key bit is Deprecation
          1. In Styleguide, add flags to highlight things that are deprecated
          2. Sass Deprecate tool
             1. Define what version you're using in variable, and a mixin to show deprecation version + message
             2. Gives confidence when deprecating
   11. Lots of open source tools available
   12. Slack channel on [http://designsystems.herokuapp.com](http://designsystems.herokuapp.com) available for more discussion
4. The JAM Stack by Mat Biilmann
   1. The new front-end stack
      1. Git centric workflow, front-end build tools, API Economy
         1. Git has taken down FTP
   2. The Old Stack
      1. Breaking down in terms of security, reliability, and performance
         1. ~70% of all wordpress installs are vulnerable to known exploits (WP powers 25% of internet)
   3. Stopped paying attention; not very applicable for us.
      1. Talking about static JSON created during build that you grab with JS and turn into a functional site.
      2. Argues it isn't dynamic, but can't be considered a static site either
5. Alice in Web Animation API Land by Rachel Nabors
   1. Web Animations API
      1. Connects CSS Transitions, CSS Animations, SMIL
   2. Core Concepts
      1. The Timing Model and Animation Model
         1. The When and the What
      2. The Web Animation API is time based
         1. Timelines let us shift time backwards/forward, scaled, reversed, paused, repeated
      3. Stateless Animation
         1. Frame rate independent
         2. Direction agnostic
         3. Seek-able
      4. An animation connects a single tween to a timeline
      5. An animation is like a dvd player and a KeyframeEffect is a dvd
      6. Traditional Animation
         1. Keys are drawings; in-betweens connects Keyframes.
         2. Flash shortens these as "tweens"
         3. KeyFrameEffect tells the animation what something looks like at any given point in time
         4.
      7. KeyframeEffect Constructor
6. Crafting a Creative Culture by Jeffrey Veen
   1. Equanimity - a state of emotional stability, especially in a difficult situation
      1. Grace under pressure
   2. Typekit encountered a failure; had to deal with it
      1. Six devs who could figure it out were sequestered in a room with a dedicated comms person. No interruptions allowed no one could go in, comms person would come out and update the team as necessary
      2. Removed business decisions from tech problems - fix it, we'll worry about the details later
      3. Moral support!
   3. Everything is connected and everything breaks
      1. Design needs to account for this
   4. Everything is user experience
      1. Teams need to be built around that
   5. Teams thrive with equanimity
   6. Google's Project Aristotle
      1. No signal found for successful teams until they looked at psychological
      2. Turned out to be psychological safety
      3. "A sense of confidence that the team will not embarrass, reject, or punish someone for speaking up"
      4. Our notion of work comes from factories
      5. Don't create tension, don't try to control team members. Amplify what you find compelling - keep environment relaxed, but focused.
         1. Environment not just office, but culture and things like that
      6. "Meetings - the practical alternative to work"
   7. Meeting zero: group chat
      1. Group chat has micro confidence boosters (pats on the backs, good jobs, gifs, reactions) that build a culture of trust
   8. Product Review
      1. Optional attendance, mandatory participation
      2. Not a forum for expressing opinions
         1. Bad: I don't like that blue
         2. Better: Why is that blue?
         3. Great: Is color important here?
      3. Working session for a group is identified as a divergent or convergent meeting
         1. Divergence - brainstorming, limitless possibility, "yes and"
         2. Convergence - Evaluating feasibility, acknowledge constraints, drive towards consensus
         3. Be clear upfront about what kind of feedback you're looking for
      4. More exposure to users = better design instincts
      5. More exposure to great work = better design vocabulary
      6. This gives people a sense of good taste
   9. Meeting Two: The Postmortem :(
      1. No one brings the site down on purpose
      2. Fundamental attribution error
         1. Human tendency to look at attributes of person rather than circumstances. "That guy is an idiot for bring the site down" instead of "why didn't we catch this in code review?"
         2. Sakichi Toyoda
            1. "The Five 'Why's" - ask why five times to get to the core of the problem
            2. Ask why until you get to the root cause, generally five times
   10. We measure projects in weeks
       1. We measure priorities in months
       2. We measure vision in years
          1. Everyone should say "my work supports this mission and here's how"
       3. Purpose is timeless
       4. Japanese concept of Ikigai (生き甲斐)
          1. Purpose
          2. If you can quickly say "this is how my work connects to x" lived longer (around 7 years longer)
          3. raison d'être
          4. divine will
          5. nirvana
7. My Handbook by Mark Boulton
   1. Zeitgeist
   2. Distributed, Devolved, Degrading
   3. CERN
   4. Management Style: Marginal Gains
      1. Look at everything, small things add up quickly
      2. Opposite: Marginal degradation
