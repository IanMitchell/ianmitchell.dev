# CSS Hover Media Queries

Recently I've been working on a project to fix "stuck hover-state" bugs on mobile devices. You frequently see these bugs when you click a button on mobile web, and the active state persists after event completion.

It doesn't appear to be well-known yet, but with CSS media queries you can scope your styles to only apply to devices that support the hover state:

```css
@media (hover: hover) {
	a:hover {
		border-bottom: 1px solid var(--theme);
	}
}
```

[Browser support is great](https://caniuse.com/mdn-css_at-rules_media_hover)! There are a [bunch of other options](https://caniuse.com/css-media-interaction) for things like detecting stylus devices, but personally I've only used the hover state detection.
