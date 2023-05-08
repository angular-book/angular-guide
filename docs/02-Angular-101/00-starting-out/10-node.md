---
title: Installing Node and NPM
sidebar_class_name: sidebar-lab
---

The end result of building an Angular application is that you have, at a mimimum, an HTML file, some CSS, and some JavaScript files that will be placed on a web server for your users to request. There is no particular server-side technology you need to host a built Angular application.

It's the "coming up with that stuff" that is the hard part. 

Angular applications are developed using a suite of tools that are primarily NodeJS packages. This includes the TypeScript compiler, the Angular source code, a development server, and various libraries and utilities.

NodeJS does not need to be installed, necessarily, on the server that will provide your built Angular application, and certainly not on the user's machines that will run your Angular applications. They just need a web browser.

NodeJS provides our "development environment" for building Angular applications.

At a mimimum, you simply visit [https://nodejs.org](https://nodejs.org) and download the latest LTS version (LTS stands for "Long Term Support") and run the installer for your operating system.

There are native versions of NodeJS for Windows, Mac OS, and Linux. Follow the instructions to get it installed on your particular choice of operating system.

Once you have it installed, open your choice of terminal (we will use the ZSh terminal, but the command should work anywhere) and type:

```shell
node --version
```

You should see the current version of Node installed on your system.

## NPM (The Node Package Manager)

A "Package Manager" is software in a category of tools that allow you to install other software libraries and packages on your machine, as well as *publish* your own libraries for other developers to use. NodeJS comes with a package manager called the "Node Package Manager (NPM)". There are other package manager tools developers use for working with NodeJS packages, including Yarn, and PNPM. These are great and have some advantages for sure, but we feel that just starting out using the built-in NPM is a good way to go. Later on, you can investigate alternatives to see what problems they solve or new workflows they introduce.

It's also possible you may join a team that is already using one of these alternatives. Having some experience with NPM will serve you well when you are larning these new tools. The opposite may or may not be true.

