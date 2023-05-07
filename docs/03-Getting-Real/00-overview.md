---
sidebar_position: 0
---

# Chapter 3 - Getting Real

Angular's sweet-spot is in building large applications that are maintained by many different developers over a long period of time. Angular is called an _opinionated_ framework because it is largely "batteries included": One `ng new` and you have just about everything you need to create an application, including support for routing, some testing, and even an Http client. Not all frameworks or libraries for developing web apps are this extensive. In React, for example, you have a lot of different choices for each of those modules. This has advantages as well. When you have a product you want to build that needs to distinguish itself in it's technical prowess and how that tech matches the business domain, _and_ if you have a team of developers that all work together and make the choices for each particular module or component in the applications, more freedom might be a good thing.

The _spirit_ of Angular is consistency. Once a group of developers adopts Angular, it agrees to adopt it's set of reasonable defaults, from everything from component hierarchies, component communciation, routing (including route guards, etc.), and even project structure, it is much easier for an experienced Angular developer to join _any_ team's Angular project and get busy fast delivering business value.

The purpose of this section is to promote some good practices that should be shared across the team or the entire organization.

This will start with a discussion of the idiomatic use of TypeScript within Angular applications, a discussion on addressing Accessibility requirements, styling, extending our "inner loop" developer environment with ESLint and Prettier, and project structure.

## Feedback Loops

The **Continuous Integration** Mindset: There is one _authoritative_ version of the code, the _origin_ hosted on your version control system. This is our "single point of truth" on the current state of the application. As developers, we make a clone of this code on our local machines at some point in time. Each day we write code that will be pushed to the origin's main branch. **All** code that we push is code we have confidence in.

The more clones of that code times the length of time since you've fetched changes times how many concurrent changes you've each made equals **MERGE CONFLICT HELL**.

1. Do your best to not work on the same code that others are working on.
2. Commit and push to `origin` _at least daily_.

Simple, right? No.

Point 1 is about the architecture of your code base. Breaking things into features and libraries, having a good state management strategy, and good programming that emphasizes loose coupling. We **prefer adding new things over changing existing things**. We will emphasize this throughout this book.

Point 2 is even harder. This is the "continuous integraton" part. It means, briefly, that every day you have to plan your work in such a way that at the end of the day you can integrate whatever work you've done into the main branch of your source control. This means no feature branches (long lived, or even short lived - the only "branch" is the clone of the code on your machine.)

### Inner Loop

Setting up our development environment/experience to push us into the "pit of success". This is why we use TypeScript (instead of just JavaScript) - we want the feedback.

#### Approach / Tools

- Using Static Types
  - Never `any`
- ESLint, Prettier

#### Working as a Team (Modularity)

Emphasizing creating features, code-splitting, etc.

Feature Flags/Toggles

#### Testing

The "Testing Trophy" (Kent Dodds).

### Outer Loop
