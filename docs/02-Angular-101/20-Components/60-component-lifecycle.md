---
title: Component Lifecycle Introduction
sidebar_class_name: sidebar-lab
---

## Component Lifecycle Introduction

> TODO: Compare the behavior of the common module component where the data disappears when you navigate off to the binding expressions component (which has the memory leak). We will use lifecycle hooks for the binding expressions, and a service for the commmon module stuff.


If you visit our new component and keep your developer tools open, you will see the `console.log` message of "time waits for no man" appearing in the console. Now navigate to another component by clicking on the *Home* link in the `navigation` component. Wait a second or two, and you'll see it *keeps logging*. 

When we navigate away from a component (here, our `BindingExpressions` component), it is *destroyed*. Taken out of memory. Candidate for garbage collection. All that. So why is the `console.log` still running every five seconds?

The `setInterval` function is a browser function. We gave it function to run, like this:

```js
    setInterval(() => {
      console.log('time waits for no man');
      this.age.set(this.age() + 1)
    }, 5000)
```

We ran this code in the constructor of our TypeScript component class. The browser now "owns" a reference to this function, and since in that function we refer to a field of the TypeScript class (the `this.age.set(this.age() + 1)`) call, we say that this function "closes" around the class fields. This is a concept called a *closure*. *Since* something *else* (here, the browser's `setInterval` function) has a reference to a function that closes around some of our TypeScript classes data, that component class cannot be garbage collected. 

As a matter of fact if you navigate to the BindingExpressions component several time, over and over, watch the console in your dev tools. You will see new log messages being written at a frequency way greater than every five seconds.

Congratulations! We have created a memory leak! 

You can detect this in the dev tools.
