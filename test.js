;(function($) {
	container = $('div.jSlider').eq(0);
	images = ['1.png','2.png','3.png','4.png','1.png','2.png','3.png','4.png','1.png','2.png','3.png','4.png','1.png','2.png','3.png','4.png','1.png','2.png','3.png','4.png'];
	// images = ['1.png', 'grid1.jpg', 'grid2.jpg', 'grid3.jpg']
	options = {
		// scrollInterval: 2500,
		// autoScroll: false,
		// buttons: 'auto',
		// width:'800px',
		// scrollDuration: 700,
		// navButtons:false
		
		// width: 'auto',
		// height: 'auto',
		// frameBG: '#000000',
		// marginTop: '50px',
		// resizeDelay: 50,
		// buttons: 'auto',
		// leftBtn: undefined,
		// rightBtn: undefined,
		// navButtons: true,
		// autoScroll: true,
		// scrollInterval: 1500,
		// scrollDuration: 600,
		// pauseDuration: 3000,
		// easing: 'linear'
		
	}
	slider1 = $.jSlider(container, images, options);
	
	var time1, time2;




	// container2 = $('div.jSlider').eq(1);
	// // images2 = ['1.png','2.png','3.png','4.png'];
	// images2 = ['5.jpg','6.jpg','7.jpg','8.jpg','9.jpg'];
	// options2 = {
	// 	marginTop: '50px',
	// 	autoScroll: true,
	// 	scrollInterval: 2700,
	// 	scrollDuration: 600,
	// 	easing: 'swing'
	// }
	// slider2 = $.jSlider(container2, images2, options2);

})(jQuery);