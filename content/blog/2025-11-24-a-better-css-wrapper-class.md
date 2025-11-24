# [A Better CSS Wrapper Class](https://css-irl.info/breaking-out-of-a-central-wrapper/?utm_source=pocket_shared)

My usage of this technique has been increasing over the last year. With the release of Tailwind 4, I turned it into a utility class I can reach for outside of the core page wrapper definition.

```css
@utility wrapper-* {
	display: grid;
	grid-template-columns:
		[full-start] 1fr [wrapper-start]
		minmax(0, --value(--container-*)) [wrapper-end] 1fr [full-end];
	/*column-gap: 1rem;*/

	& > * {
		grid-column: wrapper;
	}

	& > .wrapper-full-width {
		grid-column: full;
	}
}
```

The column gap you need to define inline:

```html
<div className="mt-12 p-4 wrapper-3xl gap-x-4">...</div>
```

Having nested selectors feels like it breaks a few Tailwind-isms, but sometimes you need to choose practicality over purity.