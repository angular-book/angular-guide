---
sidebar_position: 3.6
title: "📗 Project File Structure"
---

# Angular Project File Structure

Before we jump in and start changing some things, let's take a look at *some* of the files and directories created for you when we ran `ng new` to create our project.

![File Structure](/img/angular-files-16.png) 

We will go through each file and directory, saving the `./src/app` directory for last, because it is the most interesting.

## `.angular` Directory

This directory holds cached information about the development build of your application. You do not edit files in this directory. It also appears "grayed out" in the Explorer window because it is being ignored by our `.gitignore` file (below).

## `.vscode` Directory

These are extensions, settings, and launchers for working in Visual Studio code. The extensions file tells VSCode to suggest you load the Angular Language Service extension. Other shared settings and extensions can be placed here and will be available to all the people working on your project. More on this in the Real World Angular section. 

## `node_modules` Directory

This holds all the Node libraries used in building our application. You do not edit this directory, and it is ignored by our `.gitignore`. 

## `src` Directory

This is the meat of your application, and where we will spend most of our time. It is the source code for your application..

Looking first at the files:

### `favicon.ico`

A generic icon for the application, should the user decide to bookmark it. This can be modified or replaced.

### `index.html`

This is a template file that is used both during development and in your final build.

```html title="./src/index.html' showLineNumbers
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
  <app-root></app-root>
</body>
</html>
```

Notice the `<body>...</body>` element has a strange element named `<app-root></app-root>`. This is where your Angular application will be *injected* when it is started up on the web page. You'll notice when we look at the `/src/app/app.component.ts` file, it has a reference to a *selector* called `app-root`. This is the the component that will hold your entire Angular application.

### `main.ts`

This is the *entry point* for your Angular application. All compilation and execution begins here.

```typescript title="./src/main.ts' showLineNumbers
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

```

### `styles.css`

This is the *global* styles for your Angular application. Each component, as you will see, can define their own set of styles, but this will serve as the basis for the entire application. Any style rules set here will apply to the entire application. It is empty by default. We will look at styles in depth later in this training.

```css title='./src/styles.css'
/* You can add global styles to this file, and also import other style files */
```

### `assets` Directory

Files placed in this directory are *static* assets, like images, etc. They will be included in the compiled output of our application and can be referenced by our Angular code. You may notice a single empty file called `.gitkeep` in this directory. After you add files to this directory you can delete this. The Git source control tool does not track directories, only files. If a repository has a directory with no file in it, it isn't tracked. So there is a convention to create an empty, hidden file called `.gitkeep` to indicate this is just so, uhm, Git will keep this directory. (*Note* on many operating systems, files or directories that start with a period are "hidden" by default from directory listings.)

## `angular.json`

This is the configuration for your Angular application. It contains configuration for how your application is built, how it is tested, etc. We will look at this in later sections. You can either edit it directly or make changes using the `ng config` utility. Documentation for this is here: https://angular.io/cli/config.

## `package.json` and `package-lock.json`

These are for tracking project dependencies (Node modules). This is covered in more detail in the [Tech Details](/docs/Angular-101/Tech-Details/Node-And-Npm)

## `README.md`

A generated README file with some basic instructions on how to serve your application, etc. You can modify this with information specific to your project to give other developers a sense of what your project is all about.

## `tsconfig.app.json` and `tsconfig.json`

The TypeScript configuration for your Angular application. We will not edit these files, and use the settings as suggested by the Angular team. You don't edit this often, just using the settings prescribed by the Angular team, but more documentation on TypeScript configuration can be found here: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

### `app` Directory

This is where your application code goes. You will spend most of your time working with the files and creating new files in this directory. As a matter of fact, you can largely consider all the files *above* this directory to largely be "meta" information about your application, including configuration, and general "get it up and running" stuff. 

When you use the `ng new --minimal` tool to create the application like we have, the app directory has the following content. Don't get too overwhelmed here, we are just giving you a tour. You will become intimate with these files as we continue along in the next section.

- `app.component.*`
  - This is several files, listed below. The AppComponent is the root, or heart of our Angular application. Everything you see on your screen when you go to http://localhost:4200 is comes from this component.
  - We will look at each of these files below, briefly.
- `app.config.ts`
  - Overall configuration for our application. Right now it just includes our routes (recall we answered 'Yes' to the question during `ng new` for adding routing?)
- `app.routes.ts`
  - These are the actual routes defined for our application. Right now it's pretty boring. An empty array. We will learn how to define routes later.

#### App Component

We will talk a lot about components in the next section of the guide, but the AppComponent is special. It is the root of our application, and holds our entire Angular application.

When you create components, you can do the entire thing in one source code file. The Angular CLI generated us a component in three separate files, one for the component itself (`app.component.ts`), one for the *template* for this component, `app.component.html`, and one for the style information specific to this component (remember, *global* style information goes in `./src/styles.css`) called `app.component.css`. We told Angular to skip tests, but if we hadn't, there'd also be an `app.component.spec.ts` file in this directory as well.

##### `app.component.ts`

```typescript title='./src/app/app.component.ts' showLineNumbers
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
  title = 'guide';
}
```

The *meat* of this file is the exported class called `AppComponent` on lines 134-136. Not much going on there. It just has a public variable called `title` initialized to the value `guide` (which is the name of our application, if you recall.)

Lines 1 - 3 are importing some things from the Angular team. Line one imports the `Component` *metadata decorator* that is used starting on line 5, line 2 imports the `CommonModule` that provides some, ahem, common utilities we will use in our templates, and line 3 imports the `RouterOutlet` component, which is used in our template (coming up!) to display the content defined by our current route.

:::note Importing in TypeScript
Notice each of the imports on lines 1-3 are importing *something* (the named things in the curly braces) from a library (`@angular/core`, `@angular/common`, and `@angular/router`). Those libraries are listed in your `package.json` file and were downloaded into the `node_modules` directory when you created the Angular application. Since the *from* portion does not start with a path (starting with either `./`, or `../` ), this means they are being provided by our `node_modules`. If you are brave, look in the `node_modules` directory, you will see a directory named `@angular`, and in there subdirectories, including `common`, `core`, and `router`. *That* is where that code is coming from. (We won't dig much deeper now because it gets scary, but feel free to explore. Just don't change things in the `node_modules` directory!).

If you ever open up an Angular (or other Node based application) and there is no `node_modules` folder, you can have it download the dependencies and create the folder for you by running `npm install` in the directory that contains the `package.json` file.
:::

The `@Component({...})` decorator starting at line 5 is information Angular needs to work with this TypeScript class. 

The presence of the `Component` decorator tells Angular that this class is a "Component".

The configuration object passed to the Component tells it that this component:
  - Has a *selector* of `app-root`
    - A selector is a token, or name, that allows us to identify the component within our templates. 
    - We've seen this selector (`app-root`) - it's in our `./src/index.html' on line 11 [above](#indexhtml)
  - Is a standalone component
  - Imports functionality from the `CommonModule` and `RouterOutlet`
  - Has a template that is in the file `./app.component.html`
    - *Note*: the path at the beginning `./app.component.html` (the dot forward slash) tells the Angular compiler to find this component in the same directory as this file (`.` means "This directory").
  - Has an array of styleSheets, but right now it only includes one file, in the same directory, called `./app.component.css`.

  This AppComponent is the central part of our application, and indeed is what starts up our application (called 'bootstrapping'). You can see this in the `./src/main.ts` file [above](#maints). On line 3 of that file it is imported, and then on line 5, a reference to this component is given to the `bootstrapApplication`'s first argument. This is saying "Startup this application with this component". When that component is created by Angular, since it is the "bootstrap" component, it will look for it's own selector (`app-root`) in the `./src/index.html` file and place it's content at that precise location.

  ##### `app.component.css`

  If you look at that file, it is currently empty, just pregnant with possibility of all the cool styling we will do later:

  ```css title="./src/app/app.component.css" 

  ```

  We will look at adding component styles later.

  ##### `app.component.html`

Open that file (`./src/app/app.component.html) in Code. I'm not going to paste it here because it is *huge*. 

In the next section, we'll work with this template to give you an experience of working in the development environment.

What the heck is that?

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
