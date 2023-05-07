---
sidebar_position: 4.1
---



#  The AppComponent

The "root" component - the one that contains the hierarchy of all the components in your Angular application is called the `app.component.ts`. 

In the `src/index.html` file, the `body` element has a single reference to this components *selector*, `app-root`. 

```html showLineNumbers title="src/index.html"
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Frontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
// highlight-next-line
  <app-root></app-root>
</body>
</html>
```

In the `src/app/app.component.ts` file, the component is defined (by `ng new`) as follows:

```ts showLineNumbers title="src/app/app.component.ts"
import { Component } from '@angular/core';

@Component({
// highlight-next-line
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/cli">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>
    
  `,
  styles: []
})
export class AppComponent {
  title = 'frontend';
}
```

Components are a TypeScript class (line 30), with a `Component` metadata decorator. This decorator is defined by the Angular team and contains an object with configuration Angular uses to track and display the component. 

A brief explanation of the properties of the configuration for this `@Component()`:

- `selector`: This is the "name" of this component and can be used in templates as a "custom" HTML element indicating we would like to display this component at this point in the DOM hierarchy. With this component, you'll notice, the selector is set to `app-root`, and that is what appears in the `index.html` template on line 11.
- `template`: This is the default template for this component. It currently has a multi-line TypeScript literal string (denoted by the back ticks) with some HTML content. 
    - *Note*: This is an *inline template*. Templates can also be kept in separate files, in which case you remove the `template` property and replace it with a `templateUrl` property with the path to the template file.
- `styles`: This is an array of strings with CSS selectors and rules. These are styles that are added for *this* component, in addition to the styles defined in the `src/styles.css` file.
    - *Note*: Like the template property, components can *also* have a `stylesUrl` property that is an array of additional styles to use. Unlike `template` and `templateUrl`, the components `styles`, and `stylesUrl` can be both used in a component.

The component class itself has a single string property called `title`. Notice in the template, on line nine, there is an Angular *Binding Expression* (delimeted by double curly braces). This tells Angular to display the content of this property at this location.

In the next section, we will modify the App Component.