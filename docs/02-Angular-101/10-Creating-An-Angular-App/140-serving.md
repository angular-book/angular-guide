---
sidebar_position: 3.5
---

import EmbedVideo from "@site/src/components/VideoEmbed";

# ⚒️ Compiling and Serving your Application

Ultimately, your Angular application will be built for "production". It will just be an HTML file, some CSS, and a few JavaScript files. 

While we are doing development work, however, we can compile and run our application on our local machine. 

The Angular CLI has a command called `serve` that will compile your application's source code *in memory* and start a development web server and push our compiled code to the browser.

Every time we save a file, the application will be recompiled and those changes will be pushed immediately to our browser for us to see the changes.

The `ng serve` command does this work, and starts the web server on your local machine at TCP port 4200, by default. By passing in the `-o` option, you can tell Angular to just open this in your web browser for you.

```shell
ng serve -o
```

<EmbedVideo id="816579558" />

## The Dev Process

While we are working on our Angular application, we will leave the `ng serve` process running. It is a *stateful compiler* and a *web server*. It will monitor our source code files for changes, recompile our application, and make it available through a simple web server at `http://localhost:4200`. You just leave this thing running while you are working on your application.

:::tip If you ever need to shut it down (you are at the end of the day, or you want to restart it, etc.) you can click in the terminal window where it is running and hit `Ctrl+C` to send it an interrupt. We are used to using the `Ctrl+C` keyboard combination for copying items to the clipboard, but in a terminal window it sends a signal to tell the process you'd like it to stop.
:::