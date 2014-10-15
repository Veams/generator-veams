# Blocks 

`Blocks` are very simple to understand. 

1. Blocks are content blocks. 
2. Blocks can contain modules or components. 
3. They are **not reusable**.

When you have worked with Drupal you should see similarities. 

When you use `blocks`, you have to prefix them with `b-` (or `_b-` for scss files). The declaration helps you structuring your code base.

### Assemble

Every block `.hbs` file get following structure:

``` YAML
---
block: My Block Name
---
```

Your block folder structure can look like this: 

``` bash
    └───partials
        └───blocks
               b-footer-copy.hbs
               b-logo.hbs
               b-toggle.hbs
               b-nav.hbs
               b-aside-content.hbs
               b-sitemap.hbs

```

### SCSS Structure

For each block you have to create a scss file. The folder can look like this: 

``` bash
├───scss
	└───blocks
			_b-nav.scss
			_b-aside-content.scss
			_b-toggle.scss
```


### Examples

Here are some examples: 

* Logo - Content Block
* Navigation - Content Block
* Footer Content - Content Block
* Search Bar - Content Block
