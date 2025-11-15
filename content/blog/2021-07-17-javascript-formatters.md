# JavaScript Formatters

JavaScript has some excellent formatters in its newer APIs - they're starting to creep into StackOverflow answers, but check these out if you haven't seen them before!

## Formatting Numbers

Want to display a numerical value in a more human-readable format? Use [Number.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).

```javascript title="numbers.js"
const value = 1000000;
console.log(value.toLocaleString());
// => "1,000,000"
```

If you're using numbers with units or currencies, [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) has you covered.

```javascript title="currency.js"
const base = 165000;
const amount = 195000;

new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	currencySign: "accounting",
}).format(base - amount);
// => "($30,000.00)"

new Intl.NumberFormat("en-US", {
	style: "percent",
	signDisplay: "exceptZero",
}).format(base / amount);
// => "+85%"
```

If you want to get the ordinals, you can use NumberFormat with [PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)

```typescript title="ordinals.js"
const rules = new Intl.PluralRules("en-us", { type: "ordinal" });
const formatter = new Intl.NumberFormat("en-us");

function format(num: number) {
	const rule = rules.select(num);
	let suffix;

	switch (rule) {
		case "zero":
			break;
		case "one":
			suffix = "st";
			break;
		case "two":
			suffix = "nd";
			break;
		case "few":
			suffix = "rd";
			break;
		case "many":
		case "other":
		default:
			suffix = "th";
			break;
	}

	return `${formatter.format(num)}${suffix}`;
}

format(1);
// "1st"
format(2);
// "2nd"
format(3);
// "3rd"
format(10);
// "10th"
format(100124);
// "100,134th"
```

## Formatting Lists

Want to format a list of options in a readable format? Rails had a great implmentation with `humanize`, and now JavaScript does too! Check out [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat).

```javascript title="humanize.js"
const formatter = new Intl.ListFormat("en", {
	style: "long",
	type: "conjunction",
});

console.log(
	formatter.format(["Soccer", "Politics", "Video Games", "Programming"]),
);
// => "Soccer, Politics, Video Games, and Programming"
```

_It even uses the Oxford Comma!_

## Formatting Dates

Unfortunately, the Date API doesn't do well formatting time or durations - but the good news is that the new Temporal API does! The spec has a [fantastic section on formatting](https://tc39.es/proposal-temporal/docs/duration.html#toLocaleString). There are a few polyfills available, so you can use Temporal today if you want.
