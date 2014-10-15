;(function($) {
	var images = [
			'../images/jcslider.png',
			'../images/responsive.png',
			'../images/customizable.png',
			'../images/clean.png',
			'../images/lightweight.png'],

		imagesTwo = [
			'../images/noproblem.png',
			'../images/small.png',
			'../images/medium.png',
			'../images/large.png',
			'../images/venti.png',
			'../images/done.png',
			'../images/shrink.png',
			'../images/gone.png'];

	var containerOne = $('div#sliderOne'),
		optionsOne = {
			'frameBG': '#FFF',
			'marginTop': '1em'
		},
		
		sliderOne = $.jcSlider(containerOne, images, optionsOne);

	var containerTwo = $('div#sliderTwo'),
		optionsTwo = {
			'width': '650px',
			'sideButtons': 'none',
			'navButtons': false,
			'frameBG': 'rgba(0,0,0,0)',
			'marginTop': '1em'
		},

		sliderTwo = $.jcSlider(containerTwo, imagesTwo, optionsTwo);
})(jQuery);