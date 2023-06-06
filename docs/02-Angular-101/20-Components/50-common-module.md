---
title: Using The Common Module
sidebar_class_name: sidebar-lab
---

## TODO
- ngIF, ngClass, ngSwitch, ngFor
- Show templates

In this section, we are going to look at some of the directives and components provided by Angular in the `CommonModule`. These are largely utilities for doing *imperative* programming within a template. For example, making decisions based on a condition with `ngIf`, and `ngElse`, and looping over an iterable list of things with `ngFor`. 

## Generate a Component For CommonModule

We will generate a new component as follows, using the Angular CLI:

```shell
ng g c components/common-utils
```

## Add it to our Routes and add a Link

We'll add another *child route* to the `Components` route in our `app.routes.ts`:

```ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { ComponentsComponent } from './components/components.component';
import { BindingExpressionsComponent } from './components/binding-expressions.component';
//highlight-next-line
import { CommonUtilsComponent } from './components/common-utils.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'components',
        component: ComponentsComponent,
        children: [
            {
                path: 'binding-expressions',
                component: BindingExpressionsComponent
            },
            {
                path: 'common-utils',
                //highlight-next-line
                component: CommonUtilsComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];

```

## Adding a Link

In the `components.component.ts` file, add a link to our new component:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
   <section class="components">
    <section class="header">
      <h3>All About Components</h3>
    </section>
    <section class="content">
      <aside class="links">
        <ul>
          <li>
            <a routerLink="binding-expressions">Binding Expressions</a>
          </li>
          //highlight-start
          <li>
            <a routerLink="common-utils">Common Module</a>
          </li>
          //highlight-end
        </ul>
      </aside>
      <section class="body">
        <router-outlet />
      </section>
    </section>
   <section>
  `,
  styles: [
    ".content { display: flex; }",
    ".links { flex-direction: column; flex-basis: 13% }",
    ".body { flex-direction: column; flex-basis: auto }",
  ]
})
export class ComponentsComponent {

}

```

## Making Decisions with `NgIf`

We'll start by showing or hiding some content on the template using an `ngIf` directive. The `CommonModule`, included by default when generating components with the `ng g c` Angular CLI command, is already imported into our new component:

```ts title="src/app/components/common-utils-component.ts"
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-utils',
  standalone: true,
  //highlight-next-line
  imports: [CommonModule],
  template: `
    <p>
      common-utils works!
    </p>
  `,
  styles: [
  ]
})
export class CommonUtilsComponent {

}

```

We will start by adding a signal with a boolean value set to `false` by default, and then add a method to change the value.

Make the body of the `CommonUtilsComponent` class look like this:

```ts 
export class CommonUtilsComponent {
  showHiddenMessage = signal(false);

  toggleShowHiddenMessage() {
    this.showHiddenMessage.set(!this.showHiddenMessage());
  }
}
```

We want some content to be displayed to the user if the value of the `showHiddenMessage` signal is `true`, and hidden if it is false.

The `ngIf` structural directive *needs a template*. We can use a special component called `ng-template` to provide this template. This template *will not* be present in the DOM unless our `ngIf` evaluates to `true`, and then only the content of the template will be inserted into the DOM.

Change your template to look like the following:

```ts
  template: `
    <section>
      <ng-template [ngIf]="showHiddenMessage() === true">
          <p>You have found the hidden message!</p>
      </ng-template>
      <button type="button" (click)="toggleShowHiddenMessage()">Toggle Hidden Message</button>
    </section>
  `
```

Now if you view your running app, and toggle the button, you will see our message toggled as well, reacting to the change in the `shouldHiddenMessage` signal's change.

If, while in the browser, you right-click on the button and select *Inspect*, in the DOM you will see the content of our template, or *nothing*, depending on the state of the signal. Angular also provides, while we are doing development, some comments in the DOM so we can see the state of the binding.

### DOM When the Signal is False:

![NgIf Dom Signal is False](/img/ng-if-dom-before.png)

### DOM When the Signal is True:
![NgIf Dom Signal is True](/img/ng-if-dom-after.png)

## Using `NgElseIf` To Show Alternate Content

Perhaps we want to show a different message if the signal is false. We start by creating another template, and we will give this template a name, using a facility of Angular templates called *Template Variables*. These are just identifiers that can be used in the logic of our template to refer to other elements. The name can be any valid identifier, and you define it with a hash mark (`#`).

We will then update the `ng-template` with the `ngIf` with an `ngIfElse` to give it the name of our new template:

```ts
  template: `
    <section>
      <ng-template 
        [ngIf]="showHiddenMessage() === true" 
        //highlight-next-line
        [ngIfElse]="noMessage">
          <p>You have found the hidden message!</p>
      </ng-template>

        //highlight-start
      <ng-template #noMessage>
        <p>You have to click the button to see the message</p>
      </ng-template>
      //highlight-end
      <button type="button" (click)="toggleShowHiddenMessage()">Toggle Hidden Message</button>
    </

```

Creating `ng-template`s for each of these gets a little old and verbose. Most of the structural directives have a shortcut way to specify that the content itself should be used as a template. You prefix the name of the directive with an asterisk. Add a line below the button element in your template like this:

```ts
<p *ngIf="showHiddenMessage()===true">We are showing the hidden message.</p>
```

This will turn the entire `<p>` element into a template for us, and only display it if our signal returns `true`.

With this syntax (which, frankly, is the most commonly found), you still have to use a named template for an `else`. We can reuse our template from earlier by changing the above line to this:

```ts
<p *ngIf="showHiddenMessage()===true, else noMessage">We are showing the hidden message.</p>
```
:::tip You can simplify the logic
 `ngIf` needs a boolean, and will convert any expression to a boolean (in JavaScript, *any* value can be converted implictly to a boolean). You *could* write the above expression as `showHiddenMessage(), else noMessage`, however it doesn't hurt to add the comparison, and it might make your template more intention revealing.
:::

## Looping over Iterables with `NgFor`

Often you have *lists* of data and you want to repeat a template for each element in the list. At the expense of being a cliche, let's make a simple "Todo" list. 

Each item in our list will have three pieces of data:

- A unique Identifier.
- A description
- A boolean value indicating if the item has been completed or not.

It is the *tradition* (or *convention*) in Angular that when you have a object that is meant to hold data that will be displayed to the user to call these *models*. Let's create a new folder in our `src/app` directory called `models`, and in that folder, create a new file called `todo-list-models.ts`.

We will export a `type` from that file that describes each of our Todo items.

:::note We could have used an interface.
It is largely up to you and your team. That are pretty equivalent, and the only small differences between them aren't usually worth fighting over. I tend to use `types` because other languages have the concept of `interfaces`, and the overlap and differences can be a bit confusing.
:::

```ts title="/src/app/models/todo-list.models.ts"
export type TodoListItemModel = {
    id: string;
    description: string;
    completed: boolean;
}
```

Let's generate another *routed* component to display our Todo List. Using the Angular CLI, run the following:

```shell
ng g c components/todo-list
```

We'll add a route for it:

```ts title="/src/app/routes.ts"
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { ComponentsComponent } from './components/components.component';
import { BindingExpressionsComponent } from './components/binding-expressions.component';
import { CommonUtilsComponent } from './components/common-utils.component';
//highlight-next-line
import { TodoListComponent } from './components/todo-list.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'components',
        component: ComponentsComponent,
        children: [
            {
                path: 'binding-expressions',
                component: BindingExpressionsComponent
            },
            {
                path: 'common-utils',
                component: CommonUtilsComponent
            },
            //highlight-start
            {
                path: 'todo-list',
                component: TodoListComponent
            }
            //highlight-end
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
```

And then add a link to it in our `ComponentsComponent`:

```ts title="src/app/components/components.component.ts"
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
   <section class="components">
    <section class="header">
      <h3>All About Components</h3>
    </section>
    <section class="content">
      <aside class="links">
        <ul>
          <li>
            <a routerLink="binding-expressions">Binding Expressions</a>
          </li>
          <li>
            <a routerLink="common-utils">Common Module</a>
          </li>
          //highlight-start
          <li>
            <a routerLink="todo-list">Todo List</a>
          </li>
          //highlight-end
        </ul>
      </aside>
      <section class="body">
        <router-outlet />
      </section>
    </section>
   <section>
  `,
  styles: [
    ".content { display: flex; }",
    ".links { flex-direction: column; flex-basis: 13% }",
    ".body { flex-direction: column; flex-basis: auto }",
  ]
})
export class ComponentsComponent {

}
```

In our `TodoListComponent`, we'll create a signal that has a list of our `TodoListItemModel`s. To start, we'll hard code a couple of items so we have something to display. Later we'll create a way to add our items.

```ts title="src/app/components/todo-list.component.ts"
//highlight-next-line
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
//highlight-next-line
import { TodoListItemModel } from '../models/todo-list.models';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      todo-list works!
    </p>
  `,
  styles: [
  ]
})
export class TodoListComponent {
//highlight-start
  todoList = signal<TodoListItemModel[]>([
    {
      id: '1',
      description: 'Clean Garage',
      completed: false
    },
    {
      id: '2',
      description: 'Mow Lawn',
      completed: true
    }
  ]);
  //highlight-end
}
```

:::note The Signal Type is a Generic
We are passing a generic type argument to the Signal to let it know this will contain an array of `TodoListItemModels`. 
:::

### Displaying the Items with `NgFor`

We'll use the *shortcut* syntax for the `ngFor` directive. We could also use templates, but let's start as easy as possible. 

Modify the template property of your component so it looks like this:

```ts
  template: `
    <ul>
      <li *ngFor="let item of todoList()">
        <span>{{item.description}}</span>
      </li>
    </ul>
  `
```
This is a loop construct. It is saying "for each item in the `todoList()`, one at a time, assign each one to a temporary variable (here called `item`, but can be anything).

