# Components 

`Components` have a very important role. **They are reusable.**

1. `Components` are always closely related to content. 
2. The content in `components` is variable and will change on different contexts/pages.
3. `Components` are generic templates which can be used all over your project. 

When you use `components`, you have to prefix them with `c-` (or `_c-` for scss files). The declaration helps you structuring your code base.

### Assemble

Every components `.hbs` file get following structure:

``` YAML
---
component: My Component Name
---
```

Your component folder structure can look like this: 

``` bash
│   README.md
│
├───article
│       c-article.hbs
│       c-article__header.hbs
│       c-article__footer.hbs
│
├───figure
│       c-figure.hbs
│
├───picture
│       c-picture.hbs
│
└───video
        c-video.hbs
```

To structure sub elements of a component like `<header>` in `<article>`, you create a new partial and define the name with BEM syntax. 

### SCSS Structure

For each component you have to create a scss file. The folder can look like this: 

``` bash
├───scss
    └───components
              _c-article.scss
              _c-figure.scss
              _c-video.scss

```

### Examples

Here are some examples: 

* article - Articles can be used in teasers or on pages, content sections and so on.
* figure - Figures can be placed in an article or teaser or carousel. 
* picture - Pictures can be placed in figures.
* teaser - When you use teasers in sliders and other modules and the content is flexible then it should be a component.
* lists