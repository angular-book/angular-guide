---
title: Modifying the AppComponent
sidebar_position: 4.2
sidebar_class_name: sidebar-lab
---

import EmbedVideo from "@site/src/components/VideoEmbed";

The template for our AppComponent (`./src/app/app.component.html`) currently is full of stuff thrown in there when we ran `ng new`. 

Make sure your application's development server is running (`ng serve -o` in the terminal), and empty out all the contents of the `./src/app/app.component.html` file.

You should see an empty page in your browser.

We'll also get rid of the properties on our AppComponent class as well as the imports for the CommonModule and RouterOutlet in `./src/app/app.component.ts`:

```ts title="./src/app/app.component.ts showLineNumbers
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  //highlight-next-line
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
```

Note that we removed the TypeScript imports at the top of the file (leaving the import for Component), and *also* removed the items in the `imports` property of the component metadata on line 6.

Having the CommonModule and RouterOutlet imported into our component was saying that we are using some of the functionality of those items in our component. We don't need them now.

Next we are going to "sketch out" the overall structure of our application in the HTML template. We aren't going to worry about styling and all that yet, let's just get the general structure down:

```html title="./src/app/app.component.html"
<header>
  <h1>Angular Guide</h1>
  <p class="subtitle">Code for the Angular Guide Tutorial</p>
</header>
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
<main>
  <p>Our cool stuff will go here</p>
</main>
```

There is *nothing* Angular-specific in that markup. Those are just standard HTML elements. It's important to remember that this is *injected* into our `index.html` where the `<app-root></app-root>` select is.

If, in the browser, you look at our page at http://localhost:4200, you will see the content. Ugly, boring, but something. If you right-click on the page and select "View Page Source", you will see the source code delivered from the browser.

```html showLineNumbers title="View Source of our Angular Application"
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Guide</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"></head>
<body>
  <app-root></app-root>
<script src="runtime.js" type="module"></script><script src="polyfills.js" type="module"></script><script src="styles.js" defer></script><script src="vendor.js" type="module"></script><script src="main.js" type="module"></script></body>
</html>
```

A couple things to notice:

1. The `<app-root></app-root>` element is still there, but it doesn't contain any of our new content!
2. This is almost exactly the same as the source code file `./src/index.html`, other than the addition of the `<script>` tags on line 12.
    - Those script tags are injected in by our development server and contain all the code for our Angular application to "bootstrap". When that code runs in the browser after it is downloaded, it looks for the `<app-root></app-root>` selector and starts to build the DOM inside of that element.

:::note
Angular is, by default, a *client-rendered* framework. It uses the browser to build the user interface, instead of sending it static HTML from the server. There are ways to do all or some of the rendering on the server, which can be helpful in some scenarios, including search engine optimization, SEO. This is a rapidly developing technology in Angular.
:::



