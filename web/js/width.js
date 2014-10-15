;(function($) {
	var images = [
			'../images/5.jpg',
			'../images/6.jpg',
			'../images/7.jpg',
			'../images/8.jpg',
			'../images/9.jpg'];

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