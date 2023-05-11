---
title: Configuring the Angular CLI
sidebar_class_name: sidebar-details
---

:::note Don't run any of these commands
We will do this together in the next section.
:::

In the last section, we used the Angular CLI to create a component using the `ng generate component` command (abbreviated to `ng g c`).

The Angular CLI has defaults for various options. For example, when we ran:

```shell
ng g c demo1 
```
With no options, it created a directory in the `./src/app/` directory called `demo`, and it created separate files for the template and css file.

However, when we created the navigation component, we used some options:

```shell
ng g c components/navigation --flat --inline-style --inline-template 
```

Remember, `--flat` told it to *not* create a directory for our new component, `--inline-style` told it to *not* create a separate style sheet, and `--inline-template` told it not to create a separate template file. The *defaults* for those options are `false`. 

We can change those defaults by modifying our application's `angular.json` file. We can do this by editing the file directly, or by using a command of the Angular CLI called `config`. 

For example, this will change our `angular.json` file to indicate that we want `flat` components by default. 

```shell
ng config schematics.@schematics/angular.component.flat true
```

This will update the `angular.json` file like this:

```json title="./angular.json"
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "schematics": {
    "@schematics/angular": {
      "component": {
        //highlight-next-line
        "flat": true
      }
    }
  },
```
**Note**: I'm only showing the beginning of the file here, with the pertinent changes.

The fact is, sometimes you want flat, inline stuff like we've done. Sometimes you'll want a directory created, or external templates, etc. 

By changing those things in the project's `angular.json` file, though, this can cause problems for other team members that don't want those options set for the work they are doing. They could have some options set to their preferences, and then the next day, when they fetch the changes, those could be overwritten.

A *better* way to change these options is to make those changes to the configuration of the Angular CLI that is kept *outside* your project, and only applies to when you run commands on your machine. These are the (somewhat confusingly named, in my opinion, *global* settings). 

So, if we wanted to set *for us* that we are going to use inline templates, inline styles, and have no directory created for the time being, we could run the following commands:

```shell
 ng config --global schematics.@schematics/angular.component.inlineTemplate true
 ng config --global schematics.@schematics/angular.component.inlineStyle true   
 ng config --global schematics.@schematics/angular.component.flat true; 
```

This will store these setting in a file in your *home directory* called `~/.angular-config.json`. It will look like this after running those commands:

```json title="~/.angular-config.json" showLineNumbers
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "schematics": {
    "@schematics/angular": {
      "component": {
        "flat": true,
        "inlineStyle": true,
        "inlineTemplate": true
      }
    }
  },
  "cli": {
    "completion": {
      "prompted": true
    },
    "analytics": "140ceef3-6bb2-4497-bfe2-145df22903f5"
  },
  "projects": {}
}
```

So, now if you run the following:

```shell
ng g c components/binding-expressions
```
In your project, you will get a *flat* component with inline styles and templates. 

If, later, you want to create a component that is flat, with inline styles, but an external template file, you could run:

```shell
ng g c components/binding-expressions2 --inline-template false
```

And you'd get an external template.

You could also run the `ng config` commands again to change the defaults:

```shell
 ng config --global schematics.@schematics/angular.component.flat false;
 ```

 Or you could simply edit the values in your `~/angular-config.json` file. 
