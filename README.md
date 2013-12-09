# Prototype generator

> [Yeoman][yeoman] generator for Prototype.

## Getting started
- Install Yeoman:
    `npm install -g yo`

- Install the package via:
    `npm install -g generator-prototype`

- Or copy the repository via clone to your directory (it depends on the system, just find your directory with yo installed):
    `git clone https://github.com/sebastian-fitzner/generator-prototype.git ~/AppData/Roaming/npm/node_modules`

### Hints
Sometimes you need to clone the package with an absolute path. On windows the clone command can look like this:
`git clone https://github.com/sebastian-fitzner/generator-prototype.git 
D:\Users\Username\AppData\Roaming\npm\node_modules`
- Replace 'Username' with your username
 
## Usage

### Prototype app scaffolds.

```bash
mkdir project && cd project
yo prototype [--skip-install]
```

#### Options

* `-s` alias `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `-w` alias `--skip-welcome-message`

  Skips app welcome message.

## Plugins and Modules
You can apply multiple addons and grunt modules to your project. Just choose specific ones:
 
### Assemble

 * permalinks
 * assemble-contrib-contextual
 * assemble-contrib-sitemap
 * assemble-related-pages
 
### Grunt modules
 
 * [grunt-devtools](https://github.com/vladikoff/grunt-devtools)
 * [grunticon-sass](https://github.com/zigotica/grunticon)
 * [dr-grunt-svg-sprites](https://github.com/drdk/dr-grunt-svg-sprites)
 * [grunt-packager](https://github.com/bobbor/grunt-packager) (only executable when your project.jspackcfg is configured)
 * [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass)
 * [grunt-browser-sync](https://npmjs.org/package/grunt-browser-sync)
 * [grunt-htmlhint](https://github.com/yaniswang/grunt-htmlhint)
 * [grunt-prettysass](https://github.com/brandonminch/grunt-prettysass)
 * [grunt-photobox](https://github.com/stefanjudis/grunt-photobox)

## CMS snippets (work in progress)
You can choose between multiple content management systems (Drupal, Typo3, Magnolia, CoreMedia). 
After choosing a system you will get HTML-snippets and a few new SCSS files, which you can use:
 
 * Drupal 7
 * TYPO3 6.2
 * Magnolia
 * CoreMedia

## Alternative

 * [grunt-init-assemble](https://github.com/assemble/grunt-init-assemble)
 * [generator-assemble](https://github.com/assemble/generator-assemble)


## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[yeoman]: http://yeoman.io/

## TODO:
 * CMS Snippets
 * grunt-photobox
