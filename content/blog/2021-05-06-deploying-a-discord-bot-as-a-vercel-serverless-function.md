---
title: Deploying a Discord Bot as a Vercel Serverless Function
date: 2021-05-06
excerpt: My last post talked about Discord slash commands and some of the benefits of the new HTTP API, but I didn't spend much time talking about hosting. Using HTTP instead of the Gateway for your bot unlocks some cool new options, like hosting it as a serverless function through a provider like Vercel!
---

My [last post talked about Discord slash commands](/blog/creating-a-discord-http-slash-command-bot-with-fastify) and some of the benefits of the new HTTP API, but I didn't spend much time talking about hosting. Using HTTP instead of the Gateway for your bot unlocks some cool new options, like hosting it as a serverless function through a provider like [Vercel](https://vercel.com)!

## Writing a Vercel Serverless Function Bot

We only need to create two files to get up and running - a `package.json` and an `api/index.js` page.

```json title="package.json"
{
	"name": "my-bot",
	"version": "1.0.0",
	"dependencies": {
		"discord-interactions": "^2.0.2",
		"raw-body": "^2.4.1"
	}
}
```

> ℹ️ Raw Body
>
> Some people have reported that the `raw-body` package does not work for them. If your function times out while trying to verify a Discord interaction, try using the following snippet instead:
>
> ```javascript
> const rawBody = await getRawBody(request); // [!code --]
> const rawBody = JSON.stringify(req.body); // [!code ++]
> ```

The only two dependencies here are used to verify incoming Discord requests (an API requirement).

The serverless function looks pretty similar to the [server I created with fastify](/blog/creating-a-discord-http-slash-command-bot-with-fastify). Vercel requires functions be put into an `api` directory - [you can find additional documentation here](https://vercel.com/docs/serverless-functions/introduction).

```javascript title="api/index.js" showLineNumbers
const {
	InteractionResponseType,
	InteractionType,
	verifyKey,
} = require("discord-interactions");
const getRawBody = require("raw-body");

const INVITE_COMMAND = {
	name: "Invite",
	description: "Get an invite link to add the bot to your server",
};

const HI_COMMAND = {
	name: "Hi",
	description: "Say hello!",
};

const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${process.env.APPLICATION_ID}&scope=applications.commands`;

/**
 * Gotta see someone 'bout a trout
 * @param {VercelRequest} request
 * @param {VercelResponse} response
 */
module.exports = async (request, response) => {
	// Only respond to POST requests
	if (request.method === "POST") {
		// Verify the request
		const signature = request.headers["x-signature-ed25519"];
		const timestamp = request.headers["x-signature-timestamp"];
		const rawBody = await getRawBody(request);

		const isValidRequest = verifyKey(
			rawBody,
			signature,
			timestamp,
			process.env.PUBLIC_KEY,
		);

		if (!isValidRequest) {
			console.error("Invalid Request");
			return response.status(401).send({ error: "Bad request signature " });
		}

		// Handle the request
		const message = request.body;

		// Handle PINGs from Discord
		if (message.type === InteractionType.PING) {
			console.log("Handling Ping request");
			response.send({
				type: InteractionResponseType.PONG,
			});
		} else if (message.type === InteractionType.APPLICATION_COMMAND) {
			// Handle our Slash Commands
			switch (message.data.name.toLowerCase()) {
				case SLAP_COMMAND.name.toLowerCase():
					response.status(200).send({
						type: 4,
						data: {
							content: "Hello!",
						},
					});
					console.log("Slap Request");
					break;
				case INVITE_COMMAND.name.toLowerCase():
					response.status(200).send({
						type: 4,
						data: {
							content: INVITE_URL,
							flags: 64,
						},
					});
					console.log("Invite request");
					break;
				default:
					console.error("Unknown Command");
					response.status(400).send({ error: "Unknown Type" });
					break;
			}
		} else {
			console.error("Unknown Type");
			response.status(400).send({ error: "Unknown Type" });
		}
	}
};
```

Make sure you add your Application ID, Token, and Public Key as project environment variables or secrets (for this example, call them `APPLICATION_ID`, `TOKEN`, and `PUBLIC_KEY`).

And that's it! You can deploy this project to Vercel, get a project URL, and plug it straight into your Discord application (make sure you add `/api` to it). Using Vercel as a host for my new bots has worked wonderfully so far.

I have a Vercel-hosted bot you can [test here](https://discord.com/oauth2/authorize?client_id=837785463401087046&scope=applications.commands) or [view on GitHub](https://github.com/ianmitchell/discord-trout).
