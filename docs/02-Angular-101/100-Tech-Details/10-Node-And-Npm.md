---
title: NodeJS and NPM
---

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

