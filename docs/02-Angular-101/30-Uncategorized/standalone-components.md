---
sidebar_position: 4.3
---

# Standalone Components and Modules

Historically, for a component to be recognized as part of an Angular application, it had to be declared as part of a TypeScript class with the `NgModule` decorator. When we generated this minimal applicaton with `ng new` It created an module called `src/app/app.module.ts` as follows:

```ts showLineNumbers title="src/app/app.module.ts"
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Since Angular 15, Angular supports the idea of "Standalone Components", which largely negate the need for Module classes. You can see here that the `@NgModule` data includes a `declarations` section with our `AppComponent` (line 8), and then *also* adds it to the `bootstrap` array on line 14. The `bootstrap` property, in a module, tells Angular that this is the component that owns the selector that will be referenced in the `index.html`. 

If you look in the `src/main.ts` (remember, this is where the Angular application "starts"), it is starting up our application using this module.

```ts showLineNumbers title="/src/main.ts"
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// highlight-next-line
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

While using `NgModules` is still supported, and *may* be useful in some situations, we will switch to using Standalone components. This still does not require us to use `NgModules`, and, in my opinion, makes your Angular components more intention revealing - you don't have to look somewhere else (the `NgModule`) to see it's dependencies, etc.

In our next section we will switch our `app.component.ts` to be a standalone component, delete the `app.module.ts`, and update our `main.ts` to use our `AppComponent` to bootstrap the application.

