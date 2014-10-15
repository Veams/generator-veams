# Modules 

`Modules` are simple or complex functional elements. 

1. A `module` can **NOT** contain any content for itself.
2. `Modules` contain blocks or components.

When you use `modules`, you have to prefix them with `m-` (or `_m-` for scss files). The declaration helps you structuring your code base.

### Assemble

Every module `.hbs` file get following structure:

``` YAML
---
module: My Module Name
---
```

Your modules folder structure can look like this: 

``` bash
│   README.md
│
├───carousel
│       m-carousel.hbs
│       m-carousel__content.hbs
│       m-carousel__pagination.hbs
│
├───accordion
│       m-accordion.hbs
│
├───tabtree
│       m-tabtree.hbs
│
└───slider
        m-slider.hbs
```

To structure sub elements of a module, you create a new partial and define the name with BEM syntax. 

### SCSS Structure

For each module you have to create a scss file. The folder can look like this: 

``` bash
├───scss
    └───modules
              _m-carousel.scss
              _m-accordion.scss
              _m-tabtree.scss

```

### Examples

Here are some examples: 

* Tabtree
* Switcher
* Slider
* Carousel
* Accordion