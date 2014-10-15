;(function($) {
	var images = [
			'../../test_images/5.jpg',
			'../../test_images/6.jpg',
			'../../test_images/7.jpg',
			'../../test_images/8.jpg',
			'../../test_images/9.jpg'];

	var containerOne = $('div#jSliderOne'),
		optionsOne = {
			'width': '100%',
			'marginTop': '1em'
		},
		
		sliderOne = $.jcSlider(containerOne, images, optionsOne);

	var containerTwo = $('div#jSliderTwo'),
		optionsTwo = {
			'width': '400px',
			'marginTop': '1em'
		},

		sliderTwo = $.jcSlider(containerTwo, images, optionsTwo);

	var containerThree = $('div#jSliderThree'),
		optionsThree = {
			'width': 'auto',
			'marginTop': '1em'
		},

		sliderThree = $.jcSlider(containerThree, images, optionsThree);
})(jQuery);