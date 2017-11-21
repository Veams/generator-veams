### General 

Components are reusable HTML snippets. That means, one page can display multiple identical Components with different data. 

1. Components are always closely related to content. 
2. The content in Components is variable and will change on different contexts/pages.
3. Components are generic so that they can be used all over your project. 
4. Components can contain Components.

### Why do we use Components?

Because of reusability. With reusability you can build building block libraries (we already had, see [Veams Examples](http://examples.veams.org/)).

### Structure

When we use Components, we prefix them with `c-` (or `_c-` for Sass files). The declaration helps us structuring our code base. 

Furthermore we have to define a context, see [Context Handling with Veams](http://www.veams.org/methodology/class-systematic/context-handling.html).

#### Example Snippet

``` hbs
<article class="c-article--default" data-css="c-article--default"></article>
```

### File/Folder Structure

When you use a Template Engine, it is important to create a folder for your components. Each component gets its own folder. 

Our Components folder structure can look like this: 

``` bash
    └───partials
        └───components
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

To structure sub elements of a Component like `<header>` in `<article>`, we create a new partial and define the name with a nice readable syntax (like BEM: `c-article__header.hbs`).

### Styles and Sass Structure

The styles are scoped to the Component. 

For each Component we create a Sass file. The folder can look like this: 

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
* teaser - When we use teasers in sliders and other modules and the content is flexible then we define it as component.
* list-item
