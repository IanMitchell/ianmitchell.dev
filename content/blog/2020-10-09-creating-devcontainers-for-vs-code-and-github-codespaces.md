---
title: Creating Devcontainers for VS Code and GitHub Codespaces
date: 2020-10-09
excerpt: Creating Devcontainers for your projects is easy and comes with a lot of benefits!
---

I've been adding development containers to several of my projects with the news that [GitHub Codespaces](https://github.com/features/codespaces) is coming out of beta soon. Codespaces is a browser-based code environment - it's wicked cool! It works by creating a Docker-based container in the cloud, and then loading VS Code in the browser to write code with. I didn't have a lot of experience with Docker before playing around with Codespaces this week, and was intimidated going into it - but it turned out customizing the development containers wasn't that complicated!

Microsoft has created a [lot of stellar presets](https://github.com/microsoft/vscode-dev-containers/tree/master/containers) that you can use to get started with. I've used these for several projects, but began creating my own so I could exercise greater control over the environment and use my preferred tools (for instance, using Volta instead of NVM).

---

#### Why create a devcontainer?

> The [VS Code documentation on devcontainers](https://code.visualstudio.com/docs/remote/containers) describes the feature as “a local-quality development experience — including full IntelliSense (completions), code navigation, and debugging — regardless of where your tools (or code) are located.”

There are several benefits to using devcontainers instead of developing locally, but chief among them is you have complete control over the environment your project runs in. For [Aquarius](https://github.com/IanMitchell/aquarius) developers need to have a PostgreSQL database running, have Node.js >14.9 installed, and also run several scripts to configure the project's codebase before they can begin coding. There is a lot of room for things to go haywire here. On macOS, getting PostgreSQL to run is a breeze; on WSL2, it is not. Rather than leaving the environment as a potential barrier to entry, I can create a devcontainer and setup PostgreSQL and Node.js for the user in the way Aquarius needs.

---

## Setting up your Computer and VS Code

To make a devcontainer we need to create a docker image and a `devcontainer.json` file that tells VS Code how to load it. To begin, you'll need to install the following:

- **Docker**: I use Docker Desktop on Windows and macOS - you can find the [installation instructions here](https://docs.docker.com/desktop/). Docker Desktop for Windows also comes with a bridge for WSL2 - it's fantastic!
- **Remote Development Pack**: [This is the VS Code extension that loads devcontainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack). It will enable VS Code to work with WSL2, SSH connections, and Docker containers.

## Creating the devcontainer directory

Now let's start creating our container! To start, make a `.devcontainer` directory in the root of your codebase. We'll be putting all the files below into it.

## Creating the Dockerfile

The Dockerfile defines the virtual machine your code runs on. If you're new to Docker (like I am!), there are a bunch of fantastic images you can use as a base to build on top of - it makes this step pretty easy as long as you don't need a bunch of custom components.

To make one, create a `.devcontainer/Dockerfile` file that pulls in the image you need. For my Ruby on Rails applications, I'm using this:

```docker title=".devcontainer/Dockerfile" copy
# Create a variable with a default value of 2.7
ARG VARIANT=2.7

# Use the official Ruby container
FROM ruby:${VARIANT}

# Variables that will setup a non-root user.
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Copy my devcontainer setup script to the container
COPY scripts/setup.sh /tmp/scripts/

# Run commands to setup the container
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    # Remove imagemagick due to https://security-tracker.debian.org/tracker/CVE-2019-10131
    && apt-get purge -y imagemagick imagemagick-6-common \
    # Install common packages, non-root user, rvm, core build tools
    && bash /tmp/scripts/setup.sh "${USERNAME}" "${USER_UID}" "${USER_GID}" \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/scripts
```

This is a [modified version of the presets Microsoft has published](https://github.com/microsoft/vscode-dev-containers) - I've removed parts that weren't necessary for my setup.

If you're using Node.js, it might start like this instead:

```docker
ARG VARIANT=14.9
FROM node:${VARIANT}
```

## Adding Databases with Docker Compose

Docker Compose is a great way of adding services to your environment. If your application needs a database for instance, an easy way to add it to your devcontainer is creating a `.devcontainer/docker-compose.yml` file that loads it in an image. For PostgreSQL, that looks like this:

```yml title=".devcontainer/docker-compose.yml" copy
version: "3"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        # These set the ARG values in your Dockerfile
        VARIANT: 2.7
        USER_UID: 1000
        USER_GID: 1000

    volumes:
      - ..:/workspace:cached

    # Overrides default command so things don't shut down after the process ends.
    command: sleep infinity

    # Runs app on the same network as the database container, allows "forwardPorts" in devcontainer.json function.
    network_mode: service:db

  db:
    image: postgres:latest
    restart: unless-stopped
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: postgres

# Persist database information after your VM shuts down (just these two lines!)
volumes:
  postgres_data:
```

## Piecing it together with a Devcontainer File

Now for the final part! We can piece it all together with a `.devcontainer/devcontainer.json` file that creates our Docker image and configures VS Code for us.

First, let's add the basics on how to start the devcontainer:

```json title=".devcontainer/devcontainer.json" copy
{
	"name": "project-name",
	"build": {
		"dockerfile": "Dockerfile",
		"args": {}
	},
	"forwardPorts": [3000, 5432]
}
```

If you're using Docker Compose, this will be slightly different:

```json title=".devcontainer/devcontainer.json" copy
{
	"name": "project-name",
	"dockerComposeFile": "docker-compose.yml",
	"service": "app",
	"workspaceFolder": "/project-name",
	"forwardPorts": [3000]
}
```

> Change the `forwardPorts` as needed - I used 3000 since it is the default ports for Rails, Express, and Next.js. If you're running a Rails or Next.js app in your devcontainer, loading `http://localhost:3000` through your local browser will load the code running in the devcontainer!

Next, add some default VS Code settings and extensions to install automatically by adding this to the file:

```json title=".devcontainer/devcontainer.json" copy
{
	//...
	"settings": {
		"terminal.integrated.shell.linux": "/bin/zsh",
		"sqltools.connections": [
			{
				"name": "Container database",
				"driver": "PostgreSQL",
				"previewLimit": 50,
				"server": "localhost",
				"port": 5432,
				"database": "postgres",
				"username": "postgres",
				"password": "postgres"
			}
		],
		"files.eol": "\n",
		"files.insertFinalNewline": true,
		"files.trimFinalNewlines": true,
		"files.trimTrailingWhitespace": true,
		"editor.formatOnSave": true,
		"editor.codeActionsOnSave": {
			"source.organizeImports": true
		}
	},
	"extensions": [
		"dbaeumer.vscode-eslint",
		"mtxr.sqltools",
		"mtxr.sqltools-driver-pg",
		"wix.vscode-import-cost",
		"esbenp.prettier-vscode",
		"prisma.prisma"
	]
}
```

When VS Code loads this devcontainer it will automatically install the extensions and use the configured settings - it's a great way to help new contributors get set up by including defaults like ESLint and Prettier.

Some apps might also have initialization scripts that need to be run after the repository is cloned - for instance, `npm install` or `bin/setup` are common ones. You can automate that step by adding:

```json
  "postCreateCommand": "npm install",
```

Check out the [official documentation](https://aka.ms/devcontainer.json) to learn more about what's possible!

_My complete `devcontainer.json` for Aquarius:_

```json title=".devcontainer/devcontainer.json" copy
{
	"name": "Aquarius",
	"dockerComposeFile": "docker-compose.yml",
	"service": "app",
	"workspaceFolder": "/workspace",
	"settings": {
		"terminal.integrated.shell.linux": "/bin/zsh",
		"sqltools.connections": [
			{
				"name": "Container database",
				"driver": "PostgreSQL",
				"previewLimit": 50,
				"server": "localhost",
				"port": 5432,
				"database": "postgres",
				"username": "postgres",
				"password": "postgres"
			}
		],
		"files.eol": "\n",
		"files.insertFinalNewline": true,
		"files.trimFinalNewlines": true,
		"files.trimTrailingWhitespace": true,
		"editor.formatOnSave": true,
		"editor.codeActionsOnSave": {
			"source.organizeImports": true
		}
	},
	"extensions": [
		"dbaeumer.vscode-eslint",
		"mtxr.sqltools",
		"mtxr.sqltools-driver-pg",
		"wix.vscode-import-cost",
		"esbenp.prettier-vscode",
		"prisma.prisma"
	],
	"forwardPorts": [3000, 3030, 5432],
	"postCreateCommand": ["npm install", "npm run db:create"]
}
```

## Setup Scripts

This step is optional, but I like to run a script that installs shared utilities and finishes configuring the environment as part of my Docker image. For my setup scripts, I start by copying `common-debian.sh` from Microsoft's official containers and then modifying it to include tools I want and removing those I don't.

## Install your dotfiles!

Finally, let's tell VS Code to automatically clone and install our dotfiles when opening a devcontainer. This step is pretty easy - there are extension settings that let you configure your dotfile repository location and installation script. Mine looks like this:

![Dotfiles Settings](/images/posts/vscode_dotfiles.png)

## Conclusion

And there you have it! Now anyone who has VS Code can connect to your devcontainer and automatically get an environment that's set up for them to work with. If you use GitHub Codespaces, you can even code in a browser now!

![GitHub Codespaces in Safari](/images/posts/codespaces.png)

Devcontainers are really exciting, and big tech uses this style of development for strong reasons. Microsoft has made it easy for smaller projects to get the same benefits, and I can't wait to add devcontainer support to my projects.
