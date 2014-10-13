/**
 * @author sebastian.fitzner
 */
(function ($) {
	$.widget('pg.carouselPager', {
		options: {
			activeClass: 'active',
			carouselRef: 'data-carousel',
			slides: '[data-carousel-elements="list"]',
			pagination: '[data-carousel-pagination="list"]',
			paginationElements: '[data-carousel-pagination="list-item"]'
		},

		// View constructor
		_create: function () {
			this.pager = this.element;
			this.carousel = $(this.element.attr(this.options.carouselRef));
			this.index = 0;

			if (this.carousel.length === 0) {
				return;
			}

			this._initPagination();

		},

		_initPagination: function () {
			var pagination = this.element.find(this.options.pagination);
			var paginationElements = this.element.find(this.options.paginationElements);
			var i = 1;
			var length = this.getCarouselLength();

			for (i; i < length; ++i) {
				pagination.append(paginationElements.clone());
			}

			paginationElements.addClass(this.options.activeClass);
			this.pagination = this.element.find(this.options.paginationElements);

			this._bindEventHandlers();

		},

		getCarouselLength: function () {
			return this.carousel.find(this.options.slides).children().length;
		},

		_bindEventHandlers: function () {
			var that = this;

			this.carousel.on('carousel:changeSlide', function (e, i) {
				that.setActive(i);
			});

			this.pagination.on('click', function (e) {
				if ($(e.currentTarget).hasClass(that.options.activeClass)) {
					return;
				}
				that.carousel.carousel('changeSlide', {
					slideIndex: $(e.currentTarget).index() + 1, // Set the option slideIndex
					direction: that.getDirection($(e.currentTarget).index() + 1)
				});
			});
		},

		setActive: function (i) {
			if (i === this.index) {
				return;
			}

			this.pagination.removeClass(this.options.activeClass);
			$(this.pagination[i]).addClass(this.options.activeClass);
			this.index = i;
		},

		getDirection: function (newIndex) {
			return newIndex > this.index ? "next" : "prev";
		}
	});
})(jQuery);
