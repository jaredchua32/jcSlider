;(function($) {
	var images = [
			'../images/5.jpg',
			'../images/6.jpg',
			'../images/7.jpg',
			'../images/8.jpg',
			'../images/9.jpg'];

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