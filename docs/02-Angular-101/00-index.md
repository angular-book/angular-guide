---
title: Getting Started With Angular
sidebar_position: 0
slug: overview
---

This tutorial is designed to get you up to speed quickly with Angular.

There are a lot of other tutorials and guides out there already. As a matter of fact, the Angular site [Angular.io](https://angular.io) has a couple of tutorials already. We suggest you check them out. [You can find them here](https://angular.io/tutorial). There is some good stuff there, but they were designed for at least one specific purpose - to show you the "happy" path. What we mean is that the goal is somewhat educational and somewhat marketing. 

Here we are assuming you've already decided (or it has already been decided for you) that you will use Angular for building your application. 

Where those tutorials take you through a canned demonstration of the "powers" of Angular, we want to show you Angular in a way that helps you learn how to "think in Angular". 

Another important thing we want to do differently here is help you in your skills self-evaluation tasks. Learning any technology is challenging. There is just *so much*. So, most people will tell you, somewhat correctly, that *before* you start writing applications in Angular you should know:

- HTML
- CSS
- JavaScript
- Source Code Control
- API Design
- Accessibility
- Web Browsers and Browser APIs
- Using the Developer Tools in your Browser
- etc. etc.

And that is just the beginnings of the *technical* side of building Angular applications. Don't forget you are building an *application* here! That means you are *applying all those things to usually a complex business domain to create something new*.

The challenging thing, we find, is *how much* of those things do you *really* need to know to build an Angular application?

When designing training materials, the instructional designer has an implicit contract, something like the following:

> "We will fill a gap. We will get developers from point "A" to point "B".

The more precisely you can define "point 'A'", the more success you will have getting the participants to "point 'B'".

## Things You *Must* Understand Before Beginning Angular Development

Angular is in the category of tools for delivering user interface software to users. There are a lot of ways to do that. Almost all operating systems have ways to create applications for that operating system. Everything from command-line interfaces running in a terminal to rich graphical user interfaces written for Windows, Mac OS, Linux, iOS, and Android, for example.

For example, you might have a great idea for an "App" and you decide to build it for iOS devices. There is a whole score of things you'll have to learn, and programming languages and tools to familiarize yourself with. 

The end result is an "app" that you can list on Apple's "App Store", and users can download and run. If they are using an iOS device that meets the rquirements of your application.

These kind of applications we will call "Native" apps. 

If you decide, based on the success of your iOS application you want to offer an Android variant of the app, you'll have to learn a *whole new set* of languages, tools, etc. Even if you use a tool that lets you share code and other assets for different types of applications, you'll have to learn those as well.

If you learn Windows development and build an application for Windows, you'll have to recreate that application if you want it to run on other operating systems.

There was a time where this was all there was, really. Native applications. For example, at one time if you wanted to run Microsoft Office, you had to have Windows. If you wanted to run Photoshop, you had to use a Macintosh. Eventually companies (like Microsoft and Adobe) saw enough value in creating multiple versions of their applications for different operating systems.  But wow, that isn't cheap. Or easy. 

The World Wide Web created another way to deal with this in a limited way. A somewhat *universal* application could be installed on each user's machine that was super generic. It provided minimal functionality, but could provide us some application-like functionality. The Web Browser. In the early days, the web browser was particularly "dumb". It was a while before you could even collect information from a user with a form. The only "hyper" thing in the Hypertext Markup Language (HTML) was the link. When forms were introduced, it created a way to collect data to a user and transfer that data to the server. Your web server would be programmed to receive that data and do something with it. 

The application logic was all at the server. If you requested the daily specials (by clicking a link), the server would send HTML to the browser, but it would be *generated* from the results of a database call, perhaps. If you updated the logic on the server, the only thing the user would have to do is refresh the browser to see the changes!

This is a great way to write some kinds of software. For example, this guy Jeff Bezos thought this might be a good way to sell books, and he seems to be doing ok with that model to this day. 

Users request a web page. The page is generated at the server dynamically. The user decided to act on that data in some way be making *another* request to the server using the *affordances* for doing those kind of things baked into HTML: Hyperlinks and Forms. Each time the user decides to act on what they are seeing (by filling out a form and submitting it, or clicking a hyperlink), the server just uses that to generate the *next* page. 

:::warning
If this is all you need, don't use Angular. If the user experience required can be fulfilled by a server-side technology like Ruby on Rails, ASP.NET MVC, PHP, etc. Use that. You'll be happier, and deliver more quickly.
:::

Eventually the browser became more than a completely "dumb" client that could just display some HTML, images, and have some forms and hyperlinks. JavaScript was introduced. But this only made the browser *slightly less* dumb. Browsers were updated to allow that JavaScript to modify what the user was seeing without making a round-trip to the server to get another page. You could do some form validation on the client, you could do more interesting navigation affordances, etc. But really, if anything fundamental needed to be udpated on the page, it was time to go back to the server and get another page.

Microsoft snuck in some capabilities of their web browser, Internet Explorer, at the time that changed everything. They created a plugin (using a rightfully maligned technology called "ActiveX") called the XMLHttpRequest (XHR) API. (When this was introduced *everything* had to have the name "XML" in it to be taken seriously. Kind of like "AI" now. Don't worry about it too much.) What this allowed developers to do is to use JavaScript to *programatically* send data to the server or request new, fresh data, *without requiring the user to leave the current page*. This was huge. Soon, all browsers copied this API, and the era of "AJAX" applications entered the arena. "AJAX" is an acryonym that stands for "Asynchronous JavaScript and XML" (again, don't worry about the XML part too much), but it meant that the user experience could be *much* better than before. Things like autocomplete in text boxes, notifications from the server, etc. became possible.

The experience for the user went from navigating multiple pages in a site to accomplish something, to largely staying on a single page.

Think of the different experience of browsing a site like Wikipedia or Amazon from using something like GMail. Like really think about that. Ponder it. One feels like "browsing the web", and the other is more like using an application. You click a button and something happens *immediately*. You don't have to navigate to another page to read an email, you just click on that email, and it is displayed to you. 

Sometimes this technology was created to create whole new user experiences (like GMail, or online calendars), other times it was used to just enhance existing server-side web applications.

One of the reasons this didn't catch on for many "line of business" applications was that it was challenging work. It was challenging for many reasons, but one in particular was that the "universal, generic, web browser" wasn't that universal. They didn't all implement the functionality needed for this in the same way. There were standards, but Microsoft in particular was famous for not adhering to those standards in their web browser, Internet Explorer. And *lots* of people were using Internet Explorer. But not everyone. It was almost like you had to create two "native" applications. One for people running Internet Explorer, one for everyone else. You'd literally check - "If this person is using Internet Explorer, hook up this code to run when they click on the button *this way*, otherwise do it the *standard way*". Eventually a great JavaScript library called jQuery was created that would handle that kind of stuff for you, but it was still a lot of work.

A lot of companies, if they needed a more "application like experience" for all or a portion of their web application just used Flash. Then that got killed by the iPhone and Apple. 

The good news is that browsers largely follow standards now. *And* they are much more functional and performant than they used to be. 

Three kinds of applications:

- Native Applications
    - A version of the application is created for each device/operating system.
    - Highest level of performance and customization.
    - Access to the underlying device is better (file system, etc.)
    - Must be installed by the user, and updated over time.
- Server Side Web Applications
    - A version of the application lives at the server. Updates are automatic on browser refresh.
    - Limited to mostly request/response, visiting multiple pages.
    - Only requies users to have a web browser, no other software needs to be installed.
- Browser Apps
    - *Some* of the logic and *state* is sent to the browser
    - Allows better reactivity - better user experience. 
    - More complicated to create that server side web applications.
    - Deliverable through a URL like web applications (no need to have customers install something from an app store)

If you are going to build Native applications, you have to learn how to program for that environment. Programming languages, libraries, all that.

If you are going to build server-side web applications you are going to have to understand the web stuff - HTML, CSS, JavaScript, and *also* your server side programming language, frameworks, libraries, SQL, etc.

If you are going to build Browser Apps you are going to have to learn HTML, CSS, JavaScript, etc. and the browser APIs for things like networking, etc.


## Skills you Need Before Beginning Angular Development

### HTML

HTML is a *markup language* for describing what a user will see on the page. It provides *structure* for the content on the page through creating hierarchies of things. This is important because it has implications for just about everything we do in creating Angular applications, from styling, routing, accessibility, and search engine optimization. 

The *meaning* of the structure of HTML documents is important for tools like screen readers for users that need assistance. The more meaning we can put around the structure of our application, the more it can be reasoned about (by our developers, designers, etc. as well as by assistive devices.)

You have to have pretty deep knowledge of HTML to be an Angular developer. You have to know the difference between a `section`, `article`, and `div` for example. Another good example is knowing what a link (an `a` element) represents beyond what it *does*. A link represents some content that will change the location of the page when you click on it. As you'll see, in Angular, you can do that with *any* element. You could have a paragraph of text that when the user clicks on it, some of our code runs and it navigates the user to a different page. But you must also annotate that text in the HTML markup as a link for accessibility. 

:::note TODO
Add links to good HTML tutorials here.
:::


### CSS

We provide style information for our application using Cascading Style Sheets (CSS). We can make a differentiation here between knowing how to make web applications look *great* from understanding CSS. Both are important, but don't feel like that is someone else's job (a web designer), so you don't have to understand it. 

Understanding how CSS styles are applied to elements through selectors is crucially important, even if you are a horrible designer. 

Understanding the relationship between good HTML markup, using semantic HTML and styling is important.

Understanding the "cascade" part of CSS if *vitally* important.

:::note TODO
Add links for good intro to CSS tutorials here.
:::

### JavaScript

We are using the term JavaScript very broadly here. 

The most important thing is that you understand how to write code. How things like variables, decisions, and loops work in programming languages like JavaScript. How to create *abstractions*, like functions and classes. How to create structures of data. 

JavaScript running in a browser, as it will with our Angular applications, isn't just those things, though - functions, classes, loops, etc. It is a way to interact with programmatic interfaces provided by the environment in which it is running - the web browser.

How do you use JavaScript to modify the Document Object Model (DOM)? This is good information to have, though you will only rarely do this in Angular applications. How do you use JavaScript to make a HTTP request to an API? Again, good information but we don't do that directly much in Angular. 


### Networking

How does a request from a browser get *routed* to the right server-side code? What is HTTP? What is TCP? What is TLS? How do friendly names get translated to IP addresses and what the heck is an IP address?


## How To Learn All of This

One of the authors of this course recalled a student taking an "Intro to Angular" course. They had prepared themselves by learning a *ton* of JavaScript before class. It was all new to them. The instructor noticed this person getting increasingly frustrated with what was being presented. Eventually the student said "I don't feel like you are showing some important things! Where are the *Immediately Invoked Function Expressions (IIFEs)*, where is the discussion of the difference between the *this* variable in functions vs. in methods on a class? Where is the discussion of making sure your JavaScript is loaded in the correct order?

All of that stuff is or was important in different contexts or times. But the web progresses. In JavaScript we have a better way now to accomplish what use to require those weird *IIFE*'s we used to write all the time. They added classes. And some of the other things are confusing, and caused a lot of problems (like the order JavaScript gets loaded on a page!). Angular and associated technology *insulate* you from that. The reason we use any library or framework like Angular is to keep us out of the much of technical details as much as possible so more of our brain can be directed to the application we are being hired to create. 

The challenge here is it would be understandable to say that if you are going to write Angular applications, you'd be best served by spending 36 weeks learning *everything* you can about Web Browser, about HTML, about CSS, and about JavaScript. That would be great. But a *large* percentage of what you learned will only be helpful in that you'll recognize that you don't have to know or deal with all that stuff in your Angular application.

The first thing is **giving up on the idea that you will ever understand and know all of this**. You will have to learn it incrementally, iteratively. There will *always* be something more to learn. This means you have to take the responsibility for this. Learn a little more than you need to get to the next spot. Implement something. Evaluate it. Move on. Learn more. Repeat forever.

How much HTML, CSS, JavaScript, Browsers, Networking, TypeScript, etc. do you need to know to get started. 

Just enough. If you are reading through this and something is mentioned that you have no clue about, *stop*. Go find out about it. Time box it. Say "I am going to take 20 minutes to figure out what an IP address is." for example. Then come back. 

If you have *never* written any software before, it would be a huge undertaking to make Angular your first choice for learning. If you've never written an HTML angle bracket before, maybe Angular isn't the best place to start. But don't feel like you have to be a master at all this before you can do some of this.

The authors of this content have taught Angular in classroom environments for *years*. The most challenging thing in teaching like that is almost *every* participant in the training *thinks* they meet the prerequisites, but then they encounter one thing they don't know anything about. But the class marches on. Fine. Then another thing, then another thing, and before you know it they have sort of given up. And still the class content marches on.

Some developers will get through this introductory tutorial in a few hours. Others should take *weeks* on it. Everyone that does it will find *something* they feel a little fuzzy about, and have to learn more about. We'll do our best to give you links and content to help you fill those blanks, but you have to be honest with yourself on assessing what *you* need to become proficient with this.

If you've never used a terminal before, issued a command from the command line, navigated a file system by issuing commands, go learn *a little* about that. Your confidence will increase incredibly. You don't need to get to the level of super HAXXOR Mr. Robot shell scripting person, but a little practice goes a long way.

Create yourself a document, use a piece of paper, whatever. Start making a "to investigate" list. And *follow up*.


