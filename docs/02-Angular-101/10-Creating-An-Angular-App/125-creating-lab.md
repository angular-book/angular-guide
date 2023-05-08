---
sidebar_position: 3.1
title: "⚒️ Creating the App"
---

import EmbedVideo from "@site/src/components/VideoEmbed";

⚒️ Go to a command prompt and navigate to a directory where you want to store you work. I will create a new directory called "`angular-guide`" and change directory to that. Use your preferred shell to create the directory.

```shell
mkdir angular-guide
cd angular-guide/
```

While in the `angular-guide` directory, ask the Angular CLI (`ng`) to generate a `new` application called `guide`, passing in the arguments `--standalone` to use the new standalone, module-less format, and we'll also skip the generation of tests.

This command will create a new directory called `guide` in your current working directory (`angular-guide`), and create a minimal project structure for your application. We will review the project structure and the files after we've created the application.

You will be asked a couple of questions:

1. Add Routing
    - Routing is a powerful facility in your Angular application to have "modes" your application can change to, reflected in the URI displayed in the browser. By saying *yes* to this option, it will create an empty set of routes for us to define as we need them.
    - Please answer *Y* to this, the default.
2. CSS Processing
    - The Angular CLI can configure a few different CSS processors for you. For this we will take the default of just plain "CSS".

```shell title="In the angular-guide directory, run the following"
ng new guide --standalone --skip-tests
```

:::note It'll Take a While
The generation of the files is quick. You'll see those fly by on the screen. There there will be a *long* delay while it says it is `Installing packages (npm)`. One of the files created by new is the `package.json` file. After it generates your application, it runs `npm install` in the directory that reads the content of the `package.json` file and downloads each of the dependencies listed there to the project's `node_modules` folder. There are a *ton* of them.  (I edited the video to make it faster. Get a coffee.)
:::

<EmbedVideo id="814608298" />


After it completes creating your application and installing dependencies, you can change directory into the new `guide` directory and list the contents.