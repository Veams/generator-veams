# Components

This folder contains all components.

1. Components are always linked with content.
2. The content is variable and will change on different contexts/pages.
3. Components are generic templates which can be used all over your project.

## Examples

* article - articles can be used in teasers or on pages, content sections and so on
* sections - only when sections contain content
* figures
* pictures
* teasers - when you use teasers in sliders and other modules and the content is flexible then it should be a component


## Usage

**You have to prefix components with `c-`.**

Every component `.hbs` file get following structure:

``` YAML
---
component: My Component Name
---
```

## Notes
To support the "picture" element I use picturePolyfill.js.