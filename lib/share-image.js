import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";

function getLines(context, text, maxWidth) {
  const lines = [];
  const [firstWord, ...words] = text.split(" ");

  let line = firstWord;
  words.forEach((word) => {
    const { width } = context.measureText(`${line} ${word}`);

    if (width >= maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`;
    }
  });

  // Add last unfinished line
  lines.push(line);

  return lines;
}

function getSizeAndOffset(context, title) {
  const sizes = [82, 68, 56, 48];
  const offsets = [110, 85, 75, 65];

  let counter = 0;
  let lines = [];

  do {
    context.font = `${sizes[counter]}px DM Serif Display`;
    lines = getLines(context, title, 1050);
  } while (lines.length > 2 && ++counter < 3);

  if (counter >= 3) {
    console.error("The Social Share Image Generator Needs Updating");
    process.exit(1);
  }

  return {
    size: sizes[counter],
    offset: offsets[counter],
  };
}

export async function createShareImage(frontmatter) {
  const canvas = createCanvas(1200, 630);
  const context = canvas.getContext("2d");

  // Background
  context.fillStyle = "#f6f8ff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Write text (with word-wrap)
  context.fillStyle = "#ff007e";
  const styles = getSizeAndOffset(context, frontmatter.title);
  context.font = `${styles.size}px DM Serif Display`;
  const lines = getLines(context, frontmatter.title, 1050);

  lines.forEach((line, index) => {
    context.fillText(line, 75, 185 + styles.offset * index, 1050);
  });

  // Kingpin
  context.fillStyle = "#1e2235";
  context.font = "48px DM Serif Display";
  context.fillText("Ian Mitchell", 310, 50 + 365);

  // Metadata
  context.font = "28px IBM Plex Mono";
  const tags = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(frontmatter.tags.map((tag) => `#${tag}`));
  context.fillText(
    `${frontmatter.date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    })} | ${tags}`,
    75,
    100,
    1050
  );

  // Add Twitter information
  const twitterIcon = await loadImage(
    path.join(process.cwd(), "public", "icons", "social", "twitter.svg")
  );
  context.drawImage(twitterIcon, 310, 445, 45, 35);
  context.fillText("@IanMitchel1", 375, 25 + 445);

  // Add Discord information
  const discordIcon = await loadImage(
    path.join(process.cwd(), "public", "icons", "social", "discord.svg")
  );
  context.drawImage(discordIcon, 310, 500, 45, 35);
  context.fillText("Desch#3091", 375, 25 + 500);

  // Draw Profile picture
  const profileImage = await loadImage(
    path.join(process.cwd(), "public", "ian.jpg")
  );

  context.beginPath();
  context.arc(175, 465, 100, 0, Math.PI * 2, true);
  context.clip();

  context.drawImage(profileImage, 75, 365, 200, 200);

  // Finished!
  return canvas;
}

export default async function getShareImage(frontmatter) {
  const directory = path.resolve(process.cwd(), "public", "social");

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const file = path.resolve(directory, `${frontmatter.slug}.png`);
  if (!fs.existsSync(file)) {
    const canvas = await createShareImage(frontmatter);

    return new Promise((resolve) => {
      const out = fs.createWriteStream(file);
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      out.on("finish", resolve(file));
    });
  }

  return `/social/${frontmatter.slug}.png`;
}
