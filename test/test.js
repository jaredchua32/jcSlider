;(function($) {
	container = $('div.jSlider').eq(0);
	images = ['1.png', '2.png', '3.png', '4.png', '1.png', '2.png', '3.png', '4.png', '1.png', '2.png', '3.png', '4.png', '1.png', '2.png', '3.png', '4.png', '1.png', '2.png', '3.png', '4.png'];
	
	images.forEach(function(str, index) {
		images[index] = '../images/' + str;
	})
	// images = ['1.png', 'grid1.jpg', 'grid2.jpg', 'grid3.jpg']
	options = {
		// scrollInterval: 2500,
		// autoScroll: false,
		// buttons: 'auto',
		// width:'800px',
		// scrollDuration: 700,
		// navButtons:false
		
		width: '1200px',
		frameBG: 'rgb(255,0,255)',
		// marginTop: '50px',
		// resizeDelay: 50,
		sideButtons: 'none',
		// leftBtn: $('div.testLeft'),
		// rightBtn: $('div.testRight'),
		navButtons: false,
		// autoScroll: false,
		// scrollInterval: 1500,
		// scrollDuration: 600,
		// pauseDuration: 3000,
		// easing: 'linear'
		
	}
	slider1 = $.jSlider(container, images, options);
	
	var time1, time2;




	// container2 = $('div.jSlider').eq(1);
	// // images2 = ['1.png','2.png','3.png','4.png'];
	// images2 = ['images/5.jpg','images/6.jpg','images/7.jpg','images/8.jpg','images/9.jpg'];
	// options2 = {
	// 	marginTop: '50px',
	// 	autoScroll: true,
	// 	scrollInterval: 2700,
	// 	scrollDuration: 600,
	// 	easing: 'swing'
	// }
	// slider2 = $.jSlider(container2, images2, options2);

})(jQuery);