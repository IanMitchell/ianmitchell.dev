import { Embed } from "@discordjs/builders";

const COLORS = {
  ADDED: 5763719,
  CHANGED: 16705372,
  REMOVED: 15548997,
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default async function SponsorsWebhook(request, response) {
  if (request.method !== "POST") {
    return;
  }

  const payload = request.body;
  const embed = new Embed();
  const user = payload.sender;
  const isPublic = payload.sponsorship.privacy_level === "public";
  const { tier } = payload.sponsorship;
  const username = isPublic ? user.login : "Anonymous";

  if (payload.sponsorship.privacy_level === "public") {
    embed.setAuthor({
      name: user.login,
      iconURL: user.avatar_url,
      url: user.html_url,
    });
  }

  embed.setTimestamp(new Date(payload.sponsorship.created_at));

  switch (payload.action) {
    case "created": {
      embed.setTitle("New Sponsorship");
      embed.setColor(COLORS.ADDED);
      embed.setDescription(
        `${username} just sponsored you for **${formatter.format(
          tier.monthly_price_in_dollars
        )}**`
      );
      embed.addField({
        name: "Tier",
        value: tier.name ?? "None",
        inline: true,
      });
      embed.addField({
        name: "Recurring?",
        value: tier.one_time_payment ? "No" : "Yes",
        inline: true,
      });
      break;
    }
    case "pending_cancellation": {
      embed.setTitle("Sponsorship Cancelled");
      embed.setColor(COLORS.REMOVED);
      embed.setDescription(
        `${username} cancelled their **${formatter.format(
          tier.monthly_price_in_dollars
        )}** sponsorship`
      );
      break;
    }
    default: {
      embed.setTitle("Sponsorship Tier Change");
      embed.setColor(COLORS.CHANGED);
      embed.setDescription(
        `${username} changed to **${formatter.format(
          payload.changes.tier.from.monthly_price_in_dollars
        )}** from ${formatter.format(tier.monthly_price_in_dollars)}`
      );
      embed.addField({
        name: "Recurring",
        value: tier.one_time_payment ? "No" : "Yes",
        inline: true,
      });
    }
  }

  const resp = await fetch(process.env.SPONSOR_WEBHOOK, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ embeds: [embed.toJSON()] }),
  });

  if (!resp.ok) {
    const json = await resp.json();
    throw new Error(JSON.stringify(json));
  }

  response.status(200).json({ success: true });
}
