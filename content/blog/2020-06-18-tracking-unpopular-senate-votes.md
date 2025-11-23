# Tracking Unpopular Senate Votes

During the impeachment of Donald Trump there was a lot of discussion about how fair and just the power distribution in the Senate is. A lot of publications were running articles that described the vote breakdown in terms of Senators and the population they represented. Readers began to realize that a lot of the Senate votes were 'unpopular' - that is, they passed or failed due to votes from Senators representing smaller populations than their opposition.

In order to help visualize this problem and to provide a resource for further discussion, I created a website that shows this breakdown for each vote over the past two decades. You can find it here: [https://senatevotes.us](https://senatevotes.us).

Working on this project was interesting - it's a mix of scripting API requests (mostly from [ProPublica](https://projects.propublica.org/api-docs/congress-api/)) and manually creating JSON files from various population formats provided by the Census. I tried out the new Static Site Generation features from Next.js, and while unfortunately it meant I couldn't use Vercel to host it (the website blows past their 10k file limit) it gave me the opportunity to try and evaluate Netlify. I also tried out Tailwind CSS with this project, which was an interesting experience.
