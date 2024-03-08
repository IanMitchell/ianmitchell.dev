---
title: Sending LogDNA Alerts to Discord
date: 2021-07-16
excerpt: Here's how I used Webhooks to send LogDNA Alerts to my Discord server
---

So turns out I broke [Sentry → Discord](https://sentrydiscord.dev) last week... oops. I have it hooked up to [LogDNA](https://www.logdna.com/) to log events and errors, but I, uh, don't actively check it. After I discovered the issue, I spent a little bit of time setting up a dashboard for it that sends a webhook alert to my Discord channel.

The process was actually surprisingly easy. If you go to Settings -> Alerts under your organization, you can create a custom Webhook that looks like this:

![LogDNA Alert Webhook](/images/posts/logdna_alert.png)

My custom payload:

````json
{
	"username": "LogDNA",
	"avatar_url": "https://assets-global.website-files.com/603024253162e837e0c31b6f/603024253162e8e6eac31e49_LogDNA%20webclip.png",
	"embeds": [
		{
			"title": "{{name}} Alert Triggered",
			"description": "{{line}}\n\n```{{query}}```",
			"url": "{{url}}",
			"color": 16711680,
			"footer": {
				"icon_url": "https://assets-global.website-files.com/603024253162e837e0c31b6f/603024253162e8e6eac31e49_LogDNA%20webclip.png",
				"text": "LogDNA Alert"
			},
			"fields": [
				{
					"name": "Level",
					"value": "{{level}}",
					"inline": true
				},
				{
					"name": "Matches",
					"value": "{{matches}}",
					"inline": true
				},
				{
					"name": "App",
					"value": "{{app}}",
					"inline": true
				},
				{
					"name": "Host",
					"value": "{{host}}",
					"inline": true
				},
				{
					"name": "Tag",
					"value": "{{tag}}",
					"inline": true
				}
			]
		}
	]
}
````

You might want to change the parameters before triggering (on every presence is aggressive - my site doesn't get much traffic), but otherwise just plug a new Discord Webhook URL into the field and go! I made a new view that filters out any non-error log messages and then attached the new alert to it. When executed, it looks like this:

![LogDNA Alert Discord Embed](/images/posts/logdna_discord.png)
