require.config({
	paths: {
		jquery: '../../vendor/jquery',
		backbone: '../../vendor/backbone'
	},
	shim: {
		'backbone': {
			deps: ['../../vendor/underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});
require(['CarouselView', 'CarouselPagerView'], function (Carousel, CarouselPager) {

	window.App = {
		Vent: _.extend({}, Backbone.Events) // We use the underscore lib to clone Backbone.Events into the Vent object without referencing it
	};

	$('[data-carousel="true"]').each(function () {
		new Carousel({
			el: $(this)
		}).render();
	});

	$('[data-carousel-pagination="true"]').each(function () {
		new CarouselPager({
			el: $(this)
		}).render();
	});

});
