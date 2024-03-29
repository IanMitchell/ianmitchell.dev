---
title: Using IntelliSense with JSDoc
date: 2021-08-18
excerpt: You can get VS Code IntelliSense by documenting JavaScript with JSDoc - no TypeScript required!
---

Did you know that you can get [VS Code IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) with vanilla JavaScript? By using [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) annotations, VS Code's TypeScript Language Server can understand your code without it actually being strictly typed.

I use JSDoc extensively in the codebase for my Discord bot, [Aquarius](https://github.com/ianmitchell/aquarius). As Aquarius grew in size, it became harder to remember function names and parameters. Problems that, you know, a type system would solve. I have a strong preference for dynamic languages though, and didn't want to rewrite my codebase in TypeScript. JSDoc offers me some benefits of a strictly typed system without having to fully switch to one. Plus, using JSDoc forces me to document my code - which I think I read once is a recommended practice or something?

## Using JSDoc

You can find additional information by [reading the JSDoc documentation](https://jsdoc.app) and on the [TypeScript reference page](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html). Note that not all JSDoc parameters are currently supported!

## Documenting Classes and Variables

You can document both class variables and methods with types and descriptions. As an added benefit, this enables "Go to Definition" by ctrl/cmd+clicking usages throughout your codebase.

```javascript showLineNumbers
class Aquarius {
	constructor() {
		/**
		 * Database connection for Aquarius
		 * @type {PrismaClient}
		 */
		this.database = database;

		/**
		 * Manages the Guilds for which Aquarius is a member
		 * @type { typeof import('./core/managers/guild-manager') }
		 */
		this.guildManager = new GuildManager();

		/**
		 * Stores interaction handlers
		 * @type {Map<string, SlashCommandBuilder>}
		 */
		this.applicationCommands = new Map();

		/**
		 * Stores interaction handlers
		 * @type {Map<string, (CommandInteraction) => unknown}>}
		 */
		this.applicationHandlers = new Map();
	}
}
```

![Class methods and properties are displayed](/images/posts/jsdoc/classes.png)

## Documenting Functions

For functions, I list the parameter types, return types, and default values.

```javascript showLineNumbers
  /**
   * Get the list of Global Command Names
   * @param {boolean} [includeHidden=true] - Whether to include hidden commands
   * @return {string[]} List of Global Command Names
   */
  getGlobalCommandNames(includeHidden = true) {
    return Array.from(this.help.entries())
      .filter(([, info]) => info.global && (includeHidden || !info.hidden))
      .map(([key]) => key.toLowerCase());
  }
```

![Methods show up in IntelliSense with argument data](/images/posts/jsdoc/methods.png)

## Importing Definitions across Files

For core classes and functions I need to reference from elsewhere, I use inline imports or typedef imports. I also import annotations from npm packages this way!

```javascript showLineNumbers
/**
 * @typedef {import('./aquarius').Aquarius} Aquarius
 * @typedef {import('./core/commands/settings').default} Settings
 * @typedef {import('./core/commands/analytics').default} Analytics
 * @typedef {import('discord.js').Message} Message
 */

class SettingsManager {
	constructor() {
		/**
		 * Manages the Guilds for which Aquarius is a member
		 * @type { typeof import('./core/managers/guild-manager') }
		 */
		this.guildManager = new GuildManager();

		/**
		 * The configured guild settings
		 * @type {Settings}
		 */
		this.settings = new Settings();
	}
}
```

![Package annotations are also supported](/images/posts/jsdoc/package.png)

## Defining Complex Objects

I define a handful of complex types that I use throughout the codebase for Aquarius in a `typedefs.js` file (I know, I know).

```javascript showLineNumbers
/**
 * Description of the exported Info object by Commands and Plugins
 * @typedef {Object} CommandInfo
 * @property {string} name - The name of the Command
 * @property {string} description - A short description of the Command's function
 * @property {string} [usage] - A DocOpt usage description
 * @property {number[]} [permissions] - An array of required permissions for the command
 * @property {boolean} [hidden] - Whether the command should show up in the command list or not
 * @property {boolean} [disabled] - Whether the command is currently disabled or not
 * @property {boolean} [deprecated] - Whether the command is deprecated or not
 */

/**
 * Description of a CommandParameter passed into Plugins and Commands
 * @typedef {Object} CommandParameter
 * @property {Aquarius} aquarius - reference to the Aquarius Client
 * @property {Settings} settings - modify settings for the command
 * @property {Analytics} analytics - track events for the command
 */

/**
 * Function that defines commands and plugins
 * @typedef {({ aquarius, settings, analytics}: CommandParameter) => null} Command
 */
```

---

If you already use TypeScript, this post isn't meant to convince you to stop. But if you're like me and don't enjoy typed languages, give JSDoc annotations a shot. You might really like them!
