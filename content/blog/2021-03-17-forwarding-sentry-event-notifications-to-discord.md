# Forwarding Sentry Event Notifications to Discord

Back when I was first working on my Discord bot Aquarius, I added an integration with Sentry to track exceptions and errors. I wanted to receive notifications about these errors when they happened, but unfortunately Sentry doesn't have a Discord integration. I ended up writing a [simple serverless function](https://github.com/ianmitchell/sentry-discord) to take in a Sentry Webhook event and transform it into a Discord embed, and threw it on GitHub. I'm pretty sure this throwaway function is more popular than any other open source project I've done (including Aquarius!) but over the years it's gotten a little stale.

Last weekend I took a bit of time to modernize the function and add some new features. One of the things I really wanted to do was add the event code snippet where the exception happened - it's super helpful for glancing at a report and figuring out if an error is actionable or not. I also ended up making this rewrite into a bit of a SaaS tool. Over the years I noticed a lot of people forking the repository to other platforms, which made it hard for them to consume the upstream changes. It took a little more work to make a hosted web service anyone could use, but it should make it much more useful to everyone.

If you use Sentry and Discord, check it out! [https://sentrydiscord.dev](https://sentrydiscord.dev).
