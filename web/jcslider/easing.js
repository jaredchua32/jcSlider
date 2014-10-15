;(function($) {
	var images = [
			'../../test_images/5.jpg',
			'../../test_images/6.jpg',
			'../../test_images/7.jpg',
			'../../test_images/8.jpg',
			'../../test_images/9.jpg'];

	var containerOne = $('div#jcSliderOne'),
		optionsOne = {
			'easing': 'linear',
			'marginTop': '1em'
		},
		
		sliderOne = $.jcSlider(containerOne, images, optionsOne);

	var containerTwo = $('div#jcSliderTwo'),
		optionsTwo = {
			'easing': 'swing',
			'marginTop': '1em'
		},

		sliderTwo = $.jcSlider(containerTwo, images, optionsTwo);
})(jQuery);