---
title: Inspecting the Document Object Model
sidebar_class_name: sidebar-details
---




So, somehow, despite the fact that the HTML from the server is practically empty, there is a Document Object Model (DOM) that contains our content (our `<header>`, or `<nav>`, with the list of links, the `<main>` section, etc.). We know this is true because we can *see it on the web page*. **You don't see anything on a web page that isn't present in the DOM**.

If we tried to visualize a simplified version the structure of the DOM, with the stuff we care about, it might look something like this:

![Map of the Dom](/img/dom.svg)

There is a **Document** object that has an immediate child of **Body** which three immediate children, the **Header**, the **Nav**, and the **Main** elements. Each of those elements has children, and maybe grand children (for example, the Nav element has a child of type `ul`, which has a child of `li`, which has a child of type `a`, etc.).

You can programatically inspect the DOM by using it's API. If you open the developer tools in your web browser and select the "console" tab, you can issue JavaScript statements and commands against the currently loaded document.

:::note
Angular writes some stuff to the console when it starts up, letting you know how it's doing, and that it is running in development mode. We can ignore that for now.
:::

If you run the following in the console window:

```javascript
document.body.children
```

It will show you the children of the `<body>` element in your DOM. You should see something like this:

```text
HTMLCollection(6) [app-root, script, script, script, script, script]
```

If you refer back to the HTML sent to the browser above, that maps. In the `<body>` element, there is our `<app-root>`, and 5 script tags.

If you then run the following in the console window to get the first child's (`<app-root>`) children:

```javascript
document.body.children[0].children
```

You should see the following, which should look familiar:

```text
HTMLCollection(3) [header, nav, main]
```
There's the stuff defined in our `app.component.html`. You can continue to run commands in the terminal to dig in to the DOM, for example:

```javascript
document.body.children[0].children[0].children[0].textContent
```

Should show:

```text
"Angular Guide"
```

This is saying something like "In the document, go to the body, then go to it's first child (our `<app-root>`), then go to *that* element's first child (our `<header>`), and find *that* element's first child (our `h1`), and display it's `textContent` property.

You can even manipulate the DOM in the browser. Try this in the console:

```javascript
document.body.children[0].children[0].children[0].textContent = "Who Needs Angular!"
```

If you look at the displayed page, the header now has your message!

If you've done web development before the days of frameworks like Angular, this is how we did it. We downloaded JavaScript to the browser that would inspect, manipulate, add nodes to, remove nodes from the DOM while the user ran our application. It was tedious, but you could do it.

### Inspecting the DOM

While using the browser console to dig through the DOM is fun, it can be a bit tedious. Modern browser have the ability to represent the current state of the DOM *as if* it were HTML. The **Elements** tab in yor browser's developer tools does that (note: you can also right click on the page and select "Inspect", or if you right-click on a specific element, it will show it to you in the developer tools).

Right-Click on the `<h1>` in our `<header>` element on the page and select "Inspect". You should see something like this:

![Inspect Elements](/img/inspect-elements.png)

You can see Angular added some stuff to our elements in the form of attributes. The highlighted line is the element you inspected. To the right is the style information applied to our element.

:::note Where Did Those Styles Come From?
We haven't applied *any* style information to our application yet, but there is some style information there. For example, on the `<h1>`, it says the `display` property is set to `block`, and the `font-size` property is set to `2em`. 

Web browsers have a "built in" stylesheet that provides some minimal styling. Simple stuff like this - that an `h1` should appear about twice as big as standard text (that's what `2em` means), and that is should be a  block level element (which means it gets a line of its own), etc. This is called the `user agent stylesheet`. The intentions are good, but it can be a bit of a drag for web designers (or us!). Turns out not *every* browser uses the exact same *user agent stylesheet*. Some browsers will display your stuff slightly differently than other. Designers (or developers working as designers), will often start with a "Reset", (example: https://meyerweb.com/eric/tools/css/reset/) which basically says remove all the user agent styling, and I will define my own. A less "scorched earth" approach would be to use a style sheet that *normalizes* the differences between browsers (example: https://necolas.github.io/normalize.css/). CSS libraries like Bootstrap, Blueprint, and Tailwind contain one or more of these techniques built in. 
:::

You can even modify the DOM by editing the elements displayed in the Elements tab. Notice that if you refresh your browser window, the `<h1>` element is reset to have the `textContent` of "Angular Guide".

## Cool Story, Bro. What's the Point?

Sending static HTML to the browser is fairly easy. You follow the rules, and the browser renders the HTML. But when you try to make a web browser a tool for developing applications, it gets more challenging. You will have some JavaScript running in the browser. It will have some "business logic" programmed, and some "data". You'll want that business logic to run, typically when the user does something on the page (clicks a button, fills out a form, etc.). These are called "Events". Those events almost always change the data in your JavaScript application. You have to (as the programmer) *track* the changes to the data and make sure you update the DOM element that is displaying that data when it changes.

**Most of your code will be maintaining the state of the DOM with your program data**, instead of most of your code being about the business stuff you are trying to implement. To make matters worse, not all those events happen at predictable times. Some things will happen one right after another (we call this *synchronous*), others will begin some work that will be completed at an unspecified time in the future. For example, we might have a button the user can click to get some data from the server through an API call, and when that data is returned we will update the DOM to reflect that data. But what if it takes a few seconds for that data to be returned (maybe a crappy API, or a bad internet connection)?. 

Angular (and other frameworks and libraries for doing this kind of work) is *primarily designed to insulate you from these problems* because they aren't problems that are *specific* to **your** application, they are general for **every** application that uses a web browser.

Angular doesn't (and can't) do *anything* you couldn't do with writing your own code in JavaScript in the web browser. It just takes care of a lot of stuff you'd have to write, and a lot of stuff you'd have to write *over and over again*. But there is nothing free in this world. You have to learn *Angular's* way of thinking about applications, it's *opinions* about how to write your code and structure your application so it can do the hard work for you. Leaving the real hard work of actually making a good application that meets the requirements of your business.