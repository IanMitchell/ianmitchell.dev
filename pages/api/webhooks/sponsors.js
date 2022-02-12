import { MessageEmbed } from "discord.js";

const COLORS = {
  ADDED: 0x5763719,
  CHANGED: 0x16705372,
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
  const embed = new MessageEmbed();
  const user = payload.sender;
  const isPublic = payload.sponsorship.privacy_level !== "public";
  const { tier } = payload.sponsorship;
  const username = isPublic ? user.log : "Anonymous";

  if (payload.sponsorship.privacy_level === "public") {
    embed.setAuthor({
      name: user.login,
      iconURL: user.avatar_url,
      url: user.html_url,
    });
  }

  embed.setTimestamp(payload.sponsorship.created_at);

  if (payload.action === "created") {
    embed.setTitle("New Sponsorship");
    embed.setColor(COLORS.ADDED);
    embed.setDescription(
      `${username} just sponsored you for **${formatter.format(
        tier.monthly_price_in_dollars
      )}**`
    );
    embed.addField("Tier", payload.sponsorship.tier.name ?? "None", true);
    embed.addField(
      "One Time Payment?",
      tier.one_time_payment ? "Yes" : "No",
      true
    );
  } else {
    embed.setTitle("Sponsorship Tier Change");
    embed.setColor(COLORS.CHANGED);
    embed.setDescription(
      `${username} changed to **${formatter.format(
        payload.changes.tier.from.monthly_price_in_dollars
      )}** from ${formatter.format(tier.monthly_price_in_dollars)}`
    );
    embed.addField(
      "One Time Payment?",
      tier.one_time_payment ? "Yes" : "No",
      true
    );
  }

  const resp = await fetch(process.env.SPONSOR_WEBHOOK, {
    method: "POST",
    body: JSON.stringify({ embeds: [embed.toJSON()] }),
  });
  const json = await resp.json();

  if (!resp.ok) {
    throw new Error(JSON.stringify(json));
  }

  response.status(200);
}
