// TODO: Finish script
import fs from "node:fs";
import path from "node:path";
import prompts from "prompts";
import { html } from "common-tags";
import list from "../content/bookmark-tags.json";
import slug from "../lib/slug";

function toWord(str) {
  return str.replace(/^\w/, (c) => c.toUpperCase()).replace("-", " ");
}

function filename(str) {
  return path.join(process.cwd(), "content", "bookmarks", `${slug(str)}.mdx`);
}

try {
  (async () => {
    try {
      const response = await prompts([
        {
          type: "text",
          name: "title",
          message: "Bookmark Title?",
          validate: (str) =>
            fs.existsSync(filename(str))
              ? "A bookmark with that title already exists!"
              : true,
        },
        {
          type: "text",
          name: "url",
          message: `Bookmark Link?`,
        },
        {
          type: "multiselect",
          name: "tags",
          message: "Pick tags",
          choices: list.tags.map((tag) => ({
            title: toWord(tag.name),
            value: tag.name,
          })),
        },
      ]);

      const file = filename(response.title);

      if (fs.existsSync(file)) {
        console.log("That file already exists!");
        return;
      }

      const content = html`
        --- title: ${response.title} link: ${response.url} tags:
        ${response.tags.map((tag) => `- ${tag}`)} --- Content
      `;

      fs.writeFileSync(file, content);

      console.log(`Bookmark Created! ${file}`);
    } catch (error) {
      console.error(error);
    }
  })();
} catch (error) {
  console.error(error);
}
