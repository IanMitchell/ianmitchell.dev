# Using Display-P3 Color Space in Safari's `theme-color` Tag

I downloaded the Safari Technical Preview to take the new design for a spin, and thought I'd try adding a `theme-color` to my website. I was very excited when I found out it supports the [Display-P3 color space](https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/)! You can use it like this:

```html
<meta name="theme-color" content="color(display-p3 0.12 0.13 0.21 / 1)" />
```
