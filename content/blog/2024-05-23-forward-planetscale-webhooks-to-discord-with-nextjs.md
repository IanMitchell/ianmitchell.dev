# Forward PlanetScale Webhooks to Discord with Next.js

I wish more services offered built-in Discord integrations like they do for Slack. [Pierre](https://pierre.co) does this wonderfully. For the services that don’t, luckily forwarding webhooks is straightforward enough. I’ve written a lot of these forwarders in the past, and [even created free services](https://sentrydiscord.dev) for a couple of them. Here’s how we’re forwarding PlanetScale webhooks for 0x57!

Some services provide Typescript definitions for their webhook events (if your company does that, thank you so much) - but for PlanetScale, I define them manually.

```ts title="app/api/webhooks/planetscale/types.ts"
export interface PlanetscaleWebhook {
	event: string;
	timestamp: number;
	resource: Record<string, unknown>;
}

export interface BranchReadyPayload extends PlanetscaleWebhook {
	event: "branch.ready";
	resource: {
		id: string;
		name: string;
		html_url: string;
		actor: {
			display_name: string;
			avatar_url: string;
		};
	};
}

export interface BranchSleepingPayload extends PlanetscaleWebhook {
	event: "branch.sleeping";
	resource: {
		id: string;
		name: string;
		html_url: string;
		actor: {
			display_name: string;
			avatar_url: string;
		};
	};
}

export interface DeployRequestOpenedPayload extends PlanetscaleWebhook {
	event: "deploy_request.opened";
	resource: {
		id: string;
		name: string;
		number: number;
		html_url: string;
		actor: {
			display_name: string;
			avatar_url: string;
		};
	};
}

export interface DeployRequestQueuedPayload extends PlanetscaleWebhook {
	event: "deploy_request.queued";
	resource: {
		id: string;
		name: string;
		number: number;
		html_url: string;
		actor: {
			display_name: string;
			avatar_url: string;
		};
	};
}

export interface DeployRequestInProgressPayload extends PlanetscaleWebhook {
	event: "deploy_request.in_progress";
	resource: {
		id: string;
		name: string;
		number: number;
		html_url: string;
		actor: {
			display_name: string;
			avatar_url: string;
		};
	};
}

export interface DeployRequestErroredPayload extends PlanetscaleWebhook {
	event: "deploy_request.errored";
	resource: {
		id: string;
		name: string;
		number: number;
		html_url: string;
		actor: {
			display_name: string;
			avatar_url: string;
		};
		deployment: {
			lint_errors: [
				{
					lint_error: string;
					error_description: string;
				},
			];
		};
	};
}

export interface DeployRequestSchemaAppliedPayload extends PlanetscaleWebhook {
	event: "deploy_request.schema_applied";
	resource: {
		id: string;
		name: string;
		number: number;
		html_url: string;
		actor: {
			display_name: string;
			avatar_url: string;
		};
	};
}

export interface DeployRequestSchemaRevertedPayload extends PlanetscaleWebhook {
	event: "deploy_request.reverted";
	resource: {
		id: string;
		name: string;
		number: number;
		html_url: string;
		actor: {
			display_name: string;
			avatar_url: string;
		};
	};
}

export interface DeployRequestSchemaClosedPayload extends PlanetscaleWebhook {
	event: "deploy_request.closed";
	resource: {
		id: string;
		name: string;
		number: number;
		html_url: string;
		actor: {
			display_name: string;
			avatar_url: string;
		};
	};
}

export interface WebhookTestPayload extends PlanetscaleWebhook {
	event: "webhook.test";
	resource: {
		id: string;
		name: string;
		html_url: string;
	};
}
```

The route handler receives these events, creates a custom Discord embed, and sends it to a Discord webhook.

```ts title="app/api/webhooks/planetscale/route.ts"
import { getError } from "@/lib/errors";
import { EmbedBuilder } from "@discordjs/builders";
import crypto from "node:crypto";
import {
	type BranchReadyPayload,
	type BranchSleepingPayload,
	type DeployRequestErroredPayload,
	type DeployRequestInProgressPayload,
	type DeployRequestOpenedPayload,
	type DeployRequestQueuedPayload,
	type DeployRequestSchemaAppliedPayload,
	type DeployRequestSchemaClosedPayload,
	type DeployRequestSchemaRevertedPayload,
	type PlanetscaleWebhook,
	type WebhookTestPayload,
} from "./types";

const DISCORD_WEBHOOK_URL = "<enter here>";

const COLORS = {
	INFO: 0x0076ff,
	WARNING: 0xd9931e,
	ERROR: 0xff0078,
	SUCCESS: 0x028265,
};

async function sendDiscordEmbed(payload: EmbedBuilder) {
	const result = await fetch(DISCORD_WEBHOOK_URL, {
		method: "POST",
		body: JSON.stringify({
			username: "PlanetScale",
			avatar_url: `https://<website url>/images/planetscale.png`,
			embeds: [payload.toJSON()],
		}),
		headers: { "Content-Type": "application/json" },
	});

	if (!result.ok) {
		switch (result.status) {
			case 429: {
				console.warn("Currently being rate limited");
				throw new Error();
			}

			case 500: {
				console.warn("Discord API returned a 500 error");
				throw new Error();
			}

			default: {
				console.error(
					`Discord API returned an unhandled ${result.status} error`,
				);
			}
		}
	}
}

function verify(request: Request) {
	const secret = process.env.PLANETSCALE_WEBHOOK_SECRET;
	const header = request.headers.get("x-planetscale-signature");

	if (secret == null) {
		throw new Error("Unknown PlanetScale Webhook Secret");
	}

	if (header == null || secret == null) {
		return false;
	}

	const signature = crypto
		.createHmac("sha256", secret)
		.update(JSON.stringify(request.body))
		.digest("hex");

	const trusted = Buffer.from(signature, "ascii");
	const untrusted = Uint8Array.from(header, (c) => c.charCodeAt(0));

	return crypto.timingSafeEqual(trusted, untrusted);
}

export async function POST(request) {
	if (!verify(request)) {
		// Verification seems to consistently fail. Open question here:
		// https://discord.com/channels/1134636291691126885/1189637199919071307
		// return Response.json({ error: true }, { status: 401 });
	}

	const body = (await request.json()) as Promise<PlanetscaleWebhook>;

	const embed = new EmbedBuilder({
		thumbnail: {
			url: "https://<domain>/images/planetscale.png",
		},
		footer: {
			text: "0x57 PlanetScale Webhook",
			icon_url: "https://<domain>/images/planetscale.png",
		},
	}).setTimestamp();

	let resource;

	switch (body.event) {
		case "branch.ready":
			resource = body.resource as BranchReadyPayload["resource"];
			embed.setAuthor({
				name: resource.actor.display_name,
				iconURL: resource.actor.avatar_url,
			});
			embed.setURL(resource.html_url);
			embed.setTitle(`The ${resource.name} branch is ready`);
			embed.setColor(COLORS.SUCCESS);
			embed.setDescription(
				`The ${resource.name} branch opened by ${resource.actor.display_name} is ready to use.`,
			);
			break;
		case "branch.sleeping":
			resource = body.resource as BranchSleepingPayload["resource"];
			embed.setAuthor({
				name: resource.actor.display_name,
				iconURL: resource.actor.avatar_url,
			});
			embed.setURL(resource.html_url);
			embed.setTitle(`The ${resource.name} branch is sleeping`);
			embed.setColor(COLORS.WARNING);
			embed.setDescription(
				`The ${resource.name} branch opened by ${resource.actor.display_name} is now sleeping.`,
			);
			break;
		case "deploy_request.opened":
			resource = body.resource as DeployRequestOpenedPayload["resource"];
			embed.setAuthor({
				name: resource.actor.display_name,
				iconURL: resource.actor.avatar_url,
			});
			embed.setURL(resource.html_url);
			embed.setTitle(`Deploy Request #${resource.number} Opened`);
			embed.setColor(COLORS.INFO);
			embed.setDescription(
				`${resource.actor.display_name} opened deploy request #${resource.number}.`,
			);
			break;
		case "deploy_request.queued":
			resource = body.resource as DeployRequestQueuedPayload["resource"];
			embed.setAuthor({
				name: resource.actor.display_name,
				iconURL: resource.actor.avatar_url,
			});
			embed.setURL(resource.html_url);
			embed.setTitle(`Deploy Request #${resource.number} Queued`);
			embed.setColor(COLORS.INFO);
			embed.setDescription(
				`${resource.actor.display_name} queued deploy request #${resource.number}`,
			);
			break;
		case "deploy_request.in_progress":
			resource = body.resource as DeployRequestInProgressPayload["resource"];
			embed.setAuthor({
				name: resource.actor.display_name,
				iconURL: resource.actor.avatar_url,
			});
			embed.setURL(resource.html_url);
			embed.setTitle(`Deploy Request #${resource.number} In Progress`);
			embed.setColor(COLORS.INFO);
			embed.setDescription(
				`Deploy started by ${resource.actor.display_name} for request #${resource.number} started.`,
			);
			break;
		case "deploy_request.errored":
			resource = body.resource as DeployRequestErroredPayload["resource"];
			embed.setAuthor({
				name: resource.actor.display_name,
				iconURL: resource.actor.avatar_url,
			});
			embed.setURL(resource.html_url);
			embed.setTitle(
				`Deploy Request #${resource.number} Error: ${resource.deployment?.lint_errors?.[0].lint_error}`,
			);
			embed.setColor(COLORS.ERROR);
			embed.setDescription(
				`Deploy started by ${resource.actor.display_name} for request #${
					resource.number
				} encountered an error.\n\`\`\`${
					resource.deployment?.lint_errors?.[0]?.error_description ??
					"Unknown Error"
				}\`\`\``,
			);
			break;
		case "deploy_request.schema_applied":
			resource = body.resource as DeployRequestSchemaAppliedPayload["resource"];
			embed.setAuthor({
				name: resource.actor.display_name,
				iconURL: resource.actor.avatar_url,
			});
			embed.setURL(resource.html_url);
			embed.setTitle(`Deploy Request #${resource.number} Applied`);
			embed.setColor(COLORS.SUCCESS);
			embed.setDescription(
				`Deploy for request #${resource.number} successfully applied.`,
			);
			break;
		case "deploy_request.reverted":
			resource =
				body.resource as DeployRequestSchemaRevertedPayload["resource"];
			embed.setAuthor({
				name: resource.actor.display_name,
				iconURL: resource.actor.avatar_url,
			});
			embed.setURL(resource.html_url);
			embed.setTitle(`Deploy Request #${resource.number} Reverted`);
			embed.setColor(COLORS.WARNING);
			embed.setDescription(`Deploy for request #${resource.number} reverted.`);
			break;
		case "deploy_request.closed":
			resource = body.resource as DeployRequestSchemaClosedPayload["resource"];
			embed.setAuthor({
				name: resource.actor.display_name,
				iconURL: resource.actor.avatar_url,
			});
			embed.setURL(resource.html_url);
			embed.setTitle(`Deploy Request #${resource.number} Closed`);
			embed.setColor(COLORS.INFO);
			embed.setDescription(`Deploy for request #${resource.number} closed.`);
			break;
		case "webhook.test":
			resource = body.resource as WebhookTestPayload["resource"];
			embed.setURL(resource.html_url);
			embed.setTitle(`Successful ${resource.name} webhook test`);
			embed.setColor(COLORS.SUCCESS);
			embed.setDescription(
				`Successfully tested the PlanetScale webhook on ${resource.name}.`,
			);
			break;
		default:
			request.log.error(`Unknown Webhook Event ${body.event}`);
			return Response.json({ success: false }, { status: 500 });
	}

	try {
		await sendDiscordEmbed(embed);
	} catch (err) {
		const error = getError(err);
		request.log.error(error.message);
	}

	return Response.json({ success: true }, { status: 200 });
}
```
