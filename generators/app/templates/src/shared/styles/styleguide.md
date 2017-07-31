kss-node-template
=================

This is a **template** for [kss-node](https://github.com/hughsk/kss-node) styleguide.
"kss-node" is a NodeJS implementation of [Knyle Style Sheets](https://github.com/kneath/kss) (KSS).
kss-node enables us to generate a beatiful styleguide for CSS, of course that suports LESS, SASS and Stylus.


kss-node quickstart
===================

I introduce about kss-node briefly.

If you want to learn kss-node, please refer [kss-node project page](https://github.com/hughsk/kss-node).
And also the original [KSS specification](https://github.com/kneath/kss/blob/master/SPEC.md) may be helpful for writing your documentation.


Format
------
kss-node is almost compatible with KSS documentation.
But kss-node can depend on only comment in source code because it has `Markup:` directive for showing the sample markup.

Here is a basic format for kss-node documentation.

```css
/*
Buttons

A majority of buttons in the site are built from the same base class.

:hovered    - Highlight the button when hovered.
:disabled   - Make the button change appearance to reflect it being disabled.
.primary    - Indicate that the button is the primary feature of this form.

Markup:
<a href="#" class="button {$modifiers}">Link Button</a>
<button class="button {$modifiers}">Button Element</button>

Styleguide 1.1
*/
.button {
  ...
}
.button:hover {
  ...
}
.button:disabled {
  ...
}
.button.primary {
  ...
}
```

As you see in the above samples, kss-node comment has some blocks.
From the top,

1. Element's title
2. Element's description
3. List of modifier classes or pseudo-classes
4. HTML markup
5. Reference to the element's position in the styleguide

And each description supports the Markdown writing.


Styleguide
===================

In order to fully take advantage of KSS, you should create a living styleguide. A living styleguide is a *part of your application* and should include all of the CSS, Javascript, and layout the rest of your application does.

To get started quickly use the CLI tool, which supports custom templates too. If you're feeling game you can (and should) build it up from scratch using the module's API.

Overall, keep in mind that styleguides should adapt to the application they are referencing and be easy to maintain and as automatic as possible.


Organization
===================

The styleguide should be organized by numbered sections. These sections can go as deep as you like. Every element should have a numbered section to refer to. For example:

    1. Buttons
      1.1 Form Buttons
        1.1.1 Generic form button
        1.1.2 Special form button
      1.2 Social buttons
      1.3 Miscelaneous buttons
    2. Form elements
      2.1 Text fields
      2.2 Radio and checkboxes
    3. Text styling
    4. Tables
      4.1 Number tables
      4.2 Diagram tables

The goal here is to create an organizational structure that is flexible, but  rigid enough to be machine processed and referenced inside of documentation.


More example code
-----------------
This document is also created by using kss-node.
You can see the source code in the [demo directory](https://github.com/htanjo/kss-node-template/tree/master/demo/src).