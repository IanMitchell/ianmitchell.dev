// TODO: Finish Script
import fs from "node:fs";
import path from "node:path";
import prompts from "prompts";
import { html } from "common-tags";
import list from "../content/post-tags.json";
import slug from "../lib/slug";

function cap(str) {
  return str.replace(/^\w/, (c) => c.toUpperCase());
}

function toWord(str) {
  return cap(str).replace("-", " ");
}

function filename(str) {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  return path.join(
    process.cwd(),
    "content",
    "posts",
    `${formattedDate}-${slug(str)}.mdx`
  );
}

try {
  (async () => {
    try {
      const response = await prompts([
        {
          type: "text",
          name: "title",
          message: "Post Title?",
          validate: (str) =>
            fs.existsSync(filename(str))
              ? "A post with that title already exists!"
              : true,
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

      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

      const file = filename(response.title);

      const content = html`
        --- title: ${response.title} date: ${formattedDate} tags:
        ${response.tags.map((tag) => `- ${cap(tag)}`)} --- Content
      `;

      if (fs.existsSync(file)) {
        console.log("That file already exists!");
        return;
      }

      fs.writeFileSync(file, content);

      console.log(`Post Created! ${file}`);
    } catch (error) {
      console.error(error);
    }
  })();
} catch (error) {
  console.error(error);
}
