// IndexView.js

define(["jquery", "backbone"],

	function ($, Backbone, template) {

		var CarouselPagerView = Backbone.View.extend({
			options: {
				activeClass: 'active',
				carouselRef: 'data-carousel',
				slides: '[data-carousel-elements="list"]',
				pagination: '[data-carousel-pagination="list"]',
				paginationElements: '[data-carousel-pagination="list-item"]'
			},

			// View constructor
			initialize: function (options) {
				this.options = _.defaults(options || {}, this.options); // get/set default options
				this.pager = this.$el;
				this.carousel = $(this.$el.attr(this.options.carouselRef));
				this.index = 0;

				if (this.carousel.length === 0) {
					return;
				}

				this._initPagination();

				// Calls the view's render method
				this.render();

			},

			_initPagination: function () {
				var pagination = this.$el.find(this.options.pagination);
				var paginationElements = this.$el.find(this.options.paginationElements);
				var i = 1;
				var length = this.getCarouselLength();

				for (i; i < length; ++i) {
					pagination.append(paginationElements.clone());
				}

				paginationElements.addClass(this.options.activeClass);
				this.pagination = this.$el.find(this.options.paginationElements);

				this._bindEventHandlers();

			},

			getCarouselLength: function () {
				return this.carousel.find(this.options.slides).children().length;
			},

			_bindEventHandlers: function () {
				var that = this;

				this.carousel.on('CarouselView:changeSlide', function (e, i) {
					that.setActive(i);
				});

				this.pagination.on('click', function (e) {
					if ($(e.currentTarget).hasClass(that.options.activeClass)) {
						return;
					}
					that.$el.trigger('CarouselPagerView:changeSlide', {
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
			},

			// Renders the view's template to the UI
			render: function () {

				// Maintains chainability
				return this;

			}

		});

		// Returns the View class
		return CarouselPagerView;

	}
);
