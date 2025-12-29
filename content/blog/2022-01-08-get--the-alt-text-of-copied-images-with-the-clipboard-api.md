# Get the Alt Text of Copied Images with the Clipboard API

I was doomscrolling on Twitter the other night and saw this tweet from [@FakeUnicode](https://twitter.com/FakeUnicode):

> Modern clipboardData events in JavaScript in FF/Chrome do include alt text when right-click "copy image" on a web page. But Twitter would have to parse the 'text/html' for the alt="". Hey @TwitterSupport.
>
> "Share" buttons could probably populate the clipboard with both.
>
> <cite>
>
>     [@FakeUnicode](https://twitter.com/FakeUnicode/status/1479298890985664512)
>
> </cite>

I had no idea this was possible! I might not be @TwitterSupport, but I did recently add [alt text support to Discord](https://twitter.com/discord/status/1461442402917359618). Wiring this up in Discord was pretty easy - we're iterating on how to inform users we've prefilled image alt text from their clipboard, but the code to retrieve and set the data is pretty simple.

```javascript showLineNumbers
// Simplified function
function handleClipboardEvent(event) {
	const file = event.clipboardData.files[0];
	let altText = null;

	// Find associated HTML
	if (event.clipboardData.types.includes("text/html")) {
		// Safely parse HTML and extract alt text
		const parser = new DOMParser().parseFromString(
			event.clipboardData.getData("text/html"),
			"text/html",
		);

		// All your favorite web APIs work!
		altText = parser.documentElement.querySelector("img")?.alt;
	}

	return {
		file,
		altText,
	};
}
```

> ℹ️ DOMParser vs Regex
>
> Using the DOMParser API instead of regex to extract the alt text protects against a lot of potential security issues and results in cleaner code. As a side benefit, any special HTML symbols like `&amp;` are automatically decoded!

If we're successful in finding a good UX for this, hopefully it will ship in Discord soon. I learned a lot from @FakeUnicode's tweet, and thought I'd share how I used the information in a complete function so others could try and do the same in their projects!
