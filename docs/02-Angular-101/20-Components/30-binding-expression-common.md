---
title: Component Binding Expressions And Change Detection
sidebar_class_name: sidebar-lab
---

## Setup
We are going to create a component to explore more about binding expressions and application state. 

As explained in the last section, we are going to configure the Angular CLI to default to flat, inline template, and inline styles for our components.

Please run the following in your terminal inside your Angular application:

```shell
 ng config --global schematics.@schematics/angular.component.inlineTemplate true
 ng config --global schematics.@schematics/angular.component.inlineStyle true   
 ng config --global schematics.@schematics/angular.component.flat true; 
 ```

 We will then create a new component called BindingExpressions by running the following:

 ```shell
 ng g c component/binding-expressions
 ```
For now (our next section will introduce routing), we will have our AppComponent display this component in the `<main>` element.

Update the AppComponent to import our new component:

```ts title="/src/app/app.component.ts" showLineNumbers
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header.component';
import { NavigationComponent } from './components/navigation.component';
//highlight-next-line
import { BindingExpressionsComponent } from './components/binding-expressions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,
    NavigationComponent, 
    //highlight-next-line
    BindingExpressionsComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}

```

And in the template, show the component using it's selector:

```html title="/src/app/app.component.html" showLineNumbers
<app-header />
<app-navigation />
<main>
    //highlight-next-line
  <app-binding-expressions />
</main>
```

### Binding Expressions and Change Detection

In this lab, we are going to dig deeper into the binding expressions in Angular, and take a look at how Angular does change detection. Recall from earlier, we learned about the DOM (Document Object Model), and how JavaScript can be used to keep the display up to date for the users. All of that *still* has to happen in our Angular application, but Angular takes care of a lot of the tedious, error-prone work of keeping the **UI in synch with the application state**.

We use the term "application state" to refer to the *current* value of all meaningful data (variables) in our Angular application. 

For example, we might have a component that has a variable (a property) called `name`. We initialize this variable to `"Joe"` and we use a *binding expression* to tell Angular to show the value of this variable in the DOM so the user can see it.

We create another binding expression that displays the number of letter's in the *current* `name` property.

We add another property called `age` that has the age of Joe, 21. 

We display that age in the component using a binding expression.

We add another property on the component called `comment` and give it a value, but we do not use a binding expression to display it.

This is "state 1" - the variable `name` has a value of `Joe`, the `age` variable is `21`, and the `comment` variable has a value of `"This is just a comment"`.

We use another binding expression to display the length of the name. 


Your component will look like this:

```ts title="./src/app/components/binding-expressions.ts" showLieNumbers
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-binding-expressions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      Hello, {{ name }} (that is {{name.length}} letters long.)
    </p>
    <p>
      {{ name }} is {{ age }} years old.
    </p>
  `,
  styles: [
  ]
})
export class BindingExpressionsComponent {
  name = "Joe";
  age = 21;
  comment = "This is just a comment";
}
```

Your component will display like this:

![Binding Expressions 1](/img/binding-expressions-component-1.png)

Pretty cool. Angular used our template like, well, a template. It plugged the values of those variables into the locations of the binding expressions. Pretty neat, but we could do that with mail merge in Microsoft Word in 2000!. There is a *lot* more going on here.

When we use a binding expression, Angular is taking responsibility for one of the most important things in a frontend web application: Keeping the UI (what the user sees) in *sync* with the *state* of the application. So when we are using a binding expression like `{{ name }}`, we are telling Angular to display the value of that variable there, **and** watch it. If it changes, update the DOM for us. 

This sets up a whole mess of really complex code behind the scenes. It turns out that generalizing the ability to keep the DOM in synch with the data isn't a super easy process.

Angular has to have a way to *detect* or *notice* when those variables change, and make sure they are updated in the DOM for us. And because this is pretty much the most important thing a framework like Angular can do, it has to be super sure it doesn't miss anything.

**"But wait!"**, you might be saying. Those variables *never* change! It's true. Right now they aren't, and there are no mechanisms in place to make them change. 

But Angular is for creating *Reactive* applications. That's one of their marketing slogans, and in this case, it is a good one. What that means is that if you are creating an application that just displays static data from the server, you don't need Angular. But when you are creating applications that have data (state) that is going to be manipulated in the browser, then Angular will *react* to those changes and update the display for you.

:::note Get Off My Lawn Moment
If you are just starting out with web development now, you kids don't know how good you have it! Back in *my day* we'd have to write tons of JavaScript code to just update the display *each and every time* a variable was changed. There is *no way* in web browsers to put a "variable" in the DOM. You can't say "Hey, in this `h1` element, display the current value of this variable, and if it changes, update the display. The DOM is *not* reactive. If you want to change, for example, then `textContent` of a node in the DOM, you have to write that code. About 80% of the code we wrote back then was just doing that kind of thing. And it usually was buggy as hell.
:::

So, let's say we add some *affordances* through which those variables can change ("mutate" if you want to speak in 1337 programmer terms).

We'll add a button that lets the name change, and we'll start a timer. Every 5 seconds we will add a year to the person's age (brutal!)

This little demo will add *years* to this person's life:

<iframe src="https://giphy.com/embed/wViS9n0RqN2" width="480" height="300" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/wViS9n0RqN2">via GIPHY</a></p>


```ts title="./src/app/components/binding-expressions.component.ts" showLineNumbers
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-binding-expressions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      Hello, {{ name }} (that is {{name.length}} letters long.)
    </p>
    <p>
      {{ name }} is {{ age }} years old.
    </p>
    //highlight-next-line
    <button (click)="changeName()">Change the Name</button>
  `,
  styles: [
  ]
})
export class BindingExpressionsComponent {
  name = "Joe";
  age = 21;
  comment = 'This is just a comment';
  //highlight-start
  constructor() {
    setInterval(() => {
      this.age++
    }, 5000)
  }
  //highlight-end

//highlight-start
  changeName() {
    this.name = "Catherine";
  }
  //highlight-end
}
```

Here, on line 15, we are adding an HTML button element. Using in *output* directive called `click`, we are telling Angular to call the `changeName()` method on our component when the user clicks on this button. We will learn more about outputs later.

In the component, on line 30-32, we add that method. When the  button is clicked, our component will change the state of the `name` variable to `catherine`.

We also added a constructor to our component class. This will run as soon as the component is created, and will use the JavaScript `setInterval` function to run a function that increments the age once every 5000 milliseconds (5 seconds).

If you view this in the browser, click the button, and wait a while, you'll see the name change, the number of letters in the name will update, and, every five seconds, the age will update.

![Binding Expression 2](/img/binding-expressions-component-2.png)

"Out of the box", Angular has the ability to watch data that is part of a component for changes, and will notice those changes and update the display. So, when the user clicks on the "Change the Name" button, Angular detects that, when our method runs, it changed the name. So, DOM events can trigger change detection. In the case of the `setInterval`, though, Angular has to know when some code initiated *outside* the "world* of Angular is changing something - here it is the event from the clock. It could also be that data has arrived from an API call using the browser's Fetch or XHR APIs. 

In our example, when the name changes, it *also* has to update the binding expression for the length of the name.

As you'll see, with an application with a lot of functionality, and data shared and projected onto lots of different components, this can be a *big* job. 

In old AngularJS (Angular before Angular 2), the way this would work is that when it detected a change, AngularJS would just go check *all* the DOM elements on the page to make sure they still matched the state, and if they didn't, they'd update. This was really slow and inefficent. It also would miss things like timer events, API results, etc, so we'd have to nudge it by telling it it was time to check the state. And we'd forget. And we'd have bugs.

AngularJS would keep a list of all the values in our application, and every so often check each DOM element to make sure it had the value. So something like "Hey, we just had a change. I think `name` is supposed to be `Catherine`. I'll go ask that element what it is displaying, and if it is *different* than Catherine, I'll update it.

With even medium sized AngularJS applications this would cause horrible performance issues. Every time something changed, to play it safe, it would check *everything" by reading the DOM, and then updating the DOM if appropriate. The bigger the application, the longer this would take. In JavaScript, the code that runs your JavaScript (or, in this case, AngularJS's JavaScript) get about 16.666 milliseconds before it starts blocking UI updates. Your UI in your browser (the important part, the part that the users are looking at) would just become unresponsive for a bit, and then suddenly the new values would appear. (The Google performance engineers gave this phenomena that great descriptive name of "jank").

Angular (Angular 2, the thing *after* AngularJS) was largely created to help with this problem. They did lots of things, but some highlights:

- Unlike in AngularJS, values not displayed using a binding expression do not cause the change detection to cycle. In our component, the `comment` property is simply ignored for change detection because it is never displayed.
- Instead of the costly, slow checks against the DOM for each value, they introduced a *Virtual Dom*. Basically, they keep a lookup table in memory that says "this value is displayed in these locations in these components, and it's current value is 'Joe'". When change detection occurs, it can simply look in this table (the Virtual DOM) and see if the current value in the state matches the current value in the Virtual DOM. If they are the same, nothing needs to happen. If they change, the updates happen, then the Virtual DOM is told the new value.
- Introduced `zone.js`. Zone.JS is a library that "monkey patches" browser APIs. Monkey patching is a weird programmer term that means something like "take someone else's object or function and add some new behavior to it". So, for example, in an Angular application using Zone.js, we *think* we are using the browser's `setInterval` method to cause our update to the `age` variable to happen every 5 seconds, but really, we are calling an *imposter* that intercepts that call, marks that value for change detection, etc. and then passes it on to the *authentic* `setInterval` method. It does the same thing with the code we write to do API calls, etc.

This was hot stuff when Angular 2 was released in 2016. It has served us well. But it's starting to show some weaknesses. The good news is we are writing bigger, more functional applications and browsers are getting faster. The bad news is we still sometimes run in to problems with this style of change detection that says "Hey, when *anything* changes, let's just make sure *everything* is up to date.". Jank is creeping back in. And the Zone.JS thing? There is only so much it can do. There are certain things that could be done much more efficiently if we could just do it the direct way, and *signal* to Angular that a specific change happened. Zone.JS also doesn't allow us to take advantage of some of the cool things that have been added to JavaScript and TypeScript since it was introduced, like `async/await` for functions that return promises. More on that later.

The kind of change detection we are taking advantage of currently in our component is old school. In Angular 16 they began rolling out another, better way to do it.

## Signals

At first glance, signals appear to be a step backwards. They make us a little more responsible for change detection. Not super hard, but before we could just say `name = "Joe"` and be done with it. Using signals, any state that has changes that need to be tracked will be created as a Signal. Let's convert our component to use Signals and discuss them.

```ts title="/src/app/components/binding-expression.component.ts" showLineNumbers
//highlight-next-line
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-binding-expressions',
  standalone: true,
  imports: [CommonModule],
  //highlight-start
  template: `
    <p>
      Hello, {{ name() }} (that is {{name().length}} letters long.)
    </p>
    <p>
      {{ name() }} is {{ age() }} years old.
    </p>
    <button (click)="changeName()">Change the Name</button>
  `,
  //highlight-end
  styles: [
  ]
})
export class BindingExpressionsComponent {
    //highlight-start
  name = signal("Joe");
  age = signal(21);
  //highlight-end
  comment = 'This is just a comment';

  constructor() {
    setInterval(() => {
        //highlight-next-line
      this.age.set(this.age() + 1)
    }, 5000)
  }

  changeName() {
    //highlight-next-line
    this.name.set("Catherine")
  }
}
```

On line 1, we import `signal` from `@angular/core`. This is a function we'll use to create signals.

Jumping down to the component class we change all the data that will change into Signals. On line 21 and 22, we set `name` to the result of calling the `signal` function with it's initial state, and again with age on 22.

`name` and `age` are now `functions` we call to retrieve their values. They also have methods to set or mutate their values. On line 27, in the callback function for the `setInterval`, we `set` the value, adding one to the age. Notice the change where we use `this.age()` to retrieve the current value.

In the method to change the name, we update it to use the `set` method as well.

In the template in the component metadata, add parenthesis to each of those properties, stating we want to retrieve it's value.

What have we gained? In terms of functionality, nothing. This was a pure refactoring. *However*, we have bypassed the old change detection strategy. Since our code is being explicit about when we are changing the value (here, using the `set` method), Angular can update the DOM precisely  because it knows both when it is changed, and where it is used (in our templates).

We will use Signals throughout the rest of this guide.

:::note Signals in Angular 16 are in "Developer Preview"
What does "developer preview" mean? Technically it means it *could change* in future versions of Angular. For example, in Angular 14 *standalone* components were in introduced in developer preview, and were considered stable in Angular 15. Nothing changed on the things that were available in 14 when 15 was introduced, but some new things were added. I don't anticipate (but I could be wrong) anything will change with the signals API between 16 and 17, however an important piece of the "signals plan" isn't available yet in 16, and will be (hopefully) in 17. The ability to opt out of using Zone.js.  Getting rid of Zone.js (RIP), will help performance in many applications, and open us up to more conventional coding styles and interoperation with other JavaScript libraries. You will only be able to do this though, if you convert all your component state to signals. We recommend **if you are starting a project with Angular 16, just use signals. If you are maintaining older applications, and converting them to 16, start updating to signals. Not doing this will limit your choices in the future.**
:::

