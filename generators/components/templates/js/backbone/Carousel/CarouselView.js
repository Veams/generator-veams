define(["jquery", "backbone"],

	function ($, Backbone) {

		var CarouselView = Backbone.View.extend({
			// The options associated with this view
			options: {
				slides: '[data-carousel-elements="list"]',
				currentClass: 'current',
				slideNextInFX: 'slide-rotateRoomLeftIn',
				slideNextOutFX: 'slide-rotateCubeLeftOut',
				slidePrevInFX: 'slide-rotateRoomRightIn',
				slidePrevOutFX: 'slide-rotateCubeRightOut',
				carouselPager: '[data-carousel-pagination="true"]'
			},

			// Events
			events: {
				'click [data-carousel-pagination="prev"]': 'showPreviousElement',
				'click [data-carousel-pagination="next"]': 'showNextElement'
			},

			// View constructor
			initialize: function (options) {
				var that = this;
				this.options = _.defaults(options || {}, this.options); // get/set default options
				this.slides = this.$el.find(this.options.slides); // slide container
				this.slide = this.slides.children(); // slides
				this.carouselPager = this.$el.find(this.options.carouselPager);
				this.currentSlideIndex = 1; // current slide index
				this.lastSlide = 1; // last slide el
				this.slideLength = this.getCarouselLength(); // get slide length
				this.slideWidth = this.getSlideWidth(); // get max width of slides
				this.slideHeight = this.getSlideHeight(); // get max height of slides


				// Calls the view's render method
				this.render();

				this.getFirstSlide(); // set the first slide to .current
				this.setSlideWidth(this.slideWidth); // set width to each slide element
				this.setSlideHeight(this.slideHeight); // set height to each slide element
				// this.positionSlides();

				App.Vent.on('CarouselView:changeSlide', this.changeSlide, this); // trigger event which will be used by other views

				this.carouselPager.on('CarouselPagerView:changeSlide', function (e, opts) {
					that.changeSlide(opts);
				});

			},
			getCarouselLength: function () {
				return this.slide.length;
			},

			getFirstSlide: function () {
				var firstSlide = this.slide.eq(0);

				firstSlide
					.addClass(this.options.currentClass)
					.addClass(this.options.slideNextInFX);
			},

			getSlideHeight: function () {
				var height = 0;

				this.slide.each(function (i) {
					if (i) {
						height = $(this).outerHeight() > height ? $(this).outerHeight() : height;
					}
				});

				return height;
			},

			getSlideWidth: function () {
				var width = 0;

				this.slide.each(function (i) {
					if (i) {
						width = $(this).outerWidth() > width ? $(this).outerWidth() : width;
					}
				});

				return width;
			},

			setSlideHeight: function (height) {
				this.slides.css({
					'height': height
				});
			},

			setSlideWidth: function (width) {
				this.slides.css({
					'width': width
				});

				this.slide.css({
					'width': width
				});
			},

			groupSlides: function (opts) {
				var slideGroup = [];


			},

			// changeSlide() is our main function to navigate
			changeSlide: function (opts) {
				var that = this;
				var newSlide;

				// Update our current slide index
				this.setCurrentSlideIndex(opts);

				// Set the new slide which we can use in other functions
				newSlide = this.setNewSlide(this.slide);

				// Animate to the new slide and deliver some parameters
				this.animateToNewSlide(this.slide, newSlide, opts.direction);

			},

			setCurrentSlideIndex: function (opts) { // When we are changing the URL go to the specific index
				// if slideIndex has a value in opts
				if (opts.slideIndex) {
					// set the current slide index to the value we get from opts
					this.lastSlide = this.currentSlideIndex;
					return this.currentSlideIndex = ~~opts.slideIndex; // ~~ is a shortcut for Number()
				}

				// Set the var lastSlide with getting the old value out of currentSlideIndex
				this.lastSlide = this.currentSlideIndex;

				// And update currentSlideIndex with values we get from opts
				this.currentSlideIndex += opts.direction === 'next' ? 1 : -1;

				// If currentSlideIndex is greater than slide length go back to first slide
				if (this.currentSlideIndex > this.slideLength) {
					this.currentSlideIndex = 1;
				}

				// If currentSlideIndex is smaller than 0 go to last slide
				if (this.currentSlideIndex <= 0) {
					this.currentSlideIndex = this.slideLength;

				}

			},

			setNewSlide: function (slides) { // Just setting the current slide
				return this.slide.eq(this.currentSlideIndex - 1);
			},

			animateToNewSlide: function (slides, newSlide, direction) { // Here the magic animation is happen
				// First we remove all classes from all slides
				var width = this.slideWidth;
				var dir = direction === 'next' ? -1 : 1;


				// First we remove all classes from all slides
				slides
					.removeClass(this.options.slideNextInFX + " " +
					this.options.slideNextOutFX + " " +
					this.options.slidePrevInFX + " " +
					this.options.slidePrevOutFX + " " +
					this.options.currentClass
				);

				// If dir is next
				if (direction === 'next') {
					// Add classes to the last and current slide
					slides.eq(this.lastSlide - 1)
						.addClass(this.options.currentClass + " " + this.options.slideNextOutFX);

					slides.eq(this.currentSlideIndex - 1)
						.addClass(this.options.currentClass + " " + this.options.slideNextInFX);

				} else { // else
					// Add classes to the last and current slide
					slides.eq(this.lastSlide - 1)
						.addClass(this.options.currentClass + " " + this.options.slidePrevOutFX);

					slides.eq(this.currentSlideIndex - 1)
						.addClass(this.options.currentClass + " " + this.options.slidePrevInFX);

				}

				this.$el.trigger('CarouselView:changeSlide', this.currentSlideIndex - 1);
			},

			showPreviousElement: function (e) {
				this.changeSlide({
					direction: 'prev'
				});
			},

			showNextElement: function (e) {
				this.changeSlide({
					direction: 'next'
				});
			},


			// Renders the view's template to the UI
			render: function () {


				// Maintains chainability
				return this;

			}

		});

		// Returns the View class
		return CarouselView;

	}
);
