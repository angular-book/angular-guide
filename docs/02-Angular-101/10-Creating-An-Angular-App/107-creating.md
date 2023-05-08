---
sidebar_position: 3
title: 📗 Creating an Angular App
---


# Creating an Angular App

We are going to use the Angular CLI to create a bare-bones Angular application. We will use our freshly-installed Angular CLI to generate a new application. When you ask the CLI to generate an application,
it will by default create a new directory in the file system in the location where you run the command with the name of the application you specify. The `new` command has pretty reasonable defaults for typical Angular applications, but a ton of options for more special cases. You can read about those here: https://angular.io/cli/new.

:::note Standalone and Tests
At the time of this writing the current version of Angular is 16. The team releases a new major version about twice a year. Starting with version 14, a new, cleaner way of structuring your Angular applications was introduced that does not require the use of `NgModules`. Version 14 of Angular released this as a "dev preview", and in 15 it was fully supported. The recommendation is now to use this new style, "standalone", for any new applications. However, the Angular CLI still assumes you will use the old style, with `NgModules`, when you create an application. This will likely change in the future, and we will override the default behavior with the `--standalone` argument to the `new` command.

We will also ask the Angular CLI *not* to generate tests for our application. We will learn about testing in a future phase of this guide.
:::


