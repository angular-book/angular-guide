---
sidebar_position: 4.1
title: The App Component
sidebar_class_name: sidebar-details
---

As we saw at the end of our last section on creating an application, when your Angular application starts up (bootstraps), a single component, the **AppComponent** connects to the selector element in your `./src/index.html` file, `<app-root></app-root>`.

Almost *every* Angular application begins as just one component, this **AppComponent**. We end up creating a *lot* of components, and each of these will somehow live within this AppComponent.

As mentioned above, components are a "runtime" thing in Angular. In our development work, we create a component with usually at least a TypeScript class with an `@Component({...})` metadata decorator, and a template. Templates *look* like HTML, but are actually quite a bit more. HTML does not have binding expressions, as we saw at the end of the last section. Furthermore, HTML has a pretty fixed vocabulary of elements and attributes that can be applied to those elements. It has rules about what elements exist, which elements can exist as children of other elements (be nested inside of them), etc. All of this is so that a web browser can reliably create the in-memory Document Object Model based on the HTML. The browser knows, when parsing HTML, that if it encounters a `<header />` element, for example, to create a new node in the DOM at a precise location, of type HeaderElement. If a browser encounters an element that it doesn't recognize, it doesn't throw an error. It just creates it as the most generic element in the DOM, usually a `<div />`. 

Angular templates allow us to extend the vocabulary of HTML using constructs like components, directives, and pipes. Through this, Angular changes HTML from being a purely declarative programming language to an imperative language - one that has things like variables, decisions (if statements, switch statements), and loops. The Angular team provides a set of these common constructs "out of the box", so to speak, but we can create our own.

Whenever we have a component, then, we should be clearly able to discern the reason for that component existing. For example, if I see in an Angular template something like this:

```html title="Fictional Component"
<section class="actions">
  <app-login-status />
</section>
```

We should be able to discern that the element (selector) `<app-login-status />` is another Angular component that is responsible for showing the status of the currently logged in user.

The job, or responsibility, of the AppComponent is to be the "root" of our application. The basic layout.

In the next section we will modify our app component, and refactor it to use presentational components that are responsible for various jobs in our application.