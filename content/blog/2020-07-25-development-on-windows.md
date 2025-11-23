# Development on Windows

Windows 10 has become a compelling alternative to macOS for web development. I've been using it daily for several months now, and while it isn't perfect I've been enjoying it. As more of my tools become cross platform Windows has become a more viable option for me, and I don't find myself switching to macOS to do that 'one little thing' nearly as often as I used to.

## Guides

While I was setting up my environment, I found the following websites helpful:

1. [Ruby on Rails on Windows is not just possible, it's fabulous using WSL2 and VS Code](https://www.hanselman.com/blog/RubyOnRailsOnWindowsIsNotJustPossibleItsFabulousUsingWSL2AndVSCode.aspx) by Scott Hanselman
2. [Moving Your JavaScript Development To Bash On Windows](https://www.smashingmagazine.com/2019/09/moving-javascript-development-bash-windows/) by Burke Holland

## Caveats

There are still performance issues using Windows and WSL2. Compile times aren't lightning fast when I am working with Next.js and the new react hot loader seems to be pretty finicky. I've seen tweets containing potential fixes that you can try to speed things up (adding folders as Windows Defender exceptions seems to be a popular one) but nothing has been a silver bullet for me. That said, the experience isn't bad enough for me to throw in the towel. It can be frustrating, but I've seen a lot of improvement over the past year and am pretty optimistic about how the next few months will go.

It is also worth noting there were several packages also weren't installed the way I expected them to be. I'm pretty shaky when it comes to Linux so this is likely a product of my own shortcomings, but when I installed PostgreSQL it attached to a different port than the expected default. I encountered a lot of problems connecting to it over a socket - it ended up being easier for me to use PostgreSQL on Windows proper. But I think it's genuinely exciting you can run an application on WSL that talks to something running on Windows - and bridging the two ecosystems together was actually really simple!
