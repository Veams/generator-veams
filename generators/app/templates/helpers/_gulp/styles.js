var config = require('../config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');


// Dev Build Task
gulp.task('styles', function () {
	return gulp.src(config.options.paths.src + '/scss/styles.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.options.paths.dev + '/css'))
		.pipe(config.server.reload({stream: true}))
		.pipe(config.notify({message: 'Styles compiled'}));
});

// Dist Build Task
gulp.task('styles-dist', function () {
	return gulp.src(config.options.paths.src + '/scss/styles.scss')
		.pipe(sass({style: 'expanded'}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 7', 'android 4'))
		.pipe(gulp.dest(config.options.paths.dev + '/css'))
		.pipe(minifycss())
		.pipe(gulp.dest(config.options.paths.dev + '/css'))
		.pipe(config.notify({message: 'Compiling, minification and autoprefixing of styles completed'}));
});