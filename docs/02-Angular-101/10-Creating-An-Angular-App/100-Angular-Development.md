---
sidebar_position: 0
title: 📘 Big Picture
---
The *final result* of creating an Angular application is creating an HTML file with links to your compiled applications source code, CSS files, etc. These are *static* files, and they are placed on a web server so that your users can download and run your application.

In the early days of web development, you could simply create some HTML pages, a style sheet, and a few JavaScript files that were linked to your HTML pages using any old text editor. The sophistication of the things we'd put on the internet was much, much less than the things are expected of us now. Frankly, even then you'd get issues with things like caching, JavaScript files being included in an HTML page in the wrong order, and just generally produce a "big ball of mud" - an unmaintainable mess that was fragile, and you'd live in fear of it.

Our "job" as Angular developers is to produce just a few things:

- Some JavaScript code to make our application *do something*.
- Some CSS to make it look good.
- Static things like images and logos and stuff.
- An HTML page to host our application containing links the browser will follow to get our JavaScript, CSS, and images.

All of those things go on a web server somewhere. The users enters the address in their browser, and all that stuff gets downloaded and runs in their browser.

If you are just creating something *simple* like a home page for your family or bowling league, you could write all that stuff by hand, and create a few images and throw them in a folder.

You aren't going to be able to sell any widgets with that model, and you certainly aren't going to be able to collect credit card numbers, but it worked for us for a while.

For things like accessing databases, collecting and storing information from a user, and all that - you know the stuff that actually makes the web *great* and makes us some money, we started building "smart" web servers. They didn't just store static HTML pages. They would *generate* HTML dynamically based on the request. So if the user asked for the "HTML page" in your web browser for your daily specials, they might make an HTTP request to `https://my-company.com/daily-special`, and be delivered some HTML listing out the specials. But that HTML was *generated* by some code running on the server

But these days, our customers are more demanding. They expect

## TypeScript and JavaScript

Since JavaScript is basically an *interpreted* programming language, it was difficult to ensure you wouldn't get runtime errors in your application. *Good* JavaScript developers would often write *way more* lines of code testing their JavaScript before actually pushing their code to the web server.

Angular, like most modern tools for creating applications, has a complex setup for the developer that wants to do everything possible to deliver high-quality applications. Instead of just relying on static files for our JavaScript code, processing our CSS, etc. We introduce a tools (created by other web developers over the years, entirely open-source) for managing our source code, verifying our code, and providing an environment where we can both preview and test our changes *before* putting them in front of our customers.

One choice that Angular uses in this process is to use the TypeScript programming language. The primary purpose of TypeScript is to introduce a compile step in the production of your JavaScript.

For example, in JavaScript this is "valid" code:

```js
let movie = { title: 'Jaws', director: 'Spielberg'};

console.log(movie.directedBy);
```

It would just not produce to the console in your browser's development tools what you would expect. A keen-eyed developer that is used to strictly typed compiled languages would expect perhaps an error. That's not how JavaScript works - you'd just see the value `undefined` written to your console.

*If* however, you had written this in a TypeScript file (files ending in `.ts` and run it through the TypeScript compiler), the compiler would give you an error that lets you know that the movie object does not have a `directedBy` property. (The actual property is `director`).

This would give you almost instantaneous feedback that you had made a typo or mistake *before* you deploy this to production.

So, with Angular, we write our applications using JavaScript (since that's the language that web browsers understand). However, we write that JavaScript by *first* writing that code using a superset of JavaScript called TypeScript. Given just plain old JavaScript, the TypeScript compiler will detect a huge number of potential typos and other problems that might cause problems in actually running your application (when it is too late).

Professional software developers spend a lot of time creating ways to produce code where problems can be detected earlier as opposed to later. Inspired by the branch of enginnering created in the 1940's and 1950's called **Cybernetics**, we use the term "feedback loops" when talking about this stuff.

As developers we want a *fast* **Inner Feedback Loop**. The inner feedback loop is everything that happens while you are working on the code, on your machine. We say "if whatever I just did could cause a problem when the user is using this application (the far-end of the **Outer Feedback Loop**), let me know *now*.".

In Angular, using the TypeScript language is only the first part of creating this feedback loop.

## HTML and the Document Object Model

For example, browsers are pretty forgiving when it comes to using HTML properly. While HTML has "rules", and is a somewhat fixed vocabulary, web browsers don't complain much if you do something wrong. For example, a code snippet of HTML like this:

```html title="Atrocious HTML"
<h1>Super Site!<p>Created by a rad programmer</p>

<p class="pretty" class="important">I hope you Enjoy it</p>

<do-big-popup-thing-here />

```

Contains many errors according to the "rules" of HTML. For example, *according to HTML*, an `h1` element can't contain a `p` element inside of it, and if it did contain another element, it needs a closing tag. Attributes can only appear once per element (notice the `p` element has the `class` attribute defined twice?), and the `do-big-popup-thing-here` element is not a part of the HTML set of valid elements (last time I checked!).

But *imagine* what a bad user experience it would be if everytime you browsed to a web page that had *some kind* of error in the markup, the browser displayed an error message, or simply refused to display the page? It would suck! So mostly browsers just do their best to figure out what should be displayed, and do that.

:::note
Believe it or not, we got really close to a web where if developers didn't create correct markup, browsers would refuse to display the page. Google did a little research (they basically *are* a database of *everything* that is on the web) and something like 90% of the web would have gone black if the XHTML fascists had their way.
:::

The problem is, while the [World Wide Web Consortium](https://w3c.org) does specify what is considered *proper* HTML, it does *not* specify what browsers should do if the HTML is *improper*. It's pretty much up to the browser manufacturers. That means that the browser you are testing your HTML on might handle it in a way you don't detect, but another may display it in a completely different way.

The way Angular helps us with this in our *inner feedback loop* is that it actually doesn't use HTML *at all*. Similar to how we use TypeScript to produce our JavaScript (and verify it!), we use Angular Templates to create the Document Object Model in the browser.

### The Document Object Model

What you see displayed in a web browser is a projected, "painted" version of an in-memory hierarchy of objects called the Document Object Model (DOM). This DOM is created automatically (*declaratively*) when we send some HTML to the browser. The browser reads that HTML as a set of instructions for creating a hierarchy of objects in memory, then uses that object model to draw the page on your screen. Once the DOM is created, it has an API that JavaScript code can access and manipulate. On the next paint cycle (about 16.666 milliseconds on a 60hz display), the screen is painted again reflecting your changes.

When we write Angular applications, almost zero HTML is sent to the browser. We write *code* that *programatically* created the DOM. It's a bit weird. Try to follow here, and don't worry, pretty soon you'll be *doing* this, so it will most likely sink more then.

### Angular Templates

In Angular you define your application logic using the TypeScript programming language *and* by using Angular Templates. Where TypeScript can be considered a superset of JavaScript, templates are a superset of HTML. In other words, you write HTML. That HTML is *compiled* into JavaScript code that creates the DOM in the browser. As with TypeScript, that means there is an intermediate step (feedback loop) between what we create and what gets delivered to production. The compiler can check to make sure we are using HTML correctly. That sample above? It would never compile. And, again, like TypeScript's relationship to JavaScript, HTML templates *add* to the functionality of HTML. Events on HTML elements are able to be safely connected to our code that responds to those events. Changes in our application state (the data we have in memory in our applications) can be *automatically* detected and updated where it counts: In the DOM where the users see it. In addition to this, Angular has mechanisms in which we can extend the functionality of the HTML compiler with `directives` and `components`. We will learn how to create both of these in this tutorial. This means, for example, you could really have a "custom element" called `<do-big-popup-thing-here />` in your application if you needed to. This is *huge*. HTML is a huge success story, but it's success is largely because it is so *generic*. You can use HTML to create a web site for a dog grooming business, a Fortune 500 insurance company, the Vatican, or an adult site. There is nothing specifically in HTML about any of those businesses. That's great, but it makes it hard for us to both *reason* about the structure of our application, and to build a conceptual model that allows us to continue to grow, change, and adapt our application *over time*.

It's great (really, I mean it) that even the most miniscule typos in our HTML will surface as errors when we build our application. It can be a little annoying at first because you might realize how many dumb things you've done that didn't *seem* to cause any problems for anyone. "What!? I put elements inside an `h1` all the time! Never hurt me!" - but remember, what we want is as few "Heisenberg bugs" as possible. Those are the issues that show up only *sometimes*. Sure, pleacing an element inside an inline element like an `h1` maybe never caused you any problems in the past, but then there is some new release of some obscure Android browser, for example, that decides to handle that violation of the rules differently that *does* cause a problem. Better safe than sorry.

#### Angular Language Server

The Angular team ships a tool called a "language server". This is *all about* the inner loop. What language servers do is they are used by our development tools to ask questions more specific about the type of code we are writing more subjectively than a mere compiler. For example, TypeScript (which pretty much introduced the "language server" idea) also has a language server, and we can configure our development tools to feed it the code we are writing to get it's opinion on what we are doing. "I know this is valid code, but is it *good code*?".

The Angular Language Server can use an extension or plugin for your development tool (here we will use Visual Studio Code and the Angular Language Service extension) to give us feedback even *before* we compile the application - as we write it! So, if you make a mistake in your templates, it will surface as a visible error or warning in your editor before you even hit save. It can also offer code completions, and even some fixes and refactorings that can make your code better.

## CSS

Cascading Style Sheets are a *whole other world*. They are a kind of programming language, based on setting up rules that select various elements that live in the DOM and applying values to specific stylistic properties to those elements.

For example, you might decide that in your application you want *all* buttons to have the following styles:

```css
button {
    padding: 1.8em;
    background-color: 'goldenrod',
    color: 'green'
}
```

If this style was applied to your application, *all* buttons would have that styling. Except if they don't. That's where the "cascading" part of CSS comes in. A developer could say that they want a *particular* button to be a little bigger. They could add *another* style sheet, but that might impact things that already exist, or things to be added in the future.

Styling stuff is hard and takes a lot of talent and training, and since styling changes can impact things like layout, flow, etc. they are a bit dangerous. If we are building a *big* Angular application, being worked on by many different people, we want to be sure that we don't get changes appropriate in one part of the application to adversely affect other parts.

:::warning
That kind of thing - styling changes - is *challenging* to write automated tests for (we'll talk about automated testing later). This means a change in the styling is often not detected in our testing cycle.
:::

Angular has a pretty clever way of helping us to largely avoid those kind of issues. It defines a central place for any "global" styles in our application, and then mechanisms for preventing changes in one portion of our application (a component or a feature) from "leaking" into other parts of our application.

Like with our TypeScript and Templates discussion above, Angular also has a way to allow us to process CSS as part of the build process. Various mechanisms can be used (or none at all), including SCSS, SASS, and Post-CSS. We will discuss the advantages of this in later sections in the training.

## Assets (Images, Etc.)

The last part of our "deliverables" as a frontend developer are assets like images, logos, videos, etc. While we can also use `img` tags to pull these kinds of things into the browser for our user from other servers (static servers, CDNs, whatever), some assets will be specific to our application and most likely will be hosted along with your application.

We have to make sure that when we *build* our application, those items are part of our build artifacts so they are on the web server and we don't have a bunch of missing images, etc.

Angular allows you to do this, and we will learn how. In addition, doing image optimzation is very important. There is no reason to send images that are scaled to a specific size in the DOM to be sent to the browser at a higher resolution than the browser or device can display. We have to images at an appropriate resolution for the *best* possible display they can be seen on, but then alternate versions for the times when someone is, for example, accessing our application on a crappy old Android work phone with a bad display. It would be wasted bandwidth (maybe even using some of their data plan), and delaying the time it takes for the image to be transferred.

In addition, sometimes images in particular are purely "ornamental". Someone might think the picture of the CEO playing with their dog wistfully in the yard is *important*, but if that is what is keeping our users from getting to what they need while they wait for it to *download*, it can be an issue. So we need a way to set a priority on our images.

Angular has a facility for dealing with all of this (spoiler: `NgOptimizedImage` directive), and we'll learn the basics of using it.

## Development Server

If you put even an accomplished "web developer" from the early 2000's in front of the source code for an Angular application they'd be *lost*. There is no obvious HTML files, if they find the `index.html` they'd be shocked to see it's practically empty! Where is the JavaScript? Where are the CSS files? When you build your application (discussed next), there will be a folder with that stuff in it - the HTML, the JavaScript, the CSS, the assets, etc. They would recognize *that* (but be shocked and probably nauseated a bit by how much JavaScript there is and how impossible it is to read!).

But the process is sort of upside down for us now. In the old days you'd *start* with the HTML, the CSS, the JavaScript etc. Now we start with these *weird* abstractions - TypeSCript, templates,

So you have these two worlds:

1. I have the source code - my TypeScript, my CSS, all that stuff. It doesn't do *anything*. You can't load that stuff in a browser!
2. When I *build* it, I get stuff I can load into a browser - the HTML, the CSS, and the JavaScript!

That's not a very good *feedback loop*.

Angular has a "development server". This is a tool you run while you are working on your application that "watches" what you do, and recompiles the application for you every time you make a change. It tells you if that was a good change or not. If it was a good change it creates a *close approximation* of what you will get when you do the final "build" of your application for production. It even starts a little dumb web server on your machine and let's you see what the application looks like *right now*, *if you would build it*. We'll do this almost first thing. It's cool as heck.

## Building Your Application

When we are at a point where we want to actually *deliver* something (in other words, it isn't going to be very useful just running on the development server on our laptop or whatever), Angular can build your application for you. It will create the artifacts - the HTML, CSS, JavaScript, assets, etc. - so that they can be *deployed* to a web server. This is a slower process than running your development server, because at this stage the compiler does really intense *deep* checking of things, and most importantly it *optimizes* your code. The build process really tries to create the *smallest amount of JavaScript, etc.* possible to run your application. It renames your big elegant intention revealing class and method names to save some bytes, it gets rid of any code that your application isn't actually using. We'll see how to do this at tend of this lesson.
