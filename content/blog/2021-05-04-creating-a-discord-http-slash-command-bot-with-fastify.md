# Creating a Discord HTTP Slash Command Bot with Fastify

I've been dying to try out Discord's new slash commands for a few months now, but unfortunately the framework I use for my bots (discord.js) [hasn't shipped official support](https://github.com/discordjs/discord.js/pull/5448) for them yet. I finally got impatient enough to decide to write a slash command bot using the new HTTP API (instead of the persistent Gateway connection), which is a lot easier to use without a library wrapper.

As it turns out, there aren't a lot of tutorials on how to do this yet. I thought it would be useful to publish how I did it - using the HTTP API is a great way to create simple bots! My project idea was to create a bot that imitates the old `/slap <user>` [IRC command](https://en.wikipedia.org/wiki/Wikipedia:Whacking_with_a_wet_trout).

If you want to see what we'll be building, you can [add my hosted version to your server here](https://discord.com/oauth2/authorize?client_id=837785463401087046&scope=applications.commands).

> ℹ️ HTTP? Gateway?
>
> HTTP Discord bots are a relatively new interaction model. Previously, each bot had to set up a persistent connection to the Discord API Gateway. This connection would send and receive events for pretty much every change that happened on the servers the bot was in. This meant you would get a _lot_ of data - often times, far more than was necessary for your application.
>
> With the release of interactions and Slash Commands, you can now configure your bot to work over HTTP instead. You can think of the new system as a webhook - you give Discord a list of commands you want to register and explain their inputs with a JSON schema. When a user invokes one of your commands, Discord will validate the input and then call your API with a JSON payload. This system does have some drawbacks, though - you won't have a way of telling if your bot is added to a new server for instance.

## Creating a Discord Bot

First things first - we need to create an official Discord Application for our slash command bot. Sign into the [Discord Developer Portal](https://discord.com/developers/applications) and click "New Application" in the top right corner. Give it a name, and click create. Next up, navigate to "Bot" in the sidebar and click the "Add Bot" button. Verify with "Yes, do it!" on the warning prompt that comes up. With that, we'll have created our application! There are a few values we'll want to grab out of this portal.

1. **Token**: On the "Bot" sidebar tab there's a Token value you can copy - we'll be using this to authenticate our server. This value should never be published in public!
2. **Application ID**: On the "General Information" sidebar tab there's a field called Application ID. We'll need this to create an invite link.
3. **Public Key**: On the "General Information" sidebar tab there's a field called Public Key. We'll be using this to authenticate interaction requests.

We'll be copying these three values into a `.env` file in our project - more on that below. Also take note of the "Interactions Endpoint URL" field on the "General Information" tab. We'll be using that to link to our server.

Keep this tab open and the values handy. Now let's dive into programming our new bot!

## Coding the Bot

Let's start by creating a new folder for our project and initializing it with npm.

```terminal
mkdir trout && cd trout
npm init
```

For this particular project, let's use esm by default. All of the supported Node.js versions now fully support it (you can check what version you're on by running `node -v` in your terminal - it should be 10+) so let's make it a habit to use esm!

We can also add a `start` script that loads our bot's tokens from a `.env` file and boots the server.

```json title="package.json"
{
  "name": "discord-trout",
  "version": "1.0.0",
  "description": "Sometimes you gotta slap a person with a large trout",
  "main": "server.js",
  "type": "module", // [!code ++]
  "scripts": {
    "start": "node -r dotenv/config server.js" // [!code ++]
    "test": "echo \"Error: no test specified\" && exit 1" // [!code --]
  },
  ...
}
```

Let's get things kicked off by installing some dependencies for our project.

1. `dotenv` is used to load our Bot's secret Tokens from a `.env` file. <strong>This file should not be committed into your source code.</strong> If you are using git, add `.env` to your `.gitignore` file.
2. `fastify` is the server framework we'll be using. If you've used express before, it's ergonomically similar - there are performance benefits to using it though, and it comes with out of the box async/await support.
3. `discord-interactions` provides some utilities that we'll need when interacting with the Discord API.

```terminal copy
npm install discord-interactions fastify dotenv
```

Now we can create a `.env` file and copy over our bot information from Discord's Applications page. Replace the values with the ones from the bot you created earlier.

```text title=".env" copy
APPLICATION_ID=123
PUBLIC_KEY=abc
TOKEN=xyz
```

With that done, we can move onto the code! We'll start by creating a minimal fastify server. We'll copy most of the code from the [fastify getting started guide](https://www.fastify.io/docs/latest/Getting-Started/), and add a GET request for the root URL.

```javascript title="server.js" copy
import fastify from "fastify";

const server = fastify({
	logger: true,
});

server.get("/", (request, response) => {
	server.log.info("Handling GET request");
});

server.listen(3000, async (error, address) => {
	if (error) {
		server.log.error(error);
		process.exit(1);
	}
	server.log.info(`server listening on ${address}`);
});
```

If you start the server with `npm start` you should be able to navigate to http://localhost:3000 and see a message in your terminal that fastify has received and responded to a request!

![Terminal output from the server](/images/posts/discord-trout/root_get_output.png)

Now it's time for the fun part - let's start writing the bot logic. [The slash command documentation](https://discord.com/developers/docs/interactions/slash-commands) starts off by telling us that we need to respond to a `PING` interaction type that it will send via a POST request. Let's modify our server code to define a new POST route on the root url, and then have it look at the request object to determine if it's a `PING` interaction or not. If it is, we should respond with the appropriate `PONG` interaction. The `discord-interactions` library we installed earlier has a couple of helpers we can use to make our code clearer!

```javascript title="server.js" copy
import fastify from "fastify";
import { InteractionResponseType, InteractionType } from "discord-interactions"; // [!code ++]

const server = fastify({
	logger: true,
});

server.get("/", (request, response) => {
	server.log.info("Handling GET request");
});

server.post("/", async (request, response) => {
	// [!code ++]
	const message = request.body; // [!code ++]

	if (message.type === InteractionType.PING) {
		// [!code ++]
		server.log.info("Handling Ping request"); // [!code ++]
		response.send({
			// [!code ++]
			type: InteractionResponseType.PONG, // [!code ++]
		}); // [!code ++]
	} else {
		// [!code ++]
		server.log.error("Unknown Type"); // [!code ++]
		response.status(400).send({ error: "Unknown Type" }); // [!code ++]
	} // [!code ++]
}); // [!code ++]

server.listen(3000, async (error, address) => {
	if (error) {
		server.log.error(error);
		process.exit(1);
	}
	server.log.info(`server listening on ${address}`);
});
```

If we start our server and try to connect our application to Discord at this point, we'll get a failure message. It turns out that our application can't accept every request that it is sent - we need to do some verification work to ensure the request is valid.

![Discord API verification failure](/images/posts/discord-trout/api_validation_error.png)

> ℹ️ Connecting Discord to your local bot
>
> You can't use localhost:3000 as your domain for your Discord bot since Discord won't know where to look for that - you'll need to give it an actual URL that's pointed to your localhost:3000 application. I personally use [ngrok](https://ngrok.com) for this. If you're on macOS, you can run the following to use it:
>
> ```terminal
> brew install ngrok
> ngrok http 3000
> ```
>
> Then copy the HTTPS URL in the terminal output and paste it into the Discord Bot "Interactions Endpoint URL" field.

There's a helper method in `discord-interactions` to verify requests, but it requires the raw request body to work. Fastify doesn't have built-in support for that, but luckily there is a [community plugin](https://github.com/Eomm/fastify-raw-body) we can set up to get things working. We'll want the plugin to run and transform the request before any handlers run, so we'll register it in fastify with a `runFirst` option set.

```terminal copy
npm install fastify-raw-body
```

```javascript title="server.js" copy
import fastify from 'fastify';
+import rawBody from 'fastify-raw-body';
import { InteractionResponseType, InteractionType } from 'discord-interactions';

const server = fastify({
  logger: true,
});

server.register(rawBody, { // [!code ++]
  runFirst: true, // [!code ++]
}); // [!code ++]

server.get('/', (request, response) => {
  server.log.info('Handling GET request');
});

// ...
```

Great! Now we have a `request.rawBody` value that `discord-interactions` needs. Next we need to set up a fastify hook that checks all incoming requests - we'll want this check to run _before_ any route handler logic, so we'll register it as a [preHandler hook](https://www.fastify.io/docs/latest/Hooks/). The discord-interactions library [explains how to use it to verify a request](https://github.com/discord/discord-interactions-js#usage), so we'll largely copy over what they have written while making some small tweaks to fit it to fastify instead of express.

```javascript title="server.js" copy
import fastify from "fastify";
import rawBody from "fastify-raw-body"; // [!code ++]
import {
	InteractionResponseType,
	InteractionType,
	verifyKey, // [!code ++]
} from "discord-interactions";

const server = fastify({
	logger: true,
});

server.register(rawBody, {
	runFirst: true,
});

server.get("/", (request, response) => {
	server.log.info("Handling GET request");
});

server.addHook("preHandler", async (request, response) => {
	// [!code ++]
	// We don't want to check GET requests to our root url // [!code ++]
	if (request.method === "POST") {
		// [!code ++]
		const signature = request.headers["x-signature-ed25519"]; // [!code ++]
		const timestamp = request.headers["x-signature-timestamp"]; // [!code ++]
		const isValidRequest = verifyKey(
			// [!code ++]
			request.rawBody, // [!code ++]
			signature, // [!code ++]
			timestamp, // [!code ++]
			process.env.PUBLIC_KEY, // [!code ++]
		); // [!code ++]
		// [!code ++]
		if (!isValidRequest) {
			// [!code ++]
			server.log.info("Invalid Request"); // [!code ++]
			return response.status(401).send({ error: "Bad request signature " }); // [!code ++]
		} // [!code ++]
	} // [!code ++]
}); // [!code ++]

server.post("/", async (request, response) => {
	const message = request.body;

	if (message.type === InteractionType.PING) {
		server.log.info("Handling Ping request");
		response.send({
			type: InteractionResponseType.PONG,
		});
	} else {
		server.log.error("Unknown Type");
		response.status(400).send({ error: "Unknown Type" });
	}
});

server.listen(3000, async (error, address) => {
	if (error) {
		server.log.error(error);
		process.exit(1);
	}
	server.log.info(`server listening on ${address}`);
});
```

Now if we start the server and try to connect it with the Discord applications page, we should get a success message!

![Discord API verification success](/images/posts/discord-trout/api_validation_success.png)

It's finally time to begin working on our commands. We'll create two of them - one that implements the famous `/slap` command from IRC, and another that sends a bot invitation link to users who also want to add the bot to their own servers.

For our Slap command, we'll need the person interacting with the bot to input a user to target. The [Discord API docs say that a user mention is type 6](https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype) - we'll mark that option as required, since we need someone to slap. The invite command doesn't require an input, so we'll just define it with a name and description.

Since we'll need to register the commands with Discord when we're done defining them, we'll put the definitions in a new `commands.js` file.

```javascript title="commands.js" copy
export const SLAP_COMMAND = {
	name: "Slap",
	description: "Sometimes you gotta slap a person with a large trout",
	options: [
		{
			name: "user",
			description: "The user to slap",
			type: 6,
			required: true,
		},
	],
};

export const INVITE_COMMAND = {
	name: "Invite",
	description: "Get an invite link to add the bot to your server",
};
```

Then we can import them and add some helper definitions back in our server code:

```javascript title="server.js" copy
import fastify from "fastify";
import rawBody from "fastify-raw-body";
import {
	InteractionResponseType,
	InteractionType,
	verifyKey,
} from "discord-interactions";
import { SLAP_COMMAND, INVITE_COMMAND } from "./servers.js"; // [!code ++]

const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${process.env.APPLICATION_ID}&scope=applications.commands`; // [!code ++]

const server = fastify({
	logger: true,
});

// ...
```

Next, let's write the code that handles these interactions! We'll go back into our POST route and add checks for someone using our slash commands (the Discord API refers to these events as an Application Command Interaction). The docs [have an example schema](https://discord.com/developers/docs/interactions/slash-commands#interaction) for an interaction - we can use that to write our function definition.

To start with, we'll want different responses depending on which slash command was used. We can use a `switch` statement that looks at the command name, and then write out our different responses accordingly.

For our slap message, we want it to display as _\{user} slaps \{target} around a bit with a large trout_. Discord messages use simplified Markdown formatting, with special sequences you can use to mention different things - to get this display, we'll format our message like this:

```javascript
`*<@${userId}> slaps <@${targetId}> around a bit with a large trout*`;
```

> ℹ️ Message formatting
>
> If you'd like to learn more about what message formatting and mentioning options are available, check out the [Markdown support article](https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-) and the [Message formatting API docs](https://discord.com/developers/docs/reference#message-formatting).

For our invitation link, let's make the response message ephemeral[^1] so we don't spam servers. The Discord API docs say that if you want to make a response ephemeral, all you need to do is pass `flags: 64` into the response!

Let's see what the completed interaction handler looks like for our server.

```javascript title="server.js" copy
//...

server.post("/", async (request, response) => {
	const message = request.body;

	if (message.type === InteractionType.PING) {
		server.log.info("Handling Ping request");
		response.send({
			type: InteractionResponseType.PONG,
		});
	} else if (message.type === InteractionType.APPLICATION_COMMAND) {
		// [!code ++]
		switch (
			message.data.name.toLowerCase() // [!code ++]
		) {
			case SLAP_COMMAND.name.toLowerCase(): // [!code ++]
				response.status(200).send({
					// [!code ++]
					type: 4, // [!code ++]
					data: {
						// [!code ++]
						content: `*<@${message.member.user.id}> slaps <@${message.data.options[0].value}> around a bit with a large trout*`, // [!code ++]
					}, // [!code ++]
				}); // [!code ++]
				server.log.info("Slap Request"); // [!code ++]
				break; // [!code ++]
			case INVITE_COMMAND.name.toLowerCase(): // [!code ++]
				response.status(200).send({
					// [!code ++]
					type: 4, // [!code ++]
					data: {
						// [!code ++]
						content: INVITE_URL, // [!code ++]
						flags: 64, // [!code ++]
					}, // [!code ++]
				}); // [!code ++]
				server.log.info("Invite request"); // [!code ++]
				break; // [!code ++]
			default: // [!code ++]
				server.log.error("Unknown Command"); // [!code ++]
				response.status(400).send({ error: "Unknown Type" }); // [!code ++]
				break; // [!code ++]
		} // [!code ++]
	} else {
		server.log.error("Unknown Type");
		response.status(400).send({ error: "Unknown Type" });
	}
});

// ...
```

> ℹ️ When to use Global vs Guild Commands
>
> Even though we have been building out a bot that uses Global Commands, you should start by registering commands as Guild Commands. Global Commands can take up to an hour to roll out to the client - this makes developing with them a rather painful process. It's much faster if you do 'local' development using Guild Commands first, since you get instant feedback. Then, once you are happy with how things are working, promote them up to a Global Command!
>
> The code below only works with Global Commands. If you'd like to try the Guild Command &rarr; Global Command process, you can use the same register script we're about to create below with some minor changes. To start, change the URL out:
>
> ```javascript
> const guildId = "my guild id here";
>
> const response = await fetch(
>   `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/guilds/${guildId}/commands`,
> // ...
> ```
>
> Then, once you've finished development and you want to register commands as Global Commands, you can change it back and register them globally! Next, you'll want to remove your development Guild Commands by getting a list of their IDs and calling the delete endpoint with them. The script would look something like this:
>
> ```javascript
> const response = await fetch(
> 	`https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/guilds/${guildId}/commands`,
> );
> const json = await response.json();
> console.log({ json });
> ```
>
> Then copy the list of command IDs into this:
>
> ```javascript
> const IDS = [...];
>
> IDS.forEach(async (id) => {
>   const response = await fetch(`https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/guilds/${guildId}/commands/${id}`);
>   if (!response.ok) {
>     console.error(`Problem removing command ${id}`);
>   }
> })
> ```

Now that we have our handler finished, it's time to register our commands with Discord! We'll create a special `register` script here that we'll call manually. We'll import our command definitions from `server.js` and then make a PUT request to the commands API with them.

```javascript title="register.js" copy
import fetch from "node-fetch";
import { SLAP_COMMAND, INVITE_COMMAND } from "./server";

const response = await fetch(
	`https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/commands`,
	{
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bot ${process.env.TOKEN}`,
		},
		method: "PUT",
		body: JSON.stringify([SLAP_COMMAND, INVITE_COMMAND]),
	},
);

if (response.ok) {
	console.log("Registered all commands");
} else {
	console.error("Error registering commands");
	const text = await response.text();
	console.error(text);
}
```

We can add an entry into our `package.json` file for ease of use:

```json title="package.json"
{
	// ...
	"scripts": {
		"register": "node -r dotenv/config register.js", // [!code ++]
		"start": "node -r dotenv/config index.js"
	}
	// ...
}
```

Running it should successfully register the commands:

```terminal
npm run register
```

![Slash commands being registered](/images/posts/discord-trout/register.png)

If you boot up your server, you should see the slash commands in your guild! Go ahead and try them out - everything should work!

![Slash commands being used](/images/posts/discord-trout/application.png)

## Next Steps

Now that you have a finished slash command bot, there are a few places you can go from here. For starters, add some more commands! There's a lot you can do with slash commands. Have some fun trying things out! You can also look into hosting this bot on DigitalOcean, AWS, or something else so that you don't need to worry about running it locally. Personally, I took my finished bot and turned it into a serverless function hosted on [Vercel](https://vercel.com). I'll be writing a (shorter) post on how I did that sometime this week, but if you're curious the current source code can be found at [IanMitchell/discord-trout](https://github.com/ianmitchell/discord-trout).

There's also a lot of room for code improvement - I have a few ideas of things I want to try to make more of a slash command framework, but there is a lot to explore. Try making writing some reusable functions to make your own personal framework!

---

If you have any questions or suggestions, shoot me a [tweet](https://twitter.com/ianmitchel1) or [email](mailto:ian.mitchell@hey.com). I'm happy to write more on this subject and do more tutorials on Discord bots if anyone is interested. If there's something you want to do but aren't sure how, let me know and I'm happy to try and help out!

[^1]: An [ephemeral message](https://support.discord.com/hc/en-us/articles/1500000580222-Ephemeral-Messages-FAQ) is a message that's only sent to a single user - it won't be visible for anyone else in the server.
