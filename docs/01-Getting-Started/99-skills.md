# Getting Started With Angular

The purpose of this document is to give you a broad overview into what it takes to become an Angular developer.

Angular applications run on a web browser. The Angular Framework assumes developers writing applications that run in a web browser have some assumed, _tacit_ knowledge on which the framework builds and extends with _explict_ "Angular things".

If you are coming to Angular as a software developer with little or no experience building applications that run in a browser, you will have to spend some time getting accustomed to that environment. It is a different world.

Many very successful software developers have spent large parts, or the entirety, of their careers mostly avoiding stateful user interface applications.

## High Level Knowledge Expected

### Application Development

I use the term "Application Development" here to differentate from other types of development, like systems programming, or service creation.

Application Development means you understand what goes in to creating an application that interacts with _human beings_.

You need to learn, study, and develop your skills in _User Interface Design (UI)_. You have to learn the idioms used in user interface, particularly those presented in a web browser.

You will also need to learn, study, and develop your skills in _User Experience Design (UX)_. We build applications to allow our users to accomplish complex tasks, while insulating them from the complexity as much as possible.

:::note Writing User Facing Applications is a branch of programming you will need to become comfortable with.
:::

### Distributed Applications

Angular applications almost always (aside from some "toy" demonstration apps), are part of an _ecosystem_ of running code.

Angular Applications rely on server-side code for providing data, initiating actions on behalf of the user, etc.

Because your application runs in a web browser, in front of the user, familiar techniques like database access, or even file system access are not usually available to you. Instead you have to rely on communication across the network (the Internet) to collaborate with services you or others create.

This communication is commonly accomplished using the _HTTP Protocol_, along with some _TCP Socket_ programmin in the form of _Web Sockets_.

:::tip Understanding the limitations of the browser, and basics of HTTP, etc. are required.
:::

You should also familiarize yourself with some basics of modern security, especially topics like _OIDC_, and JWTs, and how token exchange works.

### The Browser as an Application Development Platform

Web browsers are incredibly complex pieces of software with a long history. You will need to have some familiarity with the programmatic APIs available in the browser.

Chief amongst these is the _Document Object Model (DOM)_ . The DOM is an in-memory representation of the content displayed to the user in the browser. You programatically modify, append, delete nodes in the DOM to change what the user is seeing without having to regenerate an entirely new web page (in the old days we called this "Dynamic HTML").

The DOM lives in a separate world from your JavaScript code. The DOM has limited availability to the functionality in your code (through the _eventing_ model in the DOM), and _no_ direct access to the data in your JavaScript code. If the data in your application changes, you will have to have _some code_ that updates the DOM accordingly. Angular largely provides for this through _change detection_ but you need to be aware of how the "magic" is working behind the scenes.

Understanding the _limitations_ in a web browser is also important, as discussed above. Access to the file system, storing data on the users device, etc. are tricky subjects. Especially when we are building applications where the user may move from one browser to another, including moving from one device to another.

## Angular Explained

An Angular application is a program that runs. It runs inside a web browser.

It is not a "website" or "webpage" - within a running application written with Angular, everything you see on the screen is the product of JavaScript code running in the browser, utilizing the browsers APIs, and using those to both interact with the user running the application, and backend services that support the user.

Angular is a _framework_ for building _stateful_ applications that run on the browser.

Websites and web applications are typically _stateless_ and contain minimal logic. The logic is all on the server side. That means for every interaction the user has with the web application, a _round-trip_ to the server is invoked that generates another page.

Angular, on the other hand, is intended to build applications. More inline with apps you might run on your operating system (like Word, Visual Studio Code, Photoshop), etc. Those kinds of applications do not rely on server-side rendering of the page. The allow for the user to have _direct manipulation of the state of the application_ while using the application. A portion of your Angular application will be responsible for synchronizing that state with the server side.

## Building Angular Apps

The stuff that _is_ the Angular application, the part that runs on the browser, is just a smattering of JavaScript files, a little style information (CSS), and a tiny bit of HTML that works as a shell that delivers your application and starts it up ("bootstraps" it).

You use several technologies to build an Angular application:

### The Angular Framework and Other Libraries

Angular is a _framework_ for building web apps. A framework is code that is somewhat general purpose that you adopt as your "starting point" for building an application. A good framework has _opinions_. That means that it expects you to get to know it, how it likes things done, and in return, you will have to do less "boilerplate" work. It will also insulate you from common problems and issues. It will also, unfortunately, limit what you can do to some extent. Vary too far from the opinions of the framework, it's expectations, and you will have a hard time because you will be fighting _against_ it.

The Angular Framework requires you to work within it's conceptual model. More on that later, but Angular presents concepts like "Components", "Services", "NgModules", "Directives", etc. It is your job to understand these, and utilize them in building your application.

You will also utilize other _libraries_ when building your Angular apps. Libraries are like frameworks, in that that are code that you don't have to write that promote good practices, etc. but libraries are not as _opinionated_ as a framework. Libraries do things like validating data, handling authentication and authorization, etc. Some libraries you use will be very "general purpose", and used in lots of applications, not just Angular. For example, you might use a library called Luxon for working with dates and times. Other libraries are created to work specifically with Angular. They, too, adopt the conventions and opinions of Angular. Examples would be Angular Material (for UI), NGRX/Store for state management, etc.

> [!note] Frameworks and Libraries Are _Always_ an Expedient
> We use them so that we can focus on solving business problems over technical problems.

### TypeScript and Angular Templates

You extend the Angular framework to build your application by creating Components, Services, etc. These are created using the underlying types and functionality provided by the framework, and written primarily in the TypeScript programming language.

Angular components are arguably the most important part of your application.

> [!definition] Angular Component
> Components are responsible for an area of user interface. They present data and content, and often provide _affordances_ (buttons, forms, switches, etc.) through which the user can interact with the application.

Angular Components are unique in the Angular Framework because they are written in two different programming languages. A component is always a minimum of two pieces of source code. The Component class, which is a TypeScript class, decorated with a metadata decorator provided by the Angular framework, and an Angular Template.

Angular Templates are a programming language. Instead of being based on familiar programming languages (for example, TypeScript looks a little like JavaScript and C, C++, C+, Java, which in turn look a lot like Algol), Angular Templates are based primarily on a _declarative_ programming language called HTML. HTML is fantastic for expressing hierarchies of content. Angular Templates embrace that, and extend it with functionality that is more _imperative_ than HTMLs strict _declarative_ style. In Angular templates, you get everything HTML has to offer, plus:

- The ability to have variables (Template Variables)
- The ability to make decisions (if/else, switch, etc.)
- The ability to loop over data (ngFor, etc.)

These templates, while they appear to be HTML, are actually a programmming language. They, like our TypeScript, are compiled to JavaScript.

For example, an Angular Template that looks like this:

```html
<div>
  <p class="greeting">{{greeting}}</p>
  <p #message>Hello, World!</p>
  <button (click)="changeMessage(message)">Click Me!</button>
</div>
```

Is a mix of just plain HTML (template stripped of Angular specific directives and additions):

```html
<div>
  <p class="greeting"></p>
  <p>Hello, World!</p>
  <button>Click Me!</button>
</div>
```

The additions of the:

- `{{greeting}}` is a _binding expression_ to some data on the typescript class.
- - `#message` template variable
- `(click)="changeTheMessage(message)"` output

Are instruction that when Angular compiles your application, it should emit some JavaScript that:

- Knows how to create the elements in the Document Object Model in the browser.
- Knows that the `<p class="greeting"></p>` element contains some data in the component class, and it should not only _display_ that value there, but also _watch_ that value in the component class for changes, and automatically update the display. That is a _ton_ of code you don't have to write.
- Knows that the `<button>`, when clicked, should execute some code on the component class, giving that code a reference to the `<p>` with the template variable names `message`. (the `#` is the syntax for giving an element an name in the template that can be referenced in the generated code.)

> [!note] What this Means
> You have to know HTML. Just plain old HTML. Angular _assumes_ you know that already. This is _tacit_ knowledge that the Angular team assumes if you are going to build applications that run in a browser. In addition to this, you have to _extend_ your knowledge of HTML with the _explicit_ knowledge of Angulars additions to HTML - the directives, etc. **If you don't already know HTML you will not be very successful**. It would be like trying to memorize a song in a language you don't understand.

### Style Sheets

Another thing Angular borrows from the _tacit_ knowledge of most web developers is Cascading Style Sheets. These are declarative instructions for how content on a web page should be displayed (styled), and it is kept separate from what the content _is_, or how it _works_.

Angular's build process can integrate with many different Style Sheet _preprocessors_, like SASS, and SCSS, but these are becoming less common now that the standards for Style Sheets allow greater flexibility.

Angular provides convenience functionality to make working with style sheet information easier and more predictable, especially in large projects with many contributors. For example, Angular allows developers to create style sheets that are _specific_ to a component, and the rules expressed won't unintentially impact other components or content in the application.

### The Angular Development Environment

#### The Developer Experience

Angular, especially the developer tool called the _Angular Command Line Interface (CLI)_ provide a developer experience for creating, building, extending, testing, and delivering Angular applications.

It utilizes a ton of Node.JS applications that compile, run development servers, bundle, and debug/test your application.

You work within a development environment. Many (most?) people use VS Code. As a matter of fact, the Angular CLI pretty much assumes you are using VS Code, it is so prolific.

You should be _very_ familiar with the features of your development environment. Learn VS Code. Learn _some_ about Node.JS, and the packages Angular uses to help you build your applications.

# Your Skill Inventory

This stuff won't come all at one. And you don't have to master all of it ever, especially to get started. However, _some_ familiarity with the following topics is going to save you a lot of confusion and frustration.

### Programming

Programming is hard. And programming user interfaces is even harder. If you are still at the level of learning to match your curly-braces, you are going to move slowly. No problem. You'll get there.

However, no matter your programming skills in _other languages_ or environments, take some dedicated time to learn the TypeScript programming language. Especially the idiomatic way it is used in Angular applications. Angular applications rely on a more _functional_ programming style than an imperative or even _object-oriented_ style.

#### The Browser

You have to have _some_ familiarity with the browser and its capabilities (APIs).

#### HTML

Learn semantics and structure with HTML

#### CSS

Learn how CSS works, including styling and layout.

## Resources

Start here: [Front-end web developer - Learn web development | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer)

### Highlights:

##### Getting Started with the Web [Front-end web developer - Learn web development | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer)

Overview of a little history, web standards, HTTP, some HTML, CSS, and JavaScript

##### HTML [Introduction to HTML - Learn web development | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)

The `<head>` element and metadata.
Html text.
Hyperlinks.
Document and website structure.

## Knowledge Stages:

### 0: Oblivious

"I've never heard of this thing. What is it?"

### 1: Novice

"I've heard of it. I can look it up on Stack Overflow etc. and by copying and pasting, I can make it work and sort of understand it."

### 2: Advanced Beginner

"I'm getting there. Most of the time it's 'under my fingers', but I sometimes need to ask for help, or copy and past from other sources."

### 3: Competent

"I can apply this when appropriate with little or no need for other resources"

### 4: Proficient

"I've got this. I do it now without even really thinking about it. It's part of me."

### TypeScript

In this course, I'm assuming you are _at least_ **Advanced Beginner** level, with some competence.

Some Questions that might help you evaluate your level:

:::tip What is the difference between an Interface and a Type in TypeScript?
A few - but they are very similar in many regards. One key difference is interfaces are _naturally_ open. If you declare multiple interfaces with the same name, they extend one another. Types do not.
:::

:::tip What is the difference between the `any` type and the `unknown` type?
`any` tells the compiler to not evaluate any interactions with this type. Generally, it should _not_ be used. Instead use a type, or, if needed, use the `unknown` type. The compiler will require you to write safe code as you use a variable of type `unknown`.
:::

:::tip What is the "barrel" pattern in modules, and why is it used?
Barrels are a folder that have an `index.ts` file that re-exports types in that folder (and subfolders). They are used to simplify imports, and to provide the expectations for what types _should_ be used from that folder.
:::

:::tip What is a "Union" type? What is a "Literal Union" type?
A Union type allows you to specify a variables that conforms to each member listed in the union. Literals union types are a union of literal values (numbers, strings, etc.) that provide a valid domain of possible values for a variable.
:::

:::tip Name some differences between named functions and anonymous functions. How do you decide to use one or the other?

:::tip How do you declare a `default` export for a module and why might you do that?

:::tip What is a Tuple Type?

:::tip Give me an example of an object that would satisfy the type `Record<string, number>`

:::tip What is a higher-ordered function?
