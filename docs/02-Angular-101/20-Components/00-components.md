---
sidebar_position: 4
title: Components in Angular
sidebar_class_name: sidebar-big
---



Components are arguably the most important part of Angular, and we are going to spend a good deal of time helping you understand how they work, and what they are for.

When executing within your application, components are the thing that provides at least a portion of the user interface. Since Angular is a tool for creating user interface applications, you can see why they are so important.

## Designing a User Interface

Angular is probably overkill for a lot of things that people put in the web. Where it shines is when you are creating applications (as opposed to simple 'web sites'). I define an application as:

:::info Application:
Something created by software developers to provide specific business functionality using layers of more general tools
:::

In other words, there is something specific that your business needs users to be able to accomplish. For example, purchasing products, making airline reservations, making an appointment, etc. Our job as application developers is to use general purpose technology and create a user *experience* that guides the user in accomplishing what our business needs by providing supporting data, clear metaphors, instantaneous feedback, and pleasant user interface.


## The Role of Components In Our User Interface

Web browsers provide some basic, general-purpose structures for designing user interface. As we know, HTML, CSS, and some JavaScript will allow just about *any* business to create a website. While there is nothing *specific* in web browsers to any business, you can use these building blocks to create e-commerce applications for selling Warhammer&trade; figurines, gardening supplies, online encyclopedias, video sharing sites, insurance companies, and the list goes on.

As software developers, though, we create more *specific* things called "**abstractions**" that are central to our business or our project at hand. We like to give names to bits of associated data, code, etc. with class names, function names, library names, etc. 

HTML, for example, has only very low-level abstractions. You can specificy something is a heading, a hyperlink, an image, etc. but they are, by design, too general to allow us to reason about our business and the needs of our application in any meaningful way.

Frameworks like Angular allow you to *encapsulate* pieces of functionality and data and *name* it so that it is immediately part of the *vocabulary* of your application. For example, while HTML has forms, there is no *specific* "Log In" element in HTML. With Angular we can create a `LogInComponent` that *encapsulates* everything about our logging in process. It can be designed, developed, and tested in isolation from the rest of our application. When we are ready, it can be added to our application for users to interact with.

To Angular developers, an *application* is a hierarchy of components, each with specific responsibilities. Some components will provide single pieces of functionality within our application (like the `LogInComponent`), others can be reused in a variety of contexts (like a component that is designed to show the details for *any* product from our product catalog).

Train yourself to look at well-designed web applications and even web sites as hierarchies of components.

For example, if you look at a fairly simple web page (here, the [https://nodejs.org/en](https://nodjes.org/en)) site:

![NodeJS Site](/img/nodejs1.png)

You might see some candidates for components that would look something like this:

![NodeJS Components](/img/nodejs3.png)

The *template* for our root component in our application might just look like this:

```html
<app-masthead />
<app-main />
<app-legal />
```

The template for the `MastHeadComponent` might look like this:

```html
<app-logo />
<app-site-navigation />
<app-user-prefs />
```

The template for the `MainComponent` might look like this:

```html
<p class="description">Node.js® is an open-source, cross-platform JavaScript runtime environment.</p>
<section class="downloads">
  <p class="os-header">Download for Windows (x64)</p>
  <app-download-details isLTS="true" version="18.15.0" />
  <app-download-details isLTS="false" version="19.9.0" />
  <p>For information about supported releases, see the <a href="/release#release-schedule">release schedule.</a></p>
</section>

```

As you can see in these *psuedo* templates, our HTML markup is a combination of standard HTML elements, including classes, etc. as well as *specific* "new" elements (like `app-logo`, or `app-download-details`) that aren't a standard part of HTML - they are components we create in Angular.

## The Job of Components

The job of components is three-fold:

1. Accurately project the application state to the user.
2. Provide affordances through which the user can interact with the application.
3. Provide branding, and other static content to the user.

### Accurately Project the Application State

:::tip Application State
"State" is the value of all meaningful variables (data) in your application *right now*. For example, if you have a component that shows the contents of a user's shopping cart, it needs to show what is currently in their cart. If in another part of the application, they add an item to the cart, the *state* of the cart changes, and the user interface (our component) needs to *immediately* reflect that.
:::

State is **THE BIG** difference in building applications with tools like Angular and building server-side web applications with tools like PHP, Ruby on Rails, ASP.NET MVC, etc. These applications are *stateful*. 

*Stateless* web applications are different. For example, if you are on a standard e-commerce application and you click a button to add an item to your shopping cart, the actual shopping cart data is *not* maintained in your application's memory. When you add an item, a request is made to the web server to add that item. The data is probably stored in a database or event stream somewhere. When you want to *see* the content of your cart, you *navigate* to another page where the server queries the database, writes out some HTML, and shows it to you.

The *experience*, in this case, for the user is *fine*. It like browsing the web. There are these little (or long, depending on your connection quality and the load of the server), delays between each interaction while the web server collects the *current* state and projects that on to a web page that is loaded in the browser. We could call this the "browsing the web" experience and there is nothing inherently *wrong* with it. However, where Angular excels is in creating *application-like experiences*.

Start paying attention to the "felt sense" of using different pieces of software on your machine, or even visiting other web sites. There is a different experience when you are playing a video game than when, say, you are browsing Wikipedia. There is a different experience when you are using something like Google Calendar than when you are browsing Amazon.com.

We could qualify these differences in several different ways:

- Direct manipulation of State.
  - For example, to move an appointment on your Google calendar from today to tomorrow, you simply drag and drop it. It is intuitive, and responsive. 
  - You are *not* filling out a form, submitting it to the server, and waiting for an updated version of your calendar to appear.
- Network Disappears
  - If I place an order on most e-commerce web sites, and stare at my order history page for three days, it will *never* update unless I refresh the page.
  - Other sites give me instantaneous feedback without me initiating it. For example, someone just liked a picture I posted on Instagram.
- Responsiveness
  - Sometimes you are on a website and you fill out a form and hit the submit button. There is often a slightly uncomfortable moment or two where you aren't quite sure if you really hit the submit button. The page may disappear for a second or two, and, hopefully, *eventually* you get a response back. Sometimes the response is a bunch of errors that you have to correct (sorry, those Taylor Swift tickets are *long gone, buddy!*), and you have to start the process over again.
  - Good user interface/experience guides you into the "pit of success". As you interact with the application you get *immediate* feedback, buttons react when you click them, drop down selection lists don't have a delay while some network call happens. You feel *held* through the experience. **This is the experience we want our customers to have, especially when we want more of their money**.

On the web, this type of application has been called a "Single Page Application". This term is meant to connote the fact that you are not *navigating from page to page, like you might on a news site*, but interacting with an application. When you use an application like GMail, for example, you aren't thinking "Wow! All this on a *single page!*", you are, most likely, not thinking *at all* about the technology. GMail is just a thing I use to do email. I call these kind of experiences "Apps".

We usually think of the term "app" for something that we might install on our mobile device, like a game, a calendar tool, a social media application, etc. and I think the metaphor holds. Have you ever noticed the difference between a well-designed application from a company, and one that is very obviously just some kind of *wrapper* around their web site? To me, it almost always immediately identifiable, and the experience isn't great. 

Why am I saying all of this? Basically, if you don't need an "App" like experience, but a "web server" like experience, then don't use Angular. Angular shouldn't be a replacement for proven technology we have decades of experience using. 

:::caution
**IF** You can build your application using something like PHP, Ruby on Rails, or ASP.NET MVC, you probably shouldn't use Angular (or any other front-end framework). Often those kind of applications can be built (and maintained) for a *fraction* of the price, delivered more quickly, and even enhanced with some JavaScript using tools like Vue or Svelte to give "islands" of interactivity where you need it. I've seen projects that cost millions, and cause all sorts of headaches where they could have been a simple MVC site, and offer nothing in addition to that.

Your job as an *application developer* is to apply technology *appropriately* for the good of the business.

Now that doesn't mean, obviously, Angular is *never* a good choice. With Angular you can create a user experience that far exceeds what you can do with most server-side web application technology. You can create new user experiences that extend your business in ways we just couldn't do before. 

When building Angular applications, you are building *Apps*. Think about applications, not web sites. 
:::
