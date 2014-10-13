;(function($) {
	containerOne = $('div#jSliderOne')
	
	images = ['5.jpg','6.jpg','7.jpg','8.jpg','9.jpg',]
	images.forEach(function(str, index) {
		images[index] = '../../test_images/' + str;
	})

	optionsOne = {
		width: 'auto',
	}

	sliderOne = $.jSlider(containerOne, images, optionsOne);
})(jQuery);