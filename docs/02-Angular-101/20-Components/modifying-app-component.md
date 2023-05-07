---
sidebar_position: 4.2
---

import EmbedVideo from "@site/src/components/VideoEmbed";

# ⚒️ Modifying the App Component

We will do some quick modifications of the `app.component.ts`. 

1. Make sure your application is being served by running `ng serve -o`
    - *Note*: All the the `ng` commands (other than `new`) must be run in the directory where you created the Angular applications (technically, in the directory with the `angular.json` file, or a subdirectory of that.)
2. Your browser should be displaying the default content of the app component when you navigate to `http://localhost:4200`.
3. Open `src/app/app.component.html` and inspect the contents.
4. Delete the content of the `template` property in the Component metadata (leaving the backticks).
5. Save the file and notice the compiler (`ng serve`) detects the change and recompiles and refreshed your browser. You will see an empty page.
6. Add some HTML content to the template property, save the file, and notice the change.
7. Use a binding expression to show the content of the `title` property of the component class, save your file, and view the changes.
8. Modify the value of the `title` property in the component class, save and view the changes.


<EmbedVideo id="816929753" />