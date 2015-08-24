# Regions

`Regions` are areas in your layout. **They are not reusable.**

1. `Regions` are only defined in your layouts. 
2. `Regions` subdivide your layout. 

Here is an image to illustrate region areas: 

![alt text](http://veams.org/img/pages/veams-methodology/regions.jpg "Regions")

This image is actually borrowed from Drupal.org.

**When you use `regions`, you have to prefix your classes with `r-` (and in scss use `_r-` for your files name). The declaration helps you structuring your code base.**

### Assemble

Every region should be defined in your layout (`lyt-default.hbs`) which can look like that:

``` hbs
<!-- Header
================================================== -->
<header class="r-header">
	<div class="header__rotate">
		<div class="container header__container">
		</div>
	</div>
</header>

<!-- Nav
================================================== -->
<section class="r-nav">
	<div class="nav__rotate">
	</div>
</section>

<!-- Stage
================================================== -->
<section class="r-stage">
	<div class="stage__rotate">
		<div class="container stage__container">
		</div>
	</div>
</section>

<!-- Content
================================================== -->
<main class="r-main" id="main">
	<div class="main__rotate">
		<div class="container main__container">
			<aside class="r-sidebar is-right">
			</aside>
			<div class="r-content">
			</div>
		</div>
	</div>

</main>

<!-- Footer
================================================== -->
<footer class="r-footer">
	<div class="container footer__container">
		<div class="footer__inner">
		</div>
	</div>
</footer>
```

### SCSS Structure

For each region you have to create a scss file. The folder can look like this: 

``` bash
├───scss
	└───regions
			_r-main.scss
			_r-sidebar.scss
			_r-stage.scss
```

The region style files can only contain layout specific styles. 

### Examples

Here are some examples: 

* Header 
* Stage
* Footer
* Main
* Sidebar Left
* Sidebar Right