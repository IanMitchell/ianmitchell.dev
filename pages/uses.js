import React from 'react';
import Link from 'next/link';
import Page from '../layouts/Page';
import SubHeading from '../components/SubHeading';
import Social from '../components/Social';

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

      <SubHeading>Development</SubHeading>
      <ol>
        <li>
          VS Code
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
        </li>
        <li>Figma</li>
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
        <li>Microsoft Todo </li>
        <li>Pocket </li>
        <li>Discord </li>
        <li>Spotify </li>
        <li>Feedly </li>
        <li>Fathom </li>
        <li>Vercel </li>
        <li>Netlify </li>
        <li>Digital Ocean </li>
        <li>Heroku </li>
      </ol>

      <SubHeading>Hardware</SubHeading>
      <ol>
        <li>Windows Desktop</li>
        <li>Work MacBook Pro</li>
        <li>iPhone X</li>
        <li>Leica Q2</li>
        <li>Nintendo Switch</li>
      </ol>

      <SubHeading>macOS</SubHeading>
      <ol>
        <li>Pixave</li>
        <li>Tweetbot</li>
        <li>Kap</li>
      </ol>

      <SubHeading>iPhone</SubHeading>
      <ol>
        <li>Tweetbot</li>
        <li>Copilot</li>
        <li>Cash App</li>
        <li>Dark Sky</li>
        <li>Darkroom</li>
        <li>Shonen Jump</li>
      </ol>
    </Page>
  );
}
