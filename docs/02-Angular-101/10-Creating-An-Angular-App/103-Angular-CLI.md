---
title: The Angular CLI
sidebar_position: 2
sidebar_class_name: sidebar-details
---

The Angular team ships a package called the Angular CLI (CLI here means "Command Line Interface").

The documentation for the Angular CLI is at [https://angular.io/cli](https://angular.io/cli).

The Angular CLI is installed as a "global" NPM package. This means that when we install it, it will put a script on your path that will be available outside of a specific project, anywhere in your file system.

:::note
This can be a little challenging for developers that might be working on multiple Angular applications, where each might be using slightly different version of Angular and the CLI. Tools like the [Node Version Manager](https://github.com/nvm-sh/nvm) or [Volta](https://volta.sh/) can be installed to switch from one version of Node, NPM, and global tools like the Angular CLI from project to project.
:::

The Angular CLI, once installed, is available through a command called `ng`. As the documentation shows, it has commands for things like:

- Creating a new Angular application
- Generating (using *schematics*) common Angular constructs, like components, services, and guards.
- Ability to run tests, like Karma or Jest Tests, as well as UI Tests using tools like Cypress or Playwright.
- Ability to serve your application locally creating your development environment.
- Building your application for production.

To install packages globally with the Node Package Manager, we use the `--global` (or just abbreviated to `-g` option). If you do *not* install a package globally, it will assume you want to install the package just for the project you are working on. It will traverse up the file system from the location you ran the command until it finds a `package.json` file, and will annotate the inclusion of the library there, and install it into the `node_modules` folder.

When you install it globally, it will be installed usually in your user profile. This differs slightly per operating system, as well as if you are using a tool like NVM or Volta.



