---
title: Fragments
date: 2020-06-06
excerpt: I always type out `Fragment` because it's more discoverable for engineers new to React.
---

I sometimes get asked why I always use "Fragment" instead of the shorthand version:

```jsx
{/* This: */}
<Fragment>{/* ... */}</Fragment>;
{/* Instead of this: */}
<>{/* ... */}</>;
```

I do this to help engineers new to React and/or web development discover what is happening. If they haven't been introduced to Fragments before it's easy to [search 'React Fragment' with Google](https://www.google.com/search?q=React+Fragment) and arrive at the official documentation. But when shown `<>` there are several questions that I generally get asked.

1. **Is `<>` HTML or React?** This comes up because it isn't named like a Component. React Components are traditionally CapitalizedCamelCase to distinguish them from HTML elements, which are all lowercase. `<>` is not clearly React or HTML.
2. **Does `<>` mean not equal?** In some languages `<>` is a comparison operator that means not equal. Some developers land here because `<>` is not inherently searchable. Search engines don't allow special syntax, and it's easy to find discussions on websites such as StackOverflow that aren't specifically about React.
3. **What is this?** Sometimes it just isn't clear what is happening, and I get a quick question asking for clarification.

I think part of me doesn't see the distinction between using `<>` and shortened variable names like `i`, `j`, `k`. As I get older I find myself drifting away from abbreviations as well, preferring `error` and `index` to `err` and `idx` respectively when possible.
