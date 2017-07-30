### General 

Because images speak louder than words, here is an image to illustrate Regions:

![alt text](http://www.veams.org/img/temp/regions.jpg "Regions")

This image makes it clear, that: 

1. Regions are not reusable. 
2. Regions are only defined in your layout files.
3. Regions subdivide your layout.

_This image is actually borrowed from Drupal.org._

### Why do we use Regions?

By using Regions we separate layout styles from our other instruments (`Components` and `Blocks`). The main benefit is drop-in replacement. 

In example we can just replace our `logo` (Block) and replace it with a `language-switcher` (Block) without worrying about layout issues.  

### Structure

When we use Regions, we prefix them with `r-` (or `_r-` for scss files). The declaration helps us structuring our code base.

#### Example Snippet

``` hbs
<div class="r-header">
	<div class="header__inner is-container is-table-lyt">
		<div class="r-header-left">
		</div>
		<div class="r-header-right">
		</div>
	</div>
</div>
```

### File/Folder Structure

Every region should be defined in our layout file (in example `lyt-default.hbs` which you can find in your `templating` directory). 

### Styles and Sass Structure

For each layout section we create a Sass file. In this layout Sass file we define our regions. 

The folder can look like this: 

``` bash
├───scss
	└───layout
			_header.scss
			_main.scss
			_footer.scss
```

### Examples

* Header Region
* Logo Region in Header
* Navigation Region in Header
* Stage Region
* Main Content Region
* Sidebar Region
* Footer Region