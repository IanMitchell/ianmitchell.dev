import React from "react";
import Link from "next/link";
import Page from "../layouts/Page";
import Social from "../components/Social";
import {
  DescriptionItem,
  DescriptionList,
} from "../components/DescriptionList";

export default function Use() {
  return (
    <Page
      title="What I Use"
      breadcrumb={
        <Link href="/">
          <a>&larr; Home</a>
        </Link>
      }
    >
      <Social
        title="Ian Mitchell | Use"
        description="The tools, services, and apps I use day to day"
      />

      <p>
        <a href="https://uses.tech">
          Reading posts about what workflows and toolsets other developers use
        </a>{" "}
        is a fun way of discovering new things to me. I occasionally find new
        things to try this way.
      </p>

      {/* <span>// insert picture of setup here</span> */}

      <h2>The Heavyweights</h2>

      <DescriptionList>
        <DescriptionItem
          title="MacBook Pro"
          icon="/icons/laptop.svg"
          alt="MacBook Pro"
        >
          I have a Windows desktop that I do some development on via WSL, but
          the experience still isn't the same as using a Mac. I mostly use the
          machines I get through work - right now I'm on a 2019 16-inch with a
          2.4GHz i9 and 64gb of RAM provided by Discord.
        </DescriptionItem>

        <DescriptionItem
          title="Discord"
          icon="/icons/discord.svg"
          alt="Discord"
        >
          In my defense, I used Discord a ton before I started working for them.
          I've written{" "}
          <a href="https://github.com/ianmitchell/aquarius">
            multi-functional bots
          </a>{" "}
          and <a href="https://sentrydiscord.dev">webhook event forwarding</a>{" "}
          applications to make Discord my dashboard of sorts. I'm in way too
          many servers, I'm way too active online, and I spend way too much time
          writing Discord integrations.
        </DescriptionItem>

        {/* <DescriptionItem
          title="Visual Studio Code"
          icon="/icons/discord.svg"
          alt="Discord"
          size="small"
        >
          <ul>
            <li>Auto Close Tag</li>
            <li>Auto Rename Tag</li>
            <li>ESLint</li>
            <li>file-icons</li>
            <li>Import Cost</li>
            <li>Markdown All in One</li>
            <li>MDX</li>
            <li>One Monokai</li>
            <li>Path Intellisense</li>
            <li>Polacode</li>
            <li>Prettier</li>
            <li>Prisma</li>
            <li>Remote - WSL</li>
            <li>Settings Sync</li>
            <li>TODO Highlight</li>
            <li>Todo Tree</li>
            <li>Toggle Quotes</li>
          </ul>
        </DescriptionItem> */}
      </DescriptionList>

      <h2>More coming soon!</h2>
      <p>Launch pressure and whatnot.</p>

      {/* <SubHeading>Development</SubHeading>

      <ol>
        <li>VS Code</li>
        <li>
          iTerm / Terminal
          <ul>
            <li>ZSH</li>
            <li>Volta</li>
          </ul>
        </li>
        <li>Microsoft Edge</li>
      </ol>

      <SubHeading>Websites</SubHeading>
      <ol>
        <li>Notion </li>
        <li>Hey </li>
        <li>GitHub </li>
        <li>Pocket </li>
        <li>Spotify </li>
        <li>Feedbin</li>
        <li>Fathom </li>
        <li>Vercel </li>
        <li>Netlify </li>
        <li>Digital Ocean </li>
        <li>Heroku </li>
      </ol>

      <SubHeading>Hardware</SubHeading>
      <ol>
        <li>Windows Desktop</li>
        <li>iPhone X</li>
        <li>Leica Q2</li>
        <li>Nintendo Switch</li>
        <li>monitor</li>
        <li>webcam</li>
        <li>keyboard and mouse</li>
        <li>pen and paper</li>
        <li>desk</li>
        <li>chair</li>
        <li>backpack</li>
        <li>headphones</li>
      </ol>

      <SubHeading>Apps</SubHeading>
      <ol>
        <li>Pixave</li>
        <li>Tweetbot</li>
        <li>Kap</li>
        <li>Net News Wire</li>
        <li>iA Writer</li>
        <li>Tweetbot</li>
        <li>Copilot</li>
        <li>Cash App</li>
        <li>Dark Sky</li>
        <li>Darkroom</li>
        <li>1 Password</li>
      </ol> */}
    </Page>
  );
}
