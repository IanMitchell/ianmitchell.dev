---
title: Styleguide Variable Trick
date: 2016-04-28
excerpt: You can use CSS to display values that you don't want a user to select and copy
---

I recently [created a pen](http://codepen.io/IanMitchell/pen/grBvxw) that shows how to use a Sass mixin to display the value of a variable alongside the name, but in a way that doesn't allow the user to select it - no copy pasting the value, just the name!

I did this recently for Zillow's styleguide (we use Less) and figured I'd port it to Sass. The trick is pretty simple in nature - you just assign the value of the variable to the [CSS content](https://developer.mozilla.org/en-US/docs/Web/CSS/content) attribute.

<iframe height="300" style="width: 100%;" scrolling="no" title="CSS Styleguide Color Variable / Hex Value Displys" src="https://codepen.io/IanMitchell/embed/grBvxw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/IanMitchell/pen/grBvxw">
  CSS Styleguide Color Variable / Hex Value Displys</a> by Ian Mitchell (<a href="https://codepen.io/IanMitchell">@IanMitchell</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

The downside is you won't be able to search for the value - searching for "2ECC40" returns 0 results.
