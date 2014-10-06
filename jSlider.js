;(function($, undefined) {
	var JSlider = {
		init: function(container, imageUrls, options) {
			// console.log(images);
			this.sliderContainer = container;
			this.urls = imageUrls;
			this.options = $.extend({}, $.jSlider.options, options);
			this.dispIndex = 0;

			this.queue = 0; //


			this.initImages2();
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
			// this.resizeNavButtons();

			this.initAutoScroll();
			
		},

		initImages2: function() {
			this.images = [];
			this.shortImages = [];
			this.firstImageLoaded = new $.Deferred;
			this.loadedImages = 0;

			var self = this;

			for(var index = 0; index < this.urls.length; index++) {
				var newImg = $('<img>', {src: this.urls[index]});

				if(index === 0) { this.firstImg = newImg[0]; }

				newImg[0].addEventListener('load', function(i) {
					return function() {
						self.loadedImages++;

						if(i === 0) {
							self.firstImageLoaded.resolve(this);
						} else {
							if(self.firstImg.height > this.height) {
								self.shortImages.push($(this));
							}
							
							if(self.loadedImages === self.urls.length) {
								self.resizeFrames();
							}
						}
					};
				}(index));
				
				this.images.push(newImg);
			}
		},

		getImageDimensions: function() {
			this.dimensionsReady = new $.Deferred;

			var self = this;

			this.firstImageLoaded.done(function(img) {
				self.imgWidth = (self.options.width === 'auto')
					? img.naturalWidth
					: self.options.width;

				self.imgHeight = (self.options.height === 'auto')
					? img.naturalHeight
					: self.options.height;
				
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
				$.each(self.imgFrames, function(index, frame) {
					// frame.css('height', self.imgHeight);
					frame.css('max-height', self.imgHeight);
				})
			});
		},

		frameImages: function() {
			var self = this;

			$.each(this.imgFrames, function(index, frame) {
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
				self.sliderContainer
					.css({
						'max-width' : self.imgWidth
					});
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
			var curImgHeight = this.images[0].height();

			for(index = 1; index < this.imgFrames.length; index++) {
				this.imgFrames[index]
					.css('height', curImgHeight + 'px');
			}

			for(index = 0; index < this.shortImages.length; index++) {
				var $curImg = this.shortImages[index];
				var marginTop = ((curImgHeight - $curImg.height()) / 2) + 'px'
				$curImg.css('margin-top', marginTop);
			}
		},

		initResizeCallback : function() {
			var self = this;
			this.windowResizeListener = 
				window.addEventListener('resize', function() {
					self.resizeFrames();
					self.resizeNavButtons();
					//self.resizeNavButtons();
				}, self.options.resizeDelay);
		},

		initSideButtons: function() {
			if(this.options.buttons === 'none') { 
				return;
			} else if(this.options.buttons === 'auto') {
				// TODO: generate and bind automagic buttons for the user.
				this.options.leftBtn = $('<button>', {class: 'leftBtn' });
				this.options.rightBtn = $('<button>', { class: 'rightBtn' });
			} else {
				console.log('user-defined');
				// TODO: bind user-defined buttons.
			}

			this.sliderContainer.append(this.options.leftBtn, this.options.rightBtn);
		},

		bindSideButtons: function() {
			if(this.options.buttons === 'none') { return; }
			var self = this;

			this.options.leftBtn.on('click', function() {
				if(self.slider.queue().length === 0) {
					// self.start = Date.now();
					self.disableAutoScroll();
					// console.log('autoScroll disabled. left');
				}
				
				// self.queue++;
				// console.log('queue');
				self.scrollRight();
			});
			this.options.rightBtn.on('click', function() {
				if(self.slider.queue().length === 0) {
					// self.start = Date.now();
					self.disableAutoScroll();
					console.log('autoScroll disabled. right');
				}
				
				self.scrollLeft();
			})
		},

		initNavButtons: function() {
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

			this.firstImageLoaded.done(function() {
				self.resizeNavButtons();
				self.activateButton(self.navButtons[self.dispIndex]);
			})
			// The height of the buttons is based on the height of its
			// container which is based on the height of its container, which
			// is based on the height of the first/main image.

			// var self = this;
			// for(var time = 0; time < 25; time++) {
			// 	setTimeout(function(t) {
			// 		return function() {
			// 		console.log(t + 'ms:');
			// 		// console.log(self);
			// 		console.log(self.navButtons[0][0].getBoundingClientRect().height);
			// 		// console.log('---')	
			// 		}
			// 	}(time), time);
			// }

			this.navButtonsContainer
				.append(this.navButtonsSubContainer)
				.appendTo(this.sliderContainer);

			// Add a listener to the container rather than creating
			// this.images.length listeners.
			this.navButtonsSubContainer.on('click', function(e) {
				var clickedItem = e.target,
					// Return -1 if clicked item is not a button.
					// Otherwise, return its index.
					clickedIndex = clickedItem.getAttribute('data-btnIndex') || -1;

				if(clickedIndex === -1) { return; }
				console.log(self.dispIndex + ' ' + clickedIndex);
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
					var rightDistance = amountOfImages - absDiff,
						leftDistance = absDiff;
					// Button clicked is to the left of current index.
				}

				if(rightDistance <= leftDistance) {
					for(var i = 0; i < rightDistance; i++) {
						self.scrollLeft();
					}
				} else {
					// rightDistance > leftDistance
					for(var j = 0; j < leftDistance; j++) {
						self.scrollRight();
					}
				}
				// // 
				// if(clickedIndex > currentIndex) {
				// 	// ScrollLeft
				// 	for(var index = 0; index < )
				// } else {
				// 	// ScrollRight
				// }
				

			})
			// this.dimensionsReady.done(function() {
			// 	console.log(newButton[0].getBoundingClientRect());
			// });
			// console.log(this.navButtons);
			// console.log(this.navButtonsContainer);
			// this.
		},

		resizeNavButtons: function() {
			var curBtnHeight = Math.ceil(
					this.navButtons[0][0].getBoundingClientRect().height
				);
			// console.log(this.navButtons[0][0].getBoundingClientRect().height);
			// $.each(this.navButtons, function(i, btn) {

			// })
			$.each(this.navButtons, function(index, btn) {
				// console.log(curBtnHeight);
				btn.css('width', curBtnHeight);
			})
			// console.log(this.navButtons);
			// var self = this;
			// this.butts = $('button');
			// console.log(self.butts.eq(0).height());
			// console.log(self.butts[0].getBoundingClientRect.height);
			// this.butts.eq(0).on('load', function() {
			// 	console.log(self.butts.eq(0).height());
			// 	console.log(self.butts[0].getBoundingClientRect.height);
			// this.butts.css('width', this.butts[0].getBoundingClientRect().height);	
			// })
			
			// anchors = $('button');
			// a = anchors.eq(0);
			// aContainer = $('div.imgNav > div');

			// var tempHandler;
			// window.addEventListener('resize', function() {
			// 	clearTimeout(tempHandler);
			// 	tempHandler = setTimeout(function() {
			// 		var temp = a[0].getBoundingClientRect().height;
			// 		// console.log(temp);	
			// 		anchors.css('width',temp + 'px');
			// 		console.log(temp + 'px');
			// 		aContainer.css('padding-top', ((temp / 0.3) * 0.4) + 'px');
			// 	}, 0);
			// })
		},

		initAutoScroll: function() {
			var self = this;

			if(this.options.autoScroll) {
				this.scrollHandler = setInterval(function() {
					if(self.options.autoScroll) { self.scrollLeft(); }
				}, this.options.scrollInterval);
			}
					
		},

		disableAutoScroll: function() {
			// console.log(this);
			this.options.autoScroll = false;
		},

		enableAutoScroll: function() {
			this.options.autoScroll = true;
		},

		// scrollLeft: function() {
		// 	var self = this,
		// 		slider = this.slider,
		// 		css = {'margin-left' : (- this.slider.width() / this.images.length) + 'px'},
		// 		// Because each 'scroll' adds three items to the queue and
		// 		// the first item added onto the queue by scrollRight finishes
		// 		// its execution almost instantaneously.
		// 		queueLen = Math.ceil(slider.queue().length / 3),
		// 		dur = this.options.scrollDuration / (queueLen || 1);
		// 		// console.log(queueLen);
		// 	slider
		// 		.animate(css, dur, this.options.easing)
		// 		.queue(function() { 
		// 			self.firstToLast()
		// 				.dequeue();
		// 			// self.queue--;
					
		// 			// console.log('dequeue queueLen:' + (slider.queue().length / 2));//queueLen);
		// 		})
		// 		.queue(function() {
		// 			slider.dequeue();
		// 			if((slider.queue().length / 3) === 0) { 
		// 				// console.log('End left:' + (Date.now() - self.start));
		// 				setTimeout(function() { 
		// 					self.enableAutoScroll();
		// 				}, self.options.scrollInterval);
		// 				console.log('autoScroll enabled. left');
		// 			}
		// 		});
		// 	// console.log('length:' + slider.queue().length);
		// },

		scrollLeft: function() {
			var self = this,
				slider = this.slider,
				css = {'margin-left' : (- this.slider.width() / this.images.length) + 'px'},
				// Because each 'scroll' adds three items to the queue and
				// the first item added onto the queue by scrollRight finishes
				// its execution almost instantaneously.
				queueLen = Math.ceil(slider.queue().length / 4),
				dur = this.options.scrollDuration / (queueLen || 1);
				// console.log(queueLen);
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
					// self.activateButton(self.navButtons[self.dispIndex + 1]);
					self.activateButton(self.navButtons[nextBtnIndex]);
				})
				.animate(css, dur, this.options.easing)
				.queue(function() { 
					// self.deactivateButton(self.navButtons[self.dispIndex]);
					self.firstToLast();
					// self.activateButton(self.navButtons[self.dispIndex]);
					slider.dequeue();
					// self.queue--;
					
					// console.log('dequeue queueLen:' + (slider.queue().length / 2));//queueLen);
				})
				.queue(function() {
					slider.dequeue();
					if((slider.queue().length) === 0) { 
						// console.log('End left:' + (Date.now() - self.start));
						setTimeout(function() { 
							self.enableAutoScroll();
						}, self.options.scrollInterval * 2);
						// console.log('autoScroll enabled. left');
					}
				});
			// console.log('length:' + slider.queue().length);
		},

		firstToLast: function() {
			this.slider
				.append(this.imgFrames[this.dispIndex])
				.css( {'margin-left':0} );
			this.dispIndex = (this.dispIndex + 1) % this.images.length;

			// return this.slider;
		},

		// scrollRight: function() {
		// 	var self = this,
		// 		slider = this.slider,
		// 		css = { 'margin-left':0 },
		// 		// Because the first item added to the queue finishes
		// 		// executing almost instantaneously, I had to use the
		// 		// ceil function.
		// 		queueLen = Math.ceil(slider.queue().length / 4),
		// 		dur = this.options.scrollDuration / (queueLen || 1);
		// 		console.log(queueLen);
		// 	slider
		// 		.queue(function() {
		// 			self.lastToFirst()
		// 				.dequeue();
		// 		})
		// 		.animate(css, dur, this.options.easing)
		// 		.queue(function(i) {
		// 			return function() {
		// 				// console.log(i);
		// 				self.activateButton(self.navButtons[i]);
		// 				slider.dequeue();
		// 			}
		// 		}(self.dispIndex))
		// 		.queue(function() {
		// 			slider.dequeue();
		// 			// self.activateButton(self.navButtons[self.dispIndex]);
		// 			// console.log((slider.queue().length))
		// 			if((slider.queue().length / 4) === 0) { 
		// 				// console.log('End right:' + (Date.now() - self.start));
		// 				setTimeout(function() { 
		// 					self.enableAutoScroll();
		// 				}, self.options.scrollInterval);
		// 				// console.log('autoScroll enabled. right');
		// 				// console.log(self.dispIndex);
		// 			}
		// 			// self.activateButton(self.navButtons[self.dispIndex]);
		// 		});
		// 	// Offset the length by 1 to get an even number since the
		// 	// first item added to the queue finishes its execution
		// 	// almost instantaneously.
		// 	// console.log('length:' + (slider.queue().length + 1));
		// },

		scrollRight: function() {
			var self = this,
				slider = this.slider,
				css = { 'margin-left':0 },
				// Because the first two items added to the queue finish
				// executing almost instantaneously, I had to use the
				// ceil function.
				queueLen = Math.ceil(slider.queue().length / 4),
				dur = this.options.scrollDuration / (queueLen || 1);
				// console.log(queueLen);
			slider
				// The first two queues are not combined to have an even
				// amount of items added to the queue as scrollLeft.
				.queue(function() {
					self.deactivateButton(self.navButtons[self.dispIndex]);
					slider.dequeue();
				})
				.queue(function() {
					// self.deactivateButton(self.navButtons[self.dispIndex]);
					self.lastToFirst();
					self.activateButton(self.navButtons[self.dispIndex]);
					if(slider.queue().length === 0) {
						setTimeout (function() {
							self.enableAutoScroll();
						}, self.options.scrollInterval);
					}
					slider.dequeue();
				})
				.animate(css, dur, self.options.easing)
				.queue(function() {
					// self.activateButton(self.navButtons[self.dispIndex]);
					if(slider.queue().length === 0) {
						setTimeout (function() {
							self.enableAutoScroll();
						}, self.options.scrollInterval * 2);
					}
					slider.dequeue();
				});
				// .dequeue();
				// console.log(self.dispIndex);
				// .queue(function() {
				// 	self.lastToFirst()
				// 		.dequeue();
				// })
				// .animate(css, dur, this.options.easing)
				// .queue(function(i) {
				// 	return function() {
				// 		// console.log(i);
				// 		self.activateButton(self.navButtons[i]);
				// 		slider.dequeue();
				// 	}
				// }(self.dispIndex))
				// .queue(function() {
				// 	slider.dequeue();
				// 	// self.activateButton(self.navButtons[self.dispIndex]);
				// 	// console.log((slider.queue().length))
				// 	if((slider.queue().length / 4) === 0) { 
				// 		// console.log('End right:' + (Date.now() - self.start));
				// 		setTimeout(function() { 
				// 			self.enableAutoScroll();
				// 		}, self.options.scrollInterval);
				// 		// console.log('autoScroll enabled. right');
				// 		// console.log(self.dispIndex);
				// 	}
				// 	// self.activateButton(self.navButtons[self.dispIndex]);
				// });
			// Offset the length by 1 to get an even number since the
			// first item added to the queue finishes its execution
			// almost instantaneously.
			// console.log('length:' + (slider.queue().length + 1));
		},

		lastToFirst: function() {
			var len = this.images.length;
			
			this.slider
				.prepend(this.imgFrames[(this.dispIndex + len - 1) % len])
				.css( {'margin-left': (-1 * this.slider.width() / this.images.length) + 'px'} );
				// .css( {'margin-left':'-=' + this.imgWidth + 'px'} );
			this.dispIndex = (this.dispIndex - 1 < 0)
				? this.images.length - 1
				: this.dispIndex - 1;

			// return this.slider;
		},

		activateButton: function($button) {
			$button.addClass('activated');
			// console.log($button);
		},

		deactivateButton: function($button) {
			$button.removeClass('activated');
			// console.log($button);
		}

		
		// TODO: Add bind events
		// TODO: Dots for navigation (pending)
		// TODO: IE8 Support (polyfill for Object.create and maybe other stuff).
		// TODO: Maybe rather than putting the URLs in the script, create img tags in the html instead.
		
		// DONE: 'Pause' auto slider when something is clicked until it's done.
		// DONE: add 'smaller' images to an array and use JS to set their heights and padding and stuff
		// DONE: Dynamically resize image and add default 'black box' backgrounds
		// DONE: Add responsive feature

		// Feature: auto "pauses" if user scrolls left or right.  
	} // end JSlider

	$.jSlider = function(container, images, options) {
			var jSlider = Object.create(JSlider);
			jSlider.init(container, images, options);
			return jSlider;
	}

	$.jSlider.options = {
		marginTop: '50px',
		height:'auto',
		width:'auto',
		buttons: 'auto',
		autoScroll: true,
		scrollDuration: 600,
		easing: 'linear',
		scrollInterval: 2700,
		frameBG: '#000000',
		resizeDelay: 50
	}

})(jQuery);

;(function($) {
	container = $('div.jSlider').eq(0);
	images = ['1.png','2.png','3.png','4.png','1.png','2.png','3.png','4.png','1.png','2.png','3.png','4.png','1.png','2.png','3.png','4.png','1.png','2.png','3.png','4.png'];
	// images = ['1.png','grid1.jpg','grid2.jpg','grid3.jpg'];
	// images = ['5.jpg','6.jpg','7.jpg','8.jpg','9.jpg'];
	options = {
		scrollInterval: 3000,
		autoScroll: false,
		buttons: 'auto',
		width:'800px',
		scrollDuration: 300
	}
	slider1 = $.jSlider(container, images, options);
	
	// container2 = $('div.jSlider').eq(1);
	// // images2 = ['1.png','2.png','3.png','4.png'];
	// images2 = ['5.jpg','6.jpg','7.jpg','8.jpg','9.jpg'];
	// options2 = {
	// 	marginTop: '50px',
	// 	autoScroll: true,
	// 	scrollInterval: 2700,
	// 	scrollDuration: 600,
	// 	easing: 'swing'
	// }
	// slider2 = $.jSlider(container2, images2, options2);

	// anchors = $('button');
	// a = anchors.eq(0);
	// aContainer = $('div.imgNav > div');

	// var tempHandler;
	// window.addEventListener('resize', function() {
	// 	clearTimeout(tempHandler);
	// 	tempHandler = setTimeout(function() {
	// 		var temp = a[0].getBoundingClientRect().height;
	// 		// console.log(temp);	
	// 		anchors.css('width',temp + 'px');
	// 		console.log(temp + 'px');
	// 		aContainer.css('padding-top', ((temp / 0.3) * 0.4) + 'px');
	// 	}, 0);
	// })
})(jQuery);

/*
http://api.jquery.com/queue/
http://api.jquery.com/category/deferred-object/
http://api.jquery.com/jQuery.when/
http://api.jquery.com/deferred.done/
*/

/*
buttons: height height of image, width 10%
	rightBtn: css {left: width of image}
*/