;(function($) {
	var images = [
			'../../test_images/5.jpg',
			'../../test_images/6_s.jpg',
			'../../test_images/7_s.jpg',
			'../../test_images/8_s.jpg',
			'../../test_images/9_s.jpg'];

	var containerOne = $('div#jSliderOne'),
		optionsOne = {
			'frameBG': 'rgb(170,170,170)',
			'marginTop': '1em'
		},
		
		sliderOne = $.jcSlider(containerOne, images, optionsOne);

	var containerTwo = $('div#jSliderTwo'),
		optionsTwo = {
			'frameBG': 'black',
			'marginTop': '1em'
		},

		sliderTwo = $.jcSlider(containerTwo, images, optionsTwo);

	var containerThree = $('div#jSliderThree'),
		optionsThree = {
			'frameBG': '#FFFFFF',
			'marginTop': '1em'
		},

		sliderThree = $.jcSlider(containerThree, images, optionsThree);
})(jQuery);