import React from 'react';
import Link from 'next/link';
import Page from '../layouts/Page';
import SubHeading from '../components/SubHeading';
import Social from '../components/Social';
import {
  DescriptionItem,
  DescriptionList,
} from '../components/DescriptionList';

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
        Reading posts about how workflows and toolsets from other developers is
        a fun way of discovering new things. Blah blah blah here are mine
        <a href="https://uses.tech">here</a>
      </p>

      <span>// insert picture of setup here</span>

      <SubHeading>The Heavyweights</SubHeading>

      <DescriptionList>
        <DescriptionItem
          title="MacBook Pro"
          icon="/icons/laptop.svg"
          alt="MacBook Pro"
        >
          Discord stuff and descriptions go here
        </DescriptionItem>

        <DescriptionItem
          title="Discord"
          icon="/icons/discord.svg"
          alt="Discord"
        >
          Discord stuff and descriptions go here
        </DescriptionItem>

        <DescriptionItem
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
        </DescriptionItem>
      </DescriptionList>

      <SubHeading>Development</SubHeading>

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
      </ol>
    </Page>
  );
}
