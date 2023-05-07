---
sidebar_position: 3.6
title: "📗 Project File Structure"
---

# Angular Project File Structure

Let's take a look at *some* of the files and directories created for you when we ran `ng new` to create our project.

![File Structure](/img/angular-files.png)

## `.angular` Directory

This directory holds cached information about the development build of your application. You do not edit files in this directory.

## `.vscode` Directory

These are extensions, settings, and launchers for working in Visual Studio code. The extensions file tells VSCode to suggest you load the Angular Language Service extension. Other shared settings and extensions can be placed here and will be available to all the people working on your project. More on this in the Real World Angular section.

## `node_modules` Directory

This holds all the Node libraries used in building our application. You do not edit this directory.

## `src` Directory

This is the meat of your application, and where we will spend most of our time. It is the source code for your application..

Looking first at the files:

### `favicon.ico`

A generic icon for the application, should the user decide to bookmark it. This can be modified or replaced.

### `index.html`

This is a template file that is used both during development and in your final build.

```html
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

### `styles.css`

This is the *global* styles for your Angular application. Each component, as you will see, can define their own set of styles, but this will serve as the basis for the entire application. Any style rules set here will apply to the entire application. It is empty by default. We will look at styles in depth later in this training.

### `app` Directory

This is where your application code goes. With a *minimal* Angular application, this contains just an `app.component.ts` and an `app.module.ts` file. All the components, services, etc. we create will be in this directory.

### `assets` Directory

Files placed in this directory are *static* assets, like images, etc. They will be included in the compiled output of our application and can be referenced by our Angular code.

## `angular.json`

This is the configuration for your Angular application. It contains configuration for how your application is built, how it is tested, etc. We will look at this in later sections.

## `package.json` and `package-lock.json`

These are for tracking project dependencies (Node modules).

## `README.md`

A generated README file with some basic instructions on how to serve your application, etc. You can modify this with information specific to your project to give other developers a sense of what your project is all about.

## `tsconfig.app.json` and `tsconfig.json`

The TypeScript configuration for your Angular application. We will not edit these files, and use the settings as suggested by the Angular team.
