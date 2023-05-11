---
title: Refactoring the AppComponent
sidebar_class_name: sidebar-lab
---

Right now, our AppComponent has too many responsibilities. It is responsible for displaying the header, it is responsible for displaying the navigation UI, and the main content of our application.

This might not seem like much, and it seems to work Ok, but in programming we've learned it's best to put the stuff that changes together separate from other stuff.

That header is going to need some work. It's pretty ugly. Changing that will be a separate task from changing our navigation UI, and that needs *a lot* of work.

We are going to create *separate* components for the portion of our application that displays the header, and another one for our navigation UI stuff. Our AppComponent will *use* those, but won't be coupled to them. If they change (and they will), we don't need to change our AppComponent.

First we are going to create a component for our page header stuff. We are going to do this *manually*, so you can see what it entails, but we'll use the Angular CLI to do this kind of thing for us in the future (for our navigation stuff, for example).

The first question is, if you look at the stuff here:

```html showLineNumbers title="./src/app/app.component.html"
//highlight-start
<header>
  <h1>Angular Guide</h1>
  <p class="subtitle">Code for the Angular Guide Tutorial</p>
</header>
//highlight-end
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
<main>
  <p>Our cool stuff will go here</p>
</main>
```

What portion of the template are we talking about? I've highlighted lined 1-4 above, because they all seem to be about the same "thing" (e.g. displaying the header).

We are going to move that portion of the AppComponent to a component that uses the selector `<app-header />`.

Don't make this change yet, but that means our template for our AppComponent will look like this when we are done:

```html showLineNumbers title="./src/app/app.component.html"
//highlight-start
<app-header />
//highlight-end
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
<main>
  <p>Our cool stuff will go here</p>
</main>
```

## Steps for Extracting a Component

In your `./src/app/` directory, create a new directory called `components`. You can call it anything, but I like to keep things a bit tidy. In that new directory `./src/app/components`, add a new TypeScript file called `header.component.ts`. This is a common (but not required) naming convention in Angular apps. The name of the "thing" (`header`), the "kind" of "thing" (`component`), and then the file extension (`.ts`).

In that file, add the following code:

```ts showLineNumbers title="./src/app/components/header.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    standalone: true,
    template: `Header Works!`
})
export class HeaderComponent {

}
```

This is a pretty *minimal" component. In the `Component()` metadata, we specify the following:

- `selector`: This is how we will refer to this component in our AppComponent's template.
- `standalone`: Setting this to `true` means that this component is not part of an Angular module.
- `template`: You can provide templates two ways in Angular components. You can use either `template`, as we are doing it here, and give it some content to display, or you can use the `templateUrl` property and give it the path to the file that contains the template. Since this is going to be so small (a sign of a good component!), we will just put our template *inline* with the component itself.

Notice I am using backticks around the string for the template? Those allow you to create strings that are multiple lines long. Useful for templates.

Next, go cut the content from the `app.component.html` that is destined for this component, and past it inside the backtick quotes for our template in this component. 

Our HeaderComponent should look like this now:


```ts showLineNumbers title="./src/app/components/header.component.ts"
import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    standalone: true,
    //highlight-start
    template: `
    <header>
        <h1>Angular Guide</h1>
        <p class="subtitle">Code for the Angular Guide Tutorial</p>
    </header>`
    //highlight-end
})
export class HeaderComponent {

}
```

Your AppComponent should look like this:

```html showLineNumbers title="./src/app/app.component.html"
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
<main>
  <p>Our cool stuff will go here</p>
</main>
```

Notice the Header stuff is completely gone. Now if we add that selector in like this:

```html showLineNumbers title="./src/app/app.component.html"
//highlight-next-line
<app-header />
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
<main>
  <p>Our cool stuff will go here</p>
</main>
```

We *should* see that component displayed. But we *don't*. We get a build error. (look at the output in your `ng serve` terminal window.)

It will look something like this:
 
![App Header Error](/img/app-header-error.png)

It's scary, but this is actually a really helpful error message. It tells us that "app-header isn't a known element", but it *also* tells us what we might do to fix it. The first suggestion is the one we want. We need to add it to the `imports` of our AppComponent.

Update your AppComponent to look like this:

```ts showLineNumbers title="./src/app/app.component.ts"
import { Component } from '@angular/core';
//highlight-next-line
import { HeaderComponent } from './components/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  //highlight-next-line
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
```

On line 2, we tell TypeScript to import our component from a directory in the current directory (`./src/app`) called `components/header.component`.

We *add* that class to our array of imports in the component metadata on line 7.

What is happening here is our template is saying "hey, at this spot, add the component that is known by the selector `<app-header />`. Angular has *no idea* what that is until we tell this component about it.
We are telling the AppComponent that *some* of what the template needs comes from this other component.

Your web page should display. It won't be thrilling. It will (or should!) look *exactly* like it did before. This is why we call this kind of thing a *refactoring*. Refactoring means that you are changing the "how" of something without changing the end result. We are improving the design of our code without changing the way it works.

For example:
- x = 3 * 7
- x = 10 + 11
- x = 21

In each of these statements we change the *factors* that give us X. We *know* that "x" here is 21. And each of those sets of factors are various ways to get to the same value.

In programming, we change the factors, generally speaking, for several reasons:

- *Expressing Intent*: Make the code easier to reason about. 
    - By giving a "name" to our Header functionality, putting it in a component, we know what that code is responsible for, and just as importantly, what it *isn't* responsible for. 
- *No Duplication*: There might be other places in our application where we need to display the header (probably not in this application, but play along). We wouldn't want to "copy and paste" it each time we needed it, so we created a component.
    - Duplication is "bad" because you have to update it in multiple spots every time it changes. In reality though, you probably won't. You'll fix it in one place, and not always realize that same "thing" exists in multiple places. Then you have bugs based on an *inconsistent system*.
- *Fewest Number of Elements* - Simpler is better. 
    - You could argue that we added a bunch of stuff here, but from the *perspective of the AppComponent* it no longer has to "worry" about the HeaderComponent. 

The most important rule, by far, is that you don't change the behavior when you do this. Our application is simple, we can just glance at it and see "Yep, after all that work, we get the *exact* same thing!" (fulfilling, I know!). However, as our application becomes more complex, we are going to have to have a way to *prove* that no matter how we change the factors, we still get the same "21". That is testing. And we'll talk about that in a future module in this guide.

## Creating our Navigation Component with Angular CLI

This time we'll repeat the same process, but automate it a bit using the Angular CLI to generate a new component for us.

You'll need to open a new terminal window or split your terminal to issue new commands.

We are going to *experiment* with generating a few different components here that we won't actually use in our application before we generate our Navigation component. I want you to understand some of the options with the Angular CLI. Remember, this is just a "scratch", learning project. It doesn't matter if we end up with a bunch of random stuff here.

### Generate a Demo Component

In your new terminal window, issue the following command:

```shell
ng generate component demo1
```

It will output the following, letting you know what it did:

```text
CREATE src/app/demo1/demo1.component.css (0 bytes)
CREATE src/app/demo1/demo1.component.html (20 bytes)
CREATE src/app/demo1/demo1.component.ts (293 bytes)
```

Indeed, if you look at the Explorer view of your project, you will see that it created a new directory in the `./src/app` folder called `demo1`, and in there three files for our component. One for the TypeScript class, one for the Template, and one for the CSS.

Not bad, but:

- It put it in the wrong place. We wanted it in our `components` directory, not the `./src/app` directory.
- We don't need a separate folder for this component, it can just put it right in ("flat" with) the other component in the `./src/app/components` directory.
- And we don't need separate templates and stylesheets for this. (sometimes we will, but not for this one.)

This time, try the following:

```shell
ng g c components/demo2 --dry-run
```

A couple of things here:

- You can abbreviate the words `generate` and `component`. Saves you typing. Send some love to the Angular CLI team.
- Adding a path before the component name tells it where you want it (`components/demo2`)
- Adding the `--dry-run` flag at the end of the command tells it to just *show you* what it would have done, but don't actually do it.
    - You'll notice the message telling you no changes were made at the end of the output *and* no new files were created.

Don't you wish more things in life had a `--dry-run` flag? 

Image:

```shell
ng ask-boss-for-raise --dry-run
```

That would be nice.

But it's still doing too much. I don't want a new directory created for my new component, and I want inline styles and an inline template.

Consulting the documentation at https://angular.io/cli/generate#component-command, I think I found what I need. Try this:

```shell
ng g c components/demo2 --flat --inline-style --inline-template --dry-run
```

That *looks* more like what I want. If I had left off the `--dry-run` flag it would have only created *one* file in the `components` directory called `demo2.component.ts`.

**Note:** `--flat` is weird, I think, but it means "don't create a directory" the others are pretty self explanatory.

Let's do it for real this time. We'll change the name to be our *Navigaton* component, do it once with `--dry-run`, and then, if it looks good, do it for *realz*:

```shell
ng g c components/navigation --flat --inline-style --inline-template --dry-run
```

Look good? Do it!

```shell
ng g c components/navigation --flat --inline-style --inline-template 
```

The end result should be that it generated a component:

```ts title="./src/app/components/navigation.component.ts" showLineNumbers
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      navigation works!
    </p>
  `,
  styles: [
  ]
})
export class NavigationComponent {

}
```

Note the inclusion of the CommonModule in the imports. We didn't do that in our HeaderComponent, but it is so, ahem, common that, as you'll see, most components need it. We'll take a look at that soon.

Let's remove our `<nav>` element and it's content from the `./src/app/app.component.html` and move it to the template for this new Navigation component.

```ts title="./src/app/components/navigation.component.ts" showLineNumbers
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
  //highlight-start
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
  //highlight-end
  `,
  styles: [
  ]
})
export class NavigationComponent {

}
```

And then in our `./src/app/app.component.html` add the reference to the selector for our new components:

```html title="/src/app/app.component.html"
<app-header />
//highlight-next-line
<app-navigation />
<main>
  <p>Our cool stuff will go here</p>
</main>
```

And then import the component in our `./src/app/app.component.html`:

```ts showLineNumbers title="./src/app/app.component.html"
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header.component';
//highlight-next-line
import { NavigationComponent } from './components/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,
  //highlight-next-line
    NavigationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}

```