# Contributing

Welcome! We are a coalition of brigades, all volunteers from the state of
California. We would love to get help from folks across the state to help us in
building a database of campaign finance data for local jurisdictions across the
California.


## Code of Conduct

CA Civic Lab is dedicated to providing a respectful, harassment-free community
for everyone. We do not tolerate harassment or bullying of any community member
in any form. By participating, you agree to our full [Code of
Conduct](CODE_OF_CONDUCT.md).


## We work remotely

Being a collaboration of brigades, we often meetup in person at our local
brigades without the entire group. It's important to keep the rest of the group
informed. We can't all make it to four brigade meetings a week `;-)` Keep this
in mind as you collaborate and consider posting decisions or learnings to our
[slack](https://opencal.slack.com) or comment on an [issue](/issues).


## Pull requests

Please submit a pull request for any commits, large or small. Pull requests are
a great way to get visibility on changes and keep folks up to date. Please keep
your pull requests of a reasonable size as large pull requests can take longer
to review and merge.


## Styles

In a nutshell:

- Think in terms of UI components.
- Implement on mobile first, then scale the component up to desktop.
- Organize styles into modules based on [SMACSS].
- Use BEM to name your classes.


### Mobile first

We've learned over our many iterations and usability tests that folks want this
information on their mobile phones, sometimes even to take into the voting booth
with them. That's why we design and build with mobile first.

When implementing a UI component, start with the mobile design and scale it up
to desktop. The grid and media rules are designed so mobile is default. If
a component looks the same on all screens, it needs no media query rules. If
a component looks different on mobile and desktop, desktop is the special case
and would have a media query to specify that special desktop behavior.


### SMACSS

We use Scalable and Modular Architecture for CSS ([SMACSS]) to organize our
styles. CSS rules fall into one of these categories:

- Base: foundational rules like element styles, colors, and typography.
- Layout: container components on the page for holding modules.
- Module: UI component patterns, most rules fall under here.
- State: rules based on a particular state of a component.
- Theme: overrides that would apply to a specific theme. We're not using these
  yet.

In general, every UI component is a module which may consist of
a composition of smaller modules.


### BEM naming

CSS class names are based on Block Element Modifier ([BEM]) methodology. Blocks
are your UI components. Elements are pieces that make up the component.
Modifiers are special cases of the block, like a subclass or subtype.

BEM naming looks like `.block-name__element-name--modifier`.

For example, let's say we have a candidate-summary component that displays
a photo, a name, an occupation, and the candidate's total contributions. The
content is organized into a left column and a right column. `.candidate-summary`
would be the Block. All the other pieces make up Elements,
`.candidate-summary__photo`, `.candidate-summary__name`, etc.

Then suppose you had a special case of this candidate-summary that displays in
a tile. This would be represented by a Modifier rule, `candidate-summary--tile`.

This is what our candidate-summary component might look like:

```html
<div class="candidate-summary candidate-summary--tile">
  <img class="candidate-summary__photo" src="photo.png" alt="Candidate Name">
  <div class="candidate-summary__name"><a href="#">Candidate Name</a></div>
  <div class="candidate-summary__occupation">Incumbent, City Council member At-Large</div>
  <div class="candidate-summary__contributions">amount collected <span class="money">$169,232</span></div>
</div>
```

Why does this matter? We end up with individual CSS rules that are easier to
compose and special case. It ends up with cleaner, simpler CSS rules that are
easier to reason about. This makes it easier to change something more
predictably.


[SMACSS]: https://smacss.com/
[BEM]: http://getbem.com/naming/
