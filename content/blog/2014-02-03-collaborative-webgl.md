---
title: Collaborative WebGL
date: 2014-02-03
---

For my CSC 471 project, I thought it would be fun to take a 'Construct a House' lab which tasked students to make a scene editor using basic geometric shapes, and port it to the web. As a twist, I wanted to allow multiple users to edit the scene at once. I decided to use Node.JS, [socket.io](http://socket.io), and WebGL to accomplish my goal.

![Website Screenshot](/images/posts/collaborative_webgl.png)

## Backend Development

### Node.JS

The best websocket library that I knew of was a Node module, which meant using Node.JS as my backend language. I'd done a little work with Node in the past, and knew that most of the application would be done on the client side. I created a server that served up an index page, had a few listeners for WebSockets, and kept track of the shape stack.

### Express

[Express](http://expressjs.com) is a small framework for Node.JS witch makes setting up a basic server pretty painless. Although for my extremely limited backend functionality it was probably unnecessary, Express helped me get up and running very quickly.

### Socket.io

socket.io is a framework for WebSockets with various fallbacks (such as flash and polling) depending on the browser. It's extremely robust and well known, and it was very easy to get up and running.

Every time a user makes a change to a shape, I send a message to the server with the id of the shape and the new object. The server stores this information, and then broadcasts a message to all connected clients that the shape has been updated.

In addition, whenever a new user connects, the entire shape stack is sent from the server to the client.

One of the issues I ran into was how socket.io handles data; When I passed a shape object to the server, it retained its data but not its methods. When I received a shape update, I would take the data, update the stack, and send it out to all connected clients. The clients would then take this information and then have to create a new instance of the Shape class, take in this object, and then set all the shared fields to the value the server had passed.

## Frontend Development

### WebGL

I used WebGL to draw my shape stack on the canvas. I was surprised at how similar it is it OpenGL; it was fairly easy to pick up the general syntax. There were some interesting hurdles I ran into though:

Because I was using Express, all my HTML pages are rendered with the Jade Template Language. As it turns out, Jade is itself JavaScript, and you can run JavaScript code inline in your templates. Unfortunately, this created some major problems with Vertex and Fragment shaders -- JavaScript code that you're supposed to embed directly into your page. Jade was trying to interpret and run my Shader code, and was breaking since it didn't recognize all the commands. I had to manipulate my templates to use a special syntax that told Jade not to run the JavaScript, but rather to render it to the page.

### Sylvester

JavaScript doesn't have a mat4 type, so you need to create your own or import a library that does that for you. I found that there are a few options for this -- it seems that Apple, Google, and Mozilla each have their preferred library. I ended up using Sylvester, the library preferred by Mozilla. I also used some extensions that Mozilla recommends, which include the MultMatrix, TranslateMatrix, and RotateMatrix functions. I had to implement my own ScaleMatrix function (very easy with the Sylvester API).

One thing I didn't foresee was the limitations the library carries -- most tutorials with Sphere geometry are based off of Google's preferred WebGL library, which isn't compatible with Sylvester. Towards the end of my project, I discovered adding additional shapes such as a Sphere would take many more hours than I anticipated. This unfortunately limited my project to just using Cubes and Pyramids.

### jQuery

I used jQuery to connect the editor pane with the actual WebGL canvas and server. By listening for form field change events, I could grab the new values with jQuery selectors and update the shape stack. Whenever the user switches the shape focus, or when a shape is updated by another user, I would use jQuery selectors to update the corresponding fields with the proper values.

This could all be done with vanilla JavaScript, and probably should be, but due to time constraints I chose to use jQuery.

### Custom Shape Class

I created a custom shape class that kept track of Translation, Rotation, and Scale values in array format. It included the type of shape, what color it was set to, as well as the position, color, index, and normal buffers. I had an array of shapes that I would iterate through to draw, and included methods to easily update the various attributes. It took far longer than I anticipated to abstract geometry into a shape class, mostly because of the WebGL buffer construction code.

## Website Design

Although this was more of a technical project, I wanted to make sure my website was aesthetically pleasing. I didn't intend to spend much time designing the look of the website, but ended up putting a considerable amount of time on what you'd think would be trivial things.

### Dynamic Canvas Size

One of the biggest issues I had with the entire website was setting the canvas to fill a section of the website dynamically. Seems easy, right? As it turns out, not so much. CSS doesn't have a way to have an element fill a portion of the screen. I was able to calculate the width and height with jQuery, but the trick was actually resizing the Canvas.

When I used jQuery to set the width and height of the Canvas, jQuery did it via CSS. It turns out that when working with the HTML5 Canvas element, that doesn't really work. The width and height attribute of the canvas element specify the size, and the CSS width and height specify the zoom levels. So, let's say I have a canvas element with a width and height attribute of 500px each. If I use jQuery to set the width and height css values to 600 and 700, the canvas doesn't actually resize, but the viewport does. This causes the images to appear out of focus. It took a while for me to figure this out since it isn't technically an error, and isn't reported. A lot of solutions I found online didn't cover all uses cases either. I was finally able to figure out the correct function to use -- this ended up being the problem I spent the most time on (with the exclusion of abstracting shapes into a custom class).

```javascript
$(document).ready(function () {
	// Get the canvas & context
	var c = $("canvas");

	//Run function when browser resizes
	$(window).resize(respondCanvas);

	function respondCanvas() {
		var pp = parseFloat($("#panel").css("padding").replace("px", ""));
		var tp = parseFloat($("#title").css("padding").replace("px", ""));
		var w = $(window).width() - $("#panel").width() - 2 * pp;
		var h = $(window).height() - $("#title").height() - 2 * tp;

		c.attr("width", w);
		c.attr("height", h);
		$("#canvas").width(w);
		$("#canvas").height(h);

		gl.viewportWidth = w;
		gl.viewportHeight = h;

		drawScene();
	}

	//Initial call
	respondCanvas();
});
```

By explicitly setting both the width and height attributes and css values to be the same, resetting the WebGL viewport, and redrawing the scene on the website load and resize events, we can ensure that the canvas and viewport are correct. If you wanted to use this for a fullscreen application, you would set `w` and `h` to just equal the window width and height respectively.

### Areas of Future Work

If I had more time, I would definitely add additional shapes, Phong shading, and mouse controls. With the exception of the canvas, I spent most of my time just getting the server and client to sync up correctly, and didn't have time to implement a lot of functionality beyond the basic shapes and transformations. Being able to drag a shape with a mouse, use the virtual trackball to rotation a shape, and similar functionality is an obvious area of future work.

I'd also probably make it so only one user can edit a shape at once, in order to prevent weird sync issues when using the mouse. This would also open up the ability for a "delete shape" command, since there would no longer sync issues if a user deletes a shape someone is currently modifying.

## GitHub

You can find the source code for this project on [GitHub](https://github.com/IanMitchell/CollaborativeWebGL)
