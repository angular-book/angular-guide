---
sidebar_position: 4.31
---

import EmbedVideo from "@site/src/components/VideoEmbed";

# ⚒️ Converting To Standalone Components

To convert our application to use Standalone components, we will mark our component's metadata to indicate that it is a standalone component, and replace the code in our `/src/main.ts` to bootstrap our application with our standalone `AppComponent`.

## Step-By-Step

Here are the step-by-step instructions. A short video of the process is below.

1. Delete the file `src/app.module.ts`.
    - *Note*: Your application will not be able to compile temporarily. We will fix this soon.
2. On the `app.component.ts` metadata, add the property `standalone: true`.
3. In the `src/main.ts`, file, delete the code and use the `bootstrapApplication` function to tell Angular to start with our `AppComponent`.


## Completed `/src/app/app.component.ts`

```ts showLineNumbers title="/src/app/app.component.ts"
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
// highlight-next-line
  standalone: true,
  template: `
  <h1>Hello from {{title}}</h1>
  `,
  styles: []
})
export class AppComponent {
  title = 'Angular';
}
```

## Completed `/src/main.ts`

```ts showLineNumbers title="/src/main.ts"
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent);
```
<EmbedVideo id="816960600" />