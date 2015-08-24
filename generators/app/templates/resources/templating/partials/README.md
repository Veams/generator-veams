### General

To build our prototype we use the PG Methodology which contains the following structure: 
- `global`: global partials like metadata, scripts, styles or section
- `blocks`: static files which are not reusable like logo, navigation, copyright
- `components`: reusable partials like article, figure, teaser 
- (`modules`): optional folder for modules with predefined markup which is necessary for js modules 

### `\{{#wrapWith}}`

`\{{#wrapWith}}` are mini templates. Next up you will see our `wrapWith` in detail.

#### `\{{#wrapWith}}` Philosophy

`wrapWith` are reusable code snippets which wrap your custom markup with a special template markup.

1. It is useful for grids and general layout markup snippets
2. You can pass optional arguments
3. You can use these arguments in your `wrapWith` to make your templates flexible

**Here are some examples:** 

* General Sections
* General Grids
* Complex Modules