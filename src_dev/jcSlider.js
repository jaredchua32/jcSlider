/*
 *  Copyright (C) 2014 Jared Chua
 *
 *	This program is free software: you can redistribute it and/or modify
 *	it under the terms of the GNU General Public License as published by
 *	the Free Software Foundation, either version 3 of the License, or
 *	(at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *	You should have received a copy of the GNU General Public License
 *	along with this program.  If not, see <http://www.gnu.org/licenses/>.	
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */	

;(function($, undefined) {
	var JCSlider = {
		init: function(container, imageUrls, options) {

			this.sliderContainer = container;
			this.urls = imageUrls;
			this.options = $.extend({}, $.jcSlider.options, options);
			this.dispIndex = 0;

			this.initImages();
			this.getImageDimensions();
			this.initImageFrames();
			this.frameImages();
			
			this.initSlider();
			this.hangFrames();
			
			this.displaySlider();
			this.initResizeCallback();
			
			this.initSideButtons();
			this.bindSideButtons();

			this.initNavButtons();
			this.bindNavButtons();

			this.initAutoScroll();
		},

		initImages: function() {
			var self = this;
			this.images = [];
			this.shortImages = [];
			this.firstImageLoaded = new $.Deferred;
			this.loadedImages = 0;

			for(var index = 0; index < this.urls.length; index++) {
				var newImg = $('<img>', {src: this.urls[index]});

				if(index === 0) { this.firstImg = newImg[0]; }

				newImg[0].addEventListener('load', function(i) {
					return function() {
						self.loadedImages++;

						if(i === 0) {
							self.firstImageLoaded.resolve(this);
							self.resizeFrames();
						} else {
							if(self.firstImg.height > this.height) {
								self.shortImages.push($(this));
							}
							
							if(self.loadedImages === self.urls.length) {
									self.resizeFrames();
								self.resizeNavButtons();
							}
						}
					};
				}(index));
				
				this.images.push(newImg);
			}
		},

		getImageDimensions: function() {
			var self = this;
			this.dimensionsReady = new $.Deferred;

			this.firstImageLoaded.done(function(img) {
				self.imgWidth = (self.options.width === 'auto')
					? img.naturalWidth
					: self.options.width;
					
				self.imgHeight = img.naturalHeight;
				self.dimensionsReady.resolve();
			})
		},

		initImageFrames: function() {
			var self = this;
			this.imgFrames = [];

			for(var index = 0; index < this.images.length; index++) {
				this.imgFrames.push(
					$('<div>').css({
						'background-color': self.options.frameBG,
						'width': (100 / this.images.length) + '%'
					})
				);
			}

			this.dimensionsReady.done(function() {
				self.imgFrames.forEach(function(frame) {
					frame.css('max-height', self.imgHeight);
				})
			});
		},

		frameImages: function() {
			var self = this;
			this.imgFrames.forEach(function(frame, index) {
				frame.append(self.images[index]);
			});
		},

		initSlider: function(container) {
			var self = this;
			this.slider = $('<div>');

			this.slider
				.addClass('cf')
				.css('width', (100 * this.images.length) + '%');
			this.sliderContainer.css('margin-top', this.options.marginTop);

			this.dimensionsReady.done(function() {
				self.sliderContainer.css('max-width', self.imgWidth);
			})
		},

		hangFrames: function() {
			for(var index = 0; index < this.images.length; index++) {
					this.slider.append(this.imgFrames[index]);
				}
		},

		displaySlider: function() {
			this.sliderContainer.append(this.slider);
		},

		resizeFrames: function() {
			// var curImgHeight = this.images[0].height();
			var curImgHeight = this.images[0][0].getBoundingClientRect().height;

			for(index = 1; index < this.imgFrames.length; index++) {
				this.imgFrames[index].css('height', curImgHeight + 'px');
			}

			for(index = 0; index < this.shortImages.length; index++) {
				var curImg = this.shortImages[index];
				var marginTop = ((curImgHeight - curImg.height()) / 2) + 'px'
				curImg.css('margin-top', marginTop);
			}
		},

		initResizeCallback : function() {
			var self = this;
			this.windowResizeListener = 
				window.addEventListener('resize', function() {
					self.resizeFrames();
					self.resizeNavButtons();
				});
		},

		initSideButtons: function() {
			if(	this.options.sideButtons === 'none' ||
			  	typeof(this.options.leftBtn) !== 'undefined' ||
			  	typeof(this.options.rightBtn) !== 'undefined'
			) { return; }

			else if(this.options.sideButtons === 'auto') {
				this.options.leftBtn = $('<button>', {class: 'leftBtn' });
				this.options.rightBtn = $('<button>', { class: 'rightBtn' });
				this.sliderContainer.append(this.options.leftBtn, this.options.rightBtn);
			}
		},

		bindSideButtons: function() {
			var hasLeftBtn = typeof(this.options.leftBtn) !== 'undefined',
				hasRightBtn = typeof(this.options.rightBtn) !== 'undefined',
				self = this;

			if( this.options.sideButtons === 'none' && !hasLeftBtn && !hasRightBtn )
				{ return; }

			if(hasLeftBtn) {
				this.options.leftBtn.on('click', function() {
					if(self.slider.queue().length === 0) {
						self.clearAutoScroll();
					}

					self.slideRight();
				});
			}

			if(hasRightBtn) {
				this.options.rightBtn.on('click', function() {
					if(self.slider.queue().length === 0) {
						self.clearAutoScroll();
					}

					self.slideLeft();
				});
			}
		},

		initNavButtons: function() {
			if(!this.options.navButtons) { 
				this.disableNavFunctions();
				return;
			}

			var self = this;

			this.navButtons = [];
			this.navButtonsContainer = $('<div>', {class: 'navBtnsContainer'});
			this.navButtonsSubContainer = $('<div>', {class: 'cf navBtns'});
			
			for(var index = 0; index < this.images.length; index++) {
				var newButton = $('<button>', {class: 'navBtn'});
				newButton[0].setAttribute('data-btnIndex', index);
				this.navButtons.push(newButton);
				this.navButtonsSubContainer.append(newButton);
			}

			// The height of the image determines the height of the
			// buttons' parent containers.
			this.firstImageLoaded.done(function() {
				self.resizeNavButtons();
				self.activateButton(self.navButtons[self.dispIndex]);
			})
			
			this.navButtonsContainer
				.append(this.navButtonsSubContainer)
				.appendTo(this.sliderContainer);
		},

		bindNavButtons: function() {
			if(!this.options.navButtons) { return; }

			var self = this;
			// Add just one listener to the container instead of
			// creating this.images.length listeners.
			this.navButtonsSubContainer.on('click', function(e) {
				var clickedItem = e.target,
					// Return -1 if clicked item is not a button.
					// Otherwise, return its index.
					clickedIndex = clickedItem.getAttribute('data-btnIndex') || -1;

				if(clickedIndex === -1 || self.slider.queue().length > 0) { return; }
				var currentIndex = self.dispIndex,
					diff = clickedIndex - currentIndex,
					absDiff = Math.abs(diff);
					amountOfImages = self.images.length;

				if(diff === 0) { 
					return; 
				} else if(diff > 0) {
					// Button clicked is to the right of current index.				
					var rightDistance = absDiff,
						leftDistance = amountOfImages - absDiff;
				} else {
					// Button clicked is to the left of current index.
					var rightDistance = amountOfImages - absDiff,
						leftDistance = absDiff;
				}

				if(rightDistance <= leftDistance) {
					for(var i = 0; i < rightDistance; i++) {
						self.slideLeft();
					}
				} else {
					for(var j = 0; j < leftDistance; j++) { 
						self.slideRight();
					}
				}

				self.clearAutoScroll();
			}) // end .on('click')
		},

		resizeNavButtons: function() {
			var curBtnHeight = Math.ceil(
				this.navButtons[0][0].getBoundingClientRect().height);

			this.navButtons.forEach(function(btn) {
				btn.css('width', curBtnHeight);
			})
		},

		disableNavFunctions: function() {
			// navButtons is left as an empty array to prevent
			// runtime errors when navButtons is disabled in options.
			this.navButtons = [];
			this.bindNavButtons = function() {};
			this.resizeNavButtons = function() {};
			this.activateButton = function() {};
			this.deactivateButton = function() {};
		},

		initAutoScroll: function() {
			if(!this.options.autoScroll) { return; }
			var self = this;

			if(typeof(this.scrollHandler) === 'undefined') {
				this.scrollHandler = setInterval(function() {
					self.slideLeft();
				}, this.options.scrollInterval);
			}
		},

		clearAutoScroll: function() {
			this.scrollHandler = clearInterval(this.scrollHandler);
		},

		slideLeft: function() {
			var self = this,
				slider = this.slider,
				css = {'margin-left' : -(this.slider.width() / this.images.length) + 'px'},
				// Because each 'slide' adds four items to the queue and
				// the first item added onto the queue by slideLeft finishes
				// its execution almost instantaneously, I had to round up in
				// order to get a whole number.
				queueLen = Math.ceil(slider.queue().length / 4),
				// Offset queueLen by one to avoid dividing by zero and
				// to maintain the series: 1/1, 1/2, 1/3, etc.
				dur = this.options.scrollDuration / (queueLen + 1);

			slider
				.queue(function() {
					self.deactivateButton(self.navButtons[self.dispIndex]);
					slider.dequeue();
					// If this activateButton call was after animate, the buttons
					// won't light up along with the scrolling. self.dispIndex
					// is offset by one because firstToLast() hasn't been called.
					// In order to prevent an array out of bounds error, I had to
					// do some calculations beforehand.
					var nextBtnIndex = ((self.dispIndex + 1) > (self.images.length - 1)) ? 0 : (self.dispIndex + 1);
					self.activateButton(self.navButtons[nextBtnIndex]);
				})
				.animate(css, dur, this.options.easing)
				.queue(function() { 
					self.firstToLast();
					slider.dequeue();
				})
				.queue(function() {
					slider.dequeue();
					if((slider.queue().length) === 0) { 
						setTimeout(function() {
							self.initAutoScroll();
						}, self.options.scrollDuration + self.options.pauseDuration);
					}
				});
		},

		firstToLast: function() {
			this.slider
				.append(this.imgFrames[this.dispIndex])
				.css( {'margin-left':0} );
			this.dispIndex = (this.dispIndex + 1) % this.images.length;
		},

		slideRight: function() {
			var self = this,
				slider = this.slider,
				css = { 'margin-left':0 },
				// Similar concept as slideLeft in order to get a
				// whole number for queueLen.
				queueLen = Math.ceil(this.getQueueLength() / 4),
				dur = this.options.scrollDuration / (queueLen || 1);

			slider
				// I separated queue items 1 and 2 in order to add the
				// same amount of items as slideLeft to the queue,
				// which makes sure that queueLen will always calculate
				// to the correct whole number of items in the queue.
				.queue(function() {
					self.deactivateButton(self.navButtons[self.dispIndex]);
					slider.dequeue();
				})
				.queue(function() {
					self.lastToFirst();
					self.activateButton(self.navButtons[self.dispIndex]);
					slider.dequeue();
				})
				.animate(css, dur, self.options.easing)
				.queue(function() {
					slider.dequeue();
					if(self.getQueueLength() === 0) {
						setTimeout (function() {
							self.initAutoScroll();
						}, self.options.scrollDuration + self.options.pauseDuration);
					}
				});
		},

		lastToFirst: function() {
			var len = this.images.length;
			
			this.slider
				.prepend(this.imgFrames[(this.dispIndex + len - 1) % len])
				.css( {'margin-left': (-1 * this.slider.width() / this.images.length) + 'px'} );

			this.dispIndex = (this.dispIndex - 1 < 0)
				? this.images.length - 1
				: this.dispIndex - 1;
		},

		getQueueLength: function() {
			return this.slider.queue().length;
		},

		activateButton: function($button) {
			$button.addClass('activated');
		},

		deactivateButton: function($button) {
			$button.removeClass('activated');
		},

		timeDiff: function() {
			return Date.now() - this.startTime;
		}
	} // end JCSlider

	$.jcSlider = function(container, images, options) {
			var jcSlider = Object.create(JCSlider);
			jcSlider.init(container, images, options);
			return jcSlider;
	}

	$.jcSlider.options = {
		width: 'auto',
		frameBG: '#000000',
		marginTop: '0',
		sideButtons: 'auto',
		leftBtn: undefined,
		rightBtn: undefined,
		navButtons: true,
		autoScroll: true,
		scrollInterval: 3000,
		scrollDuration: 600,
		pauseDuration: 1000,
		easing: 'linear'
	}
	
})(jQuery);