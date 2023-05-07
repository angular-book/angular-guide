---
sidebar_position: 3
title: 📗 Creating an Angular App
---


# Creating an Angular App

We are going to create a bare-bones Angular application. We are going to use this section to get our bearings, so to speak, and learn about the various abstractions that are commonly used in Angular apps.

- Components, including the "root" component.
- Using the Angular CLI to generate components.
- Component communication (inputs/outputs)
- Using Directives
- Using Pipes

We are using Angular 15, and we will prefer to use stand-alone components and not use modules. A later section will explain modules, etc. for legacy reasons.

We will use the Angular CLI to create a minimal Angular app. The `--minimal` flag on `ng new` will mean we'll get no tests, and it will set some defaults for how components and things are created.
