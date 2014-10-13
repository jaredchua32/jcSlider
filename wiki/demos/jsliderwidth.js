;(function($) {
	function firstToLast(inArray) {
		outArray = inArray;
		outArray.unshift(inArray[inArray.length - 1]);
		outArray.pop();
		return outArray;
	}

	var containerOne = $('div#jSliderOne'),
		imagesOne = [
			'../../test_images/5.jpg',
			'../../test_images/6.jpg',
			'../../test_images/7.jpg',
			'../../test_images/8.jpg',
			'../../test_images/9.jpg'],
		optionsOne = {
			'width': '100%',
			'marginTop': '1em'
		},
		
		containerTwo = $(),
		imagesTwo = firstToLast(imagesOne),

	sliderOne = $.jSlider(containerOne, imagesOne, optionsOne);
	sliderTwo = $.jSlider(containerTwo, imagesTwo, optionsOne);
})(jQuery);