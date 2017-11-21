### General

On most applications we have markup or functionality which has no relationship to its content. Nice examples are grid helper classes like Foundation or Boostrap provides.

Therefore Veams uses the instrument `Utility`.
 
Examples are:

1. Grid systems per class
2. Multiple sections in regions
2. Helper functions for back- and frontedn

You do not have to use Utilities when you think it is not necessary - this is up to you.  

### Why do we use Utilities?

We use Utilities to simplify the differentiation between `Components` and helper functionality.

### Structure

When we use markup utility helper, we prefix them with `u-` (or `_u-` for scss files). The declaration helps us structuring our code base.

But you can also just forget the prefix when you are using frameworks with predefined classes.

#### Example Snippet

``` hbs
<div class="u-grid-row">
    <div class="u-grid-col is-3">
    </div>
    <div class="u-grid-col is-3">
    </div>
    <div class="u-grid-col is-3">
    </div>
</div>
```

### File/Folder Structure

When you use a Template Engine, it is important to create a folder for your utilities. The styles are scoped to the utility.

Our utilities folder structure can look like this: 

``` bash
    └───utilities
        └───grid
               u-grid-row.hbs
               u-grid-col.hbs
               _u-grid.scss

```

### Examples

Here are some examples: 

* Grid System
* Sections

#### Grid Row

``` hbs
<div class="u-grid-row">
    \{{{yield}}}
</div>
```

#### Grid Column

``` hbs
<div class="u-grid-col\{{#if options.classes}} \{{options.classes}}\{{/if}}">
    \{{{yield}}}
</div>
```
