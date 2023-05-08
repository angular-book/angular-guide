---
title: "⚒️ Working With Your App In the Development Environment"
---


Looking at the file `./src/app/app.component.html` you might think "What the heck is that?".

That is the *entirety* of what you are seeing when you go to http://localhost:4200 in your browser. It's the "canned" content placed there by the Angular team to let you know your app is up and running. It contains a bunch of style definitions, a bunch of HTML content. Almost *all* of it is not Angular specific at all. Depending on your past experience with CSS and HTML, you'd be able to figure out a lot of what is going on there.

But this is no *normal* HTML file. It has a couple of things specific to Angular in it.  At around like 344, there is a *binding expression*. 

There is a `<span>` element with some strange content:

```html title='./src/app/app.component.html'
<span>{{ title }} app is running!</span>
```

If this were just simply HTML, it would display those double curly braces. Here Angular is evaluating the content between those two curly braces and showing the results.

This shows up in your web browser as:

![Binding Expression 1](/img/binding-expression-1.png)

If you change the HTML markup on line 344 to:

```html title='./src/app/app.component.html'
<span>{{ 2 + 2 }} app is running!</span>
```

And switch over to your browser, your running development server will notice the change, recompile your application, and you should see something like this:

![Binding Expression 1](/img/binding-expression-2.png)

Angular *evaluated* the expression `2 + 2` and displayed the result.

Originally, the binding expression referred to the `title` property of the component. Change it back to refer to the title, and add another expression like this:


```html title='./src/app/app.component.html'
<span>{{ title }} app is {{ status }}!</span>
```

If you look at your terminal where you are running `ng serve`, or in the browser, you will see an error like this:

![Binding Expression Error](/img/binding-expression-3.png)

Notice the error is in our template, and it says `Property 'status' does not exist on type 'AppComponent'`.

Open your `./src/app/app.component.ts` and change the `title` property to 'Angular Guide', and add a property called `status` with the value of `In Progress`:

```ts title='./src/app/app.component.ts' showLineNumbers
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //highlight-next-line
  title = 'Angular Guide';
  //highlight-next-line
  status = 'In Progress';
}
```

Your app should now compile, and it should display the following:

![Binding Expression 4 - With Title and Status](/img/binding-expression-4.png)

Congratulations! You have now created an Angular application, and worked with the App Component. A this point you pretty much could add Angular to your skills on LinkedIn. We'll vouch for you. 😁

However, there is a *bit* more to learn. In the next section, we will work with components in detail. 
