---
title: Introduction to Routing
sidebar_class_name: sidebar-lab
---

In this guide we are going to create *lots* of components. In your applications you'll have way more, likely.

We *could* just keep adding components to our AppComponent. Our we could start to define cohesive areas of our application and give them a name. 

:::warning DO THIS JEFF
Add a video here showing the final thing through the UI. This is too hard to visualize without seeing it first.
:::

## Generating Some Routed Components

We will create two new components. One we will call "Dashboard", and this will serve as our "landing page" in the application. The other we'll call "Components", and this will contain the work we do in this guide about components.

```shell
ng g c components/dashboard
ng g c components/components
```

We will then define these routes in our `routes.ts` file. Each route is an object in the `Routes` array, and they will have a `path`, which is the unique name of this route, or mode (it will show up in the address bar of your browser when this link is active), and the component that should be displayed when that route is the active route. 

We are going to also add a "catchall" route. This will mean that if an address is entered into the address bar that isn't recognized (here, other than `dashboard`, or `components`, it will just send them (redirect) to the `dashboard` route). You don't *need* to do this, but if you do, it must be the last route in the array of routes.

```ts title="/src/app/routes.ts" showLineNumbers
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { ComponentsComponent } from './components/components.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'components',
        component: ComponentsComponent
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
```

We will now update the AppComponent  to import the `routerOutlet` component from Angular, and then replace the hard coded component selector in the template with the `<router-outlet />` directive. 

```ts title="./src/app/app.component.ts" showLineNumbers
import { Component } from '@angular/core';
//highlight-next-line
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { NavigationComponent } from './components/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,
    NavigationComponent,
    //highlight-next-line
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
```

And then in the template:

```html title="/src/app/app.component.html" showLineNumbers
<app-header />
<app-navigation />
<main>
    //highlight-next-line
  <router-outlet />
</main>
```

Next we'll go to the NavigationComponent. Remember that? Here we will create some links to tell Angular to change our current route to a named route from our `routes.ts` file. We will leave this as hyperlinks because they *should* be, but we will use Angular directives to specify what route should be activated when that link is clicked. Angular will *hijack* the hyperlink navigation, and set the routing accordingly, so we don't have to go back to the server and download our application again.

This is accomplished through the `routerLink` directive, and we'll simply give it the path (name) of the route this link corresponds with.

We will also use another directive called `routerLinkActive`. This is super helpful in that it tells Angular to add one or more classes to this element *if* this is the "active" link. We'll add some primitive CSS to make our links look slightly different if they are the active links.

```ts title="./src/app/components/navigation.component.ts" showLineNumbers
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//highlight-next-line
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
   CommonModule,
   //highlight-start
   RouterLink,
   RouterLinkActive
   //highlight-end
   ],
  template: `
  <nav>
    <ul>
  //highlight-start
      <li><a routerLink="dashboard" [routerLinkActive]="['active']">Home</a></li>
      <li><a routerLink="components" [routerLinkActive]="['active']">Components</a></li>
      //highlight-end
    </ul>
  </nav>
  `,
  styles: [
    //highlight-start
    "li { display: inline; margin: .15em; }",
    ".active { background-color: grey; color: white }"
    //highlight-end
  ]
})
export class NavigationComponent {

}
```

**Note**: This is the first time we've added some CSS to a component. The `styles` property takes an array of strings, each expressing a CSS selector, and a set of rules to apply to elements matching that selector. With *normal* CSS, this would be dangerous. The styling we applied to the `li` here would *cascade* down through any HTML content beyond this. But Angular isolates these by default, so you don't have to worry that your CSS micro-adjustments will have negative ramifications elsewhere in your application.

Let's modify the ComponentsComponent and add some *nested* routing. We've already created one component in this "category" (our BindingExpressionsComponent), and we are going to create more.

```ts title="./src/app/components/components.component.ts" showLineNumbers
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
        </ul>
      </aside>
      <section class="body">
      //highlight-next-line
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
This creates some structure for our ComponentsComponent. THere is a section at the top, a sort of header, a section on the side with a link to our BindingExpressions component (though we haven't created that path in our `routes.ts` yet - we'll do that next), and, on line 23, a place for that component to be displayed.

Let's go add that path/route to our `routes.ts`. We want this new route to be "owned" by the `components`, path. In other words, it will be displayed inside our ComponentsComponent in the `<router-outlet>`, and the url displayed in the browser will be http://localhost:4200/components/binding-expressions

We do this by creating *child* routes for our `components` route:

```ts title="./src/app/routes.ts" showLineNumbers
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { ComponentsComponent } from './components/components.component';
//highlight-next-line
import { BindingExpressionsComponent } from './components/binding-expressions.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'components',
        component: ComponentsComponent,
        //highlight-start
        children: [
            {
                path: 'binding-expressions',
                component: BindingExpressionsComponent
            }
        ]
        //highlight-end
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
```

You should now be able to open your browser to http://localhost:4200 and immediately see it redirect to http://localhost:4200/dashboard. If you click on the Components link at the top, the route will change to http://localhost:4200/components and you will see the ComponentsComponent. If you click the Binding Expressions link, it will display our BindingExpressionsComponent right next to our links. Notice the URL changed in the browser. Pretty nifty.

