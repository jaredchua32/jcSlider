;(function($) {
	var images = [
			'../../test_images/jcslider.png',
			'../../test_images/responsive.png',
			'../../test_images/customizable.png',
			'../../test_images/clean.png',
			'../../test_images/lightweight.png'],

		images2 = [
			'../../test_images/5.jpg',
			'../../test_images/6.jpg',
			'../../test_images/7.jpg',
			'../../test_images/8.jpg',
			'../../test_images/9.jpg'];


	var containerOne = $('div#sliderOne'),
		optionsOne = {
			'frameBG': '#FFF',
			'marginTop': '1em'
		},
		
		sliderOne = $.jSlider(containerOne, images, optionsOne);

	// var containerTwo = $('div#jSliderTwo'),
	// 	optionsTwo = {
	// 		'width': '400px',
	// 		'marginTop': '1em'
	// 	},

	// 	sliderTwo = $.jSlider(containerTwo, images, optionsTwo);

	// var containerThree = $('div#jSliderThree'),
	// 	optionsThree = {
	// 		'width': 'auto',
	// 		'marginTop': '1em'
	// 	},

	// 	sliderThree = $.jSlider(containerThree, images, optionsThree);
})(jQuery);