---
title: Web APIs for Beginners
startDate: 2015-05-19 # LOL
date: 2016-04-19
excerpt: A look at common API principles and information on how to use them.
---

While hanging out in [Milktea's Twitch Chat](http://twitch.tv/milktea)[^1] the other night a couple of viewers began asking me how to use APIs and for help understanding common terms. It came to light that people felt there weren't a lot of beginner-level posts about APIs; articles generally targeted an audience with an intermediate to high level of understanding. While answering questions and offering advice, I was encouraged to compile my knowledge into a blog post - and here we are!

This will be aimed more towards newcomers. I'll be making some generalizations and won't be addressing some finer points - with that said, if you do notice any glaring errors, omissions, or have questions, please let me know on [Twitter](http://twitter.com/ianmitchel1)!

## What is an API?

An [Application Programming Interface](http://en.wikipedia.org/wiki/Application_programming_interface) is a set of methods that you can use to retrieve and/or manipulate information. API's aren't necessarily web based; code libraries also have an API that applications can tie into. While every API is designed differently, they share a few common elements. For the purposes of this post, I'm going to focus exclusively on interacting with third-party Web APIs (the [Twitch API](http://dev.twitch.tv/) will be used frequently as an example).

Let's imagine a scenario -- take [Milktea](http://twitter.com/_lilchen) and [SchAmToo](http://twitter.com/SchAmToo), who frequently stream together. They've built a community of viewers who regularly tune in to watch them. Pretend that sometime down the road a group of spambots target their channels. The bots attack one stream, get banned, and move to the other stream. In order to stop the attack, each bot must be banned twice (once by each streamer). Wouldn't it be nice if Milktea and SchAmToo could share a ban list so each bot would only have to be banned once?

Even though Twitch doesn't offer the ability to sync ban lists, it's possible to create the functionality by utilizing the Twitch API. By running a program that calls different API methods, the two streamers can sync their ban list periodically. When Milktea or SchAmToo ban a user it would instantly be added to the other's ban list as well.

_Making a script like this wouldn't be hard to do! Many services provide APIs that you can work with. If you ever have a "it'd be cool if X service did Y" type idea, see if you can code the feature yourself._

### What can you do with an API?

Every API offers different functionality. We discussed one scenario above, but there are plenty of other things you can accomplish by leveraging different services.

For instance, SchAmToo has talked about how he is using the Twitch API and YouTube API on his website. When someone visits his page, the website checks the Twitch API to see if SchAmToo is currently streaming. If he is, the website displays information about the stream, including how many viewers he has. If he isn't streaming, the website instead displays his [YouTube channel](https://www.youtube.com/user/SchAmToo) and most recent video.

###### _A Note for Designers_

While understanding the technical details isn't as important, I highly recommend designers understand the capabilities of different APIs. Knowing what services your audience uses and what APIs those services have can lead to some [highly creative UX patterns](https://cloudup.com/blog/signup-autocompletion-with-gravatar). Think about how you can use APIs in your design process!

#### Useful Tools

There are a variety of tools that can help with API management and development - I've only used a few, but if you're on OS X look into [Paw](http://luckymarmot.com/paw). Paw allows you to save a list of URLs, easily customize parameters, test endpoints, and generate code for several different languages. It's one of my favorite development applications, and I highly recommend it.

_If anyone has experience with an API tool on Windows or Linux, please let me know!_

---

## Web APIs

Now that we have a bit of a basis on what an API is, let's dive into Web APIs.

#### URLs (Endpoints)

As we discussed earlier, an API is a set of methods that retrieve or manipulate information. On the web these methods are exposed via different URL endpoints. In order to call the method you send an HTTP request to a URL and receive a response. Imagine browsing the web with Chrome - you open it up, type in "http://twitch.tv" and hit enter. The browser sends a request to Twitch, which returns a response (the webpage). Chrome then acts on the information returned to it, and renders the response. An API behaves in a similar same way.

Looking at the Twitch API we can see a list of different URLs you can call. Let's take two specifically:

1. `http://api.twitch.tv/kraken/users/ianmitchel1/blocks` - Returns the block list for the user IanMitchel1.
2. `https://api.twitch.tv/kraken/chat/emoticons` - Returns a list of all emoticon objects for Twitch

So by sending a request to different parts of the website we get different information back.

#### REST (HTTP Methods)

A lot of the time you'll see an API describe itself as [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer). There's usually some confusion over what this means at first - it's an important term to know, however.

To begin with, the web is built on [HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol). The system itself is complicated, but what you really need to know is that by using HTTP you can visit a URL in different ways. When you send a request to an address, you can associate one of the following HTTP methods with it:

| Method | Description                                                                                                                                              |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | These requests should only **return** data.                                                                                                              |
| POST   | These requests should **create new** data.                                                                                                               |
| DELETE | These requests should **delete** data.                                                                                                                   |
| PATCH  | These requests should **partially modify** data (this is a newer method).                                                                                |
| PUT    | A combination of PATCH and POST. If the data doesn't exist, create it. If it does exist, modify it. In many cases, this method is used instead of PATCH. |

_These methods are sometimes referred to as [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) (Create, Read, Update, Delete). There are additional options, but they typically aren't important in terms of API design._

Browsers in particular use these methods all the time behind the scenes when interacting with websites. Say you want to make a Twitch account. You'd type the address into the browser, and hit enter. The browser will send a GET request, and display the homepage. You fill out a new user form, and hit create. The browser will then send a POST request indicating a new account should be created. You log in, and decide that you want to edit your account description. When you fill out the field and click "Update Profile", the browser will send a PATCH request to save your changes.

When an API says it's RESTful, what it means is you can interact with the API endpoints using these methods (each endpoint will usually implement a subset rather than all of them). If you think about what your request is trying to accomplish, you can usually figure out which HTTP method to use. For instance, if we want to find a list of your blocked users on Twitch, we'd construct a request like this: `/users/ianmitchel1/blocks`. What method should we use though? We're not editing, creating, or deleting information. We're just retrieving it - it would make sense to send our request using the GET method. And indeed, since Twitch has a [RESTful API](https://github.com/justintv/Twitch-API/blob/master/v3_resources/blocks.md) that's the HTTP method they specify you should use.

It's important to stress that a single URL can support different methods. For example, you might have an API endpoint like `my-api.com/users/ian` that supports a GET, PATCH, and DELETE request. The GET method would return information about the user, the PATCH method would update their profile, and the DELETE method would delete their account.

#### Return Types

When you send a request to a service, the response you get back contains data represented in a certain format. This is called the return type - there are two formats that you'll overwhelmingly see: [XML](https://en.wikipedia.org/wiki/XML) and [JSON](https://en.wikipedia.org/wiki/JSON).

XML is the older format of the two, and typically seen in enterprise software or legacy APIs. It's more verbose, which turns out to be an inefficiency; the more characters you have in a response, the larger the data package you need to download. This and several other reasons has resulted in JSON quickly becoming the predominant format used online (JSON also has the benefit of working extremely well with JavaScript[^2]).

Most services now will return JSON by default, but some can support XML by appending a `.xml` to the URL. My recommendation is to use JSON; it's more common in modern software, easier to use, and more lightweight than XML. For Web APIs especially, it's vastly preferred.

> How to troll:
>
> Start putting stuff in XML.
>
> <small>
> 	<cite>
> 		<a href="https://twitter.com/SwiftOnSecurity/status/651401028739338240">
> 			@SwiftOnSecurity
> 		</a>
> 	</cite>
> </small>

#### Accessibility

APIs can be accessed by any internet-connected device using any modern language, with one exception. Client-side JavaScript is usually restricted and blocked from accessing a third-party API due to [security concerns](https://code.google.com/p/browsersec/wiki/Part2#Same-origin_policy). The policy of allowing external, client-side JavaScript to access your API is called [Cross-Origin Resource Sharing (CORS)](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing). If the server has CORS enabled though, you're able to send requests to it without impediment. Most services will not have CORS set; it's relatively new and still catching on.

_It's important to note CORS won't be an issue unless you're using client-side JavaScript to access an API. Other languages and server-side JavaScript won't have to deal with it at all._

## Common API Features

Although API design differs from company to company, there are several common themes you'll run into. I've highlighted some below.

#### Rate Limiting

Rate Limiting refers to a service putting an artificial bottleneck on their API. Usually you'll see this expressed as "our API is limited to 10 calls / second" or something similar. Web services do this for a few reasons:

- To create a business model. Does your application need additional calls? You'll need to pay for a higher rate limit!
- To prevent unintentional [DDOS attacks](http://en.wikipedia.org/wiki/Denial-of-service_attack). If Twitter started to use your API, there's a good chance your site would crash under the massive load!

This is a little technical, but a good way to 'work around' rate limiting is to cache results. Imagine you have an application that calls an API with a rate limit of 1 call / 60 seconds, and you need to call it 1 time / 1 second. What you can do is make the first call to the API and save the result for 60 seconds. For all subsequent calls refer to the saved result rather than calling the API, up until 60 seconds has passed. _(Do note that this solution isn't perfect and won't always work)_

#### API Keys

An API key serves as your unique identifier. When you're starting to work with an API, most of the time the service will present you with a key for use in your application. Generally when you make a request to the service, one of the parameters you'll be required to send is this key. Without it, the request will be denied.

It's generally recommended to keep your API key secure. Services use API keys to track who is using what; if it looks like someone is abusing the API, it's a simple matter of deauthorizing the corresponding key. If you share your API key with someone else, you risk having your key banned on behalf of their actions.

For the most part API keys are given out freely when you start using an API. Some services restrict keys to paying subscribers, but it isn't a terribly common practice.

#### Authentication

Authentication is a common way of making sure only authorized applications or users are interacting with an API. If you're making an API call intending to update a user profile for instance, you'll usually need to provide a user's credentials in order to verify the request (if you could use Facebook's API to change the profile picture for anyone you wanted to it would result in chaos!).

Sometimes the account credentials will be part of the request url, but a more common form of verification is using [HTTP Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication). Setting these credentials is pretty straightforward -- in a jQuery ajax request, it'd look like the following:

```javascript
$.ajax({
	url: "http://my-api.com/api/v1/endpoint",
	type: "GET",
	headers: {
		Authorization: "Basic dXNlcm5hbWU6cGFzc3dvcmQ=",
	},
});
```

The string of random characters looks complicated, but it's not that bad! It's a [base64 encoded](http://en.wikipedia.org/wiki/Base64) string in the form of `username:passphrase` (colon required)[^3]. So, an updated function might look like:

```javascript
let auth = window.btoa(`${username}:${passphrase}`);
$.ajax({
	url: "http://my-api.com/api/v1/endpoint",
	type: "GET",
	headers: {
		Authorization: `Basic ${auth}`,
	},
});
```

Other languages will follow a similar flow. If you're using a HTTP request library, some will even have built-in methods to set this header!

#### HTTP Status Codes

[HTTP status codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes) are a common way RESTful APIs give feedback to the user. When you send a request, the response you receive from the API contains a headers section (similar to the one we set above for authentication) that contains information you can examine. One of the fields in the headers section is the HTTP code. If for whatever reason your API request fails, usually the HTTP status code will offer some insight as to why.

For instance, let's say you forgot to set your HTTP basic auth header before sending a request. The response body might be empty, which doesn't help you figure out what went wrong. But the status code in the HTTP header would read 401, indicating an unauthorized request. Knowing this, the bug becomes easier to figure out!

There are a variety of HTTP status codes that each signify different things. I've highlighted some common ones below:

| Code | Verb               | Description                                                                                                                                                                                                                      |
| ---- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200  | OK                 | This indicates a successful request. Yay!                                                                                                                                                                                        |
| 201  | Created            | This indicates that your request was accepted and a new resource was created                                                                                                                                                     |
| 204  | No Content         | Usually sent without a response body to indicate success                                                                                                                                                                         |
| 301  | Moved Permanently  | The endpoint URL has changed, and you probably need to update your request                                                                                                                                                       |
| 304  | Not Modified       | No content has changed since your last request                                                                                                                                                                                   |
| 400  | Bad Request        | Something is wrong with your request. Usually this means your URL is malformed                                                                                                                                                   |
| 401  | Unauthorized       | Your request doesn't have the proper authorization. Do you need an API key, a login token, or basic auth?                                                                                                                        |
| 404  | Not Found          | No content exists that meets your criteria. Check your endpoint spelling and request parameters (do you need to [escape something](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)?) |
| 405  | Method Not Allowed | Usually this means you used the wrong HTTP method (i.e., sending a GET request instead of a POST)                                                                                                                                |
| 429  | Too Many Requests  | This traditionally indicates you've exceeded your rate limit.                                                                                                                                                                    |

50x codes indicate an API call has failed due to an issue with the service, not due to an error in your request:

| Code | Verb                  | Description                                                                                                        |
| ---- | --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 500  | Internal Server Error | While processing your request, the API server crashed. Inform the service of the problem                           |
| 501  | Not Implemented       | While the endpoint exists, it currently doesn't do anything. Ask the service when you can expect it to be finished |
| 503  | Service Unavailable   | The service is down right now and can't be accessed                                                                |

_This list is not comprehensive - you might run into other codes as well. Different services implement these codes differently (and sometimes incorrectly)._

## Conclusion

So there we have it, a basic primer on APIs -- hopefully it wasn't too much of an information dump. Ultimately the best way to learn about APIs is to try to use one though. Find a service you want to tinker with and jump in! As my Alma Mater puts it, "Learn By Doing".

_If you have any questions or corrections, let me know. I welcome all feedback! This is my first time writing a post like this, so if something is confusing please reach out to me!_

[^1]: Since this topic came up on [Twitch](http://twitch.tv), I figured it would be apt to use the streaming platform as a recurring example. For those who aren't familiar with the service, Twitch is a website that allows you to broadcast your PC's video and audio to viewers who you can interact with in a text chat room. Twitch is primarily used to livestream video games.
[^2]: As mentioned in the [linked Wikipedia article](https://en.wikipedia.org/wiki/JSON) JSON stands for JavaScript Object Notation, which is a fancy way of saying it's a JavaScript object in string form. With XML, you need to create a complex parser in order to turn a response into an something you can use. With JSON, you can just use `let obj = JSON.parse(result)`. This is a lot faster for developers, and much less expensive computationally. JSON is now well represented in other languages; most have a library that allow you to construct an array or object from a JSON input. Subjectively, I think JSON is a lot easier to read and understand at a glance. If you're just starting with APIs, I would recommend not bothering with XML unless you're given no other alternative.
[^3]: Please note that this is **NOT** secure. When you base64 encode a string, it's a reversible process. You can run base64 decode to get the original input, making it a bad way of transferring passwords or other secure information.
