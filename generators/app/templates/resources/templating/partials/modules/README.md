# Modules

`Modules` are simple or complex functional elements. When you have to use additional mark-up, then provide an own template in this folder. 

1. A `module` can **NOT** contain any content for itself.
2. `Modules` contain blocks or components.

When you use `modules` as html component, you have to add a data-attribute to your files. The declaration helps you structuring your code base.

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
│       carousel.hbs
│       carousel__content.hbs
│       carousel__pagination.hbs
│
├───accordion
│       accordion.hbs
│
├───tabtree
│       tabtree.hbs
│
└───slider
        slider.hbs
```

To structure sub elements of a module, you create a new partial and define the name with BEM syntax.

### SCSS Structure

For each module you have to create a scss file. The folder can look like this:

``` bash
├───scss
    └───modules
              _carousel.scss
              _accordion.scss
              _tabtree.scss

```

### Examples

Here are some examples:

* Tabtree
* Switcher
* Slider
* Carousel
* Accordion