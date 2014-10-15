;(function($) {
	var images = [
			'../../test_images/jcslider.png',
			'../../test_images/responsive.png',
			'../../test_images/customizable.png',
			'../../test_images/clean.png',
			'../../test_images/lightweight.png'],

		imagesTwo = [
			'../../test_images/noproblem.png',
			'../../test_images/small.png',
			'../../test_images/medium.png',
			'../../test_images/large.png',
			'../../test_images/venti.png',
			'../../test_images/done.png',
			'../../test_images/shrink.png',
			'../../test_images/gone.png'];

	var containerOne = $('div#sliderOne'),
		optionsOne = {
			'frameBG': '#FFF',
			'marginTop': '1em'
		},
		
		sliderOne = $.jSlider(containerOne, images, optionsOne);

	var containerTwo = $('div#sliderTwo'),
		optionsTwo = {
			'width': '650px',
			'sideButtons': 'none',
			'navButtons': false,
			'frameBG': 'rgba(0,0,0,0)',
			'marginTop': '1em'
		},

		sliderTwo = $.jSlider(containerTwo, imagesTwo, optionsTwo);
})(jQuery);