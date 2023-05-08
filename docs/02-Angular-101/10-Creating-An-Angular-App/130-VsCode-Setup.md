---
sidebar_position: 3.2
title: "Opening the Project in VS Code and Configuring VS Code"
sidebar_class_name: sidebar-lab
---
import EmbedVideo from "@site/src/components/VideoEmbed";

In this lab we will open our new project in Visual Studio Code and configure our editor with some basic extensions and settings to make working with Angular easier and more efficient.

## Opening an Angular Project in VS Code

It's usually best to open the newly created directory in Visual Studio code. We will be using the Angular CLI a ton, and, after our project is created it will assume you want to use it to work with the newly created project. It looks for a file called `angular.json` in the directory you run the commands in, or a parent directory.

You can either open Visual Studio Code and then use the `File->Open Folder` menu and navigate to the `guide` folder (**not** the `angular-guide` folder) and open that.

If you still have your terminal shell open and are in the `guide` directory, you can open VS Code in that directory by typing:

```shell
code .
```

Don't forget the period after the `code` command. The period means "open code in *this* directory, my current directory".

Either way, when you open the project folder, you will be prompted by Visual Studio Code to install the "recommended extension" for the "Angular Language Service". Click "install" to install it.

<EmbedVideo id="824763064" title="Opening Project and Installing Angular Language Service" />

Visual Studio Code (hereafter, just "Code") *knew* to install this because the Angular CLI created a directory in our project called `.vscode`. In that directory, there is a file called `extensions.json` (as well as two other files we'll discuss later). If you look at the `./.vscode/extensions.json` file, it will look like this:

```json title="./.vscode/extensions.json"
{
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=827846
  "recommendations": ["angular.ng-template"]
}
```

The published name for the Angular Language Service extension is `angular.ng-template`. 

:::note If It Didn't Ask You To Install the Angular Language Service
Software, am I right? Sometimes it is weird. If for some reason you *weren't* prompted to install the Angular Language Service, you can install it yourself. Click on the Extensions icon on the left of your screen (looks like some blocks) and search for "Angular Language Service". When it finds it, click install.
:::
## Settings for Angular Apps

Code is almost *infinitely* configurable. It is one of, if not the, most contributed to open source projects on Github. Developers are an opinionated lot. There are a few settings that I like to set in Code for almost any Angular project I work on. 

We are going to add some minimal settings that will apply only when we have this folder open in Code. You do this by creating a new file in the `.vscode` directory. Right-click on the `.vscode` directory and select "new file". Name the file `settings.json` (*note*: It must have this exact same name, in this location, for Code to use it.).

Open the file and add the following:

```json title="./.vscode/settings.json"
{
    "editor.linkedEditing": true,
    "explorer.openEditors.visible": 0,
    "editor.formatOnSave": true,
    "files.autoSave": "onFocusChange",
}
```

A brief explanation of each of these settings:

- `editor.linkedEditing`: This makes Code automatically change the closing tag of an HTML element when we edit the name of the opening tag. I can't for the life of me understand why this isn't the default behavior, so we'll override it here. This will save us lots of time and frustration.
- `explorer.openEditors.visible`: Back in the dark ages, Code did not have tabs for open files. You had a section in the Explorer view that showed you your open files. Since we have a tabbed interface now, I find that listing distracting. This is a bit subjective, and definitely not required for doing Angular work, if you prefer that list.
- `editor.formatOnSave`: Pretty self explanatory. Code has the ability to apply formatting rules to your code. You can do this by telling it to format your code using a shortcut. What we are doing here is saying "Just do this for me automatically when I save my file".
- `files.autoSave`: This is big for Angular. As you'll see when we start our development server, Angular will "watch" our files for changes and automatically recompile and update our application for us. With this setting enabled, you'll be able to simply switch to your browser window after making a change, not needing to remember to save your files.

There are a lot more settings. We'll discuss some of them later, especially about formatting code, etc. But for now, this will get us going.


<EmbedVideo id="824766521" title="Adding Settings" />