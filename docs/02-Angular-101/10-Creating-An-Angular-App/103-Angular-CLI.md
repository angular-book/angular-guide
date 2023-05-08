---
title: 📗 The Angular CLI
sidebar_position: 2
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

## Node Package Naming

When you publish a node package for other developers to use to the registry (https://www.npmjs.com/ by default), you have to have an account created, and you have to choose a unique name for your package. This isn't an easy thing to do as there are hundreds of thousands of packages already published. 

Furthermore, each package might have several versions available. For example, a commonly used utility for starting a local web server is a Node package called `http-server`. You can see it listed at https://www.npmjs.com/package/http-server. At the time of this writing, there have been 49 versions installed. You can see the full listing of versions by following that link, and clicking on the versions link.

Scrolling down the list, it appears the first version (version `0.1.0`) was uploaded 12 years ago. Scrolling to the top of the Version History table shows the latest version is `14.1.1`. Above that, a table labeled **Current Tags** indicates that there is a tag called `latest` that refers to version `14.1.1`.

That means allow the following would do the same thing: Install the latest version of the package `http-server` globally.

:::note This is just for demonstration, no need to do this, but it wouldn't hurt anything if you did.
:::

```shell
npm install --global http-server@latest
```

Or

```shell
npm i -g http-server@14.1.1
```

Or

```shell
npm i -g http-server
```

(Note, if you do not specify a version, it assumes you want the version currently tagged as `latest`)

Because coming up with unique names is so challenging, the NPM team introduced the notion of *Organizations*. Organization names have to be unique, but all the packages owned by the organization only have to be unique for that organization. While you couldn't publish a new package called `http-server`, if you created an organization (for example, called `super-angular-devs`), you could publish a package called `@super-angular-devs/http-server`. 

The Angular team, for example, uses the (unsurprising) *Angular* organization name.

That organization *owns* many packages, including the CLI (`@angular/cli`), the Angular core package, (`@angular/core`), etc.

So, as you'll see in the next section, when we are ready to install the Angular CLI globally, it will look something like this:

```shell
npm i -g @angular/cli
```

This will install the package `cli`, owned by the `angular` organization, and will install the version tagged as `latest`, since we didn't specify.

