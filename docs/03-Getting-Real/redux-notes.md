# NGRX Friction

## Actions / Effects / Reducers

My first instinct is that in de-coupled software, this is always an issue. Tightly coupled software is always easier to reason about, but that comes at the price of being more difficult to maintain (adapt) over time.

### No Clear Correlation Between Actions and Their Outcomes

A button-click on a component causes an action to be dispatched. Sometimes those actions are just a kind of _notification_. A "so this happened" type of thing. Sometimes is is a call for something specific to happen (a command). Sometimes those commands have an expected outcome "do this thing and get me this data". The store's `dispatch` method is `void`. It never returns anything. the result of those kind of commands (to retreive some data) are indirectly correlated to some data that will appear _at some point in time_ (in other words, asynchronously) through a selector function.

Using the language of Rich Hickey's "Simple made Easy" talk #todo add a link here.

- **Easy** means "close at hand". You can reason through it by reading it, without much other supporting conceptual baggage.
- **Complex** means more than one thing going on. Easy requires complexity.
- **Simple** is the opposite of complex. Think _simplex_.

My feeling is that components should be **simple**. The difficult part of components should be in the UI, not in the code that implements that UI.

Components stay simple by not providing any sense of the "how", including the "when" part of an implementation.

The two jobs of a component:

1. Accurately project the meaningful application state.
2. Provide affordances through which the user can signal intentions.

For example, a component that allows a user to select a time and date for an appointment would have to display the available times and dates, and an affordance (button, link, etc.) through which the user can signal their intention to schedule that appointment.

Or a user filling out any kind of form, on successful submission, is indicating the intention of that data being processed in some way.

In other words, components are always just sources of actions that are a signalling of intention, and therefore the actions from a component should be modeled as an _event_.

So, for the two jobs of a component, above, what I am saying is a component exists to provide a way for a user to allow us to know what their _intention_ is. (adding something to a cart, changing their password, updating their email address, adding a vehicle to their policy, etc.). We have to supply them the data to make support them in making that request (which of these items do you want to add to the cart? What is your current email address?), and we do that through _selectors_.

A **test first** approach is good for this because we can use `mockStore` and mock selectors, not yet worrying about if the data exists in the state, etc.

## Components

Arguably the most _important_ thing in Angular. They provide the user interface. Angular is a framework for creating user interfaces. Thus, _components_ are a big deal.

Components tend to have a lot of _churn_. We are always tweaking them, futzing with them, and sometimes throwing them away or replacing them with something new.

For this reason, they need to be _extremely_ **loosely coupled**. They should be as _dumb_ as possible. How the functionality of your application _looks_ should be as separate as possible from how it _works_.

We build components really for two things, programming wise:

1. Showing the user some data (state).
2. Giving the user doo-dads (affordances) to click on, type into, etc. that our program code needs to do its thing.

Components recieve the data to display in the form of an `Observable`, by selecing data from the store.

The notify the application of interactions (buttons clicked, routes changed, forms filled out, etc.) by dispatching events.

Events are past-tense things that indicate that a thing has happened.

`User Clicked Sign Out`.

`User Logged In`

Stuff like that.

:::tip Components should only (or mostly) dispatch events.
:::

Events don't, by design, have a clear "cause and effect". We call that "loosely coupled" in software development. In other words, by _just_ having components dispatch events when something happens, we aren't going to unintentionally sneak important business logic into the component that might be screwed up in the future, or keep us from replacing something that should _really_ be replaced.

:::warning It doesn't matter, of course, if you separate your actions into specific things called "Events" or "Commands", or "Documents", or whatever. I mean, you can call all your variables `foo`, `bar`, etc. if you want to. But by making their use and purpose _explicit_ we bring clarity to our code.
:::

Sometimes events can create a new state in your application (handled by your reducer). This is particularly true if you have state in your application that the application itself _owns_.

Usually this means that the state is:

- For the current user of the application.
- Has to do with things like how the application appears, or user preference stuff.
  - an example might be an event `User Requested Movies Sorted By Title`.
